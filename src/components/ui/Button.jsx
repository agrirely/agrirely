import Link from "next/link";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-mid shadow-[0_10px_30px_rgba(26,63,115,0.22)]",
  secondary:
    "bg-white/90 text-brand-deep border border-white/60 hover:bg-white backdrop-blur-sm",
  outline:
    "border border-brand/25 text-brand hover:border-brand hover:bg-brand/5",
  ghost: "text-brand hover:bg-brand/5",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
