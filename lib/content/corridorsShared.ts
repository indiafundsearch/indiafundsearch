import type { Corridor, CorridorQA, Source } from "./types";

/**
 * India-side building blocks shared by the country guides added in November
 * 2026 (Canada, Singapore, Hong Kong and the six Gulf states).
 *
 * WHAT WAS AND WAS NOT READ AT SOURCE — 11 November 2026. Keep this honest.
 *
 * Read on a government host:
 *   - the online-only treaty-information form and its residency-certificate
 *     prerequisite (income-tax e-filing portal, Form 41 user manual);
 *   - the residence tests (e-filing portal, non-resident FAQs);
 *   - the NRO redesignation rule (RBI Master Direction on Deposits and Accounts);
 *   - the KYC circular for persons resident outside India (SEBI, 4 Nov 2026).
 *
 * Read only in the Income-tax Act, 2025 AS ENACTED (21 August 2025), on Indian
 * Kanoon's copy, because incometaxindia.gov.in refuses automated readers:
 *   - 12.5% above ₹1.25 lakh / 20% / twelve-month holding period;
 *   - debt-heavy fund units always short-term;
 *   - 20% on dividends paid to a non-resident;
 *   - refunds claimed by filing a return.
 *   These match the owner-confirmed figures on /tax.
 *
 * NOT read at source, but PUBLISHED on the owner's instruction of 11 November
 * 2026 (they match /tax, which the owner had already confirmed):
 *   - deduction at source of 20% / 12.5% on equity gains and 20% on dividends;
 *   - the 4% cess;
 *   - that Form 41 is the renamed Form 10F.
 * Still not printed: whether the ₹1.25 lakh threshold is applied at source,
 * and anything the Finance Act, 2026 changed.
 *
 * Same editorial rule as corridors.ts: no Indian section numbers.
 */

export const NEW_PUBLISHED = "November 2026";
export const NEW_REVIEWED = "November 2026";
export const NEW_PUBLISHED_ISO = "2026-11-11";

export const SRC = {
  act2025: {
    label:
      "Income-tax Act, 2025, as enacted on 21 August 2025 (Indian Kanoon copy)",
    url: "https://indiankanoon.org/doc/23042319/",
  },
  form41: {
    label:
      "Income-tax e-filing portal — Form 41 user manual (treaty-information form, online only)",
    url: "https://www.incometax.gov.in/iec/foportal/newformpage/forms/form41-UM",
  },
  nrFaq: {
    label: "Income-tax e-filing portal — non-resident FAQs (residence tests)",
    url: "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/non%20resident%20-faq",
  },
  rbiAccounts: {
    label:
      "RBI Master Direction — Deposits and Accounts (updated 2 September 2026)",
    url: "https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=10198",
  },
  sebiKyc: {
    label:
      "SEBI circular, 4 November 2026 — KYC for individual persons resident outside India",
    url: "https://www.sebi.gov.in/sebi_data/attachdocs/nov-2026/1793791897866.pdf",
  },
  faizal: {
    label:
      "DCIT v. K.E. Faizal, ITAT Cochin, ITA 423/Coch/2018 (8 July 2019)",
    url: "https://indiankanoon.org/doc/16452218/",
  },
  anushka: {
    label:
      "Anushka Sanjay Shah v. ITO, ITAT Mumbai, IT(IT)A 174/Mum/2025 (26 March 2025)",
    url: "https://indiankanoon.org/doc/23391260/",
  },
} satisfies Record<string, Source>;

export const INDIA_SOURCES: Source[] = [
  SRC.act2025,
  SRC.form41,
  SRC.nrFaq,
  SRC.rbiAccounts,
  SRC.sebiKyc,
];

/** What India charges first, whatever the country of residence does next. */
export function indiaTaxQA(country: string): CorridorQA {
  return {
    q: `What does India tax before the money reaches me in ${country}?`,
    a: [
      "India taxes the gain first.",
      "Listed Indian shares and equity mutual fund units held over twelve months: <b>12.5% on gains above ₹1.25 lakh</b> in a tax year. Sold within twelve months: <b>20%</b>. Surcharge and cess are extra.",
      "Fund units with more than 65% in debt and money-market instruments, bought on or after 1 April 2023, are always short-term, however long held.",
      "Dividends to a non-resident are taxed at 20% before surcharge and cess, unless a treaty rate is lower and you have filed for it.",
      "Tax is deducted at source when a non-resident is paid: generally 20% on short-term and 12.5% on long-term equity gains and 20% on dividends, plus surcharge and a 4% cess.",
      "That is not always your final liability. Check your contract note or redemption statement and claim back any excess.",
    ],
    sources: [SRC.act2025],
  };
}

/** The certificate, the online form, the return. */
export function indiaPaperworkQA(
  certificate: string,
  certificateSource?: Source,
): CorridorQA {
  return {
    q: "Which Indian paperwork do I need to claim treaty relief or a refund?",
    a: [
      "Three things, in this order.",
      `<b>A residency certificate</b> from your own tax authority. ${certificate}`,
      "<b>India's treaty-information form, Form 41</b> (Form 10F until April 2026, and still widely called that). It is filed online only, on the Indian income-tax e-filing portal, which lists your residency certificate as a prerequisite.",
      "<b>An Indian tax return</b> for the year, if you are owed money back. Indian law says a refund is claimed by filing a return. Nothing is refunded automatically.",
      "Keep name, period and country of residence the same on all three.",
    ],
    sources: [
      ...(certificateSource ? [certificateSource] : []),
      SRC.form41,
      SRC.act2025,
    ],
  };
}

/** Residence on the Indian side — the test that quietly undoes the rest. */
export const INDIA_RESIDENCE_QA: CorridorQA = {
  q: "Could I still count as tax-resident in India?",
  a: [
    "Yes. Check this first.",
    "India treats you as resident if you spend 182 days or more there in a tax year (1 April to 31 March), or 60 days in the year and 365 days across the four years before it.",
    "For visiting Indian citizens and people of Indian origin the 60-day test does not apply, unless their Indian income is above ₹15 lakh, when 120 days replaces 60.",
    "If both countries treat you as resident in the same year, the treaty's tie-breaker decides, if there is a treaty. Count the days and keep the passport stamps.",
  ],
  sources: [SRC.nrFaq, SRC.act2025],
};

/** Mistake that applies in every country. */
export const MISTAKE_STATUS = {
  m: "Leaving your Indian bank and fund records marked as resident after you move",
  why: "RBI's direction says a resident account should be designated as an NRO account when the holder becomes a person resident outside India. Indian institutions report accounts abroad on your declared residence, so a stale record means the wrong deduction and the wrong report.",
};

export const MISTAKE_REFUND = {
  m: "Assuming a treaty rate applies by itself",
  why: "Relief needs a residency certificate, the online treaty form and, for a refund, an Indian return. Skip one and the tax deducted when you were paid stands.",
};

/** The decision behind the tax question. Reasoning, not a forecast. */
export const WHY_INDIA_QA: CorridorQA = {
  q: "Is it worth holding rupee investments at all if I live abroad?",
  a: [
    "It depends what the money is for.",
    "If you earn and spend in another currency, measure the return in that currency. A strong rupee return can be ordinary once the exchange rate has moved. Judging India only in foreign-currency terms and seeing no return is the opposite mistake.",
    "Rupee exposure makes sense whatever the currency does if you plan to return to India, support parents or family there, expect an inheritance that will stay in India, or have rupee income or spending, such as property upkeep or giving.",
    "What remains is how to hold those rupees so two tax systems take no more than they must.",
  ],
};

export const MISTAKE_ADVICE_LATER = {
  m: "Investing first and taking tax advice afterwards",
  why: "The wrapper is hard to change once you are in it. Selling to fix it is a taxable event, in India and usually at home too.",
};

export const MISTAKE_INDIAN_LOGIC = {
  m: "Assuming advice that works for a resident Indian works for you",
  why: "India taxes equity funds and shares at the same rates, so Indian advice rarely separates them. Your country of residence may treat them very differently.",
};

export const CHECK_ADVISER =
  "Take advice from someone qualified in your country of residence before you invest or move, not after. Do not self-file cross-border returns from a blog post.";

export const CHECK_PMS_REPORTING =
  "If you use an Indian portfolio manager, confirm in writing that they provide transaction-level statements your home-country return can use.";

export const CHECK_STATUS =
  "Update your residential status with your Indian bank and fund houses, and move resident accounts to NRO.";

export const CHECK_RECORDS =
  "Keep purchase dates, costs and the exchange rate on each date. Your country of residence computes the gain in its own currency, not rupees.";

/** Fields every new guide shares. */
export const NEW_COMMON: Pick<
  Corridor,
  "reviewed" | "published" | "regulatoryAsAt" | "publishedIso" | "modifiedIso"
> = {
  reviewed: NEW_REVIEWED,
  published: NEW_PUBLISHED,
  regulatoryAsAt: NEW_REVIEWED,
  publishedIso: NEW_PUBLISHED_ISO,
  modifiedIso: NEW_PUBLISHED_ISO,
};

export const RELATED_COMMON = [
  { label: "India's tax schedule for residents and NRIs", href: "/tax" },
  { label: "The treaty-information form, and how to file it", href: "/learn/form-10f-for-nri" },
  { label: "NRE vs NRO account", href: "/learn/nre-vs-nro-account" },
  { label: "NRI repatriation limit", href: "/learn/nri-repatriation-limit" },
];
