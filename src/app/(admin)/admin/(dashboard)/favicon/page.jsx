import Link from "next/link";
import FaviconEditor from "@/components/admin/FaviconEditor";
import { getPageByKey } from "@/services/pageContent.service";
import {
  faviconContent,
  normalizeFaviconItems,
} from "@/data/faviconContent";

export const dynamic = "force-dynamic";

export default async function AdminFaviconPage() {
  let items = faviconContent.items;

  try {
    const page = await getPageByKey("favicon");
    if (page?.sections?.items) {
      items = page.sections.items;
    }
  } catch {
    /* use defaults */
  }

  const initialItems = normalizeFaviconItems(items);
  const activeCount = initialItems.filter((item) => item.active).length;

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
            Favicon
          </h1>
          <p className="mt-1 max-w-xl text-base text-muted">
            Upload the browser tab icon, remove it, or switch it Active /
            Inactive. Only an active favicon is shown on the public site.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Active
          </p>
          <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
            {activeCount}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <FaviconEditor initialItems={initialItems} />
      </div>
    </div>
  );
}
