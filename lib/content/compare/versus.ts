import type { ComparePageContent } from './types'
import {
  DICGC,
  RBI_DEPOSITS,
  SEBI_AIF,
  SEBI_MF,
  SEBI_PMS,
  SEBI_REIT,
  SEBI_SIF,
  SEBI_STT,
  ITA_2025,
} from './sources'

const PUBLISHED = 'September 2026'
const REVIEWED = 'September 2026'

/**
 * Structure-against-structure pages. Each one exists because a reader has
 * already narrowed to two options and is choosing between them — the single
 * highest-intent moment on the whole site.
 *
 * Note what is deliberately absent: /learn/pms-vs-aif and
 * /learn/pms-vs-mutual-fund already rank on their own URLs and are NOT
 * duplicated here. The /compare hub indexes them instead. Two pages for one
 * query cannibalise each other.
 */
export const VERSUS: ComparePageContent[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'aif-vs-mutual-fund',
    kind: 'versus',
    title: 'AIF vs mutual fund: which is right for you?',
    sides: [
      { label: 'AIF', sub: '₹1 crore minimum · private, pooled', href: '/learn/what-is-aif' },
      { label: 'Mutual fund', sub: '₹500 minimum · public, pooled', href: '/learn/mutual-funds' },
    ],
    hook: 'An AIF is not a better mutual fund. It is a different instrument, and most portfolios need one of each.',
    capsule:
      "A mutual fund buys listed securities under strict SEBI limits and you can exit any business day. An AIF can hold unlisted companies, private credit and derivative hedges that a mutual fund is not permitted to hold, but asks ₹1 crore and often locks your money for years. Choose by what you need held, not by prestige.",
    metaTitle: 'AIF vs Mutual Fund: Minimums, Lock-in and Tax Compared',
    metaDescription:
      "₹1 crore against ₹500, private assets against listed ones, and pass-through against fund-level tax. A structural comparison, with the case for each stated honestly.",
    table: {
      caption: 'AIF against mutual fund — the structural differences',
      head: ['', 'AIF', 'Mutual fund'],
      rows: [
        ['Minimum', '₹1 crore (₹25 lakh for angel funds); accredited investors exempt', '₹100–5,000, and a SIP from ₹500'],
        ['What it may hold', 'Unlisted equity, private credit, real estate, derivatives, listed securities', 'Listed equity, debt, gold and specified commodities — within SEBI concentration limits'],
        ['Concentration limits', 'Wide. A Category II fund may put a large share of the corpus in one deal', 'Tight. Single-issuer and sector caps are prescribed'],
        ['Liquidity', 'Category I and II are typically closed-ended and locked for the fund life. Category III is often open-ended', 'Daily NAV; redemption proceeds normally in one to three working days'],
        ['Life of the fund', 'Fixed term, commonly 5–8 years with extensions', 'Perpetual, unless it is a fixed-maturity scheme'],
        ['How you pay in', 'Capital commitment, drawn down in tranches as deals close', 'One payment, or a SIP'],
        ['Fees', 'Fixed management fee, usually plus a performance share above a hurdle', 'A single expense ratio, capped by SEBI'],
        ['Tax character', 'Category I and II are pass-through — income is taxed in your hands as it arises. Category III is taxed inside the fund', 'Nothing is taxed until you redeem your units'],
        ['Investor cap', '1,000 investors per scheme (49 for an angel scheme)', 'Unlimited'],
        ['Who it suits', 'Investors who already own the listed market and want something it cannot give them', 'Everyone, at every size, as the core of a portfolio'],
      ],
      note: 'Category rules per SEBI. Individual schemes vary — the private placement memorandum governs.',
    },
    verdicts: [
      {
        side: 'Choose a mutual fund when',
        when: [
          'This money may be needed inside three years',
          'You want the lowest cost per rupee of listed-market exposure — nothing beats an index fund on fee',
          'Your total portfolio is under roughly ₹2 crore and a ₹1 crore ticket would be a concentrated bet',
          'You file a US or Canadian tax return, where a pooled Indian fund brings PFIC reporting',
          'You want to be taxed only when you decide to sell',
        ],
      },
      {
        side: 'Choose an AIF when',
        when: [
          'You want an asset the listed market does not contain — private credit, pre-IPO, real estate debt, a hedged book',
          '₹1 crore is a normal position for you, not a stretch',
          'You can genuinely leave the money alone for the stated fund life, with no early exit',
          'You have read the private placement memorandum, including the drawdown schedule and the distribution waterfall',
          'You accept manager selection risk: dispersion between AIF managers in the same category is far wider than between mutual funds',
        ],
      },
    ],
    sections: [
      {
        h: 'The real difference is not the minimum. It is what each one is allowed to own.',
        body: [
          "Most comparisons lead with ₹1 crore against ₹500. That is the least interesting difference, because it is just a gate.",
          'A mutual fund is a public vehicle. SEBI caps how much of one company it may hold, how much of one sector, how much in unlisted securities. Those limits exist because the person buying it might be putting in ₹500 and may not read anything.',
          'An AIF is a private placement. It is sold to at most a thousand investors who are assumed to be able to absorb a loss and read a memorandum. So the limits are loose, and it can hold things a mutual fund structurally cannot: a loan to a single developer, a stake in an unlisted company, a short position held for years.',
          '<b>That is the whole point.</b> If what you want is listed Indian equity, an AIF is an expensive way to buy something a mutual fund already gives you cheaply. If what you want is private credit, no mutual fund in India can sell it to you at any price.',
        ],
      },
      {
        h: 'The tax difference catches people out',
        body: [
          'A mutual fund is a sealed box. Whatever the manager buys and sells inside it, nothing lands in your tax return until you redeem. Compounding runs undisturbed.',
          'An AIF Category I or II is a pass-through. Income arising inside the fund is taxed in your hands in the year it arises, whether or not any cash reached you. A private credit fund earning interest will generate a tax liability on income you have not yet received.',
          'An AIF Category III is taxed inside the fund itself. You receive what is left. Simpler to administer, but you cannot set those gains against losses elsewhere in your own return.',
          'None of this makes an AIF worse. It makes the after-tax number the only one worth comparing, and it means a Category II fund needs cash set aside for the tax on income it has not distributed.',
        ],
      },
      {
        h: 'What you give up when you commit to an AIF',
        body: ['Four things, and they are all worth pricing before you sign.'],
        points: [
          '<b>Exit.</b> A closed-ended fund has no redemption window. A secondary sale, if one is possible at all, is at a discount you do not control.',
          '<b>Timing.</b> Your ₹1 crore is a commitment, not a payment. It is drawn in tranches over two or three years, so the uncalled portion sits idle earning deposit rates.',
          '<b>Comparability.</b> There is no daily NAV to check and no like-for-like benchmark. Valuation of unlisted holdings is an estimate until an exit proves it.',
          '<b>Recourse.</b> You signed a private contract. The regulatory machinery around a mis-sold mutual fund is far heavier than around a private placement you were certified sophisticated enough to buy.',
        ],
      },
      {
        h: 'A portfolio usually needs both',
        body: [
          'This is not a contest with a winner. The honest architecture for most investors above a few crore is a low-cost listed core, and a private sleeve sized so that its illiquidity never forces a decision.',
          'A useful test: if every private commitment you hold went to zero, would your life change? If the answer is yes, the sleeve is too big, whatever the expected return says.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Treating an AIF as an upgraded mutual fund',
        why: 'It is a different asset class in a different wrapper. Buying a long-only listed equity AIF to replace a listed equity mutual fund usually buys you the same exposure at several times the cost.',
      },
      {
        m: 'Committing ₹1 crore you have not stress-tested against illiquidity',
        why: 'The commitment is legally binding and drawn over years. A capital call arriving in a bad year, when your business also needs cash, is the scenario that damages people.',
      },
      {
        m: 'Comparing an AIF track record to a mutual fund track record',
        why: 'Unlisted holdings are carried at estimated value until exit. An interim internal rate of return on an unrealised book is not comparable to a mutual fund NAV series, and dispersion between AIF managers is far wider.',
      },
    ],
    faqs: [
      {
        q: 'Is an AIF riskier than a mutual fund?',
        a: 'Usually yes, but not always, and not for the reason people assume. The risk is concentration and illiquidity rather than volatility. A market-neutral Category III AIF can carry less drawdown risk than an equity mutual fund, while a venture capital Category I fund can lose the whole commitment.',
      },
      {
        q: 'Can I start an AIF with less than ₹1 crore?',
        a: 'Only if you are an accredited investor, where the minimum does not apply, or if the scheme is an angel fund, where it is ₹25 lakh. There is no legitimate way to pool with friends to clear the threshold — the minimum is per investor.',
      },
      {
        q: 'Do AIFs beat mutual funds?',
        a: 'The question does not have an answer, because they do not hold the same things. A private credit AIF and an equity mutual fund are not competing for the same job. Compare an AIF to the alternative way of getting that same exposure, not to your equity fund.',
      },
      {
        q: 'Which is better for an NRI?',
        a: 'Both are open to NRIs, subject to FEMA routing and the fund house accepting your jurisdiction. For a US or Canadian taxpayer the calculus changes completely, because pooled Indian funds generally bring PFIC reporting. Read the corridor guide for your country before shortlisting either.',
      },
    ],
    related: [
      { label: 'What is an AIF?', href: '/learn/what-is-aif' },
      { label: 'AIF Category I, II and III explained', href: '/learn/aif-categories-explained' },
      { label: 'PMS vs AIF', href: '/learn/pms-vs-aif' },
      { label: 'AIF minimum investment', href: '/learn/aif-minimum-investment' },
      { label: 'Market-neutral AIF vs arbitrage fund', href: '/compare/market-neutral-aif-vs-arbitrage-fund' },
      { label: 'Can an NRI invest in an AIF?', href: '/learn/can-nri-invest-in-aif' },
      { label: 'The full tax schedule', href: '/tax' },
    ],
    sources: [SEBI_AIF, SEBI_MF, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'sif-vs-pms',
    kind: 'versus',
    title: 'SIF vs PMS: which suits ₹10 lakh to ₹1 crore?',
    sides: [
      { label: 'SIF', sub: '₹10 lakh minimum · pooled units', href: '/learn/long-short-sif' },
      { label: 'PMS', sub: '₹50 lakh minimum · your own demat', href: '/learn/what-is-pms' },
    ],
    hook: 'For most people between ₹10 lakh and ₹50 lakh, the SIF is not a compromise. It is the better instrument.',
    capsule:
      'A Specialised Investment Fund pools your money into units at a ₹10 lakh minimum and can hedge, short and use derivatives. A PMS holds shares in your own demat account at a ₹50 lakh minimum and can be tailored to you. The SIF taxes you only on redemption; the PMS taxes every trade your manager makes.',
    metaTitle: 'SIF vs PMS: ₹10 Lakh or ₹50 Lakh, and the Tax Gap',
    metaDescription:
      "SEBI's newest category against portfolio management. Ownership, minimums, hedging powers and the churn-tax difference that decides it for most investors.",
    table: {
      caption: 'SIF against PMS',
      head: ['', 'SIF', 'PMS'],
      rows: [
        ['Minimum', '₹10 lakh across the SIF strategies of one fund house', '₹50 lakh per portfolio manager; accredited investors exempt'],
        ['What you own', 'Units of a scheme', 'The shares themselves, in your own demat account'],
        ['Regulated as', 'A distinct SEBI category, operated by a registered mutual fund house', 'A SEBI-registered portfolio manager'],
        ['Can it hedge or short?', 'Yes — derivative exposure well beyond mutual fund limits', 'Limited. A PMS is largely a long-only cash-market vehicle'],
        ['Customisation', 'None. Everyone in the strategy holds the same book', 'Possible — exclusions and mandates can be negotiated at size'],
        ['Transparency', 'Scheme-level disclosure on the published cadence', 'Every holding and every trade, in your own account, continuously'],
        ['Liquidity', 'Scheme-defined subscription and redemption windows', 'Exit usually settles within days — you instruct the sale'],
        ['Fees', 'A single expense ratio', 'A fixed fee, or a fixed fee plus a performance share above a hurdle'],
        ['Tax', 'Nothing until you redeem. An equity-oriented scheme is taxed as equity', 'Every sale your manager makes is your sale, in your return, that year'],
        ['Portability', 'Redeem and move', 'Shares can often be transferred out in specie rather than sold'],
      ],
      note: 'SIF is a young category. Operating practice is still settling — read the scheme information document, not a summary.',
    },
    verdicts: [
      {
        side: 'Choose a SIF when',
        when: [
          'You have between ₹10 lakh and ₹50 lakh earmarked for this',
          'You want a hedged or long-short return profile rather than pure market beta',
          'You would rather not have a tax event every time a manager changes their mind',
          'You do not need the portfolio shaped around your existing holdings',
          'You value a mutual-fund-grade operational spine: a registered AMC, a trustee, a published scheme document',
        ],
      },
      {
        side: 'Choose a PMS when',
        when: [
          'You have ₹50 lakh or more and this is not your whole liquid portfolio',
          'You want to see every holding and every trade as it happens',
          'You need exclusions — your own company, a sector you are already exposed to through your business',
          'Direct ownership matters to you, including the ability to move stock out rather than sell it',
          'You are backing a specific manager, and that manager only runs a PMS',
        ],
      },
    ],
    sections: [
      {
        h: 'Why the SIF exists at all',
        body: [
          'SEBI created it to close a gap. Below ₹50 lakh, an Indian investor had no regulated way to buy a hedged strategy. Above it, the same investor had to accept either PMS churn tax or a ₹1 crore AIF ticket.',
          'The SIF sits in the middle: a ₹10 lakh entry, mutual fund tax treatment, and permission to use derivatives in ways a mutual fund cannot. It is run by existing mutual fund houses under a separate brand and a separate set of rules.',
          'That lineage is a genuine advantage. A SIF inherits the AMC operational machinery — trustee oversight, a registrar, a published scheme document — which a boutique portfolio manager has to build itself.',
        ],
      },
      {
        h: 'The churn tax is the argument, and it is bigger than the fee argument',
        body: [
          'This is the point most comparisons bury, and it is usually the one that decides.',
          'In a PMS, the shares are yours. When your manager sells a holding, you have sold it. The gain lands in your tax return for that year even though you never saw the cash — it was reinvested. A high-turnover PMS therefore hands you an annual tax bill that shrinks the capital left compounding.',
          'In a SIF you hold units. The manager can trade as much as they like inside the scheme and nothing touches your return until you redeem. The full amount keeps compounding.',
          'Over a long holding period, that difference can matter more than a percentage point of fee. It does not make PMS wrong — direct ownership buys you things units cannot — but the comparison has to be after tax or it is not a comparison.',
        ],
      },
      {
        h: 'What the PMS gives you that a SIF cannot',
        body: ['Three things, and for some investors any one of them settles it.'],
        points: [
          '<b>Your name on the shares.</b> If the manager fails commercially, your holdings sit in your demat account. They were never the manager\'s assets.',
          '<b>Exclusions.</b> A promoter already carrying concentrated exposure to their own sector can have it carved out. A pooled scheme cannot do that for one investor.',
          '<b>Full transparency.</b> You see the trades, not a factsheet. For an investor who wants to understand what they own, this is not a small thing.',
        ],
      },
      {
        h: 'An honest caution about the category',
        body: [
          'The SIF framework is recent. Track records are short, the strategies are new, and the teams running them are being assembled rather than proven.',
          'A long track record in long-only equity does not transfer to running a hedged book. Ask who specifically manages the strategy, what they ran before, and how the derivative exposure is actually constructed. Treat a SIF as a new category with real promise, not as a settled one.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Choosing a PMS purely because the minimum is higher',
        why: 'A higher gate is not a quality signal. It is a regulatory threshold. The right question is which structure holds what you want held, on tax terms you can live with.',
      },
      {
        m: 'Comparing a PMS return to a SIF return without adjusting for tax',
        why: 'A PMS return is stated before the tax its own churn creates in your hands. A SIF return needs no such adjustment until you redeem. Comparing the two headline numbers flatters the PMS.',
      },
      {
        m: 'Assuming a ₹10 lakh minimum means low risk',
        why: 'The minimum reflects who SEBI thinks should be allowed in, not how the strategy behaves. A long-short SIF uses derivatives and can lose money in ways a plain equity fund cannot.',
      },
    ],
    faqs: [
      {
        q: 'Is a SIF the same as a mutual fund?',
        a: 'No. It is run by a mutual fund house and taxed like one, but it operates under a separate SEBI framework with a ₹10 lakh minimum and far wider derivative powers. The scheme documentation and the branding are kept distinct from the AMC\'s ordinary schemes.',
      },
      {
        q: 'Can I hold both a SIF and a PMS?',
        a: 'Yes, and above roughly ₹1 crore of liquid assets that is often the sensible answer — the SIF for the hedged sleeve, the PMS for concentrated long equity where you want direct ownership.',
      },
      {
        q: 'Is the ₹10 lakh minimum per scheme?',
        a: 'It applies across the SIF strategies you hold with one fund house, not per scheme. Read the scheme information document, because the aggregation rules are what determine whether you actually clear the threshold.',
      },
      {
        q: 'Which is better for an NRI?',
        a: 'A PMS is generally the more established route for a non-resident, because the account structure and the FEMA routing are well worn. The SIF route is newer and fund-house policies on non-resident investors are still varying. For a US or Canadian taxpayer, both pooled and direct routes need PFIC advice first.',
      },
    ],
    related: [
      { label: 'Long-short SIFs — the specification', href: '/learn/long-short-sif' },
      { label: 'SIF minimum investment', href: '/learn/sif-minimum-investment' },
      { label: 'SIF vs mutual fund', href: '/compare/sif-vs-mutual-fund' },
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'PMS fees explained', href: '/learn/pms-fees-explained' },
      { label: 'PMS vs mutual fund', href: '/learn/pms-vs-mutual-fund' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_SIF, SEBI_PMS, SEBI_MF, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pms-vs-direct-equity',
    kind: 'versus',
    title: 'PMS vs managing your own stocks',
    sides: [
      { label: 'PMS', sub: 'A manager runs it · ₹50 lakh minimum', href: '/learn/what-is-pms' },
      { label: 'Direct equity', sub: 'You run it · no minimum' },
    ],
    hook: 'If you already beat the index over a full cycle with your own money, a PMS has almost nothing to sell you.',
    capsule:
      'Both end with shares in your own demat account and both tax you on every sale. The only real difference is who decides, and what that decision costs. A PMS charges roughly two per cent a year plus a performance share; running it yourself costs brokerage. The manager has to clear that gap before you are ahead.',
    metaTitle: 'PMS vs Direct Equity: Is a Portfolio Manager Worth 2%?',
    metaDescription:
      'Same demat account, same tax treatment, different decision-maker. The break-even alpha a PMS must deliver, and the four cases where paying for one is rational.',
    table: {
      caption: 'PMS against running your own book',
      head: ['', 'PMS', 'Direct equity'],
      rows: [
        ['Who decides', 'A SEBI-registered portfolio manager, under a discretionary mandate', 'You, on every trade'],
        ['Where the shares sit', 'Your own demat account', 'Your own demat account'],
        ['Minimum', '₹50 lakh per manager', 'The price of one share'],
        ['Annual cost', 'Typically a fixed fee around 1–2.5%, often plus a performance share above a hurdle, plus GST, brokerage and custody', 'Brokerage and statutory charges only'],
        ['Research', 'A funded team, company access, and a written investment process', 'Whatever you can do around a day job'],
        ['Behaviour under stress', 'Someone else sells; you are not asked', 'You decide, in the middle of the drawdown'],
        ['Tax', 'Every manager sale is your sale that year', 'Every sale is your sale that year — but you control turnover'],
        ['Concentration', 'Usually 15–30 names under a stated process', 'Whatever you chose, which is often more concentrated than you think'],
        ['Reporting', 'Consolidated statements, benchmarked, audited', 'Your own spreadsheet'],
        ['Exit', 'Terminate the mandate; stock can often move out in specie', 'Sell whenever you like'],
      ],
    },
    numbers: {
      caption: 'What the manager has to beat — illustrative, on ₹1 crore',
      head: ['Cost line', 'Typical range', 'On ₹1 crore'],
      rows: [
        ['Fixed management fee', '1.0% – 2.5% p.a.', '₹1,00,000 – ₹2,50,000'],
        ['GST on fees', '18% of the fee', '₹18,000 – ₹45,000'],
        ['Brokerage and statutory charges', 'Varies with turnover', 'Higher the more the manager trades'],
        ['Performance share', 'Often 10–20% above a hurdle', 'Only in a good year — but not refunded in a bad one'],
        ['Tax drag from churn', 'Varies with turnover', 'A real cost, and invisible in the headline return'],
      ],
      note: 'Illustrative structure only, not a quote. Every portfolio manager publishes its own fee schedule in its disclosure document — read that. Before agreeing to a performance fee, ask whether it carries a high-water mark.',
    },
    verdicts: [
      {
        side: 'Run it yourself when',
        when: [
          'You have a written process and you have followed it through at least one full market cycle, including a serious drawdown',
          'You can show your own returns against an index, honestly, including the positions you would rather forget',
          'You enjoy the work — because done properly it is work, not a hobby',
          'Your portfolio is diversified by design rather than by accident',
          'You would rather own an index fund than pay a fee, which is a perfectly rational position',
        ],
      },
      {
        side: 'Pay for a PMS when',
        when: [
          'You want concentrated, research-led exposure — small and microcap especially — that you cannot properly diligence yourself',
          'Your own record does not beat the index once you count the trades you forgot about',
          'Your time is worth more deployed in your business than in reading annual reports',
          'You need someone between you and the panic button in a 30% drawdown',
          'You want a structured, benchmarked, auditable record of the equity sleeve — for a family settlement, a lender, or your own governance',
        ],
      },
    ],
    sections: [
      {
        h: 'Work out your break-even before anything else',
        body: [
          'A PMS is not competing with your stock picks. It is competing with a low-cost index fund, because that is the alternative that requires nothing of you.',
          'Add the fixed fee, GST on it, brokerage on the manager\'s turnover, custody and the performance share. Call it roughly two to three per cent a year in an average year. That is the alpha the manager must produce, every year, before you are better off than in an index fund.',
          'Over ten years that gap compounds into a large number. It is not an argument against PMS — good managers clear it — but it is the number you should make someone justify, out loud, before you sign.',
        ],
      },
      {
        h: 'The honest case for paying someone',
        body: [
          'Three arguments survive scrutiny, and none of them is "professionals are smarter than you".',
          '<b>Access to what you cannot diligence.</b> Small and microcap investing needs management meetings, channel checks and position sizing discipline. A funded team can do that. An individual with a day job usually cannot.',
          '<b>A circuit breaker.</b> The largest cost in most self-managed portfolios is not selection. It is the investor selling at the bottom of a drawdown. A discretionary mandate removes your hand from the switch, which is worth paying for if you know that is your weakness.',
          '<b>Opportunity cost.</b> A business owner compounding capital in their own business at a high rate should not be spending weekends on annual reports. Outsourcing is rational even if the manager only matches the index.',
        ],
      },
      {
        h: 'Turnover is the cost nobody quotes you',
        body: [
          'A PMS holds shares in your name, so every sale the manager makes is a taxable event in your return that year — even though the proceeds were reinvested and you never saw the cash.',
          'Two managers with identical gross returns can leave you with materially different after-tax outcomes if one trades twice as much. Ask for portfolio turnover, in writing, for the last three years. Very few prospective clients do, and it is one of the most revealing questions you can ask.',
          'This is also why a pooled structure — a mutual fund, a SIF, a Category III AIF — can win on after-tax terms with a lower gross return.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Comparing a PMS track record to your own remembered returns',
        why: 'Memory edits out the losses. Pull your actual contract notes, compute an honest money-weighted return, and compare that. Most people discover they underperformed the index they were trying to beat.',
      },
      {
        m: 'Judging a PMS on its one-year number',
        why: 'One year tells you about the market, not the manager. Ask for a full-cycle record including the worst drawdown and how long recovery took — and check whether the record is of the strategy or of the specific person still running it.',
      },
      {
        m: 'Signing a performance fee without a high-water mark',
        why: 'Without one you can pay a performance share, lose the gain the following year, and pay again when the same ground is recovered. Ask explicitly, and get the answer in the agreement rather than in conversation.',
      },
    ],
    faqs: [
      {
        q: 'Do I keep control of my shares in a PMS?',
        a: 'The shares stay in your own demat account in your name, but under a discretionary mandate the manager trades without asking you first. You own the assets; you have delegated the decisions. A non-discretionary mandate, where you approve each trade, exists but is much less common.',
      },
      {
        q: 'Is PMS better than direct equity for tax?',
        a: 'No. It is identical in character and often worse in practice, because a professional manager usually trades more than you do. Both tax you on every sale in the year it happens. If tax deferral is the priority, a pooled structure is the answer, not a PMS.',
      },
      {
        q: 'What return should a PMS deliver to be worth it?',
        a: 'Enough to beat a low-cost index fund after all fees, GST, brokerage and the tax its own turnover creates. In an average year that is roughly two to three per cent of alpha before you are even level.',
      },
      {
        q: 'Can I run both?',
        a: 'Many people do, and it is a reasonable structure: a PMS for the concentrated research-led sleeve, a self-managed book for convictions you want to hold yourself. Just count them as one portfolio when you measure concentration.',
      },
    ],
    related: [
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'PMS fees explained', href: '/learn/pms-fees-explained' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'PMS vs mutual fund', href: '/learn/pms-vs-mutual-fund' },
      { label: 'High-alpha equity PMS — the specification', href: '/learn/equity-pms' },
      { label: 'The full tax schedule', href: '/tax' },
    ],
    sources: [SEBI_PMS, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'reits-vs-physical-real-estate',
    kind: 'versus',
    title: 'REITs vs buying property: which is the better landlord?',
    sides: [
      { label: 'REITs and InvITs', sub: 'Listed units · a few hundred rupees', href: '/learn/reits-invits' },
      { label: 'Physical property', sub: 'Whole asset · ₹50 lakh and up' },
    ],
    hook: 'A REIT gives you the rent without the tenant, the registrar, the broker or the fifteen per cent round-trip cost.',
    capsule:
      'A REIT is a listed trust that owns income-producing commercial property and must distribute the bulk of its cash flow to unit holders. You can buy a unit for a few hundred rupees and sell it the same day. A flat costs lakhs in stamp duty and brokerage to enter and exit, and takes months to sell.',
    metaTitle: 'REITs vs Physical Property: Yield, Costs and Liquidity',
    metaDescription:
      'Listed commercial real estate against a bought flat. Entry costs, rental yield, liquidity, tax and leverage compared — and where physical property still wins.',
    table: {
      caption: 'Listed REIT against directly owned property',
      head: ['', 'REIT / InvIT', 'Physical property'],
      rows: [
        ['Entry ticket', 'The price of one unit — a few hundred rupees', 'The whole asset, typically ₹50 lakh upward'],
        ['Cost to buy', 'Brokerage and statutory charges', 'Stamp duty, registration, brokerage and legal — frequently 6–8% of value'],
        ['Cost to sell', 'Brokerage, on the exchange, same day', 'Brokerage plus months of search; often another 1–2%'],
        ['Round trip', 'Fractions of a per cent', 'Commonly close to a tenth of the asset, before any price movement'],
        ['Time to exit', 'Minutes, at the quoted price', 'Months, at whatever the market offers'],
        ['Divisibility', 'Sell any number of units', 'All or nothing'],
        ['Asset quality', 'Institutional-grade commercial — Grade A offices, malls, warehousing', 'Whatever you could afford in your own city'],
        ['Diversification', 'Many tenants, many buildings, often several cities, in one unit', 'One building, often one tenant'],
        ['Who manages it', 'A professional manager under a SEBI-regulated trust structure', 'You. Tenants, repairs, society dues, vacancy'],
        ['Income', 'Regular distributions, mandated as a high share of distributable cash flow', 'Rent, when the tenant pays, less costs and vacancy'],
        ['Leverage', 'Limited. Borrowing against listed units is possible but modest', 'A home loan is the cheapest large borrowing available to an individual'],
        ['Price visibility', 'Continuous, public and sometimes uncomfortable', 'Unobserved, which feels like stability but is not'],
      ],
    },
    verdicts: [
      {
        side: 'Choose REITs or InvITs when',
        when: [
          'You want property income rather than a property',
          'You want to be able to exit part of the position, quickly, at a known price',
          'You are diversifying an existing portfolio that is already heavy in one city or one building',
          'You have no appetite for tenants, litigation, society politics or a vacant unit',
          'You are an NRI who would rather not manage an Indian asset remotely',
        ],
      },
      {
        side: 'Choose physical property when',
        when: [
          'You will live in it — a home is a consumption decision, not an investment one, and that is fine',
          'You want to use cheap long-dated leverage, which is the single strongest argument for property',
          'You have genuine local information advantage — a corridor you understand better than the market does',
          'You are buying commercial space for your own business',
          'Control matters: you want to redevelop, subdivide or hold across generations',
        ],
      },
    ],
    sections: [
      {
        h: 'The round-trip cost is the argument most people never run',
        body: [
          'Stamp duty, registration, brokerage and legal fees on the way in. Brokerage and months of search on the way out.',
          'Round-tripping a flat commonly costs close to a tenth of the asset before the price has moved at all. That is several years of rental yield spent on transacting.',
          'A REIT unit round-trips for a fraction of a per cent on an exchange. It does not make the underlying asset better — it makes the decision to enter or leave cheap, and cheap decisions are reversible ones.',
        ],
      },
      {
        h: 'Illiquidity is not the same as stability',
        body: [
          'A listed REIT unit has a price every second, and it falls visibly when sentiment turns. A flat has no quoted price, so it feels stable.',
          'It is not. It is simply unobserved. The flat is also falling; nobody is telling you. You discover it only when you try to sell, which is usually the moment you most need the money.',
          'People routinely pay a large premium for the comfort of not being told. That is a real preference and worth acknowledging — but it should be recognised as a preference, not mistaken for lower risk.',
        ],
      },
      {
        h: 'Where physical property genuinely wins: leverage',
        body: [
          'This is the strongest argument for owning the building, and it deserves to be stated plainly.',
          'A home loan is long-dated, secured at a low rate, and available in size to an ordinary salaried person. No one will lend you the equivalent against REIT units on those terms.',
          'If an asset appreciates and you funded most of it with cheap debt, the return on your own equity is transformed. That is why generations of Indian wealth were built in property rather than in securities.',
          'The same leverage cuts the other way in a flat market, and the loan payment continues through a vacancy. But it is a real structural advantage that listed real estate does not offer.',
        ],
      },
      {
        h: 'What a REIT will not do for you',
        body: ['Three honest limits.'],
        points: [
          '<b>It moves with the market.</b> Units are listed, so sentiment moves the price even when the buildings and the rent roll have not changed.',
          '<b>You do not choose the assets.</b> The manager does, and you inherit their decisions on acquisitions, debt and tenant mix.',
          '<b>Distributions are not guaranteed.</b> They depend on occupancy and rent collection. A commercial downturn reduces them, and nothing about the structure prevents that.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Comparing rental yield to REIT distribution yield without counting costs',
        why: 'The advertised rental yield on a flat rarely nets off society dues, maintenance, property tax, vacancy and the agent\'s cut. Net yield is frequently far lower than the number quoted at the time of purchase.',
      },
      {
        m: 'Counting the family home as a property allocation',
        why: 'A house you live in is consumption you happen to own. You cannot sell a floor of it to fund something else. Measure your investment property exposure without it, and most people find they are less diversified than they believed.',
      },
      {
        m: 'Buying a second flat in the same city you already own one in',
        why: 'That is doubling a single-city, single-asset-class bet, usually with leverage, usually in the market your own business also depends on. Correlation is not reduced by owning two of the same thing.',
      },
    ],
    faqs: [
      {
        q: 'Are REITs safe?',
        a: 'They are regulated, professionally managed, and hold institutional-grade assets, but the units are listed and the price moves daily. Distributions depend on occupancy and rent collection. Safe from operational headaches; not safe from price movement.',
      },
      {
        q: 'How much do I need to start?',
        a: 'The price of one unit, which is a few hundred rupees. That is the single biggest practical difference from physical property, and it is what makes a REIT usable as a diversifier rather than as a life decision.',
      },
      {
        q: 'Can an NRI invest in Indian REITs?',
        a: 'Yes, through the usual non-resident routing under FEMA, and for many NRIs it is a far more practical way to hold Indian real estate than owning and managing a physical asset from abroad. Confirm the repatriation route before you buy.',
      },
      {
        q: 'Do REITs beat property returns?',
        a: 'Not a question with a general answer, because a leveraged property purchase and an unleveraged REIT holding are different bets. Compare them on net yield after all costs, on liquidity, and on what happens to each when you need the money quickly.',
      },
    ],
    related: [
      { label: 'REITs and InvITs — the specification', href: '/learn/reits-invits' },
      { label: 'Alternatives to buying an investment property', href: '/compare/real-estate-investment-alternatives' },
      { label: 'Private credit and real estate debt', href: '/learn/private-credit-real-estate-debt' },
      { label: 'The full tax schedule', href: '/tax' },
    ],
    sources: [SEBI_REIT, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'private-credit-vs-fixed-deposit',
    kind: 'versus',
    title: 'Private credit vs fixed deposit: is the extra yield worth it?',
    sides: [
      { label: 'Private credit AIF', sub: '₹1 crore · no deposit insurance', href: '/learn/private-credit-real-estate-debt' },
      { label: 'Bank fixed deposit', sub: '₹1 lakh · insured to ₹5 lakh' },
    ],
    hook: 'The extra yield is not free money. It is payment for taking credit risk a bank refused, and for not being able to leave.',
    capsule:
      'A fixed deposit is a bank obligation, insured up to ₹5 lakh per bank per depositor, and you can break it. A private credit fund lends to companies at higher rates, asks ₹1 crore, locks you in for years, and carries real default risk with no insurance behind it. The spread is the price of that difference.',
    metaTitle: 'Private Credit vs Fixed Deposit: What the Extra Yield Buys',
    metaDescription:
      'Higher yield against deposit insurance, liquidity and simplicity. What a private credit AIF actually risks, how it is taxed, and when an FD is the better answer.',
    table: {
      caption: 'Private credit AIF against a bank fixed deposit',
      head: ['', 'Private credit AIF', 'Fixed deposit'],
      rows: [
        ['Minimum', '₹1 crore (Category II AIF)', '₹1,000 upward at most banks'],
        ['What you are lending to', 'Companies and projects a bank declined or could not serve quickly', 'A regulated bank'],
        ['Protection if it fails', 'None beyond the security package the fund negotiated', 'DICGC insurance to ₹5 lakh per depositor per bank, principal and interest combined'],
        ['Indicative return', '12–20% p.a., indicative and not contractual', 'Contractually fixed at the rate on your deposit receipt'],
        ['Certainty of return', 'None. Returns depend on borrowers repaying', 'Certain, subject to the bank'],
        ['Liquidity', 'Locked for the fund life, commonly several years', 'Breakable, usually with a small penalty'],
        ['Concentration', 'A handful of borrowers. One default is felt', 'Spread across the bank\'s entire balance sheet'],
        ['Cash flow', 'Distributions as borrowers pay, often irregular', 'Monthly, quarterly or at maturity, as you choose'],
        ['Tax', 'Category II is pass-through — interest is taxed in your hands as it arises, whether or not distributed', 'Interest taxed at your slab rate each year, with TDS'],
        ['Effort', 'Read the memorandum, diligence the manager, track drawdowns and capital calls', 'Fill a form'],
      ],
      note: 'Indicative ranges, not offers or guarantees. The private placement memorandum of any specific fund governs.',
    },
    verdicts: [
      {
        side: 'Keep it in a fixed deposit when',
        when: [
          'This is emergency money, or money with a job inside three years',
          'It is a business float, or working capital you might call on',
          'Losing it would change how you live, not just how you feel',
          'You are at or below ₹5 lakh per bank and want the deposit insurance to actually cover you',
          'You want certainty, and you are willing to pay for it in foregone yield — a completely legitimate choice',
        ],
      },
      {
        side: 'Consider private credit when',
        when: [
          'This is surplus above a fully funded emergency reserve and all short-dated obligations',
          '₹1 crore is a normal position size for you, not a concentration',
          'You can leave it untouched for the full fund life, with no early exit',
          'You have read the memorandum: security cover, borrower concentration, the distribution waterfall, and where you sit in it',
          'You can fund the tax on accrued income before the cash is distributed to you',
        ],
      },
    ],
    sections: [
      {
        h: 'Where the extra yield actually comes from',
        body: [
          'It is not skill, and it is not a market inefficiency anyone is giving away. It is compensation for three specific things you are accepting.',
          '<b>Credit risk.</b> The borrower could not get bank funding at that rate, or could not get it fast enough. Sometimes that is a timing story with good security behind it. Sometimes the bank was right.',
          '<b>Illiquidity.</b> You cannot leave. A deposit can be broken tomorrow for a small penalty; a closed-ended fund commitment cannot be unwound at all.',
          '<b>Complexity.</b> Structured security, covenants, a waterfall that decides who gets paid first. Understanding your seat in that waterfall is the actual work.',
          'A manager who cannot explain, in plain words, which of these three they are being paid for is not a manager worth ₹1 crore.',
        ],
      },
      {
        h: 'The tax timing problem',
        body: [
          'A Category II AIF is a pass-through. Interest income arising inside the fund is taxed in your hands in the year it arises — not in the year the cash reaches you.',
          'So you can owe tax on income the fund has accrued but not yet distributed. The cash for that liability has to come from somewhere else.',
          'Deposit interest is simpler: taxed at your slab each year, with tax deducted at source, and the cash is actually in your hands.',
          'Compare the two after tax, on the cash you actually receive and when you receive it. A headline gap of several percentage points narrows once you do.',
        ],
      },
      {
        h: 'Deposit insurance is smaller than most people think',
        body: [
          'DICGC cover is ₹5 lakh per depositor per bank, principal and interest combined. Not per deposit, and not per branch.',
          'So a ₹1 crore fixed deposit at a single bank is insured to ₹5 lakh. The other ₹95 lakh is an unsecured claim on that bank.',
          'For a large, well-capitalised bank that is a remote concern. For a small co-operative bank offering a rate noticeably above the market, the rate is telling you something about the risk, and the insurance will not cover most of your money.',
          '<b>If you are holding FDs in size, spread them across banks.</b> It costs nothing and it is the only way the insurance does any work for you.',
        ],
      },
      {
        h: 'The comparison that is actually fair',
        body: [
          'A fixed deposit and a private credit fund are not competing for the same rupee. They sit at opposite ends of a portfolio.',
          'The FD is where money lives when it has a job soon, or when it must be there regardless. Private credit is where surplus goes when the only cost of leaving it alone is patience.',
          'If you are choosing between them for the same rupee, the money is probably not surplus, and the answer is the deposit.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Comparing the headline yields',
        why: 'One number is contractual and the other is indicative and pre-default. The honest comparison is the FD rate against the private credit return after realistic default assumptions, after fees, and after the tax you pay before the cash arrives.',
      },
      {
        m: 'Holding a large fixed deposit at one small bank for the extra rate',
        why: 'Insurance stops at ₹5 lakh per bank. A materially above-market deposit rate is a price signal about the institution, not a gift, and the uninsured balance is a straight credit exposure.',
      },
      {
        m: 'Sizing a private credit commitment as if it were a deposit',
        why: 'A deposit can be broken. A closed-ended commitment cannot. Size it against the money you will genuinely not need for the full fund life, then subtract a margin for the year everything happens at once.',
      },
    ],
    faqs: [
      {
        q: 'Can I lose my capital in a private credit fund?',
        a: 'Yes. You are lending to companies, and companies default. The security package and the manager\'s underwriting are what stand between you and a loss, and neither is a guarantee. There is no deposit insurance behind any of it.',
      },
      {
        q: 'Is private credit safer than equity?',
        a: 'Different rather than safer. Debt ranks ahead of equity if the borrower fails, so recovery is usually better. But you have no upside beyond the coupon, and you cannot exit when you want to — which equity in a listed company always allows.',
      },
      {
        q: 'What is a sensible size for a private credit allocation?',
        a: 'A figure that would not change your plans if it returned nothing. For most investors that is a modest slice of the total portfolio, spread across more than one manager and vintage, and only after short-dated needs are fully funded elsewhere.',
      },
      {
        q: 'Is there anything between an FD and a private credit AIF?',
        a: 'Yes — debt mutual funds, structured debt, debt PMS and REIT distributions all sit in between on both yield and liquidity. The choice is rarely binary, and the middle of that range is where most portfolios should actually be.',
      },
    ],
    related: [
      { label: 'Private credit and real estate debt — the specification', href: '/learn/private-credit-real-estate-debt' },
      { label: 'Where to put money instead of a fixed deposit', href: '/compare/fixed-deposit-alternatives' },
      { label: 'FD+ and structured debt', href: '/learn/fd-plus-structured-debt' },
      { label: 'Debt PMS', href: '/learn/debt-pms' },
      { label: 'AIF Category I, II and III explained', href: '/learn/aif-categories-explained' },
    ],
    sources: [SEBI_AIF, DICGC, RBI_DEPOSITS, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'sif-vs-mutual-fund',
    kind: 'versus',
    title: 'SIF vs mutual fund: what the ₹10 lakh buys you',
    sides: [
      { label: 'SIF', sub: '₹10 lakh · can short and hedge', href: '/learn/long-short-sif' },
      { label: 'Mutual fund', sub: '₹500 · long-only, capped', href: '/learn/mutual-funds' },
    ],
    hook: 'Same fund house, same tax treatment, twenty times the minimum. The only thing you are paying for is permission to short.',
    capsule:
      'Both are run by registered mutual fund houses and an equity-oriented scheme of either is taxed the same way. The difference is what the manager may do: a SIF can take meaningful short and derivative positions to hedge, which a mutual fund cannot. That permission is what the ₹10 lakh minimum gates.',
    metaTitle: 'SIF vs Mutual Fund: Hedging Powers, Minimum and Tax',
    metaDescription:
      "SEBI's Specialised Investment Fund against an ordinary mutual fund. What a SIF may hold that a mutual fund cannot, the ₹10 lakh threshold, and where the tax is identical.",
    table: {
      caption: 'SIF against an ordinary mutual fund scheme',
      head: ['', 'SIF', 'Mutual fund'],
      rows: [
        ['Minimum', '₹10 lakh across the SIF strategies of one fund house', '₹100–5,000, and a SIP from ₹500'],
        ['Who runs it', 'A registered mutual fund house, under a separate SEBI framework and separate branding', 'The same kind of house, under the mutual fund regulations'],
        ['Can it short?', 'Yes — meaningful short and derivative exposure is the point of the category', 'Only within narrow limits; a mutual fund is effectively long-only'],
        ['Concentration limits', 'Wider than mutual fund limits, but still prescribed — this is not an AIF', 'Tight single-issuer and sector caps'],
        ['Liquidity', 'Scheme-defined subscription and redemption windows', 'Daily NAV; proceeds normally in one to three working days'],
        ['Tax', 'Nothing until you redeem. An equity-oriented scheme is taxed as equity', 'Identical — nothing until you redeem'],
        ['Fees', 'A single expense ratio', 'A single expense ratio, capped by SEBI'],
        ['Operational spine', 'Trustee, registrar, published scheme document — the full AMC machinery', 'The same machinery'],
        ['Track record', 'Short. The category and most of its teams are new', 'Decades, across full cycles, in most categories'],
        ['What it is for', 'A sleeve that behaves differently from the index in a drawdown', 'The core of a portfolio, at the lowest cost per rupee of exposure'],
      ],
      note: 'SIF is a young category and operating practice is still settling. Read the scheme information document rather than a summary.',
    },
    verdicts: [
      {
        side: 'Stay with mutual funds when',
        when: [
          'This is your core listed allocation — nothing beats an index fund on cost for that job',
          'You might need the money on short notice, and want daily redemption rather than a window',
          'You have less than ₹10 lakh for this, in which case the question does not arise',
          'You do not actually want a hedge, you want market exposure — most portfolios do',
          'You would rather back a strategy with a decade of evidence than one with a year of it',
        ],
      },
      {
        side: 'Add a SIF when',
        when: [
          'Everything you own falls at the same time, and you want a sleeve that does not',
          'You have ₹10 lakh or more that is genuinely surplus to the core',
          'You want hedged exposure but a ₹1 crore Category III AIF ticket is out of proportion',
          'You value tax deferral — a SIF gives you a hedged book without a PMS-style annual tax bill',
          'You have read who specifically runs the strategy and what they ran before it',
        ],
      },
    ],
    sections: [
      {
        h: 'The ₹10 lakh is a permission fee, not a quality fee',
        body: [
          'It helps to see what SEBI actually did here. It did not create a better mutual fund. It created a category where a mutual fund house is allowed to run strategies the mutual fund rules forbid.',
          'A mutual fund is sold to anyone with ₹500, so the rules assume the buyer reads nothing. Shorting, meaningful derivative exposure and wide concentration are therefore off the table.',
          'A SIF assumes a buyer with at least ₹10 lakh who can be expected to read a scheme document. So the leash is longer.',
          '<b>You are not buying better management. You are buying a wider mandate.</b> If you do not want that wider mandate used, you are paying a twenty-times minimum for nothing.',
        ],
      },
      {
        h: 'Where the two are genuinely identical',
        body: [
          'This is the part that surprises people, and it is the strongest argument for the category.',
          'Tax treatment is the same. An equity-oriented SIF scheme is taxed as equity, and like a mutual fund nothing touches your return until you redeem. The manager can trade as much as the strategy needs inside the scheme without generating a tax event in your hands.',
          'The operational spine is the same too: a trustee, a registrar, a published scheme information document, and an AMC with an existing compliance function.',
          'Compare that to the alternatives for hedged exposure. A Category III AIF asks ₹1 crore and is taxed inside the fund. A PMS taxes every trade in your own return. The SIF is the only route to a hedged book that keeps mutual fund tax treatment.',
        ],
      },
      {
        h: 'What a hedge actually costs',
        body: [
          'A hedged strategy trades constantly. It rolls futures, it maintains matched positions, it rebalances. Every one of those trades carries securities transaction tax, and the rate on futures and options rose on 1 April 2026.',
          'That is a permanent drag taken straight out of the spread the strategy is trying to harvest, and it falls hardest on exactly the strategies a SIF exists to run.',
          'It does not make the category a bad idea. It does mean the honest number is the <b>net</b> spread after transaction costs and fees, not the gross one in the pitch.',
          'Ask any SIF manager how the April 2026 change moved their gross-to-net. A manager who has not computed it is telling you something.',
        ],
      },
      {
        h: 'The caution the category deserves',
        body: [
          'The framework is recent, the strategies are new, and the teams are being assembled rather than proven.',
          'A long record in long-only equity does not transfer to running a hedged book — the skills barely overlap. Managing a short position through a squeeze is a different job from picking a compounder.',
          'So diligence the person, not the brand. Ask who runs this specific strategy, what they ran before, how the derivative exposure is actually constructed, and what happens to the book in a sharp rally. A good manager will enjoy the question.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Buying a SIF as a better version of your equity fund',
        why: 'It is not a performance upgrade, it is a different mandate. A hedged strategy is designed to lag a rising market — that is the trade for the drawdown protection. Expecting it to beat your equity fund in a bull run misunderstands what you bought.',
      },
      {
        m: 'Assuming the ₹10 lakh threshold implies a safer product',
        why: 'The minimum reflects who SEBI thinks should be allowed in, not how the strategy behaves. A long-short SIF uses derivatives and can lose money in ways a plain long-only fund cannot.',
      },
      {
        m: 'Judging a SIF on a track record measured in months',
        why: 'A hedged strategy is tested by a drawdown, and most of these have not seen one yet. Until they have, you are diligencing the process and the people, not a record.',
      },
    ],
    faqs: [
      {
        q: 'Is a SIF just a mutual fund with a higher minimum?',
        a: 'No. It is run by a mutual fund house and taxed like one, but it operates under a separate SEBI framework with far wider derivative and short-selling powers. The ₹10 lakh minimum exists because of those powers, not as a premium tier of the same product.',
      },
      {
        q: 'Is a SIF taxed differently from a mutual fund?',
        a: 'No — that is the category\'s main structural advantage. An equity-oriented SIF scheme is taxed as equity, and nothing is taxed until you redeem. Compare that to a Category III AIF, which is taxed inside the fund, or a PMS, which taxes every manager trade in your return each year.',
      },
      {
        q: 'Is the ₹10 lakh minimum per scheme?',
        a: 'It applies across the SIF strategies you hold with one fund house rather than per scheme. Read the scheme information document, because the aggregation rules are what decide whether you actually clear the threshold.',
      },
      {
        q: 'Should a SIF replace my equity mutual funds?',
        a: 'Almost never. A SIF is a diversifying sleeve, sized so it changes how the portfolio behaves in a bad year. The low-cost long-only core is doing a different job and a hedged strategy is an expensive way to do it.',
      },
    ],
    related: [
      { label: 'Long-short SIFs — the specification', href: '/learn/long-short-sif' },
      { label: 'SIF minimum investment', href: '/learn/sif-minimum-investment' },
      { label: 'SIF vs PMS', href: '/compare/sif-vs-pms' },
      { label: 'Market-neutral AIF vs arbitrage fund', href: '/compare/market-neutral-aif-vs-arbitrage-fund' },
      { label: 'What the 2026 STT hike does to hedged strategies', href: '/tax#stt-hedged' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_SIF, SEBI_MF, SEBI_STT, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'market-neutral-aif-vs-arbitrage-fund',
    kind: 'versus',
    title: 'Market-neutral AIF vs arbitrage fund',
    sides: [
      { label: 'Market-neutral AIF', sub: '₹1 crore · Category III', href: '/learn/market-neutral-funds' },
      { label: 'Arbitrage fund', sub: '₹500 · equity-oriented MF', href: '/learn/mutual-funds' },
    ],
    hook: 'Both strip out market direction. One is taxed inside the fund at the top rate, the other as equity — and that gap eats most of the headline difference.',
    capsule:
      'An arbitrage fund harvests the cash-futures spread inside an equity-oriented mutual fund, so it is taxed as equity and you can redeem daily. A market-neutral Category III AIF runs paired long and short positions for a higher gross return, but is typically taxed inside the fund at the maximum marginal rate. Compare them post-tax or not at all.',
    metaTitle: 'Market-Neutral AIF vs Arbitrage Fund: The Post-Tax Gap',
    metaDescription:
      'Two ways to earn without taking market direction. Why the Category III fund-level tax narrows a large headline gap, and what the 2026 STT rise does to both.',
    table: {
      caption: 'Market-neutral Category III AIF against an arbitrage mutual fund',
      head: ['', 'Market-neutral AIF', 'Arbitrage fund'],
      rows: [
        ['Minimum', '₹1 crore', '₹500'],
        ['What generates the return', 'Paired long and short positions — the manager\'s skill in the pair', 'The mechanical spread between the cash and futures price of the same stock'],
        ['Indicative return', '12–14% p.a. gross, indicative', 'Broadly money-market-like, and it moves with the spread on offer'],
        ['Who decides the outcome', 'The manager. Results depend entirely on selection', 'The market. Wide spreads are a good year, narrow spreads are a poor one'],
        ['Tax', 'Typically charged inside the fund at the maximum marginal rate (scheme-specific); you receive post-tax NAV', 'Equity-oriented treatment, and nothing until you redeem'],
        ['Liquidity', 'Monthly-style windows, typically', 'Daily NAV, with a short exit load window on some schemes'],
        ['Transparency', 'Periodic fund reporting', 'Monthly portfolio disclosure, daily NAV'],
        ['Dispersion between managers', 'Wide. Manager selection is the whole risk', 'Narrow. Most arbitrage funds do a similar mechanical thing'],
        ['Turnover and STT exposure', 'High — matched legs are rebalanced constantly', 'High — the position is rolled every expiry'],
        ['What breaks it', 'A stress period where long-short relationships stop holding', 'A prolonged narrow-spread market, where returns fall towards deposit rates'],
      ],
      note: 'Indicative ranges, not offers or guarantees. Category III AIF taxation is scheme-specific and turns on trust determinacy and income character — confirm per scheme.',
    },
    verdicts: [
      {
        side: 'Use an arbitrage fund when',
        when: [
          'You want a low-volatility parking place and the ability to redeem any business day',
          'You are at a high slab and want equity-oriented tax treatment rather than income taxed at your rate',
          'You have less than ₹1 crore for this, which settles it',
          'You want an outcome that does not depend on picking the right manager',
          'This is money with a job in the next year or two',
        ],
      },
      {
        side: 'Consider a market-neutral AIF when',
        when: [
          '₹1 crore is a normal position size for you, not a stretch',
          'You have seen the manager\'s net-of-everything record, not the gross one',
          'You can live with monthly-style windows rather than daily redemption',
          'You accept that the result is manager skill, and that dispersion in this category is wide',
          'You have asked, and been told, how the fund-level tax actually applies to that specific scheme',
        ],
      },
    ],
    sections: [
      {
        h: 'The post-tax arithmetic is the entire comparison',
        body: [
          'A market-neutral AIF quoting 12–14% and an arbitrage fund earning a money-market-like return look like completely different products. Post-tax, at a high slab, they are much closer than that.',
          'A Category III AIF is typically taxed <b>inside the fund</b>, at the maximum marginal rate. You receive the post-tax NAV. So the gross number in the pitch is not a number you ever receive.',
          'An arbitrage fund is an equity-oriented mutual fund. Its gains carry equity treatment, and nothing is taxed until you redeem — so the full amount compounds in the meantime.',
          '<b>Run both to a post-tax number before comparing anything.</b> A large headline gap can narrow to a modest one, and for some investors it closes almost entirely. That does not make the AIF wrong; it means the decision is finer than it looks and should be made on the real number.',
        ],
      },
      {
        h: 'They are not the same kind of bet',
        body: [
          'An arbitrage fund is mechanical. It buys the stock, sells the future, and collects the difference as the two converge at expiry. There is little for a manager to get right or wrong, which is why arbitrage funds cluster so tightly together.',
          'Its weakness is the same thing: when spreads narrow across the market, returns fall towards deposit rates and no manager can fix it. You are exposed to a market condition, not to skill.',
          'A market-neutral AIF is the opposite. The manager chooses which long to pair against which short. Done well, the return is uncorrelated with both equity and debt. Done badly, the pairs stop working and you lose money in a strategy you were told was low risk.',
          'So the choice is between accepting a market condition and accepting manager selection risk. Neither is free.',
        ],
      },
      {
        h: 'Both got more expensive on 1 April 2026',
        body: [
          'Securities transaction tax is charged on every trade, so its cost scales with turnover — and both of these strategies trade constantly.',
          'From 1 April 2026, futures STT rose from 0.02% to 0.05% and options-premium STT from 0.10% to 0.15%. An arbitrage fund rolling its position every expiry and a market-neutral book rebalancing matched legs both pay that, repeatedly.',
          'The effect is larger on the arbitrage fund in relative terms, because it is harvesting a thin spread to begin with. A few basis points of extra transaction cost is a meaningful share of a thin spread; it is a smaller share of a wider one.',
          'The takeaway is not to avoid either. It is that the net spread after STT and fees is what matters, and it got thinner. Ask the manager directly how the change moved their gross-to-net.',
        ],
      },
      {
        h: 'Where each one belongs in a portfolio',
        body: [
          'Neither is an equity substitute and neither should be sized like one.',
          'An arbitrage fund is a cash-management tool. It sits where a liquid fund or a short deposit would sit, for an investor at a high slab who prefers equity-oriented treatment on that money.',
          'A market-neutral AIF is a diversifying sleeve for a portfolio large enough that ₹1 crore is a sleeve. Its job is to produce a return that does not care what the index did, which is worth a great deal in the year the index does badly.',
          'An investor holding one because they were told it was "like a fixed deposit but better" has been mis-sold, whichever one it is.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Comparing the AIF gross return to the arbitrage fund net return',
        why: 'The Category III number is typically quoted before fund-level tax that you never see deducted from your own return. That is not a like-for-like comparison and it flatters the AIF substantially.',
      },
      {
        m: 'Treating either as a fixed deposit substitute',
        why: 'Both are equity-market strategies with no capital protection and no deposit insurance. Low volatility is not the same as low risk, and a market-neutral book can lose money when long-short relationships break.',
      },
      {
        m: 'Buying an arbitrage fund when spreads are already thin',
        why: 'Returns follow the spread on offer. Entering after a period of wide spreads, on the strength of the trailing number, is buying the past. Look at the current spread environment, not last year\'s return.',
      },
      {
        m: 'Not asking how the specific Category III scheme is taxed',
        why: 'The treatment turns on trust determinacy and income character and is genuinely scheme-specific. A manager who cannot give you a clear written answer is not one to hand ₹1 crore.',
      },
    ],
    faqs: [
      {
        q: 'Which gives higher returns, a market-neutral AIF or an arbitrage fund?',
        a: 'Gross, the market-neutral AIF, usually by a wide margin. Post-tax the gap narrows considerably, because Category III funds are typically taxed inside the fund at the maximum marginal rate while an arbitrage fund carries equity-oriented treatment. Compare only the post-tax numbers.',
      },
      {
        q: 'Are arbitrage funds safe?',
        a: 'They are low-volatility, not risk-free. The strategy is mechanical and well understood, but there is no capital protection and no deposit insurance, and returns fall towards deposit rates when spreads narrow across the market.',
      },
      {
        q: 'Why are Category III AIFs taxed inside the fund?',
        a: 'Unlike Categories I and II, Category III does not get pass-through treatment, so tax is generally charged at the fund level and you receive post-tax NAV. The precise position depends on the trust\'s determinacy and the character of the income, which is why it must be confirmed scheme by scheme.',
      },
      {
        q: 'Can an NRI invest in either?',
        a: 'Both are open subject to FEMA routing and the house accepting your jurisdiction. For a US or Canadian taxpayer, both are pooled Indian funds and so generally bring PFIC reporting — settle that question before shortlisting either.',
      },
    ],
    related: [
      { label: 'Market neutral funds — the specification', href: '/learn/market-neutral-funds' },
      { label: 'AIF Category I, II and III explained', href: '/learn/aif-categories-explained' },
      { label: 'What the 2026 STT hike does to hedged strategies', href: '/tax#stt-hedged' },
      { label: 'SIF vs mutual fund', href: '/compare/sif-vs-mutual-fund' },
      { label: 'Alternatives to a fixed deposit', href: '/compare/fixed-deposit-alternatives' },
      { label: 'AIF vs mutual fund', href: '/compare/aif-vs-mutual-fund' },
    ],
    sources: [SEBI_AIF, SEBI_MF, SEBI_STT, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },
]
