import Link from "next/link";
import { getAllPages } from "@/services/pageContent.service";
import { allPages } from "@/data/allPages";

export const dynamic = "force-dynamic";

const PAGE_META = {
  home: {
    label: "Core",
    description: "Hero, highlights, and homepage sections.",
    accent: "bg-accent/15 text-brand-deep ring-accent/30",
  },
  "about-us": {
    label: "Company",
    description: "Story, philosophy, and promise content.",
    accent: "bg-brand/10 text-brand-deep ring-brand/25",
  },
  "contact-us": {
    label: "Lead gen",
    description: "Contact copy, tabs, and reach-us blocks.",
    accent: "bg-sky/25 text-brand-deep ring-sky/50",
  },
  "trading-services": {
    label: "Services",
    description: "Trading, farming, storage, and packaging.",
    accent: "bg-accent-soft/40 text-brand-deep ring-accent/30",
  },
  "agri-farmer-tech": {
    label: "Services",
    description: "Tech platforms and farmer equipment.",
    accent: "bg-brand/10 text-brand ring-brand/20",
  },
  "advisory-services": {
    label: "Services",
    description: "Advisory overview and audience sections.",
    accent: "bg-surface-soft text-brand-deep ring-brand/20",
  },
  nav: {
    label: "Sitewide",
    description: "Header navigation links and labels.",
    accent: "bg-background text-muted ring-line",
  },
  social: {
    label: "Sitewide",
    description: "Social media profile URLs for site icons.",
    accent: "bg-accent/15 text-brand-deep ring-accent/30",
  },
  favicon: {
    label: "Sitewide",
    description: "Browser tab icon upload, remove, and active state.",
    accent: "bg-brand/10 text-brand-deep ring-brand/25",
  },
};

function getSectionCount(pageKey, page) {
  if (page?.sections && typeof page.sections === "object") {
    return Object.keys(page.sections).length;
  }
  const fallback = allPages.find((p) => p.pageKey === pageKey);
  if (fallback?.sections && typeof fallback.sections === "object") {
    return Object.keys(fallback.sections).length;
  }
  return 0;
}

export default async function AdminPagesListPage() {
  let pages = [];
  try {
    pages = await getAllPages();
  } catch {
    pages = allPages.map((p) => ({
      pageKey: p.pageKey,
      title: p.title,
      sections: p.sections,
    }));
  }

  if (!pages.length) {
    pages = allPages.map((p) => ({
      pageKey: p.pageKey,
      title: p.title,
      sections: p.sections,
    }));
  } else {
    const byKey = new Map(pages.map((page) => [page.pageKey, page]));
    pages = allPages.map(
      (page) =>
        byKey.get(page.pageKey) ?? {
          pageKey: page.pageKey,
          title: page.title,
          sections: page.sections,
        }
    );
  }

  const totalSections = pages.reduce(
    (sum, page) => sum + getSectionCount(page.pageKey, page),
    0
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Content
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            Pages
          </h1>
          <p className="mt-1 text-base text-muted">
            Pick a page to edit its sections in the database. Public layout stays
            the same — only the copy changes.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="rounded-xl border border-line bg-surface px-4 py-2.5 shadow-[0_8px_24px_rgba(26,63,115,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Pages
            </p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
              {pages.length}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface px-4 py-2.5 shadow-[0_8px_24px_rgba(26,63,115,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Sections
            </p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
              {totalSections}
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map((page, index) => {
          const meta = PAGE_META[page.pageKey] ?? {
            label: "Page",
            description: "Edit sections for this page.",
            accent: "bg-surface-soft text-brand-deep ring-line",
          };
          const sectionCount = getSectionCount(page.pageKey, page);

          return (
            <li key={page.pageKey}>
              <Link
                href={`/admin/pages/${page.pageKey}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(26,63,115,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.accent}`}
                  >
                    {meta.label}
                  </span>
                  <span className="text-sm tabular-nums text-brand/30 transition group-hover:text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-brand-deep">
                  {page.title}
                </h2>
                <p className="mt-1 flex-1 text-base leading-snug text-muted">
                  {meta.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm text-muted/70">
                      {page.pageKey}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {sectionCount} section{sectionCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-base font-semibold text-brand transition group-hover:gap-2.5">
                    Edit
                    <span aria-hidden className="transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
