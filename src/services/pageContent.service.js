import { connectDB } from "@/lib/db";
import PageContent from "@/models/PageContent";
import { allPages, getStaticPageSections } from "@/data/allPages";

export async function getAllPages() {
  await connectDB();
  return PageContent.find({}).sort({ title: 1 }).lean();
}

export async function getPageByKey(pageKey) {
  await connectDB();
  const doc = await PageContent.findOne({ pageKey }).lean();
  if (doc) return doc;

  const sections = getStaticPageSections(pageKey);
  if (!sections) return null;

  return {
    pageKey,
    title: allPages.find((p) => p.pageKey === pageKey)?.title ?? pageKey,
    sections,
  };
}

export async function upsertPage({ pageKey, title, sections }) {
  await connectDB();
  return PageContent.findOneAndUpdate(
    { pageKey },
    { pageKey, title, sections },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  ).lean();
}

export async function updateSection(pageKey, sectionKey, sectionData) {
  await connectDB();
  const page = await PageContent.findOne({ pageKey });
  if (!page) {
    throw new Error(`Page not found: ${pageKey}`);
  }

  page.sections = {
    ...(page.sections || {}),
    [sectionKey]: sectionData,
  };
  page.markModified("sections");
  await page.save();
  return page.toObject();
}

export async function deleteSection(pageKey, sectionKey) {
  await connectDB();
  const page = await PageContent.findOne({ pageKey });
  if (!page) {
    throw new Error(`Page not found: ${pageKey}`);
  }

  if (page.sections && sectionKey in page.sections) {
    delete page.sections[sectionKey];
    page.markModified("sections");
    await page.save();
  }

  return page.toObject();
}

export async function seedAllPages({ overwrite = false } = {}) {
  await connectDB();
  const results = [];

  for (const page of allPages) {
    if (overwrite) {
      const doc = await PageContent.findOneAndUpdate(
        { pageKey: page.pageKey },
        page,
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
      ).lean();
      results.push({ pageKey: page.pageKey, action: "upserted", id: doc._id });
      continue;
    }

    const existing = await PageContent.findOne({ pageKey: page.pageKey }).lean();
    if (existing) {
      results.push({ pageKey: page.pageKey, action: "skipped", id: existing._id });
      continue;
    }

    const created = await PageContent.create(page);
    results.push({ pageKey: page.pageKey, action: "created", id: created._id });
  }

  return results;
}
