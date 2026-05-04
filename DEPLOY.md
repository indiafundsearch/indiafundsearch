# Deploy guide — IndiaFundSearch

This is the runbook for shipping the site to Vercel with the
`indiafundsearch.com` custom domain. It assumes you have:

- The GitHub repo at `github.com:indiafundsearch/indiafundsearch`
- A Vercel account
- A Resend account (optional but recommended)
- DNS access for `indiafundsearch.com`

If anything below already happened in an earlier session, skip it.

---

## 1. Verify the production build locally

```
npm run build
```

This runs `next build` followed by `next-sitemap` (which writes
`/public/sitemap.xml` and `/public/robots.txt`). All pages should
build green. If any fail, fix them before deploying — Vercel will
fail the same way.

---

## 2. Connect the repo to Vercel

1. Go to https://vercel.com/new
2. Import `indiafundsearch/indiafundsearch` from GitHub.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: leave as default (`npm run build`).
5. Output: leave default.
6. Don't deploy yet — set env vars first (next step).

---

## 3. Environment variables

Add these in **Settings → Environment Variables** for the Production
environment. Names must match exactly.

### Required for the site to function

| Name | Source | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity manage console | Currently `kd503dbn` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity manage console | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | constant | `2024-10-01` |
| `SANITY_API_WRITE_TOKEN` | Sanity → API → Tokens | Editor or Write role. Server-only — do **not** expose. |
| `NEXT_PUBLIC_SITE_URL` | constant | `https://indiafundsearch.com` |

### Recommended

| Name | Source | Notes |
|---|---|---|
| `RESEND_API_KEY` | resend.com/api-keys | Without this, the lead-capture API still saves to Sanity but skips the confirmation email. |
| `RESEND_FROM_EMAIL` | constant | `IndiaFundSearch <hello@indiafundsearch.com>` once domain is verified. Until then, use `onboarding@resend.dev`. |
| `SANITY_REVALIDATE_SECRET` | random string you generate | Plug the same value into the Sanity webhook (step 6). |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` | Plausible dashboard | Per-site script URL (e.g. `https://plausible.io/js/pa-XXXXX.js`). Only needed if you're using Plausible. |

---

## 4. First production deploy

1. Click **Deploy** in Vercel. The first build takes ~2 minutes.
2. Verify the temporary `*.vercel.app` URL renders the homepage,
   `/explore`, `/knowledge`, `/diagnostic`, `/tools/fee-x-ray`,
   `/tools/scorecard`, `/insights`, `/about`, `/gift-city`.
3. The `/studio` route should also load (Sanity auth redirects you
   to log in if you aren't already).

---

## 5. Custom domain

1. **Settings → Domains** in Vercel → add `indiafundsearch.com` and
   `www.indiafundsearch.com`.
2. Vercel will show DNS records to add at your registrar.
3. Update DNS:
   - Apex (`indiafundsearch.com`): `A` record pointing to the IP
     Vercel shows (typically `76.76.21.21`).
   - `www`: `CNAME` to `cname.vercel-dns.com`.
4. Wait for propagation (usually a few minutes). Vercel auto-issues
   the SSL certificate once the domain resolves.
5. In Vercel domain settings, set `indiafundsearch.com` as primary
   and have `www.indiafundsearch.com` redirect to it (or vice versa
   — pick one, stick with it).

---

## 6. Sanity webhook for revalidation

Sanity → manage → your project → **API → Webhooks** → Create webhook.

| Field | Value |
|---|---|
| Name | `Vercel revalidation` |
| URL | `https://indiafundsearch.com/api/revalidate` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["fund","glossaryTerm","article"]` |
| Projection | `{ _type, slug }` |
| HTTP method | POST |
| Secret | the same value you set as `SANITY_REVALIDATE_SECRET` |
| Enabled | yes |

Edit a fund in Studio and confirm `/explore` reflects the change
within a minute (or immediately on a hard refresh).

---

## 7. Resend domain verification (only if using Resend)

Go to resend.com → Domains → Add `indiafundsearch.com`. Resend
gives you DNS records (SPF, DKIM, DMARC). Add them at your DNS
provider. Verification takes a few minutes.

Until verified, switch `RESEND_FROM_EMAIL` to
`onboarding@resend.dev` in Vercel — that sender works without DNS
work but lands in spam more often.

---

## 8. Sitemap + robots

`npm run build` runs `next-sitemap` automatically (see the
`postbuild` script). After the first production deploy:

- `https://indiafundsearch.com/sitemap.xml` should list every
  static + SSG route (homepage, marketing pages, all 15 fund detail
  pages, all 50 glossary term pages, all article pages).
- `https://indiafundsearch.com/robots.txt` should disallow
  `/studio`, `/api`, and `/og`.

Submit the sitemap to Google Search Console after the domain
resolves.

---

## 9. Smoke checklist after first deploy

- [ ] Homepage hero animates and shows the bar viz on click.
- [ ] `/explore` filters work; clicking any card opens the detail.
- [ ] Detail page "Calculate your real cost →" opens the Fee X-Ray
      pre-filled with that fund's structure.
- [ ] `/diagnostic` runs end-to-end and shows a verdict + radar.
- [ ] Email modal saves to Sanity (check `Lead Captures` in Studio)
      and — if Resend is configured — sends a real email.
- [ ] `/knowledge` search filters in real time.
- [ ] `/studio` loads and you can edit content.
- [ ] OG image at `https://indiafundsearch.com/og` renders.
- [ ] Plausible (if enabled) shows pageviews after a few minutes.

---

## 10. Common Vercel gotchas

- **`SANITY_API_WRITE_TOKEN` not picked up**: only available to
  server runtime. Don't put it under `NEXT_PUBLIC_*`.
- **Edge runtime errors on `/og`**: must stay
  `export const runtime = 'edge'` and avoid Node-only imports.
- **Sitemap blank**: confirm `postbuild` script is in
  `package.json` and re-deploy.
- **Studio 500**: check that `NEXT_PUBLIC_SANITY_PROJECT_ID` and
  `_DATASET` are both set in production env.
