import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { aboutContent } from "@/data/aboutContent";
import { ABOUT_IMAGE } from "@/lib/constants";

export default function WhoWeAreSection() {
  const { hero, offices, intro } = aboutContent;

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
          <div className="animate-fade-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              AgriRely
            </p>
            <h1 className="mt-2 font-display text-[clamp(2rem,6.5vw,3.5rem)] leading-[0.92] tracking-tight text-brand-deep">
              {hero.heading}
            </h1>
            <div
              className="animate-draw-line mt-3 h-[3px] w-14 bg-gradient-to-r from-accent via-accent-soft to-brand/40 sm:mt-3.5 sm:w-16"
              aria-hidden
            />
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-3.5 sm:text-base">
              {hero.description}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-5">
              <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Offices
              </p>
              <div
                className="hidden h-px w-8 bg-gradient-to-r from-accent to-transparent sm:block"
                aria-hidden
              />
              <ul className="flex flex-wrap items-center gap-x-0 gap-y-2">
                {offices.map((office, index) => (
                  <li key={office} className="flex items-center">
                    {index > 0 ? (
                      <span
                        className="mx-3 h-1 w-1 rounded-full bg-accent sm:mx-4"
                        aria-hidden
                      />
                    ) : null}
                    <span className="font-display text-lg tracking-tight text-brand-deep sm:text-xl">
                      {office}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid items-center gap-5 sm:mt-6 sm:gap-6 lg:mt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="animate-fade-up delay-1 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Who We Are
              </p>
              <ReadMoreText
                text={intro.description}
                wordLimit={24}
                className="mt-2.5 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base"
              />
              <ReadMoreText
                text={intro.description2}
                wordLimit={22}
                className="mt-2.5 text-sm leading-relaxed text-foreground/80 sm:text-base"
              />
            </div>

            <div className="animate-fade-up delay-2 relative aspect-[16/9] w-full overflow-hidden lg:max-h-[13.5rem]">
              <Image
                src={ABOUT_IMAGE}
                alt="Fresh crops prepared for global agricultural trade"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
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
        </div>
      </div>
    </section>
  );
}
