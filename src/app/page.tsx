import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import ServicesOverviewSection from "@/components/home/ServicesOverviewSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <ServicesOverviewSection />
      <PhilosophySection />
      <CtaSection />
    </>
  );
}
