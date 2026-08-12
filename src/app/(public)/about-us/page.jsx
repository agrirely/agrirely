import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import GlobalReachSection from "@/components/about/GlobalReachSection";
import PhilosophySection from "@/components/about/PhilosophySection";
import OurPromiseSection from "@/components/about/OurPromiseSection";
import { getPageContent } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  const content = await getPageContent("about-us");

  return (
    <>
      <WhoWeAreSection data={content} />
      <WhatWeDoSection data={content.whatWeDo} />
      <GlobalReachSection data={content.globalReach} />
      <PhilosophySection data={content.philosophy} />
      <OurPromiseSection data={content.ourPromise} />
    </>
  );
}
