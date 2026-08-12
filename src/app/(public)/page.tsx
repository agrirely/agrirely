import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import ServicesOverviewSection from "@/components/home/ServicesOverviewSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import CtaSection from "@/components/home/CtaSection";
import { getPageContent } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getPageContent("home");

  return (
    <>
      <HeroSection data={content.hero} />
      <WhoWeAreSection data={content} />
      <WhatWeDoSection data={content} />
      <ServicesOverviewSection data={content} />
      <PhilosophySection data={content} />
      <CtaSection data={content.cta} />
    </>
  );
}
