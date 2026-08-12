import { getPageByKey } from "@/services/pageContent.service";
import { getStaticPageSections } from "@/data/allPages";

/**
 * Fetch page sections from MongoDB (falls back to static data files).
 * @param {string} pageKey
 * @returns {Promise<any>}
 */
export async function getPageContent(pageKey) {
  try {
    const page = await getPageByKey(pageKey);
    if (page?.sections) return page.sections;
  } catch (error) {
    console.error(`[getPageContent] DB error for "${pageKey}":`, error.message);
  }

  const fallback = getStaticPageSections(pageKey);
  if (!fallback) {
    throw new Error(`No content found for pageKey: ${pageKey}`);
  }
  return fallback;
}
