import type { Corridor, CorridorQA, CorridorTable } from "./types";
import {
  INDIA_SOURCES,
  MISTAKE_ADVICE_LATER,
  MISTAKE_INDIAN_LOGIC,
  MISTAKE_STATUS,
  SRC,
} from "./corridorsShared";
import { OECD_CRS, gainIllustration } from "./corridorsGulf";

/**
 * November 2026 additions to the three original corridor pages (US, UAE, UK).
 * The original copy in corridors.ts is left as written; these are appended.
 *
 * Every figure here was re-read on 11 November 2026 on irs.gov,
 * law.cornell.edu, home.treasury.gov, gov.uk, legislation.gov.uk and
 * tax.gov.ae. India-side limits are described in corridorsShared.ts.
 */

export interface CorridorAugment {
  extraTables: CorridorTable[];
  qas: CorridorQA[];
  mistakes: Corridor["mistakes"];
  sources: Corridor["sources"];
}

const US = {
  i8621: {
    label: "Instructions for Form 8621 (Rev. December 2025)",
    url: "https://www.irs.gov/instructions/i8621",
  },
  s1296: {
    label: "IRC §1296 — mark-to-market election",
    url: "https://www.law.cornell.edu/uscode/text/26/1296",
  },
  reg1296: {
    label: "Treas. Reg. §1.1296-2 — definition of marketable stock",
    url: "https://www.law.cornell.edu/cfr/text/26/1.1296-2",
  },
  s1297: {
    label: "IRC §1297 — PFIC definition",
    url: "https://www.law.cornell.edu/uscode/text/26/1297",
  },
  s1298: {
    label: "IRC §1298 — special rules, including once a PFIC",
    url: "https://www.law.cornell.edu/uscode/text/26/1298",
  },
  rp2532: {
    label: "Rev. Proc. 2025-32 — inflation-adjusted amounts for 2026",
    url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
  },
  niit: {
    label: "IRS Topic 559 — net investment income tax",
    url: "https://www.irs.gov/taxtopics/tc559",
  },
  fatca: {
    label: "IRS — summary of FATCA reporting for US taxpayers (Form 8938)",
    url: "https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers",
  },
  fbar: {
    label: "IRS — Report of Foreign Bank and Financial Accounts (FBAR)",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar",
  },
  interest: {
    label: "IRS — quarterly interest rates",
    url: "https://www.irs.gov/payments/quarterly-interest-rates",
  },
  iga: {
    label: "India–US FATCA intergovernmental agreement (signed 9 July 2015)",
    url: "https://home.treasury.gov/system/files/131/FATCA-Agreement-India-7-9-2015.pdf",
  },
};

const UK = {
  cgt: {
    label: "GOV.UK — Capital Gains Tax rates and allowances, 2026 to 2027",
    url: "https://www.gov.uk/capital-gains-tax/rates",
  },
  it: {
    label: "GOV.UK — Income Tax rates, 2026 to 2027",
    url: "https://www.gov.uk/income-tax-rates",
  },
  div: {
    label: "GOV.UK — tax on dividends, 2026 to 2027",
    url: "https://www.gov.uk/tax-on-dividends",
  },
  reg17: {
    label: "Offshore Funds (Tax) Regulations 2009, regulation 17",
    url: "https://www.legislation.gov.uk/uksi/2009/3001/regulation/17",
  },
  treaty: {
    label: "UK–India double taxation agreement, as amended in 2013 — Articles 11 and 14",
    url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/736294/1993_India_-_UK_Double_Taxation_Agreement__as_amended_in_2013_-_in_force.pdf",
  },
  budget: {
    label: "Budget 2026 speech (28 October 2026)",
    url: "https://www.gov.uk/government/speeches/budget-2026-speech",
  },
  list: {
    label: "HMRC — approved offshore reporting funds (updated 4 November 2026)",
    url: "https://www.gov.uk/government/publications/approved-offshore-reporting-funds",
  },
  crs: {
    label: "HMRC IEIM400090 — CRS participating jurisdictions (updated 15 October 2026)",
    url: "https://www.gov.uk/hmrc-internal-manuals/international-exchange-of-information/ieim400090",
  },
};

const UAE = {
  cd85: {
    label: "UAE Cabinet Decision No. 85 of 2022 — determination of tax residency",
    url: "https://tax.gov.ae/Datafolder/Files/Legislation/Corporate%20Tax/Cabinet%20Decision%2085%20of%202022%20-%20For%20publishing.pdf",
  },
  kanoi: {
    label: "Saket Kanoi v. DCIT, ITAT Delhi, ITA 3243/Del/2023 (23 October 2024)",
    url: "https://indiankanoon.org/doc/105859941/",
  },
};

export const AUGMENT: Record<string, CorridorAugment> = {
  us: {
    extraTables: [
      {
        caption: "Which filings apply to a US taxpayer with Indian investments?",
        head: ["Filing", "Who it catches", "Threshold", "Where"],
        rows: [
          [
            "FBAR, FinCEN Form 114",
            "Anyone with foreign financial accounts, including Indian bank, demat and fund accounts",
            "Combined value above $10,000 at any time in the calendar year",
            "Filed with FinCEN, not with your tax return",
          ],
          [
            "Form 8938",
            "Anyone holding specified foreign financial assets",
            "In the US, single: above $50,000 on the last day of the year or $75,000 at any time. Joint filers: $100,000 and $150,000. Abroad, single: $200,000 and $300,000",
            "With your tax return",
          ],
          [
            "Form 8621",
            "Anyone holding a PFIC, directly or through another entity",
            "One form per PFIC. The $25,000 exception is from reporting only, and only while there is no sale or excess distribution",
            "With your tax return",
          ],
          [
            "Self-certification of tax residence",
            "Every account holder",
            "Indian institutions report US persons' accounts under the India-US agreement signed on 9 July 2015",
            "Your Indian banks and fund houses",
          ],
          [
            "Indian tax return",
            "Anyone owed a refund of tax deducted in India",
            "The only route to a refund",
            "India's e-filing portal",
          ],
        ],
        note: "Form 8938 does not replace the FBAR. They go to different agencies and both can apply to the same account.",
      },
      {
        caption: "The same US $100,000, as a mutual fund and as direct shares",
        head: ["Route", "US tax", "Indian tax", "Total, as a share of the gain"],
        rows: [
          [
            "Indian mutual fund, mark-to-market election",
            "About $77,900, paid year by year at 37% on each year's rise",
            "About $26,300 at exit, at 12.5%",
            "Just under 50%, if the Indian tax cannot be credited against US tax paid in earlier years",
          ],
          [
            "Direct shares in companies that are not PFICs",
            "About $23,800 after credit: 20% of the gain less the Indian tax, plus the 3.8% net investment income tax",
            "About $26,300 at exit, at 12.5%",
            "About 24%",
          ],
        ],
        note: "An illustration, not a forecast. Assumes 12% growth for ten years, a gain of about $210,600, the top federal bracket, no state tax, a flat exchange rate, and mark-to-market tax paid from other money. Whether Indian tax paid at exit can be credited against earlier years' US tax is a question for a US tax professional.",
      },
    ],
    qas: [
      {
        q: "Can a US NRI invest in Indian mutual funds?",
        a: [
          "Yes, but an Indian mutual fund will usually be a PFIC for a US taxpayer, taxed in one of three ways.",
          "<b>Default.</b> If you elect nothing, gain on sale is spread back over your holding period, taxed at the highest rate for each earlier year, and charged interest at the IRS underpayment rate: 7%, 6%, 7% and 7% across the four quarters of 2026.",
          "<b>Mark-to-market.</b> You pay tax each year on the rise in value, as ordinary income, sold or not. A fall is deductible only up to gains included in earlier years. Not every fund qualifies: for one that redeems at net asset value, the regulation sets eight conditions, including more than 100 unrelated holders, a minimum initial investment of no more than US $10,000, and prices published at least weekly.",
          "<b>Qualified electing fund.</b> You are taxed each year on your share of the fund's income and gains. It needs an annual information statement from the fund.",
          "For 2026 the top federal rate on ordinary income is 37%, above $640,600 for a single filer and $768,700 for a joint return. Long-term capital gains on non-PFIC assets top out at 20%, plus the 3.8% net investment income tax where it applies.",
        ],
        sources: [US.s1297, US.s1296, US.reg1296, US.rp2532, US.niit, US.interest],
      },
      {
        q: "I am about to move to the US. What should I do with my Indian mutual funds?",
        a: [
          "Decide before you become a US tax resident.",
          "Until you are a US person, the United States has no claim on your gain on an Indian fund. Sell before the move and the only tax is India's, at 12.5% on a long-term equity gain. Sell later as a US person and the PFIC rules apply, at ordinary rates of up to 37%.",
          "Some families instead transfer the units to a parent or sibling who stays resident in India. A gift made after you become a US person can itself be treated as a disposal under proposed US regulations, so it is not a later fix.",
          "This applies to H-1B and L-1 moves as much as to green cards, and in reverse to anyone taking US citizenship, because the US taxes citizens wherever they live.",
          "Either way, tell your Indian bank and fund houses that your residence has changed.",
        ],
        sources: [US.s1297],
      },
      {
        q: "Can a single Indian stock be a PFIC?",
        a: [
          "Yes. The test is applied company by company and year by year, not only to funds.",
          "A foreign company is a PFIC in a year when 75% or more of its gross income is passive, or at least 50% of its assets on average produce passive income or are held to produce it. Passive income covers dividends, interest and gains on the kind of property that produces them.",
          "A company whose business is holding investments can meet the test. An ordinary operating company usually will not.",
          "If a company was a PFIC at any point while you held it, the stock generally stays PFIC stock in your hands, even after the company stops meeting the test, unless you make an election to purge it.",
          "Ask for this check if someone else chooses your Indian shares.",
        ],
        sources: [US.s1297, US.s1298],
      },
    ],
    mistakes: [
      {
        m: "Forgetting that a child born in the US is a US person",
        why: "The US taxes its citizens wherever they live. Indian funds in that child's name are PFIC holdings, with the same reporting, even if the family has moved back to India.",
      },
      {
        m: "Leaving idle cash inside an Indian portfolio account in a liquid or overnight fund",
        why: "Those are pooled funds, so PFICs. A managed account of direct shares stays outside the regime only if the cash is held as cash.",
      },
      MISTAKE_ADVICE_LATER,
      MISTAKE_INDIAN_LOGIC,
      MISTAKE_STATUS,
    ],
    sources: [
      US.i8621,
      US.interest,
      US.s1296,
      US.reg1296,
      US.s1298,
      US.rp2532,
      US.niit,
      US.fatca,
      US.fbar,
      US.iga,
      ...INDIA_SOURCES,
    ],
  },

  uk: {
    extraTables: [
      {
        caption: "What a £40,000 gain costs a UK additional-rate taxpayer in 2026 to 2027",
        head: ["Holding", "How it is taxed", "UK tax", "Working"],
        rows: [
          [
            "Indian fund without reporting status",
            "Offshore income gain, charged to income tax",
            "£18,000",
            "45% of £40,000. No annual exempt amount",
          ],
          [
            "Indian fund with reporting status throughout",
            "Capital gain",
            "£8,880",
            "24% of £37,000, after the £3,000 annual exempt amount",
          ],
          [
            "Indian shares held directly",
            "Capital gain",
            "£8,880",
            "24% of £37,000, after the £3,000 annual exempt amount",
          ],
        ],
        note: "An illustration, not a forecast. Assumes the exempt amount is unused, and shows UK tax before any credit for Indian tax on the same gain. A reporting fund also brings tax each year on income it reports but does not pay out.",
      },
      {
        caption: "Which filings apply to a UK resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Self Assessment, foreign pages",
            "Anyone with foreign income or gains to declare",
            "Reports Indian dividends, offshore income gains and capital gains, and claims credit for Indian tax",
            "HMRC",
          ],
          [
            "A check of HMRC's reporting funds list",
            "Anyone holding or buying an Indian fund",
            "Not a filing, but it decides the tax. Check the exact share class and its dates. List last updated 4 November 2026",
            "GOV.UK",
          ],
          [
            "Residency certificate and India's treaty-information form",
            "Anyone claiming the treaty's 10% cap on Indian dividend tax",
            "The certificate comes from your own tax authority. The form is filed online in India",
            "India's e-filing portal",
          ],
          [
            "Indian tax return",
            "Anyone owed a refund of tax deducted in India",
            "The only route to a refund",
            "India's e-filing portal",
          ],
          [
            "Self-certification of tax residence",
            "Every account holder",
            "India is on HMRC's list of jurisdictions taking part in the Common Reporting Standard",
            "Your Indian banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      {
        q: "Can a UK NRI invest in Indian mutual funds?",
        a: [
          "Yes. UK law does not stop you, but taxes the result in one of two very different ways.",
          "If your share class has HMRC reporting fund status, your profit on sale is a capital gain: 18% or 24% for 2026 to 2027, after a £3,000 annual exempt amount.",
          "If not, the profit is an offshore income gain, charged to income tax. The additional rate is 45% on income over £125,140.",
          "Shares you hold directly are not fund units, so their gains fall under capital gains tax.",
          "UK dividend tax is 10.75%, 35.75% or 39.35% for 2026 to 2027, after a £500 allowance. The Budget of 28 October 2026 left it unchanged and raised the rates on savings and property income by two percentage points from April 2027.",
          "The treaty leaves gains to each country's own law. On dividends it caps Indian tax at 10% for an individual, below India's own 20%.",
        ],
        sources: [UK.reg17, UK.cgt, UK.it, UK.div, UK.treaty, UK.budget],
      },
    ],
    mistakes: [MISTAKE_ADVICE_LATER, MISTAKE_INDIAN_LOGIC, MISTAKE_STATUS],
    sources: [
      UK.cgt,
      UK.it,
      UK.div,
      UK.reg17,
      UK.treaty,
      UK.budget,
      UK.list,
      UK.crs,
      ...INDIA_SOURCES,
    ],
  },

  uae: {
    extraTables: [
      gainIllustration(
        "the UAE",
        "The tribunal reading holding, your 183 days in the calendar year, and the paperwork being filed",
      ),
      {
        caption: "Which filings apply to a UAE resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Tax Residency Certificate",
            "Anyone claiming the treaty in India",
            "UAE law offers several routes to residence, including 183 days in a 12-month period. The India treaty asks for 183 days in the calendar year",
            "Federal Tax Authority",
          ],
          [
            "India's treaty-information form",
            "Anyone claiming the treaty in India",
            "Filed online only. The certificate is a prerequisite",
            "India's e-filing portal",
          ],
          [
            "Indian tax return",
            "Anyone claiming a refund of tax deducted",
            "The only route to a refund",
            "India's e-filing portal",
          ],
          [
            "Self-certification of tax residence",
            "Every account holder",
            "India and the UAE have both signed the Common Reporting Standard agreement on exchanging account data",
            "Your banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      {
        q: "What exactly did the tribunals decide about mutual funds and the UAE treaty?",
        a: [
          "Less than the headline suggests.",
          "In July 2019 the Cochin bench of the Income Tax Appellate Tribunal dismissed the tax department's appeal against a UAE resident with short-term gains of about ₹1.35 crore on equity and debt mutual fund units. The tribunal held the gains fell under the treaty paragraph for property other than shares, so were not taxable in India.",
          "In October 2024 the Delhi bench held that another UAE resident was entitled to the treaty, noting that no contrary judgment had been put before it.",
          "Both are tribunal decisions about fund units. Neither says anything about shares, where the treaty gives India the right to tax.",
          "We searched on 11 November 2026 for a High Court or Supreme Court ruling on the point and found none.",
        ],
        sources: [SRC.faizal, UAE.kanoi],
      },
      {
        q: "So should a UAE resident prefer mutual funds or shares?",
        a: [
          "On tax alone, the treaty reading favours fund units for a settled UAE resident who will do the paperwork. If it holds, the Indian tax on the gain comes back. If a higher court overturns it, you pay what a share investor pays anyway: the ordinary rate, not a penalty.",
          "Funds also avoid a yearly trickle of dividend deductions. The treaty is reported to cap Indian tax on dividends at 10%, against India's own 20%, but each claim still needs the certificate and the form.",
          "That answer is conditional: 183 days in the UAE in the calendar year, a residency certificate for the right period, and patience while the deducted tax is refunded.",
          "Shares still make sense if you want to choose companies yourself.",
        ],
      },
    ],
    mistakes: [MISTAKE_ADVICE_LATER, MISTAKE_STATUS],
    sources: [UAE.cd85, OECD_CRS, SRC.act2025, SRC.form41, SRC.nrFaq, SRC.rbiAccounts],
  },
};
