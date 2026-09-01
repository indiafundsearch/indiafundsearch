import type { Corridor } from './types'

/**
 * NRI corridor landing pages — /nri/us, /nri/uae, /nri/uk.
 *
 * EDITORIAL RULES FOR THIS FILE. Read before changing a word.
 *
 * 1. FOREIGN law (US / UK / UAE) is cited to the primary source that publishes
 *    it — irs.gov, law.cornell.edu, gov.uk, tax.gov.ae — never to a secondary
 *    summary. Every figure carries the date it was verified against.
 *
 * 2. INDIAN tax law is described FUNCTIONALLY, with NO section numbers. The
 *    Income-tax Act, 1961 was repealed with effect from 1 April 2026 and
 *    replaced by the Income-tax Act, 2025; section numbering changed wholesale
 *    (Form 10F became Form 41, s.90 became s.159, and all TDS consolidated into
 *    one section). Every competitor page still quotes 1961-Act numbers. We
 *    quote none, so we cannot go stale, and we say why.
 *
 * 3. Indian REGULATORY facts (SEBI / IFSCA / RBI minimums and eligibility) are
 *    verified against the regulators' own consolidated PDFs and may be cited.
 *
 * 4. Anything contested is published AS contested. Where the only authority is
 *    Tribunal-level, we say Tribunal-level. We do not launder a judgement call
 *    into a statement of law — on a YMYL page that is the dangerous kind of
 *    wrong, and being the page that says "this is unsettled" is the whole moat.
 *
 * Verified 1 August 2026.
 */

const REVIEWED = 'August 2026'

/** Shared across corridors — the access rules are Indian-side and identical. */
const INDIAN_MINIMUMS: Corridor['sources'] = [
  {
    label: 'SEBI (Portfolio Managers) Regulations, 2020 — minimum ₹50 lakh',
    url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html',
  },
  {
    label: 'SEBI (Alternative Investment Funds) Regulations, 2012 — minimum ₹1 crore, investors may be "Indian, foreign or non-resident Indians"',
    url: 'https://www.sebi.gov.in/legal/regulations/jul-2026/securities-and-exchange-board-of-india-alternative-investment-funds-regulations-2012-last-amended-on-july-14-2026-_102975.html',
  },
  {
    label: 'IFSCA (Fund Management) Regulations, 2025 — GIFT City scheme minimums and eligible investors',
    url: 'https://ifsca.gov.in/Pages/Contents/Fund_Management',
  },
  {
    label: 'RBI Master Direction — Foreign Investment in India (FEMA non-debt instruments)',
    url: 'https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=11200',
  },
]

export const CORRIDORS: Corridor[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'us',
    code: 'US',
    flag: '🇺🇸',
    country: 'the United States',
    label: 'United States',
    hreflang: 'en-US',
    title: 'Investing in Indian alternatives from the United States',
    hook: 'The fund your cousin in Pune swears by can be a tax trap for you, and one that never closes.',
    capsule:
      'US-resident NRIs can legally invest in Indian PMS, AIFs and GIFT City funds. Indian law does not stop you. American law is the problem. Pooled Indian funds are usually treated as PFICs, taxed at the top marginal rate with an interest charge and a separate form for every fund, every year. A PMS holding shares directly avoids all of it.',
    lede:
      'Most pages written for US-based NRIs start at the wrong end. They list Indian products, then add a line at the bottom about checking with your CPA. That order is backwards. If you file in America, it is the American tax code that decides what is sensible for you to own. So we start there.',
    facts: [
      ['Who this catches', 'US tax residents — green card or substantial presence'],
      ['Indian-side restriction', 'None — SEBI and IFSCA impose no residency bar'],
      ['Real restriction', 'US securities law and the PFIC regime'],
      ['Treaty relief on gains', 'None — the treaty leaves gains to domestic law'],
      ['Structure that avoids PFIC', 'PMS holding operating-company shares'],
    ],
    table: {
      caption: 'How each Indian structure lands on a US tax return',
      head: ['Structure', 'Can you access it?', 'US tax character', 'US reporting'],
      rows: [
        [
          'PMS (listed Indian equities)',
          'No Indian bar; individual houses set their own policy',
          'You own the shares directly. Operating companies are not PFICs, so there is no PFIC exposure at all',
          'FBAR and Form 8938. No Form 8621 unless the mandate holds pooled units',
        ],
        [
          'AIF Category I / II',
          'Rarely offered to US persons',
          'Pooled and non-US, so a PFIC by default — unless the vehicle is genuinely a partnership',
          'Form 8621 for each PFIC in the chain, plus FBAR and Form 8938',
        ],
        [
          'AIF Category III',
          'Rarely offered to US persons',
          'Same PFIC analysis. India also taxes this category inside the fund',
          'As above',
        ],
        [
          'Indian mutual fund',
          'A minority of AMCs accept US persons, usually offline only',
          'PFIC. A mark-to-market election is often available because units redeem at daily NAV',
          'Form 8621 per fund',
        ],
        [
          'GIFT City fund',
          'Offered — this is the live shelf',
          'Depends entirely on how the vehicle is classified for US purposes. Ask the three questions below',
          'Form 8621, or a K-1, or foreign-trust forms — the difference is enormous',
        ],
      ],
      note: 'Access is a commercial decision by each house, not a legal prohibition. Indian regulation does not exclude you; US securities law makes selling to you expensive, so most houses decline.',
    },
    qas: [
      {
        q: 'Am I a "US person" for this? I am on an H-1B, not a citizen',
        a: [
          "Yes, almost certainly. The trigger is US tax residency. Not citizenship, not a green card.",
          "You are a US tax resident if you hold a green card. Or if you meet the substantial presence test: 31 days this year, and 183 days counting this year in full, a third of last year, and a sixth of the year before.",
          "H-1B and L-1 holders cross that line quickly. Once you do, the PFIC, FBAR and Form 8938 rules all apply to you. Some students and teachers on F and J visas are excluded for a few years.",
          "This catches people every year. It is the single most common reason a first Form 8621 arrives late.",
        ],
        sources: [
          { label: 'IRC §7701 — definition of resident alien', url: 'https://www.law.cornell.edu/uscode/text/26/7701' },
        ],
      },
      {
        q: 'What is a PFIC, and why does it matter so much?',
        a: [
          "A PFIC is a passive foreign investment company. Any foreign corporation where 75% or more of gross income is passive, or 50% or more of assets produce passive income.",
          "Indian funds are not named in the US statute. They get there by default. A foreign vehicle whose investors all have limited liability is treated as a corporation for US tax purposes unless someone elects otherwise. Nobody does. So it is a foreign corporation earning passive income.",
          "The cost is the point. Under the default regime your gain is spread back across the whole holding period. Each earlier year is taxed at that year's top marginal rate, 37% today. No capital-gains rate. No deductions. Then interest is added, compounding daily.",
          "You also file a separate Form 8621 for each PFIC, and for each PFIC held inside another one.",
          "And the clock never starts. A normal return closes after three years. A year with an unfiled PFIC form stays open indefinitely.",
        ],
        sources: [
          { label: 'IRC §1297 — PFIC definition', url: 'https://www.law.cornell.edu/uscode/text/26/1297' },
          { label: 'IRC §1291 — the default excess-distribution regime', url: 'https://www.law.cornell.edu/uscode/text/26/1291' },
          { label: 'IRC §6501(c)(8) — limitation period does not begin', url: 'https://www.law.cornell.edu/uscode/text/26/6501' },
          { label: 'Instructions for Form 8621 (Rev. December 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i8621.pdf' },
          { label: 'IRS quarterly interest rates', url: 'https://www.irs.gov/payments/quarterly-interest-rates' },
        ],
      },
      {
        q: 'Can a US-resident NRI invest in Indian PMS, and is it really PFIC-free?',
        a: [
          "Yes to the first, and largely yes to the second. This is the most useful thing on this page and almost nobody says it.",
          "Indian rules place no residency restriction on PMS clients. More importantly, SEBI requires that a portfolio manager must not hold client securities in its own name. So you hold listed Indian shares directly, in your own demat account. It is a managed account, not a fund.",
          "The PFIC rules reach foreign corporations. An ordinary Indian operating company, a bank or a manufacturer, fails both tests. So its shares are not a PFIC.",
          "That means a PMS invested in operating equities creates no PFIC exposure at all. You still report the account on the FBAR and Form 8938. Every sale the manager makes is still your own taxable disposal. But the punitive regime does not apply.",
          "One exception. If the mandate holds mutual fund units or other pooled vehicles, PFIC comes back for those holdings. Ask for the mandate in writing.",
        ],
        sources: [
          { label: 'SEBI (Portfolio Managers) Regulations, 2020 — Reg. 24(15), securities not held in the manager\'s name', url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html' },
        ],
      },
      {
        q: 'Does a GIFT City fund solve the PFIC problem?',
        a: [
          "Sometimes. And you cannot tell from the brochure.",
          "PFIC rules apply only to foreign corporations. A vehicle that is genuinely a partnership, or one that has validly filed IRS Form 8832 to be taxed as a pass-through, is not itself a PFIC. Helpfully, no Indian trust, LLP or private limited company sits on the IRS list of automatic corporations. Only \\'India, Public Limited Company\\' is listed.",
          "Three cautions matter more than that headline.",
          "First, a Schedule K-1 does not end the analysis. You stay an indirect PFIC shareholder for any PFIC the fund itself holds, so a fund-of-funds can multiply your filings rather than remove them.",
          "Second, if the vehicle is classified as a trust rather than a business entity, you land in the foreign non-grantor trust throwback rules. Those carry their own interest charge and their own forms, and are about as punitive as PFIC.",
          "Third, the election belongs to the fund, not to you. One investor cannot make a fund check the box.",
          "So ask three questions in writing before you subscribe. Have you filed Form 8832, and what did you elect? Will you issue me a K-1? Do you provide annual US tax reporting, for every underlying vehicle? If any answer is vague, price it as a PFIC.",
        ],
        sources: [
          { label: 'Treas. Reg. §301.7701-3 — entity classification election', url: 'https://www.law.cornell.edu/cfr/text/26/301.7701-3' },
          { label: 'Treas. Reg. §301.7701-2(b)(8) — per-se corporation list', url: 'https://www.law.cornell.edu/cfr/text/26/301.7701-2' },
          { label: 'IRC §1298(a)(3) — indirect ownership through a partnership or trust', url: 'https://www.law.cornell.edu/uscode/text/26/1298' },
        ],
      },
      {
        q: 'Do the India–US treaty and GIFT City exemptions reduce my US tax?',
        a: [
          "On capital gains, no. This is the most widely repeated error in NRI content.",
          "Article 13 of the India-US treaty says, in its entirety, that each country may tax capital gains under its own domestic law. No cap. No allocation. Relief comes afterwards, as a US foreign tax credit for Indian tax you actually paid.",
          "The dividend article is misreported too. Its 15% cap applies to a company owning at least 10% of the voting stock. As an individual you fall under the 25% limit, which is above what India withholds anyway. So it does nothing for you.",
          "That has a sharp consequence for GIFT City. India's IFSC exemptions are built for investors taxed nowhere else. If India exempts the income, there is no Indian tax for the US to credit. The whole burden lands on your US return.",
          "So for a US person, an Indian exemption can leave you worse off than an Indian-taxed structure.",
          "Add the 3.8% net investment income tax above $200,000 of modified AGI single, $250,000 joint. The foreign tax credit does not generally reach it.",
        ],
        sources: [
          { label: 'India–US tax treaty, full text (IRS)', url: 'https://www.irs.gov/pub/irs-trty/india.pdf' },
          { label: 'IRC §1411 — net investment income tax', url: 'https://www.law.cornell.edu/uscode/text/26/1411' },
        ],
      },
      {
        q: 'Why do so many Indian funds simply refuse US investors?',
        a: [
          "Two US statutes, not one.",
          "Taking your subscription pushes the offering outside the Regulation S safe harbour, because the rules count any natural person resident in the United States as a US person. More fundamentally, the Investment Company Act bars a foreign investment company from publicly offering securities into the United States without an SEC order that is essentially never granted.",
          "So when an AMC says it does not accept US persons, it is not applying Indian law and it is not judging you. It is avoiding US registration.",
          "That is also why the houses that do accept US persons often insist on offline paperwork and extra declarations.",
        ],
        sources: [
          { label: '17 CFR 230.902 — Regulation S definitions', url: 'https://www.law.cornell.edu/cfr/text/17/230.902' },
          { label: 'Investment Company Act §7(d)', url: 'https://www.law.cornell.edu/uscode/text/15/80a-7' },
        ],
      },
      {
        q: 'What do I have to report every year?',
        a: [
          "Three regimes stack on the same assets, filed to two different agencies, at different thresholds. They are cumulative, not alternatives.",
          "<b>FBAR</b> (FinCEN Form 114) is due once your foreign accounts together top $10,000 at any point in the year. That includes demat, PMS and brokerage accounts. Due 15 April, automatically extended to 15 October. The maximum non-wilful penalty is $16,536 per report, not per account, following the Supreme Court in Bittner.",
          "<b>Form 8938</b> goes with your tax return once specified foreign financial assets pass $50,000 at year end, or $75,000 at any point, if you are single and living in the US. It is $100,000 and $150,000 filing jointly, and much higher if you live abroad.",
          "<b>Form 8621</b> is separate again. One for each PFIC, and one for each PFIC held through another. A small-holdings exception exists at $25,000 aggregate, $50,000 jointly, but it disappears the moment you sell or take a distribution.",
        ],
        sources: [
          { label: 'IRS — Report of Foreign Bank and Financial Accounts (FBAR)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
          { label: 'IRS — Summary of FATCA reporting thresholds', url: 'https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers' },
          { label: 'Bittner v. United States (2023) — per-report, not per-account', url: 'https://www.law.cornell.edu/supremecourt/text/21-1195' },
        ],
      },
      {
        q: 'I have held Indian funds for years and never filed any of this. What now?',
        a: [
          "You are not unusual, and there is a defined route back.",
          "The IRS Streamlined Filing Compliance Procedures exist for taxpayers whose failure was not wilful. Living in the US, that means three years of amended returns, six years of FBARs, a non-wilfulness certification, and a 5% penalty on the highest aggregate value of the foreign assets across the covered period. Living abroad, the penalty version differs.",
          "Two things before you decide. The PFIC clock never started, so those years are still open however long ago they were. Waiting does not help.",
          "And the certification is made under penalty of perjury. This is a conversation with a US tax professional, not something to self-file off a blog post. Bring the fund statements. The analysis is per fund, per year.",
        ],
        sources: [
          { label: 'IRS — Streamlined Filing Compliance Procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures' },
        ],
      },
    ],
    mistakes: [
      {
        m: 'Assuming the India–US treaty caps your Indian dividend tax at 15%',
        why: 'The 15% rate is only for a company owning at least 10% of the voting stock. As an individual you are under the 25% limit, which changes nothing in practice.',
      },
      {
        m: 'Buying an Indian mutual fund because a relative in India did well out of it',
        why: 'The same fund produces a completely different outcome on a US return. Your cousin in Pune is not filing Form 8621.',
      },
      {
        m: 'Treating a Schedule K-1 as proof that PFIC does not apply',
        why: 'It removes the problem at the fund level only. You remain an indirect PFIC shareholder for anything pooled that the fund itself holds.',
      },
      {
        m: 'Reading the $60,000 US estate tax threshold as applying to you',
        why: 'That figure is for non-domiciliaries. If you have become US-domiciled — a question of intent, not of income-tax residency — the US taxes your worldwide estate including Indian assets, and there is no US–India estate tax treaty to fall back on.',
      },
      {
        m: 'Deferring the problem because "the old years are closed"',
        why: 'They are not. Where the required PFIC form was never filed, the assessment period never began to run.',
      },
    ],
    checklist: [
      'Confirm whether you are a US tax resident this year — check the substantial presence arithmetic, not your visa label.',
      'List every Indian pooled holding you already own. Each one is a separate PFIC analysis, per year.',
      'For anything you are considering, establish the structure first: managed account, partnership, corporation or trust.',
      'For a GIFT City fund, get the Form 8832 position, the K-1 answer and the US reporting commitment in writing before subscribing.',
      'If you are already behind on filings, speak to a US tax professional about the streamlined procedures before you make any new investment.',
    ],
    metaTitle: 'NRI investing from the US — PMS, AIF & GIFT City, PFIC rules explained',
    metaDescription:
      'What US-resident NRIs need to know before investing in Indian PMS, AIFs and GIFT City funds: the PFIC regime, Form 8621, FBAR and FATCA thresholds, why the treaty does not help on gains, and the one structure that avoids PFIC entirely.',
    reviewed: REVIEWED,
    sources: [
      { label: 'IRC §1297 — PFIC definition', url: 'https://www.law.cornell.edu/uscode/text/26/1297' },
      { label: 'IRC §1291 — excess distribution regime', url: 'https://www.law.cornell.edu/uscode/text/26/1291' },
      { label: 'Instructions for Form 8621 (Rev. December 2025)', url: 'https://www.irs.gov/pub/irs-pdf/i8621.pdf' },
      { label: 'IRS — FBAR', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' },
      { label: 'IRS — FATCA reporting thresholds', url: 'https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers' },
      { label: 'India–US tax treaty (IRS)', url: 'https://www.irs.gov/pub/irs-trty/india.pdf' },
      { label: 'IRS — Streamlined Filing Compliance Procedures', url: 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures' },
      ...INDIAN_MINIMUMS,
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'uae',
    code: 'UAE',
    flag: '🇦🇪',
    country: 'the UAE',
    label: 'United Arab Emirates',
    hreflang: 'en-AE',
    title: 'Investing in Indian alternatives from the UAE',
    hook: 'Your zero is real. It is also conditional, still being argued in court, and easy to lose by accident.',
    capsule:
      'A UAE-resident NRI pays no UAE tax on Indian investment income, and nothing in Indian law stops you investing. But the favourable treaty position is not automatic. It needs a residency certificate, 183 days of presence in the calendar year, and the right structure. A PMS and a mutual fund sit under different articles of the treaty.',
    lede:
      'Most people in Dubai and Abu Dhabi already believe their Indian gains are tax-free. Usually they are right. The question worth asking is what that answer rests on, and what quietly breaks it. Four things do: the certificate, the day count, the structure you picked, and the fact that this reading has only ever been tested at Tribunal level.',
    facts: [
      ['UAE tax on your investment income', 'None — personal investment income is outside corporate tax'],
      ['Indian-side restriction', 'None — SEBI and IFSCA impose no residency bar'],
      ['What the treaty position needs', 'A UAE residency certificate, plus the Indian form'],
      ['Day count that matters', '183 days in the calendar year — a treaty test, not a UAE one'],
      ['Where people get caught', 'Assuming PMS is treated like a mutual fund'],
    ],
    table: {
      caption: 'Why the structure you pick changes the treaty answer',
      head: ['Structure', 'What you actually hold', 'Treaty position', 'Practical result'],
      rows: [
        [
          'PMS',
          'Listed Indian shares, in your own name and demat account',
          'The article covering gains on shares in an Indian company',
          'India may tax. The treaty does not exempt you here — this is the trap',
        ],
        [
          'Indian mutual fund',
          'Units of a trust, not shares of a company',
          'The residual article — taxable only where you are resident',
          'Argued to be UAE-only, on Tribunal authority. Contested by the Revenue',
        ],
        [
          'AIF Category I / II',
          'Units, but income passes through as if you invested directly',
          'Unsettled. The pass-through may point back at the underlying shares',
          'Do not assume the mutual-fund answer carries across',
        ],
        [
          'AIF Category III',
          'Units of a fund taxed at fund level in India',
          'You never reach the treaty',
          'Indian tax is borne inside the fund, before you see a rupee',
        ],
        [
          'GIFT City fund',
          'Units of an IFSC scheme',
          'India\'s IFSC regime taxes the fund, not you, on much of its income',
          'Statutory certainty rather than a litigated treaty reading',
        ],
      ],
      note: 'The distinction is structural, not cosmetic. A portfolio manager is required by SEBI not to hold client securities in its own name, so a PMS client holds shares directly, which is precisely what puts them under a different treaty article from a fund investor holding units.',
    },
    qas: [
      {
        q: 'Is my Indian investment income really tax-free in the UAE?',
        a: [
          "On the UAE side, yes. This is one of the few genuinely simple answers on this page.",
          "The UAE levies no personal income tax. Its 9% corporate tax, which applies above AED 375,000 of taxable income, expressly does not treat a natural person's personal investment income as a business activity. That holds regardless of amount.",
          "One condition attaches. The exclusion covers investment for your own personal account that neither requires nor uses a licence, and does not amount to a commercial business. Ordinary portfolio investing sits comfortably inside that. If you are managing money in a way that looks like a business, take advice.",
          "The UAE's domestic minimum top-up tax, running from January 2025, applies only to very large multinational groups. It has nothing to do with individuals.",
        ],
        sources: [
          { label: 'UAE Cabinet Decision No. 49 of 2023 — personal investment income excluded', url: 'https://mof.gov.ae/wp-content/uploads/2023/05/Cabinet-Decision-No.-49-of-2023.pdf' },
          { label: 'Federal Decree-Law No. 47 of 2022 — UAE corporate tax', url: 'https://mof.gov.ae/wp-content/uploads/2022/12/Federal-Decree-Law-No.-47-of-2022-EN.pdf' },
          { label: 'UAE Ministry of Finance — taxes in the UAE', url: 'https://mof.gov.ae/en/public-finance/tax/' },
        ],
      },
      {
        q: 'What does India need before it will honour the treaty?',
        a: [
          "Two documents. Neither is optional.",
          "First, a Tax Residency Certificate from the UAE Federal Tax Authority. Second, an Indian information form. That used to be Form 10F. It is now Form 41, after India replaced its income tax law.",
          "The mechanics of the Indian form changed in a way most pages have not caught up with. It must be filed online. The concession that let non-residents without a PAN file on paper expired on 30 September 2023 and was never reopened.",
          "If you have no PAN and are not required to have one, you register on the Indian e-filing portal under a separate non-resident category. You get an NR ID instead of a PAN.",
          "Verification is by one-time password to your email and mobile. <b>You do not need an Indian digital signature.</b> That myth is why a lot of UAE investors give up and simply accept the withholding.",
        ],
        sources: [
          { label: 'UAE Federal Tax Authority — Tax Residency Certificate', url: 'https://tax.gov.ae/en/services/issuance.of.tax.certificates.aspx' },
          { label: 'India — Income-tax Act, 2025 (in force 1 April 2026)', url: 'https://www.incometaxindia.gov.in/income-tax-act-2025' },
        ],
      },
      {
        q: 'How many days do I need to spend in the UAE?',
        a: [
          "For the India treaty: 183 days in the calendar year.",
          "That number does not come from UAE law. It is written into the treaty's own definition of a UAE-resident individual. And it runs on the calendar year, not a rolling twelve months, and not India's April-to-March year.",
          "This matters because UAE domestic law offers easier routes. There is a 90-day test for permit holders with a home or business here, and a test based on your centre of financial and personal interests. Both are valid for UAE purposes. Neither, on its own, satisfies what the India treaty asks for.",
          "So you can be comfortably UAE-resident and still fail India's test. Count days on a calendar year and keep the evidence. Apply for the certificate for the right period. It cannot be issued for a future period, and cannot exceed twelve months.",
        ],
        sources: [
          { label: 'UAE Cabinet Decision No. 85 of 2022 — determination of tax residency', url: 'https://tax.gov.ae/Datafolder/Files/Legislation/Corporate%20Tax/Cabinet%20Decision%2085%20of%202022%20-%20For%20publishing.pdf' },
          { label: 'FTA Tax Procedures Guide — Tax Resident and TRC (October 2024)', url: 'https://tax.gov.ae/Datafolder/Files/Guides/VAT/VAT%20Guides/Tax-Resident-and-TRC--18-10-2024.pdf' },
        ],
      },
      {
        q: 'Is the "no Indian tax on mutual funds" position actually settled?',
        a: [
          "No. Treat anyone who tells you otherwise with caution.",
          "The favourable reading rests on Income Tax Appellate Tribunal decisions. Most directly, a 2019 Cochin Tribunal ruling that units of Indian mutual funds are not shares, because Indian mutual funds are trusts rather than companies, and because Indian securities law lists shares and units separately. A Delhi Tribunal decision in October 2024 reached a compatible result, though its own holding was about treaty eligibility rather than the shares question.",
          "What that means in practice. No High Court and no Supreme Court has ruled. The Revenue has contested the point repeatedly. And the treaty contains an anti-abuse article that India itself has notified to the OECD as a main-purpose rule.",
          "A line of Tribunal authority is a reasonable basis for a position. It is not certainty. Know which one you are relying on.",
          "This is also why GIFT City reads differently here than the marketing suggests. Its attraction is not a bigger exemption. It is that the treatment is statutory rather than litigated.",
        ],
        sources: [
          { label: 'DCIT v. K.E. Faizal, ITAT Cochin, ITA 423/Coch/2018 (2019)', url: 'https://indiankanoon.org/doc/16452218/' },
          { label: 'Saket Kanoi v. DCIT, ITAT Delhi, ITA 3243/Del/2023 (October 2024) — full order', url: 'https://itat.gov.in/public/files/upload/1730272384-j3YKhE-1-TO.pdf' },
          { label: 'India\'s MLI position, OECD — India–UAE listed as a covered agreement', url: 'https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/beps-mli/beps-mli-position-india.pdf' },
        ],
      },
      {
        q: 'Can I actually invest, and how does the money come back?',
        a: [
          "Access is not the constraint.",
          "Indian portfolio management rules carry no residency restriction. The AIF rules say a fund may raise money from any investor, whether Indian, foreign or non-resident Indian. GIFT City goes further: its rules list persons resident outside India and NRIs as eligible, and you are not subject to the annual remittance cap that constrains residents.",
          "The planning sits in the exchange-control layer. Listed-share purchases on a repatriable basis run through a designated bank branch, with an individual limit of under 10% of a company and 24% for all non-resident individuals together. Investments on a non-repatriable basis are treated as domestic money. Units of investment vehicles such as AIFs have their own route.",
          "From an NRO account you can remit up to <b>US $1 million per financial year</b>, with documentation.",
          "Decide repatriable or non-repatriable before you invest. Changing route afterwards is the expensive way to do it.",
        ],
        sources: INDIAN_MINIMUMS,
      },
      {
        q: 'What are the minimums?',
        a: [
          "In India: a PMS needs ₹50 lakh, an AIF ₹1 crore. Accredited investors are exempt from both. The newer Specialised Investment Fund category starts at ₹10 lakh, measured across all strategies of that fund at PAN level.",
          "In GIFT City the thresholds are in dollars, and often lower than people expect. A restricted, non-retail scheme takes investors from US $150,000. A venture capital scheme from US $250,000. An IFSC portfolio management mandate from US $75,000. Retail schemes have no per-investor minimum.",
          "One warning. Accreditation regimes are not interchangeable. Being an accredited investor under SEBI does not make you one under IFSCA, or the other way round.",
        ],
        sources: INDIAN_MINIMUMS,
      },
      {
        q: 'Is there anything that could pull me back into the Indian tax net?',
        a: [
          "India has a deemed-residency rule aimed at people not liable to tax anywhere. By design, that describes a UAE resident. It turns on Indian citizenship and on Indian-source income above a threshold.",
          "We are deliberately not publishing the mechanics, for two reasons.",
          "The rule is framed around Indian <em>citizens</em>, and Overseas Citizen of India status is expressly not citizenship. So many readers assume it catches them when it may not.",
          "And the consequence is routinely overstated. Where the rule bites it generally produces a \\'not ordinarily resident\\' status, under which Indian-source income is taxable rather than your worldwide income.",
          "India also replaced its entire income tax statute on 1 April 2026, so any page quoting section numbers for this is quoting a repealed Act. Take it to your Chartered Accountant with your actual day counts and income figures. It is a five-minute question for someone with the current text in front of them, and a bad thing to guess at.",
        ],
        sources: [
          { label: 'India — Income-tax Act, 2025, in force 1 April 2026', url: 'https://www.incometaxindia.gov.in/income-tax-act-2025' },
        ],
      },
    ],
    mistakes: [
      {
        m: 'Assuming a PMS is taxed like a mutual fund',
        why: 'A PMS holds shares in your own name, which places it under the treaty article covering gains on shares in an Indian company. The favourable reading applies to units, not shares.',
      },
      {
        m: 'Lumping AIFs in with mutual funds',
        why: 'Category I and II funds pass income through as if you had invested directly, which may point back at the underlying shares. Category III is taxed inside the fund, so you never reach the treaty at all.',
      },
      {
        m: 'Relying on a UAE residency certificate obtained on the 90-day route',
        why: 'It is valid for UAE purposes, but the India treaty writes its own test — 183 days in the calendar year.',
      },
      {
        m: 'Skipping the Indian information form because "you need a digital signature"',
        why: 'You do not. Non-residents without a PAN register under a separate category and verify by one-time password. Skipping it means accepting withholding you could have avoided.',
      },
      {
        m: 'Presenting the treaty position to family as settled law',
        why: 'It is Tribunal-level authority that the Revenue continues to contest, and the treaty contains an anti-abuse article. Plan around it; do not bet the allocation on it.',
      },
    ],
    checklist: [
      'Count your UAE days on a calendar-year basis and keep the evidence — entry and exit stamps, tenancy, employment.',
      'Apply for the residency certificate for the right period through the FTA portal; it cannot be backdated to cover a future period.',
      'File the Indian information form online — register for an NR ID first if you do not hold a PAN.',
      'Before you invest, decide repatriable or non-repatriable. Changing route afterwards is expensive.',
      'Ask specifically how your chosen structure is treated: shares held in your name, units of a trust, or an IFSC scheme. The answer changes the tax outcome.',
    ],
    metaTitle: 'NRI investing from the UAE — PMS, AIF & GIFT City, treaty and TRC rules',
    metaDescription:
      'What UAE-resident NRIs need before investing in Indian PMS, AIFs and GIFT City funds: how the India–UAE treaty actually works, why PMS and mutual funds sit under different articles, the 183-day calendar-year test, and the residency certificate process.',
    reviewed: REVIEWED,
    sources: [
      { label: 'UAE Cabinet Decision No. 49 of 2023 — personal investment income', url: 'https://mof.gov.ae/wp-content/uploads/2023/05/Cabinet-Decision-No.-49-of-2023.pdf' },
      { label: 'UAE Cabinet Decision No. 85 of 2022 — tax residency', url: 'https://tax.gov.ae/Datafolder/Files/Legislation/Corporate%20Tax/Cabinet%20Decision%2085%20of%202022%20-%20For%20publishing.pdf' },
      { label: 'UAE Federal Tax Authority — TRC issuance', url: 'https://tax.gov.ae/en/services/issuance.of.tax.certificates.aspx' },
      { label: 'DCIT v. K.E. Faizal, ITAT Cochin (2019)', url: 'https://indiankanoon.org/doc/16452218/' },
      { label: 'Saket Kanoi v. DCIT, ITAT Delhi (2024)', url: 'https://itat.gov.in/public/files/upload/1730272384-j3YKhE-1-TO.pdf' },
      { label: 'India — Income-tax Act, 2025', url: 'https://www.incometaxindia.gov.in/income-tax-act-2025' },
      ...INDIAN_MINIMUMS,
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'uk',
    code: 'UK',
    flag: '🇬🇧',
    country: 'the United Kingdom',
    label: 'United Kingdom',
    hreflang: 'en-GB',
    title: 'Investing in Indian alternatives from the United Kingdom',
    hook: 'Your Indian fund is probably taxed as income at 45% instead of as a gain at 24%, and the loss relief never comes back.',
    capsule:
      'If you live in the UK, the question that decides your outcome is not what the fund returned. It is whether that exact share class holds HMRC reporting fund status. Without it, your profit on sale is not a capital gain at all. It is an offshore income gain, charged to income tax at up to 45%, with no annual exempt amount.',
    lede:
      'This is the corridor where the quiet losses happen. Nothing goes wrong when you buy, and nothing looks wrong on the statement. The damage shows up years later, when you sell, and a gain you assumed would be taxed at 24% is charged as income instead. Then you find the loss on the one that did not work cannot be set against it.',
    facts: [
      ['Decisive question', 'Does your share class hold HMRC reporting fund status?'],
      ['If it does not', 'Profit taxed as income, up to 45%, no annual exempt amount'],
      ['If it does', 'Capital gains treatment — plus annual tax on excess reported income'],
      ['Indian funds on HMRC\'s list', 'A small and growing minority, mostly only since April 2025'],
      ['Who restricts you', 'Not the UK, and not India — the provider\'s own promotion rules'],
    ],
    table: {
      caption: 'How each structure is taxed on a UK return',
      head: ['Structure', 'Offshore-fund status', 'How your profit is taxed', 'Headline rate'],
      rows: [
        [
          'PMS',
          'Not a fund at all — you hold shares directly, so the offshore-fund rules should not apply',
          'Capital gains. But every trade the manager makes is your own disposal',
          '18% or 24%',
        ],
        [
          'Indian mutual fund, no reporting status',
          'Non-reporting — the majority',
          'Offshore income gain, charged as income. Losses are still only capital losses',
          'Up to 45%',
        ],
        [
          'Indian mutual fund with reporting status',
          'A handful now have it',
          'Capital gain — plus income tax each year on excess reported income you never received',
          '18% or 24%',
        ],
        [
          'Indian AIF',
          'A few have obtained status',
          'Depends on the share class, not the fund name',
          'Varies',
        ],
        [
          'GIFT City fund',
          'Several have status; at least one has lost it',
          'Same test. India\'s exemption gives you nothing on its own',
          'Varies',
        ],
      ],
      note: 'Reporting fund status is granted per share class and from a stated date, and it can be withdrawn. Finding the fund\'s name on HMRC\'s list is not the check — the class and the date are the check.',
    },
    qas: [
      {
        q: 'What is an offshore income gain, and why does it cost so much?',
        a: [
          "If you sell an interest in an offshore fund that does not hold HMRC reporting fund status, your profit is not a capital gain. It is treated as income arising on disposal, charged at your marginal rate. So up to 45%.",
          "Three consequences, each costing money.",
          "There is no capital gains annual exempt amount to set against it. The dividend and savings allowances do not apply either. And if the investment loses money, the relief is asymmetric: no loss arises for these purposes, and any loss you do have is a capital loss, so it cannot offset the income charge on the one that worked.",
          "Against a capital gains rate of 18% or 24%, on a meaningful holding that is not a rounding error.",
        ],
        sources: [
          { label: 'HMRC Investment Funds Manual IFM13412 — charge to tax on offshore income gains', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13412' },
          { label: 'HMRC IFM13550 — losses on non-reporting funds', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13550' },
        ],
      },
      {
        q: 'Are any Indian or GIFT City funds actually on HMRC\'s reporting list?',
        a: [
          "Yes, and more than the usual advice suggests. We parsed HMRC's own file and counted 18 India-domiciled or GIFT City parent funds holding status across 69 share classes, including DSP, HDFC, ICICI Prudential, Kotak and Quantum. The full table is on our reporting-status page.",
          "Three caveats decide whether that helps you.",
          "Status is granted <b>per share class</b>. Holding the wrong class of a listed fund gives you nothing.",
          "Status runs <b>from a date</b>, and most Indian entries only start in April 2025. A longer-held investment may have been non-reporting for part of its life, which is enough to taint the disposal.",
          "Status can <b>cease</b>. One GIFT City class came off the list on 31 March 2026.",
          "The list is published and searchable. Check your exact class and its dates before you subscribe, and again before you sell.",
        ],
        sources: [
          { label: 'HMRC — Offshore funds: list of reporting funds (updated monthly)', url: 'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds' },
        ],
      },
      {
        q: 'Is reporting fund status simply better, then?',
        a: [
          "Better on disposal. Not free.",
          "A UK investor in a reporting fund must declare the fund's reported income every year. That means both the distributions you received and the undistributed excess reported income. In an accumulating fund you can owe tax on money you have never seen.",
          "So the framing is not reporting good, non-reporting bad. A reporting fund converts an unpredictable high-rate charge on exit into a smaller annual administrative one, and keeps capital gains treatment for the growth.",
          "For most long-horizon holders that is clearly the better trade. It just brings an annual filing job you should price in first.",
        ],
        sources: [
          { label: 'HMRC IFM12146 — UK investors in reporting funds', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12146' },
        ],
      },
      {
        q: 'Does a PMS avoid all of this?',
        a: [
          "Probably, for a structural reason.",
          "The UK offshore-fund rules bite on a non-UK body corporate, on property held on trust, or on arrangements creating rights in the nature of co-ownership. A genuine Indian discretionary PMS is none of those. SEBI requires that the manager must not hold client securities in its own name, so you hold listed Indian shares directly, in your own account, alongside nobody. On that basis your gains should be capital gains.",
          "Two honest caveats. HMRC has published no guidance on managed or segregated accounts, so this is a well-supported reading rather than settled law. And it turns on how your particular mandate is constituted. Some products marketed as PMS are pooled.",
          "The good tax answer also carries the worst admin burden on this page. If the offshore-fund rules do not apply, every trade your manager makes is your own UK disposal. An active mandate can generate hundreds a year, each needing share-pooling treatment and a sterling conversion at the transaction date.",
          "Ask your manager whether they provide UK-basis reporting before you assume this is the easy route.",
        ],
        sources: [
          { label: 'HMRC IFM12220 — definition of an offshore fund', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12220' },
          { label: 'SEBI (Portfolio Managers) Regulations, 2020', url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html' },
        ],
      },
      {
        q: 'I have just moved to the UK. Is there a window before this applies?',
        a: [
          "There may be, and it is the most valuable planning available in this corridor.",
          "The remittance basis was abolished on 6 April 2025 and replaced by the four-year foreign income and gains regime. If you are UK resident and were non-UK resident for each of the ten preceding tax years, you can claim relief on qualifying foreign income and gains for your first four years here.",
          "Offshore income gains are within scope. So a returning NRI who qualifies can sell non-reporting Indian funds inside that window without the 45% charge. A year later, they cannot.",
          "It is not free. Claiming forfeits your personal allowance and your capital gains annual exempt amount, even where the claim covers foreign income only. The claim must be quantified to be valid. A further condition was added in March 2026.",
          "If you are within four years of arriving, get advice now rather than at the next tax return. The window closes on a date, not on a transaction.",
        ],
        sources: [
          { label: 'GOV.UK — check if you can claim the 4-year foreign income and gains regime', url: 'https://www.gov.uk/guidance/check-if-you-can-claim-the-4-year-foreign-income-and-gains-regime' },
          { label: 'HMRC Residence and FIG Regime Manual', url: 'https://www.gov.uk/hmrc-internal-manuals/residence-and-fig-regime-manual/rfig44000' },
          { label: 'HMRC IFM13414 — offshore income gains and the FIG regime', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13414' },
        ],
      },
      {
        q: 'What about money I built up before April 2025?',
        a: [
          "The Temporary Repatriation Facility lets former remittance-basis users designate pre-6 April 2025 foreign income and gains and pay a flat charge. After that, the money can come to the UK without further income tax. The rate is 12% for 2025-26 and 2026-27, rising to 15% for 2027-28.",
          "Watch two different dates, because most summaries give only one. The last tax year the facility covers ends on 5 April 2028. But the deadline for making a designation election runs to 31 January 2030. Quoting only the earlier date understates your window by nearly two years.",
          "The trade-off: a designation cannot be undone once the amendment window closes, and overpayment relief is not available. So designating early to lock in 12% is real advice, but it is irreversible advice.",
        ],
        sources: [
          { label: 'HMRC HS264 — remittance basis and the Temporary Repatriation Facility', url: 'https://www.gov.uk/government/publications/remittance-basis-hs264-self-assessment-helpsheet/hs264-remittance-of-pre-6-april-2025-foreign-income-and-gains-and-the-temporary-repatriation-facility-trf' },
          { label: 'HMRC RDRM73400 — TRC designation', url: 'https://www.gov.uk/hmrc-internal-manuals/residence-domicile-and-remittance-basis/rdrm73400' },
        ],
      },
      {
        q: 'Is my NRE interest taxable in the UK?',
        a: [
          "Yes. NRE interest is exempt from Indian tax, but a UK resident is taxed on worldwide income. So it is fully taxable here as foreign interest.",
          "And because no Indian tax was paid, there is normally no foreign tax credit to claim. The Indian exemption benefits nobody but the UK Exchequer.",
          "The India-UK treaty does contain a tax-sparing provision, giving credit for tax spared rather than paid. Do not assume it rescues this. It is time-limited per source, HMRC's dedicated guidance page on Indian spared tax has been archived, and the surviving manual material does not address NRE interest. Treat it as unsettled and get advice before claiming.",
          "The same logic explains GIFT City. India exempting the income simply removes the credit, and the UK still taxes the whole amount. If the fund also lacks reporting status, the outcome is worse than neutral.",
        ],
        sources: [
          { label: 'GOV.UK — tax on foreign income', url: 'https://www.gov.uk/tax-foreign-income' },
          { label: 'HMRC DT9553 — India: tax spared', url: 'https://www.gov.uk/hmrc-internal-manuals/double-taxation-relief/dt9553' },
          { label: 'HMRC SA106 foreign pages and notes', url: 'https://www.gov.uk/government/publications/self-assessment-foreign-sa106' },
        ],
      },
      {
        q: 'How likely is HMRC to know about my Indian accounts?',
        a: [
          "It already does. India and the UK both exchange financial account information under the Common Reporting Standard, and India is listed in HMRC's own manuals as both a participating and a reportable jurisdiction. Your Indian bank and fund accounts are reported.",
          "If something has gone unreported, the route back is the Worldwide Disclosure Facility. It remains open and gives 90 days from HMRC's acknowledgement to file and pay.",
          "One detail almost nobody mentions. Offshore penalties are set by a territory categorisation that has not been revised since 2013, and India sits in the middle category. That carries a higher maximum penalty than assets held in Switzerland or the United States.",
          "There is also a strict liability criminal offence for failing to declare offshore income above a threshold, where no intent needs to be shown. This is a corridor where getting ahead of the problem is much cheaper than waiting.",
        ],
        sources: [
          { label: 'HMRC IEIM400090 — CRS participating jurisdictions', url: 'https://www.gov.uk/hmrc-internal-manuals/international-exchange-of-information/ieim400090' },
          { label: 'GOV.UK — Worldwide Disclosure Facility', url: 'https://www.gov.uk/guidance/worldwide-disclosure-facility-make-a-disclosure' },
          { label: 'HMRC — territory categorisation for offshore penalties', url: 'https://www.gov.uk/government/publications/territory-categorisation-for-offshore-penalties/territory-categorisation-for-offshore-penalties-from-24-july-2013' },
        ],
      },
      {
        q: 'Does UK law stop me investing in India at all?',
        a: [
          "No. This is where the UK differs sharply from the US.",
          "UK law places no restriction on you as an investor. The rules bind the provider. An Indian house cannot lawfully promote to you in the UK, or carry on regulated business here, without UK authorisation or an approved promotion.",
          "So when an Indian fund declines a UK-resident applicant, that is the provider's own commercial and compliance decision, not a legal bar on you. There is a narrow route where you approach them entirely on your own initiative, but it collapses the moment the contact is part of an organised marketing campaign. That is why the answer varies house by house rather than following a rule.",
          "On the Indian side there is no barrier either. Portfolio management rules carry no residency restriction, the AIF rules expressly permit foreign and non-resident investors, and GIFT City lists persons resident outside India as eligible.",
        ],
        sources: [
          { label: 'FSMA 2000 s.21 — restrictions on financial promotion', url: 'https://www.legislation.gov.uk/ukpga/2000/8/section/21' },
          { label: 'FCA — financial promotions and adverts', url: 'https://www.fca.org.uk/firms/financial-promotions-adverts' },
          ...INDIAN_MINIMUMS.slice(0, 3),
        ],
      },
    ],
    mistakes: [
      {
        m: 'Checking whether the fund is on HMRC\'s list, but not the share class or the date',
        why: 'Status is granted per class and from a stated date, and it can be withdrawn. A fund on the list can still leave you with a non-reporting disposal.',
      },
      {
        m: 'Assuming a GIFT City fund is fine because India exempts it',
        why: 'An Indian exemption removes the credit and leaves the UK charge standing. Without reporting status the gain is taxed as income, not as a capital gain.',
      },
      {
        m: 'Expecting a loss on one Indian fund to offset the charge on another',
        why: 'The offshore income gain is charged as income, while the loss is only ever a capital loss. They do not meet.',
      },
      {
        m: 'Waiting until the tax return to think about the four-year window',
        why: 'If you have recently arrived, the relief has a hard end date and forfeits allowances when claimed. It needs a decision, not a reconciliation.',
      },
      {
        m: 'Using dividend rates from last year',
        why: 'UK dividend rates rose on 6 April 2026. Anything quoting 8.75% or 33.75% is out of date.',
      },
    ],
    checklist: [
      'Look up every Indian holding you own on HMRC\'s reporting funds list — by exact share class, and check the dates.',
      'If you arrived in the UK within the last four years, take advice on the foreign income and gains regime now, not at the next return.',
      'If you have pre-April-2025 foreign income or gains, model the repatriation facility before the rate steps up.',
      'For a PMS, confirm in writing whether the manager provides UK-basis reporting — you will need it for every trade.',
      'If anything has gone unreported, deal with it deliberately. India sits in a higher penalty category than most people assume.',
    ],
    metaTitle: 'NRI investing from the UK — reporting fund status, PMS, AIF & GIFT City',
    metaDescription:
      'Why UK-resident NRIs get taxed at up to 45% on Indian funds instead of 24%: HMRC reporting fund status explained, which Indian and GIFT City funds hold it, the four-year FIG window, the repatriation facility deadlines, and how PMS is treated differently.',
    reviewed: REVIEWED,
    sources: [
      { label: 'HMRC — Offshore funds: list of reporting funds', url: 'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds' },
      { label: 'HMRC IFM13412 — offshore income gains', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13412' },
      { label: 'HMRC IFM12220 — definition of an offshore fund', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12220' },
      { label: 'GOV.UK — the 4-year foreign income and gains regime', url: 'https://www.gov.uk/guidance/check-if-you-can-claim-the-4-year-foreign-income-and-gains-regime' },
      { label: 'HMRC HS264 — Temporary Repatriation Facility', url: 'https://www.gov.uk/government/publications/remittance-basis-hs264-self-assessment-helpsheet/hs264-remittance-of-pre-6-april-2025-foreign-income-and-gains-and-the-temporary-repatriation-facility-trf' },
      { label: 'GOV.UK — Worldwide Disclosure Facility', url: 'https://www.gov.uk/guidance/worldwide-disclosure-facility-make-a-disclosure' },
      { label: 'FSMA 2000 s.21 — financial promotion', url: 'https://www.legislation.gov.uk/ukpga/2000/8/section/21' },
      ...INDIAN_MINIMUMS,
    ],
  },
]

export const corridorBySlug = (slug: string): Corridor | undefined =>
  CORRIDORS.find((c) => c.slug === slug)
