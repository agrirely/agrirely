import ReadMoreText from "@/components/ui/ReadMoreText";
import CapabilitiesSwiper, {
  CapabilityCard,
} from "@/components/about/CapabilitiesSwiper";
import { aboutContent } from "@/data/aboutContent";

const delays = ["delay-1", "delay-2", "delay-3", "delay-4"];

export default function WhatWeDoSection() {
  const { heading, description, description2, description3, capabilities } =
    aboutContent.whatWeDo;

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

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-5 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
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

          <div className="animate-fade-up delay-1 space-y-3 text-sm leading-relaxed text-white/70 sm:space-y-4 sm:text-base lg:pt-6">
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

        <div className="mx-auto mt-9 w-full max-w-7xl sm:mt-10 lg:mt-12">
          <div className="animate-fade-up delay-2 border-t border-white/15 pt-6 sm:pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              How We Operate
            </p>
          </div>

          <div className="md:hidden">
            <CapabilitiesSwiper capabilities={capabilities} />
          </div>

          <div className="mt-5 hidden grid-cols-2 gap-3 sm:mt-6 sm:gap-4 md:grid md:grid-cols-3 lg:gap-4">
            {capabilities.map((item, index) => (
              <div
                key={item.title}
                className={`animate-fade-up ${delays[index % delays.length] || ""}`}
              >
                <CapabilityCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
