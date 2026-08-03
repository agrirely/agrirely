"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-background/92 shadow-[0_10px_28px_rgba(26,63,115,0.07)] backdrop-blur-xl"
          : "border-b border-line/40 bg-background/75 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 px-4 sm:h-[4.75rem] sm:gap-4 sm:px-8 lg:px-12">
        <Logo priority width={168} height={50} className="min-w-0 shrink" />

        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <Navbar />
          <Button
            href="/contact-us"
            className="hidden !rounded-md !px-4 !py-2.5 text-[13px] lg:inline-flex"
          >
            Contact Us
          </Button>
        </div>
      </div>

      <div
        className={`h-px w-full bg-gradient-to-r from-transparent via-accent/65 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-50"
        }`}
        aria-hidden
      />
    </header>
  );
}
