# Analytics — what is measured, and what it does not prove

The business journey is: qualified visitor → Fit Finder → successful enquiry →
meeting → client. Analytics covers the first three. The last two happen
offline and are never sent to any analytics tool.

## What is installed

| Tool | Status | Notes |
|---|---|---|
| Vercel Analytics | On | Pageviews. Left exactly as it was |
| Google Analytics 4 | Off until configured | Needs `NEXT_PUBLIC_GA_MEASUREMENT_ID` **and** a visitor's Accept |
| Google Search Console | External | Verified outside the code. Nothing in this repo |
| Plausible | Removed | Was mounted but never configured |

No session recording, heatmaps, ad pixels or fingerprinting. Do not add any.

## The three gates on GA4

1. **No ID, nothing loads.** No banner, no script, no cookie.
2. **No consent, nothing loads.** The banner defaults to "not answered". Until
   a visitor clicks Accept, `gtag.js` is never requested. Reject is remembered
   for 180 days. "Cookie settings" in the footer reopens the choice.
3. **Allowlist only.** `lib/analytics/ga.ts` is the single place that talks to
   GA4. Event names and parameters are fixed TypeScript types. There is no
   free-form parameter.

## Events

| Event | Fires when | Parameters | What it does NOT mean |
|---|---|---|---|
| `page_view` | Once per page, including client-side navigation | Sanitised URL, referrer, title | — |
| `fit_finder_start` | The first answer is selected | none | Not a page visit |
| `fit_finder_step` | A step is reached for the first time in a run | `step_number` (1–7) | Not which answer was chosen |
| `fit_finder_complete` | All questions answered and the shortlist shown | none | Not an enquiry |
| `blueprint_form_submit_success` | `/api/lead-capture` returned success for the Fit Finder form | none | Not a button click. Not a qualified lead |
| `enquiry_form_submit_success` | Same, for the other three forms | `form_name`: `contact`, `gift_enquiry`, `corridor_access` | Not a qualified lead |
| `gift_gate_verify_success` | The server accepted the emailed code on the `/gift-city` gate | none | Not an enquiry about a product. The visitor registered to read the section |
| `contact_click` | A WhatsApp, email or booking link is clicked | `channel`, `placement` (`footer`, `contact_page`, `nri_page`, `sticky_bar`, `next_step`) | **Not proof of contact.** Interest only |

Keep these distinctions in every report:

- button click ≠ successful form submission
- website enquiry ≠ qualified lead in the CRM ≠ booked meeting ≠ funded client

"Success" means the server saved the lead in Sanity. It does not mean the
confirmation email arrived. Cross-check GA4 counts against Sanity lead
documents and the desk inbox; those are the source of truth.

Events before a visitor accepts are dropped, not queued. GA4 numbers therefore
undercount by everyone who rejects or ignores the banner. Use them for ratios
and trends, and use Sanity for absolute enquiry counts.

The `/gift-city` gate also writes a lead to Sanity when the code is verified,
so count `gift_gate_verify_success` alongside the two form events when
cross-checking against Sanity.

## Never send

Names, emails, phone numbers, cities, free-text answers, Fit Finder answers,
financial inputs, portfolio sizes, or any form field value, as an event
parameter, a user property or part of a URL.

URLs are rebuilt before sending: origin + path, plus `utm_source`,
`utm_medium` and `utm_campaign` only. Every other query parameter is dropped.

## Settings that live in the GA4 dashboard, not in code

Code cannot switch these off. They must be set by the property owner under
Admin → Data streams → (the web stream) → Enhanced measurement:

- **Page changes based on browser history events: OFF.** The site sends its
  own `page_view` on navigation. Leaving this on double-counts.
- **Form interactions: OFF.**
- **Outbound clicks: OFF.** WhatsApp links carry a prefilled message.
- **Site search, video engagement, file downloads: OFF** (unused).
- Scroll: optional. Page views: on.

Also: Google signals off, ads personalisation off, and choose data retention
deliberately (2 or 14 months).

## UTM convention for links we share

Tag inbound links only (LinkedIn posts, WhatsApp broadcasts, email
signatures). Never tag links between pages of this site.

```
?utm_source=linkedin&utm_medium=social&utm_campaign=<topic>-<yyyymmdd>
```

| Parameter | Use | Examples |
|---|---|---|
| `utm_source` | Where the link is posted | `linkedin`, `whatsapp`, `newsletter` |
| `utm_medium` | The kind of channel | `social`, `messaging`, `email`, `referral` |
| `utm_campaign` | Topic and date | `nri-canada-20261112` |

Lower case, hyphens, no spaces. Only letters, digits, `.`, `_` and `-`
survive; anything else is stripped. Never put a person's name or email in a
UTM value.
