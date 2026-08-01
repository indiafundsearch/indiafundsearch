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

## 🔁 Recurring / ops
- **LinkedIn Post Inspector** — re-run on each URL before posting so cards cache fresh.
- **Google Search Console** — sitemap submitted + indexing requested; just monitor.
- **Curation date** — bump `GIFT_SHELF.curatedAsOf` monthly (currently August 2026).

## 🔮 Deferred features (also saved in memory — will remind next update)
- NRI-corridor landing routes (US / UAE / UK) — makes hreflang pay off.
