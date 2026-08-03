"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const initialState = {
  name: "",
  email: "",
  commodity: "",
  quantity: "",
  destination: "",
  details: "",
};

export default function QuoteRequestForm({ note }) {
  const [form, setForm] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
          label="Name"
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

      <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
        <Field
          label="Commodity"
          name="commodity"
          value={form.commodity}
          onChange={handleChange}
          required
          placeholder="e.g. Wheat, Rice"
        />
        <Field
          label="Quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          placeholder="e.g. 500 MT"
        />
        <Field
          label="Destination"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          required
          placeholder="Port / Country"
        />
      </div>

      <Field
        label="Additional Details"
        name="details"
        value={form.details}
        onChange={handleChange}
        as="textarea"
        rows={4}
        placeholder="Specs, timeline, packaging, or other requirements"
      />

      <div className="pt-1">
        <Button
          type="submit"
          className="w-full !bg-accent !px-6 !py-3.5 !text-brand-deep !shadow-[0_12px_28px_rgba(127,195,80,0.28)] hover:!bg-accent-soft sm:w-auto"
        >
          Request Quote
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
