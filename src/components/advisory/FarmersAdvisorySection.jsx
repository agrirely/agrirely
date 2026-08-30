import Image from "next/image";
import ReadMoreText from "@/components/ui/ReadMoreText";
import { advisoryContent } from "@/data/advisoryContent";

const delays = ["delay-1", "delay-2", "delay-3", "delay-4"];

export default function FarmersAdvisorySection({ data }) {
  const { heading, description, services, image } =
    data ?? advisoryContent.farmersAdvisory;
  const imageSrc = image || "/images/advisory/farmers.jpg";

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(127,195,80,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up grid items-center gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
                For growers
              </p>
              <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight sm:text-4xl lg:text-[2.6rem]">
                {heading}
              </h2>
              <div
                className="animate-draw-line mt-3.5 h-[3px] w-16 bg-gradient-to-r from-accent via-accent-soft to-transparent"
                aria-hidden
              />
              <ReadMoreText
                text={description}
                wordLimit={22}
                tone="light"
                className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base"
              />
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt="Agronomist sharing crop and soil guidance with farmers in the field"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_20%]"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(160deg,rgba(20,35,58,0.12)_0%,transparent_42%,rgba(20,35,58,0.42)_100%)]"
                aria-hidden
              />
              <div
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-accent-soft to-transparent"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <div className="animate-fade-up delay-1 border-t border-white/15 pt-6 sm:pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
                Farmer offerings
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {services.map((item, index) => (
                <article
                  key={item.title}
                  className={`animate-fade-up group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:bg-[linear-gradient(145deg,rgba(127,195,80,0.18)_0%,rgba(79,134,198,0.12)_55%,rgba(255,255,255,0.04)_100%)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:rounded-2xl sm:p-6 ${
                    delays[index % delays.length] || ""
                  } ${index === services.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-0 bg-gradient-to-b from-accent via-accent-soft to-brand transition-all duration-500 group-hover:w-[3px]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition duration-500 group-hover:bg-accent/25"
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <p className="font-display text-3xl leading-none tracking-tight text-white/12 transition duration-500 group-hover:text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span
                      className="mt-1 text-sm text-white/20 transition duration-500 group-hover:translate-x-0.5 group-hover:text-accent-soft"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>

                  <h3 className="relative mt-3.5 font-display text-lg tracking-tight transition duration-500 group-hover:text-accent-soft sm:text-xl">
                    {item.title}
                  </h3>
                  <div
                    className="relative mt-2.5 h-px w-8 origin-left bg-white/25 transition-all duration-500 group-hover:w-14 group-hover:bg-accent"
                    aria-hidden
                  />
                  <p className="relative mt-3 text-sm leading-relaxed text-white/60 transition duration-500 group-hover:text-white/85">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
