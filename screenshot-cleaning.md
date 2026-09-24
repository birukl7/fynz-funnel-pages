# Screenshot & Visual Assets Manual — Fynz Cleaning Funnel

This document compiles the visual requirements, image briefs, and screenshot manuals for all placeholders across the Fynz Cleaning Company Funnel (`/industries/cleaning`).

---

## Summary of Visual Slots

| # | Slot ID | Kind | Title | Target Asset File | Aspect Ratio |
|---|---------|------|-------|-------------------|--------------|
| 1 | `hero` | Photo | A cleaner mid-job, phone lit up on the counter | `hero.png` | Portrait (`4:5`) |
| 2 | `textback` | Screenshot | A missed call during a job becoming a booked quote | `textback.png` | Phone (`9:16`) |
| 3 | `dashboard` | Screenshot | The free plan's missed-call counter | `dashboard.png` | Wide (`16:9`) |
| 4 | `messages` | Screenshot | The three automatic messages, as the client sees them | `messages.png` | Phone (`9:16`) |
| 5 | `reminder` | Photo | The door opening on time | `reminder.png` | Photo (`3:2`) |
| 6 | `referral` | Screenshot | A referral arriving from a happy client | `referral.png` | Portrait (`4:5`) |
| 7 | `reviews` | Screenshot | The review request, and the review it produced | `reviews.png` | Wide (`16:9`) |
| 8 | `content` | Before / after | One before-and-after becoming a week of posts | `content.png` | Wide (`16:9`) |
| 9 | `proof` | Screenshot | A cleaning company already on Fynz: their Google profile or Instagram grid | `proof.png` | Square (`1:1`) |
| 10 | `case-study` | Case study | One company, one city | `case-study.png` | Box / Card |
| 11 | `stack` | Logo strip | The tools it sits alongside | `stack.png` | Strip (`3:1` / `5:1`) |

---

## Detailed Visual Specifications

### 1. Hero (`hero`)
- **Section**: Hero Section (Top)
- **Slot ID**: `hero`
- **Kind**: `Photo`
- **Title**: A cleaner mid-job, phone lit up on the counter
- **Brief**: A real cleaner from a real company, gloves on, wiping down a kitchen or bathroom, fully absorbed in the work. In the foreground, a phone on the counter with the screen lit, as if a call is coming in. Branded shirt or apron is good; no other companies' branding. Daylight, a lived-in home, not a showroom. Portrait crop, the cleaner in focus, the phone sharp enough to read as a phone. Get written permission from everyone pictured.
- **Alt Text**: `A cleaner working in a kitchen while their phone lights up on the counter`
- **Aspect Ratio**: Portrait (`4:5`), max width 460px
- **Asset Path**: `/public/industries/cleaning/hero.png`

---

### 2. Missed-Call Text-Back (`textback`)
- **Section**: Step 1 · The Leads (`#phone`)
- **Slot ID**: `textback`
- **Kind**: `Screenshot`
- **Title**: A missed call during a job becoming a booked quote
- **Brief**: Phone screenshot from the caller's side: the missed call at the top, the text-back arriving seconds later from the company's own number, the caller's reply describing the home, and a booking link that lands on a quote time from the real calendar. Weekday-morning timestamps. Hide the caller's number.
- **Alt Text**: `A phone showing a missed call followed by a text conversation that ends in a booked quote`
- **Aspect Ratio**: Phone (`9:16`), max width 340px
- **Asset Path**: `/public/industries/cleaning/textback.png`

---

### 3. Dashboard Counter (`dashboard`)
- **Section**: Step 1 · The Leads (`#phone`)
- **Slot ID**: `dashboard`
- **Kind**: `Screenshot`
- **Title**: The free plan's missed-call counter
- **Brief**: Desktop screenshot of the Fynz dashboard for a cleaning company on the free plan: calls missed this week by day, with weekday mornings visibly highest, and the count of recurring clients who haven't booked in six weeks beside it. Use a demo account with a made-up company name, never a customer's real data. Light theme, cropped to the two counters.
- **Alt Text**: `The Fynz dashboard counting missed calls by day and recurring clients gone quiet`
- **Aspect Ratio**: Wide (`16:9`)
- **Asset Path**: `/public/industries/cleaning/dashboard.png`

---

### 4. Automatic Messages (`messages`)
- **Section**: Step 3 · What runs on its own (`#how`)
- **Slot ID**: `messages`
- **Kind**: `Screenshot`
- **Title**: The three automatic messages, as the client sees them
- **Brief**: Phone screenshot of a real Fynz text thread from the client's side: the reminder the day before with the arrival window, the "on our way" text that morning with the cleaner's first name, and the review request that evening with the Google link. The sender shows the company name. Hide the client's number. At least one message must show "Reply STOP to opt out".
- **Alt Text**: `A phone showing a cleaning company's reminder, on-our-way and review request texts`
- **Aspect Ratio**: Phone (`9:16`), max width 340px
- **Asset Path**: `/public/industries/cleaning/messages.png`

---

### 5. On-Time Reminder Arrival (`reminder`)
- **Section**: Step 3 · What runs on its own (`#how`)
- **Slot ID**: `reminder`
- **Kind**: `Photo`
- **Title**: The door opening on time
- **Brief**: A client opening their front door to a cleaner arriving with supplies, both relaxed, mid-morning light. The point is the reminder worked: someone is home and expecting them. Landscape, both faces visible, no other companies' branding. Get written permission from everyone pictured.
- **Alt Text**: `A client opening the door to a cleaner arriving with supplies`
- **Aspect Ratio**: Photo (`3:2`)
- **Asset Path**: `/public/industries/cleaning/reminder.png`

---

### 6. Client Referral (`referral`)
- **Section**: Step 4 · Lead fees (`#fees`)
- **Slot ID**: `referral`
- **Kind**: `Screenshot`
- **Title**: A referral arriving from a happy client
- **Brief**: Phone or inbox screenshot of a real message from a client, something like "My neighbour wants your number, can she book?", landing in the Fynz inbox with the client's record showing their schedule and the review they left. Names blurred. Portrait crop.
- **Alt Text**: `A text from a client referring their neighbour, shown in the Fynz inbox`
- **Aspect Ratio**: Portrait (`4:5`)
- **Asset Path**: `/public/industries/cleaning/referral.png`

---

### 7. Reviews Request & Outcome (`reviews`)
- **Section**: Step 5 · Being seen (`#reviews`)
- **Slot ID**: `reviews`
- **Kind**: `Screenshot`
- **Title**: The review request, and the review it produced
- **Brief**: Left: the one-line review request on the client's phone, sent the evening of the clean, with the Google link. Right: the resulting five-star Google review on the company's profile, with the reviewer's name and photo blurred. Same company on both sides. Landscape.
- **Alt Text**: `A review request text beside the Google review it led to`
- **Aspect Ratio**: Wide (`16:9`)
- **Asset Path**: `/public/industries/cleaning/reviews.png`

---

### 8. Before and After Content (`content`)
- **Section**: Step 5 · Being seen (`#reviews`)
- **Slot ID**: `content`
- **Kind**: `Before / after`
- **Title**: One before-and-after becoming a week of posts
- **Brief**: Left: the two raw phone photos a cleaner took, before and after, unedited. Right: the same pair as the published Instagram post, Facebook post and Google Business post, with captions and the company name visible. Real published posts, not mock-ups. Landscape.
- **Alt Text**: `Raw before-and-after photos beside the finished social posts made from them`
- **Aspect Ratio**: Wide (`16:9`)
- **Asset Path**: `/public/industries/cleaning/content.png`

---

### 9. Social Proof Grid (`proof`)
- **Section**: Step 6 · Proof
- **Slot ID**: `proof`
- **Kind**: `Screenshot`
- **Title**: A cleaning company already on Fynz: their Google profile or Instagram grid
- **Brief**: Once a case study is confirmed: the company's Google Business profile showing the review count and rating, or their Instagram grid showing the weekly before-and-after posts, at least nine posts with dates in view. Square crop. Shared with the owner's written permission.
- **Alt Text**: `The Google reviews or Instagram grid of a cleaning company using Fynz`
- **Aspect Ratio**: Square (`1:1`), max width 420px
- **Asset Path**: `/public/industries/cleaning/proof.png`

---

### 10. Case Study Card (`case-study`)
- **Section**: Step 6 · Proof
- **Slot ID**: `case-study`
- **Kind**: `Case study to add`
- **Title**: One company, one city
- **Brief**: Name the company, their city and the size of their team. State when Fynz started running their follow-up and content, and give only numbers from that period: reviews gained, recurring clients rebooked from a nudge, missed calls that became quotes, posts published without anyone writing a caption. Add a one- or two-sentence quote from the owner and get written permission before publishing. If there are no numbers yet, say what runs and leave the numbers out.
- **Asset Path**: `/public/industries/cleaning/case-study.png`

---

### 11. Tool Stack Integration (`stack`)
- **Section**: Step 8 · Your tools and your first 90 days
- **Slot ID**: `stack`
- **Kind**: `Logo strip`
- **Title**: The tools it sits alongside
- **Brief**: One row of logos for the tools cleaning companies already use: Jobber, Housecall Pro, QuickBooks, Google Business Profile, Stripe and Square. Monochrome or muted, transparent background, evenly spaced. Only include a logo where that brand's guidelines allow it.
- **Alt Text**: `Logos of scheduling, invoicing, review and payment tools Fynz works alongside`
- **Aspect Ratio**: Strip (`3:1` / `5:1`)
- **Asset Path**: `/public/industries/cleaning/stack.png`
