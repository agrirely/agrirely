import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO, SITE_LOGO_LIGHT, SITE_NAME } from "@/lib/constants";

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
      aria-label={`${SITE_NAME} home`}
    >
      <Image
        src={light ? SITE_LOGO_LIGHT : SITE_LOGO}
        alt={SITE_NAME}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-[140px] sm:w-[168px]"
      />
    </Link>
  );
}
