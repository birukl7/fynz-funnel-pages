"use client";

import React, { createContext, useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { industryThemeVars } from "@/lib/industries/themes";
import type { FunnelConfig, Visual } from "./types";

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface FunnelState {
  config: FunnelConfig;
  /** Which plan or path the visitor showed interest in before reaching the form. */
  interest: string;
  setInterest: (v: string) => void;
}

const FunnelContext = createContext<FunnelState | null>(null);

export function useFunnel(): FunnelState {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used inside <FunnelShell>");
  return ctx;
}

/**
 * The frame every funnel page shares: interest state, the sticky anchor-only
 * header, the page root that hides the site chrome, the minimal footer and
 * the phone-width CTA bar. Sections go in as children.
 */
export function FunnelShell({ config, children }: { config: FunnelConfig; children: React.ReactNode }) {
  const [interest, setInterest] = useState("call");
  return (
    <FunnelContext.Provider value={{ config, interest, setInterest }}>
      <div id="top" data-funnel-page className="flex flex-col w-full bg-background pb-20 md:pb-0" style={industryThemeVars(config.theme)}>
        <FunnelHeader />
        {children}
        <FunnelFooter />
        <MobileCtaBar />
      </div>
    </FunnelContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Typography and layout                                               */
/* ------------------------------------------------------------------ */

export const money = (n: number, digits = 0) =>
  "$" + Math.round(n).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[11px] tracking-[0.15em] text-copper uppercase block mb-3", className)}>
      {children}
    </span>
  );
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-tight", className)}>
      {children}
    </h2>
  );
}

/** Single-column funnel section: one idea, one width. */
export function Step({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  wide = false,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-20 border-b border-line-soft scroll-mt-24", className)}>
      <div className={cn("mx-auto px-5 sm:px-6", wide ? "max-w-5xl" : "max-w-3xl")}>
        <div className="text-center mb-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <H2>{title}</H2>
          {intro && <p className="text-muted text-base md:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function DarkCard({ children, className, highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) {
  return (
    <div className={cn("bg-navy-900 text-white border rounded-[var(--r-lg)] p-6", highlight ? "border-copper/50" : "border-white/10", className)}>
      {children}
    </div>
  );
}

export function HowFynzHandlesIt({ children, label = "How Fynz handles it" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="border border-copper/30 rounded-[var(--r-lg)] p-6 md:p-8 bg-navy-900 text-white">
      <span className="font-mono text-[11px] tracking-widest text-green block mb-4 uppercase font-bold">{label}</span>
      <div className="space-y-3 text-sm md:text-base text-slate-200 leading-relaxed">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calls to action                                                     */
/* ------------------------------------------------------------------ */

export function CallButton({ className, size = "lg" }: { className?: string; size?: "lg" | "default" | "sm" }) {
  const { config, setInterest } = useFunnel();
  return (
    <Button
      size={size}
      className={cn("bg-copper hover:bg-copper/90 text-white font-semibold", className)}
      render={<a href={config.bookHref} target="_blank" rel="noopener noreferrer" onClick={() => setInterest("call")} />}
    >
      {config.bookLabel}
    </Button>
  );
}

export function FreeButton({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { config, setInterest } = useFunnel();
  return (
    <Button
      size="lg"
      variant="outline"
      className={cn(onDark && "border-white/20 text-white hover:bg-white/10", className)}
      render={<a href={config.freeHref} target="_blank" rel="noopener noreferrer" onClick={() => setInterest("free")} />}
    >
      {config.freeLabel}
    </Button>
  );
}

/** A CTA strip that closes a funnel step: one line of intent, two buttons. */
export function CtaStrip({ title, body, showFree = true }: { title: string; body?: string; showFree?: boolean }) {
  return (
    <div className="mt-8 border border-copper/30 rounded-[var(--r-lg)] p-6 md:p-8 bg-navy-900 text-white text-center">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">{title}</b>
      {body && <p className="text-sm text-slate-300 mb-5 max-w-xl mx-auto">{body}</p>}
      <div className={cn("flex flex-col sm:flex-row gap-3 justify-center", !body && "mt-5")}>
        <CallButton />
        {showFree && <FreeButton onDark />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

export type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
};

export function NumberField({ label, value, onChange, prefix, suffix, min = 0, max, step = 1 }: NumberFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs md:text-sm text-slate-300 leading-snug">{label}</span>
      <span className="flex items-center gap-1.5 bg-white/[0.05] border border-white/10 rounded-md px-3 py-2 focus-within:border-copper/60">
        {prefix && <span className="font-mono text-copper text-sm">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-full bg-transparent font-mono text-lg text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && <span className="font-mono text-slate-400 text-sm">{suffix}</span>}
      </span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

const ASPECT: Record<Visual["aspect"], string> = {
  portrait: "aspect-[4/5]",
  phone: "aspect-[9/16] max-w-[340px] mx-auto w-full",
  wide: "aspect-[16/9]",
  photo: "aspect-[3/2]",
  square: "aspect-square max-w-[420px] mx-auto w-full",
  strip: "aspect-[3/1] md:aspect-[5/1]",
};

/**
 * A slot for a photo or screenshot of the tool in action. Until the asset
 * exists it renders the brief for whoever is sourcing the image; once `src`
 * is set on the visual it renders the image.
 */
export function VisualSlot({ id, visual, className }: { id: string; visual: Visual; className?: string }) {
  const { config } = useFunnel();
  const v = visual;
  const aspect = ASPECT[v.aspect];
  if (v.src) {
    return (
      <figure className={cn("relative overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-navy-900", aspect, className)}>
        <Image src={v.src} alt={v.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        {v.caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-navy-900/80 text-slate-200 text-xs px-4 py-2">{v.caption}</figcaption>
        )}
      </figure>
    );
  }
  return (
    <div
      role="img"
      aria-label={v.alt}
      className={cn(
        "relative rounded-[var(--r-lg)] border border-copper/30 bg-navy-900/60 p-5 md:p-6 flex flex-col justify-center items-center text-center",
        aspect,
        className
      )}
    >
      {/* Placeholder developer text commented out in favor of image representation */}
      {/* <span className="font-mono text-[10px] tracking-widest text-copper uppercase mb-2">Visual to add · {v.kind}</span> */}
      <b className="font-display font-semibold text-base md:text-lg leading-snug mb-1 text-slate-200">{v.title}</b>
      {/* <p className="text-xs md:text-sm text-muted leading-relaxed">{v.brief}</p>
      <p className="font-mono text-[10px] text-faint mt-3 leading-relaxed">
        Save as /public/{config.assetDir}/{id}.jpg and set src on "{id}" in {config.contentFile} · alt: "{v.alt}"
      </p> */}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chrome                                                              */
/* ------------------------------------------------------------------ */

function FunnelHeader() {
  const { config } = useFunnel();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-background/85 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-[11px] shrink-0" aria-label="Back to top">
          <Image src="/logo-fynz.png" alt="" width={36} height={31} className="h-[30px] w-auto" priority />
          <span className="font-display font-extrabold text-[1.22rem] tracking-[0.06em]">FYNZ</span>
          <span className="hidden lg:inline font-mono text-[10px] tracking-[0.15em] uppercase text-muted ml-3">{config.tag}</span>
        </a>
        <nav aria-label="On this page" className="hidden md:flex items-center gap-6">
          {config.menu.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-muted hover:text-copper transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CallButton size="default" className="hidden md:inline-flex" />
          <Button size="default" className="md:hidden bg-copper hover:bg-copper/90 text-white font-semibold" render={<a href={config.bookHref} target="_blank" rel="noopener noreferrer" />}>
            {config.bookShortLabel}
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="funnel-menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-10 h-10 grid place-items-center rounded-md border border-line-soft text-foreground"
          >
            <span className="relative block w-4 h-3">
              <span className={cn("absolute left-0 h-[2px] w-4 bg-current transition-transform", open ? "top-[5px] rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-[5px] h-[2px] w-4 bg-current transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute left-0 h-[2px] w-4 bg-current transition-transform", open ? "top-[5px] -rotate-45" : "top-[10px]")} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="funnel-menu" aria-label="On this page" className="md:hidden border-t border-line-soft bg-background">
          <div className="max-w-5xl mx-auto px-5 py-2 flex flex-col">
            {config.menu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground border-b border-line-soft last:border-b-0 hover:text-copper"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function MobileCtaBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line-soft bg-background/95 backdrop-blur-md px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <CallButton className="w-full" />
    </div>
  );
}

function FunnelFooter() {
  const { config } = useFunnel();
  return (
    <footer className="py-10 border-t border-line-soft">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <p className="text-xs text-faint leading-relaxed max-w-2xl mx-auto">{config.footerNote}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[10.5px] tracking-[0.06em] text-faint uppercase">
          <span>© 2026 FYNZ, Inc.</span>
          <span>Prices in USD</span>
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-copper">Privacy</a>
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-copper">Terms</a>
          <a href="mailto:hello@fynz.io" className="hover:text-copper">hello@fynz.io</a>
        </div>
      </div>
    </footer>
  );
}
