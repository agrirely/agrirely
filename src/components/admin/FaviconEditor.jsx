"use client";

import { useMemo, useRef, useState } from "react";
import { normalizeFaviconItems } from "@/data/faviconContent";

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `favicon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function FaviconEditor({ initialItems }) {
  const inputRef = useRef(null);
  const [items, setItems] = useState(() =>
    normalizeFaviconItems(initialItems)
  );
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const activeCount = useMemo(
    () => items.filter((item) => item.active).length,
    [items]
  );

  function setActive(id, active) {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        active: active ? item.id === id : item.id === id ? false : item.active,
      }))
    );
    setStatus("");
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
    setStatus("");
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setStatus("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "agrirely/favicon");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed");
      }

      setItems((current) => {
        const next = [
          ...current,
          {
            id: newId(),
            url: json.url,
            active: current.length === 0,
          },
        ];
        return normalizeFaviconItems(next);
      });
      setStatus("Favicon added. Save to publish the change.");
    } catch (err) {
      setStatus(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      const payload = normalizeFaviconItems(items);
      const res = await fetch("/api/pages/favicon/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Save failed");
      }
      setItems(payload);
      setStatus("Saved. The active favicon is used in the browser tab.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setItems(normalizeFaviconItems(initialItems));
    setStatus("Reset.");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_12px_36px_rgba(26,63,115,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div>
          <p className="text-base font-semibold text-brand-deep">Favicons</p>
          <p className="text-sm text-muted">
            Add images, remove them, and mark one as Active for the site tab.
          </p>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-brand-deep">
          {activeCount} active
        </span>
      </div>

      <div className="space-y-3 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml,image/x-icon,image/vnd.microsoft.icon,.ico,.svg"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            type="button"
            disabled={uploading || saving}
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/25 transition hover:brightness-105 disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Add favicon"}
          </button>
          <p className="text-xs text-muted">
            PNG, ICO, SVG, WebP, JPEG · max 8 MB · 32×32 or 48×48 works best
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-brand/25 bg-surface-soft/60 px-4 py-10 text-center text-sm text-muted">
            No favicons yet. Add one to use it as the browser tab icon.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center ${
                  item.active
                    ? "border-accent/50 bg-accent/10"
                    : "border-line bg-surface-soft/50"
                }`}
              >
                <div className="flex items-center gap-3 sm:min-w-0 sm:flex-1">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt="Favicon preview"
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-deep">
                      {item.active ? "Active on site" : "Inactive"}
                    </p>
                    <p className="truncate font-mono text-xs text-muted">
                      {item.url}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={item.active}
                    onClick={() => setActive(item.id, !item.active)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      item.active
                        ? "bg-accent text-brand-deep"
                        : "border border-line bg-surface text-muted hover:text-brand-deep"
                    }`}
                  >
                    <span
                      className={`relative h-6 w-11 rounded-full transition ${
                        item.active ? "bg-brand-deep/20" : "bg-surface-soft"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                          item.active ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </span>
                    {item.active ? "Active" : "Inactive"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg border border-red-200 bg-surface px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 border-t border-line bg-surface-soft/80 px-5 py-3.5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || uploading}
          className="rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2.5 text-base font-semibold text-white shadow-sm shadow-brand/25 transition hover:brightness-105 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save favicon"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={saving || uploading}
          className="rounded-lg border border-line bg-surface px-4 py-2.5 text-base font-medium text-brand-deep transition hover:border-brand/30 hover:bg-background disabled:opacity-60"
        >
          Reset
        </button>
        {status ? (
          <p
            className={`ml-auto text-base ${
              /fail|invalid|error/i.test(status)
                ? "text-red-600"
                : "text-accent"
            }`}
          >
            {status}
          </p>
        ) : null}
      </div>
    </div>
  );
}
