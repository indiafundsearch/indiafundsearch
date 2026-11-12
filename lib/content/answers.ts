import type { Source } from './types'

/**
 * Long-tail answer pages under /learn/.
 *
 * WHY THESE EXIST
 * The corridor and guide pages already contain these answers, but they are
 * buried inside a bigger page about something else. Google will not rank a UK
 * corridor page for "are Indian mutual funds PFICs", because the page is not
 * about that. One page, one question, question as both H1 and URL.
 *
 * These target queries a young domain can actually win: specific, high-intent,
 * and mostly unanswered by anyone. Head terms like "best PMS in India" are an
 * authority contest we would lose regardless of how good the page is.
 *
 * HOUSE STYLE (same as guides.ts)
 * Written for a busy person with money, reading on a phone. Short sentences,
 * one idea each. Plain words. The answer in the first forty words, before any
 * context. No throat-clearing.
 *
 * EDITORIAL RULES
 * - No Indian income-tax section numbers. The Income-tax Act, 1961 was repealed
 *   on 1 April 2026 and renumbered wholesale.
 * - SEBI / IFSCA / foreign regulator numbering IS cited. It is stable.
 * - Contested points are published as contested.
 * - Verified 2 August 2026.
 */

export interface AnswerSection {
  /** Becomes an <h2>. Phrase as a question or a flat statement, never a noun. */
  h: string
  body: string[]
  /** Optional bullet list rendered after the paragraphs. */
  points?: string[]
}

export interface Answer {
  slug: string
  /** The H1. Should read like the query someone typed. */
  question: string
  /** 40–60 words, self-contained, no links. The bit an answer engine lifts. */
  answer: string
  metaTitle: string
  metaDescription: string
  sections: AnswerSection[]
  related: { label: string; href: string }[]
  sources: Source[]
  /** Visible "Last reviewed" (Phase 2, Task 2.3). */
  reviewed: string
  /** Visible "Published". Defaults to the reviewed date when absent. */
  published?: string
  /** Only where the page states a regulatory position. */
  regulatoryAsAt?: string
  /** Visible FAQ block. */
  faqs?: { q: string; a: string }[]
}

const PUBLISHED = 'August 2026'
const REVIEWED = 'September 2026'

const SEBI_PMS: Source = {
  label: 'SEBI (Portfolio Managers) Regulations, 2020',
  url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html',
}
const SEBI_AIF: Source = {
  label: 'SEBI (Alternative Investment Funds) Regulations, 2012',
  url: 'https://www.sebi.gov.in/legal/regulations/jul-2026/securities-and-exchange-board-of-india-alternative-investment-funds-regulations-2012-last-amended-on-july-14-2026-_102975.html',
}
const RBI_FI: Source = {
  label: 'RBI Master Direction — Foreign Investment in India',
  url: 'https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=11200',
}
const IFSCA: Source = {
  label: 'IFSCA (Fund Management) Regulations, 2025',
  url: 'https://ifsca.gov.in/Pages/Contents/Fund_Management',
}
const ITA_2025: Source = {
  label: 'India — Income-tax Act, 2025 (in force 1 April 2026)',
  url: 'https://www.incometaxindia.gov.in/income-tax-act-2025',
}

export const ANSWERS: Answer[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'can-nri-invest-in-pms',
    question: 'Can an NRI invest in PMS in India?',
    answer:
      'Yes. SEBI\'s portfolio management rules contain no residency condition. The minimum is ₹50 lakh, the same as for a resident. What decides it is your bank and demat setup under FEMA, and each PMS house\'s own policy. Many decline US and Canadian residents.',
    metaTitle: "Can an NRI Invest in PMS in India? Rules & Routes",
    metaDescription:
      "SEBI sets no residency bar on PMS. The ₹50 lakh minimum, the repatriable and non-repatriable routes under FEMA, and why some houses still decline you.",
    sections: [
      {
        h: 'Does SEBI stop an NRI from investing in a PMS?',
        body: [
          'No. We searched the consolidated portfolio management regulations for "non-resident", "NRI", "nationality" and "citizen". No hits. A manager may take you on the same terms as a resident.',
        ],
        points: [
          'Minimum: ₹50 lakh, per portfolio manager',
          'Accredited investors are exempt',
          'Shares sit in your own demat account, in your name',
        ],
      },
      {
        h: 'So why do some houses still say no?',
        body: [
          'Because of your country, not India\'s. Taking a US resident\'s money can drag the house into US securities law. Registration there is expensive and, for a foreign fund, often impossible, so most decline.',
          'That is a commercial decision, not a legal bar. Another house may say yes.',
        ],
      },
      {
        h: 'What do you actually need to open one?',
        body: [],
        points: [
          'A PAN',
          'An NRE or NRO bank account, depending on your route',
          'A demat account linked to it',
          'KYC through the usual Indian process',
        ],
      },
      {
        h: 'Repatriable or non-repatriable? Decide before you invest',
        body: [
          '<b>Repatriable:</b> money and gains can go back out. Listed-share purchases run through a designated bank branch, and an individual non-resident stays under 10% of any one company.',
          '<b>Non-repatriable:</b> treated as domestic money. Simpler, but proceeds stay in India unless you use your annual remittance allowance: up to <b>US $1 million per financial year</b> from an NRO account, with the documentation your bank asks for.',
          'Changing later is expensive.',
        ],
      },
      {
        h: 'How is it taxed if you are an NRI?',
        body: [
          'A PMS holds shares in your name, so every sale your manager makes is your sale, in your Indian return, that year. Tax is deducted at source; you claim any excess back by filing.',
          'A treaty may reduce the rate. Claiming it needs a residency certificate from your own country plus an Indian information form. Where you live changes this a lot, so read your country\'s guide first.',
        ],
      },
    ],
    related: [
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'What is the minimum investment in PMS?', href: '/learn/pms-minimum-investment' },
      { label: 'NRIs in the United States', href: '/nri/us' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
    ],
    sources: [SEBI_PMS, RBI_FI],
    faqs: [
      { q: "Does SEBI stop NRIs from investing in PMS?", a: "No. The portfolio management regulations contain no residency condition." },
      { q: "What is the minimum for an NRI?", a: "₹50 lakh, the same as for a resident, per portfolio manager." },
      { q: "Why do some houses decline me?", a: "Your country's rules, not India's. Taking a US resident's money can pull the house into US securities law." },
      { q: "Repatriable or non-repatriable?", a: "Decide before you invest. Repatriable money can leave India freely; non-repatriable is treated as domestic money, capped by your annual remittance allowance." },
      { q: "How is it taxed for an NRI?", a: "Every sale the manager makes is your disposal in your Indian return that year. Tax is deducted at source. Treaty relief needs a residency certificate plus Form 41." },
    ],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'are-indian-mutual-funds-pfic',
    question: 'Are Indian mutual funds PFICs?',
    answer:
      'For a US taxpayer, almost always yes. A foreign pooled fund is treated as a corporation by default, and one earning mostly passive income is a PFIC. That means tax at the top rate plus an interest charge, and a separate Form 8621 for every fund, every year.',
    metaTitle: "Are Indian Mutual Funds PFICs? US Taxpayer Guide",
    metaDescription:
      "Why Indian mutual funds are almost always PFICs for a US taxpayer, what the default regime costs, which election applies, and the structure that avoids it.",
    sections: [
      {
        h: 'What makes something a PFIC?',
        body: [
          'Any foreign corporation that meets one of two tests: 75% or more of its gross income is passive, or 50% or more of its assets, on average, produce passive income. A fund earning dividends, interest and capital gains meets both.',
        ],
      },
      {
        h: 'Why does an Indian mutual fund get caught?',
        body: [
          'By default. The US statute does not name Indian mutual funds. But a foreign vehicle whose investors all have limited liability is treated as a corporation for US tax unless someone elects otherwise, and nobody does for a retail Indian mutual fund.',
        ],
      },
      {
        h: 'What does it actually cost you?',
        body: [
          'Under the default regime, your gain is spread back across your whole holding period. Each earlier year is taxed at that year\'s top marginal rate, currently 37%, with no capital-gains rate and no offsetting deductions. Interest is charged on top, compounding daily.',
          'A normal tax year closes after three years. A year with an unfiled PFIC form stays open indefinitely.',
        ],
      },
      {
        h: 'Is there a way out?',
        body: [
          'Two elections exist. Only one is realistic for Indian funds.',
        ],
        points: [
          '<b>QEF election.</b> Needs an annual information statement from the fund in US tax form. Indian AMCs do not produce one, so it is rarely available.',
          '<b>Mark-to-market election.</b> Available where shares are regularly traded or redeemable at a published daily NAV, as most Indian mutual funds are. You pay tax on the paper gain each year, as ordinary income. Far better than the default.',
        ],
      },
      {
        h: 'What is not a PFIC?',
        body: [
          'The rules reach foreign <em>corporations</em>. An ordinary Indian operating company, such as a bank or a manufacturer, fails both tests, so its shares are not a PFIC.',
          'So a PMS holding operating-company shares directly in your name creates no PFIC exposure. You still report the account.',
          'The exception: mutual fund units inside the mandate are PFICs. Ask for the mandate in writing.',
        ],
      },
      {
        h: 'I already own them and never filed anything',
        body: [
          'The IRS streamlined filing procedures exist for people whose failure was not deliberate. Waiting does not help, because those years never closed. Take the fund statements to a US tax professional. The analysis is per fund, per year.',
        ],
      },
    ],
    related: [
      { label: 'NRIs in the United States', href: '/nri/us' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
    ],
    sources: [
      { label: 'IRC §1297 — PFIC definition', url: 'https://www.law.cornell.edu/uscode/text/26/1297' },
      { label: 'IRC §1291 — the default regime', url: 'https://www.law.cornell.edu/uscode/text/26/1291' },
      { label: 'Instructions for Form 8621', url: 'https://www.irs.gov/pub/irs-pdf/i8621.pdf' },
      { label: 'IRS — Streamlined Filing Compliance Procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures' },
    ],
    faqs: [
      { q: "Is every Indian mutual fund a PFIC?", a: "Almost always, for a US taxpayer. A foreign pooled vehicle is a corporation by default, and mostly passive income meets the PFIC test." },
      { q: "Does a PMS avoid PFIC?", a: "Yes, where it holds operating-company shares directly in your own name. They fail both PFIC tests." },
      { q: "Can I make a QEF election?", a: "Rarely. It requires an annual information statement in US form, which Indian AMCs do not generally produce." },
      { q: "What about mark-to-market?", a: "Often available, because most Indian mutual funds redeem at a published daily NAV. The paper gain is taxed each year as ordinary income." },
      { q: "I never filed Form 8621. Is it too late?", a: "No. Unfiled years remain open, so waiting does not help. The IRS streamlined procedures exist for non-wilful cases." },
    ],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'hmrc-reporting-fund-status-india',
    question: 'Do Indian funds have HMRC reporting fund status?',
    answer:
      'Some do. As at 4 November 2026, 19 India-domiciled or GIFT City parent funds hold HMRC reporting fund status across 71 share classes. Most Indian funds still do not. If yours does not, your profit on sale is taxed as income at up to 45% rather than as a capital gain at 24%.',
    metaTitle: "HMRC Reporting Fund Status: Indian Funds & UK Tax",
    metaDescription:
      "Which India-domiciled and GIFT City funds hold HMRC reporting fund status, parsed from HMRC's own file and dated, and why status decides 24% or 45%.",
    sections: [
      {
        h: 'What is reporting fund status?',
        body: [
          'A status HMRC grants to an offshore fund that agrees to report its income to UK investors each year, whether or not it pays that income out. Funds without it are treated punitively.',
        ],
      },
      {
        h: 'What happens if your fund does not have it?',
        body: [
          'Your profit on sale is an offshore income gain, not a capital gain. It is charged to income tax at your marginal rate, up to 45%.',
        ],
        points: [
          'No capital gains annual exempt amount',
          'No dividend or savings allowance',
          'If the investment loses money, the relief is a capital loss, which cannot be set against the income charge on one that worked',
        ],
      },
      {
        h: 'Are any Indian funds actually on the list?',
        body: [
          'Yes. We parsed HMRC\'s published file and counted <b>19 parent funds across 71 share classes</b>, including DSP, HDFC, ICICI Prudential, Kotak and Quantum, and six GIFT City or IFSC funds. The full table is below.',
        ],
        points: [
          '<b>Status is per share class.</b> The wrong class of a listed fund gives you nothing.',
          '<b>Status runs from a date.</b> Most Indian entries appear only from April 2025. A longer-held investment may have been non-reporting for part of its life, which is enough to taint the disposal.',
          '<b>Status can cease.</b> At least one GIFT City class came off the list on 31 March 2026.',
        ],
      },
      {
        h: 'How do I check my own fund?',
        body: [
          'HMRC publishes the list as a searchable file, updated monthly. Find your exact share class and the dates it covers, before you subscribe and again before you sell.',
        ],
      },
      {
        h: 'Is reporting status simply better?',
        body: [
          'Better on exit, but not free. You must declare the fund\'s reported income every year, including excess reported income it did not pay out. In an accumulating fund you can owe tax on money you have not seen.',
        ],
      },
      {
        h: 'What about a PMS rather than a fund?',
        body: [
          'A discretionary PMS is not a fund. You hold shares directly, pooled with nobody, so the offshore fund rules should not apply and your gains should be capital gains.',
          'Two caveats. HMRC has published no guidance on managed accounts, so this is a well-supported reading, not settled law. And every trade your manager makes is your own UK disposal. Ask for UK-basis reporting.',
        ],
      },
    ],
    related: [
      // Points at the /uk-tax cluster this page now sits above (Phase 6). The
      // maintained list lives there; this page stays the explanation.
      { label: 'The maintained list of Indian reporting funds', href: '/uk-tax/hmrc-reporting-funds-list' },
      { label: 'Reporting vs non-reporting: rate and loss relief', href: '/uk-tax/reporting-vs-non-reporting-funds' },
      { label: 'What counts as an offshore fund', href: '/uk-tax/offshore-reporting-funds' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
    ],
    sources: [
      { label: 'HMRC — Offshore funds: list of reporting funds', url: 'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds' },
      { label: 'HMRC IFM13412 — offshore income gains', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13412' },
      { label: 'HMRC IFM12220 — definition of an offshore fund', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12220' },
    ],
    faqs: [
      { q: "Do any Indian funds hold HMRC reporting fund status?", a: "Yes. As at 4 November 2026, 19 India-domiciled or GIFT City parent funds held it across 71 share classes." },
      { q: "What happens without reporting status?", a: "Your profit on sale is an offshore income gain, taxed as income at up to 45%, with no annual exempt amount." },
      { q: "Is status per fund or per share class?", a: "Per share class, and from a stated date. Check the class and its dates, not the fund name." },
      { q: "Can a fund lose reporting status?", a: "Yes. One GIFT City share class came off HMRC's list on 31 March 2026." },
      { q: "Is reporting status simply better?", a: "Better on disposal, but you must declare the fund's reported income each year, including amounts not paid out." },
    ],
    // Moves with HMRC's monthly file: extract refreshed from the 4 Nov 2026 list.
    reviewed: 'November 2026',
    published: PUBLISHED,
    regulatoryAsAt: 'November 2026',
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'form-10f-for-nri',
    question: 'Form 10F for NRIs: what it is, and what changed',
    answer:
      'Form 10F is now Form 41. India replaced its entire income tax law on 1 April 2026 and renumbered the forms. You still need it, along with a tax residency certificate, to claim treaty relief. It must be filed online. You do not need a digital signature.',
    metaTitle: "Form 10F for NRIs: How to File Without a PAN",
    metaDescription:
      "Form 10F became Form 41 when India replaced its income tax law. What it is for, how a non-resident without a PAN files it online, and why no DSC is needed.",
    sections: [
      {
        h: 'What is the form for?',
        body: [
          'To claim a lower treaty rate on Indian income you need two documents: a tax residency certificate from your own country\'s tax authority, and an Indian information form giving your status, tax number, address abroad and the period the certificate covers.',
          'Without both, tax is deducted at the ordinary Indian rate and you claim a refund later.',
        ],
      },
      {
        h: 'What changed on 1 April 2026?',
        body: [
          'India repealed the Income-tax Act, 1961 and replaced it with the Income-tax Act, 2025. Everything was renumbered.',
        ],
        points: [
          '<b>Form 10F is now Form 41</b>',
          'Form 10FA, the residents\' application for a certificate, is now Form 42',
          'The certificate itself is issued on Form 43',
        ],
        // Deliberately no section numbers: see the file header.
      },
      {
        h: 'Do I need a PAN to file it?',
        body: [
          'No. If you do not hold a PAN and are not required to, you register on the Indian e-filing portal under a separate non-resident category. You get an NR ID instead and file under that login.',
        ],
      },
      {
        h: 'Do I need an Indian digital signature?',
        body: [
          'No. Under the non-resident login you verify with a one-time password sent to your email and mobile. A digital signature certificate applies only to PAN holders who choose that route.',
        ],
      },
      {
        h: 'Can I still file it on paper?',
        body: [
          'No. A concession let non-residents without a PAN file on paper, but it expired on 30 September 2023 and was never reopened.',
        ],
      },
      {
        h: 'What if I skip it?',
        body: [
          'Tax is deducted at the ordinary rate, not the treaty rate. You can claim the difference back by filing an Indian return, but you are out of pocket for a year.',
        ],
      },
    ],
    related: [
      { label: 'How a UAE resident gets a TRC', href: '/learn/tax-residency-certificate-uae' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
      { label: 'Tax schedule, resident and NRI', href: '/tax' },
    ],
    sources: [ITA_2025],
    faqs: [
      { q: "Is Form 10F still called Form 10F?", a: "No. It is Form 41 since India replaced its income tax law on 1 April 2026. It still accompanies your residency certificate when you claim treaty relief." },
      { q: "Can I file it without a PAN?", a: "Yes, if you are not required to hold one. You register on the Indian e-filing portal under a separate non-resident category and receive an NR ID." },
      { q: "Do I need an Indian digital signature?", a: "No. The non-resident login is verified by a one-time password. A digital signature applies only to PAN holders who choose that route." },
      { q: "Can I still file on paper?", a: "No. The paper concession for non-residents without a PAN expired on 30 September 2023." },
      { q: "What happens if I skip it?", a: "Tax is deducted at the ordinary Indian rate. You can claim the difference back by filing an Indian return." },
    ],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'tax-residency-certificate-uae',
    question: 'How does a UAE resident get a TRC for Indian treaty relief?',
    answer:
      'You apply to the UAE Federal Tax Authority through the EmaraTax portal. For the India treaty, you must have been physically in the UAE for at least 183 days in the calendar year. The UAE\'s easier 90-day domestic test does not satisfy what the India treaty asks for.',
    metaTitle: "Tax Residency Certificate UAE: The 183-Day Rule",
    metaDescription:
      "How a UAE resident gets a TRC for India treaty relief: the EmaraTax process, fees and timelines, and why the treaty's own 183-day test is stricter.",
    sections: [
      {
        h: 'Why do you need one?',
        body: [
          'India gives no treaty relief without a certificate from the government of the country you claim to be resident in, plus an Indian information form.',
        ],
      },
      {
        h: 'What are the UAE\'s own residency tests?',
        body: [
          'Three routes. Any one is enough for UAE purposes.',
        ],
        points: [
          'Your usual home and centre of financial and personal interests are in the UAE',
          '<b>183 days or more</b> of physical presence in any 12 consecutive months',
          '<b>90 days or more</b> in 12 months, plus UAE or GCC nationality or a valid residence permit, plus a permanent home, job or business here',
        ],
      },
      {
        h: 'So why does India ask for 183 days?',
        body: [
          'The India treaty writes its own, stricter test: present in the UAE for at least <b>183 days in the calendar year</b> concerned.',
          'That is a <b>calendar</b> year, not a rolling twelve months and not India\'s April-to-March year. And the 90-day route does not, on its own, meet the treaty test. Count days and keep the evidence.',
        ],
      },
      {
        h: 'How do you apply?',
        body: [
          'Through EmaraTax, the Federal Tax Authority\'s portal. Ask for the double tax agreement certificate, not the general-purpose one.',
        ],
        points: [
          'Submission fee AED 50, plus an issuance fee that depends on whether you are registered for corporate tax',
          'Typically 5 to 10 business days',
          'Not for a future period, and not for more than 12 months',
          'For an individual, the period runs on the Gregorian calendar year',
        ],
      },
      {
        h: 'What else does India need?',
        body: [
          'Form 41, formerly Form 10F, renumbered when India replaced its income tax law on 1 April 2026. It is filed online. Without a PAN, you register under a separate non-resident category and verify by one-time password. No Indian digital signature is needed.',
        ],
      },
      {
        h: 'The mistakes that cost people money',
        body: [],
        points: [
          'Assuming India will accept a certificate obtained on the 90-day route',
          'Counting days on the Indian tax year, not the calendar year',
          'Applying after the year has closed for a period you cannot evidence',
          'Skipping the Indian form because someone said you need a digital signature',
        ],
      },
    ],
    related: [
      { label: 'NRIs in the UAE', href: '/nri/uae' },
      { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
    ],
    sources: [
      { label: 'UAE Cabinet Decision No. 85 of 2022 — determination of tax residency', url: 'https://tax.gov.ae/Datafolder/Files/Legislation/Corporate%20Tax/Cabinet%20Decision%2085%20of%202022%20-%20For%20publishing.pdf' },
      { label: 'UAE Federal Tax Authority — tax certificates', url: 'https://tax.gov.ae/en/services/issuance.of.tax.certificates.aspx' },
      { label: 'FTA Tax Procedures Guide — Tax Resident and TRC', url: 'https://tax.gov.ae/Datafolder/Files/Guides/VAT/VAT%20Guides/Tax-Resident-and-TRC--18-10-2024.pdf' },
      ITA_2025,
    ],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pms-minimum-investment',
    question: 'What is the minimum investment in PMS?',
    answer:
      '₹50 lakh. SEBI sets it, and a portfolio manager cannot accept less from a client. Accredited investors are exempt. The minimum applies per portfolio manager, so splitting money across two houses means meeting ₹50 lakh with each of them.',
    metaTitle: "PMS Minimum Investment in India: ₹50 Lakh Rule",
    metaDescription:
      "The SEBI minimum for PMS is ₹50 lakh per portfolio manager. Who is exempt, how top-ups are treated, and how it compares with AIF, SIF and GIFT City.",
    sections: [
      {
        h: 'What exactly is the rule?',
        body: [
          'A portfolio manager shall not accept from a client funds or securities worth less than fifty lakh rupees. The rule binds the manager, and covers new clients and fresh money from existing ones.',
        ],
      },
      {
        h: 'Is it per PMS or across all of them?',
        body: [
          'Per portfolio manager. Two houses need ₹50 lakh each.',
        ],
      },
      {
        h: 'Who is exempt?',
        body: [],
        points: [
          '<b>Accredited investors.</b> The minimum does not apply.',
          '<b>Co-investment portfolio managers.</b> A separate category with its own rules.',
          '<b>Pre-2020 investments</b>, made before the current regulations, are grandfathered.',
        ],
      },
      {
        h: 'Can I add smaller amounts later?',
        body: [
          'Not below the floor: fresh funds from existing clients are covered too. Houses handle this differently within the rules, so ask before assuming you can add ₹10 lakh next year.',
        ],
      },
      {
        h: 'How does it compare with the others?',
        body: [],
        points: [
          '<b>PMS:</b> ₹50 lakh',
          '<b>AIF:</b> ₹1 crore, usually a commitment drawn down over years',
          '<b>SIF:</b> ₹10 lakh, across all strategies of that fund at PAN level',
          '<b>GIFT City restricted scheme:</b> from US $150,000',
          '<b>Mutual fund:</b> a few hundred rupees',
        ],
      },
      {
        h: 'Why ₹50 lakh?',
        body: [
          'A PMS runs a concentrated portfolio, which falls harder than an index and stays down longer. The floor is the regulator saying this suits people who can lose a meaningful sum without it changing their life. If it feels like a stretch, that is useful information.',
        ],
      },
    ],
    related: [
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'PMS vs AIF', href: '/learn/pms-vs-aif' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_PMS, SEBI_AIF, IFSCA],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'can-nri-invest-in-aif',
    question: 'Can an NRI invest in an AIF in India?',
    answer:
      'Yes, explicitly. SEBI\'s AIF regulations state a fund may raise money from any investor, whether Indian, foreign or non-resident Indian. The minimum is ₹1 crore. The real work is choosing your exchange-control route, because that decides whether your money can leave India again.',
    metaTitle: "Can an NRI Invest in an AIF? Rules and Limits",
    metaDescription:
      "SEBI expressly permits foreign and non-resident investors in AIFs. The ₹1 crore minimum, the repatriable and non-repatriable routes, and Cat III limits.",
    sections: [
      {
        h: 'Do the rules actually allow it?',
        body: [
          'Yes. The AIF regulations say a fund "may raise funds from any investor whether <b>Indian, foreign or non-resident Indians</b>". There is no nationality or residency test.',
        ],
      },
      {
        h: 'What does it cost to get in?',
        body: [
          '<b>₹1 crore</b>. Employees and directors of the fund or its manager can come in at ₹25 lakh. Accredited investors have no minimum.',
          'Usually it is a commitment, drawn down by closed-ended funds over several years. Missing a call can be costly under the fund documents.',
        ],
      },
      {
        h: 'How does the money get in, and back out?',
        body: [
          'Units of an investment vehicle, which an AIF is, have their own route under India\'s exchange-control rules. On a <b>repatriable</b> basis, capital and gains can go back out. On a <b>non-repatriable</b> basis, the investment is treated as domestic money: simpler, but proceeds stay in India.',
          'Some funds prefer non-repatriable money, because it is not counted as foreign investment and triggers no downstream restrictions on what the fund can buy.',
          'From an NRO account you can remit up to <b>US $1 million per financial year</b>, with documentation.',
        ],
      },
      {
        h: 'Does the category change anything for me?',
        body: [],
        points: [
          '<b>Tax.</b> Categories I and II pass income through to you, keeping its character, and you report it. Category III generally settles tax inside the fund, so you receive a post-tax return.',
          '<b>What it can hold.</b> A Category III AIF that has taken foreign investment is restricted to instruments an FPI may hold.',
        ],
      },
      {
        h: 'Will a fund actually accept you?',
        body: [
          'Access is a commercial decision by each house, driven by your country of residence. US residents are frequently declined, because the subscription drags the fund into US securities law. UK and UAE residents face fewer obstacles, but their tax outcomes differ sharply. Read the guide for the country you file in.',
        ],
      },
    ],
    related: [
      { label: 'What is AIF?', href: '/learn/what-is-aif' },
      { label: 'What is the minimum investment in an AIF?', href: '/learn/aif-minimum-investment' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'NRIs in the United States', href: '/nri/us' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
    ],
    sources: [SEBI_AIF, RBI_FI],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'aif-minimum-investment',
    question: 'What is the minimum investment in an AIF?',
    answer:
      '₹1 crore. SEBI sets it, and an AIF cannot accept less from an investor. Employees and directors of the fund or its manager can come in at ₹25 lakh, and accredited investors have no minimum. In most funds the ₹1 crore is a commitment drawn down over years, not a single cheque.',
    metaTitle: "AIF Minimum Investment in India: ₹1 Crore Rule",
    metaDescription:
      "The AIF minimum is ₹1 crore, usually committed and drawn down rather than paid at once. Who is exempt, the corpus floor, and why angel funds now have none.",
    sections: [
      {
        h: 'What is the rule?',
        body: [
          'An AIF shall not accept from an investor an investment of value less than <b>one crore rupees</b>. Employees and directors of the AIF or its manager may invest ₹25 lakh. The clause does not apply to accredited investors.',
        ],
      },
      {
        h: 'Is ₹1 crore payable upfront?',
        body: [
          'Usually not. In most closed-ended funds you sign a commitment, drawn down in tranches over several years. You may pay 20% in year one and nothing for eighteen months.',
          'Failing to meet a call can carry punitive consequences under the fund documents, sometimes including forfeiting part of what you have put in. Open-ended Category III funds are more likely to take the whole amount at once.',
        ],
      },
      {
        h: 'What else has a minimum?',
        body: [],
        points: [
          '<b>Scheme corpus:</b> at least ₹20 crore before a scheme can operate, ₹5 crore for a social impact fund',
          '<b>Investor cap:</b> 1,000 investors per scheme, excluding accredited investors',
          '<b>Manager skin in the game:</b> at least 2.5% of the corpus or ₹5 crore, whichever is lower. For Category III, 5% or ₹10 crore',
        ],
      },
      {
        h: 'Are angel funds still ₹25 lakh?',
        body: [
          'No. Since September 2025, angel funds raise only from accredited investors, and <b>no minimum investment applies to them at all</b>. The old ₹25 lakh angel minimum was removed.',
        ],
      },
      {
        h: 'How does it compare?',
        body: [],
        points: [
          '<b>AIF:</b> ₹1 crore, usually committed and drawn down',
          '<b>PMS:</b> ₹50 lakh, paid upfront',
          '<b>SIF:</b> ₹10 lakh, across all strategies of that fund at PAN level',
          '<b>GIFT City restricted scheme:</b> from US $150,000',
          '<b>Mutual fund:</b> a few hundred rupees',
        ],
      },
    ],
    related: [
      { label: 'What is AIF?', href: '/learn/what-is-aif' },
      { label: 'Can an NRI invest in an AIF?', href: '/learn/can-nri-invest-in-aif' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'PMS vs AIF', href: '/learn/pms-vs-aif' },
    ],
    sources: [SEBI_AIF, SEBI_PMS],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'gift-city-minimum-investment',
    question: 'What is the minimum investment in a GIFT City fund?',
    answer:
      'It depends on the scheme type, and the numbers are in dollars. A restricted, non-retail scheme takes investors from US $150,000. A venture capital scheme from US $250,000. An IFSC portfolio management mandate from US $75,000. Retail schemes have no per-investor minimum.',
    metaTitle: "GIFT City Fund Minimum Investment: IFSCA Limits",
    metaDescription:
      "The IFSCA minimum investment thresholds for GIFT City funds, by scheme type and investor class, with the governing regulation for each.",
    sections: [
      {
        h: 'The thresholds, by scheme type',
        body: [
          'The IFSCA, GIFT City\'s own regulator, sets minimums in US dollars.',
        ],
        points: [
          '<b>Restricted (non-retail) scheme:</b> from US $150,000. US $40,000 for employees and directors of the manager. Capped at 1,000 investors',
          '<b>Venture capital scheme:</b> from US $250,000. US $60,000 for employees and directors. Capped at 50 investors',
          '<b>IFSC portfolio management:</b> from US $75,000, reduced from $150,000 under the older rules',
          '<b>Retail scheme:</b> no per-investor minimum',
        ],
      },
      {
        h: 'One trap in the numbers',
        body: [
          'The US $10,000 sometimes quoted as "the GIFT City minimum" applies only to close-ended retail schemes investing more than 15% in unlisted securities.',
        ],
      },
      {
        h: 'Who is allowed to invest?',
        body: [
          'A person resident outside India; a non-resident Indian; a non-individual resident in India eligible under exchange-control rules to invest offshore; and an individual resident in India, to the extent allowed under the liberalised remittance scheme.',
          'A resident Indian is capped by the annual remittance allowance of US $250,000. <b>An NRI investing as a non-resident is not.</b>',
        ],
      },
      {
        h: 'Accreditation does not carry across',
        body: [
          'IFSCA has its own accredited investor definition. SEBI accreditation does not make you accredited in GIFT City, or the other way round.',
        ],
      },
      {
        h: 'Does a lower minimum mean lower risk?',
        body: [
          'No. A minimum tells you who the regulator thinks should be in the room, not how the strategy behaves. A US $75,000 IFSC mandate can hold a far more concentrated book than a ₹1 crore Indian AIF.',
        ],
      },
    ],
    related: [
      { label: 'GIFT City explained', href: '/gift-city' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'AIF minimum investment', href: '/learn/aif-minimum-investment' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
    ],
    sources: [IFSCA, SEBI_AIF],
    faqs: [
      { q: "What is the minimum for a GIFT City restricted scheme?", a: "US $150,000, or US $40,000 for employees and directors of the manager. Capped at 1,000 investors." },
      { q: "Is there a minimum for a retail scheme?", a: "No. The US $10,000 sometimes quoted applies only to close-ended retail schemes holding more than 15% unlisted." },
      { q: "What about a venture capital scheme?", a: "From US $250,000, or US $60,000 for employees and directors, with a maximum of 50 investors." },
      { q: "Can an NRI invest without the remittance cap?", a: "Yes. The annual remittance cap constrains India-resident investors, not an NRI investing as a non-resident." },
      { q: "Does SEBI accreditation carry into GIFT City?", a: "No. IFSCA runs its own accredited investor regime, and neither status carries across." },
    ],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'nri-repatriation-limit',
    question: 'How much money can an NRI send out of India each year?',
    answer:
      'Up to US $1 million per financial year from an NRO account, with documentation. Money held on a repatriable basis, in an NRE account or bought through the repatriable route, is not capped at all. Which one applies depends on a choice you made when you invested.',
    metaTitle: "NRI Repatriation Limit: The US $1 Million Rule",
    metaDescription:
      "An NRI may remit US $1 million a year from an NRO account. Money held on a repatriable basis has no cap. How the two routes differ, and when to choose.",
    sections: [
      {
        h: 'The headline number',
        body: [
          'From an NRO account, an NRI or person of Indian origin may remit up to <b>US $1 million per financial year</b>. That covers balances, sale proceeds and inherited assets, on documentary evidence plus an undertaking your bank will ask for.',
        ],
      },
      {
        h: 'When the cap does not apply',
        body: [
          'Money held on a <b>repatriable</b> basis, or in an NRE account, is not subject to it. Capital and gains can move out without the annual ceiling. The cap limits one route, not NRIs.',
        ],
      },
      {
        h: 'Which route are you on?',
        body: [],
        points: [
          '<b>Repatriable.</b> Money comes in from abroad or from an NRE account. Listed-share purchases run through a designated bank branch. Proceeds can go back out freely.',
          '<b>Non-repatriable.</b> Treated as domestic money, on a par with a resident\'s. Simpler, and some funds prefer it because it is not counted as foreign investment. But proceeds stay in India unless you use the US $1 million allowance.',
        ],
      },
      {
        h: 'Why this needs deciding before you invest',
        body: [
          'Changing route afterwards usually means selling and re-buying, with the tax and costs that follow. If you may want this money outside India, say so at account-opening.',
        ],
      },
      {
        h: 'What about tax on the way out?',
        body: [
          'Repatriation is not itself a taxable event. Tax on the underlying gain is deducted at source when you sell.',
          'Claiming a lower treaty rate needs a residency certificate from your own country plus an Indian information form, now called Form 41. Your bank will also want certification that taxes have been dealt with before it releases the remittance.',
        ],
      },
    ],
    related: [
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'Can an NRI invest in an AIF?', href: '/learn/can-nri-invest-in-aif' },
      { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
    ],
    sources: [RBI_FI, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'nre-vs-nro-account',
    question: 'NRE or NRO account: which one do you need?',
    answer:
      'NRE is for money you earned abroad. It is fully repatriable and the interest is exempt from Indian tax. NRO is for money you earn in India, like rent or dividends. Its interest is taxable, and you can send out up to US $1 million a year. Most NRIs end up needing both.',
    metaTitle: "NRE vs NRO Account: Which One an NRI Needs",
    metaDescription:
      "NRE holds money earned abroad and is fully repatriable. NRO holds Indian income and is capped. How each is taxed, and which your investments should use.",
    sections: [
      {
        h: 'The one-line difference',
        body: [
          '<b>NRE</b> holds money you earned outside India. <b>NRO</b> holds money you earn inside India. Both are rupee accounts.',
        ],
      },
      {
        h: 'How they differ in practice',
        body: [],
        points: [
          '<b>Repatriation.</b> NRE money moves out freely. NRO money is capped at US $1 million per financial year, with documentation.',
          '<b>Indian tax on interest.</b> NRE interest is exempt. NRO interest is taxable, deducted at source.',
          '<b>What goes in.</b> NRE takes foreign earnings. NRO takes Indian rent, dividends, pension and proceeds from assets you already held.',
          '<b>Joint holding.</b> NRE can generally be held jointly with another non-resident. NRO is more flexible on resident joint holders.',
        ],
      },
      {
        h: 'Which one should your investments run through?',
        body: [
          'It follows from your route. A <b>repatriable</b> investment is funded from abroad or from your NRE account, and proceeds can go back out. A <b>non-repatriable</b> one runs through NRO and is treated as domestic money.',
          'Decide before you invest. Changing route usually means selling and re-buying, with the tax and cost that follows.',
        ],
      },
      {
        h: 'A trap for people who file taxes abroad',
        body: [
          'NRE interest is exempt in India, not tax-free. If you are tax resident somewhere that taxes worldwide income, the UK for example, it is fully taxable there. And because no Indian tax was paid, there is usually no foreign tax credit to claim.',
        ],
      },
      {
        h: 'What about FCNR?',
        body: [
          'FCNR is a term deposit held in foreign currency, so it carries no rupee exchange risk. The interest is exempt from Indian tax, like NRE. It suits money you will need in dollars, pounds or dirhams.',
        ],
      },
    ],
    related: [
      { label: 'How much can an NRI send out of India?', href: '/learn/nri-repatriation-limit' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
    ],
    sources: [RBI_FI, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'sif-minimum-investment',
    question: 'What is a SIF, and what is the minimum investment?',
    answer:
      'A Specialised Investment Fund is SEBI\'s newest category, sitting between mutual funds and AIFs. The minimum is ₹10 lakh, measured at PAN level across every strategy of that fund. It can go long and short, but it keeps mutual-fund style rules, disclosure and tax.',
    metaTitle: "SIF Minimum Investment: ₹10 Lakh, and What a SIF Is",
    metaDescription:
      "Specialised Investment Funds start at ₹10 lakh, measured at PAN level across all strategies. How SIFs differ from mutual funds and AIFs, and the tax.",
    sections: [
      {
        h: 'What is a SIF?',
        body: [
          'A category SEBI created between a mutual fund and an AIF. It can go long the stocks it likes and short the ones it does not, which is hedge-fund technique, while keeping mutual-fund style rules, disclosure and tax treatment.',
        ],
      },
      {
        h: 'What is the minimum?',
        body: [
          '<b>₹10 lakh</b>, against ₹50 lakh for a PMS and ₹1 crore for an AIF.',
        ],
        points: [
          'Measured <b>at PAN level, across all strategies</b> of that fund. You cannot split ₹10 lakh across two of its strategies.',
          'Ordinary mutual fund holdings with the same AMC do not count.',
          'Accredited investors are exempt.',
        ],
      },
      {
        h: 'What happens if your balance falls below ₹10 lakh?',
        body: [
          'If markets fell, it is not treated as a breach. If you caused it by redeeming part of your holding, the units are frozen and you get 30 days to rebalance above the floor.',
        ],
      },
      {
        h: 'How is a SIF taxed?',
        body: [
          'Like a mutual fund. An equity-oriented SIF is taxed as equity: 20% on gains under 12 months, 12.5% beyond, with ₹1.25 lakh exempt each year. In a Category III AIF, tax is generally settled inside the fund at the maximum marginal rate.',
        ],
      },
      {
        h: 'What should make you cautious?',
        body: [
          'The category went live in 2025, so there is no long-run evidence yet on how these strategies behave through a full Indian market cycle.',
          'Hedged strategies trade constantly, so the securities transaction tax increase from April 2026 hits them harder than a low-churn portfolio. Ask any manager how it moved their gross-to-net.',
        ],
      },
    ],
    related: [
      { label: 'PMS vs AIF', href: '/learn/pms-vs-aif' },
      { label: 'What is AIF?', href: '/learn/what-is-aif' },
      { label: 'AIF minimum investment', href: '/learn/aif-minimum-investment' },
      { label: 'Tax schedule, all structures', href: '/tax' },
    ],
    sources: [SEBI_AIF, SEBI_PMS],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pms-vs-mutual-fund',
    question: 'PMS or mutual fund: what is the real difference?',
    answer:
      'A mutual fund gives you units of a pool. A PMS puts the actual shares in your own demat account. That changes how concentrated it can be, what you can see, and crucially who pays tax on the churn. In a PMS, that is you, every year.',
    metaTitle: "PMS vs Mutual Fund: Ownership and Tax Compared",
    metaDescription:
      "A mutual fund gives you units. A PMS puts the shares in your own demat. What that changes for concentration, visibility and who pays tax on the churn.",
    sections: [
      {
        h: 'The difference that drives all the others',
        body: [
          'In a mutual fund you own <b>units of a pool</b>. In a PMS you own <b>the shares themselves</b>, in your own demat account. SEBI requires that a portfolio manager must not hold client securities in its own name.',
        ],
      },
      {
        h: 'Side by side',
        body: [],
        points: [
          '<b>Minimum.</b> A few hundred rupees for a mutual fund. ₹50 lakh for a PMS.',
          '<b>Holdings.</b> Typically 50 to 80 stocks in a fund. 15 to 30 in a PMS.',
          '<b>Visibility.</b> A monthly factsheet, against every share on any day.',
          '<b>Customisation.</b> None in a fund. In a PMS you can exclude a sector or a stock.',
          '<b>Tax on churn.</b> Paid inside the fund. Paid by you, every year, in a PMS.',
        ],
      },
      {
        h: 'The tax point people underestimate',
        body: [
          'A mutual fund manager can trade all year and you are taxed only when you redeem. A PMS has no such wrapper. <b>Every sale the manager makes is your sale, in your return, that year.</b> A high-turnover PMS bills you tax annually even if you never withdraw a rupee.',
          'So two managers with identical gross returns can leave you with different money. Ask for portfolio turnover alongside performance.',
        ],
      },
      {
        h: 'When is a PMS actually the better tool?',
        body: [
          'When you want concentration and can live with it. A manager running twenty-five positions instead of eighty can size a conviction so it moves the portfolio. That is where extra return can come from, and why the portfolio falls harder, and stays down longer, than an index.',
          'Otherwise the mutual fund is the better answer: cheaper, more liquid and more diversified.',
        ],
      },
      {
        h: 'And the honest caveat',
        body: [
          'Manager dispersion in PMS is much wider than in mutual funds, so picking the manager is the whole decision.',
        ],
      },
    ],
    related: [
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'PMS vs AIF', href: '/learn/pms-vs-aif' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_PMS],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'which-amcs-accept-us-nri',
    question: 'Which Indian mutual funds accept US and Canadian NRIs?',
    answer:
      'Only a minority of Indian AMCs accept US or Canadian residents, usually with offline paperwork and extra declarations. The list changes, so nobody should publish a stale one. The bigger question is whether to buy an Indian mutual fund at all, because for a US taxpayer it is almost certainly a PFIC.',
    metaTitle: "Which Indian Mutual Funds Accept US NRIs?",
    metaDescription:
      "Why most Indian AMCs decline US and Canadian residents, what the ones that accept you require, and the tax reason to question the product first.",
    sections: [
      {
        h: 'Why most houses say no',
        body: [
          'American law, not Indian. Accepting your subscription can pull the fund inside US securities rules. A foreign fund publicly offering into the United States needs a registration that is expensive and, in practice, almost never granted. Canada creates a similar problem through its provincial registration rules.',
        ],
      },
      {
        h: 'What the ones that accept you will ask for',
        body: [],
        points: [
          'Paper application rather than an online one',
          'An additional declaration about your US or Canadian status',
          'US tax documentation, usually a W-9',
          'Sometimes an in-person or in-India signature',
        ],
      },
      {
        h: 'We are deliberately not publishing a list',
        body: [
          'Which houses accept you changes month to month, without announcement. A list published today is wrong within a quarter. We keep a current one from our own empanelments and send it on request.',
        ],
      },
      {
        h: 'The question worth asking first',
        body: [
          'For a US taxpayer, an Indian mutual fund is almost always a PFIC: tax at the top marginal rate with an interest charge, and a Form 8621 for every fund, every year. A fund saying yes does not change that.',
          'A PMS avoids it. It holds operating-company shares directly in your own name, and operating companies are not PFICs.',
        ],
      },
    ],
    related: [
      { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic' },
      { label: 'NRIs in the United States', href: '/nri/us' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'PMS vs mutual fund', href: '/learn/pms-vs-mutual-fund' },
    ],
    sources: [
      { label: '17 CFR 230.902 — Regulation S definitions', url: 'https://www.law.cornell.edu/cfr/text/17/230.902' },
      { label: 'Investment Company Act §7(d)', url: 'https://www.law.cornell.edu/uscode/text/15/80a-7' },
      SEBI_PMS,
    ],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'gift-city-vs-mutual-fund-for-nri',
    question: 'GIFT City fund or Indian mutual fund: which is better for an NRI?',
    answer:
      'It depends on where you pay tax. A GIFT City fund lets you invest in dollars with no Indian bank account and usually no Indian filing. But India\'s exemptions are built for investors taxed nowhere else. If your own country taxes you anyway, that exemption can be worth nothing to you.',
    metaTitle: "GIFT City vs Indian Mutual Fund for NRIs",
    metaDescription:
      "Currency, paperwork and repatriation compared, plus the tax question that actually decides it and why the answer differs in the US, the UAE and the UK.",
    sections: [
      {
        h: 'What GIFT City actually changes',
        body: [
          'GIFT City sits legally inside India but operates in US dollars under its own regulator, the IFSCA.',
        ],
        points: [
          '<b>Currency.</b> You subscribe in dollars, with no forced rupee conversion.',
          '<b>Accounts.</b> No NRE or NRO account needed.',
          '<b>Repatriation.</b> Capital and gains move without the usual friction.',
          '<b>Filing.</b> For many structures, Indian tax is settled at fund level and you file nothing in India.',
        ],
      },
      {
        h: 'The question that actually decides it',
        body: [
          'Where you file your taxes. India\'s IFSC exemptions were designed for investors taxed nowhere else. If your own country taxes your worldwide income, an Indian exemption simply removes the foreign tax credit you would otherwise have claimed. The saving passes to your own government.',
        ],
      },
      {
        h: 'How the answer differs by country',
        body: [],
        points: [
          '<b>UAE.</b> The strongest case. You are taxed nowhere else, and GIFT treatment is statutory rather than resting on a litigated treaty reading.',
          '<b>United States.</b> Weakest. The treaty gives no relief on capital gains, so the whole burden falls on your US return. The classification of the vehicle matters far more than the exemption.',
          '<b>United Kingdom.</b> Depends on whether that share class holds HMRC reporting fund status. Without it, your gain is taxed as income at up to 45% rather than as a capital gain.',
        ],
      },
      {
        h: 'Where an Indian mutual fund still wins',
        body: [
          'Cost and access. A mutual fund starts at a few hundred rupees with daily liquidity. GIFT City restricted schemes start at US $150,000. If you have rupee income to deploy and the tax outcome in your corridor is similar, the simpler product is often better.',
        ],
      },
      {
        h: 'The one thing to check either way',
        body: [
          'How the vehicle is structured. For a US taxpayer, whether it is a corporation, a partnership or a trust changes your filing completely. For a UK resident, whether your share class is on HMRC\'s list changes your rate by twenty points. Neither is on a factsheet.',
        ],
      },
    ],
    related: [
      { label: 'GIFT City explained', href: '/gift-city' },
      { label: 'GIFT City minimum investment', href: '/learn/gift-city-minimum-investment' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [IFSCA, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'aif-categories-explained',
    question: 'AIF Category I, II and III: what is the difference?',
    answer:
      'The number describes what the fund is allowed to do, not how risky it is. Category I backs startups and infrastructure. Category II holds private equity, private credit and real-estate debt, and is the largest by far. Category III trades listed markets and may use leverage. They are also taxed differently.',
    metaTitle: "AIF Category I, II & III: Rules, Tax and Minimums",
    metaDescription:
      "What each AIF category may hold, typical lock-ins, and the tax split that matters most: Cat I and II pass income through, Cat III is taxed inside the fund.",
    sections: [
      {
        h: 'The categories are strategy buckets, not risk grades',
        body: [
          'The number is not a rating: a Category I venture fund is far riskier than a Category II private credit fund. It says what the fund may invest in and how it may operate.',
        ],
      },
      {
        h: 'Category I, the nursery',
        body: [
          'Funds the regulator wants to encourage: venture capital, angel funds, infrastructure, social ventures. The longest horizons, typically 8 to 12 years, and the highest single-investment risk, with one or two winners carrying the fund.',
        ],
      },
      {
        h: 'Category II, the workhorse',
        body: [
          'Everything that is neither venture nor trading and uses no significant leverage: private equity, private credit, real-estate debt, pre-IPO. Most serious alternatives money in India sits here. Usually closed-ended, 3 to 10 years, with contracted or event-driven returns.',
        ],
      },
      {
        h: 'Category III, the trading desk',
        body: [
          'Complex strategies in listed markets: long-short, market neutral, concentrated books using derivatives. It may borrow. Closest to a hedge fund, with better liquidity than Category I or II, often through periodic exit windows.',
        ],
      },
      {
        h: 'The tax split is the part that matters',
        body: [],
        points: [
          '<b>Category I and II are pass-through.</b> Income is taxed in your hands, as though you had invested directly, and keeps its original character. The fund sends you a statement and you report it.',
          '<b>Category III is not.</b> Tax is generally settled inside the fund, so what reaches you is post-tax and you report nothing further.',
        ],
      },
      {
        h: 'What this means when you compare funds',
        body: [
          'A Category II gross return and a Category III post-tax return are not the same number. Establish which you are being shown before comparing.',
        ],
      },
    ],
    related: [
      { label: 'What is AIF?', href: '/learn/what-is-aif' },
      { label: 'AIF minimum investment', href: '/learn/aif-minimum-investment' },
      { label: 'PMS vs AIF', href: '/learn/pms-vs-aif' },
      { label: 'Tax schedule, all structures', href: '/tax' },
    ],
    sources: [SEBI_AIF],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pms-fees-explained',
    question: 'How much does a PMS actually cost?',
    answer:
      'Two shapes are common. A flat fee of about 2 to 2.5% a year, or a lower flat fee plus a share of profits above a hurdle. Most people assume the profit-share is cheaper. On typical terms the crossover is around a 16.7% gross return. Above that, the flat fee costs you less.',
    metaTitle: "PMS Fees in India: Flat Fee vs Profit Share",
    metaDescription:
      "What a PMS costs, worked through on ₹50 lakh: where the flat-fee and profit-share crossover sits, and the three clauses to check before you sign.",
    sections: [
      {
        h: 'The two shapes',
        body: [
          'Fees are commercial, not regulated, so they vary by house.',
        ],
        points: [
          '<b>Flat fee only.</b> Typically 2 to 2.5% of assets a year.',
          '<b>Flat plus profit share.</b> A lower fixed fee, plus a cut of gains above a hurdle rate.',
        ],
      },
      {
        h: 'Run the numbers before you assume',
        body: [
          'Take ₹50 lakh over one year. On a <b>flat 2.5%</b>, you pay ₹1,25,000 in a good year or bad.',
          'On <b>1.5% plus 15% above a 10% hurdle</b>, at an 18% return your gain is ₹9,00,000. The hurdle absorbs the first ₹5,00,000. Of the remaining ₹4,00,000 the manager takes 15%, or ₹60,000. Add the ₹75,000 fixed fee and you pay ₹1,35,000.',
          '<b>The crossover sits around 16.7%.</b> Below it the profit share is cheaper. Above it, the flat fee is.',
        ],
      },
      {
        h: 'Three clauses to check before signing',
        body: [],
        points: [
          '<b>The hurdle.</b> What return must the manager clear before taking a share?',
          '<b>The high-water mark.</b> Without one you can be charged twice for recovering the same loss.',
          '<b>Realised or notional.</b> Is the profit share charged on booked gains or paper gains?',
        ],
      },
      {
        h: 'What sits on top',
        body: [
          'GST on the fee, plus brokerage, custody and audit charges.',
          'And tax on churn. A PMS holds shares in your own name, so every sale the manager makes is your taxable disposal that year, even if you withdraw nothing.',
        ],
      },
      {
        h: 'The number to ask for',
        body: [
          'Portfolio turnover, alongside performance. Two managers with identical gross returns can leave you with materially different money once fees and churn tax are through.',
        ],
      },
    ],
    related: [
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'PMS vs mutual fund', href: '/learn/pms-vs-mutual-fund' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_PMS],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },
]

export const answerBySlug = (slug: string): Answer | undefined =>
  ANSWERS.find((a) => a.slug === slug)

export const ANSWER_SLUGS = ANSWERS.map((a) => a.slug)
