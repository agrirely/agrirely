import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { techContent } from "@/data/techContent";

const techSignals = ["AI & Sensors", "Drones", "Automation", "Data-driven"];

export default function OverviewSection({ data }) {
  const content = data ?? techContent;
  const { hero, overview } = content;
  const imageSrc = overview?.image || "/images/tech/overview.jpg";

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

      <div className="relative px-5 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.22em]">
              AgriRely
            </p>
            <h1 className="mt-1.5 font-display text-[clamp(1.85rem,8vw,3.5rem)] leading-[0.95] tracking-tight text-brand-deep sm:mt-2 sm:leading-[0.92]">
              {hero.heading}
            </h1>
            <div
              className="animate-draw-line mt-2.5 h-[3px] w-12 bg-gradient-to-r from-accent via-accent-soft to-brand/40 sm:mt-3.5 sm:w-16"
              aria-hidden
            />
            <ReadMoreText
              text={hero.description}
              wordLimit={18}
              className="mt-2.5 max-w-3xl text-[13px] leading-relaxed text-muted sm:mt-3.5 sm:text-base"
            />
          </div>

          <div className="mt-4 grid items-center gap-4 sm:mt-6 sm:gap-6 lg:mt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="animate-fade-up delay-2 order-1 relative aspect-[16/9] w-full overflow-hidden sm:delay-2 lg:order-2">
              <Image
                src={imageSrc}
                alt="Agricultural drone monitoring crops with sensors in the field"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_15%]"
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

            <div className="animate-fade-up delay-1 order-2 max-w-2xl lg:order-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-xs sm:tracking-[0.22em]">
                {overview.heading}
              </p>
              <ReadMoreText
                text={overview.description}
                wordLimit={18}
                className="mt-2 text-[13px] leading-relaxed text-muted sm:mt-3 sm:text-base"
              />
              <ReadMoreText
                text={overview.description2}
                wordLimit={14}
                className="mt-2 text-[13px] leading-relaxed text-foreground/80 sm:mt-2.5 sm:text-base"
              />

              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-line pt-3.5 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-2 sm:pt-5">
                {techSignals.map((signal, index) => (
                  <li key={signal} className="flex min-w-0 items-center">
                    {index > 0 ? (
                      <span
                        className="mx-3 hidden h-1 w-1 shrink-0 rounded-full bg-accent sm:mx-4 sm:block"
                        aria-hidden
                      />
                    ) : null}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-deep sm:text-xs sm:tracking-[0.16em]">
                      {signal}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
