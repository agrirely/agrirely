"use client";

import { useRef, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-base leading-snug text-foreground outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function ImageUploadField({
  label,
  path,
  value,
  onChange,
  hideLabel = false,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "agrirely/cms");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed");
      }
      onChange(json.url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {!hideLabel ? (
        <div className="mb-1.5 flex items-center gap-2">
          <label className="text-base font-medium text-brand-deep">{label}</label>
          {path ? (
            <span className="rounded bg-surface-soft px-1.5 py-0.5 font-mono text-xs text-muted">
              {path.split(".").pop()}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        {value ? (
          <div className="flex justify-start bg-surface-soft p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={label || "Preview"}
              className="h-28 w-auto max-w-full rounded-md object-cover sm:h-32"
            />
          </div>
        ) : (
          <div className="flex h-28 items-center justify-center bg-surface-soft px-4 text-center text-sm text-muted">
            No image yet — upload or paste a URL
          </div>
        )}

        <div className="space-y-2.5 border-t border-line p-3">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://ik.imagekit.io/..."
            className={inputClass}
          />

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-gradient-to-r from-brand to-brand-mid px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand/20 transition hover:brightness-105 disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Upload to ImageKit"}
            </button>
            {value ? (
              <button
                type="button"
                disabled={uploading}
                onClick={() => onChange("")}
                className="rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                Clear
              </button>
            ) : null}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <p className="text-xs text-muted">
            JPEG / PNG / WebP / GIF / AVIF · max 8 MB
          </p>
        </div>
      </div>
    </div>
  );
}
