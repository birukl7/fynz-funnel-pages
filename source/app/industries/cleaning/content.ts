import type { Visual } from "@/components/funnel";

// Copy and structured data for /industries/cleaning, the funnel page for
// independent residential and commercial cleaning companies. Every call to
// action stays on the page and lands on the #book form, which carries the
// visitor's plan interest to the team. Kept outside the client component so
// the route's server file can feed the same FAQ and plan data into JSON-LD.

export const BOOK_CALL_HREF = "#book";
export const BOOK_CALL_LABEL = "Book a 15-minute call";
export const FREE_PLAN_HREF = "#book";
export const FREE_PLAN_LABEL = "Start on the free plan";

export type Plan = {
  key: "free" | "starter" | "growth" | "managed";
  name: string;
  price: number;
  desc: string;
  cta: string;
  href: string;
  popular?: boolean;
};

export const CLEANING_PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    price: 0,
    desc: "Counts the calls you're already missing and the recurring clients who have gone quiet. No card, no expiry, not a trial.",
    cta: FREE_PLAN_LABEL,
    href: FREE_PLAN_HREF,
  },
  {
    key: "starter",
    name: "Starter",
    price: 97,
    desc: "The operational core: client list, quote and booking links, appointment reminders, missed-call text-back and review requests. Social content isn't included.",
    cta: "Start on Starter",
    href: "#book",
  },
  {
    key: "growth",
    name: "Growth",
    price: 197,
    desc: "Everything in Starter, plus email campaigns, seasonal offer pages, a social content calendar you post from, and documents and e-signatures for quotes and service agreements.",
    cta: "Start on Growth",
    href: "#book",
    popular: true,
  },
  {
    key: "managed",
    name: "Managed",
    price: 397,
    desc: "Everything in Growth, plus our team creates and posts your before-and-after content from your photos and runs your campaigns and client follow-up.",
    cta: BOOK_CALL_LABEL,
    href: BOOK_CALL_HREF,
  },
];

export type PlanCell = boolean | string;

export type PlanRow = {
  name: string;
  cells: [PlanCell, PlanCell, PlanCell, PlanCell];
  emphasis?: boolean;
};

const SETUP = "Done for you, live in 48h";

export const PLAN_TABLE: PlanRow[] = [
  { name: "Missed-call and quiet-client counter", cells: [true, true, true, true] },
  { name: "Missed-call text-back", cells: [false, true, true, true] },
  { name: "Instant reply to website and Google quote requests", cells: [false, true, true, true] },
  { name: "Quote and booking links from your calendar", cells: [false, true, true, true] },
  { name: "Reminder the day before and \"on our way\" text", cells: [false, true, true, true] },
  { name: "Client list with rebooking nudges and holiday offers", cells: [false, true, true, true] },
  { name: "Review requests after every clean", cells: [false, true, true, true] },
  { name: "Email campaigns and seasonal offer pages", cells: [false, false, true, true] },
  { name: "Social content calendar and scheduler", cells: [false, false, true, true] },
  { name: "Quotes and service agreements with e-signature", cells: [false, false, true, true] },
  { name: "We create and post your before-and-after content", cells: [false, false, false, true], emphasis: true },
  { name: "We run your campaigns and client follow-up", cells: [false, false, false, true], emphasis: true },
  { name: "Setup", cells: ["Self-serve", SETUP, SETUP, SETUP] },
];

export const CLEANING_FAQS: { q: string; a: string }[] = [
  {
    q: "Will it actually bring me more clients?",
    a: "We won't promise a number. Every missed call and quote request gets an answer within seconds, every client gets a reminder the day before and a review request after, and every recurring client who goes quiet gets a nudge to rebook. The free plan shows your real missed calls before you spend anything.",
  },
  {
    q: "Is it easy to use?",
    a: "Most of it runs on its own. Your part is answering the replies that come back, and on the Managed plan, sending us the before-and-after photos your team already takes.",
  },
  {
    q: "What does it cost?",
    a: "Paid plans start at $97 USD a month, and there is a free plan. Text messages and calls are billed at cost to your own account.",
  },
  {
    q: "What if it doesn't work for us?",
    a: "You leave. Plans are month to month with no contract and a 30-day money-back guarantee on paid plans. We export your client list for you.",
  },
  {
    q: "Do I have to change my scheduling or invoicing app?",
    a: "No. If you run your route and invoices in Jobber, Housecall Pro or a spreadsheet, keep doing that. Fynz handles the phone, the follow-up, the reviews and the content around it. If you don't have a scheduling app yet, Fynz's booking and invoicing can be it.",
  },
  {
    q: "Will my cleaners have to learn something new?",
    a: "Very little. One app on one phone for photos and messages. The reminders, the \"on our way\" text and the review request go out on their own from the schedule.",
  },
  {
    q: "Is texting clients legal?",
    a: "Yes, when it's done with consent. We set up consent capture, opt-out handling (\"reply STOP\") and US carrier registration for you, and follow CASL in Canada. You stay in control of what gets sent.",
  },
];

export const INTEREST_OPTIONS: { value: string; label: string }[] = [
  { value: "call", label: "A 15-minute call, on my numbers" },
  { value: "free", label: "The free plan (count my missed calls)" },
  { value: "starter", label: "Starter · $97/mo" },
  { value: "growth", label: "Growth · $197/mo" },
  { value: "managed", label: "Managed · $397/mo" },
];

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

export const VISUALS = {
  hero: {
    src: "/industries/cleaning/hero.png",
    kind: "Photo",
    title: "A cleaner mid-job, phone lit up on the counter",
    brief:
      "A real cleaner from a real company, gloves on, wiping down a kitchen or bathroom, fully absorbed in the work. In the foreground, a phone on the counter with the screen lit, as if a call is coming in. Branded shirt or apron is good; no other companies' branding. Daylight, a lived-in home, not a showroom. Portrait crop, the cleaner in focus, the phone sharp enough to read as a phone. Get written permission from everyone pictured.",
    alt: "A cleaner working in a kitchen while their phone lights up on the counter",
    aspect: "portrait",
  },
  messages: {
    src: "/industries/cleaning/messages.png",
    kind: "Screenshot",
    title: "The three automatic messages, as the client sees them",
    brief:
      "Phone screenshot of a real Fynz text thread from the client's side: the reminder the day before with the arrival window, the \"on our way\" text that morning with the cleaner's first name, and the review request that evening with the Google link. The sender shows the company name. Hide the client's number. At least one message must show \"Reply STOP to opt out\".",
    alt: "A phone showing a cleaning company's reminder, on-our-way and review request texts",
    aspect: "phone",
  },
  textback: {
    src: "/industries/cleaning/textback.png",
    kind: "Screenshot",
    title: "A missed call during a job becoming a booked quote",
    brief:
      "Phone screenshot from the caller's side: the missed call at the top, the text-back arriving seconds later from the company's own number, the caller's reply describing the home, and a booking link that lands on a quote time from the real calendar. Weekday-morning timestamps. Hide the caller's number.",
    alt: "A phone showing a missed call followed by a text conversation that ends in a booked quote",
    aspect: "phone",
  },
  dashboard: {
    src: "/industries/cleaning/dashboard.png",
    kind: "Screenshot",
    title: "The free plan's missed-call counter",
    brief:
      "Desktop screenshot of the Fynz dashboard for a cleaning company on the free plan: calls missed this week by day, with weekday mornings visibly highest, and the count of recurring clients who haven't booked in six weeks beside it. Use a demo account with a made-up company name, never a customer's real data. Light theme, cropped to the two counters.",
    alt: "The Fynz dashboard counting missed calls by day and recurring clients gone quiet",
    aspect: "wide",
  },
  referral: {
    src: "/industries/cleaning/referral.png",
    kind: "Screenshot",
    title: "A referral arriving from a happy client",
    brief:
      "Phone or inbox screenshot of a real message from a client, something like \"My neighbour wants your number, can she book?\", landing in the Fynz inbox with the client's record showing their schedule and the review they left. Names blurred. Portrait crop.",
    alt: "A text from a client referring their neighbour, shown in the Fynz inbox",
    aspect: "portrait",
  },
  content: {
    src: "/industries/cleaning/content.png",
    kind: "Before / after",
    title: "One before-and-after becoming a week of posts",
    brief:
      "Left: the two raw phone photos a cleaner took, before and after, unedited. Right: the same pair as the published Instagram post, Facebook post and Google Business post, with captions and the company name visible. Real published posts, not mock-ups. Landscape.",
    alt: "Raw before-and-after photos beside the finished social posts made from them",
    aspect: "wide",
  },
  reminder: {
    src: "/industries/cleaning/reminder.png",
    kind: "Photo",
    title: "The door opening on time",
    brief:
      "A client opening their front door to a cleaner arriving with supplies, both relaxed, mid-morning light. The point is the reminder worked: someone is home and expecting them. Landscape, both faces visible, no other companies' branding. Get written permission from everyone pictured.",
    alt: "A client opening the door to a cleaner arriving with supplies",
    aspect: "photo",
  },
  reviews: {
    src: "/industries/cleaning/reviews.png",
    kind: "Screenshot",
    title: "The review request, and the review it produced",
    brief:
      "Left: the one-line review request on the client's phone, sent the evening of the clean, with the Google link. Right: the resulting five-star Google review on the company's profile, with the reviewer's name and photo blurred. Same company on both sides. Landscape.",
    alt: "A review request text beside the Google review it led to",
    aspect: "wide",
  },
  proof: {
    src: "/industries/cleaning/proof.png",
    kind: "Screenshot",
    title: "A cleaning company already on Fynz: their Google profile or Instagram grid",
    brief:
      "Once a case study is confirmed: the company's Google Business profile showing the review count and rating, or their Instagram grid showing the weekly before-and-after posts, at least nine posts with dates in view. Square crop. Shared with the owner's written permission.",
    alt: "The Google reviews or Instagram grid of a cleaning company using Fynz",
    aspect: "square",
  },
  caseStudy: {
    src: "/industries/cleaning/case-study.png",
    kind: "Screenshot",
    title: "One company, one city",
    brief:
      "Name the company, their city and the size of their team. State when Fynz started running their follow-up and content, and give only numbers from that period: reviews gained, recurring clients rebooked from a nudge, missed calls that became quotes, posts published without anyone writing a caption. Add a one- or two-sentence quote from the owner and get written permission before publishing. If there are no numbers yet, say what runs and leave the numbers out.",
    alt: "Case study: One company, one city",
    aspect: "square",
  },
  stack: {
    src: "/industries/cleaning/stack.png",
    kind: "Logo strip",
    title: "The tools it sits alongside",
    brief:
      "One row of logos for the tools cleaning companies already use: Jobber, Housecall Pro, QuickBooks, Google Business Profile, Stripe and Square. Monochrome or muted, transparent background, evenly spaced. Only include a logo where that brand's guidelines allow it.",
    alt: "Logos of scheduling, invoicing, review and payment tools Fynz works alongside",
    aspect: "strip",
  },
} satisfies Record<string, Visual>;

export type VisualId = keyof typeof VISUALS;
