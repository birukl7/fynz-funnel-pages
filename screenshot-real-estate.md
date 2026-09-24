# Screenshot & Visual Asset Manual

This manual documents every visual placeholder and screenshot brief across the **Fynz Real Estate Funnel (`/industries/real-estate`)**.

---

## Quick Reference Summary

| # | Slot ID | Kind | Title | Aspect Ratio | Target File Path |
|---|---------|------|-------|--------------|------------------|
| 1 | `hero` | Photo | An agent mid-showing, phone face-down on the counter | Portrait (`4:5`) | `/public/industries/real-estate/hero.jpg` |
| 2 | `textback` | Screenshot | A missed call during a showing becoming a booked viewing | Phone (`9:16`) | `/public/industries/real-estate/textback.jpg` |
| 3 | `dashboard` | Screenshot | The free plan's missed-call counter | Wide (`16:9`) | `/public/industries/real-estate/dashboard.jpg` |
| 4 | `messages` | Screenshot | The three automatic messages, as the client sees them | Phone (`9:16`) | `/public/industries/real-estate/messages.jpg` |
| 5 | `referral` | Screenshot | A referral arriving from a past client | Portrait (`4:5`) | `/public/industries/real-estate/referral.jpg` |
| 6 | `content` | Before / after | Listing photos becoming a week of posts | Wide (`16:9`) | `/public/industries/real-estate/content.jpg` |
| 7 | `openhouse` | Photo | QR sign-in at the open house | Photo (`3:2`) | `/public/industries/real-estate/openhouse.jpg` |
| 8 | `reviews` | Screenshot | The review request, and the review it produced | Wide (`16:9`) | `/public/industries/real-estate/reviews.jpg` |
| 9 | `proof` | Screenshot | An agent already on Fynz: their Google reviews or Instagram grid | Square (`1:1`) | `/public/industries/real-estate/proof.jpg` |
| 10 | `stack` | Logo strip | The tools it sits alongside | Strip (`5:1`) | `/public/industries/real-estate/stack.jpg` |
| — | *(Case Study)* | Text / Brief | One agent, one brokerage, one city | Card | Inline in `RealEstateLanding.tsx` |

---

## Detailed Placeholder Manuals

### 1. `hero` · Hook Section
- **Badge**: `Visual to add · Photo`
- **Title**: An agent mid-showing, phone face-down on the counter
- **Aspect Ratio**: Portrait (`4:5`, max-width `460px`)
- **Manual / Sourcing Brief**:
  > A real agent walking buyers through a kitchen or living room of a Canadian home, fully present with the clients. In the foreground, the agent's phone lies face-down on the counter, screen lit at the edge as if a message just arrived. Daylight, no lawn signs or other brokerages' branding in frame. Portrait crop, the agent and clients in focus, the phone sharp enough to read as a phone. Get written permission from everyone pictured.
- **Alt Text**: `"A real estate agent showing a home to clients while their phone lies face-down on the counter"`
- **Save Path**: `/public/industries/real-estate/hero.jpg`
- **Configuration**: Set `src: "/industries/real-estate/hero.jpg"` on `hero` in `source/app/industries/real-estate/content.ts`

checked
---

### 2. `textback` · Step 1 (The Leads)
- **Badge**: `Visual to add · Screenshot`
- **Title**: A missed call during a showing becoming a booked viewing
- **Aspect Ratio**: Phone (`9:16`, max-width `340px`, centered)
- **Manual / Sourcing Brief**:
  > Phone screenshot from the lead's side: the missed call at the top, the text-back arriving seconds later from the agent's own number, the lead's reply naming the listing, and a booking link that lands on a time from the agent's real calendar. Saturday-afternoon timestamps. Hide the lead's number.
- **Alt Text**: `"A phone showing a missed call followed by a text conversation that ends in a booked showing"`
- **Save Path**: `/public/industries/real-estate/textback.jpg`
- **Configuration**: Set `src: "/industries/real-estate/textback.jpg"` on `textback` in `source/app/industries/real-estate/content.ts`

checked
---

### 3. `dashboard` · Step 1 (The Leads)
- **Badge**: `Visual to add · Screenshot`
- **Title**: The free plan's missed-call counter
- **Aspect Ratio**: Wide (`16:9`, full-width card)
- **Manual / Sourcing Brief**:
  > Desktop screenshot of the Fynz dashboard for an agent on the free plan: calls missed this week by day, with Saturday visibly highest, and the count of past clients who haven't heard from the agent in 90 days beside it. Use a demo account with a made-up agent name, never a customer's real data. Light theme, cropped to the two counters.
- **Alt Text**: `"The Fynz dashboard counting missed calls by day and past clients gone quiet"`
- **Save Path**: `/public/industries/real-estate/dashboard.jpg`
- **Configuration**: Set `src: "/industries/real-estate/dashboard.jpg"` on `dashboard` in `source/app/industries/real-estate/content.ts`

checked
---

### 4. `messages` · Step 3 (What Runs on Its Own)
- **Badge**: `Visual to add · Screenshot`
- **Title**: The three automatic messages, as the client sees them
- **Aspect Ratio**: Phone (`9:16`, max-width `340px`, centered)
- **Manual / Sourcing Brief**:
  > Phone screenshot of a real Fynz text thread from the client's side: the thank-you the week they closed, the closing-anniversary note with the offer of a current home-value check, and a day-90 check-in. The sender shows the agent's name and brokerage. Hide the client's number. At least one message must show "Reply STOP to unsubscribe".
- **Alt Text**: `"A phone showing an agent's thank-you, home-anniversary and check-in texts"`
- **Save Path**: `/public/industries/real-estate/messages.jpg`
- **Configuration**: Set `src: "/industries/real-estate/messages.jpg"` on `messages` in `source/app/industries/real-estate/content.ts`

checked
---

### 5. `referral` · Step 4 (Referral Fees)
- **Badge**: `Visual to add · Screenshot`
- **Title**: A referral arriving from a past client
- **Aspect Ratio**: Portrait (`4:5`)
- **Manual / Sourcing Brief**:
  > Phone or inbox screenshot of a real message from a past client, something like "My sister is selling in the spring, can she call you?", landing in the Fynz inbox with the client's record showing their closing date and the last check-in that went out. Names blurred. Portrait crop.
- **Alt Text**: `"A text from a past client referring their sister, shown in the Fynz inbox"`
- **Save Path**: `/public/industries/real-estate/referral.jpg`
- **Configuration**: Set `src: "/industries/real-estate/referral.jpg"` on `referral` in `source/app/industries/real-estate/content.ts`

checked
---

### 6. `content` · Step 5 (Being Seen - Listings)
- **Badge**: `Visual to add · Before / after`
- **Title**: Listing photos becoming a week of posts
- **Aspect Ratio**: Wide (`16:9`, landscape)
- **Manual / Sourcing Brief**:
  > Left: the listing photos as they came from the photographer, in a folder. Right: the published Just Listed, Open House and Just Sold posts on Instagram, Facebook and Google Business, with captions and the brokerage name visible. Real published posts, not mock-ups. Landscape.
- **Alt Text**: `"Listing photos beside the finished social posts made from them"`
- **Save Path**: `/public/industries/real-estate/content.jpg`
- **Configuration**: Set `src: "/industries/real-estate/content.jpg"` on `content` in `source/app/industries/real-estate/content.ts`

checked
---

### 7. `openhouse` · Step 5 (Being Seen - Open Houses)
- **Badge**: `Visual to add · Photo`
- **Title**: QR sign-in at the open house
- **Aspect Ratio**: Photo (`3:2`, landscape)
- **Manual / Sourcing Brief**:
  > A visitor scanning a small QR stand at the entrance of an open house, phone in hand, with the agent nearby and the home visible behind. Daylight, landscape, both the stand and the phone in focus. No clipboard in sight.
- **Alt Text**: `"A visitor scanning a QR code to sign in at an open house"`
- **Save Path**: `/public/industries/real-estate/openhouse.jpg`
- **Configuration**: Set `src: "/industries/real-estate/openhouse.jpg"` on `openhouse` in `source/app/industries/real-estate/content.ts`

checked
---

### 8. `reviews` · Step 5 (Being Seen - Reviews)
- **Badge**: `Visual to add · Screenshot`
- **Title**: The review request, and the review it produced
- **Aspect Ratio**: Wide (`16:9`, landscape)
- **Manual / Sourcing Brief**:
  > Left: the one-line review request on the client's phone, sent the week after closing, with the Google link. Right: the resulting five-star Google review on the agent's profile, with the reviewer's name and photo blurred. Same agent on both sides. Landscape.
- **Alt Text**: `"A review request text beside the Google review it led to"`
- **Save Path**: `/public/industries/real-estate/reviews.jpg`
- **Configuration**: Set `src: "/industries/real-estate/reviews.jpg"` on `reviews` in `source/app/industries/real-estate/content.ts`

checked
---

### 9. `proof` · Step 6 (Proof)
- **Badge**: `Visual to add · Screenshot`
- **Title**: An agent already on Fynz: their Google reviews or Instagram grid
- **Aspect Ratio**: Square (`1:1`, max-width `420px`, centered)
- **Manual / Sourcing Brief**:
  > Once an agent case study is confirmed: their Google Business profile showing the review count and rating, or their Instagram grid showing the weekly listing posts, at least nine posts with dates in view. Square crop. Shared with the agent's written permission.
- **Alt Text**: `"The Google reviews or Instagram grid of a real estate agent using Fynz"`
- **Save Path**: `/public/industries/real-estate/proof.jpg`
- **Configuration**: Set `src: "/industries/real-estate/proof.jpg"` on `proof` in `source/app/industries/real-estate/content.ts`

checked
---

### 10. `stack` · Step 8 (Tool Stack & First 90 Days)
- **Badge**: `Visual to add · Logo strip`
- **Title**: The tools it sits alongside
- **Aspect Ratio**: Strip (`3:1` mobile, `5:1` desktop)
- **Manual / Sourcing Brief**:
  > One row of logos for the tools Canadian agents already use: REALTOR.ca, your board's MLS system, a showing tool such as BrokerBay, an e-signature tool such as DocuSign, and Google Business Profile. Monochrome or muted, transparent background, evenly spaced. Only include a logo where that brand's guidelines allow it.
- **Alt Text**: `"Logos of listing, showing, signature and review tools Fynz works alongside"`
- **Save Path**: `/public/industries/real-estate/stack.jpg`
- **Configuration**: Set `src: "/industries/real-estate/stack.jpg"` on `stack` in `source/app/industries/real-estate/content.ts`

checked
---

### Bonus: Case Study Brief · Step 6 (Proof)
- **Badge**: `Case study to add`
- **Title**: One agent, one brokerage, one city
- **Location**: Step 6 (paired side-by-side with the `proof` visual slot)
- **Manual / Content Brief**:
  > Name the agent, their brokerage and their market. State when Fynz started running their follow-up and content, and give only numbers from that period: reviews gained, past-client deals or referrals that came from an anniversary or check-in message, listings posted without the agent writing a caption. Add a one- or two-sentence quote from the agent and get written permission before publishing. If there are no numbers yet, say what runs and leave the numbers out.

---

## Asset Guidelines & Implementation Notes

1. **Resolution & Format**: Save all raster images as `.jpg` or `.png` with modern compression (80–85% quality). High-density screens require 2x pixel dimensions (e.g., 680x1208px for phone screenshots).
2. **Privacy & Compliance (CASL)**:
   - Always blur or anonymize personal phone numbers and real client names.
   - Text message screenshots must display proper CASL compliance (agent/brokerage name and `"Reply STOP to unsubscribe"`).
3. **Activation**:
   Once an image is ready:
   1. Place it in `public/industries/real-estate/<id>.jpg`.
   2. Edit `source/app/industries/real-estate/content.ts` and set the `src` property on the corresponding visual key in `VISUALS`.
