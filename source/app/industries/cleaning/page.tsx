import type { Metadata } from "next";
import { CleaningLanding } from "./CleaningLanding";
import { CLEANING_FAQS, CLEANING_PLANS } from "./content";

const PAGE_URL = "https://fynz.io/industries/cleaning";

export const metadata: Metadata = {
  title: "The Follow-Up System for Cleaning Companies | Fynz",
  description:
    "Every call answered, every client rebooked, every clean reviewed, while you're on a job. Works with the scheduling app you use. Free plan available.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "The follow-up system for cleaning companies | Fynz",
    description:
      "Every call answered. Every client rebooked. Every clean reviewed. While you're on a job.",
    url: PAGE_URL,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CLEANING_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Fynz for Cleaning Companies",
  description:
    "Follow-up system for residential and commercial cleaning companies: missed-call text-back, instant quote replies, reminders and on-our-way texts, rebook nudges for quiet clients, review requests and before-and-after content.",
  brand: { "@type": "Brand", name: "Fynz" },
  url: PAGE_URL,
  offers: CLEANING_PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: String(plan.price),
    priceCurrency: "USD",
    url: `${PAGE_URL}#pricing`,
  })),
};

export default function CleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <CleaningLanding />
    </>
  );
}
