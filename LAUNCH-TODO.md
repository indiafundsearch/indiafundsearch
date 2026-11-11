# IndiaFundSearch — Launch status & handoff

**Status: LIVE at https://www.indiafundsearch.com** — domain + SSL, leads saving,
email alerts + OTP working, analytics on, all P0/P1/P2/P3 work shipped and
QC-verified. Safe to promote. This file is the running handoff — read it first
in any new session.

---

## ✅ Done (nothing needed)
Domain/SSL · leads → Sanity + email alerts to hello@jslwealth.in · OTP gate
(now GIFT-hub only) · Vercel Analytics ON · Resend verified/working · SEO
(per-page OG, schema, hreflang, sitemap, robots, brand title) · money-keyword
pages · Privacy Policy (/privacy) · tax figures confirmed by owner (caveats
softened) · fund repository cleared for display · registration line removed by
choice · booking CTAs hidden by choice (WhatsApp + forms used instead) ·
nav/sheet numbers aligned 1:1 · **NRI corridor pages live 2026-08-02**
(`/nri`, `/nri/us`, `/nri/uae`, `/nri/uk`) with a real hreflang cluster and the
`Corridor Access List` lead magnet.

---

## ⏳ Pending FROM OWNER (none block promotion) — updated 2026-10-23

1. **AMFI ARN** — rendering as the placeholder `XXXXX` at the owner's request
   (byline on every content page, footer, /about). Held by JSL Wealth
   Management Pvt Ltd. Replace the string in `lib/content/authors.ts`; the
   schema `identifier` switches on automatically once it is not a placeholder.
2. **Headshot** — `image` in `lib/content/authors.ts` is null; byline and /about
   show the "YJ" monogram. Drop a square JPG in `/public` and set the path.
3. ~~IFSCA threshold table~~ — withdrawn by owner 2026-09-12; `/gift-city/thresholds` now 301s to the minimum-investment answer.
4. **Form 8802 user fee / IRS processing time** — now stated as "confirm with
   your CPA" on `/us-tax/form-8802`. Supply the figures if you want them printed.
5. **Canadian thresholds** — `/learn/us-nri-pfic` says Canadian positions are
   not stated here. Needs a Canadian CPA if you want them.
6. **Booking link** — `CONTACT.calendlyUrl` blank; CTAs hidden. Ignored for now.
7. **Corridor access list** — lead magnet promises a reply within one working
   day. Ignored for now.
8. **IndiaFundSearch company page on LinkedIn** — does not exist yet; Beyond's
   page is in `sameAs` meanwhile.
9. **Search Console** — request indexing for /about, /learn/us-nri-pfic and the
   five /gift-city cluster pages; re-request the 13 product pages and the three
   head-term articles after the 2026-10-23 structure pass (capsules + FAQ schema).
10. **Backlinks** — the only lever left that moves the head terms off page 8.
   Even 3–4 links from Indian finance publications or empanelled AMCs.

## 🔎 Indexing status — Search Console inspection, 2026-11-11

41 of 69 sitemap URLs indexed. 28 were not, two months after publishing.
Cause: the tax hubs were 3–4 clicks from the homepage (fixed same day: footer,
homepage and Learn links; corridor hreflang cluster removed; real sitemap
lastmod; IndexNow; /llms.txt). **Owner: request indexing in this order**,
about 10 a day (Search Console caps daily requests):

Day 1 — hubs and the highest-demand pages — ✅ all 10 requested 2026-11-11
- /us-tax · /uk-tax · /us-tax/form-8621 · /us-tax/form-8802
- /uk-tax/hmrc-reporting-funds-list · /nri/us · /nri/uae
- /about · /learn/us-nri-pfic · /gift-city/how-to-invest

Day 2
- /us-tax/pfic-tax-rate · /us-tax/form-8621-instructions
- /us-tax/form-8621-filing-requirements · /us-tax/pfic-reporting-threshold
- /us-tax/us-tax-residency-certificate · /uk-tax/uk-reporting-fund-status
- /uk-tax/offshore-reporting-funds · /uk-tax/reporting-vs-non-reporting-funds
- /gift-city/eligibility · /gift-city/for-resident-indians

Day 3
- /learn/gift-city-vs-mutual-fund-for-nri · /learn/gift-city-minimum-investment
- /learn/gift-city-global-usd · /learn/tax-residency-certificate-uae
- /learn/sif-minimum-investment · /learn/pms-vs-mutual-fund
- /learn/reits-invits · /learn/angel-vc-funds

Bing Webmaster Tools: ✅ site imported from Search Console 2026-11-11; sitemap
read successfully, 69 URLs discovered. ChatGPT search and Copilot draw on
Bing's index.

AI visibility tracking lives in OpenSEO (12 prompts × ChatGPT, Gemini, Google
AI Overviews), re-checked monthly (next: 30 Nov 2026, ~72 credits).

**Baseline, 2026-11-11: 36 answers, 0 brand mentions, 1 citation.** ChatGPT
cited /learn/hmrc-reporting-fund-status-india as its FIRST source, ahead of
gov.uk, for "Which Indian funds have HMRC reporting fund status?" and repeated
the 18 funds / 69 share classes figure. The only page cited is the only page
holding data nobody else has. Zero citations on the US-tax, GIFT City, PMS/AIF
and UAE questions. Pitch drafts for earning links are in OUTREACH.md.

## 🔁 Recurring / ops
- **LinkedIn Post Inspector** — re-run on each URL before posting so cards cache fresh.
- **Google Search Console** — sitemap submitted + indexing requested; just monitor.
  *After 2026-08-02: request indexing for the four new `/nri` URLs.*
- **Corridor pages are dated content.** UK rates, the FIG/TRF deadlines and the
  HMRC reporting-funds list all move. Re-check `lib/content/corridors.ts` and
  bump each corridor's `reviewed` field when you do — the date is on the page.
- **Curation date** — bump `GIFT_SHELF.curatedAsOf` monthly (currently August 2026).

## 🔮 Deferred features
- _(none open — NRI-corridor routes shipped 2026-08-02.)_

---

## 📐 Editorial rule for all Indian tax content — READ BEFORE WRITING

**The Income-tax Act, 1961 was repealed with effect from 1 April 2026** and
replaced by the **Income-tax Act, 2025**. Numbering changed wholesale — s.90 →
s.159, s.115UB → s.224, Form 10F → **Form 41**, and all TDS consolidated into
s.393. Rule 21AB → Rule 75. Every competitor page still quotes 1961-Act numbers.

**So: this site cites NO Indian section numbers.** Indian rules are described by
what they do. Section numbers are used only for (a) foreign law — IRS, HMRC, UAE
FTA, whose numbering is stable — and (b) Indian *regulators* (SEBI, IFSCA, RBI),
whose regulation numbers are stable. A verification pass confirmed the pre-
existing pages already contained zero Indian section citations, so nothing broke.
Keep it that way; `/nri/[corridor]` says so on the page as a freshness signal.
