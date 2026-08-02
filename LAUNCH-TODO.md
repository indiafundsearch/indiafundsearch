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
nav/sheet numbers aligned 1:1.

---

## ⏳ Pending FROM OWNER (none block promotion)

1. **`/learn/us-nri-pfic`** — get **US-qualified tax counsel** to write the three
   `[COPY NEEDED]` blocks (search `CopyNeeded` in `app/learn/us-nri-pfic/page.tsx`):
   QEF/Form-8621 per fund, FBAR/8938 thresholds + Canada, and which shelf funds
   accept US persons. Then remove its `noindex` to publish. *Currently hidden;
   the general warning + "talk to desk" already works.*
2. **`/privacy`** — have your compliance/legal adviser glance at it (it's live and
   substantively accurate; just wants a sign-off).
3. **`/about`** — DEFERRED by owner. When ready: supply photo + bio + credentials
   + 1992 lineage + empanelment set (fill `CopyNeeded` blocks in
   `app/about/page.tsx`), then remove its `noindex`. Byline currently → /contact.
4. **Booking link** — optional. If you set up cal.com/Calendly, paste the URL and
   the "Book a conversation" CTAs turn back on (`CONTACT.calendlyUrl`).
5. **Real GIFT products** — optional. Add final fund data in `/studio` (overrides
   the in-code list).
6. **Corridor access list — now a lead magnet, not a page section.** Each
   `/nri/[corridor]` page asks for an email in exchange for "which houses are
   currently open to investors in {country}". Leads arrive in Sanity + by email
   with source **`Corridor Access List`** and the corridor in the Interest
   field. *Owner action:* keep a current per-corridor list (PMS / AIF / GIFT
   houses, minimums, route accepted) ready to send, and reply within one
   working day — the confirmation email promises exactly that.

## 🔁 Recurring / ops
- **LinkedIn Post Inspector** — re-run on each URL before posting so cards cache fresh.
- **Google Search Console** — sitemap submitted + indexing requested; just monitor.
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
