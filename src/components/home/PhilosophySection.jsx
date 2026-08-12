import ReadMoreText from "@/components/ui/ReadMoreText";
import { homeContent } from "@/data/homeContent";

export default function PhilosophySection({ data }) {
  const content = data ?? homeContent;
  const { heading, title, description, description2 } = content.philosophy;
  const promise = content.ourPromise;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#14233a_0%,#1a3f73_38%,#4f86c6_72%,#7fc350_100%)] text-white">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-accent-soft/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sky/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(224,230,102,0.12),transparent_45%)]"
        aria-hidden
      />

      <div className="relative px-5 py-8 sm:px-8 sm:py-11 lg:px-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          <div className="animate-fade-up min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-soft sm:text-xs">
              {heading}
            </p>
            <h2 className="mt-2 font-display text-[1.65rem] leading-[0.95] tracking-tight sm:mt-2.5 sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <div
              className="animate-draw-line mt-3 h-[3px] w-14 bg-gradient-to-r from-accent-soft via-accent to-transparent sm:mt-3.5 sm:w-16"
              aria-hidden
            />
            <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base">
              {description}
            </p>
            <ReadMoreText
              text={description2}
              wordLimit={18}
              tone="light"
              className="mt-2.5 max-w-2xl text-sm leading-relaxed text-white/65 sm:mt-3 sm:text-base"
            />
          </div>

          {/* Mobile promise panel */}
          <div className="animate-fade-up delay-1 relative min-w-0 overflow-hidden bg-white/8 px-4 py-5 sm:hidden">
            <div
              className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-accent-soft via-accent to-transparent"
              aria-hidden
            />
            <p className="pl-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-soft">
              {promise.heading}
            </p>
            <ReadMoreText
              text={promise.description}
              wordLimit={16}
              tone="light"
              className="mt-2.5 pl-2 font-display text-base leading-snug tracking-tight"
            />
            <ReadMoreText
              text={promise.description2}
              wordLimit={14}
              tone="light"
              className="mt-2.5 pl-2 text-sm leading-relaxed text-white/65"
            />
          </div>

          {/* Tablet + desktop promise (desktop layout unchanged) */}
          <div className="animate-fade-up delay-1 relative hidden min-w-0 border-t border-white/15 pt-6 pl-0 sm:block sm:pl-6 lg:border-l lg:border-t-0 lg:border-white/20 lg:pl-10 lg:pt-0">
            <div
              className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-accent-soft via-accent to-transparent lg:hidden"
              aria-hidden
            />
            <div className="sm:pl-0 lg:pl-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
                {promise.heading}
              </p>
              <p className="mt-3 font-display text-xl leading-snug tracking-tight sm:text-2xl">
                {promise.description}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {promise.description2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
