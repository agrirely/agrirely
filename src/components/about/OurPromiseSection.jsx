import Button from "@/components/ui/Button";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { aboutContent } from "@/data/aboutContent";
import { SITE_EMAIL } from "@/lib/constants";

const promisePoints = ["Trusted", "Transparent", "Sustainable"];

export default function OurPromiseSection({ data }) {
  const { heading, description, description2 } =
    data ?? aboutContent.ourPromise;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grain" aria-hidden />
      <div
        className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-12 bottom-0 hidden h-52 w-52 rounded-full bg-accent/15 blur-3xl sm:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 hidden h-44 w-[min(40rem,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(127,195,80,0.14),transparent_70%)] sm:block"
        aria-hidden
      />

      <div className="relative px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up grid gap-5 rounded-2xl border border-line bg-surface/70 p-5 shadow-[0_20px_50px_rgba(26,63,115,0.06)] backdrop-blur-sm sm:gap-10 sm:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-12 lg:p-10 lg:rounded-3xl">
            <div className="flex min-w-0 flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand sm:text-xs sm:tracking-[0.22em] sm:text-accent">
                Commitment
              </p>
              <h2 className="mt-2 font-display text-[1.65rem] leading-[0.95] tracking-tight text-brand-deep sm:mt-2.5 sm:text-4xl lg:text-[2.75rem]">
                {heading}
              </h2>
              <div
                className="animate-draw-line mt-3 h-[3px] w-12 bg-brand sm:mt-3.5 sm:w-16 sm:bg-gradient-to-r sm:from-accent sm:via-brand sm:to-transparent"
                aria-hidden
              />

              <ReadMoreText
                text={description}
                wordLimit={14}
                className="mt-4 font-display text-base leading-snug tracking-tight text-brand-deep/90 sm:mt-6 sm:text-2xl lg:text-[1.65rem]"
              />
              <ReadMoreText
                text={description2}
                wordLimit={14}
                className="mt-2.5 text-[13px] leading-relaxed text-muted sm:mt-4 sm:text-base"
              />

              <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 sm:mt-auto sm:flex sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-2 sm:pt-6">
                {promisePoints.map((point, index) => (
                  <li
                    key={point}
                    className="flex items-center justify-center text-center sm:justify-start sm:text-left"
                  >
                    {index > 0 ? (
                      <span
                        className="mx-3 hidden h-1 w-1 rounded-full bg-brand sm:mx-4 sm:block sm:bg-accent"
                        aria-hidden
                      />
                    ) : null}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-deep sm:text-[13px] sm:tracking-[0.16em]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-up delay-1 flex">
              <div className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-line bg-background p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_16px_36px_rgba(26,63,115,0.1)] sm:rounded-2xl sm:p-7">
                <div
                  className="absolute inset-y-0 left-0 w-[3px] bg-brand sm:bg-accent"
                  aria-hidden
                />

                <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-brand sm:text-accent">
                  Partner with us
                </p>
                <p className="relative mt-2.5 font-display text-lg leading-snug tracking-tight text-brand-deep sm:mt-3 sm:text-2xl">
                  Ready to connect producers, markets, and opportunity?
                </p>
                <p className="relative mt-2 text-[13px] leading-relaxed text-muted sm:mt-2.5 sm:text-sm">
                  Let&apos;s build the next chapter of trusted agri trade together.
                </p>

                <div className="relative mt-5 pt-0 sm:mt-auto sm:pt-6">
                  <Button
                    href="/contact-us"
                    className="w-full !bg-brand !px-5 !py-3.5 !text-white !shadow-[0_12px_28px_rgba(26,63,115,0.22)] hover:!bg-brand-deep sm:!bg-accent sm:!text-brand-deep sm:!shadow-[0_12px_28px_rgba(127,195,80,0.28)] sm:hover:!bg-accent-soft"
                  >
                    Contact Us
                  </Button>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="mt-3 flex items-center justify-center gap-2 text-[13px] font-medium text-brand transition hover:text-brand-deep sm:mt-3.5 sm:text-sm"
                  >
                    <span
                      className="h-px w-5 bg-brand/30 transition group-hover:w-7 group-hover:bg-brand sm:group-hover:bg-accent"
                      aria-hidden
                    />
                    {SITE_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
