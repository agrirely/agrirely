import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/data/navLinks";
import { SITE_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const exploreLinks = navLinks.filter((link) => link.href !== "/contact-us");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-deep text-white">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-sky/10 blur-3xl"
        aria-hidden
      />
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        aria-hidden
      />

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12 lg:gap-16">
          <div className="col-span-2 max-w-md md:col-span-1">
            <Logo light width={180} height={54} />
            <p className="mt-4 font-display text-xl tracking-tight text-white sm:text-2xl">
              {SITE_TAGLINE}
            </p>
            <div
              className="mt-3 h-[2px] w-14 bg-gradient-to-r from-accent via-accent-soft to-transparent"
              aria-hidden
            />
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Bridging producers and markets through integrated trading,
              technology, and advisory.
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Explore
            </p>
            <ul className="mt-4 space-y-1 sm:space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex min-h-9 items-center gap-2 py-1 text-sm text-white/70 transition duration-300 hover:text-white sm:min-h-0 sm:py-0"
                  >
                    <span className="hidden h-px w-0 bg-accent transition-all duration-300 group-hover:w-3 md:block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Reach Us
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="mt-4 inline-block break-all text-sm font-medium text-white transition hover:text-accent-soft"
            >
              {SITE_EMAIL}
            </a>
            <Link
              href="/contact-us"
              className="mt-2 inline-flex min-h-9 items-center text-sm text-white/70 transition hover:text-white sm:min-h-0"
            >
              Contact Us →
            </Link>
            <div className="mt-4 space-y-1.5 text-sm text-white/55 sm:mt-5">
              <p>HQ: Pune, India</p>
              <p>Presence: Delhi NCR, Mumbai</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="tracking-wide">
            Global agri trade · Origination · Distribution
          </p>
        </div>
      </div>
    </footer>
  );
}
