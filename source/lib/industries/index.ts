import type { IndustryData } from "./types";

// Food & Hospitality
import cafes from "./data/cafes";
import bars from "./data/bars";
// Health & Wellness
import clinics from "./data/clinics";
import dental from "./data/dental";
import medicalClinics from "./data/medical-clinics";
import therapists from "./data/therapists";
import therapy from "./data/therapy";
// Fitness & Coaching
import fitness from "./data/fitness";
import gyms from "./data/gyms";
import personalTrainers from "./data/personal-trainers";
import yogaStudios from "./data/yoga-studios";
import yogaPilates from "./data/yoga-pilates";
import coaching from "./data/coaching";
// Home & Trades
import homeServices from "./data/home-services";
import contractors from "./data/contractors";
import plumbing from "./data/plumbing";
// Retail & Commerce
import retail from "./data/retail";
import boutiques from "./data/boutiques";
import ecommerce from "./data/ecommerce";
import automotive from "./data/automotive";
// Professional Services
import accounting from "./data/accounting";
import legal from "./data/legal";
import saas from "./data/saas";
import tutoring from "./data/tutoring";

/**
 * All template-driven industry landing pages, in display order.
 * The bespoke /industries/barbershops, /industries/restaurants,
 * /industries/real-estate and /industries/cleaning routes are intentionally not
 * listed here — they have their own hand-built pages and take precedence over
 * the [slug] route.
 */
export const industries: IndustryData[] = [
  cafes,
  bars,
  clinics,
  dental,
  medicalClinics,
  therapists,
  therapy,
  fitness,
  gyms,
  personalTrainers,
  yogaStudios,
  yogaPilates,
  coaching,
  homeServices,
  contractors,
  plumbing,
  retail,
  boutiques,
  ecommerce,
  automotive,
  accounting,
  legal,
  saas,
  tutoring,
];

export const industryMap: Record<string, IndustryData> = Object.fromEntries(
  industries.map((industry) => [industry.slug, industry])
);

export function getIndustry(slug: string): IndustryData | undefined {
  return industryMap[slug];
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((industry) => industry.slug);
}

export type { IndustryData } from "./types";
