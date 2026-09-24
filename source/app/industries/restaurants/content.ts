import type { Visual } from "@/components/funnel";

// Copy and structured data for /industries/restaurants. This is a funnel page:
// every call to action stays on the page and lands on the #book form, which
// carries the visitor's plan interest to the team.
// Kept outside the
// client component so the route's server file can feed the same FAQ and plan
// data into the page's JSON-LD without crossing the client boundary.

export const BOOK_CALL_HREF = "https://api.fynz.io/widget/booking/GYTunZhDxUCqGsm0O3jd";
export const BOOK_CALL_LABEL = "Book a 15-minute call";
export const FREE_PLAN_HREF = "#plans";
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

export const RESTAURANT_PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    price: 0,
    desc: "Counts the calls you're already missing and the regulars who have gone quiet. No card, no expiry, not a trial.",
    cta: FREE_PLAN_LABEL,
    href: "https://api.fynz.io/widget/booking/GYTunZhDxUCqGsm0O3jd",
  },
  {
    key: "starter",
    name: "Starter",
    price: 97,
    desc: "The operational core: guest list, booking links, direct ordering, missed-call text-back and review requests. Social content isn't included.",
    cta: "Start on Starter",
    href: "https://api.fynz.io/payment-link/6ab11d38f426560dbc2f162a",
  },
  {
    key: "growth",
    name: "Growth",
    price: 197,
    desc: "Everything in Starter, plus email campaigns, campaign pages, a social content calendar your team posts from, and documents and contracts.",
    cta: "Start on Growth",
    href: "https://api.fynz.io/payment-link/6ab11d55f426560dbc2f162c",
    popular: true,
  },
  {
    key: "managed",
    name: "Managed",
    price: 397,
    desc: "Everything in Growth, plus our team creates and posts your content from your photos and runs your campaigns and guest follow-up.",
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
  { name: "Missed-call and lapsed-guest counter", cells: [true, true, true, true] },
  { name: "Missed-call text-back", cells: [false, true, true, true] },
  { name: "Guest list, welcome, birthday and win-back messages", cells: [false, true, true, true] },
  { name: "Booking links to your reservation system", cells: [false, true, true, true] },
  { name: "Direct online ordering", cells: [false, true, true, true] },
  { name: "Review requests", cells: [false, true, true, true] },
  { name: "Email campaigns and campaign pages", cells: [false, false, true, true] },
  { name: "Social content calendar and scheduler", cells: [false, false, true, true] },
  { name: "Documents and contracts (events, catering)", cells: [false, false, true, true] },
  { name: "We create and post your content (photo-to-post)", cells: [false, false, false, true], emphasis: true },
  { name: "We run your campaigns and guest follow-up", cells: [false, false, false, true], emphasis: true },
  { name: "Setup", cells: ["Self-serve", SETUP, SETUP, SETUP] },
];

export const RESTAURANT_FAQS: { q: string; a: string }[] = [
  {
    q: "Will it actually bring in customers?",
    a: "We won't promise a number. Every guest who hasn't ordered, booked or checked in for 60 days gets an offer, every missed call gets a text back, and on the Managed plan your food gets posted every week. The free plan shows your real missed calls before you spend anything.",
  },
  {
    q: "Is it easy to use?",
    a: "Most of it runs on its own. On the Managed plan, your part is usually taking one photo before a dish leaves the pass.",
  },
  {
    q: "What does it cost?",
    a: "Paid plans start at $97 USD a month, and there is a free plan. Text messages and calls are billed at cost to your own account.",
  },
  {
    q: "What if it doesn't work for us?",
    a: "You leave. Plans are month to month with no contract and a 30-day money-back guarantee on paid plans. We export your guest list for you.",
  },
  {
    q: "Do I have to change my POS or booking system?",
    a: "No. Table bookings stay in your reservation system, and orders and tickets are paid through your own Stripe or Square account.",
  },
  {
    q: "Will my staff have to learn something new?",
    a: "Very little. One app on one phone for photos and messages. No new terminal at the host stand.",
  },
  {
    q: "Is texting guests legal?",
    a: "Yes, when it's done with consent. We set up consent capture, opt-out handling (\"reply STOP\") and US carrier registration for you. You stay in control of what gets sent, and we'll flag anything that needs a second look.",
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
    src: "/industries/restaurants/hero.png",
    kind: "Photo",
    title: "A host welcoming a returning guest at the door",
    brief:
      "Real restaurant, real people, shot at the entrance during service. The host and the guest clearly know each other: a handshake, a hand on the shoulder or a hug. Warm interior light, evening, nobody smiling at the camera. Portrait crop with the guest's face visible; the host in profile is fine. No other brands' logos in frame. If you shoot at Abyssinia, get written permission from everyone pictured.",
    alt: "A host welcoming a returning guest at the door",
    aspect: "portrait",
  },
  messages: {
    src: "/industries/restaurants/messages.png",
    kind: "Screenshot",
    title: "The three automatic messages, as the guest sees them",
    brief:
      "Phone screenshot of a real Fynz text thread from the guest's side: the welcome text on the day they joined, the birthday message with its offer, and the day-60 \"we've missed you\" text with the booking link. Use the restaurant's real name as the sender and real menu language in the offer. Hide the guest's number. At least one message must show \"Reply STOP to opt out\".",
    alt: "A phone showing the welcome, birthday and win-back texts from a restaurant",
    aspect: "phone",
  },
  textback: {
    src: "/industries/restaurants/textback.png",
    kind: "Screenshot",
    title: "A missed call becoming a booking by text",
    brief:
      "Phone screenshot from the guest's side: the missed call at the top, the text-back arriving seconds later from the restaurant's own number, the guest's reply with party size and time, and the confirmation. Friday-evening timestamps. Hide the guest's number.",
    alt: "A phone showing a missed call followed by a text conversation that ends in a confirmed table",
    aspect: "phone",
  },
  dashboard: {
    src: "/industries/restaurants/dashboard.png",
    kind: "Screenshot",
    title: "The free plan's missed-call counter",
    brief:
      "Desktop screenshot of the Fynz dashboard for a restaurant on the free plan: calls missed this week by day, with Friday and Saturday visibly highest, and the lapsed-guest count beside it. Use a demo account with a made-up restaurant name, never a customer's real data. Light theme, cropped to the two counters.",
    alt: "The Fynz dashboard counting missed calls by day and lapsed guests",
    aspect: "wide",
  },
  ordering: {
    src: "/industries/restaurants/ordering.png",
    kind: "Screenshot",
    title: "The restaurant's own ordering page on a phone",
    brief:
      "Phone screenshot of a Fynz ordering page under the restaurant's own name: three or four dishes with photos and prices, a cart with a total, and the pay button showing Square or Stripe. No delivery-app branding anywhere. If you use Abyssinia's page, get permission and show their real dishes.",
    alt: "A phone showing a restaurant's direct ordering page with a cart and a pay button",
    aspect: "phone",
  },
  content: {
    src: "/industries/restaurants/content.png",
    kind: "Before / after",
    title: "One dish photo becoming a week of posts",
    brief:
      "Left: the raw phone photo a cook took at the pass, unedited; slightly crooked is fine. Right: the same dish as the published Instagram post, Facebook post and Google Business post, with captions, side by side. Real published posts, not mock-ups. Landscape.",
    alt: "A raw kitchen photo beside the finished social posts made from it",
    aspect: "wide",
  },
  events: {
    src: "/industries/restaurants/booking.png",
    kind: "Photo",
    title: "Door check-in by QR",
    brief:
      "A host at the entrance scanning a guest's phone with their own phone, the QR code visible on the guest's screen. Evening, with a queue or a full room behind them. Landscape, both phones in focus.",
    alt: "A host scanning a guest's QR ticket at the restaurant door",
    aspect: "photo",
  },
  reviews: {
    kind: "Screenshot",
    title: "The review request, and the review it produced",
    brief:
      "Left: the one-line review request on the guest's phone, sent the evening after their visit, with the Google link. Right: the resulting five-star Google review, with the reviewer's name and photo blurred. Same restaurant on both sides. Landscape.",
    alt: "A review request text beside the Google review it led to",
    aspect: "wide",
  },
  proof: {
    src: "/industries/restaurants/proof.png",
    kind: "Screenshot",
    title: "Abyssinia's Instagram grid",
    brief:
      "The profile grid on Instagram showing the weekly posts Fynz has published: at least nine posts, profile header included. Square crop. Shared with the owner's written permission.",
    alt: "The Instagram profile grid of Abyssinia Restaurant showing weekly posts",
    aspect: "square",
  },
  stack: {
    kind: "Logo strip",
    title: "The tools it sits alongside",
    brief:
      "One row of logos: the reservation systems your restaurants use (OpenTable, Resy), the POS systems (Toast, Square, Clover) and the processors (Stripe, Square). Monochrome or muted, transparent background, evenly spaced. Only include a logo where that brand's guidelines allow it.",
    alt: "Logos of reservation, POS and payment tools Fynz works alongside",
    aspect: "strip",
  },
} satisfies Record<string, Visual>;

export type VisualId = keyof typeof VISUALS;
