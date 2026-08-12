import { listInquiries } from "@/services/inquiry.service";

export const dynamic = "force-dynamic";

const TYPE_META = {
  message: {
    label: "Message",
    accent: "bg-brand/10 text-brand ring-brand/20",
  },
  quote: {
    label: "Quote request",
    accent: "bg-accent/15 text-brand-deep ring-accent/30",
  },
  supplier: {
    label: "Supplier",
    accent: "bg-sky/25 text-brand-deep ring-sky/50",
  },
  careers: {
    label: "Careers",
    accent: "bg-surface-soft text-brand-deep ring-brand/20",
  },
};

const STATUS_META = {
  new: "bg-accent/20 text-brand-deep",
  read: "bg-brand/10 text-brand",
  archived: "bg-surface-soft text-muted",
};

function serializeInquiries(rows) {
  return JSON.parse(JSON.stringify(rows));
}

function getRaisedBy(payload = {}) {
  const name =
    payload.name ||
    payload.contactName ||
    payload.company ||
    payload.fullName ||
    "Unknown";
  const email = payload.email || null;
  return { name, email };
}

function getPreview(type, payload = {}) {
  if (type === "message") return payload.message || "—";
  if (type === "quote") {
    const bits = [payload.commodity, payload.quantity, payload.destination]
      .filter(Boolean)
      .join(" · ");
    return bits || payload.details || "—";
  }
  if (type === "supplier") {
    return payload.products || payload.message || "—";
  }
  if (type === "careers") {
    return payload.role || payload.note || "—";
  }
  return "—";
}

function formatDate(value) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return String(value);
  }
}

function DetailRows({ type, payload = {} }) {
  const rows = Object.entries(payload).filter(([, value]) => {
    if (value == null || value === "") return false;
    if (typeof value === "object") return false;
    return true;
  });

  if (!rows.length) {
    return <p className="text-sm text-muted">No extra details.</p>;
  }

  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {rows.map(([key, value]) => (
        <div key={key} className={isLongField(key, value) ? "sm:col-span-2" : ""}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            {humanizeKey(key)}
          </dt>
          <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-brand-deep">
            {String(value)}
          </dd>
        </div>
      ))}
      {type === "careers" && payload.resumeName ? (
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            Resume
          </dt>
          <dd className="mt-1 text-sm text-brand-deep">{payload.resumeName}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function humanizeKey(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isLongField(key, value) {
  if (typeof value !== "string") return false;
  if (value.length > 80 || value.includes("\n")) return true;
  return /^(message|details|note|products)$/i.test(key);
}

export default async function AdminInquiriesPage() {
  let inquiries = [];
  let loadError = null;

  try {
    inquiries = serializeInquiries(await listInquiries());
  } catch (error) {
    loadError = error?.message || "Failed to load inquiries";
  }

  const counts = inquiries.reduce(
    (acc, item) => {
      acc.total += 1;
      acc[item.status || "new"] = (acc[item.status || "new"] || 0) + 1;
      return acc;
    },
    { total: 0, new: 0, read: 0, archived: 0 }
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Leads
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            Inquiries
          </h1>
          <p className="mt-1 text-base text-muted">
            Submissions from the contact page — who raised them and what they
            asked.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="rounded-xl border border-line bg-surface px-4 py-2.5 shadow-[0_8px_24px_rgba(26,63,115,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Total
            </p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
              {counts.total}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface px-4 py-2.5 shadow-[0_8px_24px_rgba(26,63,115,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              New
            </p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-brand-deep">
              {counts.new}
            </p>
          </div>
        </div>
      </div>

      {loadError ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      ) : null}

      {!loadError && inquiries.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-brand/25 bg-surface px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M5 6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v8A1.5 1.5 0 0 1 17.5 16H9l-3.5 3v-3H6.5A1.5 1.5 0 0 1 5 14.5v-8Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="mt-4 text-lg font-semibold text-brand-deep">
            No inquiries yet
          </p>
          <p className="mt-1 text-sm text-muted">
            New submissions from the contact page will show up in this list.
          </p>
        </div>
      ) : null}

      {inquiries.length > 0 ? (
        <ul className="mt-6 grid gap-3">
          {inquiries.map((inquiry) => {
            const typeMeta = TYPE_META[inquiry.type] ?? {
              label: inquiry.type || "Inquiry",
              accent: "bg-surface-soft text-brand-deep ring-line",
            };
            const statusClass =
              STATUS_META[inquiry.status] || STATUS_META.new;
            const raisedBy = getRaisedBy(inquiry.payload);
            const preview = getPreview(inquiry.type, inquiry.payload);

            return (
              <li
                key={inquiry._id}
                className="rounded-xl border border-line bg-surface p-4 shadow-[0_8px_24px_rgba(26,63,115,0.04)] sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${typeMeta.accent}`}
                      >
                        {typeMeta.label}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${statusClass}`}
                      >
                        {inquiry.status || "new"}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-brand-deep">
                      {raisedBy.name}
                    </h2>
                    {raisedBy.email ? (
                      <a
                        href={`mailto:${raisedBy.email}`}
                        className="mt-0.5 block text-sm text-brand hover:underline"
                      >
                        {raisedBy.email}
                      </a>
                    ) : null}
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {preview}
                    </p>
                  </div>

                  <time
                    dateTime={inquiry.createdAt}
                    className="shrink-0 text-sm tabular-nums text-muted"
                  >
                    {formatDate(inquiry.createdAt)}
                  </time>
                </div>

                <details className="mt-4 border-t border-line pt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-brand">
                    View full details
                  </summary>
                  <div className="mt-3">
                    <DetailRows type={inquiry.type} payload={inquiry.payload} />
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
