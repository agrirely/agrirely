"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { techContent } from "@/data/techContent";

export default function TradingPlatformSection({ data }) {
  const { heading, description, keyAttributes, closingNote, image } =
    data ?? techContent.tradingPlatform;
  const imageSrc = image || "/images/tech/trading-platform.jpg";
  const [activeIndex, setActiveIndex] = useState(0);
  const active = keyAttributes[activeIndex];
  const tabRefs = useRef([]);

  useEffect(() => {
    const node = tabRefs.current[activeIndex];
    if (!node || typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    node.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

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

      <div className="relative px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up grid items-center gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.22em]">
                Platform
              </p>
              <h2 className="mt-2 font-display text-[1.65rem] leading-[0.95] tracking-tight text-brand-deep sm:mt-2.5 sm:text-4xl lg:text-[2.6rem]">
                {heading}
              </h2>
              <div
                className="animate-draw-line mt-3 h-[3px] w-12 bg-gradient-to-r from-accent via-brand to-transparent sm:mt-3.5 sm:w-16"
                aria-hidden
              />
              <ReadMoreText
                text={description}
                wordLimit={18}
                className="mt-3.5 text-[13px] leading-relaxed text-muted sm:mt-5 sm:text-base"
              />
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden lg:max-h-[13.5rem]">
              <Image
                src={imageSrc}
                alt="Using a digital platform to access agri commodity markets from the field"
                fill
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

          <div className="mt-6 border-t border-line pt-5 sm:mt-10 sm:pt-8 lg:mt-12 lg:pt-9">
            <p className="animate-fade-up delay-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs sm:tracking-[0.22em]">
              Key attributes
            </p>

            <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-5 lg:mt-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
              <div
                role="tablist"
                aria-label="Trading platform attributes"
                className="animate-fade-up delay-1 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-1.5 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-1 lg:gap-2"
              >
                {keyAttributes.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.title}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`attr-tab-${index}`}
                      aria-selected={isActive}
                      aria-controls="attr-panel"
                      onClick={() => setActiveIndex(index)}
                      className={`group flex shrink-0 snap-start items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition duration-300 sm:gap-3 sm:rounded-none sm:border-0 sm:border-l-[3px] sm:px-4 sm:py-3.5 lg:w-full ${
                        isActive
                          ? "border-accent/40 bg-background shadow-[0_10px_28px_rgba(26,63,115,0.06)] sm:border-accent"
                          : "border-line/80 bg-background/60 sm:border-transparent sm:bg-transparent hover:border-brand/25 hover:bg-background/70"
                      }`}
                    >
                      <span
                        className={`font-display text-xs leading-none transition duration-300 sm:text-sm ${
                          isActive
                            ? "text-accent"
                            : "text-brand/25 group-hover:text-brand/40"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`max-w-[9.5rem] text-[12px] font-semibold leading-snug tracking-tight transition duration-300 sm:max-w-none sm:text-[15px] ${
                          isActive
                            ? "text-brand-deep"
                            : "text-muted group-hover:text-brand"
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                id="attr-panel"
                role="tabpanel"
                aria-labelledby={`attr-tab-${activeIndex}`}
                className="animate-fade-up delay-2 relative overflow-hidden rounded-xl border border-line bg-background/80 p-4 sm:rounded-2xl sm:p-6 lg:p-8"
              >
                <div
                  className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent via-accent-soft to-brand"
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <h3 className="min-w-0 font-display text-lg tracking-tight text-brand-deep sm:text-2xl lg:text-[1.75rem]">
                    {active.title}
                  </h3>
                  <span className="shrink-0 font-display text-2xl leading-none text-brand/10 sm:text-4xl">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className="mt-2.5 h-px w-10 bg-gradient-to-r from-accent via-brand to-transparent sm:mt-3 sm:w-12"
                  aria-hidden
                />

                <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {active.points.map((point) => (
                    <li key={point} className="flex gap-2.5 sm:gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:mt-2"
                        aria-hidden
                      />
                      <p className="text-[13px] leading-relaxed text-muted sm:text-base">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 sm:mt-6 lg:hidden">
                  <button
                    type="button"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                    className="text-[12px] font-semibold tracking-wide text-brand transition disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    ← Prev
                  </button>
                  <span className="font-display text-sm text-brand/35">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(keyAttributes.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    disabled={activeIndex === keyAttributes.length - 1}
                    onClick={() =>
                      setActiveIndex((i) =>
                        Math.min(keyAttributes.length - 1, i + 1),
                      )
                    }
                    className="text-[12px] font-semibold tracking-wide text-brand transition disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up delay-3 mt-6 border-t border-line pt-5 sm:mt-10 sm:pt-8 lg:mt-12 lg:pt-9">
            <ReadMoreText
              text={closingNote}
              wordLimit={18}
              className="max-w-3xl text-[13px] leading-relaxed text-foreground/80 sm:text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
