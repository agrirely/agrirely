import SectionHeading from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/homeContent";

export default function WhatWeDoSection() {
  const { heading, description, description2, description3 } =
    homeContent.whatWeDo;
  const { highlights } = homeContent.tradingHighlights;

  return (
    <section className="bg-brand-deep text-white">
      <div className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            light
            eyebrow="Capabilities"
            heading={heading}
            description={description}
          />
          <div className="space-y-5 text-base leading-relaxed text-white/75 sm:text-lg">
            <p>{description2}</p>
            <p>{description3}</p>
          </div>
        </div>

        <div className="container-page mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
            {homeContent.tradingHighlights.heading}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            {homeContent.tradingHighlights.description}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className="border-t border-white/15 pt-6"
              >
                <p className="font-display text-4xl text-white/15">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
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
