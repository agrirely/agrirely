import Link from "next/link";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { homeContent } from "@/data/homeContent";

const delays = ["delay-1", "delay-2", "delay-3"];

export default function ServicesOverviewSection() {
  const { heading, subheading, services } = homeContent.servicesOverview;
  const tech = homeContent.techHighlight;
  const advisory = homeContent.advisoryHighlight;

  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(169,223,249,0.28)_0%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Services
              </p>
              <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem]">
                {heading}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted sm:pb-1 sm:text-right sm:text-base">
              {subheading}
            </p>
          </div>

          {/* Mobile: 2-col service grid */}
          <div className="mt-5 grid grid-cols-2 gap-3 md:hidden">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.link}
                className={`animate-fade-up group flex min-h-0 flex-col border border-line/80 bg-surface-soft/50 p-3.5 transition duration-300 active:bg-surface-soft ${
                  index === 2 ? "col-span-2" : ""
                } ${delays[index] || ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display text-2xl leading-none tracking-tight text-brand/25 transition group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="text-base font-light text-brand transition group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-base leading-snug tracking-tight text-brand-deep">
                  {service.title}
                </h3>
                <div className="mt-2 grow">
                  <ReadMoreText
                    text={service.description}
                    wordLimit={index === 2 ? 22 : 14}
                    className="text-xs leading-relaxed text-muted"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Tablet + desktop: directory rows (unchanged) */}
          <div className="mt-2 hidden md:block">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.link}
                className={`animate-fade-up group grid grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)_2rem] items-center gap-6 border-b border-line py-8 transition duration-300 hover:bg-surface-soft/70 ${
                  delays[index] || ""
                }`}
              >
                <span className="font-display text-4xl leading-none tracking-tight text-brand/25 transition duration-300 group-hover:text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-[1.65rem] tracking-tight text-brand-deep transition duration-300 group-hover:text-brand">
                  {service.title}
                </h3>

                <p className="text-[0.95rem] leading-relaxed text-muted">
                  {service.description}
                </p>

                <span
                  aria-hidden
                  className="text-xl font-light text-brand transition duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Focus panels: 2-col from mobile */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:gap-5">
            <div className="animate-fade-up delay-2 relative overflow-hidden bg-[linear-gradient(145deg,#e7f1fb_0%,#f3f7fb_55%,#eef8e8_100%)] px-3.5 py-4 pl-4 sm:px-8 sm:py-8 sm:pl-8">
              <div
                className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-brand via-brand-mid to-accent"
                aria-hidden
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand sm:text-[11px]">
                Focus
              </p>
              <h3 className="mt-2 font-display text-base tracking-tight text-brand-deep sm:mt-3 sm:text-2xl">
                {tech.heading}
              </h3>
              <div className="mt-2 sm:mt-3">
                <ReadMoreText
                  text={tech.description}
                  wordLimit={16}
                  className="text-xs leading-relaxed text-muted sm:text-sm"
                />
              </div>
            </div>

            <div className="animate-fade-up delay-3 relative overflow-hidden bg-[linear-gradient(145deg,#eef8e8_0%,#f3f7fb_55%,#e7f1fb_100%)] px-3.5 py-4 pl-4 sm:px-8 sm:py-8 sm:pl-8">
              <div
                className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-accent via-accent-soft to-brand"
                aria-hidden
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-[11px]">
                Focus
              </p>
              <h3 className="mt-2 font-display text-base tracking-tight text-brand-deep sm:mt-3 sm:text-2xl">
                {advisory.heading}
              </h3>
              <div className="mt-2 sm:mt-3">
                <ReadMoreText
                  text={advisory.description}
                  wordLimit={16}
                  className="text-xs leading-relaxed text-muted sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
