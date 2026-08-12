import OverviewSection from "@/components/advisory/OverviewSection";
import FarmersAdvisorySection from "@/components/advisory/FarmersAdvisorySection";
import TradersBuyersAdvisorySection from "@/components/advisory/TradersBuyersAdvisorySection";
import { getPageContent } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function AdvisoryServicesPage() {
  const content = await getPageContent("advisory-services");

  return (
    <>
      <OverviewSection data={content} />
      <FarmersAdvisorySection data={content.farmersAdvisory} />
      <TradersBuyersAdvisorySection data={content} />
    </>
  );
}
