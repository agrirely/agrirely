import { homeContent } from "./homeContent";
import { aboutContent } from "./aboutContent";
import { contactContent } from "./contactContent";
import { tradingContent } from "./tradingContent";
import { techContent } from "./techContent";
import { advisoryContent } from "./advisoryContent";
import { navLinks } from "./navLinks";
import { socialContent } from "./socialContent";
import { faviconContent } from "./faviconContent";

/** Seed + fallback source for PageContent documents */
export const allPages = [
  {
    pageKey: "home",
    title: "Home",
    sections: homeContent,
  },
  {
    pageKey: "about-us",
    title: "About Us",
    sections: aboutContent,
  },
  {
    pageKey: "contact-us",
    title: "Contact Us",
    sections: contactContent,
  },
  {
    pageKey: "trading-services",
    title: "Trading & Services",
    sections: tradingContent,
  },
  {
    pageKey: "agri-farmer-tech",
    title: "Agri & Farmer Tech",
    sections: techContent,
  },
  {
    pageKey: "advisory-services",
    title: "Advisory Services",
    sections: advisoryContent,
  },
  {
    pageKey: "nav",
    title: "Navigation",
    sections: { links: navLinks },
  },
  {
    pageKey: "social",
    title: "Social Media",
    sections: socialContent,
  },
  {
    pageKey: "favicon",
    title: "Favicon",
    sections: faviconContent,
  },
];

export function getStaticPageSections(pageKey) {
  const page = allPages.find((p) => p.pageKey === pageKey);
  return page?.sections ?? null;
}
