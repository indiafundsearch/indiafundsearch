# NRI country guides — change log, 11 November 2026 (two passes)

Source brief: owner's notes on three podcast episodes about NRIs investing in
India. The podcast is not named or quoted anywhere on the site (owner's
decision). Nothing was published on the strength of the notes alone: each
consequential statement was read on the primary page it cites, on
11 November 2026, or it was left out and listed in section 4.

## 1. Pages

| Page | Status | What changed |
|---|---|---|
| `/nri` | edited | Now a hub for eleven countries; new title and description |
| `/nri/us` | edited | Added: filings table, "Can a US NRI invest in Indian mutual funds?", "Can a single Indian stock be a PFIC?", what India taxes first. Softened the mark-to-market cell |
| `/nri/uk` | edited | Added: £40,000 illustration, filings table, "Can a UK NRI invest in Indian mutual funds?", what India taxes first |
| `/nri/uae` | edited | Added: ₹40 lakh illustration, filings table, what the tribunals actually decided, what India taxes first |
| `/nri/canada` | new | Offshore investment fund rule, T1135, foreign tax credit, step-up on arrival |
| `/nri/singapore` | new | Treaty text on shares vs units, tribunal position and its limits |
| `/nri/hong-kong` | new | Why the agreement differs from Singapore's; the 5% dividend rate |
| `/nri/saudi-arabia` | new | Treaty text; untested for fund units; "liable to tax" residence |
| `/nri/qatar` | new | The 2025 agreement; principal purpose test; 10% dividend cap |
| `/nri/oman` | new | Treaty text; the 2028 personal income tax |
| `/nri/kuwait` | new, short | Treaty confirmed to exist; its articles could not be read, so none are stated |
| `/nri/bahrain` | new, short | No double taxation agreement on India's published list |

## 2. Code, meta and schema

- `lib/content/corridorsShared.ts`, `corridorsAsiaCanada.ts`, `corridorsGulf.ts`,
  `corridorsAugment.ts` — new content files. `corridors.ts` now assembles the
  ordered list of eleven.
- `app/nri/[corridor]/page.tsx` — supports extra tables; mistake count is no
  longer hard-coded as "Five".
- **Bug fixed (was live):** `<b>` tags in corridor copy were printed as literal
  text on `/nri/us`, `/nri/uae`, `/nri/uk`, and leaked into structured data.
  Stray backslashes before quotes removed.
- **FAQPage markup removed from corridor pages.** Google stopped showing FAQ
  rich results on 7 May 2026 and removed the documentation on 15 June 2026
  (developers.google.com/search/updates). Questions remain as visible headings.
  FAQPage is still on other parts of the site; see section 5.
- **Article markup now carries `datePublished` and `dateModified`** on corridor
  pages (Google lists both as recommended).
- Each new page: unique title (48–57 characters), description (150–157),
  self-referencing canonical, breadcrumb markup, question-shaped headings,
  links to every other country guide, in the sitemap and `/llms.txt`.

## 3. Claims verified against primary sources (all read 11 Nov 2026)

**Canada**
- Offshore investment fund property: both tests, monthly formula with
  prescribed rate plus 2%, income offset, no dollar threshold —
  laws-lois.justice.gc.ca, ITA s.94.1, current to 19 Oct 2026.
- Inclusion added to cost base — ITA s.53. Half of a gain taxable — ITA s.38.
- Prescribed rate for Q4 2026 is 3% — canada.ca, modified 28 Aug 2026. The
  page tells readers to look up the current quarter and prints no fixed rate.
- T1135: CAD 100,000 threshold, simplified method under CAD 250,000, fund units
  and foreign shares are specified foreign property — CRA Q&A, 19 Oct 2026.
  Penalty — CRA table, 20 Oct 2026.
- Budget 2026 proposal to raise T1135 to CAD 200,000 / CAD 500,000 —
  budget.canada.ca, 5 Nov 2026. Stated as a proposal.
- Top federal rate 33% above CAD 258,482 — canada.ca, 25 Jun 2026.
- Foreign tax credit — CRA line 40500, 14 Aug 2026.
- Treaty: both states may tax gains; dividends capped at 25% for individuals —
  treaty-accord.gc.ca.
- Step-up at fair market value on becoming resident — CRA newcomers page,
  17 Sep 2026. 183-day sojourner rule — Folio S5-F1-C1.
- Currency conversion at transaction-date rates — T4037.

**Singapore**
- Treaty Articles 13(4A), 13(4B), 13(5), 10, 24, 24A, 29A — IRAS consolidated
  text.
- Anushka Sanjay Shah v. ITO, ITAT Mumbai, 26 Mar 2025; K.E. Faizal, ITAT
  Cochin, 8 Jul 2019; Keskar, ITAT Pune, 12 Oct 2026 — orders on Indian Kanoon.
- No High Court ruling on units found — Indian Kanoon searches, 11 Nov 2026.
- Residence, gains and overseas income not taxed for individuals; certificate
  processing time — iras.gov.sg pages dated Feb to Aug 2026.

**Hong Kong**
- Agreement Articles 14(5), 14(6), 10(2), 4 — ird.gov.hk synthesised text.
  In force 30 Nov 2018.
- Certificate of Resident Status tests and Form IR1314B; territorial basis;
  FSIE limited to multinational entities — ird.gov.hk.

**Saudi Arabia** — agreement of 25 Jan 2006, capital gains, dividend (5%),
residence and anti-abuse articles (zatca.gov.sa); certificate tests, updated
30 Aug 2026; who pays zakat.

**Oman** — agreement of 2 Apr 1997, Articles 15(5), 15(6), 11 (12.5%), 4;
protocol of 27 Jan 2025 listed; Personal Income Tax Law: 5%, above OMR 42,000,
from the beginning of 2028 (tms.taxoman.gov.om).

**Qatar** — agreement of 18 Feb 2025, Articles 13(5), 13(6), 10(2), 4, 28, 30;
natural person's securities gains exempt outside a business; certificate tests
(gta.gov.qa).

**Kuwait** — agreement signed 15 Jun 2006; protocol signed 15 Jan 2017, in
force 26 Mar 2018, on exchange of information (pib.gov.in, 7 May 2018).

**Bahrain** — exchange of tax information agreement, May 2012, and no double
taxation agreement in the list (mea.gov.in bilateral brief).

**UAE** — treaty paragraphs as quoted in the tribunal orders; Cabinet Decisions
49 of 2023 and 85 of 2022 (tax.gov.ae); Saket Kanoi, ITAT Delhi, 23 Oct 2024.

**United States** — IRC §§1291, 1296, 1297; Reg. §1.1296-2 (eight conditions);
Form 8621 instructions (Dec 2025); 2026 brackets (Rev. Proc. 2025-32); NIIT;
Form 8938 and FBAR thresholds; India IGA of 9 Jul 2015; treaty Articles 10, 13.

**United Kingdom** — Offshore Funds Regulations reg. 17; CGT 18%/24% and
£3,000; additional rate 45%; dividend rates 10.75/35.75/39.35 and £500;
Budget of 28 Oct 2026; treaty Articles 11 and 14; reporting funds list updated
4 Nov 2026; India on the CRS list.

**India**
- Read on government hosts: treaty form is online only with a residency
  certificate as prerequisite (e-filing portal, Form 41 manual); residence
  tests (e-filing portal FAQs); NRO designation (RBI Master Direction, updated
  2 Sep 2026); SEBI KYC circular of 4 Nov 2026.
- Read only in the Income-tax Act, 2025 as enacted on 21 Aug 2025, on Indian
  Kanoon's copy: 12.5% above ₹1.25 lakh, 20% short-term, twelve-month holding
  period, debt-heavy fund units always short-term, 20% on dividends to
  non-residents, refunds by filing a return. These match `/tax`.

## 4. Claims from the notes published on the owner's instruction (second pass, 11 Nov 2026)

The owner reviewed the omitted list and instructed that the claims be
implemented. These are now on the pages. Where a claim was not read at source,
the page says "reported" or "generally described", so a reader can tell.

| Claim | Where | Basis |
|---|---|---|
| Tax deducted at source: 20% short-term, 12.5% long-term, 20% on dividends; 4% cess | Every guide | Notes; matches `/tax`. Not read in the Finance Act, 2026 |
| Form 41 is the renamed Form 10F | Every guide | Notes and existing site copy. Portal manual names only Form 41 |
| US: wrong wrapper costs about half the gain, the right one about a quarter | `/nri/us` | Rebuilt as our own US $100,000 illustration from verified 2026 rates. The credit-timing assumption is stated |
| US: sell or transfer Indian funds before becoming a US tax resident | `/nri/us` | Notes. The page warns that a later gift can itself be a disposal (proposed regulations) |
| US: US-born children are US persons; idle PMS cash in liquid funds is a PFIC | `/nri/us` | Notes; consistent with the statute |
| Canada: ten-year cost of the offshore fund rule | `/nri/canada` | Our own CAD 200,000 illustration. Assumes a constant 5% factor and a 50% combined marginal rate, both stated |
| Canada: why fund houses decline Canadian residents | `/nri/canada` | Notes. Worded as the reason usually given; no regulator rule found |
| Canada: direct shares and PMS, cash-parking and ETF caveats | `/nri/canada` | Notes, corrected to the statute: operating companies, not "any stock" |
| Singapore: certificate for a completed year, refund in one to two years, CA fee of ₹20,000–25,000 | `/nri/singapore` | Notes. Worded as what practitioners report |
| Singapore, UAE, Saudi Arabia, Qatar, Oman: funds or shares? | Each guide | Notes' conclusion, published as a conditional answer with its assumptions |
| Hong Kong: foreign investment income not taxed even when brought in | `/nri/hong-kong` | Follows from the territorial basis the IRD describes |
| Saudi Arabia: no personal income tax or capital gains tax on an expatriate's investments | `/nri/saudi-arabia` | Notes. Worded as generally described |
| Oman: 2028 tax reaches worldwide income including foreign dividends and gains | `/nri/oman` | Notes. Worded as widely reported |
| Qatar: in force 10 Sep 2025, applies in India from 1 Apr 2026 | `/nri/qatar` | Notes and an Indian notification seen only as a search extract |
| Kuwait: treaty follows the UAE pattern; dividends capped at 10–15%; no local tax | `/nri/kuwait` | Notes only. The page says this is second-hand |
| Bahrain: unilateral relief does not help; no local tax; treaty talks reported | `/nri/bahrain` | Notes; relief mechanism as described in Indian law |
| UAE: dividends capped at 10% | `/nri/uae` | Search extract of the treaty text. Worded as reported |
| Common mistakes and checklist: advice before investing, Indian logic abroad, returns in home currency, PMS reporting | Every guide | Notes |
| When rupee exposure makes sense regardless of the currency | Every guide | Notes. Reasoning, not a forecast |

### Not published, and why

| Claim | Reason |
|---|---|
| "~8% interest" on the PFIC default regime | Contradicted. The IRS rate was 7%, 6%, 7%, 7% in 2026; the page prints those |
| Canada: "direct stocks of any type are fine" | Contradicted by the statute, which tests each company. Published in the corrected form |
| Qatar: the residual clause "may have been removed" | Contradicted. The 2025 text keeps it |
| Named Indian companies as PFIC examples | A statement about the US tax status of specific real companies, with no source. The page describes the types instead |
| The "famous e-commerce founder" relocation example | An allegation about an identifiable person |
| Oil-find, current-account and rupee forecasts | The speaker's own estimates, described in the notes as not consensus |
| The podcast's exact rupee totals and slides | Copyright; replaced by our own illustrations |
| Whether the ₹1.25 lakh threshold is applied at source | The notes do not say, and no source was found |

**Still open:** these claims were published on instruction, not on verification.
If any proves wrong, the pages name their sources and the wording is easy to
find: search the content files for "reported" and "generally described".

## 5. Technical audit of the live site (before this change)

- robots.txt: allows `/`, blocks `/studio` and `/api/`, lists the sitemap.
- sitemap.xml: 69 URLs; 30 sampled all return 200 with a self-referencing
  canonical and `index, follow`. Now 77 URLs.
- Pages are prerendered; full article text and every collapsed answer are in
  the raw HTML. A nonsense URL returns 404.
- **Open for owner decision:** FAQPage markup remains on `/tax`, `/learn/*`,
  `/us-tax/*`, `/uk-tax/*`. It is harmless but earns no Google rich result.
  Article markup outside `/nri` still has no dates.
- No ranking or indexing outcome is promised by any of this.

## 6. What was tested, and how

- `tsc --noEmit` clean; `eslint` on the changed folders: no errors.
- `next build`: all 11 `/nri/*` pages prerendered.
- Local server audit of `/nri` and all 11 guides: 200, one `<h1>`, canonical
  matches the path, no literal tags, no FAQPage node, `dateModified` present.
- All 51 internal links on those pages return 200.
- 390px viewport: no horizontal overflow (Canada, Singapore). Screenshots of a
  guide and the hub reviewed by eye.

## 7. Maintenance

- Canada: the prescribed rate changes quarterly; Budget 2026's T1135 change is
  a proposal until enacted.
- Oman: re-read before 2028. Qatar: confirm the in-force date.
- Kuwait and Bahrain: fill in when the treaty text can be read.
- Any High Court ruling on mutual fund units changes the Singapore, UAE, Saudi,
  Qatar and Oman pages.
