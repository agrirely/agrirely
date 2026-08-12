import Link from "next/link";

const cards = [
  {
    href: "/admin/pages",
    title: "Pages",
    description: "Edit home, about, contact, and service page sections.",
    accent: "from-accent/20 to-accent-soft/30",
    iconBg: "bg-accent/15 text-accent",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M7 3.75h7.5L19 8.25V20.25a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 3.75V8.25H19M9 12h6M9 16h4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/inquiries",
    title: "Inquiries",
    description: "View contact form submissions.",
    accent: "from-brand/15 to-sky/25",
    iconBg: "bg-brand/15 text-brand",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M5 6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v8A1.5 1.5 0 0 1 17.5 16H9l-3.5 3v-3H6.5A1.5 1.5 0 0 1 5 14.5v-8Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="w-full">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Overview
      </p>
      <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
        Dashboard
      </h1>
      <p className="mt-2 max-w-xl text-base text-muted">
        Manage website page content without changing the public UI.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(26,63,115,0.08)]"
          >
            <div
              className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${card.accent} blur-2xl transition group-hover:opacity-100`}
              aria-hidden
            />
            <span
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
            >
              {card.icon}
            </span>
            <h2 className="relative mt-4 font-display text-xl font-semibold tracking-tight text-brand-deep">
              {card.title}
            </h2>
            <p className="relative mt-1.5 text-sm leading-relaxed text-muted">
              {card.description}
            </p>
            <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition group-hover:gap-2.5">
              Open
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
