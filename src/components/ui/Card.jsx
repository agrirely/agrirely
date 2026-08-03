import Link from "next/link";

export default function Card({ title, description, href, index }) {
  const content = (
    <>
      <div className="mb-6 flex items-center justify-between">
        <span className="font-display text-4xl text-brand/20">
          {String(index).padStart(2, "0")}
        </span>
        {href ? (
          <span className="text-sm font-semibold text-brand transition group-hover:translate-x-1">
            Explore →
          </span>
        ) : null}
      </div>
      <h3 className="font-display text-2xl text-brand-deep">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
    </>
  );

  const className =
    "group block border-t border-line pt-8 transition duration-300 hover:border-brand";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
