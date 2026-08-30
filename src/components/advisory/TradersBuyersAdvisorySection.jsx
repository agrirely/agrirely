import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { advisoryContent } from "@/data/advisoryContent";

const delays = ["delay-1", "delay-2", "delay-3", "delay-4"];

export default function TradersBuyersAdvisorySection({ data }) {
  const content = data ?? advisoryContent;
  const { heading, description, services, image } = content.tradersBuyersAdvisory;
  const { closingNote } = content;
  const imageSrc = image || "/images/advisory/traders-buyers.jpg";

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
          <div className="animate-fade-up grid items-center gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                For markets
              </p>
              <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem]">
                {heading}
              </h2>
              <div
                className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-brand to-transparent"
                aria-hidden
              />
              <ReadMoreText
                text={description}
                wordLimit={22}
                className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base"
              />
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden lg:max-h-[13.5rem]">
              <Image
                src={imageSrc}
                alt="Traders and buyers inspecting produce quality for sourcing and procurement"
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

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <div className="animate-fade-up delay-1 border-t border-line pt-6 sm:pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Market offerings
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {services.map((item, index) => (
                <article
                  key={item.title}
                  className={`animate-fade-up group relative overflow-hidden rounded-xl border border-line bg-background/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(26,63,115,0.08)] sm:rounded-2xl sm:p-6 ${
                    delays[index % delays.length] || ""
                  } ${index === services.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
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
                    <h3 className="font-display text-lg tracking-tight text-brand-deep sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="font-display text-2xl leading-none text-brand/15 transition group-hover:text-accent/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="relative mt-2.5 h-px w-8 origin-left bg-brand/20 transition-all duration-500 group-hover:w-14 group-hover:bg-accent"
                    aria-hidden
                  />
                  <p className="relative mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="animate-fade-up delay-2 mt-10 border-t border-line pt-8 sm:mt-12 sm:pt-9 lg:mt-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Closing note
              </p>
              <p className="mt-3.5 font-display text-lg leading-snug tracking-tight text-brand-deep sm:mt-4 sm:text-2xl lg:text-[1.65rem]">
                {closingNote.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
