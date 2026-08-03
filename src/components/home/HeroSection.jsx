import Image from "next/image";
import Button from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";
import { HERO_IMAGE } from "@/lib/constants";

export default function HeroSection() {
  const { title, tagline, description } = homeContent.hero;

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden text-white">
      <Image
        src={HERO_IMAGE}
        alt="Fresh agricultural fields at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover animate-ken-burns"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(26,63,115,0.88)_0%,rgba(26,63,115,0.55)_48%,rgba(26,63,115,0.32)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(127,195,80,0.28),transparent_42%)]" />

      <div className="container-page relative flex min-h-[88vh] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.28em] text-accent-soft">
            {tagline}
          </p>
          <h1 className="animate-fade-up delay-1 mt-5 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            {title}
          </h1>
          <p className="animate-fade-up delay-2 mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {description}
          </p>
          <div className="animate-fade-up delay-3 mt-9 flex flex-wrap gap-3">
            <Button href="/contact-us" variant="primary">
              Contact Us
            </Button>
            <Button href="/about-us" variant="secondary">
              Discover AgriRely
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
