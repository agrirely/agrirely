import TradingSection from "@/components/trading/TradingSection";
import ContractFarmingSection from "@/components/trading/ContractFarmingSection";
import ProcessingPackagingSection from "@/components/trading/ProcessingPackagingSection";
import StorageDistributionSection from "@/components/trading/StorageDistributionSection";

export default function TradingServicesPage() {
  return (
    <>
      <TradingSection />
      <ContractFarmingSection />
      <ProcessingPackagingSection />
      <StorageDistributionSection />
    </>
  );
}
