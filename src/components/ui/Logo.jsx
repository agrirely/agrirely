import Image from "next/image";
import Link from "next/link";

export default function Logo({
  href = "/",
  className = "",
  width = 168,
  height = 50,
  priority = false,
  light = false,
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center transition hover:opacity-90 ${className}`}
      aria-label="AgriRely home"
    >
      <Image
        src={light ? "/images/logo-light.png" : "/images/logo.png"}
        alt="AgriRely"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-[140px] sm:w-[168px]"
      />
    </Link>
  );
}
