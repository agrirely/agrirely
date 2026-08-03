"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navLinks";
import Button from "@/components/ui/Button";

const primaryLinks = navLinks.filter((link) => link.href !== "/contact-us");

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  return (
    <nav className="flex items-center">
      {/* Desktop links */}
      <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
        {primaryLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative whitespace-nowrap py-1 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                active
                  ? "text-brand-deep"
                  : "text-foreground/65 hover:text-brand-deep"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
                  active
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition duration-300 sm:h-11 sm:w-11 lg:hidden ${
          isOpen
            ? "border-brand bg-brand text-white"
            : "border-line bg-surface text-brand-deep hover:border-brand/35 hover:bg-surface-soft"
        }`}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="relative flex h-3.5 w-[18px] flex-col justify-between">
          <span
            className={`h-[1.5px] w-full origin-center rounded-full bg-current transition duration-300 ${
              isOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-full rounded-full bg-current transition duration-300 ${
              isOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-full origin-center rounded-full bg-current transition duration-300 ${
              isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Mobile menu */}
      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 bg-brand-deep/25 backdrop-blur-[2px] sm:top-[4.75rem] lg:hidden"
            aria-label="Close menu overlay"
            onClick={() => setIsOpen(false)}
          />

          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-surface shadow-[0_18px_40px_rgba(20,35,58,0.12)] animate-fade-up sm:top-[4.75rem] sm:max-h-[calc(100dvh-4.75rem)] lg:hidden"
          >
            <div className="container-page px-5 py-4 sm:px-8">
              <div className="mb-3 border-b border-line/70 pb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Menu
                </p>
                <p className="mt-0.5 text-sm text-muted">Explore AgriRely</p>
              </div>

              <div className="flex flex-col gap-1">
                {primaryLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-md px-3.5 py-3.5 text-[15px] font-medium transition active:scale-[0.99] ${
                        active
                          ? "bg-brand/10 text-brand-deep"
                          : "text-foreground/85 hover:bg-surface-soft hover:text-brand-deep"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        {link.label}
                        {active ? (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        ) : null}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-line/70 pt-4 pb-1">
                <Button
                  href="/contact-us"
                  className="w-full !py-3 text-sm"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </nav>
  );
}
