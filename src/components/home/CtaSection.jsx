import Button from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";

export default function CtaSection({ data }) {
  const { heading, description, buttonText, buttonLink, email } =
    data ?? homeContent.cta;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grain" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(36rem,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(127,195,80,0.16),transparent_70%)]"
        aria-hidden
      />

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="animate-fade-up mx-auto flex w-full max-w-7xl flex-col gap-6 border-y border-line py-8 sm:gap-8 sm:py-10 md:flex-row md:items-end md:justify-between md:gap-12 lg:gap-16">
          <div className="min-w-0 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Next Step
            </p>
            <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.75rem]">
              {heading}
            </h2>
            <div
              className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-brand to-transparent"
              aria-hidden
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {description}
            </p>
          </div>

          <div className="animate-fade-up delay-1 flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:items-start md:items-end md:pb-1">
            <Button
              href={buttonLink}
              className="w-full !bg-accent !px-6 !py-3.5 !text-brand-deep !shadow-[0_12px_28px_rgba(127,195,80,0.28)] hover:!bg-accent-soft sm:w-auto"
            >
              {buttonText}
            </Button>
            <a
              href={`mailto:${email}`}
              className="group inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-brand transition hover:text-brand-deep"
            >
              <span className="hidden h-px w-5 shrink-0 bg-brand/40 transition group-hover:w-8 group-hover:bg-accent sm:block" />
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
