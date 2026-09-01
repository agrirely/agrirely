"use client";

import { useMemo, useState } from "react";
import {
  SOCIAL_PLATFORMS,
  normalizeSocialLinks,
} from "@/data/socialContent";
import { SocialPlatformIcon } from "@/components/ui/SocialIcons";

function placeholderFor(id) {
  return SOCIAL_PLATFORMS.find((platform) => platform.id === id)?.placeholder ??
    "https://";
}

export default function SocialLinksEditor({ initialLinks }) {
  const [links, setLinks] = useState(() => normalizeSocialLinks(initialLinks));
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const filledCount = useMemo(
    () => links.filter((link) => link.url.trim()).length,
    [links]
  );

  function updateUrl(id, url) {
    setLinks((current) =>
      current.map((link) => (link.id === id ? { ...link, url } : link))
    );
    setStatus("");
  }

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      const payload = normalizeSocialLinks(
        links.map((link) => ({
          ...link,
          url: link.url.trim(),
        }))
      );
      const res = await fetch("/api/pages/social/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Save failed");
      }
      setLinks(payload);
      setStatus("Saved. Icons are live; URLs make them clickable.");
    } catch (err) {
      setStatus(err.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setLinks(normalizeSocialLinks(initialLinks));
    setStatus("Reset.");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_12px_36px_rgba(26,63,115,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div>
          <p className="text-base font-semibold text-brand-deep">Profile URLs</p>
          <p className="text-sm text-muted">
            Icons already show on the site. Paste a URL to make that icon
            clickable.
          </p>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-brand-deep">
          {filledCount} live
        </span>
      </div>

      <div className="space-y-3 p-5 md:p-6">
        {links.map((link) => {
          const live = Boolean(link.url.trim());
          return (
            <div
              key={link.id}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface-soft/50 p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3 sm:w-44 sm:shrink-0">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                    live
                      ? "border-brand/30 bg-brand text-white"
                      : "border-line bg-surface text-brand-deep"
                  }`}
                >
                  <SocialPlatformIcon id={link.id} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-deep">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted">
                    {live ? "Clickable on site" : "Visible — add URL to link"}
                  </p>
                </div>
              </div>

              <input
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder={placeholderFor(link.id)}
                value={link.url}
                onChange={(event) => updateUrl(link.id, event.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-base leading-snug text-foreground outline-none transition placeholder:text-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 border-t border-line bg-surface-soft/80 px-5 py-3.5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2.5 text-base font-semibold text-white shadow-sm shadow-brand/25 transition hover:brightness-105 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save links"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={saving}
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
