// GENERATED from Beyond — The Architecture of Alternatives (R3), 2026-07.
// Source of truth for educational content. Edit deliberately — copy is compliance-reviewed.
import type { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    "id": "mf",
    "name": "Mutual Funds",
    "tag": "The Baseline",
    "badge": "Mutual Fund",
    "risk": 55,
    "liq": 92,
    "mid": 13,
    "yrs": 5,
    "riskBand": "Moderate–High",
    "liqLabel": "T+1 to T+3",
    "min": "₹500 (SIP)",
    "minL": 0.005,
    "ret": "12–14% p.a. equity · 6–7.5% debt",
    "horizon": "3–7+ yrs",
    "cashflow": false,
    "analogy": "The base layer of most portfolios — pooled, professionally managed, easy to enter and exit. Comfortable and liquid, but built for the many, not tailored to you.",
    "what": "A SEBI-regulated pooled fund that spreads money across 40–80 securities under strict diversification rules. The most liquid and most regulated structure in Indian investing, and the benchmark every alternative has to beat.",
    "solves": [
      "Long-term compounding with full liquidity",
      "Disciplined investing through SIP",
      "A common yardstick to judge everything else against"
    ],
    "benefits": [
      "Daily NAV; redemption in 1–3 working days",
      "Lowest entry point of any structure",
      "Taxed only when you redeem — internal churn is not taxed in your hands"
    ],
    "risks": [
      "Wide diversification caps the upside — a 2% position doubling barely moves the fund",
      "Rules force at least 65% into the mandate, limiting the manager",
      "Many funds quietly track the index after fees"
    ],
    "tax": "Equity funds: STCG 20% under 12 months; LTCG 12.5% beyond 12 months (₹1.25 L exempt/yr). Debt funds (bought after Apr 2023): slab rate.",
    "slug": "mutual-funds",
    "nriNote": "US/Canada-resident NRIs face AMC-level restrictions on many schemes (FATCA); several fund houses do accept them. Investments via NRE/NRO."
  },
  {
    "id": "fdplus",
    "name": "FD+ & Structured Debt",
    "tag": "The Foundation",
    "badge": "FD / Bonds",
    "risk": 15,
    "liq": 72,
    "mid": 7,
    "yrs": 2,
    "riskBand": "Low",
    "liqLabel": "Days to weeks",
    "min": "₹1 L – ₹10 L",
    "minL": 1,
    "ret": "6.5–7.5% p.a. (indicative)",
    "horizon": "1–3 yrs",
    "cashflow": true,
    "analogy": "The same job a bank FD does — parking money safely — done with better-structured instruments: corporate deposits, high-grade bonds and short debt strategies you can access in days, not years.",
    "what": "A set of low-risk debt instruments — AAA/AA corporate FDs and bonds, target-maturity funds and curated debt portfolios — used as a stable, capital-protective anchor while the rest of the portfolio takes risk.",
    "solves": [
      "Parking surplus without an FD lock-in penalty",
      "Predictable, near-term cashflow",
      "A low-risk anchor for the wider portfolio"
    ],
    "benefits": [
      "Better liquidity than most alternatives — money out in days",
      "Laddered maturities can match known future expenses",
      "High credit quality keeps capital risk low"
    ],
    "risks": [
      "Credit risk: any extra yield is payment for lending below sovereign quality",
      "Bond prices move with interest rates if sold early",
      "Yields shown are indicative; reinvestment rates change"
    ],
    "tax": "Interest and any bond gains are taxed at slab rate. No long-term capital-gains concession on this sleeve.",
    "slug": "fd-plus-structured-debt",
    "nriNote": "Corporate FDs/bonds available via NRO (and selectively NRE); interest on NRO is fully taxable with TDS."
  },
  {
    "id": "dpms",
    "name": "Debt PMS",
    "tag": "The Yield Engine",
    "badge": "PMS",
    "risk": 30,
    "liq": 60,
    "mid": 12,
    "yrs": 2,
    "riskBand": "Low–Moderate",
    "liqLabel": "Min 3-month lock-in, then days",
    "min": "₹50 L",
    "minL": 50,
    "ret": "11–13% p.a. (indicative)",
    "horizon": "6 months – 2+ yrs",
    "cashflow": true,
    "analogy": "A managed lending desk inside your own demat. Instead of one FD, a manager runs a basket of high-yield bonds paying 11–13% — each one visible and held in your name.",
    "what": "A SEBI-registered PMS that holds high-yield corporate bonds and structured debt directly in your demat account. The manager selects and rotates the credits; coupons flow to you. Higher carry than traditional debt, with only a short lock-in.",
    "solves": [
      "Double-digit income with full portfolio transparency",
      "A middle path between FD+ and locked private credit",
      "Regular coupon cashflow with a short lock-in"
    ],
    "benefits": [
      "Every bond visible in your own account — no unit-NAV opacity",
      "Short 3-month lock-in, then exits settle in days",
      "Coupon ladder can be built around your cashflow needs"
    ],
    "risks": [
      "Credit risk is the engine — a default hits directly",
      "High-yield bonds can trade thin in stressed markets",
      "Interest income gets no long-term tax shelter"
    ],
    "tax": "Coupons and bond gains are taxed at slab rate in your hands. No long-term capital-gains concession.",
    "slug": "debt-pms",
    "nriNote": "Debt PMS available to NRIs via NRO; coupon TDS applies — obtain a CA computation."
  },
  {
    "id": "reit",
    "name": "REITs & InvITs",
    "tag": "Listed Real Assets",
    "badge": "Listed Trust",
    "risk": 40,
    "liq": 86,
    "mid": 7,
    "yrs": 4,
    "riskBand": "Moderate",
    "liqLabel": "Exchange-traded",
    "min": "One unit (a few hundred ₹)",
    "minL": 0.01,
    "ret": "6–8% distribution + growth (indicative)",
    "horizon": "3–5+ yrs",
    "cashflow": true,
    "analogy": "Owning a slice of Grade-A offices or infrastructure without the ₹5 Cr ticket or the tenant calls. Rent arrives as quarterly payouts; the units trade on the exchange like a share.",
    "what": "Listed trusts that own rent-earning real estate (REITs) or infrastructure like roads, power lines and towers (InvITs). They must pay out at least 90% of net cashflow to unit-holders — real-asset income with stock-market liquidity.",
    "solves": [
      "Regular income backed by physical assets",
      "Property exposure without betting on one building",
      "Rental escalations that track inflation"
    ],
    "benefits": [
      "Quarterly payouts with exchange liquidity",
      "SEBI-regulated, independently valued portfolios",
      "Far more diversified than one flat or shop"
    ],
    "risks": [
      "Unit prices move with markets and interest rates",
      "Occupancy and rental cycles affect payouts",
      "Payout mix, and its tax — varies trust to trust"
    ],
    "tax": "Distributions taxed component-wise — interest and rental at slab, some components exempt or as capital return. Units: STCG 20% under 12 months, LTCG 12.5% beyond.",
    "slug": "reits-invits",
    "nriNote": "Fully open to NRIs on-exchange; TDS applies on distributions."
  },
  {
    "id": "mn",
    "name": "Market Neutral Funds",
    "tag": "Debt++, Equity Engine",
    "badge": "Cat III AIF",
    "risk": 32,
    "liq": 52,
    "mid": 13,
    "yrs": 1,
    "riskBand": "Low–Moderate",
    "liqLabel": "Monthly windows (typical)",
    "min": "₹1 Cr (Cat III AIF)",
    "minL": 100,
    "ret": "12–14% p.a. (indicative)",
    "horizon": "3 months – 2 yrs",
    "cashflow": true,
    "analogy": "Long one stock, short another, so overall market moves largely cancel out. Returns come from the manager’s skill in the pair, not the direction of the market.",
    "what": "Absolute-return Category III AIF strategies (also available via GIFT inbound) that pair long and short positions to remove market direction, aiming for steady positive returns whether the index rises or falls. Debt-plus outcomes from an equity engine.",
    "solves": [
      "Debt-plus returns without duration or plain credit risk",
      "Positive-target returns in flat or falling markets",
      "A preservation sleeve that still puts capital to work"
    ],
    "benefits": [
      "Low correlation with both equity and debt markets",
      "Monthly-style liquidity — rare at this return level",
      "Drawdowns designed to stay shallow"
    ],
    "risks": [
      "Fund-level tax typically at the maximum marginal rate (scheme-specific) eats into gross returns",
      "Results depend entirely on manager skill",
      "Stress periods can break long-short relationships for a while"
    ],
    "tax": "Cat III AIFs are typically taxed at the fund level at the maximum marginal rate (scheme-specific — it depends on trust determinacy and income character); you receive post-tax NAV, usually with no further tax in your hands. Confirm per scheme.",
    "slug": "market-neutral-funds",
    "nriNote": "GIFT inbound market-neutral structures exist specifically for overseas investors, often cleaner than the domestic Cat III route."
  },
  {
    "id": "lssif",
    "name": "Long-Short SIFs",
    "tag": "The Shock Absorber",
    "badge": "SIF",
    "risk": 45,
    "liq": 58,
    "mid": 12,
    "yrs": 4,
    "riskBand": "Moderate",
    "liqLabel": "Scheme-defined windows",
    "min": "₹10 L",
    "minL": 10,
    "ret": "10–14% p.a. with lower drawdowns (indicative)",
    "horizon": "3–5 yrs",
    "cashflow": false,
    "analogy": "An equity fund built with brakes. It won’t top the charts in a strong bull run — the hedges cost some upside, but it is designed to fall far less when markets drop.",
    "what": "Specified Investment Funds — SEBI’s newest category, live since 2025 — that can go long the stocks they like and short the ones they don’t. The aim is equity-like returns with much smaller falls: hedge-fund technique, mutual-fund tax and rules, ₹10 L entry.",
    "solves": [
      "Staying in equity without full drawdown exposure",
      "A smoother ride for a first move beyond mutual funds",
      "Returns less dependent on markets only rising"
    ],
    "benefits": [
      "Downside management is built into the mandate, not left to timing",
      "MF-style tax and disclosure — far kinder than Cat III fund-level tax",
      "₹10 L entry vs ₹1 Cr for a comparable AIF strategy"
    ],
    "risks": [
      "Hedging costs drag returns in strong bull runs",
      "Short track records — the category is young",
      "Manager skill matters far more than in index-hugging funds"
    ],
    "tax": "Equity-oriented SIFs are taxed like equity mutual funds — STCG 20%, LTCG 12.5% beyond 12 months. A structural tax edge over Cat III AIFs.",
    "slug": "long-short-sif",
    "nriNote": "SIF availability to NRIs is scheme-specific and evolving — confirm before shortlisting."
  },
  {
    "id": "pcredit",
    "name": "Private Credit & Real Estate Debt",
    "tag": "High-Yield Cashflow",
    "badge": "Cat II AIF",
    "risk": 35,
    "liq": 20,
    "mid": 16,
    "yrs": 4,
    "riskBand": "Low–Moderate",
    "liqLabel": "3–5 yr tenor, locked",
    "min": "₹1 Cr",
    "minL": 100,
    "ret": "12–20% p.a. (indicative)",
    "horizon": "3–5 yrs",
    "cashflow": true,
    "analogy": "Being the lender instead of the depositor. Sound mid-sized companies pay 12–20% to borrow, secured. A private credit fund puts you on the lending side and collects that yield.",
    "what": "A Category II AIF (also via GIFT inbound) that lends directly to performing companies and real-estate projects — secured, covenant-protected loans banks are too slow or rigid to write. Interest comes back as regular payouts; principal returns as loans mature.",
    "solves": [
      "Double-digit income without equity volatility",
      "Regular quarterly/semi-annual cashflow",
      "Diversifying the debt book beyond FDs and bonds"
    ],
    "benefits": [
      "Contracted returns — repayment schedules, not market moods",
      "Security cover and covenants on each loan",
      "Low correlation with equity markets"
    ],
    "risks": [
      "Illiquid — capital is committed for the fund’s tenor",
      "Credit risk: defaults hit returns directly; underwriting is everything",
      "Fees and carry sit between the headline yield and you"
    ],
    "tax": "Cat II AIFs are tax pass-through — interest income is taxed in your hands at slab rate; capital gains as per the underlying asset. Fund deducts TDS on distributions.",
    "slug": "private-credit-real-estate-debt",
    "nriNote": "NRIs can invest in AIFs; TDS on distributions applies at treaty/act rates. GIFT inbound versions often simplify this further."
  },
  {
    "id": "gift",
    "name": "GIFT City & Global USD",
    "tag": "The Second Passport for Capital",
    "badge": "GIFT IFSC / LRS",
    "risk": 60,
    "liq": 42,
    "mid": 13,
    "yrs": 6,
    "riskBand": "Moderate–High",
    "liqLabel": "Fund-dependent",
    "min": "US $5,000+ (fund-dependent)",
    "minL": 5,
    "ret": "12–14% p.a. in INR terms (illustrative)",
    "horizon": "5–7+ yrs",
    "cashflow": false,
    "analogy": "A second address for your capital. If your business, home and portfolio are all in India and all in rupees, holding some wealth in another currency and geography is insurance, not luxury.",
    "what": "Investing in global markets — US and developed-market equity, global innovation — in US dollars, through GIFT City IFSC funds or the RBI’s LRS route (US $2,50,000 per person per year). For NRIs, GIFT inbound funds are often the cleanest, most tax-efficient way into Indian strategies.",
    "solves": [
      "Rupee-concentration risk on family wealth",
      "Access to businesses India doesn’t list — global tech, semiconductors, AI",
      "Funding future USD expenses like children’s education"
    ],
    "benefits": [
      "Currency diversification — the rupee has tended to depreciate against the USD over long periods",
      "World-class companies not listed on NSE/BSE",
      "GIFT structures cut paperwork vs direct overseas accounts"
    ],
    "risks": [
      "The currency can also move against you in stretches",
      "TCS applies on LRS remittances above ₹10 L/yr (adjustable against tax)",
      "Foreign-fund tax and reporting is genuinely more complex — CA involvement is essential"
    ],
    "tax": "Unlisted overseas/GIFT fund units: LTCG 12.5% after 24 months; slab rate if sooner. Foreign assets must be reported in Schedule FA. NRI treatment differs — confirm with your CA.",
    "slug": "gift-city-global-usd",
    "nriNote": "For NRIs, GIFT City funds are often the cleanest route into India-linked strategies — IFSC structures can offer simplified tax treatment for non-residents. Verify fund-specific rules."
  },
  {
    "id": "loaif",
    "name": "Long-Only Equity AIF",
    "tag": "Listed + Pre-IPO, One Vehicle",
    "badge": "Cat III AIF",
    "risk": 75,
    "liq": 45,
    "mid": 19,
    "yrs": 5,
    "riskBand": "High",
    "liqLabel": "Scheme windows / close-ended",
    "min": "₹1 Cr",
    "minL": 100,
    "ret": "18–20% p.a. (indicative)",
    "horizon": "5+ yrs",
    "cashflow": false,
    "analogy": "One vehicle holding both the listed stocks anyone can buy and the off-market pre-IPO and anchor allocations most investors never see.",
    "what": "A Category III long-only AIF (also via GIFT inbound) that blends a concentrated listed-equity book with a 15–20% sleeve of pre-IPO and anchor allocations — public and late-stage private markets in a single commitment.",
    "solves": [
      "Concentrated listed alpha plus pre-IPO access in one commitment",
      "Anchor and IPO allocations retail investors rarely receive",
      "A single high-conviction growth engine above the MF layer"
    ],
    "benefits": [
      "Internal churn is not taxed in your hands — the fund pays, you receive NAV",
      "The pre-IPO sleeve adds a return source uncorrelated with daily markets",
      "Pooled scale can secure anchor access no individual gets"
    ],
    "risks": [
      "Fund-level tax typically at the maximum marginal rate (scheme-specific) is a real drag on gross returns",
      "The pre-IPO sleeve is illiquid inside an otherwise liquid book",
      "High conviction cuts both ways in a drawdown"
    ],
    "tax": "Cat III AIFs are typically taxed at the fund level at the maximum marginal rate (scheme-specific — it depends on trust determinacy and income character); you receive post-tax NAV, usually with no further tax in your hands. Confirm per scheme.",
    "slug": "long-only-equity-aif",
    "nriNote": "GIFT inbound long-only AIFs are frequently the most tax-efficient NRI route into concentrated Indian equity."
  },
  {
    "id": "pms",
    "name": "High-Alpha Equity PMS",
    "tag": "The Custom Build",
    "badge": "PMS",
    "risk": 70,
    "liq": 64,
    "mid": 19,
    "yrs": 5,
    "riskBand": "High",
    "liqLabel": "Exit in ~7–15 days",
    "min": "₹50 L",
    "minL": 50,
    "ret": "18–20% p.a. (indicative)",
    "horizon": "5–7+ yrs",
    "cashflow": false,
    "analogy": "A portfolio built for you, not for the crowd. Twenty to twenty-five stocks chosen with conviction, held in your own demat, visible line by line. When the calls are right, concentration is what compounds.",
    "what": "A SEBI-registered Portfolio Management Service running a concentrated equity portfolio directly in your demat account. No 65% category limits, no 80-stock dilution — a manager’s best 20–25 ideas, sized to matter. You own the shares; the manager steers.",
    "solves": [
      "Real alpha-seeking beyond diversified funds",
      "Transparency — every holding visible in your own account",
      "Strategies (focused mid/small-cap, special situations) MFs cannot run"
    ],
    "benefits": [
      "Concentration lets winners actually move the needle",
      "Direct ownership: your shares, your demat, your capital-gains ledger",
      "Owner-manager boutiques bring rare manager continuity"
    ],
    "risks": [
      "Concentration cuts both ways — drawdowns can exceed index falls",
      "Manager dispersion is huge; selection is the whole game",
      "Manager churn creates taxable events in your ledger every year"
    ],
    "tax": "Taxed exactly like direct equity in your hands — STCG 20% under 12 months, LTCG 12.5% beyond (₹1.25 L exemption). Review the strategy’s turnover.",
    "slug": "equity-pms",
    "nriNote": "Available to NRIs via NRE/NRO with a PIS-linked setup; US/Canada residency needs manager-level confirmation."
  },
  {
    "id": "pe",
    "name": "Private Equity Funds",
    "tag": "Late-Stage Unlisted",
    "badge": "Cat II AIF",
    "risk": 88,
    "liq": 8,
    "mid": 22.5,
    "yrs": 9,
    "riskBand": "Very High",
    "liqLabel": "8–10 yr fund life",
    "min": "₹1 Cr",
    "minL": 100,
    "ret": "20–25% p.a. (indicative)",
    "horizon": "8–10 yrs",
    "cashflow": false,
    "analogy": "Buying into an established, proven business before it lists. The company already works; the fund’s job is to scale it and sell it at a public-market multiple.",
    "what": "Category II AIFs investing in late-stage, profitable or near-profitable private companies — growth capital, buyouts, pre-listing rounds. Between venture risk and public-market pricing: proven businesses, private valuations, professional exit engineering.",
    "solves": [
      "Growth-stage exposure without early-stage mortality risk",
      "Entry at private multiples, exit at public ones",
      "Long-horizon compounding insulated from daily market noise"
    ],
    "benefits": [
      "Companies are past the survival question — risk is execution, not existence",
      "Pass-through taxation preserves capital-gains character",
      "Vintage diversification possible across fund commitments"
    ],
    "risks": [
      "Long lock-in — 8–10 years with capital calls",
      "Exit timing depends on IPO windows and M&A appetite",
      "J-curve: early NAVs understate; patience is structural"
    ],
    "tax": "Cat II AIFs are tax pass-through — gains taxed in your hands per the underlying (unlisted: LTCG 12.5% after 24 months). Fund deducts TDS on distributions.",
    "slug": "private-equity-funds",
    "nriNote": "Open to NRIs; repatriation and TDS mechanics need structuring review before commitment."
  },
  {
    "id": "preipo",
    "name": "Pre-IPO & Unlisted Shares",
    "tag": "The Early Entry",
    "badge": "Unlisted / Cat II",
    "risk": 85,
    "liq": 14,
    "mid": 25,
    "yrs": 5,
    "riskBand": "Very High",
    "liqLabel": "Illiquid until listing/event",
    "min": "₹5–25 L typical lots",
    "minL": 5,
    "ret": "22–28% p.a. (indicative, wide dispersion)",
    "horizon": "3–7 yrs",
    "cashflow": false,
    "analogy": "Buying the flat at the excavation stage. The discount to the finished price is real, and so is the risk that the project is delayed, redesigned, or never built. You are paid for waiting and for uncertainty.",
    "what": "Buying shares of companies before they list — late-stage private companies via unlisted-share platforms or Cat II funds. The idea: enter at private valuations, exit at public ones. Some of India’s best-known listings rewarded pre-IPO holders handsomely; others listed below their private rounds.",
    "solves": [
      "Access to growth that happens before the IPO pop",
      "Ownership in marquee names years before listing",
      "A portfolio kicker sized small enough to matter, not hurt"
    ],
    "benefits": [
      "Entry valuations often below eventual listing prices",
      "A genuinely differentiated return stream",
      "Six-month post-IPO lock-ins for pre-IPO holders are a known, plannable constraint"
    ],
    "risks": [
      "No exit until a listing or buyback — capital can be stuck for years",
      "Price discovery is thin; you may overpay quietly",
      "IPOs get shelved; some list below the pre-IPO price"
    ],
    "tax": "Unlisted shares: LTCG 12.5% after 24 months; slab-rate STCG before that. Buyback proceeds now taxed as capital gains (Budget 2026). Take CA guidance on exit timing.",
    "slug": "pre-ipo-unlisted-shares",
    "nriNote": "Unlisted purchases by NRIs involve FEMA pricing and reporting rules — always structured with professional guidance."
  },
  {
    "id": "vc",
    "name": "Angel & VC Funds",
    "tag": "The Frontier",
    "badge": "Cat I AIF",
    "risk": 95,
    "liq": 4,
    "mid": 28.5,
    "yrs": 8,
    "riskBand": "Very High",
    "liqLabel": "8–12 yr fund life",
    "min": "₹25 L (angel) / ₹1 Cr (VC AIF)",
    "minL": 25,
    "ret": "25–32% p.a. targeted (indicative, power-law)",
    "horizon": "8–12 yrs",
    "cashflow": false,
    "analogy": "Planting an orchard, not buying fruit. Most saplings won’t make it. The few that do bear fruit for a generation, and one great tree can pay for the whole orchard.",
    "what": "Category I AIFs (VC and angel funds) investing in early-stage companies. Returns follow a power law: many investments fail, most muddle through, and one or two winners are expected to return the whole fund. Patient, decade-long capital at the frontier of risk.",
    "solves": [
      "Participation in India’s startup ecosystem with professional selection",
      "Truly uncorrelated, decade-horizon compounding",
      "For business families: a structured window into new-economy models"
    ],
    "benefits": [
      "Diversified exposure vs writing individual angel cheques",
      "Professional diligence, board access, follow-on discipline",
      "Vintage-year diversification possible across commitments"
    ],
    "risks": [
      "Longest lock-in of any structure — 8–12 years with capital calls",
      "J-curve: early years show losses before winners mature",
      "Manager dispersion is the widest of any category"
    ],
    "tax": "Cat I AIFs are tax pass-through — gains taxed in your hands per the underlying (unlisted: LTCG 12.5% after 24 months). Fund deducts TDS on income distributed.",
    "slug": "angel-vc-funds",
    "nriNote": "Open to NRIs; repatriation and TDS mechanics need structuring review before commitment."
  }
];

export const productBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const productById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);
