"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal, StaggerGroup } from "@/components/animations";
import { Chip, DemoForm } from "@/components/shared";
import { Button } from "@/components/ui";

const STEPS = [
  {
    step: "01",
    title: "Tell us about your business",
    desc: "Your industry, your line, and what a booked job is worth to you. Two minutes, no prep."
  },
  {
    step: "02",
    title: "We audit your missed calls",
    desc: "We record what your phone line actually does after hours — where callers land, and where they give up."
  },
  {
    step: "03",
    title: "A 20-minute call, on your numbers",
    desc: "We walk through what you're missing, in dollars, and show you exactly how FYNZ would answer, book, and recover it."
  }
];

export default function DemoPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 text-center overflow-hidden border-b border-line-soft">
        <div className="absolute inset-0 bg-radial-[at_50%_0%] from-copper/10 via-transparent to-transparent pointer-events-none" />
        <div className="wrap max-w-4xl mx-auto px-6 relative z-10">
          <Chip className="mb-4 mx-auto">Book a demo</Chip>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
            Book your demo — get your <span className="text-copper">free missed-call audit</span>.
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            We record what your line does after hours, then show you what you&apos;re missing on a 20-minute call — your numbers, your industry, no slideware.
          </p>
          <p className="font-mono text-[9.5px] tracking-widest text-faint uppercase">
            Month-to-month · 30-day money-back guarantee · live in 48 hours
          </p>
        </div>
      </section>

      {/* What happens */}
      <section className="sec py-24 border-b border-line-soft">
        <div className="wrap max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.15em] text-copper uppercase block mb-3">What happens</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
              Three steps. <span className="text-copper">No pitch deck.</span>
            </h2>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, idx) => (
              <div key={idx} className="bg-navy-800 text-white border border-white/10 p-6 rounded-[var(--r-lg)]">
                <span className="font-mono text-[9px] tracking-wider text-copper bg-copper-tint/20 border border-copper/20 px-2 py-0.5 rounded block w-fit mb-4">{step.step}</span>
                <h3 className="font-display font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="sec py-24 border-b border-line-soft">
        <div className="wrap max-w-2xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-navy-900 text-white rounded-[var(--r-lg)] p-8 md:p-12">
              <span className="font-mono text-[9px] tracking-[0.15em] text-copper uppercase block mb-3">Pick a time</span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-6">
                Grab a <span className="text-copper">20-minute slot</span>
              </h2>

              <DemoForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final py-24 relative overflow-hidden text-center bg-radial-[at_bottom_center] from-copper/10 via-transparent to-transparent">
        <div className="wrap max-w-4xl mx-auto px-6 relative z-10">
          <span className="font-mono text-[9px] tracking-[0.15em] text-copper uppercase block mb-3">Not ready to talk?</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Start on <span className="text-copper">Free</span> instead.
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            The Free plan shows you the revenue you&apos;re missing — no card, no countdown. Upgrade whenever you&apos;re ready to recover it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" render={<Link href="/pricing" />}>
              See pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
