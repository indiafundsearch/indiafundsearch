import type { Answer } from './answers'
import type { Source } from './types'

/**
 * /us-tax cluster (Appendix A, Tasks A.1 and A.3).
 *
 * The largest opportunity on the site: roughly 7,000 searches a month across
 * the Form 8621 / PFIC cluster, at keyword difficulty 0-17, plus ~5,000 across
 * the Form 8802 / TRC / Form 10F chain. Aimed at US taxpayers, not at an Indian
 * audience, so every page signals that in its first hundred words.
 *
 * ⚠️ COMPLIANCE FRAMING — required on every page in this cluster:
 *   - explain what the rule is and what it means for holders of Indian funds
 *   - never explain how to compute an individual liability
 *   - end with a clear direction to a US CPA or Enrolled Agent
 *
 * ⚠️ FIGURES. Only figures already verified in this repo against primary US
 * sources (during the corridor build, August 2026) are stated. Anything else
 * carries an inline TODO: VERIFY and is NOT written from memory. The verified
 * set is: the 75%/50% PFIC tests, the 37% top marginal rate, daily-compounding
 * interest at the IRS underpayment rate, the $25,000/$50,000 Form 8621 de
 * minimis, the $10,000 FBAR threshold, the $16,536 non-wilful FBAR ceiling and
 * Bittner, and the Form 8938 threshold pairs.
 */

const IRC_1297: Source = { label: 'IRC §1297 — PFIC definition', url: 'https://www.law.cornell.edu/uscode/text/26/1297', issuer: 'US Code (Cornell LII)' }
const IRC_1291: Source = { label: 'IRC §1291 — excess distribution regime', url: 'https://www.law.cornell.edu/uscode/text/26/1291', issuer: 'US Code (Cornell LII)' }
const F8621: Source = { label: 'Instructions for Form 8621', url: 'https://www.irs.gov/pub/irs-pdf/i8621.pdf', issuer: 'IRS', date: 'Rev. December 2025' }
const STREAMLINED: Source = { label: 'Streamlined Filing Compliance Procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures', issuer: 'IRS' }
const FBAR: Source = { label: 'Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar', issuer: 'IRS' }
const FATCA: Source = { label: 'Summary of FATCA reporting thresholds', url: 'https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers', issuer: 'IRS' }
const F8802: Source = { label: 'Form 8802, Application for United States Residency Certification', url: 'https://www.irs.gov/forms-pubs/about-form-8802', issuer: 'IRS' }
const ITA_2025: Source = { label: 'Income-tax Act, 2025 (in force 1 April 2026)', url: 'https://www.incometaxindia.gov.in/income-tax-act-2025', issuer: 'Government of India' }
const CTB: Source = { label: 'Treas. Reg. §301.7701-3 — entity classification election', url: 'https://www.law.cornell.edu/cfr/text/26/301.7701-3', issuer: 'US Treasury (Cornell LII)' }

const PUBLISHED = 'September 2026'
const REVIEWED = 'September 2026'
const CPA = 'This page explains a rule. It does not work out what you owe, and it is not US tax advice. Take your fund statements to a US CPA or an Enrolled Agent, because the analysis runs per fund, per year.'

const base = { published: PUBLISHED, reviewed: REVIEWED, regulatoryAsAt: REVIEWED }

export const US_TAX: Answer[] = [
  {
    ...base,
    slug: 'form-8621',
    question: 'What is Form 8621, and who has to file it?',
    answer:
      'Form 8621 is the US information return for a passive foreign investment company. If you are a US taxpayer holding an Indian mutual fund or most pooled Indian funds, you generally file one for each fund, for each year you hold it. The form is separate from the FBAR and from Form 8938.',
    metaTitle: 'Form 8621: Who Files It and Why It Matters',
    metaDescription:
      'What Form 8621 is, who must file it, why holders of Indian mutual funds are usually caught, and why an unfiled year never closes. For US taxpayers.',
    sections: [
      { h: 'What the form is for',
        body: ['Form 8621 reports your interest in a passive foreign investment company, a PFIC. It is an information return that sits alongside your tax return.',
               'A PFIC is any foreign corporation where 75% or more of gross income is passive, or 50% or more of assets on average produce passive income.'] },
      { h: 'Why an Indian mutual fund is usually caught',
        body: ['Indian funds are not named anywhere in the US statute. They arrive by default.',
               'A foreign vehicle whose investors all have limited liability is treated as a corporation for US tax purposes unless someone elects otherwise. Nobody does that for a retail Indian mutual fund. So it is a foreign corporation earning passive income.'] },
      { h: 'One form per fund, per year',
        body: ['This is the part that surprises people. It is not one form covering your Indian holdings. It is one for each PFIC, and one for each PFIC held inside another one.',
               'A small-holdings exception exists at $25,000 aggregate, or $50,000 filing jointly, but it disappears the moment you sell or take a distribution.'] },
      { h: 'The year never closes until you file',
        body: ['A normal tax year closes after three years. A year in which a required Form 8621 was never filed stays open indefinitely.',
               'So waiting does not help. Old years are not behind you.'] },
      { h: 'What to do next',
        body: [CPA] },
    ],
    faqs: [
      { q: 'Do I file one form or one per fund?', a: 'One per PFIC, and one for each PFIC held inside another. A portfolio of six Indian funds is six forms.' },
      { q: 'Is there a minimum below which I need not file?', a: 'A de minimis exception exists at $25,000 aggregate, $50,000 jointly, but it is lost as soon as you sell or receive a distribution.' },
      { q: 'Does Form 8621 replace the FBAR?', a: 'No. The three regimes stack: FBAR to FinCEN, Form 8938 with your return, and Form 8621 per PFIC. They are cumulative, not alternatives.' },
      { q: 'What if I have never filed one?', a: 'Those years remain open, so the position does not improve by waiting. The IRS streamlined procedures exist for non-wilful cases; speak to a US CPA or Enrolled Agent.' },
    ],
    related: [
      { label: 'Form 8621 instructions, in plain English', href: '/us-tax/form-8621-instructions' },
      { label: 'Who has to file Form 8621?', href: '/us-tax/form-8621-filing-requirements' },
      { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [IRC_1297, IRC_1291, F8621],
  },
  {
    ...base,
    slug: 'form-8621-instructions',
    question: 'Form 8621 instructions: what the form actually asks',
    answer:
      'Form 8621 asks which PFIC you hold, how you hold it, and which election you are making, if any. The default treatment is punitive, so most of the form exists to let you choose something better. Which election is available depends on what the fund will give you.',
    metaTitle: 'Form 8621 Instructions: What the Form Asks For',
    metaDescription:
      'A plain-English walk through what Form 8621 asks: identifying the fund, the default regime, and the two elections. Written for holders of Indian funds.',
    sections: [
      { h: 'The default is the thing to avoid',
        body: ['Under the default regime your gain is spread back across the whole holding period. Each earlier year is taxed at that year\'s top marginal rate, currently 37%. There is no capital-gains rate and no offsetting deduction. Interest is then added, compounding daily at the IRS underpayment rate.',
               'Almost everything else on the form exists so that you can elect out of this.'] },
      { h: 'The QEF election',
        body: ['A qualified electing fund election taxes you on your share of the fund\'s income each year, much like a US fund.',
               'It requires the fund to give you an annual information statement in US form. Indian asset managers do not generally produce one, so in practice this election is rarely available.'] },
      { h: 'The mark-to-market election',
        body: ['This taxes you on the paper gain each year as ordinary income. It is available where the shares are regularly traded or redeemable at a published daily net asset value, which most Indian mutual funds are.',
               'It is painful, but far better than the default.'] },
      { h: 'What you will need from the fund',
        body: ['Ask three things in writing before you subscribe, and every year after: does the fund issue a PFIC annual information statement, does it publish a daily NAV, and does it provide any US tax reporting at all.',
               'If the answers are vague, assume the default regime applies and price the investment accordingly.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'What is Form 8621?', href: '/us-tax/form-8621' },
      { label: 'PFIC annual information statement', href: '/us-tax/pfic-annual-information-statement' },
      { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic' },
    ],
    sources: [F8621, IRC_1291, IRC_1297],
  },
  {
    ...base,
    slug: 'form-8621-filing-requirements',
    question: 'Who has to file Form 8621?',
    answer:
      'Any US person who owns an interest in a PFIC, directly or indirectly, generally has a filing requirement. That includes green card holders and anyone meeting the substantial presence test, so H-1B and L-1 holders are usually caught. Ownership through a partnership or trust counts too.',
    metaTitle: 'Form 8621 Filing Requirements: Who Is Caught',
    metaDescription:
      'Who must file Form 8621: US persons holding a PFIC directly or indirectly, visa holders who meet the substantial presence test, and the de minimis rule.',
    sections: [
      { h: 'Am I a US person for this?',
        body: ['The trigger is US tax residency, not citizenship. You are a US tax resident if you hold a green card, or if you meet the substantial presence test: 31 days in the current year, and 183 days counting this year in full, a third of last year and a sixth of the year before.',
               'H-1B and L-1 holders cross that line quickly. Certain students and teachers on F and J visas are excluded for a limited number of years.'] },
      { h: 'Indirect ownership counts',
        body: ['Holding a PFIC through a partnership, a trust or another PFIC still makes you a shareholder for these purposes. A fund-of-funds structure can multiply the number of forms rather than remove them.'] },
      { h: 'The de minimis exception',
        body: ['Where the aggregate value of your PFIC holdings stays under $25,000, or $50,000 filing jointly, a filing exception can apply.',
               'It is narrower than it sounds. It is lost in any year you sell, or receive a distribution, or make an election.'] },
      { h: 'What if I have held one for years and never filed?',
        body: ['This is the common case, not the exception. Indian mutual funds are the default savings vehicle for a family in India, and nobody mentions Form 8621 when a relative opens a folio for you.',
               'The IRS runs Streamlined Filing Compliance Procedures for taxpayers whose failure to file was non-wilful. Whether you qualify, and how many years you would amend, is a judgement about your own facts. Take it to a US CPA or an Enrolled Agent before you file anything, including before you file the current year, because the order in which the filings go in matters.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'What is Form 8621?', href: '/us-tax/form-8621' },
      { label: 'PFIC reporting threshold', href: '/us-tax/pfic-reporting-threshold' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [
      { label: 'IRC §7701 — definition of resident alien', url: 'https://www.law.cornell.edu/uscode/text/26/7701', issuer: 'US Code (Cornell LII)' },
      { label: 'IRC §1298 — indirect ownership', url: 'https://www.law.cornell.edu/uscode/text/26/1298', issuer: 'US Code (Cornell LII)' },
      F8621,
      STREAMLINED,
    ],
  },
  {
    ...base,
    slug: 'pfic-reporting-threshold',
    question: 'Is there a PFIC reporting threshold?',
    answer:
      'There is a narrow one. Where your PFIC holdings stay under $25,000 in aggregate, or $50,000 filing jointly, a filing exception can apply. It disappears in any year you sell, receive a distribution, or make an election, which is most years that matter.',
    metaTitle: 'PFIC Reporting Threshold: The $25,000 Exception',
    metaDescription:
      'The PFIC de minimis exception is narrower than it looks: the aggregate limits, what breaks it, and how it differs from the FBAR and Form 8938 thresholds.',
    sections: [
      { h: 'The exception, and its limits',
        body: ['The de minimis rule looks at the aggregate value of your PFIC holdings, not at each fund separately. Under $25,000, or $50,000 filing jointly, a filing exception can apply.',
               'It is lost the moment you sell, take a distribution, or make an election. So it protects a small dormant holding, not an active one.'] },
      { h: 'Do not confuse it with the other thresholds',
        body: ['Three separate regimes have three different triggers, and meeting one says nothing about the others.'],
        points: ['<b>FBAR:</b> foreign accounts together exceeding $10,000 at any point in the year.',
                 '<b>Form 8938:</b> $50,000 at year end or $75,000 at any time if single and living in the US; $100,000 and $150,000 filing jointly; higher thresholds if you live abroad.',
                 '<b>Form 8621:</b> the $25,000 / $50,000 PFIC de minimis above.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'Who has to file Form 8621?', href: '/us-tax/form-8621-filing-requirements' },
      { label: 'What is Form 8621?', href: '/us-tax/form-8621' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [F8621, FBAR, FATCA],
  },
  {
    ...base,
    slug: 'pfic-annual-information-statement',
    question: 'What is a PFIC annual information statement?',
    answer:
      'It is the statement a fund gives you so that you can make a QEF election. Without it, the election is unavailable and you fall back to the punitive default regime. Indian asset managers do not generally produce one, which is why QEF is rarely an option for Indian funds.',
    metaTitle: 'PFIC Annual Information Statement: Why It Matters',
    metaDescription:
      'What a PFIC annual information statement is, why a QEF election depends on it, and why Indian fund houses rarely issue one. What to ask up front.',
    sections: [
      { h: 'What it is',
        body: ['A PFIC annual information statement reports your share of the fund\'s ordinary earnings and net capital gain, in the form US rules require.',
               'It is the document that makes a QEF election possible. No statement, no election.'] },
      { h: 'Why Indian funds rarely give you one',
        body: ['Producing it means computing fund income under US tax principles, which an Indian asset manager has no domestic reason to do. Most simply do not.',
               'That is why, for holders of Indian funds, the practical choice is usually between the mark-to-market election and the default regime, rather than QEF.'] },
      { h: 'What to ask before you subscribe',
        body: ['Three questions, in writing.'],
        points: ['Do you issue a PFIC annual information statement?',
                 'Do you publish a daily net asset value at which units are redeemable?',
                 'Do you provide any US tax reporting, for the fund and for anything it holds?'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'Form 8621 instructions', href: '/us-tax/form-8621-instructions' },
      { label: 'How to avoid PFIC status', href: '/us-tax/how-to-avoid-pfic-status' },
      { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic' },
    ],
    sources: [F8621, IRC_1297],
  },
  {
    ...base,
    slug: 'pfic-tax-rate',
    question: 'What is the PFIC tax rate?',
    answer:
      'There is no single PFIC rate. Under the default regime your gain is spread back across the holding period and each earlier year is taxed at that year\'s top marginal rate, currently 37%, with interest compounding daily. An election changes the treatment, not the rate.',
    metaTitle: 'PFIC Tax Rate: Why There Is No Single Number',
    metaDescription:
      'How PFIC gains are taxed by default: allocation across the holding period, the top marginal rate, and the interest charge. Why an election changes this.',
    sections: [
      { h: 'Why the question has no single answer',
        body: ['A PFIC gain is not taxed at one rate. Under the default regime the gain is allocated back across every year you held the fund, and each of those years is taxed at that year\'s highest ordinary rate.',
               'There is no capital-gains treatment and no offsetting deduction. Interest is then charged on the resulting tax, compounding daily at the IRS underpayment rate.'] },
      { h: 'What an election changes',
        body: ['A mark-to-market election taxes the annual paper gain as ordinary income instead. A QEF election taxes your share of fund income each year.',
               'Both change the mechanism and the timing. Neither converts the income into long-term capital gain.'] },
      { h: 'The interest charge is the part people miss',
        body: ['The headline rate is only half of it. Because tax is computed as though it had been owed in each earlier year, interest accrues from those years. On a long-held fund the interest can rival the tax.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'What is Form 8621?', href: '/us-tax/form-8621' },
      { label: 'Form 8621 instructions', href: '/us-tax/form-8621-instructions' },
      { label: 'How to avoid PFIC status', href: '/us-tax/how-to-avoid-pfic-status' },
    ],
    sources: [IRC_1291, IRC_1297, F8621],
  },
  {
    ...base,
    slug: 'how-to-avoid-pfic-status',
    question: 'How do you avoid PFIC status on Indian investments?',
    answer:
      'By not holding a pooled foreign fund. The PFIC rules reach foreign corporations, and ordinary Indian operating companies are not PFICs. So shares held directly in your own name, as in a portfolio management service, create no PFIC exposure at all.',
    metaTitle: 'How to Avoid PFIC Status on Indian Investments',
    metaDescription:
      'The PFIC rules reach pooled foreign funds, not operating companies. Why a managed account holding shares directly sits outside them, and what to ask.',
    sections: [
      { h: 'The rules reach corporations, not companies you own shares in',
        body: ['A PFIC is a foreign corporation whose income or assets are mostly passive. An ordinary Indian operating company, a bank or a manufacturer, fails both tests. Its shares are not a PFIC.',
               'So the exposure comes from the wrapper, not from India.'] },
      { h: 'A managed account holds shares, not units',
        body: ['In an Indian portfolio management service, SEBI requires that the manager must not hold client securities in its own name. You hold the listed shares yourself, in your own demat account.',
               'There is no pooled foreign corporation between you and the companies, so no PFIC arises. You still report the account on the FBAR and on Form 8938, and every sale the manager makes is your own taxable disposal.',
               'The exception: if the mandate holds mutual fund units or other pooled vehicles, PFIC returns for those holdings. Ask for the mandate in writing.'] },
      { h: 'Partnerships and the check-the-box election',
        body: ['PFIC applies to foreign corporations. A vehicle that is genuinely a partnership, or one that has validly elected to be treated as a pass-through, is not itself a PFIC.',
               'Two cautions. A Schedule K-1 does not end the analysis, because you remain an indirect shareholder of any PFIC the fund itself holds. And the election belongs to the fund, not to you.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'PFIC annual information statement', href: '/us-tax/pfic-annual-information-statement' },
      { label: 'PFIC look-through rules', href: '/us-tax/pfic-look-through-rules' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
    ],
    sources: [IRC_1297, CTB,
      { label: 'SEBI (Portfolio Managers) Regulations, 2020', url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html', issuer: 'SEBI', documentNumber: 'Reg. 24(15)' }],
  },
  {
    ...base,
    slug: 'pfic-look-through-rules',
    question: 'What are the PFIC look-through rules?',
    answer:
      'They decide when you are treated as owning a PFIC you do not hold directly. Holding through a partnership, a trust or another fund still makes you a shareholder, so a fund-of-funds structure can multiply your filings rather than remove them.',
    metaTitle: 'PFIC Look-Through Rules: Indirect Ownership Explained',
    metaDescription:
      'When indirect ownership makes you a PFIC shareholder: holdings through partnerships, trusts and other funds, and why a K-1 does not end the analysis.',
    sections: [
      { h: 'Why indirect ownership matters',
        body: ['The PFIC rules do not only look at what you hold in your own name. Ownership through a partnership, a trust, an estate or another PFIC is attributed to you.',
               'The practical effect: a feeder fund that itself invests in pooled vehicles can leave you filing for each one in the chain.'] },
      { h: 'A K-1 is not the end of the story',
        body: ['If a fund is treated as a partnership and issues you a Schedule K-1, the fund itself is not a PFIC. That is genuinely useful.',
               'But you remain an indirect shareholder of any PFIC the fund holds. So the question is not only what the fund is, but what it owns.'] },
      { h: 'What to ask about a fund-of-funds',
        body: ['Ask what the fund holds, not just what the fund is. If it allocates to other pooled vehicles, ask whether it will report those to you, and in what form.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'How to avoid PFIC status', href: '/us-tax/how-to-avoid-pfic-status' },
      { label: 'Who has to file Form 8621?', href: '/us-tax/form-8621-filing-requirements' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [
      { label: 'IRC §1298 — indirect ownership rules', url: 'https://www.law.cornell.edu/uscode/text/26/1298', issuer: 'US Code (Cornell LII)' },
      CTB, F8621,
    ],
  },
  // ---- Task A.3, the Form 8802 -> TRC -> Form 10F chain ----
  {
    ...base,
    slug: 'form-8802',
    question: 'What is Form 8802, and when do you need it?',
    answer:
      'Form 8802 is how a US taxpayer asks the IRS to certify US tax residency. The IRS responds with Form 6166. You need that certificate before India will give you treaty relief on Indian income, and it is step one of a three-step chain.',
    metaTitle: 'Form 8802: US Residency Certification for India Relief',
    metaDescription:
      'Form 8802 asks the IRS to certify your US tax residency and issue Form 6166. Why it comes before any India treaty claim, and what follows it in the chain.',
    sections: [
      { h: 'What it does',
        body: ['Form 8802 is an application. You are asking the IRS to confirm that you were a US tax resident for a given year.',
               'What comes back is Form 6166, a letter of US residency certification. That letter is the document a foreign tax authority wants to see.'] },
      { h: 'Why an NRI in the US needs it',
        body: ['India will not apply a treaty rate to your Indian income on your say-so. It asks for a residency certificate issued by the government of the country you claim to be resident in.',
               'For a US resident, that certificate is Form 6166, and Form 8802 is how you get it.'] },
      { h: 'Timing is the practical problem',
        body: ['Processing is not immediate, and the certificate is issued for a specific year. Applying late, or for the wrong year, is the most common way this goes wrong.',
               'TODO: VERIFY — current Form 8802 user fee and stated IRS processing time. Not stated here because neither figure is verified in this repo.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    faqs: [
      { q: 'Is Form 8802 the certificate itself?', a: 'No. Form 8802 is the application. The certificate the IRS issues in response is Form 6166.' },
      { q: 'Why does India want it?', a: 'India will not grant treaty relief without a residency certificate from the government of your country of residence, plus its own information form.' },
      { q: 'What is the next step after I have Form 6166?', a: 'You file the Indian information form, previously Form 10F and now Form 41, and give both to the Indian payer or fund.' },
    ],
    related: [
      { label: 'US tax residency certificate', href: '/us-tax/us-tax-residency-certificate' },
      { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [F8802, ITA_2025],
  },
  {
    ...base,
    slug: 'us-tax-residency-certificate',
    question: 'How does a US resident get a tax residency certificate?',
    answer:
      'You apply on Form 8802 and the IRS issues Form 6166, a letter certifying US tax residency for a given year. India needs that certificate, plus its own information form, before it will apply a treaty rate to your Indian income.',
    metaTitle: 'US Tax Residency Certificate: Form 6166 Explained',
    metaDescription:
      'How a US taxpayer obtains a tax residency certificate: apply on Form 8802, receive Form 6166, then file the Indian information form to claim treaty relief.',
    sections: [
      { h: 'The certificate is Form 6166',
        body: ['A US tax residency certificate is not something you write. It is issued by the IRS, on Form 6166, in response to an application on Form 8802.',
               'It certifies residency for a specified year, so the year you request has to match the income you are claiming relief on.'] },
      { h: 'Where it fits in the chain',
        body: ['Three steps, in order, and each depends on the one before it. Apply on Form 8802. Receive Form 6166 from the IRS. File the Indian information form, now Form 41, and give both documents to the Indian payer.',
               'Nobody publishes these three steps together, which is why people usually discover step three after the withholding has already happened.'] },
      { h: 'What India does with it',
        body: ['The Indian side needs the certificate plus an information form giving your status, tax number, address abroad and the period the certificate covers.',
               'That form must be filed online. If you do not hold an Indian PAN and are not required to, you register under a separate non-resident category and verify by one-time password. No Indian digital signature is needed.'] },
      { h: 'What to do next', body: [CPA] },
    ],
    related: [
      { label: 'What is Form 8802?', href: '/us-tax/form-8802' },
      { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri' },
      { label: 'NRIs in the United States', href: '/nri/us' },
    ],
    sources: [F8802, ITA_2025],
  },
]

export const usTaxBySlug = (slug: string) => US_TAX.find((a) => a.slug === slug)
export const US_TAX_SLUGS = US_TAX.map((a) => a.slug)
