import Image from "next/image";
import { contactContent } from "@/data/contactContent";

const locationItems = [
  { label: "Global", key: "global" },
  { label: "India", key: "india" },
  { label: "Corporate HQ", key: "corporateHQ" },
];

export default function ReachUsSection({ data }) {
  const { hero, reachUs } = data ?? contactContent;
  const heroImage = hero?.image || "/images/contact/hero.jpg";
  const reachImage = reachUs?.image || "/images/contact/reach-us.jpg";

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 grain" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 top-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              AgriRely
            </p>
            <h1 className="mt-2 font-display text-[clamp(2rem,6.5vw,3.5rem)] leading-[0.92] tracking-tight text-brand-deep">
              {hero.heading}
            </h1>
            <p className="mt-3 font-display text-xl leading-snug tracking-tight text-brand sm:mt-3.5 sm:text-2xl lg:text-[1.75rem]">
              {hero.subheading}
            </p>
            <div
              className="animate-draw-line mt-3 h-[3px] w-14 bg-brand sm:mt-3.5 sm:w-16"
              aria-hidden
            />
          </div>

          <div className="mt-5 grid items-center gap-5 sm:mt-6 sm:gap-6 lg:mt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <p className="animate-fade-up delay-1 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {hero.description}
            </p>

            <div className="animate-fade-up delay-2 relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={heroImage}
                alt="Talking with AgriRely about products, services, and partnership"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(160deg,rgba(26,63,115,0.1)_0%,transparent_42%,rgba(26,63,115,0.38)_100%)]"
                aria-hidden
              />
              <div
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-brand to-transparent"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-7 sm:mt-10 sm:pt-8 lg:mt-12 lg:pt-9">
            <div className="animate-fade-up delay-1 grid items-center gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Locations
                </p>
                <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem]">
                  {reachUs.heading}
                </h2>
                <div
                  className="animate-draw-line mt-3.5 h-[3px] w-16 bg-brand"
                  aria-hidden
                />
                <a
                  href={`mailto:${reachUs.email}`}
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-brand-deep sm:mt-5"
                >
                  <span
                    className="h-px w-5 bg-brand/40 transition group-hover:w-8 group-hover:bg-accent"
                    aria-hidden
                  />
                  {reachUs.email}
                </a>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={reachImage}
                  alt="AgriRely offices and global presence"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(160deg,rgba(26,63,115,0.1)_0%,transparent_42%,rgba(26,63,115,0.38)_100%)]"
                  aria-hidden
                />
                <div
                  className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-brand to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
              {locationItems.map((item, index) => (
                <article
                  key={item.key}
                  className={`animate-fade-up group relative overflow-hidden rounded-xl border border-line bg-background/70 px-4 py-5 shadow-[0_8px_24px_rgba(26,63,115,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/25 hover:bg-surface hover:shadow-[0_18px_40px_rgba(26,63,115,0.1)] sm:rounded-2xl sm:px-5 sm:py-6 ${
                    index === 0
                      ? "delay-1"
                      : index === 1
                        ? "delay-2"
                        : "delay-3"
                  }`}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-0 bg-brand transition-all duration-500 group-hover:w-[3px]"
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition duration-500 group-hover:text-brand">
                      {item.label}
                    </p>
                    <span className="font-display text-2xl leading-none text-brand/15 transition duration-500 group-hover:text-brand/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="relative mt-3 h-px w-8 origin-left bg-brand/15 transition-all duration-500 group-hover:w-14 group-hover:bg-brand"
                    aria-hidden
                  />
                  <p className="relative mt-3 font-display text-lg leading-snug tracking-tight text-brand-deep sm:text-xl">
                    {reachUs[item.key]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
