export const SOCIAL_PLATFORMS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "https://www.linkedin.com/company/agrirely",
  },
  {
    id: "instagram",
    label: "Instagram",
    placeholder: "https://www.instagram.com/agrirely",
  },
  {
    id: "facebook",
    label: "Facebook",
    placeholder: "https://www.facebook.com/agrirely",
  },
  {
    id: "x",
    label: "X (Twitter)",
    placeholder: "https://x.com/agrirely",
  },
  {
    id: "youtube",
    label: "YouTube",
    placeholder: "https://www.youtube.com/@agrirely",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    placeholder: "https://wa.me/91XXXXXXXXXX",
  },
];

/** Seed + fallback for PageContent `social` */
export const socialContent = {
  links: SOCIAL_PLATFORMS.map((platform) => ({
    id: platform.id,
    label: platform.label,
    url: "",
  })),
};

export function normalizeSocialLinks(links) {
  const incoming = Array.isArray(links) ? links : [];
  const byId = new Map(
    incoming
      .filter((item) => item && typeof item === "object" && item.id)
      .map((item) => [String(item.id), item])
  );

  const merged = SOCIAL_PLATFORMS.map((platform) => {
    const saved = byId.get(platform.id);
    return {
      id: platform.id,
      label: saved?.label || platform.label,
      url: sanitizeSocialUrl(saved?.url, platform.id),
    };
  });

  for (const item of incoming) {
    if (!item?.id) continue;
    const id = String(item.id);
    if (SOCIAL_PLATFORMS.some((platform) => platform.id === id)) continue;
    merged.push({
      id,
      label: String(item.label || id),
      url: sanitizeSocialUrl(item.url, id),
    });
  }

  return merged;
}

export function sanitizeSocialUrl(value, id) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";

  if (id === "whatsapp" && /^\+?\d[\d\s()-]+$/.test(raw)) {
    return `https://wa.me/${raw.replace(/\D/g, "")}`;
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return withProtocol;
  } catch {
    return "";
  }
}

export function getVisibleSocialLinks(links) {
  return normalizeSocialLinks(links).filter((link) => Boolean(link.url));
}
