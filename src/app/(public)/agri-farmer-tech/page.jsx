import OverviewSection from "@/components/tech/OverviewSection";
import FarmerEquipmentSection from "@/components/tech/FarmerEquipmentSection";
import TradingPlatformSection from "@/components/tech/TradingPlatformSection";
import { getPageContent } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function AgriFarmerTechPage() {
  const content = await getPageContent("agri-farmer-tech");

  return (
    <>
      <OverviewSection data={content} />
      <FarmerEquipmentSection data={content.farmerEquipment} />
      <TradingPlatformSection data={content.tradingPlatform} />
    </>
  );
}
