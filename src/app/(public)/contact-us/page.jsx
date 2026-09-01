import ReachUsSection from "@/components/contact/ReachUsSection";
import ContactTabs from "@/components/contact/ContactTabs";
import { getPageContent, getSocialLinks } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [content, socialLinks] = await Promise.all([
    getPageContent("contact-us"),
    getSocialLinks(),
  ]);

  return (
    <>
      <ReachUsSection data={content} socialLinks={socialLinks} />
      <ContactTabs data={content.otherWaysToConnect} />
    </>
  );
}
