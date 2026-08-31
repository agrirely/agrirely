/**
 * Copy old ImageKit files + MongoDB collections into a new ImageKit + MongoDB.
 *
 * Source (old) — already in .env.local:
 *   MONGODB_URI, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT
 *
 * Target (new) — add these to .env.local then run `npm run migrate`:
 *   TARGET_MONGODB_URI
 *   TARGET_IMAGEKIT_PRIVATE_KEY
 *   TARGET_IMAGEKIT_URL_ENDPOINT
 *
 * Flags:
 *   --dry-run          list what would be copied, write nothing
 *   --db-only          skip ImageKit
 *   --images-only      skip MongoDB
 *   --site-images      also upload public/images and rewrite /images/... in DB
 *   --skip-non-images  skip audio/video/raw files
 *   --export-only      dump source DB + ImageKit manifest, then exit
 *   --limit=N          copy only first N ImageKit files (testing)
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import ImageKit, { toFile } from "@imagekit/nodejs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
dotenv.config({ path: path.join(root, ".env.local") });

const DATA_DIR = path.join(__dirname, "data");
const argv = new Set(process.argv.slice(2));
const dryRun = argv.has("--dry-run");
const dbOnly = argv.has("--db-only");
const imagesOnly = argv.has("--images-only");
const siteImages = argv.has("--site-images");
const skipNonImages = argv.has("--skip-non-images");
const exportOnly = argv.has("--export-only");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const fileLimit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

const SOURCE_MONGO =
  process.env.SOURCE_MONGODB_URI || process.env.MONGODB_URI;
const SOURCE_IK_KEY =
  process.env.SOURCE_IMAGEKIT_PRIVATE_KEY || process.env.IMAGEKIT_PRIVATE_KEY;
const SOURCE_IK_ENDPOINT = (
  process.env.SOURCE_IMAGEKIT_URL_ENDPOINT ||
  process.env.IMAGEKIT_URL_ENDPOINT ||
  ""
).replace(/\/$/, "");

const TARGET_MONGO = process.env.TARGET_MONGODB_URI;
const TARGET_IK_KEY = process.env.TARGET_IMAGEKIT_PRIVATE_KEY;
const TARGET_IK_ENDPOINT = (
  process.env.TARGET_IMAGEKIT_URL_ENDPOINT || ""
).replace(/\/$/, "");

const COLLECTIONS = ["pagecontents", "inquiries", "users"];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripQuery(url) {
  return String(url || "").split("?")[0];
}

function folderFromFilePath(filePath) {
  const normalized = String(filePath || "/").replace(/\\/g, "/");
  const dir = normalized.split("/").slice(0, -1).join("/");
  return dir || "/";
}

function serializeDocs(docs) {
  return JSON.parse(
    JSON.stringify(docs, (_key, value) => {
      if (value && value._bsontype === "ObjectId") return String(value);
      if (value instanceof Date) return value.toISOString();
      return value;
    })
  );
}

function reviveDoc(doc) {
  const next = { ...doc };
  if (next._id) next._id = new mongoose.Types.ObjectId(String(next._id));
  for (const key of ["createdAt", "updatedAt"]) {
    if (next[key]) next[key] = new Date(next[key]);
  }
  return next;
}

function rewriteValue(value, oldEndpoint, newEndpoint, urlMap) {
  if (typeof value === "string") {
    const stripped = stripQuery(value);
    if (urlMap[stripped]) return urlMap[stripped];
    if (urlMap[value]) return urlMap[value];
    if (oldEndpoint && newEndpoint && value.includes(oldEndpoint)) {
      return value.split(oldEndpoint).join(newEndpoint);
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) =>
      rewriteValue(item, oldEndpoint, newEndpoint, urlMap)
    );
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = rewriteValue(v, oldEndpoint, newEndpoint, urlMap);
    }
    return out;
  }
  return value;
}

async function listAllAssets(client) {
  const files = [];
  let skip = 0;
  const pageSize = 100;
  while (true) {
    const batch = await client.assets.list({ skip, limit: pageSize });
    const arr = Array.isArray(batch) ? batch : batch?.data || [];
    files.push(...arr);
    if (arr.length < pageSize) break;
    skip += pageSize;
    if (skip > 10000) break;
  }
  return files.filter((f) => f && f.type !== "folder");
}

async function exportSourceDb(sourceDb) {
  const dump = {};
  for (const name of COLLECTIONS) {
    const docs = await sourceDb.collection(name).find({}).toArray();
    dump[name] = serializeDocs(docs);
    console.log(`  exported ${name}: ${docs.length}`);
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const dumpPath = path.join(DATA_DIR, "db-dump.json");
  fs.writeFileSync(dumpPath, JSON.stringify(dump, null, 2));
  console.log(`  wrote ${dumpPath}`);
  return dump;
}

async function copyImageKitFiles(sourceIk, destIk) {
  console.log("Listing source ImageKit files...");
  let files = await listAllAssets(sourceIk);
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, "imagekit-manifest.json"),
    JSON.stringify(
      files.map((f) => ({
        name: f.name,
        filePath: f.filePath,
        url: f.url,
        mime: f.mime,
        fileType: f.fileType,
        size: f.size,
      })),
      null,
      2
    )
  );
  console.log(`  found ${files.length} files`);

  if (skipNonImages) {
    files = files.filter((f) =>
      String(f.mime || "").startsWith("image/")
    );
    console.log(`  after --skip-non-images: ${files.length}`);
  }
  if (Number.isFinite(fileLimit)) {
    files = files.slice(0, fileLimit);
    console.log(`  after --limit: ${files.length}`);
  }

  const urlMap = {};
  let ok = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const label = `[${i + 1}/${files.length}] ${file.filePath || file.name}`;
    if (dryRun) {
      console.log(`  dry-run ${label}`);
      continue;
    }

    try {
      const folder = folderFromFilePath(file.filePath);
      let uploaded;
      try {
        uploaded = await destIk.files.upload({
          file: stripQuery(file.url),
          fileName: file.name,
          folder,
          useUniqueFileName: false,
          overwriteFile: true,
          tags: file.tags || undefined,
        });
      } catch {
        const res = await fetch(file.url);
        if (!res.ok) {
          throw new Error(`download failed ${res.status}`);
        }
        const buf = Buffer.from(await res.arrayBuffer());
        uploaded = await destIk.files.upload({
          file: await toFile(buf, file.name),
          fileName: file.name,
          folder,
          useUniqueFileName: false,
          overwriteFile: true,
          tags: file.tags || undefined,
        });
      }

      const oldUrl = stripQuery(file.url);
      const newUrl = stripQuery(uploaded.url);
      urlMap[oldUrl] = newUrl;
      if (file.filePath) urlMap[file.filePath] = newUrl;
      ok += 1;
      console.log(`  ok ${label} → ${newUrl}`);
    } catch (err) {
      failed += 1;
      console.error(`  FAIL ${label}: ${err.message}`);
    }

    await sleep(120);
  }

  const mapPath = path.join(DATA_DIR, "url-map.json");
  fs.writeFileSync(mapPath, JSON.stringify(urlMap, null, 2));
  console.log(`ImageKit copy done. ok=${ok} failed=${failed} map=${mapPath}`);
  return urlMap;
}

async function uploadLocalSiteImages(destIk, urlMap) {
  const imagesDir = path.join(root, "public", "images");
  if (!fs.existsSync(imagesDir)) {
    console.log("No public/images folder; skipping --site-images");
    return urlMap;
  }

  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push(full);
    }
  }
  walk(imagesDir);
  console.log(`Uploading ${files.length} local site images...`);

  for (let i = 0; i < files.length; i++) {
    const full = files[i];
    const rel = path.relative(path.join(root, "public"), full).replace(/\\/g, "/");
    const webPath = `/${rel}`;
    const folder = `/agrirely/${path.posix.dirname(rel)}`;
    const fileName = path.basename(full);
    const label = `[${i + 1}/${files.length}] ${webPath}`;

    if (dryRun) {
      console.log(`  dry-run ${label}`);
      continue;
    }

    try {
      const buf = fs.readFileSync(full);
      const uploaded = await destIk.files.upload({
        file: await toFile(buf, fileName),
        fileName,
        folder,
        useUniqueFileName: false,
        overwriteFile: true,
      });
      const newUrl = stripQuery(uploaded.url);
      urlMap[webPath] = newUrl;
      console.log(`  ok ${label} → ${newUrl}`);
    } catch (err) {
      console.error(`  FAIL ${label}: ${err.message}`);
    }
    await sleep(120);
  }

  return urlMap;
}

async function seedTargetDb(destDb, dump, urlMap) {
  for (const name of COLLECTIONS) {
    const docs = dump[name] || [];
    console.log(`Seeding ${name} (${docs.length})...`);
    if (dryRun) continue;

    const col = destDb.collection(name);
    for (const raw of docs) {
      const rewritten = rewriteValue(
        raw,
        SOURCE_IK_ENDPOINT,
        TARGET_IK_ENDPOINT,
        urlMap
      );
      const doc = reviveDoc(rewritten);
      await col.replaceOne({ _id: doc._id }, doc, { upsert: true });
      const label = doc.pageKey || doc.email || doc.type || String(doc._id);
      console.log(`  upserted ${label}`);
    }
  }
}

function requireTargetEnv() {
  const missing = [];
  if (!TARGET_MONGO) missing.push("TARGET_MONGODB_URI");
  if (!TARGET_IK_KEY) missing.push("TARGET_IMAGEKIT_PRIVATE_KEY");
  if (!TARGET_IK_ENDPOINT) missing.push("TARGET_IMAGEKIT_URL_ENDPOINT");
  if (missing.length === 0) return;

  console.error(`
Missing target credentials in .env.local:

  TARGET_MONGODB_URI=mongodb+srv://...
  TARGET_IMAGEKIT_PRIVATE_KEY=private_...
  TARGET_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/YOUR_NEW_ID

Add these, save the file, then run:  npm run migrate
`);
  process.exit(1);
}

async function main() {
  if (!SOURCE_MONGO) {
    console.error("Missing MONGODB_URI (source) in .env.local");
    process.exit(1);
  }
  if (!SOURCE_IK_KEY) {
    console.error("Missing IMAGEKIT_PRIVATE_KEY (source) in .env.local");
    process.exit(1);
  }

  console.log("Source Mongo:", SOURCE_MONGO.replace(/\/\/.*@/, "//***@"));
  console.log("Source ImageKit:", SOURCE_IK_ENDPOINT || "(from private key)");
  if (!exportOnly) {
    requireTargetEnv();
    console.log("Target Mongo:", TARGET_MONGO.replace(/\/\/.*@/, "//***@"));
    console.log("Target ImageKit:", TARGET_IK_ENDPOINT);
  }
  if (dryRun) console.log("DRY RUN — no writes");

  const sourceConn = await mongoose.createConnection(SOURCE_MONGO).asPromise();
  console.log("\nExporting source DB...");
  const dump = await exportSourceDb(sourceConn.db);
  await sourceConn.close();

  const sourceIk = new ImageKit({ privateKey: SOURCE_IK_KEY });

  if (exportOnly) {
    const files = await listAllAssets(sourceIk);
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(DATA_DIR, "imagekit-manifest.json"),
      JSON.stringify(
        files.map((f) => ({
          name: f.name,
          filePath: f.filePath,
          url: f.url,
          mime: f.mime,
          fileType: f.fileType,
          size: f.size,
        })),
        null,
        2
      )
    );
    console.log(`Exported ImageKit manifest: ${files.length} files`);
    console.log("Export-only complete.");
    return;
  }

  const destIk = new ImageKit({ privateKey: TARGET_IK_KEY });
  let urlMap = {};

  if (!dbOnly) {
    console.log("\nCopying ImageKit files...");
    urlMap = await copyImageKitFiles(sourceIk, destIk);
  }

  if (siteImages) {
    console.log("\nUploading local public/images ...");
    urlMap = await uploadLocalSiteImages(destIk, urlMap);
  }

  if (!imagesOnly) {
    console.log("\nConnecting to target MongoDB...");
    const destConn = await mongoose.createConnection(TARGET_MONGO).asPromise();
    await seedTargetDb(destConn.db, dump, urlMap);
    await destConn.close();
  }

  console.log("\nDone.");
}

main().catch(async (err) => {
  console.error("Migrate failed:", err);
  process.exit(1);
});
