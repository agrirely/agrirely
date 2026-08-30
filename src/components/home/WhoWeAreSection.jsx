import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { homeContent } from "@/data/homeContent";

const delays = ["delay-1", "delay-2", "delay-3", "delay-4"];

export default function WhoWeAreSection({ data }) {
  const content = data ?? homeContent;
  const { heading, description, description2, image } = content.whoWeAre;
  const { stats, heading: reachHeading } = content.globalReach;
  const imageSrc = image || "/images/home/who-we-are.jpg";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grain" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-9 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="container-page grid items-center gap-5 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="animate-fade-up max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              About AgriRely
            </p>
            <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:mt-3 sm:text-4xl lg:text-[2.75rem]">
              {heading}
            </h2>
            <div
              className="animate-draw-line mt-3.5 h-[3px] w-14 bg-gradient-to-r from-accent via-accent-soft to-brand/40 sm:mt-4 sm:w-16"
              aria-hidden
            />
            <ReadMoreText
              text={description}
              wordLimit={22}
              className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base"
            />
            <ReadMoreText
              text={description2}
              wordLimit={20}
              className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base"
            />
          </div>

          <div className="animate-fade-up delay-1 relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/10]">
            <Image
              src={imageSrc}
              alt="Fresh horticulture produce linking farms to global markets"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(160deg,rgba(26,63,115,0.08)_0%,transparent_40%,rgba(26,63,115,0.35)_100%)]"
              aria-hidden
            />
            <div
              className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-brand to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div className="container-page mt-7 sm:mt-10 lg:mt-12">
          <div className="animate-fade-up delay-2 border-t border-line pt-5 sm:pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              {reachHeading}
            </p>
          </div>

          {/* Mobile: stacked rows for readable long values */}
          <div className="mt-4 divide-y divide-line sm:hidden">
            {stats.map((stat, index) => {
              const isCompact = stat.value.length <= 3;

              return (
                <div
                  key={stat.label}
                  className={`animate-fade-up flex items-start justify-between gap-4 py-4 ${
                    delays[index] || ""
                  }`}
                >
                  <p className="max-w-[7.5rem] shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {stat.label}
                  </p>
                  <p
                    className={`min-w-0 flex-1 text-right font-display tracking-tight text-brand-deep ${
                      isCompact
                        ? "text-3xl leading-none"
                        : "text-sm leading-snug"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tablet + desktop: original grid (desktop unchanged) */}
          <div className="mt-6 hidden gap-7 sm:grid sm:grid-cols-2 lg:mt-7 lg:grid-cols-4 lg:gap-0">
            {stats.map((stat, index) => {
              const isCompact = stat.value.length <= 3;

              return (
                <div
                  key={stat.label}
                  className={`animate-fade-up min-w-0 lg:px-7 lg:first:pl-0 ${
                    index > 0 ? "lg:border-l lg:border-line" : ""
                  } ${delays[index] || ""}`}
                >
                  <p
                    className={`font-display tracking-tight break-words text-brand-deep ${
                      isCompact
                        ? "text-5xl leading-none"
                        : "text-xl leading-snug"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[14rem] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
