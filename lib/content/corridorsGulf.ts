import type { Corridor, CorridorQA, CorridorTable } from "./types";
import {
  CHECK_RECORDS,
  CHECK_STATUS,
  INDIA_RESIDENCE_QA,
  INDIA_SOURCES,
  CHECK_ADVISER,
  MISTAKE_ADVICE_LATER,
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
 * Gulf country guides other than the UAE (which lives in corridors.ts).
 * Added November 2026.
 *
 * ONE COUNTRY, ONE TREATY. Nothing here is carried across from a neighbour.
 * Each statement was read on 11 November 2026 in that country's own copy of
 * its agreement with India, or on its tax authority's site:
 *   Saudi Arabia — zatca.gov.sa        Oman — tms.taxoman.gov.om
 *   Qatar — gta.gov.qa (the 2025 agreement)
 *
 * PUBLISHED ON THE OWNER'S INSTRUCTION of 11 November 2026 without a primary
 * read, and worded on the page as reported, not as verified:
 *   - Saudi Arabia: no personal income tax on an expatriate's investments.
 *   - Oman: the 2028 tax reaching a resident's foreign dividends and gains.
 *   - Qatar: in force 10 September 2025, applying in India from 1 April 2026.
 *   - Kuwait: the treaty following the UAE pattern; dividend relief range.
 *   - Bahrain: treaty negotiations reported; unilateral relief not available.
 *   - All: a conditional funds-versus-shares answer.
 * Still not stated: the Saudi in-force date; what the Oman protocol changed.
 *
 * The ZATCA copy of the Saudi agreement misnumbers the paragraphs of its
 * capital gains article, so the Saudi guide cites the article, not paragraphs.
 */

const KSA = {
  treaty: {
    label:
      "India–Saudi Arabia tax agreement (signed 25 January 2006), ZATCA copy — Articles 4, 10, 13 and 26",
    url: "https://zatca.gov.sa/ar/RulesRegulations/Agreements/Documents/India.pdf",
  },
  trc: {
    label:
      "ZATCA — tax residency certificate service for individuals (updated 30 August 2026)",
    url: "https://zatca.gov.sa/en/eServices/Pages/eservices-084.aspx",
  },
  faq: {
    label: "ZATCA — zakat and tax FAQ guideline (2023)",
    url: "https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/FAQ's.pdf",
  },
};

const OM = {
  treaty: {
    label:
      "India–Oman tax agreement (signed 2 April 1997), Oman Tax Authority copy — Articles 4, 11 and 15",
    url: "https://tms.taxoman.gov.om/portal/documents/20126/1536973/DTA+India.pdf/b0b47504-9f19-bcc4-f218-00602624b315",
  },
  list: {
    label:
      "Oman Tax Authority — double tax agreements (lists the India protocol of 27 January 2025)",
    url: "https://tms.taxoman.gov.om/portal/double-tax-agreements",
  },
  pit: {
    label:
      "Oman Tax Authority — issuance of the Personal Income Tax Law, Royal Decree 56/2025",
    url: "https://tms.taxoman.gov.om/portal/w/issuance-of-personal-income-tax-pit-law",
  },
};

const QA = {
  treaty: {
    label:
      "India–Qatar tax agreement (signed 18 February 2025), General Tax Authority copy — Articles 4, 10, 13, 28 and 30",
    url: "https://gta.gov.qa/assets/pdf/India%20(EN)2026.pdf",
  },
  gains: {
    label:
      "Qatar General Tax Authority — taxpayer guide on capital gains (March 2026)",
    url: "https://gta.gov.qa/assets/pdf/Treatment%20Capital%20Gains%2020260331.pdf",
  },
  trc: {
    label: "Qatar General Tax Authority — residency certificate application",
    url: "https://gta.gov.qa/assets/pdf/ResidencyCertificate.pdf",
  },
};

const OECD_CRS = {
  label:
    "OECD — signatories of the CRS multilateral agreement (status at 30 October 2026)",
  url: "https://www.oecd.org/content/dam/oecd/en/topics/policy-issues/tax-transparency-and-international-co-operation/crs-mcaa-signatories.pdf",
};

const KANOI = {
  label: "Saket Kanoi v. DCIT, ITAT Delhi, ITA 3243/Del/2023 (23 October 2024)",
  url: "https://indiankanoon.org/doc/105859941/",
};

/** The same ₹40 lakh gain, three ways. Country-specific rows are passed in. */
function gainIllustration(country: string, fundNote: string): CorridorTable {
  return {
    caption: `What a ₹40 lakh long-term gain looks like for a resident of ${country}`,
    head: ["Holding", "Indian tax", "Depends on"],
    rows: [
      [
        "Listed Indian shares",
        "₹4,84,375, which is 12.5% of the gain above ₹1.25 lakh",
        "Nothing contested. The agreement lets India tax gains on shares",
      ],
      [
        "Equity mutual fund units, if the residual paragraph is accepted",
        "Nil in the end. Tax deducted at redemption is claimed back",
        fundNote,
      ],
      [
        "Equity mutual fund units, if it is not",
        "₹4,84,375",
        "The ordinary Indian rate. The same as on shares",
      ],
    ],
    note: "An illustration, not a forecast. Indian figures are before surcharge and cess and assume no other gains in the year.",
  };
}

/** Why a ruling under a neighbour's treaty is not a ruling under this one. */
function untestedQA(country: string, article: string): CorridorQA {
  return {
    q: `Are Indian mutual fund gains tax-free for a resident of ${country}?`,
    a: [
      "The treaty text supports the argument. We found no decision that has tested it under this treaty.",
      `${article} lets India tax gains on shares of an Indian company. It then says gains on any other property are taxable only in the country where the seller is resident. Indian mutual funds are trusts that issue units, not companies that issue shares.`,
      "Tribunals have accepted that argument under two other treaties. The Cochin bench did so in 2019 for a UAE resident, and the Mumbai bench in 2025 for a Singapore resident. Those treaties use similar words.",
      `Two things separate ${country} from those cases. The decisions were not given under this treaty. And this treaty defines a resident as a person who is liable to tax in ${country}, which raises a question the UAE cases did not have to answer in the same form.`,
      "No High Court or Supreme Court ruling on the units question was found when we searched on 11 November 2026. Treat the position as arguable, not established, and plan for the ordinary Indian rate.",
    ],
    sources: [SRC.faizal, SRC.anushka, KANOI],
  };
}

function liableToTaxQA(country: string, source: CorridorQA["sources"]): CorridorQA {
  return {
    q: `Do I count as a resident of ${country} under the treaty?`,
    a: [
      `Not automatically. The treaty does not define a resident by days spent in ${country}. It says a resident is a person who is liable to tax there by reason of domicile, residence, place of management or a similar test.`,
      "That wording matters for an expatriate who pays no income tax on investments. The argument that a person who pays no tax is not liable to tax has been raised against treaty claims. A Delhi tribunal held in 2024 that a UAE resident was entitled to the UAE treaty.",
      "The UAE treaty is different on this point, though. Its definition of a UAE-resident individual is based on days of presence. So a result reached under the UAE treaty does not settle the question here.",
      "A residency certificate is where the claim starts. It does not end the argument if residence itself is challenged.",
    ],
    sources: source,
  };
}

const MISTAKE_NEIGHBOUR = (country: string) => ({
  m: "Reading a UAE or Singapore ruling as if it were given under your treaty",
  why: `Each treaty is its own text. The tribunal decisions on mutual fund units were given under other treaties, and the ${country} treaty defines a resident differently from the UAE's.`,
});

const MISTAKE_SHARES = {
  m: "Assuming shares get the same treatment as fund units",
  why: "The treaty gives India the right to tax gains on shares of an Indian company. The residual paragraph is only ever argued for units.",
};

export const CORRIDORS_GULF: Corridor[] = [
  // ─────────────────────────────────────────────────────── SAUDI ARABIA ──
  {
    slug: "saudi-arabia",
    code: "KSA",
    flag: "🇸🇦",
    country: "Saudi Arabia",
    label: "Saudi Arabia",
    hreflang: "en-SA",
    marketNote: "If you live and work in Saudi Arabia",
    title: "Investing in India from Saudi Arabia: mutual funds, shares and the treaty",
    hook: "The Saudi treaty reads much like the UAE's. Nobody has tested it for a mutual fund investor.",
    capsule:
      "A Saudi-resident NRI is taxed by India on gains from Indian shares. The India–Saudi Arabia agreement says gains on other property are taxable only where the seller is resident, which is the basis for arguing that mutual fund units escape Indian tax. No ruling under this treaty was found, and it caps Indian tax on dividends at 5%.",
    lede: "Guides for Gulf residents usually treat the six countries as one. They are six different treaties. Saudi Arabia's agreement with India, signed in 2006, has the same broad shape as the UAE's on capital gains. It differs on who counts as a resident, and it has no line of tribunal decisions behind it. This guide sticks to what the Saudi text says.",
    facts: [
      ["India's right over shares", "Yes, under the capital gains article"],
      ["Fund units", "Residual paragraph exists. Untested under this treaty"],
      ["Dividends", "Indian tax capped at 5%"],
      ["Who is a resident", "A person liable to tax in Saudi Arabia"],
      ["Agreement signed", "25 January 2006"],
    ],
    table: {
      caption: "Shares or mutual fund units: what the India–Saudi Arabia agreement says",
      head: ["What you hold", "Treaty position", "Who may tax", "How firm is it?"],
      rows: [
        [
          "Shares of an Indian company",
          "Capital gains article, shares paragraph",
          "India may tax the gain",
          "Clear on the text",
        ],
        [
          "Indian mutual fund units",
          "Capital gains article, residual paragraph",
          "Saudi Arabia only, if units are not shares",
          "Arguable. No decision under this treaty was found",
        ],
        [
          "Dividends from Indian companies",
          "Article 10",
          "India, capped at 5% of the gross dividend",
          "Clear on the text, if you qualify as a resident",
        ],
      ],
      note: "The agreement also denies its benefits to an enterprise created mainly to obtain them. That clause is written for enterprises, not individuals.",
    },
    extraTables: [
      gainIllustration(
        "Saudi Arabia",
        "The argument being accepted under this treaty, and your being a resident under it",
      ),
      {
        caption: "Which filings apply to a Saudi resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Tax residency certificate",
            "Anyone claiming the treaty in India",
            "ZATCA's service for individuals asks for 183 days in the Kingdom, or 30 days if you own a permanent residence, plus passport, proof of residency and an employment letter",
            "ZATCA e-services",
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
            "India and Saudi Arabia have both signed the Common Reporting Standard agreement on exchanging account data",
            "Your banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      untestedQA("Saudi Arabia", "The capital gains article of the India–Saudi Arabia agreement"),
      liableToTaxQA("Saudi Arabia", [KSA.treaty, KANOI]),
      {
        q: "Does Saudi Arabia charge zakat or tax on my Indian investments?",
        a: [
          "Zakat is not aimed at you. The Zakat, Tax and Customs Authority says zakat applies to resident Saudi natural persons, and to nationals of other Gulf Cooperation Council states who are treated like Saudi nationals.",
          "An Indian national working in the Kingdom is in neither group.",
          "More broadly, Saudi Arabia is generally described as charging no personal income tax on an expatriate employee's salary or personal investments, and no capital gains tax on them. The authority's pages we read do not put that in one sentence, so have a Saudi adviser confirm it in writing if the amounts are large.",
        ],
        sources: [KSA.faq],
      },
      {
        q: "How do I claim the 5% dividend rate?",
        a: [
          "India's own rate on dividends paid to a non-resident is 20% before surcharge and cess. The agreement caps it at 5% of the gross dividend.",
          "To get the lower rate you need a Saudi tax residency certificate and India's online treaty form. If the company has already deducted at the higher rate, the difference comes back through an Indian tax return.",
          "The cap is available to a resident of Saudi Arabia as the agreement defines one. Read the residence question above before counting on it.",
        ],
        sources: [KSA.treaty, KSA.trc, SRC.form41],
      },
      {
        q: "So should I prefer mutual funds or shares from Saudi Arabia?",
        a: [
          "On tax alone, and only if the treaty argument is available to you, fund units have the better range of outcomes. If the residual paragraph is accepted, the Indian tax on the gain comes back. If it is not, you pay what a share investor pays anyway.",
          "Funds also avoid a yearly trickle of dividend deductions and refund claims, which means less paperwork.",
          "That is a conditional answer. It assumes you qualify as a resident under the treaty, that you are not arranging your residence around a sale, and that you can leave the deducted tax outstanding until a refund arrives. From Saudi Arabia the argument has an extra untested step compared with the UAE.",
          "Shares still make sense if you want to choose companies yourself or want dividend income. Tax should not be the only reason to pick a vehicle.",
        ],
      },
      WHY_INDIA_QA,
      indiaTaxQA("Saudi Arabia"),
      indiaPaperworkQA(
        "For Saudi Arabia that is ZATCA's tax residency certificate for individuals. Its service page asks for 183 days in the Kingdom, or 30 days if you own a permanent residence.",
        KSA.trc,
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      MISTAKE_ADVICE_LATER,
      MISTAKE_NEIGHBOUR("Saudi Arabia"),
      MISTAKE_SHARES,
      {
        m: "Leaving the 5% dividend rate unclaimed",
        why: "India deducts at its domestic rate unless the certificate and the online form are in place. The difference is refundable only through a return.",
      },
      MISTAKE_REFUND,
      MISTAKE_STATUS,
    ],
    checklist: [
      CHECK_ADVISER,
      "Budget for Indian capital gains tax on shares. The agreement does not remove it.",
      "If you hold fund units and intend to claim the residual paragraph, take advice on the residence question first.",
      "Apply to ZATCA for a tax residency certificate, then file India's online treaty form.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Saudi Arabia: Mutual Funds and Tax",
    metaDescription:
      "How India taxes a Saudi-resident NRI's shares and mutual funds, what the India–Saudi Arabia treaty says, the 5% dividend rate, and what remains untested.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in the UAE: where the tribunal rulings come from", href: "/nri/uae" },
      { label: "NRIs in Qatar", href: "/nri/qatar" },
    ],
    ...NEW_COMMON,
    sources: [KSA.treaty, KSA.trc, KSA.faq, SRC.faizal, SRC.anushka, KANOI, OECD_CRS, ...INDIA_SOURCES],
  },

  // ─────────────────────────────────────────────────────────────── OMAN ──
  {
    slug: "oman",
    code: "OM",
    flag: "🇴🇲",
    country: "Oman",
    label: "Oman",
    hreflang: "en-OM",
    marketNote: "If you live and work in Oman",
    title: "Investing in India from Oman: mutual funds, shares and the 2028 change",
    hook: "Oman is the one Gulf state with a personal income tax already on the calendar.",
    capsule:
      "An Oman-resident NRI is taxed by India on gains from Indian shares. The India–Oman agreement leaves gains on other property to the country of residence, which is the basis for the mutual fund argument, untested under this treaty. Oman's Personal Income Tax Law starts in 2028, at 5% on individuals with income above OMR 42,000.",
    lede: "Two things make Oman different from its neighbours. Its agreement with India puts capital gains in Article 15, not Article 13, and a protocol to that agreement was signed in January 2025. And Oman has passed a personal income tax that begins in 2028. A plan built on Oman taxing nothing has an end date. This guide covers the treaty as published by Oman's Tax Authority and what is known about 2028.",
    facts: [
      ["India's right over shares", "Yes. Article 15(5)"],
      ["Fund units", "Residual paragraph, Article 15(6). Untested under this treaty"],
      ["Dividends", "12.5% cap in the 1997 text. A 2025 protocol exists"],
      ["Oman personal income tax", "5% above OMR 42,000, from the start of 2028"],
      ["Who is a resident", "A person liable to tax in Oman"],
    ],
    table: {
      caption: "Shares or mutual fund units: what the India–Oman agreement says",
      head: ["What you hold", "Agreement paragraph", "Who may tax", "How firm is it?"],
      rows: [
        [
          "Shares of an Indian company",
          "Article 15(5)",
          "India may tax the gain",
          "Clear on the text",
        ],
        [
          "Indian mutual fund units",
          "Article 15(6), the residual paragraph",
          "Oman only, if units are not shares",
          "Arguable. No decision under this treaty was found",
        ],
        [
          "Dividends from Indian companies",
          "Article 11",
          "India, capped at 12.5% in the 1997 text for an individual investor",
          "Check the January 2025 protocol before relying on the rate",
        ],
      ],
      note: "Oman's Tax Authority lists a protocol with India dated 27 January 2025. The figures here are from the 1997 agreement as the Authority publishes it.",
    },
    extraTables: [
      gainIllustration(
        "Oman",
        "The argument being accepted under this treaty, and your being a resident under it",
      ),
      {
        caption: "Which filings apply to an Oman resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Tax residency certificate",
            "Anyone claiming the treaty in India",
            "Proves residence in Oman for the agreement",
            "Oman's tax authorities",
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
            "India and Oman have both signed the Common Reporting Standard agreement on exchanging account data",
            "Your banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      untestedQA("Oman", "Article 15 of the India–Oman agreement"),
      {
        q: "What changes for NRIs in Oman in 2028?",
        a: [
          "Oman will have a personal income tax. The Tax Authority's announcement of Royal Decree 56/2025 gives three facts.",
          "It applies to a natural person whose total income is above OMR 42,000 a year. The rate is 5% of taxable income. It comes into force at the beginning of 2028.",
          "The announcement says the tax is on income earned from certain types of income, under conditions set out in the law. It does not list them.",
          "The law is widely reported to tax a resident on worldwide income, with dividends and capital gains from abroad among the categories, and with credit for tax paid in the other country. We have not been able to read the law's text to confirm the detail.",
          "At 5% it is mild next to the United States, the United Kingdom or Canada. It still changes the arithmetic. Before 2028, Oman adds nothing to your Indian tax. From 2028, assume it may, and get the scope confirmed by an adviser in Oman.",
        ],
        sources: [OM.pit],
      },
      liableToTaxQA("Oman", [OM.treaty, KANOI]),
      {
        q: "What does the treaty do for dividends?",
        a: [
          "The 1997 agreement caps Indian tax on dividends at 12.5% of the gross amount for an individual investor. India's own rate on dividends to a non-resident is 20% before surcharge and cess.",
          "A protocol to the agreement was signed on 27 January 2025. Check whether it changes the rate for the year you are claiming.",
          "As with any treaty rate, you need a residency certificate and India's online form. Over-deducted tax comes back only through an Indian return.",
        ],
        sources: [OM.treaty, OM.list, SRC.form41],
      },
      {
        q: "So should I prefer mutual funds or shares from Oman?",
        a: [
          "On tax alone, and only if the treaty argument is available to you, fund units have the better range of outcomes. If the residual paragraph is accepted, the Indian tax on the gain comes back. If it is not, you pay what a share investor pays anyway.",
          "Funds also avoid a yearly trickle of dividend deductions and refund claims, which means less paperwork.",
          "That is a conditional answer. It assumes you qualify as a resident under the treaty, that you are not arranging your residence around a sale, and that you can leave the deducted tax outstanding until a refund arrives. From Oman the argument has an extra untested step compared with the UAE.",
          "Shares still make sense if you want to choose companies yourself or want dividend income. Tax should not be the only reason to pick a vehicle.",
        ],
      },
      WHY_INDIA_QA,
      indiaTaxQA("Oman"),
      indiaPaperworkQA(
        "For Oman that means a certificate from Oman's tax authorities confirming you are resident there.",
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      {
        m: "Planning past 2028 as if Oman will still tax nothing",
        why: "The Personal Income Tax Law starts at the beginning of 2028, at 5% above OMR 42,000. Its reach over foreign investment income needs confirming.",
      },
      MISTAKE_NEIGHBOUR("Oman"),
      MISTAKE_SHARES,
      {
        m: "Quoting the dividend rate without checking the 2025 protocol",
        why: "The 12.5% figure is from the 1997 text. A protocol was signed on 27 January 2025.",
      },
      MISTAKE_STATUS,
    ],
    checklist: [
      CHECK_ADVISER,
      "Budget for Indian capital gains tax on shares. The agreement does not remove it.",
      "Ask an adviser in Oman whether the 2028 personal income tax covers foreign dividends and gains, before any holding period that runs into 2028.",
      "Get a tax residency certificate in Oman, then file India's online treaty form.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Oman: Mutual Funds, Tax and 2028",
    metaDescription:
      "How India taxes an Oman-resident NRI's shares and mutual funds, what the India–Oman treaty says, and what Oman's 5% personal income tax means from 2028.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in the UAE: where the tribunal rulings come from", href: "/nri/uae" },
      { label: "NRIs in Saudi Arabia", href: "/nri/saudi-arabia" },
    ],
    ...NEW_COMMON,
    sources: [OM.treaty, OM.list, OM.pit, SRC.faizal, SRC.anushka, KANOI, OECD_CRS, ...INDIA_SOURCES],
  },

  // ────────────────────────────────────────────────────────────── QATAR ──
  {
    slug: "qatar",
    code: "QA",
    flag: "🇶🇦",
    country: "Qatar",
    label: "Qatar",
    hreflang: "en-QA",
    marketNote: "If you live and work in Qatar",
    title: "Investing in India from Qatar: mutual funds, shares and the new treaty",
    hook: "Qatar and India signed a new tax agreement in 2025. Most of what you have read describes the old one.",
    capsule:
      "A Qatar-resident NRI is taxed by India on gains from Indian shares. The India–Qatar agreement signed on 18 February 2025 keeps a paragraph leaving gains on other property to the country of residence, and adds a principal purpose test. Qatar exempts an individual's gains on securities held outside a business. Dividends are capped at 10%.",
    lede: "India and Qatar replaced their 1999 tax agreement with a new one, signed in New Delhi on 18 February 2025. A newer treaty does not always keep the older wording. India's 2018 agreement with Hong Kong dropped the paragraph the mutual fund argument depends on. The Qatar agreement kept it. What the new agreement adds is an anti-abuse test. This guide works from the 2025 text as published by Qatar's General Tax Authority.",
    facts: [
      ["India's right over shares", "Yes. Article 13(5) of the 2025 agreement"],
      ["Fund units", "Residual paragraph, Article 13(6). Untested under this treaty"],
      ["Dividends", "Indian tax capped at 10% for an individual"],
      ["Qatar tax on the gain", "Exempt for a natural person, outside a business"],
      ["New in 2025", "A principal purpose test, Article 28"],
    ],
    table: {
      caption: "Shares or mutual fund units: what the 2025 India–Qatar agreement says",
      head: ["What you hold", "Agreement paragraph", "Who may tax", "How firm is it?"],
      rows: [
        [
          "Shares of an Indian company",
          "Article 13(5)",
          "India may tax the gain",
          "Clear on the text",
        ],
        [
          "Indian mutual fund units",
          "Article 13(6), the residual paragraph",
          "Qatar only, if units are not shares",
          "Arguable. No decision under this treaty was found",
        ],
        [
          "Dividends from Indian companies",
          "Article 10(2)",
          "India, capped at 10% for an individual. 5% is for a company holding at least 25%",
          "Clear on the text, if you qualify as a resident",
        ],
      ],
      note: "The 2025 agreement applies to income arising from the first fiscal year after the calendar year in which it entered into force. India's notification is reported to give 10 September 2025 as that date, which makes the new agreement apply in India to income from 1 April 2026. Earlier sales fall under the 1999 agreement.",
    },
    extraTables: [
      gainIllustration(
        "Qatar",
        "The argument being accepted under this treaty, your being a resident under it, and the principal purpose test",
      ),
      {
        caption: "Which filings apply to a Qatar resident with Indian investments?",
        head: ["Filing", "Who needs it", "What it does", "Where"],
        rows: [
          [
            "Tax residency certificate",
            "Anyone claiming the treaty in India",
            "The General Tax Authority's application asks whether you have been in Qatar more than 183 days, have a permanent home there, or have your centre of vital interests there",
            "General Tax Authority",
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
            "India and Qatar have both signed the Common Reporting Standard agreement on exchanging account data",
            "Your banks and fund houses",
          ],
        ],
      },
    ],
    qas: [
      {
        q: "Did the new India–Qatar treaty remove the mutual fund argument?",
        a: [
          "No. The 2025 agreement keeps the paragraph the argument depends on.",
          "Article 13(5) lets India tax gains on shares of an Indian company. Article 13(6) says gains on any other property are taxable only in the country where the seller is resident. That is the same structure as the UAE and Singapore treaties.",
          "India's agreement with Hong Kong is the contrast. There, the last paragraph lets each side tax other property under its own law. The Qatar agreement did not follow that model.",
          "What the 2025 agreement added is Article 28. A benefit is refused if it is reasonable to conclude that obtaining it was one of the principal purposes of an arrangement or transaction. A genuine long-term resident investing normally is not the target. An arrangement built around the exemption is.",
        ],
        sources: [QA.treaty],
      },
      untestedQA("Qatar", "Article 13 of the 2025 India–Qatar agreement"),
      liableToTaxQA("Qatar", [QA.treaty, KANOI]),
      {
        q: "Does Qatar tax my Indian gains?",
        a: [
          "Not as an ordinary investor. The General Tax Authority's 2026 guide on capital gains lists, among exempt transactions, the sale or disposal of real estate or securities by a natural person, provided the assets are not part of a taxable business activity.",
          "The exemption has that one condition. Investing your own savings is one thing. Running a securities business is another.",
        ],
        sources: [QA.gains],
      },
      {
        q: "What is the dividend rate under the new treaty?",
        a: [
          "For an individual, Indian tax on dividends is capped at 10% of the gross amount. The 5% rate applies only where the recipient is a company owning at least 25% of the company paying the dividend.",
          "India's own rate on dividends to a non-resident is 20% before surcharge and cess. So the agreement is worth claiming if you hold dividend-paying shares.",
          "You need a Qatar residency certificate and India's online form. Over-deducted tax comes back only through an Indian return.",
        ],
        sources: [QA.treaty, QA.trc, SRC.form41],
      },
      {
        q: "So should I prefer mutual funds or shares from Qatar?",
        a: [
          "On tax alone, and only if the treaty argument is available to you, fund units have the better range of outcomes. If the residual paragraph is accepted, the Indian tax on the gain comes back. If it is not, you pay what a share investor pays anyway.",
          "Funds also avoid a yearly trickle of dividend deductions and refund claims, which means less paperwork.",
          "That is a conditional answer. It assumes you qualify as a resident under the treaty, that you are not arranging your residence around a sale, and that you can leave the deducted tax outstanding until a refund arrives. From Qatar the argument has an extra untested step compared with the UAE.",
          "Shares still make sense if you want to choose companies yourself or want dividend income. Tax should not be the only reason to pick a vehicle.",
        ],
      },
      WHY_INDIA_QA,
      indiaTaxQA("Qatar"),
      indiaPaperworkQA(
        "For Qatar that is a residency certificate from the General Tax Authority. Its application asks about 183 days of presence, a permanent home, or your centre of vital interests.",
        QA.trc,
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      {
        m: "Working from the 1999 agreement",
        why: "India and Qatar signed a new agreement on 18 February 2025. It adds a principal purpose test and its own start date.",
      },
      MISTAKE_NEIGHBOUR("Qatar"),
      MISTAKE_SHARES,
      {
        m: "Assuming the dividend rate is 5%",
        why: "That rate is for a company holding at least 25%. An individual is capped at 10%.",
      },
      MISTAKE_STATUS,
    ],
    checklist: [
      CHECK_ADVISER,
      "Confirm which agreement governs the year of your sale. The 2025 agreement is reported to apply in India from 1 April 2026.",
      "Budget for Indian capital gains tax on shares. Neither agreement removes it.",
      "Get a residency certificate from the General Tax Authority, then file India's online treaty form.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Qatar: Mutual Funds and the New Treaty",
    metaDescription:
      "How India taxes a Qatar-resident NRI's shares and mutual funds under the 2025 India–Qatar treaty: the residual clause, the 10% dividend cap, and what is new.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in the UAE: where the tribunal rulings come from", href: "/nri/uae" },
      { label: "NRIs in Hong Kong: the treaty that did close the gap", href: "/nri/hong-kong" },
    ],
    ...NEW_COMMON,
    sources: [QA.treaty, QA.gains, QA.trc, SRC.faizal, SRC.anushka, KANOI, OECD_CRS, ...INDIA_SOURCES],
  },
];

const KW = {
  pib: {
    label:
      "Press Information Bureau, 7 May 2018 — protocol amending the India–Kuwait tax agreement notified",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1531499",
  },
};

const BH = {
  mea: {
    label:
      "Ministry of External Affairs — India–Bahrain bilateral brief (list of agreements)",
    url: "https://www.mea.gov.in/Portal/ForeignRelation/India_Bahrain.pdf",
  },
};

const DOMESTIC_TABLE = (country: string, note: string): CorridorTable => ({
  caption: `What India charges a resident of ${country} on Indian investments`,
  head: ["What you hold", "Held over 12 months", "Held 12 months or less", "Income along the way"],
  rows: [
    [
      "Listed Indian shares",
      "12.5% on gains above ₹1.25 lakh in the tax year",
      "20%",
      "Dividends: 20%",
    ],
    [
      "Equity mutual fund units",
      "12.5% on gains above ₹1.25 lakh in the tax year",
      "20%",
      "Distributions: 20%",
    ],
    [
      "Debt-heavy fund units bought on or after 1 April 2023",
      "Always treated as short-term, at your slab rate",
      "Slab rate",
      "Distributions: 20%",
    ],
  ],
  note,
});

export const CORRIDORS_GULF_NO_TEXT: Corridor[] = [
  // ───────────────────────────────────────────────────────────── KUWAIT ──
  {
    slug: "kuwait",
    code: "KW",
    flag: "🇰🇼",
    country: "Kuwait",
    label: "Kuwait",
    hreflang: "en-KW",
    marketNote: "If you live and work in Kuwait",
    title: "Investing in India from Kuwait: mutual funds, shares and Indian tax",
    hook: "Kuwait has its own tax treaty with India. A UAE answer is not a Kuwait answer.",
    capsule:
      "A Kuwait-resident NRI is taxed by India on gains and dividends from Indian shares and mutual funds, with tax deducted before the money is paid out. India and Kuwait have a tax agreement, signed on 15 June 2006 and amended by a 2017 protocol. Whether it lowers your Indian tax depends on its own wording, not on rulings under the UAE treaty.",
    lede: "This guide is shorter than our others, on purpose. We publish only what we have read at source, and we were not able to read the capital gains, dividend and residence articles of the India–Kuwait agreement on an official site. So this page tells you what India charges, confirms that a treaty exists, and sets out the questions to put to an adviser. It does not tell you the treaty exempts anything.",
    facts: [
      ["Tax agreement with India", "Yes. Signed 15 June 2006"],
      ["Protocol", "Signed 15 January 2017, in force 26 March 2018"],
      ["What the protocol covered", "Exchange of information"],
      ["India's starting point", "Its ordinary rates, deducted at source"],
      ["Treaty articles on gains", "Reported to follow the UAE pattern. Not read by us"],
    ],
    table: DOMESTIC_TABLE(
      "Kuwait",
      "Rates are before surcharge and cess. These are India's own rates. Any reduction under the India–Kuwait agreement has to be claimed, with a Kuwait residency certificate and India's online form.",
    ),
    qas: [
      {
        q: "Is there a tax treaty between India and Kuwait?",
        a: [
          "Yes. India's Press Information Bureau records a double taxation avoidance agreement between India and Kuwait signed on 15 June 2006.",
          "A protocol amending it was signed on 15 January 2017. It entered into force on 26 March 2018 and was notified in India's Official Gazette on 4 May 2018. The same release says the protocol updates the agreement's provisions on exchange of information.",
        ],
        sources: [KW.pib],
      },
      {
        q: "Are Indian mutual fund gains tax-free for a Kuwait resident?",
        a: [
          "Do not assume so. We are not able to tell you either way, and you should be wary of any page that tells you confidently.",
          "The argument that mutual fund gains escape Indian tax comes from a specific paragraph in the UAE and Singapore treaties, and from tribunal decisions under those two treaties. Whether the Kuwait agreement has an equivalent paragraph, and who it treats as a resident of Kuwait, are questions about the Kuwait text.",
          "We searched published Indian tribunal and court orders on 11 November 2026 for a decision applying the Kuwait agreement to mutual fund units. We found none.",
          "Until an adviser has read the agreement against your facts, plan on India's ordinary rates. If relief turns out to be available, it arrives as a refund.",
        ],
        sources: [SRC.faizal, SRC.anushka],
      },
      {
        q: "What is the India–Kuwait treaty reported to say?",
        a: [
          "This answer is second-hand, and we mark it as such. We could not open the official text.",
          "The agreement is commonly described as following the same pattern as the UAE and Saudi treaties. India may tax gains on shares of an Indian company. Gains on other property are left to the country where the seller is resident. On that description, a Kuwait resident would have the same argument on mutual fund units that UAE residents make.",
          "Indian tax on dividends is described as capped under the treaty at somewhere in the range of 10% to 15%, against India's own 20%.",
          "Kuwait is generally described as charging no personal income tax or capital gains tax on an individual's investments.",
          "If that description is right, the cautious plan is the one in our UAE guide: the fund position is arguable and tested only at tribunal level under other treaties, shares are taxed by India, and the worst case is India's ordinary rate. Have the text checked before you rely on any of it.",
        ],
      },
      WHY_INDIA_QA,
      {
        q: "What should I ask an adviser about the India–Kuwait treaty?",
        a: [
          "Four questions, each answerable from the text.",
          "Does the capital gains article let India tax gains on shares of an Indian company? Does it end with a paragraph leaving gains on other property to the country of residence?",
          "How does the agreement define a resident of Kuwait, and do I meet that definition as an Indian national working there?",
          "What is the cap on Indian tax on dividends for an individual?",
          "Is there a limitation-of-benefits article, and does it reach individuals?",
        ],
      },
      indiaTaxQA("Kuwait"),
      indiaPaperworkQA(
        "For Kuwait that means a certificate from Kuwait's tax authorities confirming you are resident there.",
      ),
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      {
        m: "Borrowing the UAE answer",
        why: "The rulings on mutual fund units were given under the UAE and Singapore treaties. Kuwait has a separate agreement with its own wording.",
      },
      MISTAKE_REFUND,
      MISTAKE_STATUS,
    ],
    checklist: [
      "Plan on India's ordinary rates until someone has read the India–Kuwait agreement against your facts.",
      "Put the four treaty questions above to a cross-border tax adviser, in writing.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Kuwait: Indian Mutual Funds and Tax",
    metaDescription:
      "What India taxes when a Kuwait-resident NRI sells shares or mutual funds, what is confirmed about the India–Kuwait treaty, and what to ask an adviser.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in the UAE: where the tribunal rulings come from", href: "/nri/uae" },
      { label: "NRIs in Saudi Arabia", href: "/nri/saudi-arabia" },
    ],
    ...NEW_COMMON,
    sources: [KW.pib, SRC.faizal, SRC.anushka, OECD_CRS, ...INDIA_SOURCES],
  },

  // ──────────────────────────────────────────────────────────── BAHRAIN ──
  {
    slug: "bahrain",
    code: "BH",
    flag: "🇧🇭",
    country: "Bahrain",
    label: "Bahrain",
    hreflang: "en-BH",
    marketNote: "If you live and work in Bahrain",
    title: "Investing in India from Bahrain: mutual funds, shares and Indian tax",
    hook: "Bahrain is not the UAE. The treaty that argument needs is not on India's list.",
    capsule:
      "A Bahrain-resident NRI should plan on India's ordinary tax rates for both shares and mutual funds. India's foreign ministry lists an agreement with Bahrain on exchange of tax information, dated May 2012, and no double taxation agreement. Without one, there is no treaty paragraph to claim and no reduced dividend rate.",
    lede: "Most advice for Gulf residents is written for Dubai and then applied to everyone else. For Bahrain that goes wrong at the first step. The favourable reading on mutual funds depends on a double taxation agreement. The list of India–Bahrain agreements published by India's Ministry of External Affairs shows an agreement on exchanging tax information and nothing more. This guide is short because the position is simple.",
    facts: [
      ["Double taxation agreement", "None on India's published list"],
      ["What exists", "Exchange of tax information agreement, May 2012"],
      ["Shares", "India's ordinary rates"],
      ["Mutual fund units", "India's ordinary rates"],
      ["Dividends", "India's ordinary rate. No treaty cap to claim"],
    ],
    table: DOMESTIC_TABLE(
      "Bahrain",
      "Rates are before surcharge and cess. With no double taxation agreement on India's list, these rates are the whole Indian answer for a Bahrain resident.",
    ),
    qas: [
      {
        q: "Is there a tax treaty between India and Bahrain?",
        a: [
          "Not a double taxation agreement, on the evidence we could read.",
          "India's Ministry of External Affairs publishes a brief on relations with Bahrain that lists the agreements between the two countries. It includes an Agreement regarding Exchange of Information with respect to Taxes, dated May 2012. It does not list a double taxation avoidance agreement.",
          "An exchange-of-information agreement does what its name says. It lets the two tax authorities share information. It does not cap rates or allocate taxing rights.",
          "Treaties change. If you are reading this well after the review date above, check whether a new agreement has been signed.",
        ],
        sources: [BH.mea],
      },
      {
        q: "Are Indian mutual fund gains tax-free for a Bahrain resident?",
        a: [
          "No. The argument made for UAE and Singapore residents depends on a paragraph in those countries' treaties with India. A Bahrain resident has no such treaty to rely on.",
          "So India taxes the gain at its ordinary rates, on fund units and on shares alike. There is no residency certificate that changes this, because there is no treaty for it to unlock.",
        ],
        sources: [BH.mea, SRC.faizal],
      },
      {
        q: "Is there any tax reason to prefer shares or mutual funds from Bahrain?",
        a: [
          "Not on the Indian side. India applies the same rates to listed shares and to equity fund units, and the same rate to dividends and fund distributions.",
          "Debt-heavy funds are the exception. Units bought on or after 1 April 2023 are always taxed as short-term gains at slab rates.",
          "Choose between shares and funds on investment grounds.",
        ],
        sources: [SRC.act2025],
      },
      indiaTaxQA("Bahrain"),
      {
        q: "Do I still need to file anything in India?",
        a: [
          "Possibly, for a refund. Tax is deducted when a non-resident is paid, and the deduction is not always equal to the final tax. The ₹1.25 lakh threshold on long-term equity gains is one reason the two can differ.",
          "Indian law says a refund is claimed by filing a return. So if more was deducted than you owe, a return for that year is how you get it back.",
        ],
        sources: [SRC.act2025],
      },
      {
        q: "Does any other relief help a Bahrain resident?",
        a: [
          "No. India does have a unilateral relief for countries it has no treaty with. It is a credit given to people resident in India for tax they paid abroad.",
          "A Bahrain resident is on the wrong side of it twice. You are not resident in India, and Bahrain is generally described as charging no personal income tax, so there is no foreign tax to credit.",
          "The 20% deducted on dividends therefore stays deducted. So does the tax on gains, apart from any excess over your actual liability.",
          "The two governments were reported in late 2025 to have agreed to begin negotiating a double taxation agreement. Nothing signed has been published that we could find. If one is concluded, this page changes.",
        ],
        sources: [BH.mea],
      },
      WHY_INDIA_QA,
      INDIA_RESIDENCE_QA,
    ],
    mistakes: [
      MISTAKE_ADVICE_LATER,
      {
        m: "Assuming every Gulf country has the UAE's treaty position",
        why: "The mutual fund argument needs a double taxation agreement with a residence-only paragraph. India's published list for Bahrain shows only an exchange-of-information agreement.",
      },
      {
        m: "Paying for a residency certificate to claim Indian treaty relief",
        why: "A certificate supports a treaty claim. Without a double taxation agreement there is no claim for it to support.",
      },
      MISTAKE_STATUS,
    ],
    checklist: [
      "Budget for India's ordinary rates on gains and dividends, for shares and funds alike.",
      "Compare the tax deducted on each sale with your actual liability, and file an Indian return if you are owed a refund.",
      CHECK_RECORDS,
      CHECK_STATUS,
    ],
    metaTitle: "NRI Investing from Bahrain: Indian Mutual Funds and Tax",
    metaDescription:
      "Why a Bahrain-resident NRI should plan on India's ordinary tax rates for shares and mutual funds: no double taxation agreement appears on India's list.",
    related: [
      ...RELATED_COMMON,
      { label: "NRIs in the UAE: the treaty Bahrain does not have", href: "/nri/uae" },
      { label: "NRIs in Hong Kong: same result, different reason", href: "/nri/hong-kong" },
    ],
    ...NEW_COMMON,
    sources: [BH.mea, SRC.faizal, OECD_CRS, ...INDIA_SOURCES],
  },
];

export { OECD_CRS, KANOI, gainIllustration, MISTAKE_SHARES };
