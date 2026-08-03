import SectionHeading from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/homeContent";

export default function WhoWeAreSection() {
  const { heading, description, description2 } = homeContent.whoWeAre;
  const { stats } = homeContent.globalReach;

  return (
    <section className="section-pad grain">
      <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          eyebrow="About AgriRely"
          heading={heading}
          description={description}
        />
        <p className="animate-fade-up text-base leading-relaxed text-muted sm:text-lg">
          {description2}
        </p>
      </div>

      <div className="container-page mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`animate-fade-up ${
              ["delay-1", "delay-2", "delay-3", "delay-4"][index] || ""
            }`}
          >
            <p className="font-display text-2xl leading-snug text-brand-deep sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
