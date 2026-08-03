import ReadMoreText from "@/components/ui/ReadMoreText";
import { aboutContent } from "@/data/aboutContent";

const delays = ["delay-1", "delay-2", "delay-3"];

export default function PhilosophySection() {
  const { heading, title, description, description2, pillars } =
    aboutContent.philosophy;

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white sm:bg-[linear-gradient(120deg,#14233a_0%,#1a3f73_38%,#4f86c6_72%,#7fc350_100%)]">
      <div
        className="pointer-events-none absolute -right-20 top-0 hidden h-56 w-56 rounded-full bg-accent-soft/20 blur-3xl sm:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sky/15 blur-3xl sm:bg-sky/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(79,134,198,0.14),transparent_45%)] sm:bg-[radial-gradient(ellipse_at_20%_50%,rgba(224,230,102,0.12),transparent_45%)]"
        aria-hidden
      />

      <div className="relative px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-14">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky sm:text-xs sm:tracking-[0.22em] sm:text-accent-soft">
                {heading}
              </p>
              <h2 className="mt-2 font-display text-[1.65rem] leading-[0.95] tracking-tight sm:mt-2.5 sm:text-4xl lg:text-[2.9rem]">
                {title}
              </h2>
              <div
                className="animate-draw-line mt-3 h-[3px] w-12 bg-sky sm:mt-4 sm:w-16 sm:bg-gradient-to-r sm:from-accent-soft sm:via-accent sm:to-transparent"
                aria-hidden
              />
              <ReadMoreText
                text={description}
                wordLimit={16}
                tone="light"
                className="mt-3.5 max-w-2xl text-[13px] leading-relaxed text-white/80 sm:mt-5 sm:text-base"
              />
            </div>

            <ReadMoreText
              text={description2}
              wordLimit={16}
              tone="light"
              className="animate-fade-up delay-1 max-w-md border-t border-white/15 pt-3.5 text-[13px] leading-relaxed text-white/65 sm:border-t-0 sm:pt-0 sm:text-base lg:border-l lg:border-white/20 lg:pl-8 lg:pt-0"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:mt-12 lg:gap-5">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`animate-fade-up group relative overflow-hidden rounded-xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-sky/45 hover:bg-white/[0.1] hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:rounded-2xl sm:p-6 sm:hover:border-accent-soft/55 sm:hover:bg-[linear-gradient(155deg,rgba(224,230,102,0.22)_0%,rgba(127,195,80,0.14)_45%,rgba(255,255,255,0.06)_100%)] ${
                  index === 2
                    ? "col-span-2 mx-auto w-[calc(50%-0.375rem)] sm:col-span-1 sm:mx-0 sm:w-auto"
                    : ""
                } ${delays[index] || ""}`}
              >
                <div
                  className="absolute inset-y-0 left-0 w-[3px] bg-sky sm:w-0 sm:bg-gradient-to-b sm:from-accent-soft sm:via-accent sm:to-transparent sm:transition-all sm:duration-500 sm:group-hover:w-[3px]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 hidden h-28 w-28 rounded-full bg-accent-soft/0 blur-2xl transition duration-500 group-hover:bg-accent-soft/30 sm:block"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-2 sm:gap-3">
                  <p className="font-display text-2xl leading-none tracking-tight text-white/15 transition duration-500 group-hover:text-sky sm:text-4xl sm:group-hover:text-accent-soft">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span
                    className="mt-1 text-sm text-white/25 transition duration-500 group-hover:translate-x-0.5 group-hover:text-sky sm:group-hover:text-accent-soft"
                    aria-hidden
                  >
                    →
                  </span>
                </div>

                <h3 className="relative mt-3 font-display text-base tracking-tight transition duration-500 group-hover:text-sky sm:mt-4 sm:text-2xl sm:group-hover:text-accent-soft">
                  {pillar.title}
                </h3>
                <div
                  className="relative mt-2 h-px w-8 origin-left bg-white/25 transition-all duration-500 group-hover:w-14 group-hover:bg-sky sm:mt-2.5 sm:group-hover:bg-accent-soft"
                  aria-hidden
                />
                <p className="relative mt-2.5 text-[12px] leading-relaxed text-white/65 transition duration-500 group-hover:text-white/90 sm:mt-3 sm:text-sm">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
