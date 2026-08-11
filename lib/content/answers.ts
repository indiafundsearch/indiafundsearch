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
  reviewed: string
}

const REVIEWED = 'August 2026'

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
      'Yes. SEBI\'s portfolio management rules contain no residency condition at all. The minimum is ₹50 lakh, the same as for a resident. What actually decides it is your bank and demat setup under FEMA, and each PMS house\'s own policy. Many decline US and Canadian residents.',
    metaTitle: 'Can an NRI invest in PMS in India? Rules, minimum and routes',
    metaDescription:
      'Yes, NRIs can invest in Indian PMS. SEBI imposes no residency bar. What you actually need: the ₹50 lakh minimum, an NRE or NRO route under FEMA, and a house that accepts your country of residence.',
    sections: [
      {
        h: 'Does SEBI stop an NRI from investing in a PMS?',
        body: [
          'No. We searched the full consolidated text of the portfolio management regulations for "non-resident", "NRI", "nationality" and "citizen". There are no hits.',
          'There is no residency test in the rules. A portfolio manager may take you as a client on exactly the same terms as a resident.',
        ],
        points: [
          'Minimum: ₹50 lakh, per portfolio manager',
          'Accredited investors are exempt from the minimum',
          'Your shares sit in your own demat account, in your name',
        ],
      },
      {
        h: 'So why do some houses still say no?',
        body: [
          'Because of your country, not India\'s.',
          'If you live in the United States, taking your money can drag the house into US securities law. Registration there is expensive and, for a foreign fund, often impossible. So most decline rather than deal with it.',
          'That is a commercial decision by that house. It is not a legal bar on you, and another house may say yes.',
        ],
      },
      {
        h: 'What do you actually need to open one?',
        body: ['The paperwork is more ordinary than people expect.'],
        points: [
          'A PAN',
          'An NRE or NRO bank account, depending on the route you choose',
          'A demat account linked to that bank account',
          'KYC through the usual Indian process',
        ],
      },
      {
        h: 'Repatriable or non-repatriable? Decide before you invest',
        body: [
          'This is the choice people get wrong, and it is expensive to change later.',
          'On a <b>repatriable</b> basis, your money and gains can go back out. Listed-share purchases run through a designated bank branch, and an individual non-resident stays under 10% of any one company.',
          'On a <b>non-repatriable</b> basis, the investment is treated as domestic money. Simpler, but the proceeds stay in India unless you use your annual remittance allowance.',
          'From an NRO account you can send out up to <b>US $1 million per financial year</b>, with the documentation your bank asks for.',
        ],
      },
      {
        h: 'How is it taxed if you are an NRI?',
        body: [
          'A PMS holds shares in your own name. So every sale your manager makes is your sale, in your Indian return, that year. Tax is deducted at source, and you claim any excess back by filing.',
          'If a tax treaty applies to you, it may reduce the rate. Claiming it needs a residency certificate from your own country plus an Indian information form.',
          'Where you live changes this a lot. It is worth reading the guide for your own country before you commit.',
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
    reviewed: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'are-indian-mutual-funds-pfic',
    question: 'Are Indian mutual funds PFICs?',
    answer:
      'If you are a US taxpayer, almost always yes. A foreign pooled fund is treated as a corporation by default, and one earning mostly passive income is a PFIC. That means tax at the top rate plus an interest charge, and a separate Form 8621 for every fund, every year.',
    metaTitle: 'Are Indian mutual funds PFICs? What US taxpayers need to know',
    metaDescription:
      'Indian mutual funds are almost always PFICs for a US taxpayer. What that costs you, why the assessment clock never starts, which election may be available, and the one Indian structure that avoids PFIC entirely.',
    sections: [
      {
        h: 'What makes something a PFIC?',
        body: [
          'A passive foreign investment company is any foreign corporation that meets one of two tests. Either 75% or more of its gross income is passive. Or 50% or more of its assets, on average, produce passive income.',
          'A fund earning dividends, interest and capital gains meets both comfortably.',
        ],
      },
      {
        h: 'Why does an Indian mutual fund get caught?',
        body: [
          'Indian mutual funds are not named anywhere in the US statute. They get there by default.',
          'A foreign vehicle whose investors all have limited liability is treated as a corporation for US tax purposes unless someone elects otherwise. Nobody elects otherwise for a retail Indian mutual fund. So it is a foreign corporation earning passive income, which is a PFIC.',
        ],
      },
      {
        h: 'What does it actually cost you?',
        body: [
          'Under the default regime, your gain is spread back across the whole time you held the fund. Each earlier year is taxed at that year\'s top marginal rate, currently 37%. No capital-gains rate. No deductions to offset it.',
          'On top of that, interest is charged, compounding daily.',
          'And the clock never starts. A normal tax year closes after three years. A year with an unfiled PFIC form stays open indefinitely, however long ago it was.',
        ],
      },
      {
        h: 'Is there a way out?',
        body: [
          'Two elections exist. Only one is realistic for Indian funds.',
        ],
        points: [
          '<b>QEF election.</b> Needs an annual information statement from the fund in US tax form. Indian AMCs do not produce one, so this is rarely available.',
          '<b>Mark-to-market election.</b> Available where the shares are regularly traded or redeemable at a published daily NAV, which most Indian mutual funds are. You pay tax on the paper gain each year, as ordinary income. Painful, but far better than the default.',
        ],
      },
      {
        h: 'What is not a PFIC?',
        body: [
          'This is the useful part, and almost nobody says it.',
          'The PFIC rules reach foreign <em>corporations</em>. An ordinary Indian operating company — a bank, a manufacturer — fails both tests, so its shares are not a PFIC.',
          'So a PMS invested in operating-company shares creates no PFIC exposure at all. You hold the shares directly, in your own name. You still report the account, but the punitive regime does not apply.',
          'The exception: if the mandate holds mutual fund units, PFIC comes back for those holdings. Ask for the mandate in writing.',
        ],
      },
      {
        h: 'I already own them and never filed anything',
        body: [
          'You are not unusual, and there is a defined route back. The IRS streamlined filing procedures exist for people whose failure was not deliberate.',
          'Waiting does not help, because those years never closed. Take the fund statements to a US tax professional. The analysis is per fund, per year.',
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
    reviewed: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'hmrc-reporting-fund-status-india',
    question: 'Do Indian funds have HMRC reporting fund status?',
    answer:
      'Most do not. A few do, including several GIFT City funds. HMRC publishes the list monthly. If your share class is not on it, your profit on sale is taxed as income at up to 45% rather than as a capital gain at 24%, and the loss relief does not come back.',
    metaTitle: 'HMRC reporting fund status and Indian funds — what UK residents pay',
    metaDescription:
      'Which Indian and GIFT City funds hold HMRC reporting fund status, why it decides whether you pay 24% or 45%, and how to check your exact share class before you buy or sell.',
    sections: [
      {
        h: 'What is reporting fund status?',
        body: [
          'It is a status HMRC grants to an offshore fund that agrees to report its income to UK investors each year, whether or not it pays that income out.',
          'Funds that have it are treated normally. Funds that do not are treated punitively.',
        ],
      },
      {
        h: 'What happens if your fund does not have it?',
        body: [
          'Your profit on sale is not a capital gain at all. It is an offshore income gain, charged to income tax at your marginal rate, so up to 45%.',
        ],
        points: [
          'No capital gains annual exempt amount to set against it',
          'The dividend and savings allowances do not apply either',
          'If the investment loses money, the relief is a capital loss, so it cannot be set against the income charge on the one that worked',
        ],
      },
      {
        h: 'Are any Indian funds actually on the list?',
        body: [
          'Yes, more than the usual advice suggests. India-domiciled entries include several GIFT City and IFSC funds, a handful of Indian AIFs, and share classes from mainstream Indian houses. One GIFT City manager has created dedicated UK unit classes.',
          'Three things decide whether that helps you.',
        ],
        points: [
          '<b>Status is per share class.</b> Holding the wrong class of a listed fund gives you nothing.',
          '<b>Status runs from a date.</b> Most Indian entries only appear from April 2025. A longer-held investment may have been non-reporting for part of its life, which is enough to taint the disposal.',
          '<b>Status can cease.</b> At least one GIFT City class came off the list on 31 March 2026.',
        ],
      },
      {
        h: 'How do I check my own fund?',
        body: [
          'HMRC publishes the list as a searchable file, updated monthly. Find your exact share class, not just the fund name, and check the dates it covers.',
          'Do it before you subscribe, and again before you sell.',
        ],
      },
      {
        h: 'Is reporting status simply better?',
        body: [
          'Better on exit, but not free.',
          'A UK investor in a reporting fund must declare the fund\'s reported income every year, including the excess reported income it did not pay out. In an accumulating fund you can owe tax on money you have not seen.',
          'For a long-term holder that is still the better trade. It just comes with an annual filing job you should price in.',
        ],
      },
      {
        h: 'What about a PMS rather than a fund?',
        body: [
          'A discretionary PMS is not a fund. You hold shares directly, in your own account, pooled with nobody. On that basis the offshore fund rules should not apply and your gains should be capital gains.',
          'Two honest caveats. HMRC has published no guidance on managed accounts, so this is a well-supported reading rather than settled law. And every trade your manager makes becomes your own UK disposal, which is a real administrative burden. Ask whether they will give you UK-basis reporting.',
        ],
      },
    ],
    related: [
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'GIFT City explained', href: '/gift-city' },
    ],
    sources: [
      { label: 'HMRC — Offshore funds: list of reporting funds', url: 'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds' },
      { label: 'HMRC IFM13412 — offshore income gains', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13412' },
      { label: 'HMRC IFM12220 — definition of an offshore fund', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12220' },
    ],
    reviewed: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'form-10f-for-nri',
    question: 'Form 10F for NRIs: what it is, and what changed',
    answer:
      'Form 10F is now Form 41. India replaced its entire income tax law on 1 April 2026 and renumbered the forms. You still need it, along with a tax residency certificate, to claim treaty relief. It must be filed online. You do not need a digital signature.',
    metaTitle: 'Form 10F for NRIs — now Form 41. How to file it without a PAN',
    metaDescription:
      'Form 10F became Form 41 when India replaced its income tax law on 1 April 2026. What it is for, why you also need a tax residency certificate, and how a non-resident without a PAN files it online.',
    sections: [
      {
        h: 'What is the form for?',
        body: [
          'If a tax treaty gives you a lower rate on Indian income, you cannot just claim it. India asks for proof first.',
          'Two documents. A tax residency certificate from your own country\'s tax authority. And an Indian information form giving your status, tax number, address abroad, and the period the certificate covers.',
          'Without both, tax is deducted at the ordinary Indian rate and you are left claiming a refund later.',
        ],
      },
      {
        h: 'What changed on 1 April 2026?',
        body: [
          'India repealed the Income-tax Act, 1961 and replaced it with the Income-tax Act, 2025. Everything was renumbered.',
          'For this purpose, the practical change is the form number.',
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
          'No, and this is the part that stops people.',
          'If you do not hold a PAN and are not required to, you register on the Indian e-filing portal under a separate non-resident category. You are given an NR ID instead of a PAN, and you file the form under that login.',
        ],
      },
      {
        h: 'Do I need an Indian digital signature?',
        body: [
          'No. This is the most common reason people give up and simply accept the higher withholding.',
          'If you file under the non-resident login, you verify with a one-time password sent to your email and mobile. A digital signature certificate applies only to PAN holders who choose that route.',
        ],
      },
      {
        h: 'Can I still file it on paper?',
        body: [
          'No. A concession let non-residents without a PAN file on paper, but it expired on 30 September 2023 and was never reopened. Filing is online only.',
        ],
      },
      {
        h: 'What if I skip it?',
        body: [
          'Tax gets deducted at the ordinary rate rather than the treaty rate. You are not out of pocket forever, because you can file an Indian return and claim the difference back. But you have handed over money for a year, and created work you did not need.',
        ],
      },
    ],
    related: [
      { label: 'How a UAE resident gets a TRC', href: '/learn/tax-residency-certificate-uae' },
      { label: 'NRIs in the UAE', href: '/nri/uae' },
      { label: 'Tax schedule, resident and NRI', href: '/tax' },
    ],
    sources: [ITA_2025],
    reviewed: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'tax-residency-certificate-uae',
    question: 'How does a UAE resident get a TRC for Indian treaty relief?',
    answer:
      'You apply to the UAE Federal Tax Authority through the EmaraTax portal. For the India treaty specifically, you must have been physically in the UAE for at least 183 days in the calendar year. The UAE\'s easier 90-day domestic test does not satisfy what the India treaty asks for.',
    metaTitle: 'Tax residency certificate UAE — the 183-day rule India actually applies',
    metaDescription:
      'How UAE residents get a tax residency certificate for India treaty relief: the EmaraTax process, fees and timelines, and why the treaty\'s own 183-day calendar-year test is stricter than UAE domestic rules.',
    sections: [
      {
        h: 'Why do you need one?',
        body: [
          'India will not give you treaty relief without a certificate from the government of the country you say you are resident in. No certificate, no relief.',
          'You also need to file an Indian information form alongside it.',
        ],
      },
      {
        h: 'What are the UAE\'s own residency tests?',
        body: [
          'UAE law gives you three ways to be tax resident. Any one is enough for UAE purposes.',
        ],
        points: [
          'Your usual home and your centre of financial and personal interests are in the UAE',
          'You were physically present for <b>183 days or more</b> in any 12 consecutive months',
          'You were present for <b>90 days or more</b> in 12 months, and you hold a UAE or GCC nationality or a valid residence permit, and you have a permanent home or a job or business here',
        ],
      },
      {
        h: 'So why does India ask for 183 days?',
        body: [
          'Because the India treaty writes its own test, and it is stricter than UAE domestic law.',
          'The treaty defines a UAE-resident individual as someone present in the UAE for at least <b>183 days in the calendar year</b> concerned.',
          'Note the two traps. It is a <b>calendar</b> year, not a rolling twelve months and not India\'s April-to-March year. And the 90-day route that makes you UAE-resident at home does not, on its own, meet what the treaty asks.',
          'So you can be comfortably UAE resident and still fail India\'s test. Count on a calendar year and keep the evidence.',
        ],
      },
      {
        h: 'How do you apply?',
        body: [
          'Through EmaraTax, the Federal Tax Authority\'s portal. Ask for the certificate for a double tax agreement, not the general-purpose one.',
        ],
        points: [
          'Submission fee AED 50, plus an issuance fee that depends on whether you are registered for corporate tax',
          'Typically 5 to 10 business days',
          'It cannot be issued for a future period, and cannot cover more than 12 months',
          'For an individual, the period runs on the Gregorian calendar year, which lines up neatly with the treaty test',
        ],
      },
      {
        h: 'What else does India need?',
        body: [
          'The Indian information form, which used to be Form 10F and is now Form 41 after India replaced its income tax law on 1 April 2026.',
          'It is filed online. If you have no PAN, you register under a separate non-resident category and verify by one-time password. You do not need an Indian digital signature.',
        ],
      },
      {
        h: 'The mistakes that cost people money',
        body: [],
        points: [
          'Getting the certificate on the 90-day route and assuming India will accept it',
          'Counting days on the Indian tax year instead of the calendar year',
          'Applying after the year has closed for a period you cannot evidence',
          'Skipping the Indian form because someone said you need a digital signature. You do not.',
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
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pms-minimum-investment',
    question: 'What is the minimum investment in PMS?',
    answer:
      '₹50 lakh. SEBI sets it, and a portfolio manager cannot accept less than that from a client. Accredited investors are exempt. The minimum applies per portfolio manager, so splitting money across two houses means meeting ₹50 lakh with each of them.',
    metaTitle: 'PMS minimum investment in India — ₹50 lakh, and the exemptions',
    metaDescription:
      'The minimum investment in PMS is ₹50 lakh, set by SEBI. Whether it applies per manager or in total, who is exempt, how top-ups are treated, and how it compares with AIF, SIF and GIFT City minimums.',
    sections: [
      {
        h: 'What exactly is the rule?',
        body: [
          'A portfolio manager shall not accept from a client funds or securities worth less than fifty lakh rupees. That is the wording, and it binds the manager rather than you.',
          'It applies to new clients, and to fresh money from existing ones.',
        ],
      },
      {
        h: 'Is it per PMS or across all of them?',
        body: [
          'Per portfolio manager.',
          'The rule limits what one manager may accept. So if you want two houses running different strategies, you need ₹50 lakh with each. ₹50 lakh split across two does not work.',
        ],
      },
      {
        h: 'Who is exempt?',
        body: ['Three carve-outs exist.'],
        points: [
          '<b>Accredited investors.</b> The minimum does not apply at all.',
          '<b>Co-investment portfolio managers.</b> A separate category with its own rules.',
          '<b>Pre-2020 investments</b> made before the current regulations came in are grandfathered.',
        ],
      },
      {
        h: 'Can I add smaller amounts later?',
        body: [
          'Not below the floor. The restriction covers fresh funds from existing clients too, so a top-up is subject to the same rule.',
          'In practice, houses handle this differently within the rules. Ask before you assume you can add ₹10 lakh next year.',
        ],
      },
      {
        h: 'How does it compare with the others?',
        body: ['The minimum is one of the fastest ways to see where a structure sits.'],
        points: [
          '<b>PMS:</b> ₹50 lakh',
          '<b>AIF:</b> ₹1 crore, and usually a commitment drawn down over years rather than a single cheque',
          '<b>SIF:</b> ₹10 lakh, measured across all strategies of that fund at PAN level',
          '<b>GIFT City restricted scheme:</b> from US $150,000',
          '<b>Mutual fund:</b> a few hundred rupees',
        ],
      },
      {
        h: 'Why ₹50 lakh?',
        body: [
          'It is a judgement about who should be here. A PMS runs a concentrated portfolio, which falls harder than an index and stays down longer. The floor is the regulator saying this suits people who can lose a meaningful sum without it changing their life.',
          'If the minimum feels like a stretch, that is useful information rather than an obstacle to work around.',
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
  },
]

export const answerBySlug = (slug: string): Answer | undefined =>
  ANSWERS.find((a) => a.slug === slug)

export const ANSWER_SLUGS = ANSWERS.map((a) => a.slug)
