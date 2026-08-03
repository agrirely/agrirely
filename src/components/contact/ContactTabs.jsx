import MessageForm from "@/components/contact/MessageForm";
import QuoteRequestForm from "@/components/contact/QuoteRequestForm";
import SupplierForm from "@/components/contact/SupplierForm";
import CareersForm from "@/components/contact/CareersForm";

export default function ContactTabs() {
  return (
    <section>
      ContactTabs
      <MessageForm />
      <QuoteRequestForm />
      <SupplierForm />
      <CareersForm />
    </section>
  );
}
