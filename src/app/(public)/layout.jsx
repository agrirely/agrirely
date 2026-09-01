import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSocialLinks } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }) {
  const socialLinks = await getSocialLinks();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer socialLinks={socialLinks} />
    </>
  );
}
