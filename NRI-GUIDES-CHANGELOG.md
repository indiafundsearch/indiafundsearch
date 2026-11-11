# NRI country guides — change log, 11 November 2026

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

## 4. Claims omitted — for owner review

Not published. Each is either unverifiable from here or contradicted.

| Claim in the notes | Why it is out |
|---|---|
| Percentage of tax deducted at source on sale or redemption (20% / 12.5%) | Depends on the Finance Act, 2026, which could not be read. incometaxindia.gov.in refuses automated readers |
| Whether the ₹1.25 lakh threshold is applied at source | Not found in any source read |
| Anything the Finance Act, 2026 changed; cess rate for tax year 2026-27 | Not read |
| "Form 10F is now Form 41" | The portal manual names Form 41 and never mentions Form 10F. New copy says "India's treaty-information form". **Decision needed:** existing pages still say "Form 10F, now Form 41" |
| FATCA/CRS rule and form numbers under the 2026 Rules | Search snippets only |
| Combined US cost of ~50% on mutual funds, ~24% on stocks; "57%" trapped-loss example | Podcast arithmetic. Replaced with mechanism and verified rates |
| "~8% interest charge" under the PFIC default regime | IRS underpayment rate was 7%, 6%, 7%, 7% across 2026 |
| Gift or transfer Indian funds to family before moving to the US | Rests on proposed regulations never finalised; a gift can itself be a disposition |
| Named Indian companies as PFIC examples | Unverifiable; would be a statement about real companies |
| Why Indian fund houses decline US and Canadian residents | No SEBI, AMFI or Canadian regulator source read for the Canadian explanation |
| Canada: "direct stocks of any type are fine" | The rule tests each company; a blanket statement is wrong |
| Canada: combined ~50% marginal rate; ~₹31 lakh / ₹68 lakh totals | Provincial rates not verified; totals assume a fixed prescribed rate |
| Canada: how courts have applied the motive test | Case law not read at source |
| Singapore: certificates issued only after the year ends; refunds take 1–2 years | IRAS individual page says nothing on years |
| Singapore: CA fee of ₹20–25k | Not a verifiable fact |
| Singapore/Gulf: "mutual fund route clearly preferable" | Blanket verdict; excluded by the brief |
| Hong Kong: offshore income not taxed "even if remitted" | No IRD sentence in those words |
| Saudi Arabia: no tax at all on an expatriate's investment income; treaty in-force date | No official statement read |
| Dividend rates "10–15% for others" in the Gulf | Read per treaty instead: Saudi 5%, Qatar 10%, Oman 12.5% (1997 text). UAE current rate and Kuwait rate not read, so not stated |
| Kuwait: capital gains, residence and dividend articles | Kuwait's finance ministry site refused the connection; no Indian order quotes them |
| Oman: what the January 2025 protocol changed; whether the 2028 tax covers foreign dividends and gains; certificate procedure | Protocol link serves the wrong file; law text unreadable |
| Qatar: date the 2025 agreement entered into force (reported as 10 Sep 2025) | Search snippet only |
| Bahrain: Section 91 relief; reported start of treaty negotiations | Joint statement text could not be read |
| Macro views (rupee depreciation, oil find, current account) | Speaker opinion, out of scope |

**One contradiction found:** the notes say the Qatar treaty "may have removed"
the residual clause. The 2025 text keeps it (Article 13(6)).

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
