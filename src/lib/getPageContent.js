import { getPageByKey } from "@/services/pageContent.service";
import { getStaticPageSections } from "@/data/allPages";
import {
  normalizeSocialLinks,
  socialContent,
} from "@/data/socialContent";
import {
  faviconContent,
  getActiveFaviconFromItems,
} from "@/data/faviconContent";

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

export async function getSocialLinks() {
  try {
    const sections = await getPageContent("social");
    return normalizeSocialLinks(sections?.links);
  } catch (error) {
    console.error("[getSocialLinks]", error.message);
    return normalizeSocialLinks(socialContent.links);
  }
}

export async function getActiveFaviconUrl() {
  try {
    const sections = await getPageContent("favicon");
    return getActiveFaviconFromItems(sections?.items);
  } catch (error) {
    console.error("[getActiveFaviconUrl]", error.message);
    return getActiveFaviconFromItems(faviconContent.items);
  }
}
