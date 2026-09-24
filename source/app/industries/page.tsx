"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ScrollReveal, StaggerGroup } from "@/components/animations";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type IndustryCard = {
  slug: string;
  /** Full href override (e.g. a static .html deep link). Defaults to `/industries/${slug}`. */
  href?: string;
  name: React.ReactNode;
  desc: string;
  keywords: string;
  icon: React.ReactNode;
};

type IndustryGroup = {
  title: React.ReactNode;
  count: string;
  cards: IndustryCard[];
};

// SVG icon paths carried over verbatim from the source page.
const svg = (children: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-[18px] h-[18px] stroke-copper"
  >
    {children}
  </svg>
);

const GROUPS: IndustryGroup[] = [
  {
    title: "Beauty & personal care",
    count: "4 VERTICALS",
    cards: [
      {
        slug: "salons",
        name: "Salons",
        desc: "Fill every chair. Keep them coming back.",
        keywords: "salons hair color stylist beauty",
        icon: svg(
          <>
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
          </>
        ),
      },
      {
        slug: "barbershops",
        name: "Barbershops",
        desc: "Never stop mid-cut to answer the phone.",
        keywords: "barbershops barber fade cuts",
        icon: svg(<path d="M4 20 20 4M8 4h12v4L8 20H4v-4L16 4" />),
      },
      {
        slug: "spas",
        name: "Spa & beauty",
        desc: "Fill quiet weekdays and sell more packages.",
        keywords: "spa & beauty massage esthetician facial wellness",
        icon: svg(
          <path d="M12 21c-4 0-8-3-8-8 3 0 5 1 6 2-1-3 0-7 2-10 2 3 3 7 2 10 1-1 3-2 6-2 0 5-4 8-8 8Z" />
        ),
      },
      {
        slug: "nail-studios",
        name: "Nail studios",
        desc: "Keep the calendar full, week after week.",
        keywords: "nail studios manicure pedicure nails",
        icon: svg(
          <>
            <path d="M9 3h6v10a3 3 0 1 1-6 0V3Z" />
            <path d="M12 16v5M9 21h6" />
          </>
        ),
      },
    ],
  },
  {
    title: "Health",
    count: "3 VERTICALS",
    cards: [
      {
        slug: "dental",
        name: "Dental clinics",
        desc: "Fill cancellations and bring patients back on time.",
        keywords: "dental clinics dentist orthodontist hygiene",
        icon: svg(
          <path d="M7 3c2 0 3 1 5 1s3-1 5-1c2.5 0 4 2 4 4.5 0 5-2.5 6-2.5 9.5 0 2-1 4-2.5 4S14 18 12 18s-2.5 3-4 3-2.5-2-2.5-4C5.5 13.5 3 12.5 3 7.5 3 5 4.5 3 7 3Z" />
        ),
      },
      {
        slug: "medical-clinics",
        name: "Medical & health clinics",
        desc: "Answer every patient call, even after hours.",
        keywords:
          "medical & health clinics doctor medspa medical practice clinic",
        icon: svg(
          <>
            <path d="M8 2v4m8-4v4M12 10v7m-3.5-3.5h7" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
          </>
        ),
      },
      {
        slug: "therapists",
        name: "Therapists & physio",
        desc: "Keep clients on their plan.",
        keywords:
          "therapists & physio physiotherapy chiropractor massage therapy counseling physio",
        icon: svg(
          <>
            <path d="M12 3v6m0 0-3-3m3 3 3-3M5 13c0 5 3 8 7 8s7-3 7-8" />
            <path d="M5 13v-3m14 3v-3" />
          </>
        ),
      },
    ],
  },
  {
    title: "Fitness",
    count: "3 VERTICALS",
    cards: [
      {
        slug: "gyms",
        name: "Gyms",
        desc: "Turn trials into members — and keep them.",
        keywords: "gyms fitness crossfit training gym",
        icon: svg(
          <path d="M6.5 6.5 17.5 17.5M21 21l-1.5-1.5M3 3l1.5 1.5M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7" />
        ),
      },
      {
        slug: "personal-trainers",
        name: "Personal trainers",
        desc: "Book more clients without the back-and-forth.",
        keywords: "personal trainers pt coach fitness training trainer",
        icon: svg(
          <>
            <circle cx="9" cy="14" r="6" />
            <path d="M9 14h12V9h-7" />
            <circle cx="9" cy="14" r="1.5" />
          </>
        ),
      },
      {
        slug: "yoga-pilates",
        name: "Yoga & Pilates studios",
        desc: "Fill your classes and grow memberships.",
        keywords: "yoga & pilates studios yoga pilates barre studio classes",
        icon: svg(
          <>
            <circle cx="12" cy="5" r="2.5" />
            <path d="M4 21c2-4 5-6 8-6s6 2 8 6M12 15v-5" />
          </>
        ),
      },
    ],
  },
  {
    title: "Food & hospitality",
    count: "3 VERTICALS",
    cards: [
      {
        slug: "restaurants",
        name: "Restaurants",
        desc: "Your regulars didn't complain. They just stopped coming.",
        keywords: "restaurants dining reservations food restaurant",
        icon: svg(
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        ),
      },
      {
        slug: "cafes",
        name: "Cafés",
        desc: "Turn one-time visitors into regulars.",
        keywords: "cafes coffee shop bakery cafe",
        icon: svg(
          <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM6 2v2m4-2v2m4-2v2" />
        ),
      },
      {
        slug: "bars",
        name: "Bars",
        desc: "Pack the house on slow nights.",
        keywords: "bars pub cocktail nightlife events bar",
        icon: svg(
          <path d="M8 22h8M12 15v7M5 2h14l-1.5 8a5.5 5.5 0 0 1-11 0L5 2Z" />
        ),
      },
    ],
  },
  {
    title: "Retail & commerce",
    count: "2 VERTICALS",
    cards: [
      {
        slug: "boutiques",
        name: "Boutiques & retail shops",
        desc: "Bring shoppers back again and again.",
        keywords: "boutiques & retail shops retail store shop clothing boutique",
        icon: svg(
          <>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
          </>
        ),
      },
      {
        slug: "ecommerce",
        name: "E-commerce stores",
        desc: "Recover lost sales and win repeat orders.",
        keywords: "e-commerce stores online store shopify ecommerce commerce",
        icon: svg(
          <>
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M2 3h3l2.6 13h11.8l2.6-9H6" />
          </>
        ),
      },
    ],
  },
  {
    title: "Home services & trades",
    count: "4 VERTICALS",
    cards: [
      {
        slug: "plumbing",
        name: "Plumbing",
        desc: "Never miss another job.",
        keywords: "plumbing plumber hvac trades emergency",
        icon: svg(
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
        ),
      },
      {
        slug: "cleaning",
        name: "Cleaning services",
        desc: "Every call answered, every client rebooked, every clean reviewed.",
        keywords: "cleaning services maid janitorial house cleaning cleaner",
        icon: svg(
          <path d="M9 7h6v13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7ZM10 7V5h4v2M17 3h.01M20 5h.01M20 2h.01M17 6h.01" />
        ),
      },
      {
        slug: "automotive",
        name: "Automotive",
        desc: "Keep the bays full and customers returning.",
        keywords: "automotive auto repair mechanic detailing shop automotive",
        icon: svg(
          <path d="M5 11 6.5 6h11L19 11M5 11h14a2 2 0 0 1 2 2v4h-2M5 11a2 2 0 0 0-2 2v4h2m0 0a2 2 0 1 0 4 0m-4 0h4m6 0a2 2 0 1 0 4 0m-4 0h4" />
        ),
      },
      {
        slug: "contractors",
        name: "General contractors",
        desc: "Win more bids and get paid faster.",
        keywords:
          "general contractors construction renovation builder trades contractor",
        icon: svg(<path d="m14 4 6 6-2 2-6-6 2-2ZM12 6 4 14l-1 4 4-1 8-8" />),
      },
    ],
  },
  {
    title: "Property",
    count: "1 VERTICAL",
    cards: [
      {
        slug: "real-estate",
        name: "Real estate agents & brokerages",
        desc: "Every lead answered, every past client remembered, every listing posted.",
        keywords:
          "real estate agents & brokerages realtor broker property listings real estate",
        icon: svg(
          <>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            <path d="M9 22V12h6v10" />
          </>
        ),
      },
    ],
  },
  {
    title: "Professional & knowledge",
    count: "5 VERTICALS",
    cards: [
      {
        slug: "coaching",
        name: "Coaching & consulting",
        desc: "Book more discovery calls and sell your programs.",
        keywords: "coaching & consulting coach consultant advisor coaching",
        icon: svg(
          <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.5" />
          </>
        ),
      },
      {
        slug: "tutoring",
        name: "Tutoring & education",
        desc: "Fill your schedule and keep parents in the loop.",
        keywords: "tutoring & education tutor teacher lessons education",
        icon: svg(
          <>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </>
        ),
      },
      {
        slug: "legal",
        name: "Legal",
        desc: "Capture every case that calls.",
        keywords: "legal lawyer attorney law firm legal",
        icon: svg(
          <path d="M12 3v18M8 21h8M3 7h18M6 7l-3 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-3 6a3.5 3.5 0 0 0 7 0l-3-6" />
        ),
      },
      {
        slug: "accounting",
        name: "Accounting & tax",
        desc: "Handle tax season without dropping clients.",
        keywords: "accounting & tax accountant bookkeeper cpa tax accounting",
        icon: svg(
          <>
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
          </>
        ),
      },
      {
        slug: "saas",
        name: "SaaS startups",
        desc: "Turn signups into paying, sticky users.",
        keywords: "saas startups software startup tech b2b saas",
        icon: svg(
          <>
            <path d="M12 15c-2 0-4-2-4-2s1-7 7-9c3.5-1.2 6 1.5 4.8 5-2 6-9 7-9 7l1.2-1Z" />
            <path d="M9 15c-2 0-4 2-4 6 4 0 6-2 6-4M14 9h.01" />
          </>
        ),
      },
    ],
  },
  {
    title: "Emergency restoration",
    count: "6 VERTICALS",
    cards: [
      {
        slug: "emergency-water",
        href: "/industries/emergency-services.html#water",
        name: "Water damage",
        desc: "The 2 AM flood call, answered in two rings.",
        keywords: "emergency restoration water damage flood mitigation 24/7",
        icon: svg(
          <path d="M12 3c-4 5-6.5 8.2-6.5 11.5a6.5 6.5 0 0 0 13 0C18.5 11.2 16 8 12 3Z" />
        ),
      },
      {
        slug: "emergency-mold",
        href: "/industries/emergency-services.html#mold",
        name: "Mold remediation",
        desc: "The callback that never came — caught.",
        keywords: "emergency restoration mold remediation spores assessment 24/7",
        icon: svg(
          <>
            <circle cx="9" cy="10" r="4.5" />
            <circle cx="16.5" cy="7.5" r="2.5" />
            <circle cx="15.5" cy="15.5" r="3.5" />
            <circle cx="8" cy="18.5" r="1.5" />
          </>
        ),
      },
      {
        slug: "emergency-fire",
        href: "/industries/emergency-services.html#fire",
        name: "Fire & smoke",
        desc: "Board-up booked before morning.",
        keywords: "emergency restoration fire smoke soot board-up 24/7",
        icon: svg(
          <>
            <path d="M12 3c-3.5 4.5-5.5 7-5.5 10a5.5 5.5 0 0 0 11 0c0-3-2-5.5-5.5-10Z" />
            <path d="M12 13c-1.4 1.8-2 2.8-2 4a2 2 0 0 0 4 0c0-1.2-.6-2.2-2-4Z" />
          </>
        ),
      },
      {
        slug: "emergency-storm",
        href: "/industries/emergency-services.html#storm",
        name: "Storm & tree",
        desc: "When the whole town calls at once.",
        keywords: "emergency restoration storm tree tarp wind damage 24/7",
        icon: svg(
          <>
            <path d="M7 16a4 4 0 0 1 .6-8A5 5 0 0 1 17 6.5 3.5 3.5 0 0 1 17.5 13H7Z" />
            <path d="m13 11-3 5h3l-2.5 5" />
          </>
        ),
      },
      {
        slug: "emergency-roofing",
        href: "/industries/emergency-services.html#roofing",
        name: "Storm roofing",
        desc: "Fifty roofs, one phone line.",
        keywords: "emergency restoration storm roofing hail roof leak 24/7",
        icon: svg(
          <>
            <path d="m3 11 9-7 9 7" />
            <path d="M6 10v9h12v-9" />
          </>
        ),
      },
      {
        slug: "emergency-biohazard",
        href: "/industries/emergency-services.html#biohazard",
        name: "Biohazard cleanup",
        desc: "Discreet, immediate, handled.",
        keywords: "emergency restoration biohazard trauma cleanup discreet 24/7",
        icon: svg(
          <>
            <path d="m12 3 7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
            <path d="m9 12 2 2 4-4" />
          </>
        ),
      },
    ],
  },
];

const CYCLE_WORDS = [
  "salons",
  "plumbers",
  "dental clinics",
  "cafés",
  "gyms",
  "realtors",
  "barbershops",
  "tutors",
  "auto shops",
  "coaches",
];

const TOTAL_COUNT = GROUPS.reduce((sum, g) => sum + g.cards.length, 0);

export default function IndustriesIndexPage() {
  const [query, setQuery] = useState("");

  // Cycling hero word (respects reduced-motion).
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const interval = setInterval(() => {
      setFading(true);
      fadeTimeout.current = setTimeout(() => {
        setWordIndex((i) => (i + 1) % CYCLE_WORDS.length);
        setFading(false);
      }, 260);
    }, 2400);
    return () => {
      clearInterval(interval);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  const q = query.trim().toLowerCase();

  const { visibleGroups, visibleCount } = useMemo(() => {
    const groups = GROUPS.map((group) => ({
      ...group,
      cards: group.cards.filter(
        (card) => !q || card.keywords.indexOf(q) !== -1
      ),
    })).filter((group) => group.cards.length > 0);
    const count = groups.reduce((sum, group) => sum + group.cards.length, 0);
    return { visibleGroups: groups, visibleCount: count };
  }, [q]);

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-[at_50%_0%] from-copper/10 via-transparent to-transparent pointer-events-none" />
        <div className="wrap max-w-3xl mx-auto px-6 relative z-10">
          <span className="eyebrow justify-center mb-5">Who&apos;s it for</span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[3.4rem] tracking-tight leading-[1.08] mt-4 mb-5">
            Built for how your business{" "}
            <span className="text-copper">actually works</span>
          </h1>
          <p className="lede text-lg mx-auto">
            Pre-configured services, pipelines, and automations for{" "}
            <span
              className={cn(
                "text-copper font-semibold inline-block transition-opacity duration-250",
                fading && "opacity-0"
              )}
            >
              {CYCLE_WORDS[wordIndex]}
            </span>{" "}
            — not a blank canvas you have to figure out.
          </p>

          {/* Search / filter */}
          <div className="relative max-w-[520px] mx-auto mt-9">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="absolute left-[18px] top-1/2 -translate-y-1/2 w-4 h-4 stroke-faint pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Find your business — try "barber", "dental", "plumber"…'
              aria-label="Search industries"
              autoComplete="off"
              className="w-full bg-navy-800 border border-white/10 rounded-full py-[15px] pl-[46px] pr-[22px] text-[0.95rem] text-white outline-none transition-all placeholder:text-slate-400 focus:border-copper/55 focus:shadow-[0_0_0_3px_var(--copper-tint)]"
            />
          </div>
          <p
            className="mt-3.5 font-mono text-[10.5px] tracking-[0.18em] text-faint"
            aria-live="polite"
          >
            <b className="text-copper font-medium">
              {q ? `${visibleCount} / ${TOTAL_COUNT}` : TOTAL_COUNT}
            </b>{" "}
            INDUSTRIES · EACH WITH ITS OWN PLAYBOOK
          </p>
        </div>
      </section>

      {/* Grouped grid */}
      <section className="pt-6 pb-24">
        <div className="wrap max-w-7xl mx-auto px-6">
          {visibleGroups.map((group, gidx) => (
            <div key={gidx} className="mb-14 last:mb-0">
              <div className="flex items-baseline gap-3.5 mb-[18px] border-b border-line-soft pb-3">
                <h2 className="font-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-copper">
                  {group.title}
                </h2>
                <span className="font-mono text-[11px] tracking-[0.1em] text-faint">
                  {group.count}
                </span>
              </div>

              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {group.cards.map((card) => {
                  const href = card.href ?? `/industries/${card.slug}`;
                  const cardClassName =
                    "group relative flex flex-col gap-1.5 bg-navy-800 border border-white/10 rounded-[var(--r-md)] p-[22px_20px] transition-all duration-200 hover:border-copper/40 hover:-translate-y-1 hover:shadow-md";
                  const content = (
                    <>
                      <span className="absolute top-5 right-[18px] font-mono text-copper opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                      <span className="w-[38px] h-[38px] rounded-[11px] bg-copper-tint grid place-items-center mb-[11px]">
                        {card.icon}
                      </span>
                      <b className="font-display font-semibold text-[0.96rem] text-white">
                        {card.name}
                      </b>
                      <p className="text-[0.8rem] text-slate-400 leading-[1.5]">
                        {card.desc}
                      </p>
                    </>
                  );
                  // Static .html deep links need a plain anchor — the Next
                  // router can't client-navigate to files in /public.
                  return card.href ? (
                    <a key={card.slug} href={href} className={cardClassName}>
                      {content}
                    </a>
                  ) : (
                    <Link key={card.slug} href={href} className={cardClassName}>
                      {content}
                    </Link>
                  );
                })}
              </StaggerGroup>
            </div>
          ))}

          {visibleCount === 0 && (
            <div className="text-center py-14 px-5 text-muted">
              <b className="font-display block text-[1.1rem] text-ink mb-2">
                Don&apos;t see your business?
              </b>
              FYNZ still fits — the four pillars work for any customer-facing
              SMB.{" "}
              <Link
                href="/onboarding?plan=free"
                className="text-copper hover:underline underline-offset-[3px]"
              >
                Start free
              </Link>{" "}
              or{" "}
              <Link
                href="/demo"
                className="text-copper hover:underline underline-offset-[3px]"
              >
                book a demo
              </Link>{" "}
              and we&apos;ll set it up together.
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final py-24 relative overflow-hidden text-center bg-radial-[at_bottom_center] from-copper/10 via-transparent to-transparent">
        <div className="wrap max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <span className="font-mono text-[11px] tracking-[0.15em] text-copper uppercase block mb-3">
              Your industry, day one
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
              Set up for <span className="text-copper">your world</span>, not a
              template.
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Pick your industry at signup and FYNZ arrives with your services,
              pipelines, and automations already in place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-copper hover:bg-copper/90 text-white font-semibold"
               render={<Link href="/onboarding?plan=free" />}>
                Start free
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/platform" />}>
                See the platform →
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
