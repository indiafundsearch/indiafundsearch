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
 *    quote none, so we cannot go stale — and we say why.
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
    hook: 'The Indian fund your cousin recommends is, for you, a tax trap with no statute of limitations.',
    capsule:
      'US-resident NRIs can legally invest in Indian PMS, AIFs and GIFT City funds — Indian law imposes no bar. The obstacle is US law. Pooled Indian funds are usually treated as PFICs, taxed at the top marginal rate with an interest charge and a separate annual form per fund. A PMS holding operating-company shares directly avoids that entirely.',
    lede:
      'Almost every page written for US-based NRIs starts from the wrong end — it lists Indian products, then adds a line about "consult your CPA". The order is backwards. For a US person the American tax code, not the Indian one, decides what is sensible to own. So this page starts there.',
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
          'Yes, almost certainly. The trigger is US tax residency, not citizenship or a green card. You are a US tax resident if you hold a green card, or if you meet the substantial presence test — 31 days in the current year, and 183 days counting the current year in full, one-third of last year and one-sixth of the year before.',
          'H-1B and L-1 holders meet this quickly and are fully within the PFIC, FBAR and Form 8938 rules. Certain students and teachers on F and J visas are excluded for a limited number of years. This surprises people every year, and it is the single most common reason a first Form 8621 arrives late.',
        ],
        sources: [
          { label: 'IRC §7701 — definition of resident alien', url: 'https://www.law.cornell.edu/uscode/text/26/7701' },
        ],
      },
      {
        q: 'What is a PFIC, and why does it matter so much?',
        a: [
          'A PFIC is a passive foreign investment company: any foreign corporation where 75% or more of gross income is passive, or 50% or more of assets on average produce passive income. A pooled Indian fund is not named in the statute — it gets there because a foreign vehicle whose investors all have limited liability is treated by default as a corporation for US tax purposes. That default is why practitioners treat Indian mutual funds and most AIFs as PFICs.',
          'The consequence is what matters. Under the default regime, your gain is spread back across the whole holding period and each earlier year is taxed at that year\'s top marginal rate — 37% today, with no capital-gains rate and no offsetting deductions — plus interest compounding daily at the IRS underpayment rate, currently 7%. You also file a separate Form 8621 for each PFIC, and for each PFIC held inside another one.',
          'And the assessment clock does not start until that form is filed. A normal return closes after three years; an unfiled PFIC year stays open indefinitely.',
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
        q: 'Can a US-resident NRI invest in Indian PMS — and is it really PFIC-free?',
        a: [
          'Yes to the first, and largely yes to the second. This is the most useful thing on this page and almost nobody says it.',
          'Indian regulation places no residency restriction on PMS clients. More importantly, SEBI requires that a portfolio manager must not hold client securities in its own name — so a PMS client holds listed Indian shares directly, in their own demat account. It is a managed account, not a fund.',
          'The PFIC rules reach foreign corporations. Shares in ordinary Indian operating companies are not PFICs, because a manufacturer or a bank fails both the income and the asset test. So a PMS invested in operating equities generates no PFIC exposure at all. You still report the account on the FBAR and on Form 8938, and every sale the manager makes is your own taxable disposal — but the punitive regime does not apply.',
          'The exception: if the mandate holds mutual fund units or other pooled vehicles, PFIC exposure comes back for those holdings. Ask for the mandate in writing.',
        ],
        sources: [
          { label: 'SEBI (Portfolio Managers) Regulations, 2020 — Reg. 24(15), securities not held in the manager\'s name', url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html' },
        ],
      },
      {
        q: 'Does a GIFT City fund solve the PFIC problem?',
        a: [
          'Sometimes — and the honest answer is that you cannot tell from the brochure. The PFIC rules apply only to foreign corporations. A vehicle that is genuinely a partnership, or an eligible Indian entity that has validly filed IRS Form 8832 to be taxed as a pass-through, is not itself a PFIC. Helpfully, no Indian trust, LLP or private limited company appears on the IRS list of entities that are automatically corporations; only "India, Public Limited Company" is listed.',
          'Three cautions, all of which matter more than the headline. First, a Schedule K-1 does not end the analysis: you remain an indirect PFIC shareholder for any PFIC the fund itself holds, so a fund-of-funds structure can multiply your filings rather than remove them. Second, if the vehicle is classified as a trust rather than a business entity, you land in the foreign non-grantor trust throwback rules, which carry their own interest charge and their own forms — structurally about as punitive as the PFIC regime. Third, the election belongs to the fund, not to you; one investor cannot make a fund check the box.',
          'So ask the fund three questions in writing, before you subscribe. Have you filed Form 8832, and what classification did you elect? Will you issue me a Schedule K-1? Do you provide annual US tax reporting, and for every underlying vehicle? If the answer to any of them is vague, price the investment as though it is a PFIC.',
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
          'On capital gains, no — and this is the most widely repeated error in NRI content. Article 13 of the India–US treaty says in its entirety that each country may tax capital gains under its own domestic law. There is no cap and no allocation. Relief comes only afterwards, as a US foreign tax credit for Indian tax you actually paid.',
          'The dividend article is also usually misreported. Its 15% cap applies to a company owning at least 10% of the voting stock. An individual falls under the 25% limit, which is above what India withholds anyway — so for you the dividend article does nothing.',
          'That last point has a sharp consequence for GIFT City. India\'s IFSC exemptions are designed for investors who are taxed nowhere else. If India exempts the income, there is no Indian tax for the US to credit, so the whole burden lands on your US return. For a US person, an Indian exemption can leave you worse off than an Indian-taxed structure, not better.',
          'Layer on the 3.8% net investment income tax above $200,000 of modified AGI single, or $250,000 joint. The foreign tax credit does not generally reach it.',
        ],
        sources: [
          { label: 'India–US tax treaty, full text (IRS)', url: 'https://www.irs.gov/pub/irs-trty/india.pdf' },
          { label: 'IRC §1411 — net investment income tax', url: 'https://www.law.cornell.edu/uscode/text/26/1411' },
        ],
      },
      {
        q: 'Why do so many Indian funds simply refuse US investors?',
        a: [
          'Two US statutes, not one. Taking your subscription pushes the offering outside the Regulation S safe harbour, because the rules count any natural person resident in the United States as a "US person". More fundamentally, the Investment Company Act bars a foreign investment company from publicly offering its securities into the United States without an SEC order that is essentially never granted.',
          'So when an AMC says "we do not accept US persons", it is not applying Indian law and it is not making a judgement about you. It is avoiding US registration. That is also why the houses which do accept US persons often insist on offline paperwork and extra declarations.',
        ],
        sources: [
          { label: '17 CFR 230.902 — Regulation S definitions', url: 'https://www.law.cornell.edu/cfr/text/17/230.902' },
          { label: 'Investment Company Act §7(d)', url: 'https://www.law.cornell.edu/uscode/text/15/80a-7' },
        ],
      },
      {
        q: 'What do I have to report every year?',
        a: [
          'Three regimes stack on the same assets, to two different agencies, with different thresholds. They are cumulative, not alternative.',
          'The FBAR (FinCEN Form 114) is due once your foreign accounts together exceed $10,000 at any point in the year — including demat, PMS and brokerage accounts. It is due 15 April with an automatic extension to 15 October. The maximum non-willful penalty is $16,536 per report, not per account, following the Supreme Court in Bittner.',
          'Form 8938 goes with your tax return once specified foreign financial assets exceed $50,000 at year end or $75,000 at any time if you are single and living in the US — $100,000 and $150,000 filing jointly, and far higher thresholds if you live abroad.',
          'Form 8621 is separate again, one for each PFIC, and one for each PFIC held through another. A small-holdings exception exists at $25,000 aggregate ($50,000 jointly), but it disappears the moment you sell or receive a distribution.',
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
          'You are not unusual, and there is a defined route back. The IRS Streamlined Filing Compliance Procedures exist for taxpayers whose failure was non-willful. For someone residing in the US, that means three years of amended returns, six years of FBARs, a non-willfulness certification, and a 5% penalty on the highest aggregate value of the foreign financial assets across the covered period. For those residing abroad, the penalty version is different again.',
          'Two things worth knowing before you decide. Because the PFIC limitation clock never started, those years remain open regardless of how long ago they were — so waiting does not help. And the certification is made under penalty of perjury, so this is a conversation to have with a US tax professional, not something to self-file from a blog post. Bring the fund statements; the analysis is per fund, per year.',
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
    hook: 'Your zero is real. It is also conditional, litigated, and easy to lose by accident.',
    capsule:
      'UAE-resident NRIs face no UAE tax on Indian investment income and no Indian bar on access. But the favourable treaty position is not automatic: it depends on a residency certificate, on 183 days of presence in the calendar year, and on which structure you hold. A PMS and a mutual fund sit under different treaty articles.',
    lede:
      'Most UAE-based investors already believe their Indian gains are tax-free. The useful question is not whether that is true — it is what the position rests on, and what quietly breaks it. Four things do: the certificate, the day count, the structure you chose, and the fact that the favourable reading has only ever been tested at Tribunal level.',
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
          'Units — but income passes through as if you invested directly',
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
      note: 'The distinction is structural, not cosmetic. A portfolio manager is required by SEBI not to hold client securities in its own name, so a PMS client holds shares directly — which is precisely what puts them under a different treaty article from a fund investor holding units.',
    },
    qas: [
      {
        q: 'Is my Indian investment income really tax-free in the UAE?',
        a: [
          'On the UAE side, yes, and this is one of the few genuinely simple answers on this page. The UAE levies no personal income tax. Its 9% corporate tax, which applies above AED 375,000 of taxable income, expressly does not treat a natural person\'s personal investment income as a business activity — regardless of amount.',
          'One condition attaches. The exclusion covers investment conducted for your own personal account that neither requires nor is conducted through a licence, and does not amount to a commercial business. Ordinary portfolio investing is comfortably inside that. If you are managing money in a way that looks like a business, take advice.',
          'The UAE\'s domestic minimum top-up tax, introduced for financial years from January 2025, applies only to constituent entities of very large multinational groups. It has nothing to do with individuals.',
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
          'Two documents, and neither is optional. First, a Tax Residency Certificate issued by the UAE Federal Tax Authority. Second, an Indian information form — historically Form 10F, and now Form 41 following India\'s new Income-tax Act.',
          'The mechanics of that Indian form changed in a way most pages have not caught up with. It must be filed online; the concession that let non-residents without a PAN file on paper expired on 30 September 2023 and was never reopened. If you do not hold a PAN and are not required to, you register on the Indian e-filing portal under a separate non-resident category and receive an NR ID instead of a PAN. Verification is by one-time password sent to your email and mobile — you do not need an Indian digital signature certificate.',
          'That last detail is worth knowing, because "you need a DSC" is the reason a lot of UAE investors abandon the process and simply accept the withholding.',
        ],
        sources: [
          { label: 'UAE Federal Tax Authority — Tax Residency Certificate', url: 'https://tax.gov.ae/en/services/issuance.of.tax.certificates.aspx' },
          { label: 'India — Income-tax Act, 2025 (in force 1 April 2026)', url: 'https://www.incometaxindia.gov.in/income-tax-act-2025' },
        ],
      },
      {
        q: 'How many days do I need to spend in the UAE?',
        a: [
          'For the India treaty specifically: 183 days in the calendar year. That number does not come from UAE law — it is written into the treaty\'s own definition of a UAE resident individual, and it runs on the calendar year, not on India\'s April-to-March year and not on a rolling twelve months.',
          'This matters because UAE domestic law offers easier routes to residency, including a 90-day test for permit holders with a home or a business in the country, and a test based on your centre of financial and personal interests. Those are perfectly valid for UAE purposes. They do not, on their own, satisfy what the India treaty asks for.',
          'So you can be comfortably UAE-resident and still fail the test India applies. Count the days on a calendar year, keep the evidence, and apply for the certificate for the right period — it cannot be issued for a future period and cannot exceed twelve months.',
        ],
        sources: [
          { label: 'UAE Cabinet Decision No. 85 of 2022 — determination of tax residency', url: 'https://tax.gov.ae/Datafolder/Files/Legislation/Corporate%20Tax/Cabinet%20Decision%2085%20of%202022%20-%20For%20publishing.pdf' },
          { label: 'FTA Tax Procedures Guide — Tax Resident and TRC (October 2024)', url: 'https://tax.gov.ae/Datafolder/Files/Guides/VAT/VAT%20Guides/Tax-Resident-and-TRC--18-10-2024.pdf' },
        ],
      },
      {
        q: 'Is the "no Indian tax on mutual funds" position actually settled?',
        a: [
          'No, and you should treat anyone who tells you otherwise with caution. The favourable reading rests on Income Tax Appellate Tribunal decisions, most directly a 2019 Cochin Tribunal ruling which held that units of Indian mutual funds are not "shares" — because Indian mutual funds are constituted as trusts rather than companies, and because Indian securities law lists shares and units as separate things. A Delhi Tribunal decision in October 2024 reached a compatible result, though its own operative holding was about treaty eligibility rather than the shares question.',
          'What that means practically: no High Court and no Supreme Court has ruled on the point, the Revenue has contested it repeatedly, and the treaty also contains an anti-abuse article which India itself has notified to the OECD as a main-purpose rule. A Tribunal line of authority is a reasonable basis for a position. It is not the same as certainty, and it is worth knowing which one you are relying on.',
          'This is also why GIFT City reads differently for UAE investors than the marketing suggests. Its attraction is not a bigger exemption — it is that the treatment is statutory rather than litigated.',
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
          'Access is not the constraint. Indian portfolio management regulations contain no residency restriction at all, and the AIF regulations state expressly that a fund may raise money from any investor, whether Indian, foreign or non-resident Indian. GIFT City goes further: its rules list persons resident outside India and non-resident Indians as eligible investors, and you are not subject to the annual remittance cap that constrains India-resident investors.',
          'The exchange-control layer is where the planning sits. Listed-share purchases on a repatriable basis run through a designated bank branch, with an individual limit of under 10% of a company and 24% for all non-resident individuals together. Investments on a non-repatriable basis are treated as domestic investment. Units of investment vehicles such as AIFs have their own route.',
          'Money in an NRO account can be remitted out up to one million US dollars per financial year, with documentation. If repatriability matters to you, decide the route before you invest, not afterwards — moving between them later is the expensive way to do it.',
        ],
        sources: INDIAN_MINIMUMS,
      },
      {
        q: 'What are the minimums?',
        a: [
          'In India: a PMS requires ₹50 lakh, and an AIF ₹1 crore, though accredited investors are exempt from both. The newer Specialised Investment Fund category starts at ₹10 lakh, measured across all strategies of that fund at PAN level.',
          'In GIFT City the thresholds are set in dollars and are often lower than people expect: a restricted (non-retail) scheme takes investors from US $150,000, a venture capital scheme from US $250,000, and an IFSC portfolio management mandate from US $75,000. Retail schemes have no per-investor minimum.',
          'One warning: accreditation regimes are not interchangeable. Being an accredited investor under SEBI does not make you one under IFSCA, and vice versa.',
        ],
        sources: INDIAN_MINIMUMS,
      },
      {
        q: 'Is there anything that could pull me back into the Indian tax net?',
        a: [
          'India has a deemed-residency rule aimed at people who are not liable to tax anywhere — which, by design, is a description of a UAE resident. It turns on Indian citizenship and on Indian-source income above a threshold.',
          'We are deliberately not publishing the mechanics here, for two reasons. The rule is framed around Indian citizens, and Overseas Citizen of India status is expressly not citizenship, so many readers assume it catches them when it may not. And the consequence is routinely overstated: where the rule does bite it generally produces a "not ordinarily resident" status, under which Indian-source income is taxable rather than your worldwide income.',
          'India also replaced its entire income tax statute with effect from 1 April 2026, so any page quoting section numbers for this is quoting a repealed Act. Take this one to your Chartered Accountant with your actual day counts and income figures. It is a five-minute question for someone with the current text in front of them, and a genuinely bad thing to guess at.',
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
    hook: 'Your Indian fund is probably taxed as income at 45%, not as a gain at 24% — and the loss relief does not come back.',
    capsule:
      'For a UK resident, the decisive question about an Indian fund is not its returns — it is whether that specific share class holds HMRC reporting fund status. Without it, your profit on sale is not a capital gain at all. It is an offshore income gain, charged to income tax at up to 45%, with no annual exempt amount.',
    lede:
      'This is the corridor where the quiet losses happen. Nothing goes wrong at purchase, and nothing looks wrong on the statement. The damage appears years later, on disposal, when a gain you assumed would be taxed at 24% is charged as income instead — and when the loss on the one that did not work cannot be set against it.',
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
          'If you dispose of an interest in an offshore fund that does not hold HMRC reporting fund status — or that lacked it at any point while you held it — your profit is not treated as a capital gain. It is treated as income arising at the time of disposal, and charged at your marginal income tax rate, so up to 45%.',
          'Three consequences follow, and each one costs money. There is no capital gains annual exempt amount to set against it. The dividend and savings allowances do not apply either. And if the investment loses money, the relief is asymmetric: no loss arises for these purposes, and any loss you do have can only be relieved as a capital loss — so it cannot be set against the income charge on the one that worked.',
          'Against a capital gains rate of 18% or 24%, the difference on a meaningful holding is not a rounding error.',
        ],
        sources: [
          { label: 'HMRC Investment Funds Manual IFM13412 — charge to tax on offshore income gains', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13412' },
          { label: 'HMRC IFM13550 — losses on non-reporting funds', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13550' },
        ],
      },
      {
        q: 'Are any Indian or GIFT City funds actually on HMRC\'s reporting list?',
        a: [
          'Yes — more than the usual advice suggests, and this is worth checking rather than assuming. HMRC publishes the list monthly. India-domiciled entries include several GIFT City and IFSC funds, a handful of Indian AIFs, and share classes from mainstream Indian fund houses. One GIFT City manager has gone as far as creating dedicated UK unit classes.',
          'Three caveats decide whether that helps you. Status is granted per share class, so holding the wrong class of a listed fund gives you nothing. Status runs from a stated date, and most Indian entries only appear from April 2025 onwards — so a longer-held investment may have been in a non-reporting fund for part of its life, which is enough to taint the disposal. And status can cease: at least one GIFT City fund class came off the list on 31 March 2026.',
          'The list is a published, searchable file. Check the exact share class and its dates before you subscribe, and check again before you sell.',
        ],
        sources: [
          { label: 'HMRC — Offshore funds: list of reporting funds (updated monthly)', url: 'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds' },
        ],
      },
      {
        q: 'Is reporting fund status simply better, then?',
        a: [
          'Better on disposal, but not free. A UK investor in a reporting fund must return the fund\'s reported income each year — both the distributions actually received and the undistributed excess reported income. In an accumulating fund that pays nothing out, you can owe income tax on money you have not seen.',
          'So the right framing is not "reporting good, non-reporting bad". It is that a reporting fund converts an unpredictable, high-rate charge on exit into a smaller, annual, administratively fiddly one — and preserves capital gains treatment for the growth. For most long-horizon holders that is a clearly better trade, but it does mean an annual filing obligation you should price in before you commit.',
        ],
        sources: [
          { label: 'HMRC IFM12146 — UK investors in reporting funds', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12146' },
        ],
      },
      {
        q: 'Does a PMS avoid all of this?',
        a: [
          'Probably, and for a structural reason. The UK offshore-fund rules bite on a non-UK body corporate, on property held on trust, or on arrangements creating rights in the nature of co-ownership. A genuine Indian discretionary PMS is none of those: SEBI requires that the manager must not hold client securities in its own name, so you hold listed Indian shares directly, in your own account, alongside nobody. On that basis your gains should be capital gains.',
          'Two honest caveats. HMRC has published no guidance on managed or segregated accounts, so this is a well-supported reading rather than settled law, and it turns on how your particular mandate is legally constituted — some products marketed as "PMS" are pooled.',
          'And the good tax answer carries the worst administrative burden on this page. If the offshore-fund rules do not apply, then every trade your manager makes is your own UK disposal. An active mandate can generate hundreds of disposals a year, each needing share-pooling treatment and a sterling conversion at the transaction date. Ask your manager whether they will provide UK-basis reporting before you assume this is the easy route.',
        ],
        sources: [
          { label: 'HMRC IFM12220 — definition of an offshore fund', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12220' },
          { label: 'SEBI (Portfolio Managers) Regulations, 2020', url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html' },
        ],
      },
      {
        q: 'I have just moved to the UK. Is there a window before this applies?',
        a: [
          'There may be, and it is the single most valuable piece of planning available in this corridor. The remittance basis was abolished on 6 April 2025 and replaced by the four-year foreign income and gains regime. If you are UK resident and were non-UK resident for each of the ten preceding tax years, you can claim relief on qualifying foreign income and gains for your first four years of UK residence.',
          'Crucially for this page, offshore income gains are within scope. So a returning NRI who qualifies can dispose of non-reporting Indian funds inside that window without the 45% charge — an outcome unavailable to them a year later.',
          'It is not free. Claiming forfeits your personal allowance and your capital gains annual exempt amount, even where the claim covers foreign income only. The claim must be quantified to be valid. And a further condition was added in March 2026. If you are within four years of arriving, this is worth proper advice immediately rather than at the next tax return — the window closes on a date, not on a transaction.',
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
          'The Temporary Repatriation Facility lets former remittance-basis users designate pre-6 April 2025 foreign income and gains and pay a flat charge, after which that money can be brought to the UK without further income tax. The rate is 12% for 2025-26 and 2026-27, rising to 15% for 2027-28.',
          'Watch the two different dates, because most summaries only give one. The last tax year the facility covers ends on 5 April 2028 — but the deadline for actually making a designation election runs to 31 January 2030. Publishing only the earlier date understates your window by nearly two years.',
          'The trade-off is that a designation cannot be undone once the amendment window closes, and overpayment relief is not available. So "designate early to lock in 12%" is real advice, but it is irreversible advice.',
        ],
        sources: [
          { label: 'HMRC HS264 — remittance basis and the Temporary Repatriation Facility', url: 'https://www.gov.uk/government/publications/remittance-basis-hs264-self-assessment-helpsheet/hs264-remittance-of-pre-6-april-2025-foreign-income-and-gains-and-the-temporary-repatriation-facility-trf' },
          { label: 'HMRC RDRM73400 — TRC designation', url: 'https://www.gov.uk/hmrc-internal-manuals/residence-domicile-and-remittance-basis/rdrm73400' },
        ],
      },
      {
        q: 'Is my NRE interest taxable in the UK?',
        a: [
          'Yes. NRE interest is exempt from Indian tax, but a UK resident is taxed on worldwide income, so it is fully taxable here as foreign interest. And because no Indian tax was actually paid, there is normally no foreign tax credit to claim — the exemption benefits nobody but the UK Exchequer.',
          'The India–UK treaty does contain a tax-sparing provision, under which credit can sometimes be given for tax that was spared rather than paid. Do not assume it rescues this. The provision is time-limited per source, HMRC\'s dedicated guidance page on Indian spared tax has been archived, and the surviving manual material does not address NRE interest. Treat it as unsettled and get advice before claiming it.',
          'The same logic explains why GIFT City on its own does not help a UK resident. India exempting the income simply removes the credit; the UK still taxes the whole amount. If the fund also lacks reporting status, the outcome is worse than neutral.',
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
          'It already does. India and the UK both exchange financial account information under the Common Reporting Standard, and India is listed as both a participating and a reportable jurisdiction in HMRC\'s own manuals. Your Indian bank and fund accounts are reported.',
          'If something has gone unreported, the route back is the Worldwide Disclosure Facility, which remains open and gives 90 days from HMRC\'s acknowledgement to file and pay. One detail is worth knowing and is almost never mentioned: offshore penalties are set by a territory categorisation that has not been revised since 2013, and India sits in the middle category, carrying a higher maximum penalty than assets held in Switzerland or the United States.',
          'There is also a strict liability criminal offence for failing to declare offshore income above a threshold, where no intent needs to be shown. This is a corridor where getting ahead of the problem is materially cheaper than waiting.',
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
          'No — and this is where the UK differs sharply from the US. UK law places no restriction on you as an investor. The rules bind the provider: an Indian house cannot lawfully promote to you in the UK, or carry on regulated business here, without UK authorisation or an approved promotion.',
          'So when an Indian fund declines a UK-resident applicant, that is the provider\'s own commercial and compliance decision, not a legal bar on you. There is a narrow route where you approach the provider entirely on your own initiative, but it collapses the moment the contact forms part of an organised marketing campaign — which is exactly why the answer varies house by house rather than following a rule.',
          'On the Indian side there is no barrier either. Portfolio management regulations contain no residency restriction, the AIF regulations expressly permit foreign and non-resident investors, and GIFT City\'s rules list persons resident outside India as eligible.',
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
