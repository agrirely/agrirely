export const faviconContent = {
  items: [],
};

export function normalizeFaviconItems(items) {
  const list = Array.isArray(items) ? items : [];
  const seen = new Set();
  const normalized = [];

  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const url = String(item.url ?? "").trim();
    if (!url) continue;
    const id = String(item.id || `favicon-${normalized.length + 1}`);
    if (seen.has(id)) continue;
    seen.add(id);
    normalized.push({
      id,
      url,
      active: Boolean(item.active),
    });
  }

  const firstActive = normalized.findIndex((item) => item.active);
  return normalized.map((item, index) => ({
    ...item,
    active: firstActive >= 0 ? index === firstActive : false,
  }));
}

export function getActiveFaviconFromItems(items) {
  return normalizeFaviconItems(items).find((item) => item.active)?.url || null;
}
