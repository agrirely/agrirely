"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pageLinks = [
  { pageKey: "home", title: "Home" },
  { pageKey: "about-us", title: "About Us" },
  { pageKey: "contact-us", title: "Contact Us" },
  { pageKey: "trading-services", title: "Trading & Services" },
  { pageKey: "agri-farmer-tech", title: "Agri & Farmer Tech" },
  { pageKey: "advisory-services", title: "Advisory Services" },
  { pageKey: "nav", title: "Navigation" },
];

const topLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    match: (path) => path === "/admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    match: (path) => path.startsWith("/admin/inquiries"),
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

function NavIcon({ active, children }) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-md transition duration-300 ${
        active
          ? "bg-gradient-to-br from-accent to-accent-soft text-brand-deep shadow-sm shadow-accent/30"
          : "bg-surface-soft text-brand group-hover:bg-brand/10 group-hover:text-brand-deep"
      }`}
    >
      {children}
    </span>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const pagesActive = pathname.startsWith("/admin/pages");
  const [pagesOpen, setPagesOpen] = useState(pagesActive);

  useEffect(() => {
    if (pagesActive) setPagesOpen(true);
  }, [pagesActive]);

  return (
    <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-line bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_20%_0%,rgba(139,200,58,0.16),transparent_55%),radial-gradient(ellipse_at_90%_10%,rgba(74,144,226,0.14),transparent_50%)]"
        aria-hidden
      />

      <div className="relative border-b border-line px-4 py-5">
        <Link href="/admin" className="flex flex-col gap-2">
          <Image
            src="/images/logo.png"
            alt="AgriRely"
            width={148}
            height={44}
            className="h-9 w-auto object-contain object-left"
            priority
          />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Quality · Trust · Impact
          </p>
        </Link>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2.5 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Menu
        </p>
        <ul className="flex flex-col gap-1">
          {topLinks.slice(0, 1).map((link) => {
            const active = link.match(pathname);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition duration-300 ${
                    active
                      ? "bg-accent/15 text-brand-deep ring-1 ring-accent/30"
                      : "text-muted hover:bg-surface-soft hover:text-brand-deep"
                  }`}
                >
                  <NavIcon active={active}>{link.icon}</NavIcon>
                  {link.label}
                </Link>
              </li>
            );
          })}

          <li>
            <div
              className={`overflow-hidden rounded-xl transition-all duration-300 ${
                pagesOpen || pagesActive
                  ? "bg-gradient-to-b from-accent/10 via-surface-soft/80 to-brand/[0.06] ring-1 ring-accent/20"
                  : "hover:bg-surface-soft"
              }`}
            >
              <button
                type="button"
                aria-expanded={pagesOpen}
                aria-controls="admin-pages-submenu"
                onClick={() => setPagesOpen((open) => !open)}
                className={`group flex w-full items-center gap-3 px-3 py-3 text-left text-base font-medium transition duration-300 ${
                  pagesActive || pagesOpen
                    ? "text-brand-deep"
                    : "text-muted hover:text-brand-deep"
                }`}
              >
                <NavIcon active={pagesActive || pagesOpen}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden
                  >
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
                </NavIcon>
                <span className="min-w-0 flex-1">Pages</span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition duration-300 ${
                    pagesOpen
                      ? "bg-accent/20 text-brand-deep"
                      : "bg-surface-soft text-muted group-hover:text-brand"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      pagesOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id="admin-pages-submenu"
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  pagesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className={`px-2 pb-2.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      pagesOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between px-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        All pages
                      </p>
                      <Link
                        href="/admin/pages"
                        className="text-[11px] font-semibold text-brand transition hover:text-brand-deep"
                      >
                        View all
                      </Link>
                    </div>

                    <ul className="relative ml-3 space-y-0.5 border-l-2 border-brand/15 pl-3">
                      {pageLinks.map((page, index) => {
                        const href = `/admin/pages/${page.pageKey}`;
                        const active =
                          pathname === href ||
                          pathname.startsWith(`${href}/`);

                        return (
                          <li
                            key={page.pageKey}
                            style={{
                              transitionDelay: pagesOpen
                                ? `${40 + index * 28}ms`
                                : "0ms",
                            }}
                            className={`transition-all duration-300 ease-out ${
                              pagesOpen
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-1 opacity-0"
                            }`}
                          >
                            <Link
                              href={href}
                              className={`group/item relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[15px] font-medium transition duration-200 ${
                                active
                                  ? "bg-brand text-white shadow-sm shadow-brand/25"
                                  : "text-muted hover:bg-white/80 hover:text-brand-deep"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
                                  active
                                    ? "bg-accent-soft"
                                    : "bg-accent/70 group-hover/item:bg-accent"
                                }`}
                                aria-hidden
                              />
                              <span className="min-w-0 flex-1 truncate">
                                {page.title}
                              </span>
                              {active ? (
                                <span
                                  className="text-white/80"
                                  aria-hidden
                                >
                                  →
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          {topLinks.slice(1).map((link) => {
            const active = link.match(pathname);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition duration-300 ${
                    active
                      ? "bg-accent/15 text-brand-deep ring-1 ring-accent/30"
                      : "text-muted hover:bg-surface-soft hover:text-brand-deep"
                  }`}
                >
                  <NavIcon active={active}>{link.icon}</NavIcon>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative border-t border-line p-3">
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
              credentials: "include",
            });
            window.location.href = "/admin/login";
          }}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-medium text-muted transition duration-300 hover:bg-surface-soft hover:text-brand-deep"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-soft text-brand transition group-hover:bg-brand/10">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M10 8V6.5A2.5 2.5 0 0 1 12.5 4h5A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 10 17.5V16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <path
                d="M14 12H4m0 0 2.5-2.5M4 12l2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}
