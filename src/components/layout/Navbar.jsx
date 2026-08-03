"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navLinks";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="relative flex items-center">
      <div className="hidden items-center gap-7 lg:flex">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition ${
                active ? "text-brand" : "text-foreground/75 hover:text-brand"
              }`}
            >
              {link.label}
              {active ? (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
              ) : null}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-brand lg:hidden"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <span className="sr-only">Menu</span>
        <span className="flex w-4 flex-col gap-1">
          <span
            className={`h-0.5 w-full bg-current transition ${
              isOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-current transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-current transition ${
              isOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-2.5rem))] rounded-lg border border-line bg-surface p-4 shadow-[0_20px_50px_rgba(15,42,28,0.12)] lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-surface-soft text-brand"
                    : "text-foreground/80 hover:bg-surface-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
