import type { Visual } from "@/components/funnel";

// Copy and structured data for /industries/real-estate, the funnel page for
// real estate agents in Canada. Every call to action stays on the page and
// lands on the #book form, which carries the visitor's plan interest to the
// team. Kept outside the client component so the route's server file can feed
// the same FAQ and plan data into the page's JSON-LD.

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

export const REAL_ESTATE_PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    price: 0,
    desc: "Counts the calls you're already missing and the past clients who haven't heard from you. No card, no expiry, not a trial.",
    cta: FREE_PLAN_LABEL,
    href: FREE_PLAN_HREF,
  },
  {
    key: "starter",
    name: "Starter",
    price: 97,
    desc: "The operational core: client database, showing and consult booking links, missed-call text-back, instant replies to portal inquiries and review requests. Social content isn't included.",
    cta: "Start on Starter",
    href: "#book",
  },
  {
    key: "growth",
    name: "Growth",
    price: 197,
    desc: "Everything in Starter, plus email campaigns, listing pages, a social content calendar you post from, and documents and e-signatures for your own paperwork.",
    cta: "Start on Growth",
    href: "#book",
    popular: true,
  },
  {
    key: "managed",
    name: "Managed",
    price: 397,
    desc: "Everything in Growth, plus our team creates and posts your listing content from your photos and runs your campaigns and client follow-up.",
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
  { name: "Instant reply to portal and website inquiries", cells: [false, true, true, true] },
  { name: "Client database with closing-anniversary, birthday and check-in messages", cells: [false, true, true, true] },
  { name: "Showing and consult booking links from your calendar", cells: [false, true, true, true] },
  { name: "Open-house QR sign-in", cells: [false, true, true, true] },
  { name: "Review requests", cells: [false, true, true, true] },
  { name: "Email campaigns and listing pages", cells: [false, false, true, true] },
  { name: "Social content calendar and scheduler", cells: [false, false, true, true] },
  { name: "Documents and e-signatures for your own paperwork", cells: [false, false, true, true] },
  { name: "We create and post your listing content (photo-to-post)", cells: [false, false, false, true], emphasis: true },
  { name: "We run your campaigns and client follow-up", cells: [false, false, false, true], emphasis: true },
  { name: "Setup", cells: ["Self-serve", SETUP, SETUP, SETUP] },
];

export const REAL_ESTATE_FAQS: { q: string; a: string }[] = [
  {
    q: "Will it actually bring me more deals?",
    a: "We won't promise a number. Every past client gets a closing-anniversary note, a birthday message and a check-in when they've gone quiet, every missed call and portal inquiry gets an answer within seconds, and on the Managed plan every listing gets posted. The free plan shows your real missed calls before you spend anything.",
  },
  {
    q: "Is it easy to use?",
    a: "Most of it runs on its own. Your part is answering the replies that come back, and on the Managed plan, sending us the listing photos you already have.",
  },
  {
    q: "What does it cost?",
    a: "Paid plans start at $97 USD a month, and there is a free plan. Text messages and calls are billed at cost to your own account.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "You leave. Plans are month to month with no contract and a 30-day money-back guarantee on paid plans. We export your client database for you.",
  },
  {
    q: "Do I have to change my brokerage's tools or my board's forms?",
    a: "No. Offers, agreements and signatures stay in the systems your brokerage and board require. Fynz handles the follow-up, the replies and the marketing around them.",
  },
  {
    q: "Is texting clients legal in Canada?",
    a: "Yes, with consent. We set up consent capture under CASL, unsubscribe handling (\"reply STOP\") and your texting number, and every message carries your name and brokerage. You stay in control of what gets sent.",
  },
  {
    q: "Does it fit my brokerage's advertising rules?",
    a: "Messages and posts identify you and your brokerage the way your provincial regulator requires, and you approve the content calendar before anything goes out. Check anything unusual with your broker of record.",
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
    kind: "Photo",
    title: "An agent mid-showing, phone face-down on the counter",
    brief:
      "A real agent walking buyers through a kitchen or living room of a Canadian home, fully present with the clients. In the foreground, the agent's phone lies face-down on the counter, screen lit at the edge as if a message just arrived. Daylight, no lawn signs or other brokerages' branding in frame. Portrait crop, the agent and clients in focus, the phone sharp enough to read as a phone. Get written permission from everyone pictured.",
    alt: "A real estate agent showing a home to clients while their phone lies face-down on the counter",
    aspect: "portrait",
  },
  messages: {
    kind: "Screenshot",
    title: "The three automatic messages, as the client sees them",
    brief:
      "Phone screenshot of a real Fynz text thread from the client's side: the thank-you the week they closed, the closing-anniversary note with the offer of a current home-value check, and a day-90 check-in. The sender shows the agent's name and brokerage. Hide the client's number. At least one message must show \"Reply STOP to unsubscribe\".",
    alt: "A phone showing an agent's thank-you, home-anniversary and check-in texts",
    aspect: "phone",
  },
  textback: {
    kind: "Screenshot",
    title: "A missed call during a showing becoming a booked viewing",
    brief:
      "Phone screenshot from the lead's side: the missed call at the top, the text-back arriving seconds later from the agent's own number, the lead's reply naming the listing, and a booking link that lands on a time from the agent's real calendar. Saturday-afternoon timestamps. Hide the lead's number.",
    alt: "A phone showing a missed call followed by a text conversation that ends in a booked showing",
    aspect: "phone",
  },
  dashboard: {
    kind: "Screenshot",
    title: "The free plan's missed-call counter",
    brief:
      "Desktop screenshot of the Fynz dashboard for an agent on the free plan: calls missed this week by day, with Saturday visibly highest, and the count of past clients who haven't heard from the agent in 90 days beside it. Use a demo account with a made-up agent name, never a customer's real data. Light theme, cropped to the two counters.",
    alt: "The Fynz dashboard counting missed calls by day and past clients gone quiet",
    aspect: "wide",
  },
  referral: {
    kind: "Screenshot",
    title: "A referral arriving from a past client",
    brief:
      "Phone or inbox screenshot of a real message from a past client, something like \"My sister is selling in the spring, can she call you?\", landing in the Fynz inbox with the client's record showing their closing date and the last check-in that went out. Names blurred. Portrait crop.",
    alt: "A text from a past client referring their sister, shown in the Fynz inbox",
    aspect: "portrait",
  },
  content: {
    kind: "Before / after",
    title: "Listing photos becoming a week of posts",
    brief:
      "Left: the listing photos as they came from the photographer, in a folder. Right: the published Just Listed, Open House and Just Sold posts on Instagram, Facebook and Google Business, with captions and the brokerage name visible. Real published posts, not mock-ups. Landscape.",
    alt: "Listing photos beside the finished social posts made from them",
    aspect: "wide",
  },
  openhouse: {
    kind: "Photo",
    title: "QR sign-in at the open house",
    brief:
      "A visitor scanning a small QR stand at the entrance of an open house, phone in hand, with the agent nearby and the home visible behind. Daylight, landscape, both the stand and the phone in focus. No clipboard in sight.",
    alt: "A visitor scanning a QR code to sign in at an open house",
    aspect: "photo",
  },
  reviews: {
    kind: "Screenshot",
    title: "The review request, and the review it produced",
    brief:
      "Left: the one-line review request on the client's phone, sent the week after closing, with the Google link. Right: the resulting five-star Google review on the agent's profile, with the reviewer's name and photo blurred. Same agent on both sides. Landscape.",
    alt: "A review request text beside the Google review it led to",
    aspect: "wide",
  },
  proof: {
    kind: "Screenshot",
    title: "An agent already on Fynz: their Google reviews or Instagram grid",
    brief:
      "Once an agent case study is confirmed: their Google Business profile showing the review count and rating, or their Instagram grid showing the weekly listing posts, at least nine posts with dates in view. Square crop. Shared with the agent's written permission.",
    alt: "The Google reviews or Instagram grid of a real estate agent using Fynz",
    aspect: "square",
  },
  stack: {
    kind: "Logo strip",
    title: "The tools it sits alongside",
    brief:
      "One row of logos for the tools Canadian agents already use: REALTOR.ca, your board's MLS system, a showing tool such as BrokerBay, an e-signature tool such as DocuSign, and Google Business Profile. Monochrome or muted, transparent background, evenly spaced. Only include a logo where that brand's guidelines allow it.",
    alt: "Logos of listing, showing, signature and review tools Fynz works alongside",
    aspect: "strip",
  },
} satisfies Record<string, Visual>;

export type VisualId = keyof typeof VISUALS;
