import ReadMoreText from "@/components/ui/ReadMoreText";
import { aboutContent } from "@/data/aboutContent";

const delays = ["delay-1", "delay-2", "delay-3"];

export default function GlobalReachSection({ data }) {
  const { heading, description, description2, highlights } =
    data ?? aboutContent.globalReach;

  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(169,223,249,0.28)_0%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-28 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up grid gap-4 border-b border-line pb-5 sm:gap-8 sm:pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.22em]">
                Worldwide
              </p>
              <h2 className="mt-2 font-display text-[1.65rem] leading-[0.95] tracking-tight text-brand-deep sm:mt-2.5 sm:text-4xl lg:text-[2.6rem]">
                {heading}
              </h2>
              <div
                className="animate-draw-line mt-3 h-[3px] w-12 bg-brand sm:mt-3.5 sm:w-16"
                aria-hidden
              />
            </div>
            <ReadMoreText
              text={description2}
              wordLimit={14}
              className="animate-fade-up delay-1 max-w-md text-[13px] leading-relaxed text-muted sm:text-base lg:pb-1 lg:text-right"
            />
          </div>

          <div className="mt-5 grid gap-5 sm:mt-7 sm:gap-6 lg:mt-9 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:items-start">
            <ReadMoreText
              text={description}
              wordLimit={18}
              className="animate-fade-up delay-1 text-[13px] leading-relaxed text-foreground/80 sm:text-base"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1">
              {highlights.map((item, index) => (
                <article
                  key={item.title}
                  className={`animate-fade-up group relative overflow-hidden border border-line bg-background/70 px-3.5 py-3.5 transition duration-300 hover:border-brand sm:border-0 sm:border-t sm:bg-background/60 sm:px-5 sm:py-5 ${
                    index === 2
                      ? "col-span-2 mx-auto w-[calc(50%-0.375rem)] sm:col-span-1 sm:mx-0 sm:w-auto"
                      : ""
                  } ${delays[index] || ""}`}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-[3px] bg-brand sm:hidden"
                    aria-hidden
                  />

                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <h3 className="min-w-0 font-display text-[15px] tracking-tight text-brand-deep sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="shrink-0 font-display text-lg leading-none text-brand/20 transition group-hover:text-accent/50 sm:text-2xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted sm:text-sm">
                    {item.description}
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
