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

## ⏳ Pending FROM OWNER (none block promotion) — updated 2026-09-11

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
9. **Search Console** — request indexing for the newly indexed URLs listed in
   the 2026-09-11 session report (about, PFIC page, five GIFT City cluster pages).

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
