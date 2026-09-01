import Link from "next/link";
import SocialLinksEditor from "@/components/admin/SocialLinksEditor";
import { getPageByKey } from "@/services/pageContent.service";
import {
  normalizeSocialLinks,
  socialContent,
} from "@/data/socialContent";

export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  let links = socialContent.links;

  try {
    const page = await getPageByKey("social");
    if (page?.sections?.links) {
      links = page.sections.links;
    }
  } catch {
    /* use defaults */
  }

  const initialLinks = normalizeSocialLinks(links);
  const liveCount = initialLinks.filter((link) => link.url).length;

  return (
    <div className="w-full">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-base text-muted transition hover:text-brand"
      >
        <span aria-hidden>←</span>
        Dashboard
      </Link>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Sitewide
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            Social Media
          </h1>
          <p className="mt-1 max-w-xl text-base text-muted">
            Icons are already on the footer and contact page. Add a URL when
            you have it to make that icon open the profile.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Live icons
          </p>
          <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
            {liveCount}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <SocialLinksEditor initialLinks={initialLinks} />
      </div>
    </div>
  );
}
