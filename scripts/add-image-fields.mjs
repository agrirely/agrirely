import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const HERO =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=80";
const ABOUT =
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1600&q=80";

const patches = [
  { pageKey: "home", section: "hero", image: HERO },
  { pageKey: "home", section: "whoWeAre", image: ABOUT },
  { pageKey: "about-us", section: "intro", image: ABOUT },
  { pageKey: "trading-services", section: "trading", image: ABOUT },
  { pageKey: "agri-farmer-tech", section: "overview", image: HERO },
  { pageKey: "advisory-services", section: "hero", image: ABOUT },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const col = mongoose.connection.collection("pagecontents");

  for (const p of patches) {
    const doc = await col.findOne({ pageKey: p.pageKey });
    if (!doc) {
      console.log("missing page", p.pageKey);
      continue;
    }
    const section = doc.sections?.[p.section];
    if (!section || typeof section !== "object") {
      console.log("missing section", p.pageKey, p.section);
      continue;
    }
    if (section.image) {
      console.log("already has image", p.pageKey, p.section);
      continue;
    }
    const setKey = `sections.${p.section}.image`;
    await col.updateOne({ pageKey: p.pageKey }, { $set: { [setKey]: p.image } });
    console.log("added image", p.pageKey, p.section);
  }

  await mongoose.disconnect();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
