import Button from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";

export default function CtaSection() {
  const { heading, description, buttonText, buttonLink, email } =
    homeContent.cta;

  return (
    <section className="section-pad grain">
      <div className="container-page">
        <div className="grid gap-8 border-y border-line py-12 md:grid-cols-[1.4fr_auto] md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Next Step
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-brand-deep sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button href={buttonLink}>{buttonText}</Button>
            <a
              href={`mailto:${email}`}
              className="text-sm font-medium text-brand transition hover:text-brand-mid"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
