import type { Metadata } from "next";
import { RestaurantLanding } from "./RestaurantLanding";
import { RESTAURANT_FAQS, RESTAURANT_PLANS } from "./content";

const PAGE_URL = "https://fynz.io/industries/restaurants";

export const metadata: Metadata = {
  title: "Restaurant Marketing and Guest System for Independent Restaurants | Fynz",
  description:
    "Fynz brings lapsed regulars back automatically, texts back missed calls and takes commission-free orders. Works with your POS. Free plan available.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Restaurant marketing and guest system | Fynz",
    description:
      "Your regulars didn't complain. They just stopped coming. Fynz brings them back automatically.",
    url: PAGE_URL,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: RESTAURANT_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Fynz for Restaurants",
  description:
    "Restaurant marketing and guest system: automatic win-back offers for lapsed regulars, missed-call text-back, direct ordering, review requests and content.",
  brand: { "@type": "Brand", name: "Fynz" },
  url: PAGE_URL,
  offers: RESTAURANT_PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: String(plan.price),
    priceCurrency: "USD",
    url: `${PAGE_URL}#pricing`,
  })),
};

export default function RestaurantsPage() {
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
      <RestaurantLanding />
    </>
  );
}
