export async function submitInquiry(type, payload) {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload }),
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok || !json?.success) {
    throw new Error(json?.error || "Failed to submit inquiry");
  }

  return json.data;
}
