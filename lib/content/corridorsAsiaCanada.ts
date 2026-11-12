import type { Corridor } from "./types";
import {
  CHECK_RECORDS,
  CHECK_STATUS,
  INDIA_RESIDENCE_QA,
  INDIA_SOURCES,
  CHECK_ADVISER,
  CHECK_PMS_REPORTING,
  MISTAKE_ADVICE_LATER,
  MISTAKE_INDIAN_LOGIC,
  MISTAKE_REFUND,
  WHY_INDIA_QA,
  MISTAKE_STATUS,
  NEW_COMMON,
  RELATED_COMMON,
  SRC,
  indiaPaperworkQA,
  indiaTaxQA,
} from "./corridorsShared";

/**
 * Country guides for Canada, Singapore and Hong Kong. Added November 2026.
 *
 * Every foreign-law statement below was read on the page it cites on
 * 11 November 2026: laws-lois.justice.gc.ca, canada.ca, budget.canada.ca,
 * treaty-accord.gc.ca, iras.gov.sg, ird.gov.hk, and the tribunal orders as
 * published on Indian Kanoon. India-side limits are in corridorsShared.ts.
 *
 * Deliberately NOT stated, because no primary source could be read for it:
 *   - why Indian fund houses decline Canadian residents;
 *   - any combined federal-provincial Canadian rate;
 *   - which years an IRAS certificate of residence can be issued for;
 *   - how Canada's motive test has been applied by the courts.
 */

const CA = {
  s941: {
    label:
      "Income Tax Act (Canada) s.94.1 — offshore investment fund property (current to 19 October 2026)",
    url: "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-94.1.html",
  },
  s53: {
    label: "Income Tax Act (Canada) s.53 — adjustments to cost base",
    url: "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-53.html",
  },
  rates: {
    label: "CRA — prescribed interest rates, fourth quarter 2026",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/prescribed-interest-rates/2026-q4.html",
  },
  t1135: {
    label: "CRA — questions and answers about Form T1135 (19 October 2026)",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/information-been-moved/foreign-reporting/questions-answers-about-form-t1135.html",
  },
  penalties: {
    label: "CRA — table of penalties for foreign reporting",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/information-been-moved/foreign-reporting/table-penalties.html",
  },
  budget: {
    label: "Budget 2026 (5 November 2026) — tax measures, Form T1135 proposal",
    url: "https://budget.canada.ca/2026/report-rapport/tm-mf-en.html",
  },
  s38: {
    label: "Income Tax Act (Canada) s.38 — taxable capital gain is one half",
    url: "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-38.html",
  },
  brackets: {
    label: "CRA — federal tax rates and income brackets for 2026",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html",
  },
  ftc: {
    label: "CRA — line 40500, federal foreign tax credit",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-40500-federal-foreign-tax-credit.html",
  },
  treaty: {
    label: "Canada–India tax agreement (1996), Articles 10 and 13",
    url: "https://www.treaty-accord.gc.ca/text-texte.aspx?lang=eng&id=102409",
  },
  newcomers: {
    label: "CRA — completing a return as a newcomer to Canada",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/newcomers-canada-immigrants/completing-return-newcomers.html",
  },
  folio: {
    label: "CRA Income Tax Folio S5-F1-C1 — determining residence status",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/technical-information/income-tax/income-tax-folios-index/series-5-international-residency/folio-1-residency/income-tax-folio-s5-f1-c1-determining-individual-s-residence-status.html",
  },
  t4037: {
    label: "CRA guide T4037 — capital gains (foreign currency conversion)",
    url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4037/capital-gains.html",
  },
  crs: {
    label: "CRA — Common Reporting Standard, list of participating jurisdictions",
    url: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/enhanced-financial-account-information-reporting/reporting-sharing-financial-account-information-other-jurisdictions/list-participating-jurisdictions.html",
  },
};

const SG = {
  treaty: {
    label:
      "India–Singapore tax agreement, IRAS consolidated text with the 2016 Protocol — Articles 10, 13, 24 and 29A",
    url: "https://www.iras.gov.sg/media/docs/default-source/dtas/protocol-amending-singapore-india-dta-(ratified)(mli)(1-oct-2019).pdf",
  },
  residency: {
    label: "IRAS — working out my tax residency (12 May 2026)",
    url: "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/working-out-my-tax-residency",
  },
  gains: {
    label:
      "IRAS — gains from sale of property, shares and financial instruments (27 February 2026)",
    url: "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not/gains-from-sale-of-property-shares-and-financial-instruments",
  },
  overseas: {
    label: "IRAS — income received from overseas (2 March 2026)",
    url: "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not/income-received-from-overseas",
  },
  cor: {
    label: "IRAS — apply for a Certificate of Residence (20 August 2026)",
    url: "https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/apply-for-certificate-of-residence",
  },
  crs: {
    label: "IRAS — CRS list of reportable jurisdictions (updated 2 February 2026)",
    url: "https://www.iras.gov.sg/docs/default-source/uploadedfiles/pdf/list-of-reportable-jurisidictions.pdf",
  },
  keskar: {
    label:
      "Varun Hemant Keskar v. ITO, ITAT Pune, ITA 133/PUN/2026 (12 October 2026)",
    url: "https://indiankanoon.org/doc/158450727/",
  },
};

const HK = {
  treaty: {
    label:
      "India–Hong Kong tax agreement (signed 19 March 2018), IRD synthesised text — Articles 4, 10 and 14",
    url: "https://www.ird.gov.hk/eng/pdf/Synthesised_Text_HKSAR_India.pdf",
  },
  inForce: {
    label: "IRD — comprehensive double taxation agreements concluded",
    url: "https://www.ird.gov.hk/eng/tax/dta_inc.htm",
  },
  cor: {
    label: "IRD — Certificate of Resident Status",
    url: "https://www.ird.gov.hk/eng/tax/dta_cor.htm",
  },
  form: {
    label: "IRD Form IR1314B — application by an individual",
    url: "https://www.ird.gov.hk/eng/pdf/ir1314b_e.pdf",
  },
  guide: {
    label: "IRD — A Brief Guide to Taxes Administered (2023–24)",
    url: "https://www.ird.gov.hk/eng/pdf/2024/BriefGuide20232024.pdf",
  },
  fsie: {
    label: "IRD — foreign-sourced income exemption regime",
    url: "https://www.ird.gov.hk/eng/tax/bus_fsie.htm",
  },
  crs: {
    label: "IRD — automatic exchange of information, reportable jurisdictions",
    url: "https://www.ird.gov.hk/eng/tax/aeoi/rpt_jur.htm",
  },
};

export const CORRIDORS_ASIA_CANADA: Corridor[] = [
  // ───────────────────────────────────────────────────────────── CANADA ──
  {
    slug: "canada",
    code: "CA",
    flag: "🇨🇦",
    country: "Canada",
    label: "Canada",
    hreflang: "en-CA",
    marketNote: "If you are tax-resident in Canada",
    title: "Investing in India from Canada: mutual funds, shares and the tax on each",
    hook: "Canada can tax an Indian mutual fund every year on income it never paid you.",
    capsule:
      "A Canadian resident can invest in Indian mutual funds and shares. Canada taxes worldwide income, and the treaty lets both countries tax the gain. Fund units can fall under Canada's offshore investment fund rule, which adds deemed income each year. Foreign holdings costing over CAD 100,000 go on Form T1135.",
    lede: "India taxes a mutual fund and a share almost alike. Canada does not. This guide covers its offshore investment fund rule, the reporting, and what India takes first.",
    facts: [
      ["Who Canada taxes", "Residents, on worldwide income. Not citizens as such"],
      ["Treaty on gains", "Both may tax. Relief by foreign tax credit"],
      ["Rule to check for fund units", "Offshore investment fund property, s.94.1"],
      ["Reporting form", "T1135, once foreign property cost passes CAD 100,000"],
      ["Capital gains", "One half of the gain is taxable"],
    ],
    table: {
      caption: "How each Indian holding is treated on a Canadian return",
      head: ["What you hold", "Offshore fund rule (s.94.1)", "On sale", "Reporting"],
      rows: [
        [
          "Indian mutual fund or ETF units",
          "Can apply. Two tests: where the value comes from, and why you hold the units",
          "Capital gain, one half taxable. s.94.1 inclusions are added to cost",
          "T1135. CRA says the fund investment itself is specified foreign property",
        ],
        [
          "Listed shares held directly",
          "Only if the company's value derives primarily from portfolio investments",
          "Capital gain, one half taxable",
          "T1135. Shares of non-resident corporations are specified foreign property",
        ],
        [
          "PMS (shares held in your own name)",
          "Share by share. Fund units the manager buys are tested as fund units",
          "Each sale by the manager is your own disposal",
          "T1135, for shares and any fund units",
        ],
      ],
      note: "The offshore fund rule has no minimum. CAD 100,000 is the Form T1135 reporting threshold, not a tax threshold.",
    },
    extraTables: [
      {
        caption: "Which filings apply to a Canadian resident with Indian investments?",
        head: ["Filing", "Who it catches", "What it is", "Where"],
        rows: [
          [
            "Form T1135",
            "Anyone whose specified foreign property cost over CAD 100,000 at any time in the year",
            "Reporting only. Simplified method below CAD 250,000. Late filing: CAD 25 a day, up to CAD 2,500",
            "Canada Revenue Agency",
          ],
          [
            "Form T2209",
            "Anyone claiming credit for Indian tax paid",
            "Federal foreign tax credit: the lower of Indian tax paid and Canadian tax on that Indian income",
            "With your Canadian return",
          ],
          [
            "Residency certificate and India's treaty form",
            "Anyone claiming a treaty rate in India",
            "Certificate from your own tax authority. Form filed online in India",
            "India's e-filing portal",
          ],
          [
            "Indian tax return",
            "Anyone owed a refund of Indian tax deducted",
            "The only route to a refund",
            "India's e-filing portal",
          ],
          [
            "Self-certification of tax residence",
            "Every account holder",
            "Indian banks and fund houses report your accounts to Canada under the Common Reporting Standard",
            "Your Indian institutions",
          ],
        ],
        note: "Budget 2026, tabled on 5 November 2026, proposes raising the T1135 threshold to CAD 200,000 and the simplified-method ceiling to CAD 500,000 for years ending after 2026. It is a proposal. The 2026 tax year uses current figures.",
      },
      {
        caption: "What the offshore fund rule could cost over ten years",
        head: ["Step", "Amount", "Assumption"],
        rows: [
          ["Cost of fund units", "CAD 200,000", "Held ten full years, no distributions"],
          ["Deemed income, year 1", "CAD 10,000", "5% factor: the 3% prescribed rate for late 2026, plus 2 points"],
          ["Deemed income, ten years", "About CAD 125,800", "Factor stays at 5%; each year's inclusion is added to cost"],
          ["Tax on that income", "About CAD 62,900", "Combined federal and provincial marginal rate of 50%"],
          ["Cost base at the end", "About CAD 325,800", "Inclusions reduce the gain taxed on sale"],
        ],
        note: "An illustration. Neither assumption will hold exactly: the prescribed rate changes quarterly, and your marginal rate depends on province and income. The tax is paid in cash each year, even when the fund loses value.",
      },
    ],
    qas: [
      {
        q: "Can a Canadian resident invest in Indian mutual funds?",
        a: [
          "Yes. Canadian tax law does not stop you, though each Indian fund house decides whether to open a folio for a Canadian address.",
          "Canada taxes residents on worldwide income, so the fund is on your Canadian return from the day you are resident. The units may fall under the offshore investment fund rule, and their cost counts towards the CAD 100,000 Form T1135 threshold.",
        ],
        sources: [CA.folio, CA.s941, CA.t1135],
      },
      {
        q: "What is the offshore investment fund property rule, and does it catch Indian mutual funds?",
        a: [
          "Section 94.1 of the Canadian Income Tax Act can add an amount to your income every year, whether or not the fund paid you anything.",
          "Two conditions must both be met. First, you hold a share of, an interest in, or a debt of a non-resident entity whose value may reasonably be considered to derive primarily from portfolio investments. A fund holding listed shares and bonds fits.",
          "Second, it is reasonable to conclude that one of your main reasons for holding it was to benefit from those investments so that the tax on them is significantly lower than if you had earned the income directly. The Act's factors include how heavily the fund's income is taxed abroad compared with Canada, and how much it distributes each year. A growth-option fund that distributes nothing does not help you.",
          "The motive test is subjective, so the answer is not automatic. The cautious assumption for an Indian mutual fund is that it is met. Ask a Canadian tax adviser before buying, with the fund's distribution policy in hand.",
        ],
        sources: [CA.s941],
      },
      {
        q: "How much does the offshore fund rule add to my income?",
        a: [
          "The formula runs monthly. Take the designated cost of the holding at each month-end, multiply by one-twelfth of the prescribed interest rate plus two percentage points, and add the twelve results. Subtract any income the fund actually paid you in the year, other than capital gains.",
          "The Canada Revenue Agency publishes the prescribed rate quarterly. For October to December 2026 it was 3%, so the factor was 5%. Look up the current quarter.",
          "The amount is taxed as income at your marginal rate, then added to the cost of the units, so it is not taxed again on sale. The formula uses cost, not performance, so the inclusion arises even in a year the fund falls.",
        ],
        sources: [CA.s941, CA.s53, CA.rates],
      },
      {
        q: "How does Canada tax the gain when I sell Indian shares or fund units?",
        a: [
          "As a capital gain. One half is taxable, at your marginal rate. For 2026 the top federal rate is 33% on income above CAD 258,482. Provincial tax is added and differs by province.",
          "A proposal to raise the taxable share above one half was cancelled, as the government confirmed in Budget 2025.",
          "The gain is in Canadian dollars: proceeds at the sale-date exchange rate, cost at the purchase-date rate. Rupee moves are part of your gain or loss.",
          "India will usually have taxed the gain first. Canada's foreign tax credit is limited to the lower of the Indian tax paid and the Canadian tax on your income from India.",
        ],
        sources: [CA.s38, CA.brackets, CA.t4037, CA.ftc],
      },
      {
        q: "Does the Canada–India tax treaty reduce the tax?",
        a: [
          "Not on gains. The treaty's capital gains article says gains on property, other than ships and aircraft in international traffic, may be taxed in both countries. The credit prevents double tax.",
          "On dividends the treaty caps Indian tax at 25% for an individual. The 15% rate is for a company controlling at least 10% of the voting power. India's own rate on dividends to a non-resident is 20%, already below the cap, so the treaty changes nothing.",
        ],
        sources: [CA.treaty, SRC.act2025],
      },
      {
        q: "I bought Indian funds before I moved to Canada. Is the old gain taxed there?",
        a: [
          "No. On becoming a Canadian resident you are treated as having sold and re-bought most of your property at fair market value that day. The Canada Revenue Agency says that value becomes your cost, so earlier growth is outside the Canadian gain.",
          "You must prove the value. Save the fund statement, share prices and exchange rate for that date.",
          "The step-up does not switch off the offshore fund rule or Form T1135 for later years.",
        ],
        sources: [CA.newcomers],
      },
      {
        q: "Why do many Indian fund houses turn away Canadian residents?",
        a: [
          "Many decline Canadian addresses, often alongside US ones. Each fund house sets the policy in its scheme documents.",
          "The reason usually given is Canadian securities regulation. A foreign firm dealing with ordinary Canadian residents generally needs Canadian registration, and the exemptions for international firms are built around institutional and very wealthy clients. Reporting obligations add cost.",
          "We have not found an Indian regulator's rule requiring the exclusion. Treat it as a commercial decision that varies between houses and can change.",
        ],
      },
      {
        q: "Are direct Indian shares or a PMS safer than funds for a Canadian resident?",
        a: [
          "For most holdings, yes, on the offshore fund rule. It looks at entities whose value comes mainly from portfolio investments. A bank, manufacturer or software company does not fit. An investment holding company can.",
          "So shares of operating companies in your own name generally sit outside the rule, leaving ordinary capital gains tax in both countries, with a credit. A portfolio management account works the same way, because the shares are in your name.",
          "But a liquid or overnight fund holding idle cash is a pooled vehicle, as is any exchange-traded fund, including a gold fund. Ask the manager to hold cash as cash.",
          "Every share sale is a disposal to report in Canadian dollars, and trading Indian market hours from Canada is impractical for most people. That is the usual argument for a manager who understands the pooled-vehicle rule.",
        ],
        sources: [CA.s941],
      },
      WHY_INDIA_QA,
      indiaTaxQA("Canada"),
      indiaPaperworkQA(
        "The Canada–India treaty gives an individual no lower Indian rate on gains or dividends, so for most Canadian residents this matters only when reclaiming over-deducted tax.",
        CA.treaty,
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      {
        m: "Treating CAD 100,000 as the level below which nothing is taxed",
        why: "That is the Form T1135 reporting threshold. The offshore fund rule has no minimum, and gains are taxable from the first dollar.",
      },
      {
        m: "Assuming a fund that pays you nothing creates no Canadian income",
        why: "Under the offshore fund rule the inclusion is based on cost and a published rate, and low distributions are one factor against you.",
      },
      {
        m: "Carrying last quarter's prescribed rate into this year's estimate",
        why: "The rate resets quarterly. The formula uses the rate for the period that includes each month.",
      },
      {
        m: "Arriving in Canada without recording what your Indian holdings were worth that day",
        why: "Your Canadian cost is fair market value on the day you became resident. Without evidence you cannot show how much of a later gain is Canada's.",
      },
      {
        m: "Letting a portfolio manager park your idle cash in a liquid fund or an ETF",
        why: "Those are pooled vehicles, which bring back the offshore fund question for that part of the portfolio.",
      },
      MISTAKE_ADVICE_LATER,
      MISTAKE_INDIAN_LOGIC,
      MISTAKE_STATUS,
    ],
    checklist: [
      CHECK_ADVISER,
      CHECK_PMS_REPORTING,
      "Confirm the date you became a Canadian resident, and save the value of every Indian holding on that date.",
      "Add up the cost of all foreign property. Above CAD 100,000 at any point in the year, file Form T1135.",
      "For each fund holding, ask a Canadian adviser whether the offshore investment fund rule applies. Bring the fund's distribution record.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Canada: Indian Mutual Funds and Tax",
    metaDescription:
      "Can a Canadian NRI invest in Indian mutual funds? How Canada's offshore fund rule, Form T1135 and the foreign tax credit apply, and what India taxes first.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in the United States", href: "/nri/us" },
      { label: "NRIs in the United Kingdom", href: "/nri/uk" },
    ],
    ...NEW_COMMON,
    sources: [
      CA.s941,
      CA.s53,
      CA.rates,
      CA.t1135,
      CA.penalties,
      CA.budget,
      CA.s38,
      CA.brackets,
      CA.ftc,
      CA.treaty,
      CA.newcomers,
      CA.folio,
      CA.t4037,
      CA.crs,
      ...INDIA_SOURCES,
    ],
  },

  // ────────────────────────────────────────────────────────── SINGAPORE ──
  {
    slug: "singapore",
    code: "SG",
    flag: "🇸🇬",
    country: "Singapore",
    label: "Singapore",
    hreflang: "en-SG",
    marketNote: "If you are tax-resident in Singapore",
    title: "Investing in India from Singapore: mutual funds, shares and the treaty",
    hook: "Your zero on Indian mutual funds rests on one treaty paragraph and a handful of tribunal orders.",
    capsule:
      "A Singapore resident pays no Singapore tax on gains from Indian shares or fund units. India taxes gains on shares bought on or after 1 April 2017. For fund units, tribunals have held the treaty leaves the gain to Singapore alone. No High Court has ruled, India deducts tax first, and relief must be claimed.",
    lede: "The belief that Indian mutual fund gains are tax-free for Singapore residents rests on one paragraph of the India–Singapore treaty and a short line of tribunal orders. It is reasonable, but narrower and less settled than the headline suggests. This guide sets out the treaty text, the tribunal decisions and the conditions.",
    facts: [
      ["Singapore tax on the gain", "None. Gains on shares and financial instruments are generally not taxed"],
      ["India's right over shares", "Yes, for shares bought on or after 1 April 2017"],
      ["India's right over fund units", "Tribunals say no. No High Court ruling found"],
      ["Dividends", "India may tax at up to 15% under the treaty"],
      ["What relief needs", "IRAS certificate, India's online form, an Indian return"],
    ],
    table: {
      caption: "Shares or mutual fund units: what the India–Singapore treaty says about each",
      head: ["What you sell", "Treaty paragraph", "Who may tax the gain", "How firm is it?"],
      rows: [
        [
          "Indian company shares bought on or after 1 April 2017",
          "Article 13(4B)",
          "India may tax. Singapore does not tax the gain",
          "Clear on the treaty text",
        ],
        [
          "Indian company shares bought before 1 April 2017",
          "Article 13(4A)",
          "Singapore only",
          "Clear on the text. A separate anti-abuse article applies to this paragraph",
        ],
        [
          "Indian mutual fund units",
          "Article 13(5), the residual paragraph",
          "Singapore only, on the tribunals' reading",
          "Tribunal level. The tax officer took the opposite view in the leading case",
        ],
        [
          "Dividends and fund distributions",
          "Article 10",
          "India, at up to 15%",
          "Clear on the text",
        ],
      ],
      note: "The treaty word is \"shares\" in a \"company\". Indian mutual funds are trusts issuing units. That difference is the whole argument.",
    },
    extraTables: [
      {
        caption: "What a ₹40 lakh long-term gain looks like for a Singapore resident",
        head: ["Holding", "Indian tax", "Singapore tax", "Depends on"],
        rows: [
          [
            "Listed Indian shares bought in 2021",
            "₹4,84,375: 12.5% of the gain above ₹1.25 lakh",
            "Nil",
            "Nothing contested. India taxes under Article 13(4B)",
          ],
          [
            "Equity mutual fund units, if the tribunal reading holds",
            "Nil in the end. Tax deducted at redemption is claimed back",
            "Nil",
            "The treaty claim being accepted and the paperwork filed",
          ],
          [
            "Equity mutual fund units, if the reading is overturned",
            "₹4,84,375",
            "Nil",
            "A higher court deciding units are taxed like shares",
          ],
        ],
        note: "An illustration, not a forecast. Indian figures are before surcharge and cess and assume no other gains in the year. The worst case on fund units is the ordinary Indian rate, as on shares.",
      },
      {
        caption: "Which filings apply to a Singapore resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Certificate of Residence",
            "Anyone claiming the treaty in India",
            "Proves Singapore tax residence. IRAS says processing takes two to three weeks",
            "IRAS, online",
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
            "Declares the gain and makes the treaty claim",
            "India's e-filing portal",
          ],
          [
            "Self-certification of tax residence",
            "Every account holder",
            "India is on Singapore's list of reportable jurisdictions. Both exchange account data under the Common Reporting Standard",
            "Your banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      {
        q: "Are Indian mutual fund gains really tax-free for a Singapore resident?",
        a: [
          "On the tribunal decisions so far, yes, with conditions.",
          "The treaty lets India tax gains on shares of an Indian company. Its last capital-gains paragraph says gains on any other property are taxable only where the seller is resident. Indian mutual funds issue units, not shares.",
          "In March 2025 the Mumbai bench of the Income Tax Appellate Tribunal applied that paragraph to a Singapore resident's short-term gains of about ₹1.36 crore on debt and equity fund units. The tribunal held them not taxable in India.",
          "The limits: the order adopts earlier tribunal decisions with little reasoning of its own, and dealt with short-term gains. The tax officer had taken the opposite view. We searched for a High Court or Supreme Court ruling on 11 November 2026 and found none.",
          "So tribunals support the position, but it is not settled law. A higher court could decide the other way.",
        ],
        sources: [SG.treaty, SRC.anushka, SRC.faizal],
      },
      {
        q: "Is the gain on Indian shares also exempt for a Singapore resident?",
        a: [
          "No, not for anything bought in the last several years. Under a protocol signed on 30 December 2016, gains on shares of an Indian company bought on or after 1 April 2017 may be taxed in India, at its ordinary rates.",
          "Shares bought before 1 April 2017 are still taxable only in Singapore. That paragraph has its own anti-abuse article, aimed at arrangements set up mainly to obtain the benefit.",
          "Singapore taxes the gain in neither case, so for recent shares the Indian tax is the whole tax.",
        ],
        sources: [SG.treaty, SG.gains],
      },
      {
        q: "What could undo the mutual fund position?",
        a: [
          "Four things.",
          "<b>A higher court.</b> Every decision so far is from a tribunal. An appeal can change the answer for everyone.",
          "<b>Your own residence.</b> The treaty protects a Singapore resident. If India also treats you as resident that year, the claim becomes a tie-breaker argument.",
          "<b>The principal purpose test.</b> A treaty article now denies any benefit where obtaining it was one of the principal purposes of an arrangement. Moving to Singapore briefly in order to sell is the pattern it targets.",
          "<b>The remittance article.</b> The treaty limits relief where the other country taxes income only when remitted. Nobody argued this in the leading case, so it has not been tested for an individual whose gain Singapore does not tax at all.",
          "If the position fails, you pay India's ordinary rate, as a share investor does. It is not a penalty rate.",
        ],
        sources: [SG.treaty, SRC.anushka],
      },
      {
        q: "Who counts as a Singapore tax resident?",
        a: [
          "Singapore citizens and permanent residents who normally live there, apart from temporary absences, and foreigners who stayed or worked in Singapore for at least 183 days in the previous calendar year.",
          "Singapore counts the calendar year. India counts 1 April to 31 March. A mid-year move can leave you resident in both for a period.",
          "You prove residence for the treaty with a Certificate of Residence from the Inland Revenue Authority of Singapore.",
        ],
        sources: [SG.residency, SG.cor],
      },
      {
        q: "Does Singapore tax my Indian gains or dividends?",
        a: [
          "Generally not. The Inland Revenue Authority of Singapore says profits from buying and selling shares or other financial instruments are generally viewed as personal investments, not taxed as income.",
          "IRAS also says overseas income received in Singapore, including money paid into a Singapore bank account, is generally not taxable for an individual.",
          "Both say \"generally\": someone trading as a business is in a different position. For an ordinary investor, Singapore adds nothing to the Indian bill.",
        ],
        sources: [SG.gains, SG.overseas],
      },
      {
        q: "If the gain is exempt, why did the fund house still deduct tax?",
        a: [
          "Deduction comes first and the treaty claim later. A fund house paying a non-resident deducts tax at redemption and pays you the net. You claim the treaty afterwards in an Indian tax return, backed by your Singapore certificate and India's online form.",
          "In a Pune tribunal order of October 2026, a Singapore resident with a long-term fund gain had paid the tax. The tribunal sent the case back to the tax officer to recompute in line with the Mumbai decision. Relief came through an appeal, not at redemption.",
        ],
        sources: [SG.keskar, SRC.form41],
      },
      {
        q: "How long does the refund take, and what does it cost?",
        a: [
          "Longer than most expect. This is what practitioners report, not published rules.",
          "A residency certificate is generally issued for a completed year, and the Indian return is filed after the Indian tax year ends. So a refund can arrive one to two years after the sale: sell in April 2026 and it may be early 2028. The deducted tax is out of your hands until then.",
          "A Chartered Accountant will typically charge around ₹20,000 to ₹25,000 for the certificate, the form and the return, usually money well spent on a meaningful redemption.",
        ],
      },
      {
        q: "So should a Singapore resident prefer mutual funds or shares?",
        a: [
          "On tax alone, the treaty reading favours fund units for a long-term Singapore resident who will do the paperwork. If it holds, the Indian tax comes back. If it is overturned, you pay what a share investor pays: the ordinary rate, not a penalty.",
          "That assumes you are clearly resident in Singapore and not India, are not arranging your residence around a sale, and can leave the deducted tax outstanding until the refund.",
          "Shares still make sense if you have real conviction in picking them, or want dividends, which the treaty taxes at up to 15% either way. Tax should not be the only reason to choose a vehicle.",
        ],
        sources: [SG.treaty],
      },
      WHY_INDIA_QA,
      indiaTaxQA("Singapore"),
      indiaPaperworkQA(
        "For Singapore that is a Certificate of Residence from IRAS, applied for online. IRAS says processing takes two to three weeks.",
        SG.cor,
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      {
        m: "Applying the mutual fund reading to shares",
        why: "The treaty lets India tax gains on shares bought on or after 1 April 2017. The residual paragraph is argued only for units.",
      },
      {
        m: "Calling the mutual fund position settled",
        why: "It rests on tribunal orders. The tax officer argued the opposite in the leading case and no High Court ruling was found.",
      },
      {
        m: "Selling and rebuying every year to lock the position in",
        why: "Each redemption triggers a deduction at source and a refund claim, and turns long-term holdings into short-term ones, which carry the higher Indian rate if the position fails.",
      },
      {
        m: "Expecting dividends to be covered by the same argument",
        why: "They are not capital gains. The treaty lets India tax dividends at up to 15% for an individual investor.",
      },
      {
        m: "Moving to Singapore for a few months in order to sell",
        why: "India's residence tests look back four years, so a short stay may not make you non-resident. The treaty's principal purpose test targets exactly this.",
      },
      {
        m: "Treating Singapore and Hong Kong as interchangeable",
        why: "The two treaties end their capital gains articles differently. Hong Kong's lets India tax mutual fund gains.",
      },
      MISTAKE_REFUND,
      MISTAKE_STATUS,
    ],
    checklist: [
      CHECK_ADVISER,
      "Confirm you are Singapore tax-resident for the year of sale, and check your Indian day count for that period.",
      "Separate shares bought before 1 April 2017, shares bought after, and fund units. Each has a different answer.",
      "Apply to IRAS for a Certificate of Residence, then file India's online treaty form.",
      "File an Indian return for any year whose deducted tax you intend to claim back.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Singapore: Mutual Funds and the Treaty",
    metaDescription:
      "Are Indian mutual fund gains tax-free for a Singapore NRI? What the treaty says about units and shares, what tribunals decided, and how to claim relief.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in Hong Kong: why the answer differs", href: "/nri/hong-kong" },
      { label: "NRIs in the UAE", href: "/nri/uae" },
    ],
    ...NEW_COMMON,
    sources: [
      SG.treaty,
      SRC.anushka,
      SRC.faizal,
      SG.keskar,
      SG.residency,
      SG.gains,
      SG.overseas,
      SG.cor,
      SG.crs,
      ...INDIA_SOURCES,
    ],
  },

  // ────────────────────────────────────────────────────────── HONG KONG ──
  {
    slug: "hong-kong",
    code: "HK",
    flag: "🇭🇰",
    country: "Hong Kong",
    label: "Hong Kong",
    hreflang: "en-HK",
    marketNote: "If you are resident in Hong Kong",
    title: "Investing in India from Hong Kong: mutual funds, shares and the treaty",
    hook: "Hong Kong is not Singapore. The treaty lets India tax your mutual fund gains.",
    capsule:
      "A Hong Kong resident's Indian investments are taxed by India at its ordinary rates, whether shares or mutual fund units. The India–Hong Kong agreement lets India tax gains on shares, and on any other property under its domestic law. Its real benefit is on dividends, where Indian tax is capped at 5%.",
    lede: "Hong Kong is often grouped with Singapore, but the agreements differ where it matters for a fund investor. The Singapore treaty leaves gains on \"other property\" to the country of residence. The Hong Kong agreement, signed in 2018, lets each side tax them.",
    facts: [
      ["India's right over shares", "Yes. Article 14(5)"],
      ["India's right over fund units", "Yes, under its domestic law. Article 14(6)"],
      ["Dividends", "Indian tax capped at 5%"],
      ["Agreement in force", "30 November 2018"],
      ["Residence for the agreement", "Ordinarily resident, or over 180 days in a year of assessment"],
    ],
    table: {
      caption: "Shares or mutual fund units: what the India–Hong Kong agreement says",
      head: ["What you hold", "Agreement paragraph", "Who may tax", "Result"],
      rows: [
        [
          "Shares of an Indian company",
          "Article 14(5)",
          "India may tax the gain",
          "Indian tax at ordinary rates",
        ],
        [
          "Indian mutual fund units",
          "Article 14(6)",
          "Each side may tax under its domestic law",
          "Indian tax at ordinary rates. No residence-only paragraph to rely on",
        ],
        [
          "Dividends from Indian companies",
          "Article 10(2)",
          "India, capped at 5% of the gross dividend",
          "Lower than India's domestic rate, if you claim it",
        ],
      ],
      note: "The capital gains article here is Article 14. Its last paragraph is what differs from the Singapore and UAE treaties.",
    },
    extraTables: [
      {
        caption: "What the agreement is worth on a ₹2 lakh dividend",
        head: ["Step", "Amount", "Basis"],
        rows: [
          ["India's rate on dividends to a non-resident", "₹40,000", "20% of the gross dividend"],
          ["Cap under the agreement", "₹10,000", "5% of the gross dividend"],
          ["Difference you can claim", "₹30,000", "With a Hong Kong certificate, India's online form and, for a refund, an Indian return"],
        ],
        note: "An illustration, before surcharge and cess. On a ₹40 lakh long-term gain the agreement changes nothing: Indian tax is 12.5% above ₹1.25 lakh, or ₹4,84,375, for shares and equity fund units alike.",
      },
      {
        caption: "Which filings apply to a Hong Kong resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Certificate of Resident Status, Form IR1314B",
            "Anyone claiming the 5% dividend rate",
            "Proves Hong Kong residence for the agreement. The department's target is 21 working days",
            "Inland Revenue Department",
          ],
          [
            "India's treaty-information form",
            "Anyone claiming the agreement in India",
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
            "India is a reportable jurisdiction for Hong Kong, and account data is exchanged automatically",
            "Your banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      {
        q: "Are Indian mutual fund gains tax-free for a Hong Kong resident, as they are argued to be for Singapore?",
        a: [
          "No. This is the key difference between the two.",
          "The Singapore and UAE treaties end their capital gains article by saying gains on any other property are taxable only where the seller lives. The mutual fund argument rests on that paragraph.",
          "The India–Hong Kong agreement's last paragraph says such gains may be taxed by each side under its own domestic law. So even if fund units are not shares, India keeps its right to tax them.",
          "A Hong Kong resident pays India's ordinary capital gains tax on fund units, as on shares.",
        ],
        sources: [HK.treaty],
      },
      {
        q: "So is there any tax reason to prefer shares or mutual funds from Hong Kong?",
        a: [
          "Not on capital gains. India taxes both at the same rates, and Hong Kong adds nothing.",
          "The difference is in income. The agreement caps Indian tax on share dividends at 5%. A growth-option fund pays nothing along the way, so there is no dividend to claim relief on.",
          "That is a small point. Choose the vehicle on its merits.",
        ],
        sources: [HK.treaty],
      },
      {
        q: "Does Hong Kong tax my Indian gains or dividends?",
        a: [
          "Hong Kong taxes on a territorial basis. Its Inland Revenue Department says profits tax is charged on profits arising in or derived from Hong Kong from a trade, profession or business carried on there, and that a resident may derive profits from abroad without being charged to tax.",
          "Profits from the sale of capital assets are excluded from profits tax. The system looks at where income arises, not where it ends up, so foreign investment income is not taxed merely because you bring it into Hong Kong.",
          "Hong Kong's regime taxing some foreign-sourced income applies only to entities in multinational groups. The department defines an entity as a legal person other than a natural person, so individuals are outside it.",
          "Someone carrying on a trade in securities is in a different position from an investor.",
        ],
        sources: [HK.guide, HK.fsie],
      },
      {
        q: "How do I get the 5% dividend rate?",
        a: [
          "You claim it. It is not applied by default.",
          "First, a Certificate of Resident Status from the Inland Revenue Department, on Form IR1314B for individuals. You qualify if you ordinarily reside in Hong Kong, or stay more than 180 days in a year of assessment, or more than 300 days across two consecutive years of assessment.",
          "Second, India's online treaty-information form, with the certificate.",
          "If the company has already deducted at India's domestic rate, the difference comes back through an Indian tax return.",
        ],
        sources: [HK.cor, HK.form, HK.treaty, SRC.form41],
      },
      WHY_INDIA_QA,
      indiaTaxQA("Hong Kong"),
      indiaPaperworkQA(
        "For Hong Kong that is a Certificate of Resident Status from the Inland Revenue Department, applied for on Form IR1314B.",
        HK.cor,
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      {
        m: "Assuming Hong Kong and Singapore get the same treaty answer",
        why: "Singapore's treaty leaves gains on other property to the country of residence. Hong Kong's lets India tax them under its own law.",
      },
      {
        m: "Leaving the 5% dividend rate unclaimed",
        why: "India deducts at its domestic rate unless you have filed a Hong Kong certificate and the online form. The difference is refundable only through a return.",
      },
      {
        m: "Counting days on the wrong year",
        why: "Hong Kong's test uses its year of assessment. India's uses 1 April to 31 March. They do not line up.",
      },
      MISTAKE_STATUS,
    ],
    checklist: [
      CHECK_ADVISER,
      "Budget for Indian capital gains tax on both shares and fund units. The agreement does not remove it.",
      "If you hold dividend-paying Indian shares, apply for a Certificate of Resident Status on Form IR1314B.",
      "File India's online treaty form with the certificate, and an Indian return if tax was over-deducted.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Hong Kong: Mutual Funds and Tax",
    metaDescription:
      "Can a Hong Kong NRI invest in Indian mutual funds tax-free? Why the India–Hong Kong agreement differs from Singapore's, and the 5% dividend rate to claim.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in Singapore: the other treaty answer", href: "/nri/singapore" },
      { label: "NRIs in the UAE", href: "/nri/uae" },
    ],
    ...NEW_COMMON,
    sources: [
      HK.treaty,
      HK.inForce,
      HK.cor,
      HK.form,
      HK.guide,
      HK.fsie,
      HK.crs,
      ...INDIA_SOURCES,
    ],
  },
];
