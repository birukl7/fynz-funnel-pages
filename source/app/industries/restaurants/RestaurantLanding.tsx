"use client";

import React, { useState } from "react";
import { StaggerGroup, HoverFloat } from "@/components/animations";
import { DemoForm } from "@/components/shared";
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
  FREE_PLAN_HREF,
  FREE_PLAN_LABEL,
  INTEREST_OPTIONS,
  PLAN_TABLE,
  RESTAURANT_FAQS,
  RESTAURANT_PLANS,
  VISUALS,
} from "./content";

/* ------------------------------------------------------------------ */
/* Funnel config                                                       */
/* ------------------------------------------------------------------ */

const CONFIG: FunnelConfig = {
  theme: "restaurants",
  tag: "For restaurants",
  bookHref: BOOK_CALL_HREF,
  bookLabel: BOOK_CALL_LABEL,
  bookShortLabel: "Book a call",
  freeHref: FREE_PLAN_HREF,
  freeLabel: FREE_PLAN_LABEL,
  menu: [
    { href: "#leak", label: "The leak" },
    { href: "#how", label: "How it works" },
    { href: "#apps", label: "Delivery apps" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ],
  assetDir: "industries/restaurants",
  contentFile: "app/industries/restaurants/content.ts",
  footerNote:
    "Sources are linked where a figure is quoted. Calculator results are illustrative and depend on the numbers you enter. We configure messaging to follow CASL, TCPA and carrier rules, including consent records and opt-outs. We don't give legal advice, so check with your advisor if your situation is unusual.",
};

/* ------------------------------------------------------------------ */
/* Mock message cards                                                  */
/* ------------------------------------------------------------------ */

function WinBackCard() {
  return (
    <div className="bg-navy-900 text-white border border-white/10 rounded-[var(--r-lg)] p-5 shadow-md">
      <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
        <span className="w-8 h-8 rounded bg-copper-tint border border-copper/30 grid place-items-center text-copper text-sm shrink-0">♥</span>
        <div>
          <b className="font-display text-[0.8rem] font-bold text-white block leading-tight">Win-back · Day 60</b>
          <small className="font-mono text-[7px] tracking-[0.12em] text-slate-400 block mt-0.5">SENT AUTOMATICALLY — TUESDAY 4:10 PM</small>
        </div>
        <span className="font-mono text-[7.5px] tracking-[0.14em] text-green border border-green/30 px-2 py-0.5 rounded ml-auto uppercase">Delivered</span>
      </div>
      <div className="bg-white/[0.05] border border-white/10 rounded-md p-3 text-[0.8rem] text-slate-200 leading-relaxed">
        Hi Dawit, it&apos;s been a while and we&apos;ve missed you at the restaurant. Come in this week and dessert is on us. Reply STOP to opt out.
      </div>
      <div className="mt-3.5 bg-green/10 border border-green/30 p-2 rounded text-center">
        <span className="font-mono text-[8px] text-green uppercase tracking-wide">Booked — Table for 3, Thursday 7:00 PM ✓</span>
      </div>
    </div>
  );
}

function TextBackCard() {
  return (
    <div className="bg-navy-900 text-white border border-white/10 rounded-[var(--r-lg)] p-5 shadow-md">
      <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
        <span className="font-display text-[0.8rem] font-bold text-white uppercase tracking-wide">Missed call · Friday 7:42 PM</span>
        <span className="font-mono text-[7.5px] tracking-[0.14em] text-copper uppercase">Text-back</span>
      </div>
      <div className="space-y-2 text-[0.78rem]">
        <div className="text-slate-300"><b>Fynz:</b> &quot;Sorry we missed your call, it&apos;s a full house tonight. Reply with your party size and time and we&apos;ll get you sorted.&quot;</div>
        <div className="text-copper"><b>Guest:</b> &quot;4 people, 8:30?&quot;</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calculators                                                         */
/* ------------------------------------------------------------------ */

function LeakingBucketCalculator() {
  const [newGuests, setNewGuests] = useState(100);
  const [lostShare, setLostShare] = useState(60);
  const [regularSpend, setRegularSpend] = useState(240);

  const lostGuests = newGuests * 12 * (Math.min(Math.max(lostShare, 0), 100) / 100);
  const lostRevenue = lostGuests * regularSpend;

  return (
    <DarkCard className="md:p-8">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">How much walks out the door each year?</b>
      <p className="text-sm text-slate-300 mb-6">Type your own numbers into the three boxes. The total updates as you go.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberField label="First-time guests you seat in a month" value={newGuests} onChange={setNewGuests} />
        <NumberField label="Share of them who never come back" value={lostShare} onChange={setLostShare} suffix="%" max={100} />
        <NumberField label="What one regular spends with you in a year" value={regularSpend} onChange={setRegularSpend} prefix="$" step={10} />
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Guests who never return, per year</span>
          <span className="font-mono text-2xl font-bold text-white">{Math.round(lostGuests).toLocaleString("en-US")}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Revenue that walks out the door, per year</span>
          <span className="font-mono text-3xl md:text-4xl font-extrabold text-copper">{money(lostRevenue)}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mt-6">
        Illustrative, not a promised result. Olo&apos;s analysis of more than 100 million guest records found that the top 20% of guests drive 60% of restaurant revenue (
        <a href="https://www.olo.com/blog/the-high-cost-of-anonymous-restaurant-guests" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Olo</a>
        ).
      </p>
    </DarkCard>
  );
}

function FridayNightCalculator() {
  const [missedCalls, setMissedCalls] = useState(8);
  const [wouldHaveBooked, setWouldHaveBooked] = useState(40);
  const [avgTicket, setAvgTicket] = useState(90);

  const perFriday = missedCalls * (Math.min(Math.max(wouldHaveBooked, 0), 100) / 100) * avgTicket;
  const perYear = perFriday * 52;

  return (
    <DarkCard className="md:p-8">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">What did last Friday night cost?</b>
      <p className="text-sm text-slate-300 mb-6">Every call that rings out during the rush is a table or an order that went somewhere else.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberField label="Calls that rang out on a Friday night" value={missedCalls} onChange={setMissedCalls} />
        <NumberField label="Share that would have booked or ordered" value={wouldHaveBooked} onChange={setWouldHaveBooked} suffix="%" max={100} />
        <NumberField label="Average ticket for a table or an order" value={avgTicket} onChange={setAvgTicket} prefix="$" step={5} />
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Lost on one Friday</span>
          <span className="font-mono text-2xl font-bold text-white">{money(perFriday)}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Lost across a year of Fridays</span>
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
  "Brings lapsed regulars back with a real offer, on its own",
  "Texts back every missed call within seconds",
  "Takes orders direct so the apps stop taking a cut",
  "Asks every guest for a review, with no gating",
];

const TIMELINE = [
  {
    when: "The moment they join",
    title: "A welcome, by text or email",
    desc: "A guest joins from a QR at the table, the Wi-Fi sign-in, an online order or an event ticket. They get a short welcome and a reason to come back.",
  },
  {
    when: "Every year",
    title: "A birthday treat",
    desc: "Nobody on the floor has to remember. The message goes out on its own, with an offer that brings a table of friends along.",
  },
  {
    when: "Day 60 of silence",
    title: "A genuine \"we've missed you\"",
    desc: "When a guest hasn't ordered, booked or checked in for 60 days, they get a real offer, not a newsletter. The ones who were drifting get a reason to come back before they've settled somewhere else.",
  },
];

const DELIVERY_ROWS: { label: string; app: string; direct: string; bold?: boolean }[] = [
  { label: "Order value", app: "$100.00", direct: "$100.00" },
  { label: "App commission (25% tier)", app: "−$25.00", direct: "$0.00" },
  { label: "Card processing", app: "Included", direct: "−$3.20" },
  { label: "Left for your kitchen, staff and profit", app: "$75.00", direct: "$96.80", bold: true },
  { label: "Difference", app: "", direct: "+$21.80 per order", bold: true },
];

const PHOTO_STATS = [
  { value: "12–16", label: "posts a month, across your channels" },
  { value: "7", label: "channels: Instagram, Facebook, Google Business, TikTok, LinkedIn, X and Pinterest" },
  { value: "~10s", label: "your part: one photo before the dish leaves the pass" },
];

const EVENT_CARDS = [
  {
    title: "Any kind of night and pricing",
    desc: "Tasting menus, live music, private dining, a Sunday roast. Free RSVP, paid tickets, deposits or tiers, all on a page under your name.",
  },
  {
    title: "Door check-in by QR",
    desc: "Guests show a code at the door. The host scans it on a phone, and the count is live all night. No printed lists.",
  },
  {
    title: "Every ticket joins your guest list",
    desc: "Everyone who buys a ticket becomes a guest you can welcome back, wish a happy birthday and win back if they go quiet.",
  },
];

const REVIEW_STATS = [
  {
    value: "5–9%",
    label: "change in revenue per extra Yelp star, for independent restaurants",
    source: "Michael Luca, Harvard Business School, 2011",
    sourceHref: "https://www.hbs.edu/faculty/Pages/item.aspx?num=41233",
  },
  {
    value: "$35k",
    label: "What one Yelp star can mean on $500k of annual sales, at the 7% midpoint of Luca's range",
    source: "Arithmetic on the Luca 2011 range (Harvard Business School working paper 12-016)",
  },
];

const COST_ROWS = [
  {
    name: "A pile of separate tools",
    desc: "Guest list, texting, email, online ordering, review requests, a social scheduler and a booking page, each from a different vendor with its own login and its own bill.",
    price: "$1,051–2,310",
  },
  {
    name: "A marketing agency",
    desc: "Social content for one location, usually. Guest follow-up, missed-call recovery and ordering are separate if offered at all. Paid ads cost extra.",
    price: "$750–2,000",
  },
  {
    name: "Fynz Managed",
    desc: "All of it, run for you: content from your photos, campaigns, guest follow-up, missed-call text-back, direct ordering and reviews.",
    price: "$397",
    highlight: true,
  },
];

const GUARANTEES = [
  { title: "30-day money-back guarantee", desc: "On every paid plan. If it isn't working for you, you get the month back." },
  { title: "Month to month, no contract", desc: "Cancel from your dashboard whenever you like. We export your guest list for you." },
  { title: "Live in 48 hours", desc: "On any paid plan our team does the setup. You start with a working system, not an empty one." },
];

const NINETY_DAYS = [
  {
    step: "Days 1–2",
    title: "Set up for you",
    desc: "On any paid plan, our team connects your number, your reservation link and your Stripe or Square account, imports the guest list you already have and turns on missed-call text-back and review requests. You're live in 48 hours.",
  },
  {
    step: "Days 3–30",
    title: "The list starts building",
    desc: "QR codes at the tables, Wi-Fi sign-in, online orders and event tickets add guests every service. Welcomes go out the moment they join. On Managed, your first month of posts is on a calendar you've approved.",
  },
  {
    step: "Days 60–90",
    title: "The first win-backs go out",
    desc: "Guests who joined in month one and went quiet get their first \"we've missed you\" offer. From here on it runs every day without anyone on your team having to notice or remember.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function RestaurantLanding() {
  return (
    <FunnelShell config={CONFIG}>
      <RestaurantBody />
    </FunnelShell>
  );
}

function RestaurantBody() {
  const { interest, setInterest } = useFunnel();
  const submitLabel =
    interest === "free" ? "Set me up on the free plan" : interest === "call" ? "Book my 15-minute call" : "Talk to me about this plan";
  return (
    <>

      {/* 1. Hook */}
      <section className="pt-14 pb-14 md:pt-20 md:pb-20 border-b border-line-soft">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Eyebrow>Restaurant marketing and guest system for independent restaurants</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
            Your regulars didn&apos;t complain. <span className="text-copper">They just stopped coming.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            Most guests who drift away never tell you why. They just start eating somewhere else. Fynz remembers every guest who joins your list. When someone hasn&apos;t ordered, booked or checked in for 60 days, it sends a genuine &quot;we&apos;ve missed you&quot; offer, and it sends a birthday treat every year. Nobody on your team has to notice or remember.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallButton />
            <FreeButton />
          </div>
          <p className="text-sm text-muted mt-6 leading-relaxed">
            In Toast&apos;s data for early 2026, the 7% of guests who came back more than once drove up to half of all orders. (
            <a href="https://pos.toasttab.com/blog/data/regulars-report" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Toast and Resy, Regulars Report 2026</a>
            )
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
            <li className="text-xs text-faint mt-2">It works alongside your POS and reservation system, not instead of them.</li>
          </ul>
          <VisualSlot id="hero" visual={VISUALS.hero} className="w-full max-w-[460px] justify-self-center md:justify-self-end" />
        </div>
      </section>

      {/* 2. The leak */}
      <Step
        id="leak"
        eyebrow="Step 1 · The leak"
        title={<>Your repeat guests already pay for <span className="text-copper">most of your year</span></>}
        intro="Most first-time diners never come back, and nobody on the floor notices. A guest who leaves quietly looks exactly like one who'll be back next month, right up until they aren't."
      >
        <LeakingBucketCalculator />
        <div className="mt-6">
          <HowFynzHandlesIt>
            <p>Every guest who joins your list is remembered. When someone hasn&apos;t ordered, booked or checked in for 60 days, Fynz sends them a real offer on its own. The regulars you would have lost quietly get a reason to come back before they&apos;ve settled somewhere else.</p>
          </HowFynzHandlesIt>
        </div>
      </Step>

      {/* 3. How the follow-up works */}
      <Step
        id="how"
        eyebrow="Step 2 · What runs on its own"
        title={<>A welcome the moment they join. <span className="text-copper">A reason to return before they forget you.</span></>}
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
            <p className="text-sm text-muted leading-relaxed">What the day-60 message looks like from your side: sent on its own, with the reply and the booking logged against the guest.</p>
            <HoverFloat yOffset={-6} duration={3.5}>
              <WinBackCard />
            </HoverFloat>
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed mt-8 max-w-3xl mx-auto text-center">
          Consent is recorded separately for text and email and checked before every send. We set up your messaging to follow CASL in Canada, and in the US we handle A2P 10DLC registration for your texting number and follow TCPA consent rules. Missed-call replies go only to people who just called you.
        </p>
        <CtaStrip title="Want to see it run on your own guest list?" body="Fifteen minutes. Bring nothing but your phone number and last month's delivery-app statement." />
      </Step>

      {/* 4. Missed calls */}
      <Step
        id="phone"
        eyebrow="Step 3 · The phone"
        title={<>The phone rings during the rush. <span className="text-copper">Nobody can get to it.</span></>}
      >
        <FridayNightCalculator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <div className="flex flex-col gap-6">
            <HowFynzHandlesIt>
              <p>Every call that rings out gets a text back within seconds, from your number, asking what they need. Bookings go to your reservation link, orders to your ordering page, and anything else to your phone as a message you can answer when the rush is over.</p>
              <p>You set your restaurant phone to forward unanswered calls to a free Fynz number, which takes about two minutes, and the dashboard counts every call you missed. Your number doesn&apos;t change.</p>
            </HowFynzHandlesIt>
            <HoverFloat yOffset={6} duration={4}>
              <TextBackCard />
            </HoverFloat>
          </div>
          <VisualSlot id="textback" visual={VISUALS.textback} />
        </div>
        <VisualSlot id="dashboard" visual={VISUALS.dashboard} className="mt-6" />
        <CtaStrip title="Find out how many calls you missed last Friday." body="The free plan counts them for you. Or book a call and we'll read them with you." />
      </Step>

      {/* 5. Direct ordering */}
      <Step
        id="apps"
        eyebrow="Step 4 · The apps"
        title={<>Take orders directly, and keep what a <span className="text-copper">delivery app would have taken</span></>}
        intro="Your food cost, labour and rent are the same either way. What changes is who takes a cut."
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.8fr] gap-6 items-start">
        <DarkCard className="md:p-8">
          <b className="font-display font-bold text-lg block mb-5">The same $100 order</b>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left font-mono text-[10px] tracking-widest text-slate-400 uppercase pb-3 font-normal" />
                <th className="text-right font-mono text-[10px] tracking-widest text-slate-400 uppercase pb-3 font-normal">Through a delivery app</th>
                <th className="text-right font-mono text-[10px] tracking-widest text-copper uppercase pb-3 font-normal">Direct through your own page</th>
              </tr>
            </thead>
            <tbody>
              {DELIVERY_ROWS.map((row) => (
                <tr key={row.label} className={cn("border-b border-white/10", row.bold && "font-bold")}>
                  <td className="py-3 pr-4 text-slate-200">{row.label}</td>
                  <td className="py-3 text-right font-mono text-slate-300">{row.app}</td>
                  <td className={cn("py-3 text-right font-mono", row.bold ? "text-copper" : "text-white")}>{row.direct}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-slate-200 leading-relaxed mt-6">
            At 30 delivery orders a week averaging $100, moving half of them to direct is about <b className="text-white">$17,000 a year</b> kept in the restaurant (15 orders × 52 weeks × $21.80).
          </p>
          <p className="text-xs text-slate-400 italic leading-relaxed mt-4">
            If you deliver direct orders yourself or through a delivery service, subtract that per-delivery cost. Pickup orders keep the full difference.
          </p>
          <p className="text-xs text-slate-400 italic leading-relaxed mt-2">
            Commission tiers as published by DoorDash and Uber Eats. The effective cost is often higher once promotions and refunds are counted. Processing shown at 2.9% + 30¢.
          </p>
        </DarkCard>
        <VisualSlot id="ordering" visual={VISUALS.ordering} />
        </div>
        <CtaStrip title="See what the apps cost you last month." body="Bring last month's app statement. We'll do the arithmetic on your numbers, not ours." showFree={false} />
      </Step>

      {/* 6. Content, events, reviews */}
      <Step
        eyebrow="Step 5 · Being seen"
        title={<>Great food <span className="text-copper">doesn&apos;t sell itself</span></>}
        intro="The restaurants people talk about are the ones they keep seeing. A feed that goes quiet for three weeks tells guests the kitchen has too."
        wide
      >
        <VisualSlot id="content" visual={VISUALS.content} className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <HowFynzHandlesIt>
            <p><b className="text-white">On the Managed plan,</b> you send one photo. We edit it, caption it and publish it across Instagram, Facebook, Google Business, TikTok and more: 12 to 16 posts a month on a calendar you approve in advance, with holidays and specials built in.</p>
            <p><b className="text-white">On Growth,</b> you get the same planning calendar and scheduler and publish the posts yourself.</p>
          </HowFynzHandlesIt>
          <DarkCard className="md:p-8">
            <span className="font-mono text-[10px] tracking-widest text-copper uppercase block mb-2">Managed plan</span>
            <b className="font-display font-bold text-xl block mb-6">Your part: take a photo</b>
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

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Events</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">Ticketed nights, <span className="text-copper">without a ticketing company</span></h3>
        </div>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENT_CARDS.map((card) => (
            <DarkCard key={card.title}>
              <b className="font-display font-bold text-lg block mb-2">{card.title}</b>
              <p className="text-sm text-slate-300 leading-relaxed">{card.desc}</p>
            </DarkCard>
          ))}
        </StaggerGroup>
        <VisualSlot id="events" visual={VISUALS.events} className="mt-6" />

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Reviews</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">We ask every guest <span className="text-copper">how it went</span></h3>
          <p className="text-muted text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            After a visit, an order or an event, every guest gets one short request to leave a review, and no filtering by how the meal went first. That keeps you inside Google&apos;s rules against review gating, and it keeps the reviews honest.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEW_STATS.map((stat) => (
            <DarkCard key={stat.value}>
              <span className="font-mono text-3xl md:text-4xl font-extrabold text-copper block mb-2">{stat.value}</span>
              <p className="text-sm text-slate-200 leading-relaxed">{stat.label}</p>
              <p className="text-xs text-slate-400 italic mt-3">
                {stat.sourceHref ? (
                  <a href={stat.sourceHref} target="_blank" rel="noopener noreferrer" className="hover:text-copper hover:underline">{stat.source}</a>
                ) : (
                  stat.source
                )}
              </p>
            </DarkCard>
          ))}
        </div>
        <VisualSlot id="reviews" visual={VISUALS.reviews} className="mt-6" />
      </Step>

      {/* 7. Proof */}
      <Step eyebrow="Step 6 · Proof" title={<>Already running for <span className="text-copper">restaurants like yours</span></>} wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <VisualSlot id="proof" visual={VISUALS.proof} />
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-xl block mb-2">Abyssinia Restaurant, Calgary</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              An Ethiopian and Eritrean restaurant on 12 Avenue SW. Fynz runs the account, and it posts every week without the owner writing a single caption.
            </p>
            <p className="text-xs text-slate-400 italic mt-4">Shared with the owner&apos;s permission.</p>
          </DarkCard>
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
          Bought one tool at a time, the same jobs cost between <b>$1,051 and $2,310</b> a month at published entry prices. Commission-free ordering alone runs $249 to $499: Owner.com lists $249/month plus a 5% per-order fee, or $499/month flat. Agency range: typical 2026 social media management for a single-location independent restaurant, before ad spend.
        </p>

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Plans</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">What each <span className="text-copper">plan includes</span></h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin mb-10 bg-navy-900 text-white rounded-[var(--r-lg)] border border-white/10 p-4 md:p-6">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr_1fr] border-b border-white/10 pb-3">
              <span />
              {RESTAURANT_PLANS.map((plan) => (
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

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {RESTAURANT_PLANS.map((plan) => (
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
                render={<a href={plan.href} onClick={() => setInterest(plan.key)} />}
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
        title={<>It works alongside <span className="text-copper">what you already use</span></>}
        intro="Table bookings go to your current reservation system. Orders and event tickets are paid through your own Stripe or Square account. Fynz doesn't add a second booking system or a second processor, and never stores card data."
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-3">At booking and payment, your tools lead.</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Table bookings go straight to the reservation system you already use. When a guest orders online or buys an event ticket, the money goes through your own Stripe or Square account and lands with you. We never see or store card numbers.
            </p>
          </DarkCard>
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-3">Everywhere else, Fynz leads.</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              The guest list, the welcome, birthday and win-back messages, the missed-call text-back, the review requests and the content all run from Fynz. Your POS keeps doing what it does. Fynz does the part nobody on the floor has time for.
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
          {RESTAURANT_FAQS.map((faq, idx) => (
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
              Bring the quiet ones <span className="text-copper">back</span>.
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              We&apos;ll walk through your missed calls, your delivery-app statement and how many regulars have gone quiet, on your numbers. No pitch deck.
            </p>
          </div>
          <div className="bg-navy-900 text-white rounded-[var(--r-lg)] p-6 md:p-10">
            <DemoForm
              submitLabel={submitLabel}
              successHeadline={<>We&apos;ll be in touch within <span className="text-copper">one business day</span>.</>}
              successBody={(email) => (
                <>
                  A human from our team will email {email || "you"} to{" "}
                  {interest === "free" ? "switch on your free plan" : interest === "call" ? "set up your 15-minute call" : "get you started on the plan you picked"}.
                </>
              )}
              phonePlaceholder="Restaurant phone line (for the missed-call count)"
              interestOptions={INTEREST_OPTIONS}
              interest={interest}
              onInterestChange={setInterest}
              extra={{ source: "restaurants-funnel" }}
              legalInNewTab
            />
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
