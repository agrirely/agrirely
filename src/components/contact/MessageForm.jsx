"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitInquiry } from "@/lib/submitInquiry";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function MessageForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await submitInquiry("message", form);
      setForm(initialState);
      setStatus("success");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:gap-6">
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
      <Field
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        as="textarea"
        rows={5}
      />
      {status === "success" ? (
        <p className="text-sm font-medium text-brand">
          Message sent. We&apos;ll get back to you soon.
        </p>
      ) : null}
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      <div className="pt-1">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full !bg-accent !px-6 !py-3.5 !text-brand-deep !shadow-[0_12px_28px_rgba(127,195,80,0.28)] hover:!bg-accent-soft disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
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
          className={`${shared} min-h-[8.5rem] resize-y`}
          placeholder={`Enter your ${label.toLowerCase()}`}
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
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
    </label>
  );
}
