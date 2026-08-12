import ReachUsSection from "@/components/contact/ReachUsSection";
import ContactTabs from "@/components/contact/ContactTabs";
import { getPageContent } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const content = await getPageContent("contact-us");

  return (
    <>
      <ReachUsSection data={content} />
      <ContactTabs data={content.otherWaysToConnect} />
    </>
  );
}
