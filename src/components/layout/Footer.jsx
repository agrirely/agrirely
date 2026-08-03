import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/data/navLinks";
import { SITE_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-brand-deep text-white">
      <div className="container-page section-pad !py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light width={180} height={54} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {SITE_TAGLINE}. Bridging producers and markets through integrated
              trading, technology, and advisory.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
              Reach Us
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="mt-4 block text-sm text-white/75 transition hover:text-white"
            >
              {SITE_EMAIL}
            </a>
            <p className="mt-3 text-sm text-white/55">
              HQ: Pune, India
              <br />
              Presence: Delhi NCR, Mumbai
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>Global agri trade · Origination · Distribution</p>
        </div>
      </div>
    </footer>
  );
}
