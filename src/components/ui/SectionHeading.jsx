export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  light = false,
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${
            light ? "text-accent-soft" : "text-accent"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-brand-deep"
        }`}
      >
        {heading}
      </h2>
      <span
        className={`h-px w-16 bg-accent animate-draw-line ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {description ? (
        <p
          className={`text-base leading-relaxed sm:text-lg ${
            light ? "text-white/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
