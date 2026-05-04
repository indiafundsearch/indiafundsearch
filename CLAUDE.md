---
name: indiafundsearch-builder
description: >
  Build and maintain IndiaFundSearch.com — an education-first platform for
  discovering PMS, AIF, SIF, and GIFT City investments in India.
  Full-stack Next.js 16 + Sanity CMS + Vercel deployment.
  This is NOT a distributor site. It educates investors and generates
  leads for Beyond Wealth, a wealth advisory practice in Vadodara, Gujarat.
version: 1.1.0
tags:
  - coding
  - web-development
  - nextjs
  - sanity
  - typescript
tools:
  - coding-agent
  - read
  - write
  - edit
  - bash
---

# IndiaFundSearch.com — Complete Build Specification

## Amendment Log

- **v1.1.0 (2026-05-04)** — adapted to scaffold reality:
  - Next.js pinned to **16+** (was "14+"). Scaffolded with `create-next-app@latest` which installed 16.2.4. Note: Next 16 has breaking changes from 14 — `params` and `searchParams` are async in route handlers and dynamic pages, caching defaults shifted, server-action conventions changed. When in doubt, read `node_modules/next/dist/docs/` rather than relying on training-data memory.
  - React **19** (Next 16 dependency).
  - Tailwind **4+** (was "3+"). Tailwind 4 has **no `tailwind.config.ts`** — design tokens go in `app/globals.css` via `@theme` directives. The Project File Structure section reflects this.
  - Package manager: **npm** (was "pnpm"). pnpm is not available on this machine. Lockfile: `package-lock.json`.

---

## What This Project Is

IndiaFundSearch.com is the ONLY education-first platform in India for discovering
PMS (Portfolio Management Services), AIF (Alternative Investment Funds),
SIF (Specialised Investment Funds), and GIFT City investments.

It is NOT a distributor. It does NOT sell financial products. It educates
investors and generates leads for Beyond Wealth, a wealth advisory practice.

The domain indiafundsearch.com is a strategic permanent asset.

The core positioning: "The Morningstar of Indian alternatives — where the
product is understanding, not placement."

---

## Tech Stack — Mandatory, Do Not Deviate

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16+ |
| React | React | 19+ |
| Language | TypeScript (strict mode) | 5+ |
| Styling | Tailwind CSS | 4+ |
| UI Components | shadcn/ui | latest |
| Charts | Recharts | latest |
| Animations | Framer Motion | latest |
| CMS | Sanity.io v3 | 3+ |
| CMS Studio | Embedded at /studio route | — |
| Email | Resend | latest |
| Hosting | Vercel | — |
| Analytics | Plausible | — |
| Package Manager | npm | — |
| Sitemap | next-sitemap | latest |

---

## Design System — Every Pixel Matters

```
TYPOGRAPHY
  Font Family:     Outfit (Google Fonts)
  Weights:         300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
  Heading Scale:   clamp(28px, 4.5vw, 42px) for h1, scale down proportionally
  Body:            16-17px, line-height 1.6
  Letter Spacing:  -0.02em for headings, normal for body

COLOURS
  Background:      #fafafa
  Text Primary:    #1d1d1f
  Text Muted:      #86868b
  Gold Accent:     #b8960c — USE SPARINGLY (accents, active states, small UI only)
  Card Background: #ffffff
  Card Border:     rgba(0, 0, 0, 0.08)
  Error/Warning:   #c0392b (used in FD Visualiser for erosion display)

SPACING & SHAPE
  Border Radius:   12px (cards), 8px (buttons), 100px (pills/badges)
  Card Shadow:     0 2px 12px rgba(0, 0, 0, 0.06)
  Card Hover:      0 4px 20px rgba(0, 0, 0, 0.10)
  Page Padding:    24px mobile, 48-80px desktop
  Max Content:     720px for text, 1200px for grids

AESTHETIC
  Apple "Quiet Luxury" minimalism
  Generous whitespace — when in doubt, add more
  No clutter, no visual noise
  Premium but not flashy
```

These tokens live in `app/globals.css` under a `@theme` block (Tailwind 4 convention). They become Tailwind utility classes (e.g. `bg-background`, `text-text-primary`, `text-gold`).

### Design Hard Rules — NEVER Break These

1. NEVER use Inter, Roboto, Arial, or system fonts — ONLY Outfit
2. NEVER use purple gradients or neon colours
3. NEVER use harsh drop shadows
4. Gold (#b8960c) is for accent text, active states, and small elements ONLY — never backgrounds
5. All financial numbers MUST use Indian formatting: ₹1,00,000 NOT ₹100,000
6. No spinners for loading — use skeleton screens
7. Mobile-first design — every component must work on 390px viewport

---

## Coding Conventions

- Functional React components with hooks ONLY
- TypeScript strict mode — zero `any` types
- `"use client"` directive on ALL interactive components
- Component files: PascalCase (FeeXRay.tsx, Diagnostic.tsx)
- Utility files: camelCase (formatCurrency.ts, calculateFees.ts)
- Components MUST stay under 200 lines — split into subcomponents if larger
- Descriptive variable names, no abbreviations
- ALL fund data fetched from Sanity CMS — NEVER hardcode fund data in components
- Use GROQ queries for Sanity data fetching
- Error boundaries on every page
- Loading states with skeleton screens

### Next 16 specifics

- Dynamic route `params` and `searchParams` are **Promises**. Always `await` them in page components and route handlers. Example: `export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; ... }`
- Default fetch caching is opt-in. Annotate with `{ next: { revalidate: N } }` or `cache: 'force-cache'` explicitly.
- For Sanity queries, prefer `next-sanity`'s `defineLive` / `loadQuery` patterns.

---

## Project File Structure

```
indiafundsearch/
├── app/
│   ├── layout.tsx                    # Root layout: Outfit font, Header, Footer
│   ├── globals.css                   # Tailwind 4 @theme tokens + base styles
│   ├── page.tsx                      # Homepage
│   ├── explore/
│   │   ├── page.tsx                  # Fund browser with filters
│   │   └── [slug]/
│   │       └── page.tsx              # Individual fund detail page
│   ├── knowledge/
│   │   ├── page.tsx                  # Knowledge Centre (Translator tool)
│   │   └── [slug]/
│   │       └── page.tsx              # Individual glossary term page (SEO)
│   ├── insights/
│   │   ├── page.tsx                  # Blog/articles index
│   │   └── [slug]/
│   │       └── page.tsx              # Individual article
│   ├── gift-city/
│   │   └── page.tsx                  # NRI / GIFT City content
│   ├── about/
│   │   └── page.tsx                  # Beyond Wealth story + Diagnostic CTA
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx              # Sanity Studio (CMS admin panel)
│   └── api/
│       ├── lead-capture/
│       │   └── route.ts              # POST: save lead to Sanity + send email
│       └── revalidate/
│           └── route.ts              # Webhook: Sanity triggers page rebuild
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Nav bar + Simple/Pro toggle
│   │   ├── Footer.tsx                # Footer + trust strip + disclaimer
│   │   └── MobileNav.tsx             # Hamburger menu for mobile
│   ├── lead-magnets/
│   │   ├── FeeXRay.tsx               # Lead Magnet #1: Fee calculator
│   │   ├── Diagnostic.tsx            # Lead Magnet #2: 12-question readiness test
│   │   ├── Scorecard.tsx             # Lead Magnet #3: 20-criteria PMS scorer
│   │   ├── FDVisualiser.tsx          # Lead Magnet #4: FD erosion animation
│   │   └── Translator.tsx            # Lead Magnet #5: Glossary + product map
│   ├── fund/
│   │   ├── FundCard.tsx              # Card component for explore grid
│   │   ├── FundFilters.tsx           # Product + subcategory filter bar
│   │   └── FundDetail.tsx            # Full fund information layout
│   ├── ui/                           # shadcn/ui primitives
│   └── shared/
│       ├── SimpleProToggle.tsx        # Global language toggle (persisted in localStorage)
│       ├── EmailCaptureModal.tsx      # Reusable email gate modal
│       ├── CTACard.tsx                # Reusable lead magnet CTA block
│       └── IndianNumber.tsx           # ₹ Indian formatting component
├── lib/
│   ├── sanity/
│   │   ├── client.ts                 # Sanity client configuration
│   │   ├── queries.ts                # All GROQ queries
│   │   └── schemas/
│   │       ├── index.ts              # Schema registry
│   │       ├── fund.ts               # Fund document schema
│   │       ├── glossaryTerm.ts       # Glossary term schema
│   │       ├── article.ts            # Article/blog schema
│   │       └── leadCapture.ts        # Lead capture schema
│   ├── utils/
│   │   ├── formatCurrency.ts         # Indian number formatting utility
│   │   ├── calculateFees.ts          # Fee X-Ray calculation engine
│   │   ├── diagnosticScoring.ts      # Diagnostic scoring algorithm
│   │   └── scorecardLogic.ts         # Scorecard weighted scoring
│   └── constants.ts                  # Design tokens, category mappings, Simple/Pro maps
├── public/
│   ├── og-image.png                  # Open Graph social share image
│   └── favicon.ico
├── sanity.config.ts                  # Sanity Studio configuration
├── sanity.cli.ts                     # Sanity CLI configuration
├── postcss.config.mjs                # PostCSS config for Tailwind 4
├── next.config.ts
├── package.json
└── .env.local                        # Sanity project ID, dataset, API tokens
```

Note: there is **no `tailwind.config.ts`** — Tailwind 4 reads design tokens from `app/globals.css` via `@theme`.

---

## Sanity CMS Schemas

### Schema 1: Fund

```typescript
export default {
  name: 'fund',
  title: 'Funds',
  type: 'document',
  fields: [
    { name: 'name', title: 'Fund Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'provider', title: 'Provider', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['PMS', 'AIF Cat I', 'AIF Cat II', 'AIF Cat III', 'SIF'] }
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          'Equity', 'Multi-Cap', 'Small-Mid Cap', 'Thematic', 'Sector',
          'Real Estate', 'Infra Debt', 'Pre-IPO', 'Private Equity', 'Credit',
          'Long-Short', 'Quant', 'Multi-Strategy',
          'Venture Capital', 'Social Impact', 'SME'
        ]
      }
    },
    { name: 'simpleDescription', title: 'Simple Description (12-year-old language)', type: 'text', rows: 3 },
    { name: 'proDescription', title: 'Pro Description (technical)', type: 'text', rows: 3 },
    {
      name: 'simpleCategoryName',
      title: 'Simple Category Name',
      type: 'string',
      description: 'e.g. "Stock Picking Funds" instead of "PMS Equity"'
    },
    {
      name: 'fees',
      title: 'Fee Structure',
      type: 'object',
      fields: [
        { name: 'managementFee', title: 'Management Fee (%)', type: 'number' },
        { name: 'performanceFee', title: 'Performance Fee (%)', type: 'number' },
        { name: 'hurdleRate', title: 'Hurdle Rate (%)', type: 'number' },
        { name: 'exitLoad', title: 'Exit Load (%)', type: 'number' },
      ]
    },
    {
      name: 'returns',
      title: 'Returns (CAGR %)',
      type: 'object',
      fields: [
        { name: 'oneYear', title: '1 Year', type: 'number' },
        { name: 'threeYear', title: '3 Year', type: 'number' },
        { name: 'fiveYear', title: '5 Year', type: 'number' },
        { name: 'sinceInception', title: 'Since Inception', type: 'number' },
      ]
    },
    { name: 'minInvestment', title: 'Minimum Investment (₹)', type: 'number' },
    { name: 'aum', title: 'AUM (₹ Crore)', type: 'number' },
    { name: 'fundManager', title: 'Fund Manager Name', type: 'string' },
    { name: 'fundManagerBio', title: 'Fund Manager Bio', type: 'text' },
    { name: 'benchmark', title: 'Benchmark Index', type: 'string' },
    { name: 'sebiRegistration', title: 'SEBI Registration No.', type: 'string' },
    { name: 'inceptionDate', title: 'Inception Date', type: 'date' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Active', 'Closed', 'Upcoming'] },
      initialValue: 'Active'
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'provider' }
  }
}
```

### Schema 2: Glossary Term

```typescript
export default {
  name: 'glossaryTerm',
  title: 'Glossary Terms',
  type: 'document',
  fields: [
    { name: 'term', title: 'Term', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'term' } },
    {
      name: 'simpleDefinition',
      title: 'Simple Definition',
      type: 'text',
      rows: 3,
      description: 'Explain like the reader is 12 years old'
    },
    {
      name: 'proDefinition',
      title: 'Pro Definition',
      type: 'text',
      rows: 3,
      description: 'Technical, CA-grade precision'
    },
    {
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'string',
      description: 'One sentence connecting this term to an investment decision'
    },
    {
      name: 'relatedProducts',
      title: 'Where You Encounter This',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['PMS', 'AIF', 'SIF', 'GIFT City', 'All'] }
    },
    {
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }]
    },
  ]
}
```

### Schema 3: Article

```typescript
export default {
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'author', title: 'Author', type: 'string', initialValue: 'IndiaFundSearch' },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Market Commentary', 'Education', 'Fund Analysis', 'Regulation'] }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ]
}
```

### Schema 4: Lead Capture

```typescript
export default {
  name: 'leadCapture',
  title: 'Lead Captures',
  type: 'document',
  fields: [
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'city', title: 'City', type: 'string' },
    {
      name: 'source',
      title: 'Lead Magnet Source',
      type: 'string',
      options: { list: ['Fee X-Ray', 'Diagnostic', 'Scorecard', 'FD Visualiser', 'Translator Pathfinder'] }
    },
    { name: 'diagnosticVerdict', title: 'Diagnostic Verdict', type: 'string' },
    { name: 'diagnosticScore', title: 'Diagnostic Score', type: 'number' },
    {
      name: 'feeXRayInputs',
      title: 'Fee X-Ray Inputs',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Investment Amount', type: 'number' },
        { name: 'feeType', title: 'Fee Structure Type', type: 'string' },
        { name: 'expectedReturn', title: 'Expected Return %', type: 'number' },
        { name: 'timeHorizon', title: 'Time Horizon (years)', type: 'number' },
      ]
    },
    { name: 'scorecardPMS', title: 'PMS Evaluated (Scorecard)', type: 'string' },
    { name: 'investableSurplus', title: 'Investable Surplus Range', type: 'string' },
    {
      name: 'createdAt',
      title: 'Captured At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
  ],
  orderings: [{ title: 'Newest First', name: 'newest', by: [{ field: 'createdAt', direction: 'desc' }] }]
}
```

---

## Simple/Pro Toggle Logic

The site has a GLOBAL language toggle that changes content everywhere:

| Element | Simple Mode (Default) | Pro Mode |
|---|---|---|
| PMS Equity | "Stock Picking Funds" | "PMS — Equity" |
| AIF Cat II | "Private Deals Fund" | "AIF Category II" |
| AIF Cat III | "Hedge Funds" | "AIF Category III — Long Short" |
| SIF | "New ₹10L Funds" | "Specialised Investment Funds" |
| Fund descriptions | simpleDescription field from CMS | proDescription field from CMS |
| Glossary definitions | simpleDefinition field | proDefinition field |

Toggle state persisted in localStorage. Default: Simple mode.
Toggle component lives in Header, visible on every page.

---

## The 7 Website Pages

### Page 1: Homepage (/)

**Section 1 — Hero (above the fold):**
Lead Magnet #4 (FD Visualiser) embedded directly — NOT a link to another page.
- Headline: "Your ₹1 Crore FD isn't growing. It's quietly shrinking."
- Two inline dropdowns: FD Amount + Tax Bracket
- "Show Me →" button
- Result appears inline with animated number counter (Framer Motion)
- Below result: comparison table (FD vs Debt MF vs Balanced PMS vs Equity PMS over 10 years)
- "Email this to yourself" link → opens EmailCaptureModal

**Section 2 — Fund Preview:**
- "Explore What Your Surplus Could Earn"
- Horizontal scroll of 6 fund cards from Sanity CMS
- "Explore All →" link to /explore

**Section 3 — Diagnostic CTA:**
- CTACard component with:
  - Badge: "FREE ASSESSMENT"
  - Headline: "Should you even look at PMS or AIF?"
  - Subtext: "Most people aren't ready. Find out in 3 minutes."
  - Button: "Take the Diagnostic →"
  - Micro-copy: "12 questions · 4 verdicts · No sales pitch"

**Section 4 — Trust Strip:**
- "✦ No login required · ✦ No distributor commissions · ✦ 100% education-first"

### Page 2: Explore (/explore)

- Two-tier filter bar:
  Level 1: PMS / AIF / SIF / All
  Level 2: Subcategories (changes based on Level 1 selection)
- Fund cards in responsive grid (3 columns desktop, 1 mobile)
- Each card: name, provider, category badge, returns (1Y/3Y/5Y), fee headline, min investment
- Grid/List view toggle
- Simple/Pro toggle changes category names on cards
- Sticky bottom bar: "Comparing options? See what you'll actually pay → Fee X-Ray Calculator"

### Page 3: Fund Detail (/explore/[slug])

- Dynamic page per fund from Sanity
- Fund header: name, provider, category badge, SEBI reg number
- Returns table: 1Y, 3Y, 5Y, Since Inception
- Fee section with breakdown + "Calculate your real cost →" button
  → Opens Fee X-Ray PRE-FILLED with this fund's fee structure from CMS
- Fund manager info
- Strategy description (uses Simple/Pro toggle)
- Scorecard CTA: "Score [Fund Name] on 20 criteria before you commit"
- Related funds: 3 cards of similar category

### Page 4: Knowledge Centre (/knowledge)

This IS Lead Magnet #5 (Translator). NOT a separate tool — this IS the page:
- Search bar at top: "Search any investment term"
- Product Map: visual navigator from FD → GIFT City (clickable nodes)
- Pathfinder: 3-question "Which one is for me?" quick assessment
- A-Z Glossary: all terms from Sanity, searchable, with Simple/Pro toggle
- Each term links to /knowledge/[slug] (individual page for SEO)
- UNGATED — no email required. This is the SEO engine.

### Page 5: Insights (/insights)

- Blog/article index from Sanity
- Category filters: Market Commentary, Education, Fund Analysis, Regulation
- Article cards with featured image, title, date, category badge
- Individual articles at /insights/[slug]

### Page 6: GIFT City (/gift-city)

- NRI-focused content
- Translator Pathfinder embedded (NRI-contextualised version)
- 3 questions: country of residence, FEMA status, repatriation needs

### Page 7: About (/about)

- Beyond Wealth story and positioning
- "We don't distribute. We educate. When you're ready, we advise."
- Diagnostic CTA as final element: "Are you ready? Take the 3-minute Diagnostic →"

---

## The 5 Lead Magnets — Component Specifications

### Lead Magnet #1: Fee X-Ray (/components/lead-magnets/FeeXRay.tsx)

**Inputs:**
- Investment amount: slider or input (₹25L to ₹5Cr, default ₹50L)
- Fee structure: 3 presets + custom entry
  - Preset A: Fixed Only (2.5% management, 0% performance)
  - Preset B: Hybrid (1.5% mgmt + 15% perf above 10% hurdle)
  - Preset C: Performance Only (0% mgmt + 20% perf above 8% hurdle)
- Expected gross CAGR: slider 8%–25%, default 15%
- Time horizon: slider 3–15 years, default 10

**Outputs (animated with Framer Motion):**
- Panel 1 "Fee Drag": Recharts bar chart, year-by-year showing gross value vs net value vs index fund. Bold label: "₹____ paid in total fees over __ years"
- Panel 2 "Breakeven Alpha": Single number — "Your manager needs ___% annual alpha just to cover fees"
- Panel 3 "Fee Waterfall": Recharts waterfall decomposing fees into management → performance → brokerage (est 0.5% of AUM) → GST (18% on fees) → custody/audit (est ₹25,000/year)

**Pre-fill mode:** When opened from a Fund Detail page, fee structure auto-fills from that fund's CMS data. User only enters amount + time horizon.

**Email gate:** "Email this analysis to yourself" → EmailCaptureModal → POST to /api/lead-capture

### Lead Magnet #2: Diagnostic (/components/lead-magnets/Diagnostic.tsx)

**Format:** Multi-step form, one question per screen, progress bar at top.

**12 Questions:**

Dimension 1 — Capital Structure:
- Q1: Total investable surplus? (Under ₹10L / ₹10-25L / ₹25-50L / ₹50L-1Cr / ₹1-5Cr / ₹5Cr+)
- Q2: % in FDs and savings? (Over 80% / 50-80% / 20-50% / Under 20%)
- Q3: Existing MF/equity portfolio? (None / Under ₹10L / ₹10-50L / Over ₹50L)

Dimension 2 — Liquidity & Timeline:
- Q4: Large expenses next 3 years? (Yes major / Yes moderate / No)
- Q5: Income stability? (Salaried / Business stable / Business variable / Retired)
- Q6: Lock-in comfort? (Under 1Y / 1-3Y / 3-5Y / 5-7Y / 7Y+)

Dimension 3 — Risk Architecture:
- Q7: Largest drop experienced + reaction? (Never >10% / Panicked-sold / Held-lost sleep / Stayed calm / Added more)
- Q8: Portfolio concentration? (Single stock heavy / Sector heavy / Diversified / Don't know)
- Q9: 3-5 year lock-in comfort? (Very uncomfortable / Somewhat / Comfortable / Prefer longer)

Dimension 4 — Knowledge:
- Q10: Can explain PMS vs AIF? (Yes confidently / Roughly / Not really / Never heard of one)
- Q11: Have SEBI-registered advisor? (Yes fee-only / Yes distributor / No self-directed / What's the difference?)
- Q12: Read a PMS factsheet or AIF PPM? (Yes multiple / Yes one / No / What's a PPM?)

**Scoring:** Weighted algorithm. Each answer maps to 0-10 points. Total 0-100.
- 0-30: Verdict A "Not Yet. And That's a Strength." + specific gaps + 12-18 month roadmap
- 31-50: Verdict B "Almost. Close Two Gaps First." + weakest 2 dimensions highlighted
- 51-70: Verdict C "Ready for PMS." + recommended strategy type + 5 questions for first meeting
- 71-100: Verdict D "Ready for PMS + AIF." + allocation logic + product mix

**Output:** Verdict card + radar chart (4 dimensions) + detail accordion.
**Gate:** Results shown on screen. "Download full report" → email + phone + city.

### Lead Magnet #3: Scorecard (/components/lead-magnets/Scorecard.tsx)

User evaluates a SPECIFIC PMS they are considering.
- Step 1: Select or type PMS name (dropdown of 100+ names from CMS, or free text)
- Step 2: Score across 5 dimensions × 4 criteria = 20 total criteria, each rated 1-5
  - A. Manager Quality (co-investment, tenure, team depth, prior record)
  - B. Performance Integrity (full-cycle data, benchmark clarity, risk metrics, AUM trajectory)
  - C. Fee Fairness (cost transparency, alignment, churn disclosure, exit flexibility)
  - D. Operational Robustness (custodian, reporting, SEBI record, communication)
  - E. Suitability Fit (risk match, timeline match, concentration comfort, portfolio gap)
- Output: Radar chart + Strengths/Watch Areas/Red Flags sections
- Gate: "Save and compare with another PMS" → email capture
- Data captured: which PMS evaluated + all 20 scores + email

### Lead Magnet #4: FD Visualiser (/components/lead-magnets/FDVisualiser.tsx)

- Two inputs: FD Amount (dropdown or custom) + Tax Bracket (20% / 30% / highest)
- Animated bar visualization (Framer Motion):
  - Shows ₹1Cr bar shrinking as tax and inflation layers are stripped away
  - Final label: "Real value after 10 years: ₹____"
- Comparison table below: FD vs Debt MF vs Balanced PMS vs Equity PMS
- Designed for screenshotting — clean branded output
- Gate: "Email this to yourself" → email only (lowest friction)

### Lead Magnet #5: Translator (/components/lead-magnets/Translator.tsx)

- Search bar for glossary terms
- Simple/Pro toggle on each definition
- Product Map: visual tree from FD → GIFT City with clickable nodes
- Pathfinder: 3 questions (surplus amount / primary goal / lock-in comfort)
  → Highlights relevant products, greys out irrelevant ones
- UNGATED — this is the SEO engine

---

## Lead Magnet Placement Map

Lead magnets are EMBEDDED in pages, never standalone:

| Page | Lead Magnets Present | How |
|---|---|---|
| Homepage | #4 FD Visualiser + #2 Diagnostic CTA | #4 is the hero section, #2 is mid-page CTA card |
| Explore | #1 Fee X-Ray | Sticky bottom bar or sidebar widget |
| Fund Detail | #1 Fee X-Ray + #3 Scorecard | #1 pre-filled in fee section, #3 as CTA below fund info |
| Knowledge Centre | #5 Translator | IS the entire page (ungated) |
| Insights | #4 FD Visualiser | Inline in FD-related articles |
| GIFT City | #5 Pathfinder | NRI-contextualised version |
| About | #2 Diagnostic | Final CTA: "Are you ready?" |

---

## Email Capture Flow

1. User clicks "Email this to yourself" or "Download full report"
2. EmailCaptureModal appears: email (required) + phone (optional) + city (optional)
3. On submit → POST to /api/lead-capture
4. API route saves to Sanity (leadCapture document type)
5. API route sends branded email via Resend with personalised results
6. Modal closes, shows "✓ Sent! Check your inbox."

---

## SEO Requirements

- Unique meta title + description on every page
- Open Graph image for social sharing
- JSON-LD structured data on articles
- next-sitemap generates sitemap.xml automatically
- Each glossary term gets /knowledge/[term-slug] page (long-tail SEO)
- Canonical URLs on all pages
- Alt text on all images
- Target keywords: "PMS vs AIF", "best PMS India", "PMS fees explained",
  "what is AIF", + every glossary term as a long-tail keyword

---

## Disclaimers (Must Appear on Every Relevant Page)

- Fund pages: "Past performance does not guarantee future results. Data sourced from SEBI public disclosures."
- Fee X-Ray: "Calculations are estimates based on inputs provided. Actual fees may vary. Consult the PMS provider's disclosure document."
- Diagnostic: "This assessment is for educational purposes only and does not constitute financial advice. Consult a SEBI-registered advisor."
- Site footer: "IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. For investment advice, consult a SEBI-registered advisor."

---

## Build Phases (Sequential — Do Not Skip Ahead)

### Phase 1 — Foundation (Days 1-3)
1. Create Next.js 16 project with TypeScript + Tailwind 4 + npm
2. Install all dependencies
3. Configure Sanity Studio at /studio with all 4 schemas
4. Set up Outfit font, design tokens in `app/globals.css` via Tailwind 4 `@theme` directives
5. Build Header with nav + Simple/Pro toggle
6. Build Footer with trust strip + disclaimer
7. Push to GitHub, deploy skeleton to Vercel

### Phase 2 — Core Pages (Days 4-8)
8. Build Homepage with FD Visualiser hero + fund preview + Diagnostic CTA
9. Build Explore page with two-tier filters + fund cards from Sanity
10. Build Fund Detail dynamic page with fee section + related funds
11. Build Knowledge Centre with glossary + product map + pathfinder

### Phase 3 — Lead Magnets (Days 9-16)
12. Build Fee X-Ray calculator with Recharts visualizations
13. Build Diagnostic 12-question flow + scoring + 4 verdict outputs
14. Build Scorecard 20-criteria scorer + radar chart
15. Build FD Visualiser full animated version
16. Build EmailCaptureModal + /api/lead-capture route + Resend integration

### Phase 4 — Content Pages (Days 17-20)
17. Build Insights index + article template
18. Build GIFT City page with NRI pathfinder
19. Build About page with Diagnostic CTA
20. Seed 15 sample funds + 50 glossary terms into Sanity

### Phase 5 — Polish & Deploy (Days 21-25)
21. Mobile responsive polish (test every page at 390px)
22. SEO: meta tags, OG images, sitemap, structured data
23. Plausible analytics integration
24. Performance: image optimization, lazy loading, Lighthouse audit
25. Production deploy to Vercel with custom domain indiafundsearch.com

---

## Critical Business Rules — Never Violate

1. IndiaFundSearch does NOT distribute or sell any financial product. Ever.
2. "No login required · No distributor commissions · 100% education-first" appears on EVERY page with a lead magnet.
3. The Diagnostic tool MUST include a "Not Yet" verdict. This is the core trust differentiator. No distributor will replicate a tool that tells 40% of users to not buy.
4. Fee X-Ray on Fund Detail pages MUST pre-fill with that fund's actual fee data from CMS.
5. SEBI registration number MUST be visible on every fund card and detail page.
6. All returns data MUST have the disclaimer about past performance.
7. Simple mode is the DEFAULT. Pro mode is opt-in.
8. Knowledge Centre is NEVER gated behind email. It is the SEO engine.
9. Indian number formatting (₹1,00,000) everywhere. No exceptions.
10. The aesthetic is Apple Quiet Luxury. If it looks like a typical fintech dashboard with purple gradients, start over.
