"use client";

import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import MessageForm from "@/components/contact/MessageForm";
import QuoteRequestForm from "@/components/contact/QuoteRequestForm";
import SupplierForm from "@/components/contact/SupplierForm";
import CareersForm from "@/components/contact/CareersForm";
import { contactContent } from "@/data/contactContent";

const formById = {
  msg: MessageForm,
  careers: CareersForm,
  quote: QuoteRequestForm,
  supplier: SupplierForm,
};

export default function ContactTabs() {
  const { heading, tabs } = contactContent.otherWaysToConnect;
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "msg");
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const ActiveForm = formById[activeTab?.id] ?? MessageForm;

  return (
    <section className="relative overflow-hidden bg-surface">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(169,223,249,0.28)_0%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-28 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-fade-up max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Get in touch
            </p>
            <h2 className="mt-2.5 font-display text-[1.75rem] leading-[0.95] tracking-tight text-brand-deep sm:text-4xl lg:text-[2.6rem]">
              {heading}
            </h2>
            <div
              className="animate-draw-line mt-3.5 h-[3px] w-16 bg-brand"
              aria-hidden
            />
          </div>

          <div className="animate-fade-up delay-1 mt-7 sm:mt-9">
            <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />

            <div
              role="tabpanel"
              id={`panel-${activeTab.id}`}
              aria-labelledby={`tab-${activeTab.id}`}
              className="mt-6 border border-line bg-background/70 p-5 shadow-[0_20px_50px_rgba(26,63,115,0.05)] backdrop-blur-sm sm:mt-8 sm:p-7 lg:p-8"
            >
              <ActiveForm note={activeTab.note} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
