import SectionHeading from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/homeContent";

export default function PhilosophySection() {
  const { heading, title, description, description2 } = homeContent.philosophy;
  const promise = homeContent.ourPromise;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1a3f73_0%,#4f86c6_52%,#7fc350_100%)] text-white">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent-soft/25 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sky/20 blur-3xl" />

      <div className="section-pad relative">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading light eyebrow={heading} heading={title} />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description2}
            </p>
          </div>

          <div className="border border-white/15 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              {promise.heading}
            </p>
            <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">
              {promise.description}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
              {promise.description2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
