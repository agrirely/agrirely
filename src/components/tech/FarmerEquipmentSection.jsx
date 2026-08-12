import ReadMoreText from "@/components/ui/ReadMoreText";
import { techContent } from "@/data/techContent";

const stages = [
  "Land preparation",
  "Planting",
  "Crop management",
  "Harvesting",
];

export default function FarmerEquipmentSection({ data }) {
  const { heading, description, description2 } =
    data ?? techContent.farmerEquipment;

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
        <div className="mx-auto grid w-full max-w-7xl gap-5 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <div className="animate-fade-up max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              Machinery
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
              wordLimit={20}
              tone="light"
              className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base"
            />

            <ul className="mt-6 flex flex-wrap items-center gap-x-0 gap-y-2 border-t border-white/15 pt-5">
              {stages.map((stage, index) => (
                <li key={stage} className="flex items-center">
                  {index > 0 ? (
                    <span
                      className="mx-3 h-1 w-1 rounded-full bg-accent-soft sm:mx-4"
                      aria-hidden
                    />
                  ) : null}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-xs">
                    {stage}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up delay-1 lg:pt-6">
            <ReadMoreText
              text={description2}
              wordLimit={28}
              tone="light"
              className="text-sm leading-relaxed text-white/70 sm:text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
