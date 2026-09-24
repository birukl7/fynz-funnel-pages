"use client";

import React, { useState } from "react";
import { StaggerGroup, HoverFloat } from "@/components/animations";
import { FynzFormEmbed } from "@/components/shared";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  CallButton,
  CtaStrip,
  DarkCard,
  Eyebrow,
  FreeButton,
  FunnelShell,
  HowFynzHandlesIt,
  NumberField,
  Step,
  VisualSlot,
  money,
  useFunnel,
  type FunnelConfig,
} from "@/components/funnel";
import {
  BOOK_CALL_HREF,
  BOOK_CALL_LABEL,
  CLEANING_FAQS,
  CLEANING_PLANS,
  FREE_PLAN_HREF,
  FREE_PLAN_LABEL,
  PLAN_TABLE,
  VISUALS,
} from "./content";

/* ------------------------------------------------------------------ */
/* Funnel config                                                       */
/* ------------------------------------------------------------------ */

const CONFIG: FunnelConfig = {
  theme: "cleaning",
  tag: "Follow-up for cleaning companies",
  bookHref: BOOK_CALL_HREF,
  bookLabel: BOOK_CALL_LABEL,
  bookShortLabel: "Book a call",
  freeHref: FREE_PLAN_HREF,
  freeLabel: FREE_PLAN_LABEL,
  menu: [
    { href: "#phone", label: "Leads" },
    { href: "#recurring", label: "Recurring clients" },
    { href: "#reviews", label: "Reviews" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ],
  assetDir: "industries/cleaning",
  contentFile: "app/industries/cleaning/content.ts",
  footerNote:
    "Sources are linked where a figure is quoted. Calculator results are illustrative and depend on the numbers you enter. We configure messaging to follow CASL, TCPA and carrier rules, including consent records and opt-outs. We don't give legal advice, so check with your advisor if your situation is unusual.",
};

/* ------------------------------------------------------------------ */
/* Mock message cards                                                  */
/* ------------------------------------------------------------------ */

function RebookCard() {
  return (
    <div className="bg-navy-900 text-white border border-white/10 rounded-[var(--r-lg)] p-5 shadow-md">
      <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
        <span className="w-8 h-8 rounded bg-copper-tint border border-copper/30 grid place-items-center text-copper text-sm shrink-0">↻</span>
        <div>
          <b className="font-display text-[0.8rem] font-bold text-white block leading-tight">Rebook nudge · Week 6</b>
          <small className="font-mono text-[7px] tracking-[0.12em] text-slate-400 block mt-0.5">SENT AUTOMATICALLY — MONDAY 10:05 AM</small>
        </div>
        <span className="font-mono text-[7.5px] tracking-[0.14em] text-green border border-green/30 px-2 py-0.5 rounded ml-auto uppercase">Delivered</span>
      </div>
      <div className="bg-white/[0.05] border border-white/10 rounded-md p-3 text-[0.8rem] text-slate-200 leading-relaxed">
        Hi Lena, it&apos;s been a few weeks since your last clean with Brightside. Want your usual Thursday slot back? Reply YES and we&apos;ll hold it. Reply STOP to opt out.
      </div>
      <div className="mt-3.5 bg-green/10 border border-green/30 p-2 rounded text-center">
        <span className="font-mono text-[8px] text-green uppercase tracking-wide">Rebooked — Thursday 9:00 AM, every two weeks ✓</span>
      </div>
    </div>
  );
}

function TextBackCard() {
  return (
    <div className="bg-navy-900 text-white border border-white/10 rounded-[var(--r-lg)] p-5 shadow-md">
      <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
        <span className="font-display text-[0.8rem] font-bold text-white uppercase tracking-wide">Missed call · Tuesday 10:40 AM</span>
        <span className="font-mono text-[7.5px] tracking-[0.14em] text-copper uppercase">Text-back</span>
      </div>
      <div className="space-y-2 text-[0.78rem]">
        <div className="text-slate-300"><b>Fynz:</b> &quot;Sorry we missed you, the team is on a job. Is this for a regular clean, a move-out, or something else?&quot;</div>
        <div className="text-copper"><b>Caller:</b> &quot;Regular, 3 bed 2 bath, every two weeks.&quot;</div>
        <div className="text-slate-300"><b>Fynz:</b> &quot;Perfect. Pick a 20-minute quote visit here and it&apos;s booked.&quot;</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calculators                                                         */
/* ------------------------------------------------------------------ */

function ChurnCalculator() {
  const [clients, setClients] = useState(60);
  const [quietShare, setQuietShare] = useState(30);
  const [annualValue, setAnnualValue] = useState(2400);

  const lost = clients * (Math.min(Math.max(quietShare, 0), 100) / 100);
  const revenue = lost * annualValue;

  return (
    <DarkCard className="md:p-8">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">How much quietly leaves your route each year?</b>
      <p className="text-sm text-slate-300 mb-6">Type your own numbers into the three boxes. The total updates as you go.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberField label="Recurring clients on your route today" value={clients} onChange={setClients} />
        <NumberField label="Share who skip a clean and then stop, each year" value={quietShare} onChange={setQuietShare} suffix="%" max={100} />
        <NumberField label="What one recurring client pays you in a year" value={annualValue} onChange={setAnnualValue} prefix="$" step={100} />
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Clients who quietly leave, per year</span>
          <span className="font-mono text-2xl font-bold text-white">{Math.round(lost).toLocaleString("en-US")}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Revenue that leaves with them</span>
          <span className="font-mono text-3xl md:text-4xl font-extrabold text-copper">{money(revenue)}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mt-6">
        Illustrative, not a promised result. A client who skips once and never rebooks looks exactly like a client on holiday, right up until the slot has been empty for two months.
      </p>
    </DarkCard>
  );
}

function MissedCallCalculator() {
  const [missed, setMissed] = useState(8);
  const [bookShare, setBookShare] = useState(30);
  const [firstYear, setFirstYear] = useState(1200);

  const perWeek = missed * (Math.min(Math.max(bookShare, 0), 100) / 100) * firstYear;
  const perYear = perWeek * 52;

  return (
    <DarkCard className="md:p-8">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">What did last week&apos;s missed calls cost?</b>
      <p className="text-sm text-slate-300 mb-6">Someone calling a cleaning company has usually already decided to hire one. If nobody answers, they call the next name.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberField label="Calls and quote requests you didn't answer within an hour, per week" value={missed} onChange={setMissed} />
        <NumberField label="Share that would have booked with a fast reply" value={bookShare} onChange={setBookShare} suffix="%" max={100} />
        <NumberField label="What a new client is worth in their first year" value={firstYear} onChange={setFirstYear} prefix="$" step={100} />
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Lost in one week</span>
          <span className="font-mono text-2xl font-bold text-white">{money(perWeek)}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Lost across a year</span>
          <span className="font-mono text-3xl md:text-4xl font-extrabold text-copper">{money(perYear)}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mt-6">
        Illustrative. The free plan counts your real missed calls, so you don&apos;t have to guess the first number.
      </p>
    </DarkCard>
  );
}

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */

const HERO_LINES = [
  "Leads: missed calls texted back and quote requests answered in seconds",
  "Recurring clients: a reminder the day before, an \"on our way\" text, and a nudge when someone stops booking",
  "Reviews: one request after every clean, no gating",
  "Money: the clients your happy clients send you, with no per-lead fee",
];

const TIMELINE = [
  {
    when: "The day before",
    title: "A reminder with the arrival window",
    desc: "\"We're coming tomorrow between 9 and 11.\" The client can confirm or reschedule by reply. Nobody drives across town to a locked door.",
  },
  {
    when: "That morning, and that evening",
    title: "\"On our way\", then one review request",
    desc: "A text with the cleaner's first name when the team leaves the last job, and a single Google review link that evening while the house still smells clean.",
  },
  {
    when: "Week 6 of silence",
    title: "A rebook nudge",
    desc: "When a recurring client hasn't booked in six weeks, they get a real message offering their usual slot back. The clients who were drifting get pulled back before the slot is gone for good.",
  },
];

const FEE_ROWS: { label: string; marketplace: string; referral: string; bold?: boolean }[] = [
  { label: "First clean for a new client", marketplace: "$180", referral: "$180" },
  { label: "Lead fees paid to win it (about 4 leads at $35 each)", marketplace: "−$140", referral: "$0" },
  { label: "Left after the lead fees", marketplace: "$40", referral: "$180", bold: true },
  { label: "Difference", marketplace: "", referral: "+$140 per new client", bold: true },
];

const PHOTO_STATS = [
  { value: "12–16", label: "posts a month, across your channels" },
  { value: "7", label: "channels: Instagram, Facebook, Google Business, TikTok, LinkedIn, X and Pinterest" },
  { value: "~10s", label: "your part: the before-and-after photos your team already takes" },
];

const REVIEW_CARDS = [
  {
    title: "One request, the evening of the clean",
    desc: "Sent once, in your company's name, with the Google link. A client walking into a clean house is the most willing reviewer you will ever have.",
  },
  {
    title: "No gating, ever",
    desc: "Every client is asked, not only the happy ones. That keeps you inside Google's rules against review gating, and your reviews read as real because they are.",
  },
];

const COST_ROWS = [
  {
    name: "A pile of separate tools",
    desc: "An answering service, a texting tool, an email tool, a social scheduler, a review tool and an e-signature tool, each from a different vendor with its own login and its own bill.",
    price: "$300–900",
  },
  {
    name: "An office admin, part-time",
    desc: "Phones and follow-up for the hours they work. Evenings, weekends, review requests and content are separate if covered at all.",
    price: "$1,200–2,500",
  },
  {
    name: "Fynz Managed",
    desc: "All of it, run for you: before-and-after content from your photos, campaigns, client follow-up, missed-call text-back, quote replies and reviews.",
    price: "$397",
    highlight: true,
  },
];

const GUARANTEES = [
  { title: "30-day money-back guarantee", desc: "On every paid plan. If it isn't working for you, you get the month back." },
  { title: "Month to month, no contract", desc: "Cancel from your dashboard whenever you like. We export your client list for you." },
  { title: "Live in 48 hours", desc: "On any paid plan our team does the setup. You start with a working system, not an empty one." },
];

const NINETY_DAYS = [
  {
    step: "Days 1–2",
    title: "Set up for you",
    desc: "On any paid plan, our team imports your client list with their schedules, connects your number and your calendar, and turns on missed-call text-back, quote replies, reminders and review requests. You're live in 48 hours.",
  },
  {
    step: "Days 3–30",
    title: "The list starts working",
    desc: "Website and Google quote requests, missed calls and new bookings add clients every week. Reminders and \"on our way\" texts go out from the schedule. On Managed, your first month of before-and-after posts is on a calendar you've approved.",
  },
  {
    step: "Days 45–90",
    title: "The first rebook nudges go out",
    desc: "Clients who skipped and went quiet get their usual slot offered back. From here on it runs every day without anyone in the office chasing.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function CleaningLanding() {
  return (
    <FunnelShell config={CONFIG}>
      <CleaningBody />
    </FunnelShell>
  );
}

function CleaningBody() {
  const { setInterest } = useFunnel();
  return (
    <>
      {/* 1. Hook */}
      <section className="pt-14 pb-14 md:pt-20 md:pb-20 border-b border-line-soft">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Eyebrow>The follow-up system for cleaning companies</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
            Every call answered. Every client rebooked. Every clean reviewed. <span className="text-copper">While you&apos;re on a job.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            A cleaning day is gloves on, music up and the phone buzzing in your pocket. The follow-up happens at 9 PM or not at all. Fynz does it as it happens: texts back the call you missed, sends the quote link, reminds tomorrow&apos;s client so nobody&apos;s locked out, asks for the review while the house still smells clean, and nudges the client who quietly stopped booking. You keep cleaning. It keeps the route full.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallButton />
            <FreeButton />
          </div>
          <p className="text-sm text-muted mt-6 leading-relaxed">
            Built for independent residential and commercial cleaning companies. Works with the scheduling and invoicing app you already use, not instead of it.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-6 mt-12 grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
          <ul className="grid gap-3 text-sm md:text-base text-muted">
            {HERO_LINES.map((line) => (
              <li key={line} className="flex gap-3 items-start">
                <span className="text-copper font-mono text-xs mt-1 shrink-0">✓</span>
                <span>{line}</span>
              </li>
            ))}
            <li className="text-xs text-faint mt-2">One system, four jobs. Each one has its own section below.</li>
          </ul>
          <VisualSlot id="hero" visual={VISUALS.hero} className="w-full max-w-[460px] justify-self-center md:justify-self-end" />
        </div>
      </section>

      {/* 2. Leads */}
      <Step
        id="phone"
        eyebrow="Step 1 · The leads"
        title={<>The phone rings while your hands are in gloves. <span className="text-copper">By lunch they&apos;ve booked someone else.</span></>}
        intro={
          <>
            Firms that contacted a web lead within an hour were nearly seven times as likely to qualify it as those that waited even an hour longer. (
            <a href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Harvard Business Review, 2011</a>
            )
          </>
        }
      >
        <MissedCallCalculator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <div className="flex flex-col gap-6">
            <HowFynzHandlesIt>
              <p>Every call that rings out gets a text back within seconds, from your number, asking whether it&apos;s a regular clean, a move-out or something else. Quote requests get a booking link with real times from your calendar. Everything else lands in your inbox as a message you answer when the job is done.</p>
              <p>Website forms and Google Business messages get the same treatment: a reply within seconds, two questions about the home, and a time for the quote. Nobody waits until you&apos;re back in the van.</p>
              <p>You set your business line to forward unanswered calls to a free Fynz number, which takes about two minutes, and the dashboard counts every call you missed. Your number doesn&apos;t change.</p>
            </HowFynzHandlesIt>
            <HoverFloat yOffset={6} duration={4}>
              <TextBackCard />
            </HoverFloat>
          </div>
          <VisualSlot id="textback" visual={VISUALS.textback} />
        </div>
        <VisualSlot id="dashboard" visual={VISUALS.dashboard} className="mt-6" />
        <CtaStrip title="Find out how many calls you missed last week." body="The free plan counts them for you. Or book a call and we'll read them with you." />
      </Step>

      {/* 3. Recurring clients */}
      <Step
        id="recurring"
        eyebrow="Step 2 · Recurring clients"
        title={<>Your route is the business. <span className="text-copper">It leaks one skipped clean at a time.</span></>}
        intro="Nobody cancels a cleaning service. They skip once because of a trip, forget to rebook, and three months later the slot has been empty the whole time and nobody in the office noticed."
      >
        <ChurnCalculator />
        <div className="mt-6">
          <HowFynzHandlesIt>
            <p>Every client on your list is remembered with their schedule. When a recurring client hasn&apos;t booked in six weeks, Fynz sends a real message offering their usual slot back. Before the holidays and the spring rush, everyone gets one offer. The clients you would have lost quietly get a reason to come back before the slot is gone.</p>
          </HowFynzHandlesIt>
        </div>
      </Step>

      {/* 4. What runs on its own */}
      <Step
        id="how"
        eyebrow="Step 3 · What runs on its own"
        title={<>A reminder the day before. <span className="text-copper">A review request that evening. A nudge when they go quiet.</span></>}
        wide
      >
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIMELINE.map((item) => (
            <DarkCard key={item.title} className="flex flex-col">
              <span className="font-mono text-[10px] tracking-widest text-copper uppercase mb-3">{item.when}</span>
              <b className="font-display font-bold text-lg mb-2">{item.title}</b>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </DarkCard>
          ))}
        </StaggerGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          <VisualSlot id="messages" visual={VISUALS.messages} />
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted leading-relaxed">What the rebook nudge looks like from your side: sent on its own, with the reply logged against the client and the slot back on the route.</p>
            <HoverFloat yOffset={-6} duration={3.5}>
              <RebookCard />
            </HoverFloat>
          </div>
        </div>
        <VisualSlot id="reminder" visual={VISUALS.reminder} className="mt-6" />
        <p className="text-sm text-muted leading-relaxed mt-8 max-w-3xl mx-auto text-center">
          Consent is recorded separately for text and email and checked before every send. We set up your messaging to follow CASL in Canada, and in the US we handle A2P 10DLC registration for your texting number and follow TCPA consent rules. Missed-call replies go only to people who just called you.
        </p>
        <CtaStrip title="Want to see it run on your own route?" body="Fifteen minutes. Bring nothing but your business number and a rough count of your recurring clients." />
      </Step>

      {/* 5. Lead marketplaces */}
      <Step
        id="fees"
        eyebrow="Step 4 · Lead fees"
        title={<>Keep the clients your clients send you, and the fees <span className="text-copper">a lead marketplace would have taken</span></>}
        intro="A new client from a referral and a new client from a pay-per-lead marketplace are the same work. What changes is how many leads you paid for to win one."
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.8fr] gap-6 items-start">
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-5">The same $180 first clean</b>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left font-mono text-[10px] tracking-widest text-slate-400 uppercase pb-3 font-normal" />
                  <th className="text-right font-mono text-[10px] tracking-widest text-slate-400 uppercase pb-3 font-normal">Through a lead marketplace</th>
                  <th className="text-right font-mono text-[10px] tracking-widest text-copper uppercase pb-3 font-normal">From a client&apos;s referral</th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row) => (
                  <tr key={row.label} className={cn("border-b border-white/10", row.bold && "font-bold")}>
                    <td className="py-3 pr-4 text-slate-200">{row.label}</td>
                    <td className="py-3 text-right font-mono text-slate-300">{row.marketplace}</td>
                    <td className={cn("py-3 text-right font-mono", row.bold ? "text-copper" : "text-white")}>{row.referral}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-slate-200 leading-relaxed mt-6">
              At two new clients a month, winning them from referrals and your own reviews instead of paid leads is about <b className="text-white">$3,400 a year</b> kept (24 clients × $140).
            </p>
            <p className="text-xs text-slate-400 italic leading-relaxed mt-4">
              Marketplaces such as Thumbtack and Angi charge per lead whether or not you win the job, and the same lead is usually sold to several companies. Lead prices and close rates vary by city; put your own in. A recurring client is worth far more than the first clean, which is the whole point of winning them without a fee.
            </p>
          </DarkCard>
          <VisualSlot id="referral" visual={VISUALS.referral} />
        </div>
        <CtaStrip title="See what lead fees cost you last year." body="Bring your marketplace statement. We'll do the arithmetic on your numbers, not ours." showFree={false} />
      </Step>

      {/* 6. Content and reviews */}
      <Step
        id="reviews"
        eyebrow="Step 5 · Being seen"
        title={<>Nobody hires the cleaning company <span className="text-copper">with four reviews and a dead feed</span></>}
        intro="People pick a cleaner from Google in about a minute: the rating, the review count, and whether the photos look like real homes. That is the whole audition."
        wide
      >
        <div className="mb-8">
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-center mb-3">We ask every client <span className="text-copper">how it went</span></h3>
          <p className="text-muted text-base leading-relaxed max-w-2xl mx-auto text-center">
            Most cleaning companies have a handful of reviews because asking feels awkward and the moment passes. Fynz asks for you, once, the evening of the clean.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEW_CARDS.map((card) => (
            <DarkCard key={card.title}>
              <b className="font-display font-bold text-lg block mb-2">{card.title}</b>
              <p className="text-sm text-slate-300 leading-relaxed">{card.desc}</p>
            </DarkCard>
          ))}
        </div>
        <VisualSlot id="reviews" visual={VISUALS.reviews} className="mt-6" />

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Before and after</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">Your team already takes the photos. <span className="text-copper">Now they get posted.</span></h3>
        </div>
        <VisualSlot id="content" visual={VISUALS.content} className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <HowFynzHandlesIt>
            <p><b className="text-white">On the Managed plan,</b> your team sends the before-and-after pair from the job. We edit it, caption it and publish it across Instagram, Facebook, Google Business, TikTok and more: 12 to 16 posts a month on a calendar you approve in advance, with seasonal offers built in.</p>
            <p><b className="text-white">On Growth,</b> you get the same planning calendar and scheduler and publish the posts yourself.</p>
          </HowFynzHandlesIt>
          <DarkCard className="md:p-8">
            <span className="font-mono text-[10px] tracking-widest text-copper uppercase block mb-2">Managed plan</span>
            <b className="font-display font-bold text-xl block mb-6">Your part: send the pair</b>
            <div className="grid grid-cols-3 gap-4">
              {PHOTO_STATS.map((stat) => (
                <div key={stat.value}>
                  <span className="font-mono text-2xl md:text-3xl font-extrabold text-copper block mb-1">{stat.value}</span>
                  <span className="text-xs text-slate-300 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mt-6 pt-6 border-t border-white/10">
              Photo-to-post is done for you on Managed. Growth includes the content calendar and scheduler so your team can post. Starter doesn&apos;t include social content.
            </p>
          </DarkCard>
        </div>
      </Step>

      {/* 7. Proof */}
      <Step eyebrow="Step 6 · Proof" title={<>Already running for <span className="text-copper">companies like yours</span></>} wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <VisualSlot id="proof" visual={VISUALS.proof} />
          <VisualSlot id="case-study" visual={VISUALS.caseStudy} />
        </div>
      </Step>

      {/* 8. Offer */}
      <Step
        id="pricing"
        eyebrow="Step 7 · The offer"
        title={<>What this replaces, and <span className="text-copper">what it costs</span></>}
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COST_ROWS.map((row) => (
            <DarkCard key={row.name} highlight={row.highlight} className="flex flex-col">
              <b className="font-display font-bold text-lg block mb-2">{row.name}</b>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 grow">{row.desc}</p>
              <span className={cn("font-mono text-2xl font-extrabold", row.highlight ? "text-copper" : "text-white")}>
                {row.price}
                <span className="text-xs text-slate-400 font-normal">/mo</span>
              </span>
            </DarkCard>
          ))}
        </div>
        <p className="text-sm text-muted leading-relaxed mt-6 max-w-3xl mx-auto text-center">
          Tool-stack and admin ranges are typical 2026 published entry prices and part-time rates for a company with one crew, before ad spend and before any per-lead fees.
        </p>

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Plans</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">What each <span className="text-copper">plan includes</span></h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin mb-10 bg-navy-900 text-white rounded-[var(--r-lg)] border border-white/10 p-4 md:p-6">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr_1fr] border-b border-white/10 pb-3">
              <span />
              {CLEANING_PLANS.map((plan) => (
                <span key={plan.key} className={cn("text-center font-display font-bold text-sm", plan.popular ? "text-copper" : "text-slate-200")}>
                  {plan.name}
                  <small className="block font-mono text-[9px] text-slate-400 font-normal mt-1">
                    {plan.price === 0 ? "$0" : `$${plan.price} USD/MO`}
                  </small>
                </span>
              ))}
            </div>
            {PLAN_TABLE.map((row) => (
              <div key={row.name} className="grid grid-cols-[2.2fr_1fr_1fr_1fr_1fr] border-b border-white/10 py-3 items-center text-xs hover:bg-white/[0.04]">
                <span className={cn("font-display pr-4", row.emphasis ? "font-bold text-white" : "font-medium text-slate-300")}>{row.name}</span>
                {row.cells.map((cell, idx) => (
                  <span key={idx} className={cn("text-center font-mono text-[11px] px-1", idx === 2 ? "text-copper font-semibold" : "text-slate-300")}>
                    {cell === true ? <span className="text-copper text-xs">✓</span> : cell === false ? <span className="text-slate-500">—</span> : cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <StaggerGroup id="plans" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch scroll-mt-24">
          {CLEANING_PLANS.map((plan) => (
            <div
              key={plan.key}
              className={cn(
                "relative bg-navy-900 text-white border p-7 rounded-[var(--r-lg)] flex flex-col transition-all duration-300 hover:-translate-y-1",
                plan.popular ? "border-copper/50" : "border-white/10"
              )}
            >
              {plan.popular && (
                <span className="absolute top-[-11px] left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-widest bg-copper text-white px-3.5 py-1 rounded-full font-bold uppercase select-none">
                  Most popular
                </span>
              )}
              <h3 className="font-display font-extrabold text-xl mb-3">{plan.name}</h3>
              <div className="flex items-baseline gap-1.5 border-b border-white/10 pb-4 mb-4">
                <span className="font-mono text-copper text-lg font-bold">$</span>
                <span className="font-mono text-3xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">USD/mo</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed grow">{plan.desc}</p>
              {plan.key === "free" && (
                <p className="text-xs text-slate-400 leading-relaxed mt-3">
                  Forward unanswered calls to a free Fynz number, which takes about two minutes, and the dashboard counts every call you missed. Your number doesn&apos;t change.
                </p>
              )}
              <Button
                className={cn(
                  "w-full mt-6 py-6 font-semibold",
                  plan.popular ? "bg-copper hover:bg-copper/90 text-white" : "bg-white text-navy-900 hover:bg-slate-100 border-none"
                )}
                render={<a href={plan.href} target="_blank" rel="noopener noreferrer" onClick={() => setInterest(plan.key)} />}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </StaggerGroup>
        <p className="text-center text-sm text-muted mt-8">
          Prices in USD, taxes at checkout. Text messages and calls are billed at cost to your own account, separately from the plan.
        </p>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="border border-copper/30 rounded-[var(--r-lg)] p-6 bg-copper-tint/40">
              <b className="font-display font-bold text-base block mb-1">{g.title}</b>
              <p className="text-sm text-muted leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </Step>

      {/* 9. Objections */}
      <Step
        eyebrow="Step 8 · Your tools and your first 90 days"
        title={<>It works alongside <span className="text-copper">the scheduling app you already use</span></>}
        intro="If your route, your invoices and your payroll live in Jobber, Housecall Pro or a spreadsheet, they stay there. Fynz runs the phone, the follow-up, the reviews and the content around them."
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-3">On the route, your tools lead.</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Scheduling, invoicing and payroll stay where they are. Quote visits and first cleans booked through Fynz land on your calendar, and payments for quotes and deposits go through your own Stripe or Square account. If you have no scheduling app yet, Fynz&apos;s booking and invoicing can be it.
            </p>
          </DarkCard>
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-3">Everywhere else, Fynz leads.</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              The client list, the reminders and &quot;on our way&quot; texts, the missed-call text-back, the quote replies, the rebook nudges, the review requests and the before-and-after content all run from Fynz. It does the part nobody has time for between jobs.
            </p>
          </DarkCard>
        </div>
        <VisualSlot id="stack" visual={VISUALS.stack} className="mt-6" />
        <div className="mt-14 text-center mb-8">
          <Eyebrow>Getting started</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">Your first <span className="text-copper">90 days</span></h3>
        </div>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NINETY_DAYS.map((item) => (
            <DarkCard key={item.step}>
              <span className="font-mono text-sm text-copper bg-copper-tint border border-copper/30 px-3 py-1 rounded-full inline-block mb-4">{item.step}</span>
              <b className="font-display font-bold text-lg block mb-2">{item.title}</b>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </DarkCard>
          ))}
        </StaggerGroup>
      </Step>

      {/* 10. FAQ */}
      <Step id="faq" eyebrow="Owner FAQ" title={<>Fair <span className="text-copper">questions</span></>}>
        <Accordion className="w-full bg-navy-800 border-white/10">
          {CLEANING_FAQS.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-b border-white/10 py-2">
              <AccordionTrigger className="font-display font-semibold text-lg text-white hover:text-copper hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 leading-relaxed text-sm pt-2 pb-4 max-w-2xl">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Step>

      {/* 11. Book */}
      <section id="book" className="py-16 md:py-24 relative overflow-hidden bg-radial-[at_bottom_center] from-copper/10 via-transparent to-transparent scroll-mt-20">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="text-center mb-8">
            <Eyebrow>Book a 15-minute call</Eyebrow>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
              You keep cleaning. <span className="text-copper">Fynz keeps the route full.</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              We&apos;ll walk through your missed calls, your lead fees and how many recurring clients have gone quiet, on your numbers. No pitch deck.
            </p>
          </div>
          <div className="bg-navy-900 text-white rounded-[var(--r-lg)] p-4 sm:p-6 md:p-8">
            <FynzFormEmbed />
          </div>
          <p className="text-sm text-muted text-center mt-8 leading-relaxed">
            Rather see your own numbers first? Pick <b>the free plan</b> above. It counts the calls you&apos;re already missing. It costs nothing and it is not a trial.
          </p>
          <p className="text-sm text-muted text-center mt-6 leading-relaxed">
            <b>P.S.</b> If you only read this far: the free plan counts the calls you&apos;re already missing. See your own numbers first, then decide.
          </p>
        </div>
      </section>
    </>
  );
}
