import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { tradingContent } from "@/data/tradingContent";
import { ABOUT_IMAGE } from "@/lib/constants";

const delays = ["delay-1", "delay-2", "delay-3"];

export default function TradingSection({ data }) {
  const { hero, trading, globalTrading, domesticTrading } =
    data ?? tradingContent;
  const imageSrc = trading?.image || ABOUT_IMAGE;

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 grain" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 top-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              AgriRely
            </p>
            <h1 className="mt-2 font-display text-[clamp(2rem,6.5vw,3.5rem)] leading-[0.92] tracking-tight text-brand-deep">
              {hero.heading}
            </h1>
            <div
              className="animate-draw-line mt-3 h-[3px] w-14 bg-gradient-to-r from-accent via-accent-soft to-brand/40 sm:mt-3.5 sm:w-16"
              aria-hidden
            />
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:mt-3.5 sm:text-base">
              {hero.description}
            </p>
          </div>

          <div className="mt-5 grid items-center gap-5 sm:mt-6 sm:gap-6 lg:mt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="animate-fade-up delay-1 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                {trading.heading}
              </p>
              <ReadMoreText
                text={trading.description}
                wordLimit={24}
                className="mt-2.5 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base"
              />
              <ReadMoreText
                text={trading.description2}
                wordLimit={18}
                className="mt-2.5 text-sm leading-relaxed text-foreground/80 sm:text-base"
              />
            </div>

            <div className="animate-fade-up delay-2 relative aspect-[16/9] w-full overflow-hidden lg:max-h-[13.5rem]">
              <Image
                src={imageSrc}
                alt="Agricultural commodities prepared for global trade"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(160deg,rgba(26,63,115,0.1)_0%,transparent_42%,rgba(26,63,115,0.38)_100%)]"
                aria-hidden
              />
              <div
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-brand to-transparent"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-9 border-t border-line pt-7 sm:mt-10 sm:pt-8 lg:mt-12 lg:pt-9">
            <div className="animate-fade-up delay-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Three-pronged model
                </p>
                <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem]">
                  {globalTrading.heading}
                </h2>
                <div
                  className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-brand to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
              {globalTrading.types.map((item, index) => (
                <article
                  key={item.title}
                  className={`animate-fade-up group border-t border-line bg-surface/50 px-4 py-5 transition duration-300 hover:border-brand sm:px-5 sm:py-6 ${
                    delays[index] || ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg tracking-tight text-brand-deep sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="font-display text-2xl leading-none text-brand/15 transition group-hover:text-accent/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 border-t border-line pt-7 sm:mt-10 sm:gap-6 sm:pt-8 lg:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 lg:pt-9">
            <div className="animate-fade-up delay-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                India focus
              </p>
              <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.4rem]">
                {domesticTrading.heading}
              </h2>
              <div
                className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-brand to-transparent"
                aria-hidden
              />
            </div>
            <ReadMoreText
              text={domesticTrading.description}
              wordLimit={28}
              className="animate-fade-up delay-2 text-sm leading-relaxed text-foreground/80 sm:text-base lg:pt-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
