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
  REAL_ESTATE_FAQS,
  REAL_ESTATE_PLANS,
  VISUALS,
} from "./content";

/* ------------------------------------------------------------------ */
/* Funnel config                                                       */
/* ------------------------------------------------------------------ */

const CONFIG: FunnelConfig = {
  theme: "real-estate",
  tag: "Follow-up for agents in Canada",
  bookHref: BOOK_CALL_HREF,
  bookLabel: BOOK_CALL_LABEL,
  bookShortLabel: "Book a call",
  freeHref: FREE_PLAN_HREF,
  freeLabel: FREE_PLAN_LABEL,
  menu: [
    { href: "#phone", label: "Leads" },
    { href: "#leak", label: "Past clients" },
    { href: "#seen", label: "Listings" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ],
  assetDir: "industries/real-estate",
  contentFile: "app/industries/real-estate/content.ts",
  footerNote:
    "Sources are linked where a figure is quoted. Calculator results are illustrative and depend on the numbers you enter. We configure messaging to follow CASL, including consent records and unsubscribe handling, and every message carries your name and brokerage. We don't give legal advice, so check your provincial regulator's advertising rules and your brokerage policy for anything unusual.",
};

/* ------------------------------------------------------------------ */
/* Mock message cards                                                  */
/* ------------------------------------------------------------------ */

function AnniversaryCard() {
  return (
    <div className="bg-navy-900 text-white border border-white/10 rounded-[var(--r-lg)] p-5 shadow-md">
      <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
        <span className="w-8 h-8 rounded bg-copper-tint border border-copper/30 grid place-items-center text-copper text-sm shrink-0">⌂</span>
        <div>
          <b className="font-display text-[0.8rem] font-bold text-white block leading-tight">Closing anniversary · Year 2</b>
          <small className="font-mono text-[7px] tracking-[0.12em] text-slate-400 block mt-0.5">SENT AUTOMATICALLY — MAY 14, 9:30 AM</small>
        </div>
        <span className="font-mono text-[7.5px] tracking-[0.14em] text-green border border-green/30 px-2 py-0.5 rounded ml-auto uppercase">Delivered</span>
      </div>
      <div className="bg-white/[0.05] border border-white/10 rounded-md p-3 text-[0.8rem] text-slate-200 leading-relaxed">
        Hi Priya, two years in the house on Maple Grove this week. If you&apos;re curious what it&apos;s worth now, reply YES and I&apos;ll send a quick update. Amara, Northgate Realty. Reply STOP to unsubscribe.
      </div>
      <div className="mt-3.5 bg-green/10 border border-green/30 p-2 rounded text-center">
        <span className="font-mono text-[8px] text-green uppercase tracking-wide">Reply: &quot;YES, and my brother is looking too&quot; ✓</span>
      </div>
    </div>
  );
}

function TextBackCard() {
  return (
    <div className="bg-navy-900 text-white border border-white/10 rounded-[var(--r-lg)] p-5 shadow-md">
      <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
        <span className="font-display text-[0.8rem] font-bold text-white uppercase tracking-wide">Missed call · Saturday 2:15 PM</span>
        <span className="font-mono text-[7.5px] tracking-[0.14em] text-copper uppercase">Text-back</span>
      </div>
      <div className="space-y-2 text-[0.78rem]">
        <div className="text-slate-300"><b>Fynz:</b> &quot;Sorry I missed you, I&apos;m in a showing until 3. Is this about a listing, or are you thinking of selling?&quot;</div>
        <div className="text-copper"><b>Lead:</b> &quot;The condo on 8th Ave. Can we see it this weekend?&quot;</div>
        <div className="text-slate-300"><b>Fynz:</b> &quot;Sunday 11:00 or 1:30 are open. Pick one here and it&apos;s booked.&quot;</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calculators                                                         */
/* ------------------------------------------------------------------ */

function SphereCalculator() {
  const [contacts, setContacts] = useState(200);
  const [movingShare, setMovingShare] = useState(10);
  const [commission, setCommission] = useState(12000);

  const deals = contacts * (Math.min(Math.max(movingShare, 0), 100) / 100);
  const atStake = deals * commission;

  return (
    <DarkCard className="md:p-8">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">How much is sitting in your database this year?</b>
      <p className="text-sm text-slate-300 mb-6">Type your own numbers into the three boxes. The total updates as you go.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberField label="Past clients and contacts in your database" value={contacts} onChange={setContacts} />
        <NumberField label="Share who will move, or refer someone who will, in the next 12 months" value={movingShare} onChange={setMovingShare} suffix="%" max={100} />
        <NumberField label="Your average commission per deal" value={commission} onChange={setCommission} prefix="$" step={500} />
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4 items-end">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Deals in your database this year</span>
          <span className="font-mono text-2xl font-bold text-white">{Math.round(deals).toLocaleString("en-US")}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase block mb-1">Commission at stake</span>
          <span className="font-mono text-3xl md:text-4xl font-extrabold text-copper">{money(atStake)}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mt-6">
        Illustrative, not a promised result. Whoever those clients hear from first when they decide to move is the agent they call. That is the whole argument.
      </p>
    </DarkCard>
  );
}

function LeadResponseCalculator() {
  const [missed, setMissed] = useState(6);
  const [wonShare, setWonShare] = useState(5);
  const [commission, setCommission] = useState(12000);

  const perWeek = missed * (Math.min(Math.max(wonShare, 0), 100) / 100) * commission;
  const perYear = perWeek * 52;

  return (
    <DarkCard className="md:p-8">
      <b className="font-display font-bold text-lg md:text-xl block mb-1">What did last Saturday&apos;s missed calls cost?</b>
      <p className="text-sm text-slate-300 mb-6">Every call or portal inquiry that waits an hour is a buyer or seller who called the next agent on the list.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberField label="Calls and portal inquiries you didn't answer within an hour, per week" value={missed} onChange={setMissed} />
        <NumberField label="Share that would have become a client with a fast reply" value={wonShare} onChange={setWonShare} suffix="%" max={100} />
        <NumberField label="Your average commission per deal" value={commission} onChange={setCommission} prefix="$" step={500} />
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
  "Leads: missed calls texted back and portal inquiries answered in seconds",
  "Past clients: anniversary, birthday and check-in messages, sent on the day",
  "Listings: photo-to-post, open-house sign-in and review requests",
  "Money: the deals your own database sends you, with no referral fee",
];

const TIMELINE = [
  {
    when: "The week they close",
    title: "A thank-you, and one review request",
    desc: "A short message in your name the week the keys change hands, with a single link to leave a Google review while the relief is still fresh.",
  },
  {
    when: "Every year on closing day",
    title: "A closing-anniversary note",
    desc: "\"Two years in the house this week.\" With an offer of a current home-value update, which is the most natural reason a past client ever has to reply to an agent.",
  },
  {
    when: "Day 90 of silence",
    title: "A genuine check-in",
    desc: "When a contact hasn't heard from you or replied in 90 days, they get a real check-in, not a newsletter. That is the message that turns \"my sister is selling\" into a call to you instead of the agent whose sign she saw.",
  },
];

const FEE_ROWS: { label: string; network: string; sphere: string; bold?: boolean }[] = [
  { label: "Your commission on the deal", network: "$12,000", sphere: "$12,000" },
  { label: "Referral fee to the network (25%)", network: "−$3,000", sphere: "$0" },
  { label: "Left before your brokerage split", network: "$9,000", sphere: "$12,000", bold: true },
  { label: "Difference", network: "", sphere: "+$3,000 per deal", bold: true },
];

const PHOTO_STATS = [
  { value: "12–16", label: "posts a month, across your channels" },
  { value: "7", label: "channels: Instagram, Facebook, Google Business, TikTok, LinkedIn, X and Pinterest" },
  { value: "~10s", label: "your part: forward the listing photos you already have" },
];

const OPEN_HOUSE_CARDS = [
  {
    title: "QR sign-in at the door",
    desc: "Visitors scan a small stand at the entrance and join your list in ten seconds. No clipboard, no illegible handwriting, and consent captured properly.",
  },
  {
    title: "A follow-up the same evening",
    desc: "Every visitor gets a thank-you that night with the listing link and one question: are you looking, or selling too? The replies land in your inbox.",
  },
  {
    title: "Every visitor stays warm",
    desc: "Whoever doesn't buy this one gets your new listings and a check-in until they're ready. Most open-house visitors are months out. Now they're yours for those months.",
  },
];

const REVIEW_CARDS = [
  {
    title: "One request, the week you close",
    desc: "Sent once, in your name, with the Google link. Clients who just got their keys are the most willing reviewers you will ever have.",
  },
  {
    title: "No gating, ever",
    desc: "Every closed client is asked, not only the happy ones. That keeps you inside Google's rules against review gating, and your reviews read as real because they are.",
  },
];

const COST_ROWS = [
  {
    name: "A pile of separate tools",
    desc: "A CRM, a texting tool, an email tool, a social scheduler, an e-signature tool and a review tool, each from a different vendor with its own login and its own bill.",
    price: "$350–1,000",
  },
  {
    name: "A part-time assistant or ISA",
    desc: "Follow-up and lead response for the hours they work. Missed calls after hours, listing content and review requests are separate if offered at all.",
    price: "$1,500–3,000",
  },
  {
    name: "Fynz Managed",
    desc: "All of it, run for you: listing content from your photos, campaigns, client follow-up, missed-call text-back, portal replies and reviews.",
    price: "$397",
    highlight: true,
  },
];

const GUARANTEES = [
  { title: "30-day money-back guarantee", desc: "On every paid plan. If it isn't working for you, you get the month back." },
  { title: "Month to month, no contract", desc: "Cancel from your dashboard whenever you like. We export your client database for you." },
  { title: "Live in 48 hours", desc: "On any paid plan our team does the setup. You start with a working system, not an empty one." },
];

const NINETY_DAYS = [
  {
    step: "Days 1–2",
    title: "Set up for you",
    desc: "On any paid plan, our team imports your past clients and contacts with their closing dates, connects your number and your calendar, and turns on missed-call text-back, portal replies and review requests. You're live in 48 hours.",
  },
  {
    step: "Days 3–30",
    title: "The database starts working",
    desc: "Open-house QR sign-ins, website forms and portal inquiries add contacts every week. Anniversaries and birthdays are scheduled from the dates you imported. On Managed, your first month of listing posts is on a calendar you've approved.",
  },
  {
    step: "Days 60–90",
    title: "The first check-ins go out",
    desc: "Contacts who went quiet after month one get their first genuine check-in. From here on it runs every day without you having to remember anyone's closing date.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function RealEstateLanding() {
  return (
    <FunnelShell config={CONFIG}>
      <RealEstateBody />
    </FunnelShell>
  );
}

function RealEstateBody() {
  const { interest, setInterest } = useFunnel();
  const submitLabel =
    interest === "free" ? "Set me up on the free plan" : interest === "call" ? "Book my 15-minute call" : "Talk to me about this plan";
  return (
    <>
      {/* 1. Hook */}
      <section className="pt-14 pb-14 md:pt-20 md:pb-20 border-b border-line-soft">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Eyebrow>The follow-up system for real estate agents in Canada</Eyebrow>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
            Every lead answered. Every past client remembered. Every listing posted. <span className="text-copper">While you&apos;re in a showing.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            An agent&apos;s day is showings, offers and driving. The follow-up happens at 11 PM or not at all. Fynz does it as it happens: texts back the call you missed, replies to the portal inquiry in seconds, sends the closing-anniversary note on the day, books the showing from your calendar, and posts the listing you just took. You keep the deal. It keeps the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallButton />
            <FreeButton />
          </div>
          <p className="text-sm text-muted mt-6 leading-relaxed">
            Built for independent agents in Canada. Works with your brokerage&apos;s tools and your board&apos;s forms, not instead of them.
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

      {/* 2. Leads: missed calls and slow replies */}
      <Step
        id="phone"
        eyebrow="Step 1 · The leads"
        title={<>The lead calls while you&apos;re in a showing. <span className="text-copper">By 3 PM they&apos;ve called someone else.</span></>}
        intro={
          <>
            Firms that contacted a web lead within an hour were nearly seven times as likely to qualify it as those that waited even an hour longer. (
            <a href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Harvard Business Review, 2011</a>
            )
          </>
        }
      >
        <LeadResponseCalculator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <div className="flex flex-col gap-6">
            <HowFynzHandlesIt>
              <p>Every call that rings out gets a text back within seconds, from your number, asking whether it&apos;s about a listing or about selling. Showing requests get a booking link with real times from your calendar. Everything else lands in your inbox as a message you answer when the showing is over.</p>
              <p>Portal and website inquiries get the same treatment: a reply within seconds by text or email, two qualifying questions, and a time to talk. Nobody waits an hour.</p>
              <p>You set your phone to forward unanswered calls to a free Fynz number, which takes about two minutes, and the dashboard counts every call you missed. Your number doesn&apos;t change.</p>
            </HowFynzHandlesIt>
            <HoverFloat yOffset={6} duration={4}>
              <TextBackCard />
            </HoverFloat>
          </div>
          <VisualSlot id="textback" visual={VISUALS.textback} />
        </div>
        <VisualSlot id="dashboard" visual={VISUALS.dashboard} className="mt-6" />
        <CtaStrip title="Find out how many calls you missed last Saturday." body="The free plan counts them for you. Or book a call and we'll read them with you." />
      </Step>

      {/* 3. Past clients: the leak */}
      <Step
        id="leak"
        eyebrow="Step 2 · Past clients"
        title={<>Your past clients and their referrals are <span className="text-copper">most of your next year</span></>}
        intro="Every agent says the business is referrals. Then a past client's sister decides to sell, and she calls the agent whose postcard arrived last month, because that's the name she could find."
      >
        <SphereCalculator />
        <div className="mt-6">
          <HowFynzHandlesIt>
            <p>Every client in your database is remembered with their closing date. Each year they get a closing-anniversary note with the offer of a current home-value update, and a birthday message. When someone hasn&apos;t heard from you or replied in 90 days, Fynz sends a genuine check-in on its own. The clients you would have lost quietly get your name in front of them before they need it.</p>
          </HowFynzHandlesIt>
        </div>
      </Step>

      {/* 4. How the follow-up works */}
      <Step
        id="how"
        eyebrow="Step 3 · What runs on its own"
        title={<>A thank-you the week they close. <span className="text-copper">Your name in front of them every year after.</span></>}
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
            <p className="text-sm text-muted leading-relaxed">What the anniversary message looks like from your side: sent on its own, with the reply logged against the client and a referral you didn&apos;t have to ask for.</p>
            <HoverFloat yOffset={-6} duration={3.5}>
              <AnniversaryCard />
            </HoverFloat>
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed mt-8 max-w-3xl mx-auto text-center">
          Consent is recorded separately for text and email and checked before every send, as CASL requires. Every message carries your name and brokerage the way your provincial regulator expects. Missed-call replies go only to people who just called you.
        </p>
        <CtaStrip title="Want to see it run on your own database?" body="Fifteen minutes. Bring nothing but your phone number and a rough count of your past clients." />
      </Step>

      {/* 5. Referral fees */}
      <Step
        id="fees"
        eyebrow="Step 4 · Referral fees"
        title={<>Keep the deals your own clients send you, and the fee <span className="text-copper">a referral network would have taken</span></>}
        intro="A deal from your own database and a deal from a lead-referral network are the same work. What changes is who takes a cut before your brokerage split."
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.8fr] gap-6 items-start">
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-5">The same $12,000 commission</b>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left font-mono text-[10px] tracking-widest text-slate-400 uppercase pb-3 font-normal" />
                  <th className="text-right font-mono text-[10px] tracking-widest text-slate-400 uppercase pb-3 font-normal">Through a referral network</th>
                  <th className="text-right font-mono text-[10px] tracking-widest text-copper uppercase pb-3 font-normal">From your own past clients</th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row) => (
                  <tr key={row.label} className={cn("border-b border-white/10", row.bold && "font-bold")}>
                    <td className="py-3 pr-4 text-slate-200">{row.label}</td>
                    <td className="py-3 text-right font-mono text-slate-300">{row.network}</td>
                    <td className={cn("py-3 text-right font-mono", row.bold ? "text-copper" : "text-white")}>{row.sphere}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-slate-200 leading-relaxed mt-6">
              At eight referred deals a year, moving them to your own database is about <b className="text-white">$24,000 a year</b> kept before your split (8 deals × $3,000).
            </p>
            <p className="text-xs text-slate-400 italic leading-relaxed mt-4">
              Referral fees vary by network and by province. 25% is the common rate; some networks charge more. Your brokerage split applies to both columns.
            </p>
          </DarkCard>
          <VisualSlot id="referral" visual={VISUALS.referral} />
        </div>
        <CtaStrip title="See what referral fees cost you last year." body="Bring your deal count. We'll do the arithmetic on your numbers, not ours." showFree={false} />
      </Step>

      {/* 6. Content, open houses, reviews */}
      <Step
        id="seen"
        eyebrow="Step 5 · Being seen"
        title={<>Every listing is a marketing campaign, <span className="text-copper">if someone runs it</span></>}
        intro="Sellers interview the agent whose listings they keep seeing. A feed that goes quiet between listings tells them you're between listings."
        wide
      >
        <VisualSlot id="content" visual={VISUALS.content} className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <HowFynzHandlesIt>
            <p><b className="text-white">On the Managed plan,</b> you forward the listing photos. We turn them into Just Listed, Open House and Just Sold posts and publish them across Instagram, Facebook, Google Business, LinkedIn and more: 12 to 16 posts a month on a calendar you approve in advance, with your brokerage name on every one.</p>
            <p><b className="text-white">On Growth,</b> you get the same planning calendar and scheduler and publish the posts yourself.</p>
          </HowFynzHandlesIt>
          <DarkCard className="md:p-8">
            <span className="font-mono text-[10px] tracking-widest text-copper uppercase block mb-2">Managed plan</span>
            <b className="font-display font-bold text-xl block mb-6">Your part: forward the photos</b>
            <div className="grid grid-cols-3 gap-4">
              {PHOTO_STATS.map((stat) => (
                <div key={stat.value}>
                  <span className="font-mono text-2xl md:text-3xl font-extrabold text-copper block mb-1">{stat.value}</span>
                  <span className="text-xs text-slate-300 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mt-6 pt-6 border-t border-white/10">
              Photo-to-post is done for you on Managed. Growth includes the content calendar and scheduler so you can post. Starter doesn&apos;t include social content.
            </p>
          </DarkCard>
        </div>

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Open houses</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">Every visitor becomes a contact, <span className="text-copper">not a name on a clipboard</span></h3>
        </div>
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OPEN_HOUSE_CARDS.map((card) => (
            <DarkCard key={card.title}>
              <b className="font-display font-bold text-lg block mb-2">{card.title}</b>
              <p className="text-sm text-slate-300 leading-relaxed">{card.desc}</p>
            </DarkCard>
          ))}
        </StaggerGroup>
        <VisualSlot id="openhouse" visual={VISUALS.openhouse} className="mt-6" />

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Reviews</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">We ask every closed client <span className="text-copper">how it went</span></h3>
          <p className="text-muted text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            Sellers read your Google reviews before they call you. Most agents have a handful, because asking feels awkward and the moment passes. Fynz asks for you, once, at the right moment.
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
      </Step>

      {/* 7. Proof */}
      <Step eyebrow="Step 6 · Proof" title={<>Already running for <span className="text-copper">agents like you</span></>} wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <VisualSlot id="proof" visual={VISUALS.proof} />
          <div className="rounded-[var(--r-lg)] border-2 border-dashed border-copper/50 bg-copper-tint/40 p-6 md:p-8">
            <span className="font-mono text-[10px] tracking-widest text-copper uppercase block mb-2">Case study to add</span>
            <b className="font-display font-bold text-xl block mb-3">One agent, one brokerage, one city</b>
            <p className="text-sm text-muted leading-relaxed">
              Name the agent, their brokerage and their market. State when Fynz started running their follow-up and content, and give only numbers from that period: reviews gained, past-client deals or referrals that came from an anniversary or check-in message, listings posted without the agent writing a caption. Add a one- or two-sentence quote from the agent and get written permission before publishing. If there are no numbers yet, say what runs and leave the numbers out.
            </p>
          </div>
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
          Tool-stack and assistant ranges are typical 2026 published entry prices and part-time rates for one agent, before ad spend and before any per-lead fees.
        </p>

        <div className="mt-14 text-center mb-8">
          <Eyebrow>Plans</Eyebrow>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">What each <span className="text-copper">plan includes</span></h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin mb-10 bg-navy-900 text-white rounded-[var(--r-lg)] border border-white/10 p-4 md:p-6">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr_1fr] border-b border-white/10 pb-3">
              <span />
              {REAL_ESTATE_PLANS.map((plan) => (
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
          {REAL_ESTATE_PLANS.map((plan) => (
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
          Prices in USD, as on every Fynz plan, with taxes at checkout. Text messages and calls are billed at cost to your own account, separately from the plan.
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
        title={<>It works alongside <span className="text-copper">your brokerage&apos;s tools and your board&apos;s forms</span></>}
        intro="Offers, agreements and signatures stay in the systems your brokerage and your board require. Fynz never touches a transaction. It runs the follow-up, the replies and the marketing around it."
        wide
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-3">At the deal, your tools lead.</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Listings go on your board&apos;s MLS system and REALTOR.ca as they do now. Offers and agreements use your board&apos;s forms and your brokerage&apos;s signature tool. Fynz&apos;s documents are for your own paperwork, such as buyer guides and feedback forms, not a replacement for either.
            </p>
          </DarkCard>
          <DarkCard className="md:p-8">
            <b className="font-display font-bold text-lg block mb-3">Everywhere else, Fynz leads.</b>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              The client database, the anniversary, birthday and check-in messages, the missed-call text-back, the portal replies, the open-house sign-ins, the review requests and the listing content all run from Fynz. It does the part nobody has time for between showings.
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
      <Step id="faq" eyebrow="Agent FAQ" title={<>Fair <span className="text-copper">questions</span></>}>
        <Accordion className="w-full bg-navy-800 border-white/10">
          {REAL_ESTATE_FAQS.map((faq, idx) => (
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
              You keep the deal. <span className="text-copper">Fynz keeps the rest.</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              We&apos;ll walk through your missed calls, your referral fees and how many past clients haven&apos;t heard from you, on your numbers. No pitch deck.
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
              phonePlaceholder="Your cell number (for the missed-call count)"
              interestOptions={INTEREST_OPTIONS}
              interest={interest}
              onInterestChange={setInterest}
              extra={{ source: "real-estate-funnel" }}
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
