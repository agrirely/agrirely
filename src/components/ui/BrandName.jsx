import { SITE_NAME } from "@/lib/constants";

export function isBrandName(value) {
  return String(value || "").replace(/[\s-]/g, "").toLowerCase() === "agrirely";
}

export default function BrandName({ className = "" }) {
  return <span className={`normal-case ${className}`.trim()}>{SITE_NAME}</span>;
}
