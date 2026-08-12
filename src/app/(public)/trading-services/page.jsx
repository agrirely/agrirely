import TradingSection from "@/components/trading/TradingSection";
import ContractFarmingSection from "@/components/trading/ContractFarmingSection";
import StorageDistributionSection from "@/components/trading/StorageDistributionSection";
import ProcessingPackagingSection from "@/components/trading/ProcessingPackagingSection";
import { getPageContent } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function TradingServicesPage() {
  const content = await getPageContent("trading-services");

  return (
    <>
      <TradingSection data={content} />
      <ContractFarmingSection data={content.contractFarming} />
      <StorageDistributionSection data={content.storageDistribution} />
      <ProcessingPackagingSection data={content.processingPackaging} />
    </>
  );
}
