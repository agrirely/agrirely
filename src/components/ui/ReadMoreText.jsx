"use client";

import { useState } from "react";

const buttonTones = {
  brand:
    "inline font-semibold text-brand underline decoration-brand/30 underline-offset-2 transition hover:text-brand-deep hover:decoration-brand",
  light:
    "inline font-semibold text-accent-soft underline decoration-accent-soft/40 underline-offset-2 transition hover:text-white hover:decoration-white/50",
};

export default function ReadMoreText({
  text,
  wordLimit = 22,
  className = "",
  tone = "brand",
}) {
  const [expanded, setExpanded] = useState(false);
  const words = text.trim().split(/\s+/);
  const needsTruncate = words.length > wordLimit;
  const preview = `${words.slice(0, wordLimit).join(" ")}…`;

  return (
    <>
      <p className={`sm:hidden ${className}`}>
        {expanded || !needsTruncate ? text : preview}
        {needsTruncate ? (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className={buttonTones[tone] || buttonTones.brand}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          </>
        ) : null}
      </p>
      <p className={`hidden sm:block ${className}`}>{text}</p>
    </>
  );
}
