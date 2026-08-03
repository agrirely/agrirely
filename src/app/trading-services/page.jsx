import TradingSection from "@/components/trading/TradingSection";
import ContractFarmingSection from "@/components/trading/ContractFarmingSection";
import StorageDistributionSection from "@/components/trading/StorageDistributionSection";
import ProcessingPackagingSection from "@/components/trading/ProcessingPackagingSection";

export default function TradingServicesPage() {
  return (
    <>
      <TradingSection />
      <ContractFarmingSection />
      <StorageDistributionSection />
      <ProcessingPackagingSection />
    </>
  );
}
