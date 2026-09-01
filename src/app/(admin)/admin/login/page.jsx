"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SITE_LOGO, SITE_NAME } from "@/lib/constants";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Login failed");
      }

      const next = searchParams.get("next") || "/admin";
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(139,200,58,0.18),transparent_45%),radial-gradient(ellipse_at_85%_85%,rgba(74,144,226,0.16),transparent_48%)]"
        aria-hidden
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-[0_24px_60px_rgba(26,63,115,0.1)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-soft to-brand" />

        <div className="flex flex-col items-start gap-3">
          <Image
            src={SITE_LOGO}
            alt={SITE_NAME}
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-brand-deep">
              Admin Login
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              Sign in to manage {SITE_NAME} website content.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-deep">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className="rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/15"
              placeholder={`${SITE_NAME}@admin.com`}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-deep">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/15"
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-lg bg-gradient-to-r from-brand to-brand-mid px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
