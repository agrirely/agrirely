import ReadMoreText from "@/components/ui/ReadMoreText";
import { tradingContent } from "@/data/tradingContent";

export default function StorageDistributionSection({ data }) {
  const { heading, storage, distribution } =
    data ?? tradingContent.storageDistribution;

  const blocks = [storage, distribution];

  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(169,223,249,0.28)_0%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-28 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Logistics
            </p>
            <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem]">
              {heading}
            </h2>
            <div
              className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-brand to-transparent"
              aria-hidden
            />
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-6">
            {blocks.map((block, index) => (
              <article
                key={block.title}
                className={`animate-fade-up group relative overflow-hidden rounded-xl border border-line bg-background/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(26,63,115,0.08)] sm:rounded-2xl sm:p-6 lg:p-7 ${
                  index === 0 ? "delay-1" : "delay-2"
                }`}
              >
                <div
                  className="absolute inset-y-0 left-0 w-0 bg-gradient-to-b from-accent via-accent-soft to-brand transition-all duration-500 group-hover:w-[3px]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition duration-500 group-hover:bg-accent/20"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tight text-brand-deep sm:text-2xl">
                    {block.title}
                  </h3>
                  <span className="font-display text-2xl leading-none text-brand/15 transition group-hover:text-accent/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className="relative mt-2.5 h-px w-8 origin-left bg-brand/20 transition-all duration-500 group-hover:w-14 group-hover:bg-accent"
                  aria-hidden
                />
                <ReadMoreText
                  text={block.description}
                  wordLimit={22}
                  className="relative mt-3 text-sm leading-relaxed text-muted sm:text-base"
                />
                <ReadMoreText
                  text={block.description2}
                  wordLimit={18}
                  className="relative mt-2.5 text-sm leading-relaxed text-foreground/80 sm:text-base"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
