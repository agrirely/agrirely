"use client";

export default function Tabs({ tabs, activeId, onChange, className = "" }) {
  return (
    <div
      role="tablist"
      aria-label="Contact options"
      className={`flex gap-1 overflow-x-auto border-b border-line pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`relative shrink-0 px-3.5 py-3 text-left text-sm font-semibold tracking-wide transition duration-300 sm:px-5 sm:py-3.5 sm:text-[15px] ${
              isActive
                ? "text-brand-deep"
                : "text-muted hover:text-brand"
            }`}
          >
            {tab.label}
            <span
              className={`absolute inset-x-0 bottom-0 h-[2px] transition duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-accent via-brand to-transparent"
                  : "bg-transparent"
              }`}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
