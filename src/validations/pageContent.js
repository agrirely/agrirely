export function assertPageKey(pageKey) {
  if (!pageKey || typeof pageKey !== "string") {
    return "pageKey is required";
  }
  return null;
}

export function assertSections(sections) {
  if (!sections || typeof sections !== "object" || Array.isArray(sections)) {
    return "sections must be an object";
  }
  return null;
}
