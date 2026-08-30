"use client";

import { useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { ABOUT_IMAGE } from "@/lib/constants";

function humanizeKey(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Sections that should always expose an ImageKit upload field */
const SECTION_IMAGE_DEFAULTS = {
  "home/hero": "/images/home/hero.jpg",
  "home/whoWeAre": "/images/home/who-we-are.jpg",
  "home/whatWeDo": "/images/home/what-we-do.jpg",
  "home/philosophy": "/images/home/philosophy.jpg",
  "about-us/intro": ABOUT_IMAGE,
  "trading-services/trading": "/images/trading/trading.jpg",
  "trading-services/contractFarming": "/images/trading/contract-farming.jpg",
  "trading-services/storageDistribution":
    "/images/trading/storage-distribution.jpg",
  "trading-services/processingPackaging":
    "/images/trading/processing-packaging.jpg",
  "agri-farmer-tech/overview": "/images/tech/overview.jpg",
  "agri-farmer-tech/farmerEquipment": "/images/tech/equipment.jpg",
  "agri-farmer-tech/tradingPlatform": "/images/tech/trading-platform.jpg",
  "advisory-services/hero": "/images/advisory/hero.jpg",
  "advisory-services/farmersAdvisory": "/images/advisory/farmers.jpg",
  "advisory-services/tradersBuyersAdvisory":
    "/images/advisory/traders-buyers.jpg",
  "contact-us/hero": "/images/contact/hero.jpg",
  "contact-us/reachUs": "/images/contact/reach-us.jpg",
};

function ensureSectionImageField(pageKey, sectionKey, data) {
  const defaultUrl = SECTION_IMAGE_DEFAULTS[`${pageKey}/${sectionKey}`];
  if (!defaultUrl) return data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  if (Object.prototype.hasOwnProperty.call(data, "image")) return data;
  return { ...data, image: defaultUrl };
}

function isImageField(key, value) {
  if (typeof value !== "string") return false;
  if (
    /^(image|imageurl|img|src|photo|thumbnail|banner|heroimage|coverimage|backgroundimage|ogimage)$/i.test(
      String(key)
    )
  ) {
    return true;
  }
  return (
    /^https?:\/\//i.test(value) &&
    /\.(jpe?g|png|webp|gif|avif|svg)(\?|$)/i.test(value)
  );
}

function isLongText(key, value) {
  if (typeof value !== "string") return false;
  if (isImageField(key, value)) return false;
  if (value.includes("\n") || value.length > 90) return true;
  return /^(description|description\d*|content|body|message|text)$/i.test(
    String(key)
  );
}

function textareaRows(value) {
  const lines = Math.ceil((value?.length || 0) / 90);
  return Math.min(8, Math.max(3, lines));
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function emptyItemLike(sample) {
  if (sample == null) return "";
  if (Array.isArray(sample)) return [];
  if (typeof sample === "object") {
    return Object.fromEntries(
      Object.entries(sample).map(([key, val]) => [key, emptyItemLike(val)])
    );
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-base leading-snug text-foreground outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15";

function FieldLabel({ label, path }) {
  const shortPath = path ? path.split(".").pop() : null;

  return (
    <div className="mb-1.5 flex items-center gap-2">
      <label className="text-base font-medium text-brand-deep">{label}</label>
      {shortPath ? (
        <span className="rounded bg-surface-soft px-1.5 py-0.5 font-mono text-xs text-muted">
          {shortPath}
        </span>
      ) : null}
    </div>
  );
}

function FormInput({
  label,
  path,
  value,
  onChange,
  onRemove,
  depth = 0,
  bare = false,
  hideLabel = false,
}) {
  const fieldType = Array.isArray(value)
    ? "array"
    : value === null
      ? "null"
      : typeof value;

  if (fieldType === "string") {
    if (isImageField(label, value)) {
      return (
        <ImageUploadField
          label={humanizeKey(label)}
          path={path}
          value={value}
          onChange={onChange}
          hideLabel={hideLabel}
        />
      );
    }

    const long = isLongText(label, value);
    return (
      <div>
        {!hideLabel ? (
          <FieldLabel label={humanizeKey(label)} path={path} />
        ) : null}
        {long ? (
          <textarea
            rows={textareaRows(value)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} resize-y`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        )}
      </div>
    );
  }

  if (fieldType === "number") {
    return (
      <div>
        {!hideLabel ? (
          <FieldLabel label={humanizeKey(label)} path={path} />
        ) : null}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) =>
            onChange(e.target.value === "" ? 0 : Number(e.target.value))
          }
          className={`${inputClass} max-w-xs`}
        />
      </div>
    );
  }

  if (fieldType === "boolean") {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3">
        <p className="text-base font-medium text-brand-deep">
          {hideLabel ? "Enabled" : humanizeKey(label)}
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={`relative h-7 w-12 rounded-full transition ${
            value ? "bg-accent" : "bg-surface-soft"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
              value ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  }

  if (fieldType === "null") {
    return (
      <div className="rounded-lg border border-dashed border-line bg-surface-soft px-3.5 py-2.5 text-sm text-muted">
        {!hideLabel ? (
          <FieldLabel label={humanizeKey(label)} path={path} />
        ) : null}
        <p>Empty (null)</p>
      </div>
    );
  }

  if (fieldType === "array") {
    const content = (
      <>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          {!bare ? (
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-brand-deep">
                {humanizeKey(label)}
              </p>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-sm text-brand-deep">
                {value.length} items
              </span>
            </div>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => {
              const sample = value[0] ?? "";
              onChange([...value, emptyItemLike(sample)]);
            }}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-brand-deep transition hover:border-brand/40 hover:bg-surface-soft"
          >
            + Add item
          </button>
        </div>

        <div className="space-y-3">
          {value.length === 0 ? (
            <p className="rounded-lg border border-dashed border-brand/25 bg-surface px-4 py-6 text-center text-sm text-muted">
              No items yet.
            </p>
          ) : (
            value.map((item, index) => {
              const itemIsComplex = item !== null && typeof item === "object";

              return (
                <div
                  key={`${path}.${index}`}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                      Item {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onChange(value.filter((_, i) => i !== index))
                      }
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <FormInput
                    label={`Item ${index + 1}`}
                    path={`${path}[${index}]`}
                    value={item}
                    depth={depth + 1}
                    bare={itemIsComplex}
                    hideLabel={!itemIsComplex}
                    onChange={(next) => {
                      const copy = [...value];
                      copy[index] = next;
                      onChange(copy);
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </>
    );

    if (bare) return <div>{content}</div>;

    return (
      <div className="rounded-xl border border-line bg-surface-soft/70 p-4">
        {content}
      </div>
    );
  }

  if (fieldType === "object") {
    const entries = Object.entries(value);
    const showChrome = !bare && (depth > 0 || label !== "root");

    const body = (
      <div className={showChrome ? "space-y-3" : "space-y-4"}>
        {entries.length === 0 ? (
          <p className="rounded-lg border border-dashed border-brand/25 bg-surface px-4 py-6 text-center text-sm text-muted">
            No fields.
          </p>
        ) : (
          entries.map(([key, child]) => (
            <FormInput
              key={`${path}.${key}`}
              label={key}
              path={path ? `${path}.${key}` : key}
              value={child}
              depth={depth + 1}
              onChange={(next) =>
                onChange({
                  ...value,
                  [key]: next,
                })
              }
            />
          ))
        )}
      </div>
    );

    if (!showChrome) return body;

    return (
      <div className="rounded-xl border border-line bg-surface-soft/70 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-brand-deep">
            {humanizeKey(label)}
          </p>
          {onRemove ? (
            <button
              type="button"
              onClick={onRemove}
              className="text-sm font-medium text-red-600"
            >
              Remove
            </button>
          ) : null}
        </div>
        {body}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-accent/40 bg-accent-soft/30 px-3.5 py-2.5 text-sm text-brand-deep">
      Unsupported type for {humanizeKey(label)}. Use JSON mode.
    </div>
  );
}

export default function SectionEditor({ pageKey, sectionKey, initialData }) {
  const [mode, setMode] = useState("form");
  const [data, setData] = useState(() =>
    ensureSectionImageField(pageKey, sectionKey, cloneValue(initialData))
  );
  const [jsonText, setJsonText] = useState(() =>
    JSON.stringify(
      ensureSectionImageField(pageKey, sectionKey, cloneValue(initialData)),
      null,
      2
    )
  );
  const [jsonError, setJsonError] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function switchMode(nextMode) {
    if (nextMode === mode) return;

    if (nextMode === "json") {
      setJsonText(JSON.stringify(data, null, 2));
      setJsonError("");
      setMode("json");
      return;
    }

    try {
      const parsed = JSON.parse(jsonText);
      setData(parsed);
      setJsonError("");
      setMode("form");
    } catch {
      setJsonError("Fix invalid JSON before switching to Form view.");
    }
  }

  function getPayload() {
    if (mode === "json") {
      return JSON.parse(jsonText);
    }
    return data;
  }

  async function handleSave() {
    setSaving(true);
    setStatus("");
    setJsonError("");
    try {
      const parsed = getPayload();
      const res = await fetch(`/api/pages/${pageKey}/${sectionKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(parsed),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Save failed");
      }
      setData(cloneValue(parsed));
      setJsonText(JSON.stringify(parsed, null, 2));
      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Invalid JSON or save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete section "${sectionKey}" from ${pageKey}?`)) return;
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch(`/api/pages/${pageKey}/${sectionKey}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Delete failed");
      }
      setStatus("Section deleted.");
      window.location.href = `/admin/pages/${pageKey}`;
    } catch (err) {
      setStatus(err.message || "Delete failed.");
      setSaving(false);
    }
  }

  function handleReset() {
    const reset = ensureSectionImageField(
      pageKey,
      sectionKey,
      cloneValue(initialData)
    );
    setData(reset);
    setJsonText(JSON.stringify(reset, null, 2));
    setJsonError("");
    setStatus("Reset.");
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-11rem)] w-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[0_12px_36px_rgba(26,63,115,0.05)]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div>
          <p className="text-base font-semibold text-brand-deep">Editor</p>
          <p className="text-sm text-muted">
            Form for normal edits · JSON for full control
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-surface-soft p-1">
          <button
            type="button"
            onClick={() => switchMode("form")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "form"
                ? "bg-surface text-brand-deep shadow-sm ring-1 ring-accent/25"
                : "text-muted hover:text-brand-deep"
            }`}
          >
            Form
          </button>
          <button
            type="button"
            onClick={() => switchMode("json")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "json"
                ? "bg-surface text-brand-deep shadow-sm ring-1 ring-brand/25"
                : "text-muted hover:text-brand-deep"
            }`}
          >
            JSON
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-5 md:p-6">
        {mode === "form" ? (
          <div className="w-full">
            {Array.isArray(data) ? (
              <FormInput
                label={sectionKey}
                path={sectionKey}
                value={data}
                onChange={setData}
                depth={0}
              />
            ) : data && typeof data === "object" ? (
              <FormInput
                label="root"
                path=""
                value={data}
                onChange={setData}
                depth={0}
              />
            ) : (
              <FormInput
                label={sectionKey}
                path={sectionKey}
                value={data}
                onChange={setData}
                depth={0}
              />
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-[420px] flex-col">
            <textarea
              className="min-h-[420px] w-full flex-1 rounded-lg border border-line bg-background p-4 font-mono text-base leading-relaxed text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setJsonError("");
              }}
              spellCheck={false}
            />
            {jsonError ? (
              <p className="mt-2 text-sm text-red-600">{jsonError}</p>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5 border-t border-line bg-surface-soft/80 px-5 py-3.5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2.5 text-base font-semibold text-white shadow-sm shadow-brand/25 transition hover:brightness-105 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save section"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={saving}
          className="rounded-lg border border-line bg-surface px-4 py-2.5 text-base font-medium text-brand-deep transition hover:border-brand/30 hover:bg-background disabled:opacity-60"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={saving}
          className="rounded-lg border border-red-200 bg-surface px-4 py-2.5 text-base font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
        >
          Delete
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
