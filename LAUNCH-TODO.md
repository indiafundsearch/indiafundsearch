# Launch TODO — owner / adviser actions

Code is live; these need a human with the right authority before the flagged
content can be treated as final.

## 🔴 Tax figures — confirm against Finance Bill 2026 + CA (post-cutoff, unverified)

All Budget-2026 figures on the site are ticket-provided and flagged in-page.
None should be relied on until confirmed:

- **`/tax` — buyback (P1-7):** the additional buyback tax rates
  (~22% corporate promoters / ~30% non-corporate), the promoter definition
  and the holding threshold. Confirm against the final Finance Bill 2026 text.
- **`/tax` — STT (P1-8):** futures 0.02→0.05%, options premium 0.10→0.15%,
  exercise 0.15%, effective 1 Apr 2026.

## 🔴 US-person module — fill + un-gate (P1-10)

`/learn/us-nri-pfic` is currently `noindex` with visible `[COPY NEEDED]`
blocks (search the file for `CopyNeeded`). With US-qualified counsel:

1. Replace each `[COPY NEEDED]` block (QEF/8621 per-fund, FBAR/8938 thresholds
   + Canadian T1135, and which shelf products are open to US persons).
2. Remove `robots: { index: false, follow: false }` from the page metadata to
   turn it into the indexed, high-value page.

## 🟡 Contact / config placeholders (if any remain)

- Booking link (`CONTACT.calendlyUrl` in `lib/constants.ts`) is blank — the
  "Book a conversation" CTAs stay hidden until it's set.

## 🔴 About page — fill + un-index (P3-26, E-E-A-T)

`/about` is live but `noindex` with `[COPY NEEDED]` blocks. With the owner:

1. Supply a professional photograph of Yash Jhaveri, the bio + credentials,
   the 1992 firm lineage, and the empanelment set (AMCs + any AMFI ARN /
   IFSCA ref). Replace each `CopyNeeded` block in `app/about/page.tsx`.
2. Remove `robots: { index: false, follow: false }` so it becomes the
   authorship/E-E-A-T asset Google can see.
3. Confirm the byline "Reviewed by the IndiaFundSearch desk" wording, and
   set the real reviewer if a named, credentialled reviewer is preferred
   (`components/shared/Byline.tsx`).

## 🟡 SEO — later phase (P3-29)

- Region-specific NRI-corridor landing routes (US / UAE / UK). hreflang is
  already emitted (`en-IN/en-AE/en-US/x-default`) but currently self-refers;
  its value unlocks once corridor pages exist.

## 🟡 Shelf currency

- Keep `GIFT_SHELF.curatedAsOf` in `lib/constants.ts` current when the desk
  reviews the inbound/outbound shelves.
