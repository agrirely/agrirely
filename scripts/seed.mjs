import dotenv from "dotenv";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
dotenv.config({ path: path.join(root, ".env.local") });

const PageContentSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    sections: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true }
);

async function loadExport(relPath, exportName) {
  const mod = await import(pathToFileURL(path.join(root, relPath)).href);
  return mod[exportName];
}

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/agrirely";
  const overwrite = process.argv.includes("--overwrite");

  const homeContent = await loadExport("src/data/homeContent.js", "homeContent");
  const aboutContent = await loadExport("src/data/aboutContent.js", "aboutContent");
  const contactContent = await loadExport("src/data/contactContent.js", "contactContent");
  const tradingContent = await loadExport("src/data/tradingContent.js", "tradingContent");
  const techContent = await loadExport("src/data/techContent.js", "techContent");
  const advisoryContent = await loadExport("src/data/advisoryContent.js", "advisoryContent");
  const navLinks = await loadExport("src/data/navLinks.js", "navLinks");

  const pages = [
    { pageKey: "home", title: "Home", sections: homeContent },
    { pageKey: "about-us", title: "About Us", sections: aboutContent },
    { pageKey: "contact-us", title: "Contact Us", sections: contactContent },
    { pageKey: "trading-services", title: "Trading & Services", sections: tradingContent },
    { pageKey: "agri-farmer-tech", title: "Agri & Farmer Tech", sections: techContent },
    { pageKey: "advisory-services", title: "Advisory Services", sections: advisoryContent },
    { pageKey: "nav", title: "Navigation", sections: { links: navLinks } },
  ];

  console.log(`Connecting to ${uri} ...`);
  await mongoose.connect(uri);

  const PageContent =
    mongoose.models.PageContent || mongoose.model("PageContent", PageContentSchema);

  for (const page of pages) {
    if (overwrite) {
      await PageContent.findOneAndUpdate({ pageKey: page.pageKey }, page, {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      });
      console.log(`  upserted   ${page.pageKey}`);
    } else {
      const existing = await PageContent.findOne({ pageKey: page.pageKey });
      if (existing) {
        console.log(`  skipped    ${page.pageKey}`);
      } else {
        await PageContent.create(page);
        console.log(`  created    ${page.pageKey}`);
      }
    }
  }

  const count = await PageContent.countDocuments();
  console.log(`Done. PageContent documents: ${count}`);

  // Ensure admin user exists
  const bcrypt = (await import("bcryptjs")).default;
  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      passwordHash: { type: String, required: true },
      role: { type: String, enum: ["admin"], default: "admin" },
    },
    { timestamps: true }
  );
  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  const adminEmail = (process.env.ADMIN_EMAIL || "AgriRely@admin.com")
    .toLowerCase()
    .trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "Agrirely@123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: "AgriRely Admin",
      email: adminEmail,
      passwordHash,
      role: "admin",
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );
  console.log(`Admin user ready: ${adminEmail}`);

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("Seed failed:", err);
  try {
    await mongoose.disconnect();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
