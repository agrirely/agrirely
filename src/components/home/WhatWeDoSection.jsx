import ReadMoreText from "@/components/ui/ReadMoreText";
import { homeContent } from "@/data/homeContent";

const delays = ["delay-1", "delay-2", "delay-3"];

export default function WhatWeDoSection() {
  const { heading, description, description2, description3 } =
    homeContent.whatWeDo;
  const {
    heading: modelHeading,
    description: modelDescription,
    highlights,
  } = homeContent.tradingHighlights;

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(127,195,80,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative px-5 py-9 sm:px-8 sm:py-11 lg:px-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-5 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <div className="animate-fade-up max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              Capabilities
            </p>
            <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight sm:text-4xl lg:text-[2.6rem]">
              {heading}
            </h2>
            <div
              className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-accent-soft to-transparent"
              aria-hidden
            />
            <ReadMoreText
              text={description}
              wordLimit={20}
              tone="light"
              className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base"
            />
          </div>

          <div className="animate-fade-up delay-1 grid gap-3 text-sm leading-relaxed text-white/70 sm:gap-3 sm:text-base lg:grid-cols-1 lg:pt-6">
            <ReadMoreText
              text={description2}
              wordLimit={18}
              tone="light"
              className="text-sm leading-relaxed text-white/70 sm:text-base"
            />
            <ReadMoreText
              text={description3}
              wordLimit={18}
              tone="light"
              className="text-sm leading-relaxed text-white/70 sm:text-base"
            />
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-7xl lg:mt-9">
          <div className="animate-fade-up delay-2 border-t border-white/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              {modelHeading}
            </p>
            <ReadMoreText
              text={modelDescription}
              wordLimit={16}
              tone="light"
              className="mt-2.5 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-0">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className={`animate-fade-up group border-t border-white/12 pt-4 md:border-t-0 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0 ${
                  index > 0 ? "md:border-l md:border-white/12" : ""
                } ${
                  index === 2 ? "col-span-2 md:col-span-1" : ""
                } ${delays[index] || ""}`}
              >
                <p className="font-display text-3xl leading-none tracking-tight text-white/12 transition duration-500 group-hover:text-accent/35 sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 font-display text-lg tracking-tight sm:mt-3 sm:text-2xl">
                  {item.title}
                </h3>
                <div
                  className="mt-2 h-px w-8 origin-left bg-accent transition duration-500 group-hover:w-14 sm:mt-2.5 sm:w-10 sm:group-hover:w-16"
                  aria-hidden
                />
                <p className="mt-2.5 text-xs leading-relaxed text-white/65 sm:mt-3 sm:text-sm">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
