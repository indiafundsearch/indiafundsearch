// GENERATED from Beyond — The Architecture of Alternatives (R3), 2026-07.
// Source of truth for educational content. Edit deliberately — copy is compliance-reviewed.
import type { TaxRow } from './types';

export const TAX_HEAD = [
  'Structure',
  'Long-term after',
  'STCG',
  'LTCG',
  'Income / distributions',
  'Notes',
] as const;

export const TAX_ROWS: { res: TaxRow[]; nri: TaxRow[] } = {
  "res": [
    [
      "Equity Mutual Funds / SIF (equity-oriented)",
      "12 months",
      "20%",
      "12.5% above ₹1.25 L/yr",
      "Dividends at slab",
      "Gains only on your redemption — internal churn untaxed"
    ],
    [
      "Debt Mutual Funds (bought after Apr 2023)",
      "—",
      "Slab rate (all gains)",
      "Slab rate (all gains)",
      "—",
      "No LTCG benefit regardless of holding"
    ],
    [
      "FD+ / Corporate FDs & Bonds",
      "—",
      "Slab",
      "Slab (no LTCG benefit)",
      "Interest at slab, TDS applies",
      "Slab rate throughout; no long-term concession"
    ],
    [
      "Debt PMS",
      "—",
      "Slab",
      "Slab (no LTCG benefit)",
      "Coupons at slab in your hands",
      "Slab rate throughout; no long-term concession"
    ],
    [
      "REITs / InvITs (units)",
      "12 months",
      "20%",
      "12.5%",
      "Distributions component-wise: interest/rent at slab, some parts exempt",
      "Trust reports the split each year"
    ],
    [
      "Equity PMS",
      "12 months (per stock)",
      "20%",
      "12.5% above ₹1.25 L/yr",
      "Dividends at slab",
      "Taxed as direct equity; manager churn = taxable events yearly"
    ],
    [
      "Long-Only Equity AIF / Market Neutral — Cat III",
      "—",
      "—",
      "—",
      "—",
      "Taxed at the fund level at maximum marginal rate; you receive post-tax NAV"
    ],
    [
      "Private Credit / PE — Cat II AIF",
      "Per underlying asset",
      "Per underlying",
      "Per underlying",
      "Interest at slab; fund deducts TDS",
      "Pass-through — income taxed in your hands, not the fund"
    ],
    [
      "GIFT City / Global funds (resident via LRS)",
      "24 months (unlisted units)",
      "Slab",
      "12.5%",
      "Foreign dividends at slab",
      "Schedule FA reporting mandatory; TCS on LRS above ₹10 L/yr (adjustable)"
    ],
    [
      "Pre-IPO / Unlisted shares",
      "24 months",
      "Slab",
      "12.5%",
      "Dividends at slab",
      "Buyback proceeds now taxed as capital gains (Budget 2026)"
    ],
    [
      "Angel / VC — Cat I AIF",
      "Per underlying (unlisted: 24 m)",
      "Per underlying",
      "12.5% (unlisted)",
      "Pass-through; TDS on distributions",
      "Losses at fund level pass through subject to conditions"
    ]
  ],
  "nri": [
    [
      "Equity Mutual Funds / SIF (equity-oriented)",
      "12 months",
      "20% (TDS at source)",
      "12.5% above ₹1.25 L/yr (TDS)",
      "Dividends: 20% or treaty rate",
      "US/Canada NRIs: check AMC acceptance (FATCA)"
    ],
    [
      "Debt Mutual Funds (bought after Apr 2023)",
      "—",
      "Slab / TDS 30%",
      "Slab / TDS 30%",
      "—",
      "Treaty relief may apply — file for refund where TDS exceeds liability"
    ],
    [
      "FD+ / Bonds via NRO",
      "—",
      "Slab",
      "Slab (no LTCG benefit)",
      "NRO interest: TDS 30% + cess",
      "NRE FD interest is tax-free in India while NRI status holds"
    ],
    [
      "Debt PMS",
      "—",
      "Slab",
      "Slab (no LTCG benefit)",
      "Coupon TDS applies",
      "Via NRO with custodian setup"
    ],
    [
      "REITs / InvITs",
      "12 months",
      "20%",
      "12.5%",
      "TDS on distributions (rate varies by component/treaty)",
      "Fully open to NRIs on-exchange"
    ],
    [
      "Equity PMS",
      "12 months (per stock)",
      "20% (TDS)",
      "12.5% (TDS)",
      "Dividend TDS 20%/treaty",
      "Requires NRE/NRO + custodian; US/Canada — confirm with manager"
    ],
    [
      "Long-Only Equity AIF / Market Neutral — Cat III",
      "—",
      "—",
      "—",
      "—",
      "Fund-level tax at MMR; GIFT inbound versions often materially cleaner for NRIs"
    ],
    [
      "Private Credit / PE — Cat II AIF",
      "Per underlying",
      "Per underlying",
      "Per underlying",
      "TDS at rates in force / treaty",
      "Repatriation mechanics need structuring review"
    ],
    [
      "GIFT City funds (NRI investing into India)",
      "Fund-specific",
      "Fund-specific",
      "Fund-specific",
      "Often favourable IFSC treatment",
      "Frequently the cleanest NRI route into Indian strategies — verify per fund"
    ],
    [
      "Pre-IPO / Unlisted shares",
      "24 months",
      "Slab",
      "12.5%",
      "—",
      "FEMA pricing guidelines apply to NRI purchase/sale"
    ],
    [
      "Angel / VC — Cat I AIF",
      "Per underlying (24 m unlisted)",
      "Per underlying",
      "12.5% (unlisted)",
      "TDS on distributions",
      "Commitment/repatriation structure reviewed before signing"
    ]
  ]
};
