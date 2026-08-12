import Link from "next/link";
import SectionEditor from "@/components/admin/SectionEditor";
import { getPageByKey } from "@/services/pageContent.service";
import { allPages, getStaticPageSections } from "@/data/allPages";

export const dynamic = "force-dynamic";

function humanizeKey(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function countFields(value) {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return value == null ? 0 : 1;
}

export default async function AdminSectionEditPage({ params }) {
  const { pageKey, sectionKey } = await params;

  let page = null;
  try {
    page = await getPageByKey(pageKey);
  } catch {
    const sections = getStaticPageSections(pageKey);
    const meta = allPages.find((p) => p.pageKey === pageKey);
    page = sections
      ? { pageKey, title: meta?.title ?? pageKey, sections }
      : null;
  }

  const sectionData = page?.sections?.[sectionKey];
  const pageTitle =
    page?.title ??
    allPages.find((p) => p.pageKey === pageKey)?.title ??
    pageKey;

  if (sectionData === undefined) {
    return (
      <div className="w-full">
        <div className="rounded-xl border border-line bg-surface px-6 py-10 text-center">
          <p className="font-display text-xl font-semibold tracking-tight text-brand-deep">
            Section not found
          </p>
          <p className="mt-2 text-sm text-muted">
            No section{" "}
            <code className="rounded bg-surface-soft px-1.5 py-0.5 text-brand-deep">
              {sectionKey}
            </code>{" "}
            on{" "}
            <code className="rounded bg-surface-soft px-1.5 py-0.5 text-brand-deep">
              {pageKey}
            </code>
          </p>
          <Link
            href={`/admin/pages/${pageKey}`}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand/25 hover:brightness-105"
          >
            ← Back to {pageTitle}
          </Link>
        </div>
      </div>
    );
  }

  const fieldCount = countFields(sectionData);

  return (
    <div className="flex w-full flex-col">
      <nav className="flex flex-wrap items-center gap-1.5 text-base text-muted">
        <Link href="/admin/pages" className="transition hover:text-brand">
          Pages
        </Link>
        <span className="text-accent" aria-hidden>
          ·
        </span>
        <Link
          href={`/admin/pages/${pageKey}`}
          className="transition hover:text-brand"
        >
          {pageTitle}
        </Link>
        <span className="text-accent" aria-hidden>
          ·
        </span>
        <span className="text-brand-deep">{humanizeKey(sectionKey)}</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            {humanizeKey(sectionKey)}
          </h1>
          <p className="mt-1.5 text-base text-muted">
            Edit with Form or JSON ·{" "}
            <span className="font-mono text-muted/70">
              {pageKey}/{sectionKey}
            </span>
            {" · "}
            {fieldCount} field{fieldCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="mt-5 min-h-[calc(100vh-11rem)]">
        <SectionEditor
          pageKey={pageKey}
          sectionKey={sectionKey}
          initialData={sectionData}
        />
      </div>
    </div>
  );
}
