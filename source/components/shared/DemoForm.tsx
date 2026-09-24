"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";

// Base URL of the onboarding bridge service (services/onboarding-bridge),
// inlined at build time. The form posts to `${BRIDGE_URL}/demo/web`.
const BRIDGE_URL = (process.env.NEXT_PUBLIC_ONBOARDING_BRIDGE_URL || "").replace(/\/$/, "");

export interface InterestOption {
  value: string;
  label: string;
}

export interface DemoFormProps {
  /** Submit button label. */
  submitLabel?: string;
  /** Headline shown after a successful submission. */
  successHeadline?: React.ReactNode;
  /** Body shown after a successful submission; receives the email that was entered. */
  successBody?: (email: string) => React.ReactNode;
  /** Placeholder for the phone field. */
  phonePlaceholder?: string;
  /** When given, renders a "what are you interested in" select above the button. */
  interestOptions?: InterestOption[];
  /** Controlled value for the interest select. */
  interest?: string;
  onInterestChange?: (value: string) => void;
  /** Extra fields sent with the submission, e.g. { source: "restaurants-funnel" }. */
  extra?: Record<string, string>;
  /** Open the Terms and Privacy links in a new tab (funnel pages keep the visitor on the page). */
  legalInNewTab?: boolean;
}

const INPUT =
  "w-full bg-navy-800 border border-white/10 rounded-[var(--r-md)] py-3.5 px-5 text-[0.95rem] text-white outline-none transition-all placeholder:text-slate-400 focus:border-copper/55";

export function DemoForm({
  submitLabel = "Book my demo",
  successHeadline = (
    <>
      We&apos;ll be in touch within <span className="text-copper">one business day</span>.
    </>
  ),
  successBody = (email) => (
    <>
      A human from our team will email {email || "you"} to set up your 20-minute call and start your missed-call
      audit.
    </>
  ),
  phonePlaceholder = "Business phone line (for the missed-call audit)",
  interestOptions,
  interest,
  onInterestChange,
  extra,
  legalInNewTab = false,
}: DemoFormProps) {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", website: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      if (!BRIDGE_URL) {
        throw new Error("The booking form isn't available right now.");
      }
      const payload: Record<string, string> = { ...form, ...(extra || {}) };
      if (interestOptions && interest) {
        payload.interest = interestOptions.find((o) => o.value === interest)?.label || interest;
      }
      const res = await fetch(`${BRIDGE_URL}/demo/web`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 429) {
        throw new Error("Too many attempts from your network — please try again in a few minutes.");
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong on our side.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "done") {
    return (
      <div className="text-center py-6">
        <span className="font-mono text-[11px] tracking-[0.15em] text-copper uppercase block mb-3">Request received</span>
        <h3 className="font-display font-extrabold text-2xl tracking-tight mb-3">{successHeadline}</h3>
        <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">{successBody(form.email)}</p>
      </div>
    );
  }

  const legalTarget = legalInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      {/* Honeypot — hidden from people, tempting to bots */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px opacity-0"
      />
      <input type="text" name="name" value={form.name} onChange={set("name")} placeholder="Your name" aria-label="Your name" autoComplete="name" className={INPUT} />
      <input type="text" name="business" value={form.business} onChange={set("business")} placeholder="Business name" aria-label="Business name" autoComplete="organization" className={INPUT} />
      <input type="email" name="email" value={form.email} onChange={set("email")} placeholder="Email" aria-label="Email" autoComplete="email" required className={INPUT} />
      <input type="tel" name="phone" value={form.phone} onChange={set("phone")} placeholder={phonePlaceholder} aria-label="Business phone line" autoComplete="tel" className={INPUT} />
      {interestOptions && (
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">I&apos;m interested in</span>
          <select
            name="interest"
            value={interest}
            onChange={(e) => onInterestChange?.(e.target.value)}
            className={cnSelect}
          >
            {interestOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-[var(--r-md)] px-4 py-3">
          {errorMsg} You can also email{" "}
          <a href="mailto:hello@fynz.io?subject=Demo%20request" className="underline underline-offset-2">
            hello@fynz.io
          </a>{" "}
          and we&apos;ll book you by hand.
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="bg-copper hover:bg-copper/90 text-white font-semibold w-full"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
      <p className="font-mono text-[9px] tracking-widest text-slate-400 uppercase text-center">
        No card required · we reply within one business day
      </p>
      <p className="text-[11px] text-slate-500 text-center">
        By submitting you agree to our{" "}
        <a href="/terms" {...legalTarget} className="underline underline-offset-2 hover:text-copper">Terms</a> and{" "}
        <a href="/privacy" {...legalTarget} className="underline underline-offset-2 hover:text-copper">Privacy Policy</a>.
      </p>
    </form>
  );
}

const cnSelect =
  "w-full bg-navy-800 border border-white/10 rounded-[var(--r-md)] py-3.5 px-5 text-[0.95rem] text-white outline-none transition-all focus:border-copper/55 appearance-none";
