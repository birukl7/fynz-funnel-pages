# Fynz funnel pages: restaurants, real estate (Canada) and cleaning

Source of truth: branch `claude/sweet-galileo-8ms6zw` in github.com/FYNZ-IQ/fynz.io.

| Page | Route | Preview |
|---|---|---|
| Restaurants | `/industries/restaurants` | https://claude.ai/artifact/5af3h8qRqbuFfA7Y8BKZrN |
| Real estate agents in Canada | `/industries/real-estate` | https://claude.ai/artifact/NkUrv19pmUoWQfePBuRCCM |
| Cleaning companies | `/industries/cleaning` | https://claude.ai/artifact/G1QcnVJrWhTxhpTrmb2nCg |

## What is in this folder

- `source/` — every file added or changed on the branch, at its repo path. Three templated data files were deleted on the branch (`lib/industries/data/{restaurants,real-estate,cleaning}.ts`); see `changed-files.txt`.
- `changes.patch` — the full diff against `main` (commit 2429c20), for `git apply`. `commits.txt` lists the commits.
- `static-preview/<page>/` — the built pages. Serve a folder with a static server and open `/` (for example `npx serve static-preview/cleaning`). Opening `index.html` from disk will not load the styles.
- `screenshots/` — desktop captures of key sections and the booking forms, plus a phone capture.

## Run it in the repo

```
git fetch origin claude/sweet-galileo-8ms6zw
git checkout claude/sweet-galileo-8ms6zw
pnpm install
pnpm dev        # /industries/restaurants, /industries/real-estate, /industries/cleaning
pnpm build      # static export to ./out
```

## How the funnels are built

All three pages share `components/funnel/`: the interest state, the sticky anchor-only header with a phone toggle, `Step` sections, CTA strips, number fields, `VisualSlot` placeholders, the minimal footer and the phone CTA bar. Each page supplies a `FunnelConfig` (theme, menu, CTA labels, asset folder, footer note) and its own sections and calculators.

| File | Purpose |
|---|---|
| `components/funnel/Funnel.tsx`, `types.ts` | The shared funnel frame and components |
| `components/layout/SiteChrome.tsx` | Hides the site navbar and footer on funnel routes (`FUNNEL_PATHS`) |
| `components/shared/DemoForm.tsx` | Booking form shared with `/demo`; posts to the onboarding bridge with `interest` and `source` |
| `app/industries/<page>/page.tsx` | Route, metadata, canonical and Open Graph, FAQPage and Product JSON-LD |
| `app/industries/<page>/*Landing.tsx` | The page's sections, calculators and mock message cards |
| `app/industries/<page>/content.ts` | Editable copy: plans, plan table, FAQ, interest options, visual briefs |
| `services/onboarding-bridge/server.js` | Demo endpoint accepts `interest` and `source` and includes them in the lead alert |

To add a fourth funnel: copy a `content.ts` and landing component, add the route to `FUNNEL_PATHS`, and remove the slug from the templated list in `lib/industries/index.ts`.

## Filling in the visuals

Each dashed box on a page is a `VisualSlot`. Its brief (what to shoot or screenshot, aspect ratio, alt text) is in `VISUALS` in that page's `content.ts`.

1. Save the image at `public/<assetDir>/<id>.jpg` (the path and id are printed inside the box).
2. Add `src: "/<assetDir>/<id>.jpg"` to that entry in `content.ts`. Optional `caption`.
3. Rebuild. The image renders at the slot's size with the alt text already set.

Briefs that involve a named business or a future case study require written permission. Logo strips should only include brands whose guidelines allow it.

## Open items before publishing

All pages
- Currency is USD everywhere, matching the rest of the site. Change if the billing spec says CAD.
- The free-plan mechanism ("forward unanswered calls to a free Fynz number") is the suggested wording; confirm it matches the product.
- The booking form only posts when `NEXT_PUBLIC_ONBOARDING_BRIDGE_URL` is set at build time; otherwise it shows the email fallback.
- `interest` and `source` reach the lead alert only after the bridge service is redeployed.
- On these pages the free plan is a request the team fulfils, not self-serve, since funnel pages have no exits.
- The "pile of separate tools" and assistant/admin cost ranges on the real estate and cleaning pages are estimates of typical 2026 rates. Verify before publishing.
- No case study exists yet for real estate or cleaning; the proof sections are explicit placeholders.

Restaurants
- The Abyssinia case study has no owner quote, dates or numbers yet.

Real estate
- The 25% referral-fee figure is the common rate; confirm for the networks your agents use.
- Have a broker of record read the CASL and brokerage-identification wording once.

Cleaning
- The lead-marketplace example ($35 per lead, about four leads to win one) is illustrative and labelled as such on the page; confirm against current Thumbtack and Angi pricing in your markets.
- The Jobber and Housecall Pro references describe coexistence, not integrations. If a data sync exists or is planned, say so; if not, the wording is accurate as written.
