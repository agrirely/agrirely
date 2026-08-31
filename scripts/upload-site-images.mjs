/**
 * Upload only AgriRely site images (public/images) to ImageKit,
 * point MongoDB page content at those URLs, and remove unrelated files.
 */
import dns from "dns";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import ImageKit, { toFile } from "@imagekit/nodejs";

try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);
} catch {
  /* ignore */
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
dotenv.config({ path: path.join(root, ".env.local") });

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripQuery(url) {
  return String(url || "").split("?")[0];
}

function collectSiteImages() {
  const imagesDir = path.join(root, "public", "images");
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
        files.push(full);
      }
    }
  }
  walk(imagesDir);
  return files;
}

function rewriteValue(value, urlMap) {
  if (typeof value === "string") {
    return urlMap[value] || value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => rewriteValue(item, urlMap));
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = rewriteValue(v, urlMap);
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
    files.push(...arr.filter((f) => f && f.type !== "folder"));
    if (arr.length < pageSize) break;
    skip += pageSize;
  }
  return files;
}

async function main() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const endpoint = (process.env.IMAGEKIT_URL_ENDPOINT || "").replace(/\/$/, "");
  const mongoUri = process.env.MONGODB_URI;
  if (!privateKey || !endpoint || !mongoUri) {
    throw new Error("Missing IMAGEKIT_* or MONGODB_URI in .env.local");
  }

  const ik = new ImageKit({ privateKey });
  const siteFiles = collectSiteImages();
  console.log(`Site images to upload: ${siteFiles.length}`);

  const urlMap = {};
  const skipUpload = process.argv.includes("--skip-upload");
  for (let i = 0; i < siteFiles.length; i++) {
    const full = siteFiles[i];
    const rel = path
      .relative(path.join(root, "public"), full)
      .replace(/\\/g, "/");
    const webPath = `/${rel}`;
    const folder = `/agrirely/${path.posix.dirname(rel)}`;
    const fileName = path.basename(full);
    const expectedUrl = `${endpoint}/agrirely/${rel}`;
    if (skipUpload) {
      urlMap[webPath] = expectedUrl;
      console.log(`  skip ${webPath} → ${expectedUrl}`);
      continue;
    }
    const buf = fs.readFileSync(full);
    const uploaded = await ik.files.upload({
      file: await toFile(buf, fileName),
      fileName,
      folder,
      useUniqueFileName: false,
      overwriteFile: true,
    });
    const newUrl = stripQuery(uploaded.url);
    urlMap[webPath] = newUrl;
    console.log(`  [${i + 1}/${siteFiles.length}] ${webPath} → ${newUrl}`);
    await sleep(80);
  }

  console.log("\nUpdating Atlas page content URLs...");
  const conn = await mongoose.createConnection(mongoUri).asPromise();
  const col = conn.db.collection("pagecontents");
  const pages = await col.find({}).toArray();
  for (const page of pages) {
    const sections = rewriteValue(page.sections || {}, urlMap);
    await col.updateOne({ _id: page._id }, { $set: { sections } });
    console.log(`  updated ${page.pageKey}`);
  }
  await conn.close();

  console.log("\nRemoving unrelated ImageKit files (not /agrirely/)...");
  const all = await listAllAssets(ik);
  const junk = all.filter(
    (f) => !String(f.filePath || "").startsWith("/agrirely/")
  );
  console.log(`  keep ${all.length - junk.length}, delete ${junk.length}`);
  for (let i = 0; i < junk.length; i += 100) {
    const batch = junk.slice(i, i + 100);
    const fileIds = batch.map((f) => f.fileId).filter(Boolean);
    if (!fileIds.length) continue;
    await ik.files.bulk.delete({ fileIds });
    console.log(`  deleted ${fileIds.length} files`);
    await sleep(200);
  }

  const left = await listAllAssets(ik);
  console.log("\nImageKit now has:");
  left.forEach((f) => console.log(`  ${f.filePath}`));

  fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, "data", "site-image-map.json"),
    JSON.stringify(urlMap, null, 2)
  );
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
