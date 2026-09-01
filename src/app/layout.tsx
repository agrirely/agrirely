import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { getActiveFaviconUrl } from "@/lib/getPageContent";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

function faviconType(url: string) {
  const lower = url.toLowerCase();
  if (lower.includes(".svg")) return "image/svg+xml";
  if (lower.includes(".ico")) return "image/x-icon";
  if (lower.includes(".webp")) return "image/webp";
  if (lower.includes(".gif")) return "image/gif";
  if (lower.includes(".jpg") || lower.includes(".jpeg")) return "image/jpeg";
  return "image/png";
}

export async function generateMetadata(): Promise<Metadata> {
  const faviconUrl = await getActiveFaviconUrl();

  return {
    title: "AgriRely | Source Fresh – Deliver Fresh",
    description:
      "AgriRely connects crop producers and consumers worldwide through origination, trading, processing, distribution, farmer services, and risk management.",
    icons: faviconUrl
      ? {
          icon: [{ url: faviconUrl, type: faviconType(faviconUrl) }],
          shortcut: [{ url: faviconUrl }],
          apple: [{ url: faviconUrl }],
        }
      : {
          icon: "/favicon.ico",
        },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
