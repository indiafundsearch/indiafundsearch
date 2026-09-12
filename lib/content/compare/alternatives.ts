import type { ComparePageContent } from './types'
import {
  DICGC,
  RBI_DEPOSITS,
  SEBI_AIF,
  SEBI_MF,
  SEBI_PMS,
  SEBI_REIT,
  SEBI_SIF,
  ITA_2025,
} from './sources'

const PUBLISHED = 'September 2026'
const REVIEWED = 'September 2026'

/**
 * "Alternatives to X" pages.
 *
 * The reader already holds X, or was about to buy it, and is looking for the
 * next option. That is a decided reader with a specific dissatisfaction — the
 * most useful moment there is to be honest with them, including when the honest
 * answer is that they should keep what they have.
 *
 * Each page therefore opens by stating the case for staying put. A page that
 * only argues for moving is a sales page wearing a comparison page's clothes,
 * and readers at this stage can tell.
 */
export const ALTERNATIVES: ComparePageContent[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'fixed-deposit-alternatives',
    kind: 'alternatives',
    title: 'Alternatives to a fixed deposit for ₹1 crore',
    sides: [
      { label: 'Debt mutual funds', sub: 'Daily liquidity', href: '/learn/mutual-funds' },
      { label: 'FD+ and structured debt', sub: '₹1–10 lakh', href: '/learn/fd-plus-structured-debt' },
      { label: 'REITs and InvITs', sub: 'Listed, income-paying', href: '/learn/reits-invits' },
      { label: 'Debt PMS', sub: '₹50 lakh', href: '/learn/debt-pms' },
      { label: 'Private credit', sub: '₹1 crore, locked', href: '/learn/private-credit-real-estate-debt' },
    ],
    hook: 'Keep the deposit for the money with a job. The question is only what to do with the rest.',
    capsule:
      'A fixed deposit is the right home for money you may need within three years. For surplus beyond that, the realistic alternatives are debt mutual funds for liquidity, REITs for income, debt PMS at ₹50 lakh, and private credit at ₹1 crore for investors who can accept lock-in and default risk.',
    metaTitle: 'Fixed Deposit Alternatives in India: Five Real Options',
    metaDescription:
      'Where ₹1 crore can go instead of a bank FD — debt funds, structured debt, REITs, debt PMS and private credit. Yield, liquidity, risk and tax for each.',
    table: {
      caption: 'Five alternatives to a fixed deposit, ranked by how far they move you from certainty',
      head: ['Option', 'Minimum', 'Indicative return', 'Liquidity', 'What you are accepting'],
      rows: [
        ['Bank fixed deposit', '₹1,000', 'Contractual, per your receipt', 'Breakable, small penalty', 'Nothing — this is the baseline. Insured only to ₹5 lakh per bank'],
        ['Debt mutual funds', '₹500', '6–7.5% p.a. indicative', 'Daily NAV, proceeds in 1–3 working days', 'Interest-rate movement and credit risk, taxed only when you redeem'],
        ['FD+ and structured debt', '₹1–10 lakh', '6.5–7.5% p.a. indicative', 'Tenor-bound, limited early exit', 'Issuer credit risk in place of bank credit risk'],
        ['REITs and InvITs', 'One unit', '6–8% distribution plus growth, indicative', 'Same-day on the exchange', 'Listed price movement, and distributions that depend on occupancy'],
        ['Debt PMS', '₹50 lakh', '11–13% p.a. indicative', 'Exit typically in days', 'Credit risk taken deliberately, and annual tax on churn in your own return'],
        ['Private credit AIF', '₹1 crore', '12–20% p.a. indicative', 'Locked for the fund life', 'Real default risk, no insurance, and tax on accrued income before cash arrives'],
      ],
      note: 'Indicative ranges, not offers or guarantees. Every figure here is published on the relevant specification page on this site, with the same caveats.',
    },
    verdicts: [
      {
        side: 'Keep it in the fixed deposit when',
        when: [
          'The money has a job inside three years — a purchase, a fee, a tax payment, a capital call',
          'It is your emergency reserve, or your business float',
          'You are already at or under ₹5 lakh per bank and the deposit insurance genuinely covers you',
          'You would lose sleep over a number that moves, which is a real cost and worth respecting',
        ],
      },
      {
        side: 'Move part of it when',
        when: [
          'The emergency reserve is fully funded and this is the surplus above it',
          'You can name the year you would need each rupee, and for this money that year is far away',
          'You understand that every extra point of yield is payment for a specific risk, and you can say which one',
          'You are holding far more than ₹5 lakh at any one bank, in which case spreading is worth doing regardless',
        ],
      },
    ],
    sections: [
      {
        h: 'First, the case for keeping the deposit',
        body: [
          'An FD does one job perfectly: it gives you a known amount on a known date, and you can break it. Nothing else on this page does that.',
          'The mistake is not owning fixed deposits. The mistake is owning only fixed deposits — because then the money that will not be touched for fifteen years is being managed as if it might be needed on Tuesday.',
          '<b>Split the money by when you need it, not by how you feel about risk.</b> Everything needed inside three years stays. The decision is only about the rest.',
        ],
      },
      {
        h: 'The insurance limit most people have wrong',
        body: [
          'Deposit insurance is ₹5 lakh per depositor per bank, covering principal and interest together. Not per deposit, not per branch, not per account.',
          'A ₹1 crore deposit at one bank is insured to ₹5 lakh. The rest is an unsecured claim on that bank. For a large well-capitalised bank that is a remote concern; for a small institution offering a rate well above the market, the rate is the risk disclosure.',
          'If you are going to hold fixed deposits in size anyway, spread them across banks. It costs nothing and it is the only thing that makes the insurance do any work.',
        ],
      },
      {
        h: 'What the taxman does to the comparison',
        body: [
          'Deposit interest is added to your income and taxed at your slab rate every year, with tax deducted at source. At the highest slab, a large part of the return goes before you see it.',
          'A debt mutual fund is not taxed at all until you redeem, so the full amount compounds in the meantime. That deferral is worth real money over a decade, even if the gross returns were identical.',
          'A Category II private credit AIF runs the other way: it is a pass-through, so income is taxed in your hands as it arises, sometimes before any cash is distributed.',
          'The honest comparison is after tax, on cash you actually receive, in the year you receive it. Gross yields are not comparable across these structures.',
        ],
      },
      {
        h: 'A sensible order to do this in',
        body: ['Not a recommendation — a sequence that avoids the common errors.'],
        points: [
          '<b>One.</b> Size the emergency reserve honestly. Six to twelve months of actual outgoings, in a deposit or a liquid fund. It never moves.',
          '<b>Two.</b> List every obligation in the next three years and fund each one in a deposit maturing before it is due.',
          '<b>Three.</b> Spread remaining deposits across banks so no single institution holds an uncomfortable share.',
          '<b>Four.</b> Only then look at what is genuinely long-dated surplus. That is the money this page is about.',
          '<b>Five.</b> Move it in stages, not in one decision. Nothing about this needs to happen in a single week.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Rolling the same FD for a decade without asking what the money is for',
        why: 'Money that has not been needed in ten years is not short-term money. Managing it as if it were is a decision, even when it is made by default, and over long periods it is an expensive one.',
      },
      {
        m: 'Chasing a co-operative bank offering a rate well above the market',
        why: 'The excess rate is the risk premium, and the insurance stops at ₹5 lakh. You are taking credit risk for a small pickup, in the one part of the portfolio where certainty was the entire point.',
      },
      {
        m: 'Jumping from an FD straight to a private credit AIF',
        why: 'That is the largest single step on this table — from insured and breakable to uninsured and locked. The useful options are usually in the middle, and there is no prize for skipping them.',
      },
    ],
    faqs: [
      {
        q: 'What gives higher returns than an FD with low risk?',
        a: 'Debt mutual funds and high-quality structured debt sit closest: modestly higher indicative yields, daily or tenor-bound liquidity, and tax deferral in the case of a debt fund. Nothing meaningfully higher is available without either credit risk or lock-in — those are what the extra yield pays for.',
      },
      {
        q: 'Is a debt mutual fund safer than a fixed deposit?',
        a: 'No. It has no deposit insurance and its value moves with interest rates and credit events. It is more liquid and more tax-efficient than a deposit, which is a different advantage from being safer.',
      },
      {
        q: 'Where should an NRI park money instead of an NRE FD?',
        a: 'The tax answer changes everything: NRE deposit interest is exempt from Indian tax for a non-resident, which no alternative on this page matches. Before moving, check how your country of residence taxes the alternative — for a US or Canadian taxpayer a pooled Indian fund generally brings PFIC reporting.',
      },
      {
        q: 'How much should I move out of fixed deposits?',
        a: 'Only what survives the three-year test: money with no identified use inside three years, after the emergency reserve is fully funded. For most people that is a smaller number than they assume, and it is better to move it in stages.',
      },
    ],
    related: [
      { label: 'Private credit vs fixed deposit', href: '/compare/private-credit-vs-fixed-deposit' },
      { label: 'FD+ and structured debt', href: '/learn/fd-plus-structured-debt' },
      { label: 'Debt PMS', href: '/learn/debt-pms' },
      { label: 'REITs and InvITs', href: '/learn/reits-invits' },
      { label: 'The full tax schedule', href: '/tax' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [DICGC, RBI_DEPOSITS, SEBI_MF, SEBI_AIF, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'mutual-fund-alternatives-for-hni',
    kind: 'alternatives',
    title: 'Mutual fund alternatives for HNIs',
    sides: [
      { label: 'PMS', sub: '₹50 lakh · direct ownership', href: '/learn/what-is-pms' },
      { label: 'SIF', sub: '₹10 lakh · hedged', href: '/learn/long-short-sif' },
      { label: 'AIF', sub: '₹1 crore · private assets', href: '/learn/what-is-aif' },
      { label: 'GIFT City', sub: 'USD, offshore', href: '/learn/gift-city-global-usd' },
    ],
    hook: 'Most portfolios above ₹5 crore do not need to leave mutual funds. They need to stop pretending mutual funds can do everything.',
    capsule:
      'Mutual funds remain the cheapest way to own listed Indian markets at any size, so the core rarely needs replacing. What they cannot hold is private credit, unlisted equity, real assets or a genuinely hedged book. Those gaps are what PMS, SIF, AIF and GIFT City structures exist to fill.',
    metaTitle: 'Mutual Fund Alternatives for HNIs: PMS, AIF, SIF and GIFT City',
    metaDescription:
      'What a mutual fund structurally cannot hold, and which vehicle fills each gap. Minimums, tax treatment and the honest case for keeping the mutual fund core.',
    table: {
      caption: 'The gap each alternative actually fills',
      head: ['Structure', 'Minimum', 'What it gives you that a mutual fund cannot', 'What you give up'],
      rows: [
        ['PMS', '₹50 lakh', 'Direct ownership in your own demat, concentration beyond mutual fund limits, and exclusions tailored to you', 'Tax on every manager trade, in your return, that year'],
        ['SIF', '₹10 lakh', 'Long-short and derivative strategies beyond mutual fund limits, at mutual fund tax treatment', 'A young category with short track records'],
        ['AIF Category II', '₹1 crore', 'Private credit, unlisted equity, real estate debt — assets no mutual fund may hold', 'Multi-year lock-in, capital calls, pass-through tax on undistributed income'],
        ['AIF Category III', '₹1 crore', 'Hedged, market-neutral and derivative-led books', 'Tax charged inside the fund, so losses cannot offset your other income'],
        ['GIFT City funds', 'From US $5,000, fund-dependent', 'USD-denominated global exposure through an IFSC structure', 'Currency risk, and a home-country tax analysis you must do first'],
        ['REITs and InvITs', 'One unit', 'Institutional-grade real assets with listed liquidity', 'Listed price movement, and no control over the asset mix'],
      ],
      note: 'Indicative minimums per SEBI and IFSCA category rules. Individual schemes vary — scheme documents govern.',
    },
    verdicts: [
      {
        side: 'Stay in mutual funds for',
        when: [
          'The core listed equity allocation — an index fund is the cheapest version of this and nothing here beats it on fee',
          'Anything you might need inside three years',
          'The part of the portfolio you want taxed only when you choose to sell',
          'Any sleeve you are not prepared to actively monitor',
        ],
      },
      {
        side: 'Add an alternative structure for',
        when: [
          'Exposure that does not exist in listed markets — private credit, pre-IPO, real estate debt',
          'A hedged sleeve intended to behave differently in a drawdown',
          'Concentrated research-led equity where direct ownership and exclusions matter',
          'Currency and geographic diversification outside India',
          'Sizes where a single mutual fund position has become a concentration in itself',
        ],
      },
    ],
    sections: [
      {
        h: 'Why "graduating" from mutual funds is the wrong frame',
        body: [
          'There is a persistent idea in Indian wealth that mutual funds are what you hold until you are wealthy enough for something better. It is a sales narrative, not an analytical one.',
          'A mutual fund is the lowest-cost, most liquid, most tax-deferred way to own listed Indian securities, and that stays true at ₹50 lakh and at ₹50 crore. Nothing in this list is a cheaper way to own the Nifty.',
          'What changes with size is not the quality of the mutual fund. It is the <b>range of problems you now have</b> — currency exposure, succession, concentration from a business holding, a need for uncorrelated cash flow. Those are the gaps worth filling.',
        ],
      },
      {
        h: 'Name the gap before you name the product',
        body: [
          'The productive question is not "what should an HNI hold". It is "what can my current portfolio not do".',
          'If the answer is "it falls when Indian equity falls, and everything I own does the same", the gap is correlation, and a hedged SIF or a market-neutral Category III AIF addresses it.',
          'If the answer is "all my wealth is in rupees and my children study abroad", the gap is currency, and a GIFT City or offshore structure addresses it.',
          'If it is "I need income that does not depend on selling units", the gap is cash flow, and REITs, private credit or structured debt address it.',
          'If it is "I want to own the shares outright, with my own exclusions", the gap is ownership, and PMS addresses it.',
          'Anyone leading with the product rather than the gap is selling.',
        ],
      },
      {
        h: 'The tax hierarchy, plainly',
        body: [
          'Across these structures, tax timing varies more than tax rate, and timing is what compounds.',
          'A mutual fund and a SIF defer everything until you redeem. A PMS taxes every manager trade in your hands that year. An AIF Category I or II passes income through as it arises. An AIF Category III is taxed inside the fund.',
          'A high-turnover PMS therefore has to out-earn a mutual fund by more than its fee gap suggests, because it also hands you an annual tax bill on reinvested gains.',
          'This does not decide the question. It does mean that any comparison run on gross returns is not a comparison.',
        ],
      },
      {
        h: 'What usually goes wrong at this stage',
        body: [
          'The pattern is predictable. An investor crosses a wealth threshold, gets access to products they could not previously buy, and accumulates one of each.',
          'Three years later there is a PMS, two AIF commitments, a structured note and the original mutual fund book — with no allocation policy, heavy overlap in the underlying holdings, and no single view of the whole.',
          '<b>Allocation sits above product selection.</b> Decide the shape of the portfolio first, in writing, then fill each sleeve with the cheapest structure that can hold it.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Replacing a mutual fund core with a PMS holding similar stocks',
        why: 'Often the same exposure at several times the cost, plus an annual tax bill from turnover. If the holdings overlap heavily with what you already own, you have changed the wrapper and the fee, not the portfolio.',
      },
      {
        m: 'Buying an alternative because the minimum made it feel exclusive',
        why: 'A ₹1 crore minimum is a regulatory threshold describing who may be sold the product. It says nothing about whether it suits you, and it is not a quality signal.',
      },
      {
        m: 'Committing to illiquid structures without a liquidity budget',
        why: 'Lock-ins accumulate silently. Add up every locked commitment as a share of liquid net worth. If a bad year would force you to sell the liquid part at the bottom to meet a capital call, the private sleeve is too large.',
      },
    ],
    faqs: [
      {
        q: 'At what portfolio size do alternatives make sense?',
        a: 'Less a number than a structure. The usual test is that a single ₹1 crore illiquid commitment should not be a large share of your liquid net worth — which for most people puts meaningful AIF allocation somewhere above ₹5 crore. SIFs at ₹10 lakh and REITs at one unit have no such constraint.',
      },
      {
        q: 'Is PMS better than a mutual fund for a large portfolio?',
        a: 'Not automatically. It buys direct ownership, concentration and customisation, and costs more in fees and in tax on turnover. Whether that trade is worth it depends on the specific manager and on whether you actually need what it buys.',
      },
      {
        q: 'Should an HNI exit mutual funds entirely?',
        a: 'Almost never. Mutual funds remain the cheapest and most tax-deferred way to hold listed Indian markets at any size. Alternatives are additions that fill gaps, not replacements for the core.',
      },
      {
        q: 'What about international diversification?',
        a: 'Two regulated routes exist for a resident Indian: the GIFT City IFSC route and the Liberalised Remittance Scheme. Both bring currency exposure and foreign asset reporting obligations, so the compliance work is part of the decision rather than an afterthought.',
      },
    ],
    related: [
      { label: 'PMS vs mutual fund', href: '/learn/pms-vs-mutual-fund' },
      { label: 'AIF vs mutual fund', href: '/compare/aif-vs-mutual-fund' },
      { label: 'SIF vs PMS', href: '/compare/sif-vs-pms' },
      { label: 'Where to invest ₹1 crore in India', href: '/compare/where-to-invest-1-crore-in-india' },
      { label: 'GIFT City and global USD investing', href: '/learn/gift-city-global-usd' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_PMS, SEBI_AIF, SEBI_SIF, SEBI_MF, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pms-alternatives',
    kind: 'alternatives',
    title: 'PMS alternatives: what to do below ₹50 lakh, or when a house says no',
    sides: [
      { label: 'SIF', sub: '₹10 lakh · hedged', href: '/learn/long-short-sif' },
      { label: 'Mutual funds', sub: '₹500 · the cheap core', href: '/learn/mutual-funds' },
      { label: 'Long-only equity AIF', sub: '₹1 crore', href: '/learn/long-only-equity-aif' },
      { label: 'GIFT City', sub: 'For non-residents who are declined', href: '/learn/gift-city-global-usd' },
    ],
    hook: 'There are only three reasons people look for a PMS alternative, and each one has a different answer.',
    capsule:
      'If the ₹50 lakh minimum is the obstacle, a SIF at ₹10 lakh or a concentrated mutual fund is the answer. If churn tax is the obstacle, any pooled structure fixes it. If a house declined you because of your passport, a GIFT City structure is usually the workable route.',
    metaTitle: 'PMS Alternatives in India: Options Below ₹50 Lakh',
    metaDescription:
      'Blocked by the minimum, the churn tax, or a house that declines your jurisdiction? The realistic alternative for each of the three reasons, compared.',
    table: {
      caption: 'Pick the row that matches why PMS is not working for you',
      head: ['Your obstacle', 'The alternative that fits', 'Minimum', 'What it gets you', 'What it does not'],
      rows: [
        ['₹50 lakh is more than you want with one manager', 'A long-short SIF', '₹10 lakh', 'Active, hedged management with mutual fund tax treatment', 'Direct ownership, or any customisation'],
        ['You want concentration, not a large minimum', 'A concentrated or focused equity mutual fund', '₹500', 'Research-led concentration at the lowest cost, with daily liquidity', 'Concentration beyond SEBI mutual fund limits'],
        ['The annual tax on manager churn', 'Any pooled structure — mutual fund, SIF, Category III AIF', '₹500 upward', 'Nothing taxed until you redeem; the full amount keeps compounding', 'Shares in your own name'],
        ['You want private or unlisted exposure too', 'A long-only equity AIF', '₹1 crore', 'Listed and pre-IPO exposure in one vehicle', 'Liquidity; and the minimum is higher, not lower'],
        ['A house declined you for your jurisdiction', 'A GIFT City IFSC structure', 'From US $5,000, fund-dependent', 'A regulated route built for non-resident capital', 'An escape from your home country\'s tax rules'],
        ['You simply want the decisions off your desk', 'An index fund plus a rebalancing rule', '₹500', 'Most of the benefit of delegation at almost no cost', 'Any prospect of beating the index'],
      ],
    },
    verdicts: [
      {
        side: 'Wait and do PMS properly when',
        when: [
          'You are close to ₹50 lakh and this would be a reasonable slice of your portfolio rather than all of it',
          'You specifically want direct ownership, exclusions, or a named manager you have diligenced',
          'You are prepared for an annual tax bill generated by turnover',
          'Waiting two years and entering at the right size costs you far less than entering now at the wrong one',
        ],
      },
      {
        side: 'Take an alternative when',
        when: [
          '₹50 lakh would be most of your liquid net worth — clearing a minimum is not the same as it being suitable',
          'Tax deferral matters more to you than seeing individual holdings',
          'You want a hedged profile, which a long-only PMS does not provide anyway',
          'Your passport is the obstacle, and an Indian-domiciled pooled structure would create reporting problems at home',
        ],
      },
    ],
    sections: [
      {
        h: 'Reason one: the minimum',
        body: [
          '₹50 lakh per portfolio manager is a SEBI threshold. It is not negotiable, and anyone offering to structure around it should end the conversation for you.',
          'Accredited investors are exempt, but accreditation is a formal process with its own criteria — not a label a distributor can apply to you.',
          'The genuine alternatives are a long-short SIF at ₹10 lakh, or a concentrated equity mutual fund at almost nothing. Neither gives you shares in your own name, and for most investors below ₹50 lakh that matters far less than the cost of over-concentrating.',
          '<b>The important point: clearing the minimum is not a suitability test.</b> If ₹50 lakh is most of your liquid wealth, the minimum is telling you the product is not sized for you yet.',
        ],
      },
      {
        h: 'Reason two: the tax on churn',
        body: [
          'A PMS holds shares in your name, so every sale the manager makes is your sale in that year\'s return — even though the cash was reinvested and you never saw it.',
          'Two managers with the same gross return can leave you with materially different after-tax outcomes if one trades twice as much.',
          'Every pooled structure fixes this. A mutual fund, a SIF and a Category III AIF all let the manager trade inside the vehicle without touching your return until you exit.',
          'If this is your objection to PMS, it is a well-founded one, and the alternative list is simply "anything pooled".',
        ],
      },
      {
        h: 'Reason three: a house declined you',
        body: [
          'This is almost always about a US or Canadian passport or residence, and it is a commercial decision by that house rather than an Indian legal bar on you.',
          'Taking US-resident money can pull an Indian manager into US securities law. Most decline rather than deal with it. Another house may say yes, so it is worth asking more than one.',
          'But before you go looking, do the home-country analysis first. For a US taxpayer, an Indian pooled fund generally brings PFIC reporting — which means solving the access problem by finding a pooled fund that accepts you can create a worse problem than the one you started with.',
          'A GIFT City IFSC structure is frequently the more workable route, because it is built for non-resident capital. It still does not exempt you from your home country\'s rules.',
        ],
      },
      {
        h: 'The alternative nobody pitches',
        body: [
          'An index fund and a written rebalancing rule.',
          'It has no minimum, costs a fraction of everything else on this page, generates no churn tax in your hands, and requires no manager selection. It will not beat the market, and it removes the single largest risk in most portfolios, which is you.',
          'It is mentioned here because nobody earns a fee recommending it, which is precisely why it belongs on an honest list. If your reason for wanting a PMS is that you want somebody else to be responsible, this does that job for almost nothing.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Putting your entire liquid portfolio into one PMS to clear the minimum',
        why: 'The threshold describes who may be sold the product, not who should buy it. A single manager holding all of your liquid wealth is a concentration risk regardless of how good that manager is.',
      },
      {
        m: 'Splitting ₹50 lakh across family members to reach minimums',
        why: 'Each PMS account needs its own KYC, its own funding from that person\'s own money, and its own tax return. Structures that exist only to clear a threshold tend to unravel at exactly the wrong moment.',
      },
      {
        m: 'For a US or Canadian taxpayer, solving access before solving tax',
        why: 'Finding a house that accepts you is the easy half. An Indian pooled fund generally brings PFIC reporting, which can cost more in compliance and punitive tax than the strategy was ever going to add.',
      },
    ],
    faqs: [
      {
        q: 'Can I invest in PMS with less than ₹50 lakh?',
        a: 'Only as an accredited investor, where the minimum does not apply. Otherwise no — it is a SEBI threshold and there is no legitimate workaround. Anyone offering one is describing something you should not agree to.',
      },
      {
        q: 'Is a SIF a good substitute for a PMS?',
        a: 'For many investors below ₹50 lakh, yes — active management, a ₹10 lakh entry, hedging powers a PMS does not have, and no tax until you redeem. What you lose is direct ownership and any customisation, and the category is young enough that manager diligence matters more than usual.',
      },
      {
        q: 'Why did a PMS refuse my application as an NRI?',
        a: 'Almost always your jurisdiction rather than your eligibility. SEBI sets no residency bar on PMS. US and Canadian residents are the usual refusals, because accepting them exposes the house to foreign securities law. Another house may accept you.',
      },
      {
        q: 'What is the cheapest alternative to a PMS?',
        a: 'A low-cost index fund with a written rebalancing rule. It will not outperform, but it delegates the emotional part of investing — which is where most self-managed portfolios actually lose money — at a small fraction of the cost.',
      },
    ],
    related: [
      { label: 'What is PMS?', href: '/learn/what-is-pms' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'SIF vs PMS', href: '/compare/sif-vs-pms' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'US and Canadian NRIs: PFIC, FATCA and FBAR', href: '/learn/us-nri-pfic' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_PMS, SEBI_SIF, SEBI_MF, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'real-estate-investment-alternatives',
    kind: 'alternatives',
    title: 'Alternatives to buying an investment property',
    sides: [
      { label: 'REITs and InvITs', sub: 'Listed real assets', href: '/learn/reits-invits' },
      { label: 'Real estate debt', sub: '₹1 crore, lending not owning', href: '/learn/private-credit-real-estate-debt' },
      { label: 'Structured debt', sub: '₹1–10 lakh', href: '/learn/fd-plus-structured-debt' },
    ],
    hook: 'Most people buying a second flat want the rent and the inflation hedge. Almost nobody wants the tenant.',
    capsule:
      'If you want property income without owning a property, listed REITs and InvITs pay distributions from institutional-grade commercial assets and trade on an exchange. If you want the yield without the equity risk, real estate debt lends against property instead of owning it — at a ₹1 crore minimum and with a multi-year lock-in.',
    metaTitle: 'Alternatives to Buying an Investment Property in India',
    metaDescription:
      'REITs, InvITs and real estate debt against a second flat. Entry costs, net yield, liquidity and effort compared — plus where physical property still wins.',
    table: {
      caption: 'Three ways to hold real estate without holding the keys',
      head: ['Route', 'Minimum', 'What you own', 'Income', 'Liquidity'],
      rows: [
        ['A second flat', '₹50 lakh and up', 'One building, one tenant, one city', 'Rent, less society dues, tax, maintenance and vacancy', 'Months, plus 6–8% to transact'],
        ['REITs', 'One unit', 'A share of many Grade A commercial buildings', 'Regular distributions, mandated as a high share of distributable cash flow', 'Same day, on the exchange'],
        ['InvITs', 'One unit', 'A share of operating infrastructure — roads, transmission, pipelines', 'Distributions from contracted cash flows', 'Same day, on the exchange'],
        ['Real estate debt (Category II AIF)', '₹1 crore', 'A loan secured against property — you are the lender, not the owner', 'Interest, as borrowers pay, often irregular', 'Locked for the fund life'],
        ['Structured debt', '₹1–10 lakh', 'A bond or note, often property-linked', 'Coupon, per the terms', 'Tenor-bound, limited early exit'],
      ],
      note: 'Indicative structures. Individual schemes vary and the scheme or offer document governs in each case.',
    },
    verdicts: [
      {
        side: 'Buy the property when',
        when: [
          'You will live in it — a home is a consumption decision, and that is a perfectly good reason',
          'You want long-dated cheap leverage, which is the strongest genuine argument for physical property',
          'You have real local information advantage in a specific corridor',
          'You are buying commercial space your own business will occupy',
          'Control matters — redevelopment, subdivision, holding across generations',
        ],
      },
      {
        side: 'Take a listed or debt route when',
        when: [
          'You want the income, not the asset',
          'You already own property, probably in the city your business also depends on',
          'You want to be able to sell part of the position rather than all of it',
          'You are an NRI and would rather not manage an Indian building from abroad',
          'The idea of a vacancy, a defaulting tenant or a society dispute is not one you want to own',
        ],
      },
    ],
    sections: [
      {
        h: 'Count the net yield, not the gross one',
        body: [
          'The yield quoted at the time of purchase is almost always gross rent over purchase price. The number that reaches your bank account is lower, often much lower.',
          'Subtract society maintenance, property tax, repairs, the broker\'s cut at each re-letting, and the vacancy between tenants. Then amortise the six to eight per cent it cost to buy in the first place.',
          'Run that arithmetic on the flat you already own before deciding what to do with the next crore. Many people find that the honest net yield on a residential investment property is lower than a REIT distribution, before any of the effort is counted.',
        ],
      },
      {
        h: 'Owning the asset and lending against it are different bets',
        body: [
          'A REIT gives you the equity: you receive the rent and you take the upside and the downside in the value of the buildings.',
          'Real estate debt gives you the loan: you receive a contracted rate and you rank ahead of the owner\'s equity if things go wrong. No upside beyond the coupon, better recovery if there is a problem.',
          'Which fits depends on what you already own. An investor whose net worth is already heavily exposed to property values usually wants the debt, not more equity in the same asset class.',
        ],
      },
      {
        h: 'The concentration nobody measures',
        body: [
          'Take a typical Indian business family. The house, a second flat, the factory or shop premises, and a business whose fortunes move with the local economy.',
          'That is four exposures to the same city and, often, the same cycle. It does not feel like concentration because the assets look different. They are not diversified — they are correlated, and they will move together in the year that matters.',
          '<b>Add up every property exposure including the business premises before buying another one.</b> For most families the answer is not another building.',
        ],
      },
      {
        h: 'Where none of these substitute for property',
        body: ['Two things, stated honestly.'],
        points: [
          '<b>Leverage.</b> A home loan is long-dated, cheap and available in size to an individual. Nothing on this page can be funded on those terms, and that advantage is real.',
          '<b>Use.</b> You cannot live in a REIT unit, and you cannot run your business out of one. If you need the space, buy the space.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Buying a second flat for rental yield without running the net number',
        why: 'Net of maintenance, tax, vacancy and the cost of transacting, residential rental yield in most Indian cities is modest. The investment case usually rests on price appreciation, which is a different bet from the one being described.',
      },
      {
        m: 'Treating property as low-risk because the price is not quoted',
        why: 'An unobserved price is not a stable one. You find out what it is worth when you try to sell — which tends to be exactly when everyone else is also selling.',
      },
      {
        m: 'Assuming a REIT is a proxy for the residential market',
        why: 'Indian REITs are predominantly commercial — offices, malls, warehousing — with different tenants, different lease structures and a different cycle. It is real estate exposure, but not the exposure a flat gives you.',
      },
    ],
    faqs: [
      {
        q: 'Do REITs pay better than rental income?',
        a: 'Often yes on a net basis, because the distribution arrives after the manager has already paid maintenance, taxes and letting costs, whereas quoted rental yield is before all of them. Compare net to net, and count your own time.',
      },
      {
        q: 'Can I invest in real estate without buying property in India?',
        a: 'Yes — listed REITs and InvITs from the price of one unit, and real estate debt through Category II AIFs at a ₹1 crore minimum. Both are SEBI-regulated routes to property cash flows without holding a title deed.',
      },
      {
        q: 'What is the minimum for real estate investing in India?',
        a: 'The price of one REIT unit, which is a few hundred rupees. That is the single largest practical difference from buying a flat, and it is what lets real estate be a position you size deliberately rather than a decision that consumes a decade of savings.',
      },
      {
        q: 'Are REITs a good option for NRIs?',
        a: 'For many, yes. Indian property held from abroad brings tenant management, repatriation friction and a physical asset you cannot easily sell in part. A listed unit removes all three. Check the FEMA routing and, if you file in the US, the PFIC position before you buy.',
      },
    ],
    related: [
      { label: 'REITs vs buying property', href: '/compare/reits-vs-physical-real-estate' },
      { label: 'REITs and InvITs — the specification', href: '/learn/reits-invits' },
      { label: 'Private credit and real estate debt', href: '/learn/private-credit-real-estate-debt' },
      { label: 'Best investment options for NRIs in India', href: '/compare/best-investment-options-for-nri-in-india' },
      { label: 'The full tax schedule', href: '/tax' },
    ],
    sources: [SEBI_REIT, SEBI_AIF, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },
]
