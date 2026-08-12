import Image from "next/image";
import Button from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";
import { HERO_IMAGE } from "@/lib/constants";

export default function HeroSection({ data }) {
  const { title, tagline, description, image } = data ?? homeContent.hero;
  const imageSrc = image || HERO_IMAGE;

  return (
    <section className="relative isolate flex min-h-[calc(78svh-4rem)] overflow-hidden bg-background text-white sm:min-h-[calc(100svh-4.75rem)]">
      <Image
        src={imageSrc}
        alt="Fresh agricultural fields at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%] animate-ken-burns will-change-transform"
      />

      {/* Mobile: stronger wash, soft fade into next section (no hard bottom edge) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,52,0.45)_0%,rgba(12,28,52,0.72)_42%,rgba(12,28,52,0.82)_68%,rgba(12,28,52,0.35)_88%,transparent_100%)] sm:hidden" />
      {/* Desktop atmospheric wash — unchanged */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(12,28,52,0.82)_0%,rgba(12,28,52,0.55)_42%,rgba(12,28,52,0.18)_72%,rgba(12,28,52,0.08)_100%)] sm:block" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(12,28,52,0.55)_0%,transparent_42%)] sm:block" />
      <div className="absolute inset-0 animate-soft-glow bg-[radial-gradient(ellipse_at_70%_30%,rgba(127,195,80,0.22),transparent_45%)]" />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-end px-5 pb-10 pt-14 sm:justify-center sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="animate-fade-up font-display text-[clamp(2.5rem,12vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-white">
            {title}
          </h1>

          <div
            className="animate-draw-line mt-3 h-[3px] w-16 bg-gradient-to-r from-accent via-accent-soft to-transparent sm:mt-6 sm:w-32"
            aria-hidden
          />

          <p className="animate-fade-up delay-1 mt-4 font-display text-lg leading-snug tracking-tight text-white sm:mt-7 sm:text-3xl lg:text-4xl">
            {tagline}
          </p>

          <p className="animate-fade-up delay-2 mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
            {description}
          </p>

          <div className="animate-fade-up delay-3 mt-6 grid w-full grid-cols-2 gap-2.5 sm:mt-10 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-5 lg:gap-6">
            <Button
              href="/contact-us"
              variant="primary"
              className="w-full !px-3 !py-2.5 !text-[13px] !bg-accent !text-brand-deep !shadow-[0_12px_32px_rgba(127,195,80,0.35)] hover:!bg-accent-soft sm:w-auto sm:!px-5 sm:!py-3 sm:!text-sm"
            >
              Contact Us
            </Button>
            <Button
              href="/about-us"
              variant="secondary"
              className="w-full !px-3 !py-2.5 !text-[13px] !border-white/35 !bg-white/10 !text-white hover:!bg-white/20 sm:w-auto sm:!px-5 sm:!py-3 sm:!text-sm"
            >
              Discover AgriRely
            </Button>
          </div>
        </div>
      </div>

      {/* Soft handoff into Who We Are — covers any 1px seam */}
      <div
        className="pointer-events-none absolute -bottom-px inset-x-0 h-20 bg-gradient-to-t from-background from-20% via-background/70 to-transparent sm:h-24"
        aria-hidden
      />
    </section>
  );
}
