import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/homeContent";

export default function ServicesOverviewSection() {
  const { heading, subheading, services } = homeContent.servicesOverview;

  return (
    <section className="section-pad bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          heading={heading}
          description={subheading}
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              index={index + 1}
              title={service.title}
              description={service.description}
              href={service.link}
            />
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl text-brand-deep">
              {homeContent.techHighlight.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {homeContent.techHighlight.description}
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-brand-deep">
              {homeContent.advisoryHighlight.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {homeContent.advisoryHighlight.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
