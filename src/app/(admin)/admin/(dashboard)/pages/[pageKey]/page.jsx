import Link from "next/link";
import { getPageByKey } from "@/services/pageContent.service";
import { getStaticPageSections, allPages } from "@/data/allPages";

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
};

function humanizeKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function countFields(value) {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return value == null ? 0 : 1;
}

function describeSection(value) {
  if (Array.isArray(value)) {
    return `${value.length} item${value.length === 1 ? "" : "s"}`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    return `${keys.length} field${keys.length === 1 ? "" : "s"}`;
  }
  return "Content block";
}

export default async function AdminPageSectionsPage({ params }) {
  const { pageKey } = await params;

  let page = null;
  try {
    page = await getPageByKey(pageKey);
  } catch {
    const fallback = allPages.find((p) => p.pageKey === pageKey);
    if (fallback) {
      page = { pageKey, title: fallback.title, sections: fallback.sections };
    }
  }

  if (!page?.sections) {
    const sections = getStaticPageSections(pageKey);
    const meta = allPages.find((p) => p.pageKey === pageKey);
    if (!sections) {
      return (
        <div className="w-full">
          <div className="rounded-xl border border-line bg-surface px-6 py-10 text-center">
            <p className="font-display text-xl font-semibold text-brand-deep">
              Page not found
            </p>
            <p className="mt-2 text-base text-muted">
              No content exists for{" "}
              <code className="rounded bg-surface-soft px-1.5 py-0.5 text-brand-deep">
                {pageKey}
              </code>
            </p>
            <Link
              href="/admin/pages"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand/25 hover:brightness-105"
            >
              ← Back to pages
            </Link>
          </div>
        </div>
      );
    }
    page = { pageKey, title: meta?.title ?? pageKey, sections };
  }

  const sectionKeys = Object.keys(page.sections);
  const meta = PAGE_META[pageKey] ?? {
    label: "Page",
    description: "Edit sections for this page.",
    accent: "bg-surface-soft text-brand-deep ring-line",
  };
  const totalFields = sectionKeys.reduce(
    (sum, key) => sum + countFields(page.sections[key]),
    0
  );

  return (
    <div className="w-full">
      <Link
        href="/admin/pages"
        className="inline-flex items-center gap-1.5 text-base text-muted transition hover:text-brand"
      >
        <span aria-hidden>←</span>
        Pages
      </Link>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.accent}`}
            >
              {meta.label}
            </span>
            <span className="font-mono text-sm text-muted/70">{pageKey}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-1 text-base text-muted">{meta.description}</p>
        </div>

        <div className="flex gap-2">
          <div className="rounded-xl border border-line bg-surface px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Sections
            </p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
              {sectionKeys.length}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Fields
            </p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
              {totalFields}
            </p>
          </div>
        </div>
      </div>

      {sectionKeys.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-brand/25 bg-surface px-6 py-10 text-center">
          <p className="text-lg font-semibold text-brand-deep">No sections yet</p>
          <p className="mt-1 text-base text-muted">
            This page has no editable sections in the database.
          </p>
        </div>
      ) : (
        <ul className="mt-4 grid gap-2">
          {sectionKeys.map((sectionKey, index) => {
            const sectionData = page.sections[sectionKey];
            const fields = countFields(sectionData);

            return (
              <li key={sectionKey}>
                <Link
                  href={`/admin/pages/${pageKey}/${sectionKey}`}
                  className="group flex w-full items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 transition hover:border-brand/30 hover:bg-surface-soft/60 hover:shadow-[0_12px_28px_rgba(26,63,115,0.06)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-sm font-semibold tabular-nums text-brand-deep transition group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-mid group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold tracking-tight text-brand-deep">
                      {humanizeKey(sectionKey)}
                    </h2>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                      <code className="rounded bg-surface-soft px-1.5 py-0.5 font-mono text-sm text-muted">
                        {sectionKey}
                      </code>
                      <span>{describeSection(sectionData)}</span>
                    </div>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted/70">
                      Size
                    </p>
                    <p className="text-lg font-semibold tabular-nums text-brand-deep">
                      {fields}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 text-base font-semibold text-brand transition group-hover:gap-2.5">
                    Edit
                    <span
                      aria-hidden
                      className="transition group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
