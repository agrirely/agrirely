"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const initialState = {
  name: "",
  email: "",
  role: "",
  resume: null,
  note: "",
};

export default function CareersForm({ note }) {
  const [form, setForm] = useState(initialState);

  function handleChange(event) {
    const { name, value, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setForm(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:gap-6">
      {note ? (
        <p className="text-sm leading-relaxed text-muted">{note}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <Field
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <Field
        label="Role of Interest"
        name="role"
        value={form.role}
        onChange={handleChange}
        required
        placeholder="e.g. Trading Analyst, Operations"
      />

      <label className="block">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Upload Resume <span className="text-accent">*</span>
        </span>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          className="w-full border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition file:mr-4 file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-brand focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </label>

      <Field
        label="Cover Note"
        name="note"
        value={form.note}
        onChange={handleChange}
        as="textarea"
        rows={4}
        placeholder="Tell us briefly about your experience"
      />

      <div className="pt-1">
        <Button
          type="submit"
          className="w-full !bg-accent !px-6 !py-3.5 !text-brand-deep !shadow-[0_12px_28px_rgba(127,195,80,0.28)] hover:!bg-accent-soft sm:w-auto"
        >
          Submit Application
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
  as = "input",
  rows,
  placeholder,
}) {
  const shared =
    "w-full border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition duration-300 placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={`${shared} min-h-[7rem] resize-y`}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={shared}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
      )}
    </label>
  );
}
