import type { ComparePageContent } from './types'
import {
  IFSCA_FM,
  IRS_PFIC,
  RBI_FI,
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
 * "Best X for Y" pages — a structure shortlisted for a named situation.
 *
 * THE RULE THAT KEEPS THESE LEGITIMATE
 * "Best" here always means "best-suited structure for this situation", never
 * "best-performing product". No scheme is named, no manager is ranked and no
 * performance claim is made. The page shortlists SEBI and IFSCA categories
 * against a stated constraint — a passport, a ticket size, an income need —
 * and says plainly what would rule each one out.
 *
 * Beyond earns referral fees on some of what is described. That is exactly why
 * a page that ranked named products would be indefensible whatever disclaimer
 * sat at the foot of it.
 */
export const BEST_FOR: ComparePageContent[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'best-investment-options-for-nri-in-india',
    kind: 'best-for',
    title: 'Best investment options for NRIs in India',
    sides: [
      { label: 'NRE deposits', sub: 'Tax-free in India, fully repatriable' },
      { label: 'Mutual funds', sub: 'From ₹500', href: '/learn/mutual-funds' },
      { label: 'PMS', sub: '₹50 lakh, your own demat', href: '/learn/can-nri-invest-in-pms' },
      { label: 'AIF', sub: '₹1 crore', href: '/learn/can-nri-invest-in-aif' },
      { label: 'GIFT City', sub: 'USD, offshore-friendly', href: '/gift-city' },
    ],
    hook: 'The country on your tax return changes the answer more than anything about the products themselves.',
    capsule:
      'For most NRIs the practical shortlist is NRE deposits for safety, mutual funds for the listed core, PMS above ₹50 lakh for direct ownership, and GIFT City structures for USD exposure. For US and Canadian taxpayers the ranking inverts, because pooled Indian funds generally bring punitive PFIC reporting at home.',
    metaTitle: 'Best Investment Options for NRIs in India, by Country',
    metaDescription:
      'NRE deposits, mutual funds, PMS, AIF and GIFT City compared for non-residents — repatriation, FEMA routing, and why your country of tax residence decides it.',
    table: {
      caption: 'The NRI shelf — and what rules each one out',
      head: ['Option', 'Minimum', 'Repatriation', 'Best suited to', 'What rules it out'],
      rows: [
        ['NRE fixed deposit', '₹1,000', 'Fully repatriable', 'Money you need certain, and interest that is exempt from Indian tax for a non-resident', 'Your home country probably still taxes the interest. Returns are modest'],
        ['NRO account balances', '₹1,000', 'Up to US $1 million per financial year, with documentation', 'Rent, dividends and India-source income', 'Taxable in India, and the annual remittance cap applies'],
        ['Mutual funds', '₹500', 'Repatriable if invested through NRE', 'The low-cost listed core of an India allocation', 'For US and Canadian filers, PFIC reporting. Several AMCs decline US and Canadian residents'],
        ['PMS', '₹50 lakh', 'Depends on the route chosen at the outset', 'Direct ownership of Indian equity, in your own demat', 'Many houses decline US and Canadian residents. Annual tax on churn in your Indian return'],
        ['AIF', '₹1 crore', 'Route-dependent; confirm before committing', 'Private credit, unlisted equity and hedged strategies', 'Multi-year lock-in, and pass-through income taxed before cash arrives'],
        ['REITs and InvITs', 'One unit', 'Repatriable if bought through NRE', 'Indian real estate income without managing a building from abroad', 'Listed price movement; check the PFIC position if you file in the US'],
        ['GIFT City funds', 'From US $5,000, fund-dependent', 'Designed for non-resident capital', 'USD exposure and a structure built for investors who are not Indian residents', 'It does not change your home country\'s tax rules. Do that analysis first'],
      ],
      note: 'FEMA routing, not SEBI eligibility, is what usually decides access. Confirm the repatriation route before you invest, not after.',
    },
    verdicts: [
      {
        side: 'If you file taxes in the UAE, Singapore, or a Gulf state',
        when: [
          'Your home jurisdiction imposes little or no tax on this income, so the Indian treatment is close to the whole picture',
          'NRE deposits are genuinely tax-free to you in India and fully repatriable',
          'Mutual funds, PMS and AIFs are all open, subject to the house accepting your jurisdiction',
          'A tax residency certificate plus the Indian information form is what makes any treaty relief actually work',
          'This is the most straightforward corridor there is — use the access while you have it',
        ],
      },
      {
        side: 'If you file taxes in the United States or Canada',
        when: [
          'Assume every pooled Indian fund is a PFIC at home until a qualified adviser tells you otherwise',
          'Direct securities held in your own name — including a PMS — avoid the PFIC problem, though many houses will decline you',
          'Several Indian AMCs do not accept US and Canadian residents at all',
          'GIFT City structures are often the more workable route, but they change the Indian side, not the American one',
          'Do the home-country analysis before shortlisting anything. This is the one corridor where getting the order wrong is expensive',
        ],
      },
      {
        side: 'If you file taxes in the United Kingdom',
        when: [
          'Reporting fund status is the fact that decides your rate — without it, gains can be taxed as income rather than as a capital gain',
          'Very few Indian funds hold UK reporting fund status; ask for it in writing before you invest',
          'Direct holdings and PMS sidestep the reporting fund question entirely',
          'Remittance basis and domicile rules change the analysis, so generic advice is unusually unsafe here',
        ],
      },
    ],
    sections: [
      {
        h: 'Start with your passport, not the product',
        body: [
          'This is the mistake that costs NRIs the most money, and it is almost universal.',
          'The usual sequence is: shortlist Indian products, pick one, invest, then discover at the next filing that the home country taxes it in a way nobody mentioned.',
          'Reverse it. Establish how your country of tax residence treats an Indian pooled fund, an Indian direct holding and an offshore fund. That analysis eliminates most of the shelf before you have looked at a single scheme.',
          '<b>For a US or Canadian taxpayer this is not a refinement. It is the decision.</b> PFIC treatment can consume most of a return and adds reporting that costs real money every year.',
        ],
      },
      {
        h: 'Repatriable or non-repatriable — decide before you invest',
        body: [
          'This choice is made at the account level, at the start, and it is expensive to change later.',
          'Invest through an <b>NRE</b> account and the money went out repatriable — capital and gains can come back to you abroad.',
          'Invest through an <b>NRO</b> account and it is treated as domestic money. Proceeds stay in India unless you use your annual remittance allowance, which is up to US $1 million per financial year with the documentation your bank requires.',
          'People routinely fund an investment from whichever account had the balance, then discover years later that the proceeds are stuck. Decide deliberately, and keep the trail.',
        ],
      },
      {
        h: 'What SEBI allows, and what a fund house will actually do',
        body: [
          'SEBI sets no residency bar on PMS, and AIFs are expressly open to non-residents. On paper, most of the Indian shelf is available to you.',
          'In practice, individual houses decline particular jurisdictions — overwhelmingly the United States and Canada — because accepting that money can pull them into foreign securities law they have no interest in registering under.',
          'That is a commercial decision by that house, not a legal bar on you. Another house may say yes, so ask more than one before concluding you are excluded.',
        ],
      },
      {
        h: 'Where GIFT City genuinely helps, and where it does not',
        body: [
          'The IFSC exists to make non-resident capital straightforward: USD-denominated funds, an operating framework designed for investors who are not Indian residents, and a regulator in IFSCA that is building for exactly this flow.',
          'For an NRI who wants global or India exposure in dollars without the friction of the domestic onshore route, it is frequently the cleanest answer available.',
          'What it does not do is change your home country\'s rules. A US person still files what a US person files. Treat GIFT City as a better Indian-side structure, never as a solution to a home-country tax problem.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Investing through the wrong account and discovering it at exit',
        why: 'The repatriation route is set when the money goes in. Funding from an NRO account because it had the balance can leave proceeds trapped in India, subject to the annual remittance cap.',
      },
      {
        m: 'Assuming NRE tax exemption means the income is tax-free everywhere',
        why: 'NRE interest is exempt in India for a non-resident. Your country of residence may tax it in full, and many do. Exempt in India is not exempt to you.',
      },
      {
        m: 'For a US filer, buying an Indian mutual fund because the returns looked good',
        why: 'Pooled Indian funds are generally PFICs. The punitive default regime plus annual Form 8621 reporting can consume most of the return and cost real money in preparation fees every year.',
      },
      {
        m: 'Claiming treaty relief without the paperwork in place first',
        why: 'India requires a tax residency certificate from your own country plus the Indian information form. Without them, tax is deducted at the full rate and you are left reclaiming it by filing.',
      },
    ],
    faqs: [
      {
        q: 'What is the best investment for an NRI in India?',
        a: 'There is no single answer, and it turns on where you file taxes rather than on the products. For a Gulf-based NRI, NRE deposits plus mutual funds and PMS is a clean shelf. For a US-based NRI the same shelf is largely unusable, and direct holdings or GIFT City structures are the realistic route.',
      },
      {
        q: 'Can NRIs invest in PMS and AIF?',
        a: 'Yes. SEBI sets no residency condition on PMS, and AIFs are expressly open to non-residents. The practical constraints are FEMA routing, KYC, and each house\'s own policy on your jurisdiction — several decline US and Canadian residents.',
      },
      {
        q: 'How much can an NRI repatriate from India?',
        a: 'Money invested on a repatriable basis through an NRE account can go back out with the gains. From an NRO account the limit is up to US $1 million per financial year, with the documentation your bank requires.',
      },
      {
        q: 'Is GIFT City better than investing onshore in India?',
        a: 'For a non-resident wanting USD exposure and a structure designed for foreign capital, often yes. It is not automatically better for rupee-denominated India exposure, and it never changes how your home country taxes you.',
      },
    ],
    related: [
      { label: 'The NRI corridor guides, by country', href: '/nri' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
      { label: 'Can an NRI invest in an AIF?', href: '/learn/can-nri-invest-in-aif' },
      { label: 'NRE vs NRO account', href: '/learn/nre-vs-nro-account' },
      { label: 'NRI repatriation limit', href: '/learn/nri-repatriation-limit' },
      { label: 'Best investment options for US-based NRIs', href: '/compare/best-investment-options-for-us-nri' },
    ],
    sources: [SEBI_PMS, SEBI_AIF, RBI_FI, IFSCA_FM, ITA_2025],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'best-investment-options-for-us-nri',
    kind: 'best-for',
    title: 'Best investment options for US-based NRIs',
    sides: [
      { label: 'Direct equity and PMS', sub: 'Held in your own name', href: '/learn/can-nri-invest-in-pms' },
      { label: 'NRE deposits', sub: 'No PFIC issue' },
      { label: 'GIFT City', sub: 'Check the structure first', href: '/gift-city' },
      { label: 'US-domiciled India funds', sub: 'No Form 8621' },
    ],
    hook: 'For a US taxpayer the question is not which Indian fund performs best. It is which structures do not create a PFIC.',
    capsule:
      'A US person investing in India should assume every pooled Indian fund is a PFIC, bringing punitive default taxation and annual Form 8621 reporting. Structures held in your own name — direct equity, a PMS, NRE deposits — avoid that. So do US-domiciled funds that hold Indian securities.',
    metaTitle: 'Best Investment Options for US-Based NRIs: Avoiding PFIC',
    metaDescription:
      'Why Indian mutual funds and AIFs are generally PFICs for a US taxpayer, which Indian structures are not, and how to build India exposure that survives Form 8621.',
    table: {
      caption: 'The US-NRI shelf, sorted by whether it creates a PFIC',
      head: ['Option', 'PFIC exposure', 'Access in practice', 'What it gets you'],
      rows: [
        ['NRE / NRO fixed deposits', 'No — a deposit is not a fund', 'Open', 'Certainty. Interest is taxable to you in the US regardless of the Indian exemption'],
        ['Direct Indian equity in your own demat', 'No — you hold securities, not fund units', 'Open, through a non-resident demat account', 'India exposure with ordinary US capital gains treatment'],
        ['PMS', 'Generally no — shares are held in your own name', 'Many houses decline US residents; some accept', 'Managed, concentrated Indian equity without fund-unit treatment'],
        ['Indian mutual funds', 'Yes, generally', 'Several AMCs decline US residents outright', 'Low-cost listed exposure, at a reporting cost that usually outweighs it'],
        ['Indian AIFs', 'Generally yes for pooled vehicles', 'Varies by fund; many decline', 'Private assets — but analyse the US treatment before committing'],
        ['REITs and InvITs', 'Needs analysis — the classification is fact-specific', 'Open through the usual routing', 'Real estate income; get the classification checked in writing first'],
        ['GIFT City funds', 'Depends entirely on the structure', 'Built for non-resident capital', 'USD exposure — but an offshore fund is exactly what the PFIC rules were written for'],
        ['US-domiciled funds holding Indian securities', 'No — a US fund is not a PFIC', 'Open through your US broker', 'The simplest compliant India exposure for most US persons'],
      ],
      note: 'Nothing here is US tax advice. PFIC classification is fact-specific and expensive to get wrong — take advice from a US tax professional before you invest, not after.',
    },
    verdicts: [
      {
        side: 'Start here',
        when: [
          'Assume every pooled Indian fund is a PFIC until a US tax professional tells you otherwise, in writing',
          'Prefer structures where you hold the securities in your own name — direct equity, a PMS, deposits',
          'Consider whether a US-domiciled fund holding Indian securities gets you most of what you wanted, with none of the reporting',
          'Budget for the compliance cost, every year, not just the tax',
          'Get the FEMA routing right at the outset, because it decides repatriation later',
        ],
      },
      {
        side: 'Be cautious about',
        when: [
          'Any Indian fund sold to you with the reassurance that "many NRIs invest in this"',
          'GIFT City structures presented as a way around US reporting — an offshore fund is the classic PFIC',
          'Deferring the analysis until your first filing, by which point the elections available to you may have narrowed',
          'Advice from anyone who cannot tell you what Form 8621 is',
        ],
      },
    ],
    sections: [
      {
        h: 'What a PFIC actually does to you',
        body: [
          'A passive foreign investment company is, broadly, a non-US pooled vehicle whose income or assets are mostly passive. An Indian mutual fund fits that description comfortably.',
          'Under the default regime, gains and certain distributions are taxed at the highest ordinary rates rather than at capital gains rates, with an interest charge added for each year of deferral. The longer you held it, the worse the outcome.',
          'On top of that sits Form 8621 — filed per fund, per year. Preparation is specialised and the fees are not trivial. Several funds across several years becomes a meaningful annual expense on its own.',
          '<b>This is why a US person cannot evaluate an Indian fund on its returns.</b> The reporting regime can consume the outperformance and then some.',
        ],
      },
      {
        h: 'What is not a PFIC',
        body: [
          'The rule is about pooled foreign vehicles. So the way out is generally to hold securities directly rather than through one.',
          'Direct Indian equity in your own demat account is ordinary foreign stock for US purposes. A PMS holds shares in your own name, so it is generally treated the same way — which is the single strongest structural argument for PMS in this corridor, quite apart from the strategy.',
          'A bank deposit is not a fund. NRE interest is exempt in India for a non-resident, but you still report and pay on it in the US.',
          'A US-domiciled fund that invests in Indian securities is a US fund. No Form 8621, ordinary US treatment, and available through the broker you already use. For many US persons this is the sensible default, and it is under-discussed because nobody in India earns anything by suggesting it.',
        ],
      },
      {
        h: 'The access problem, and why it is the smaller problem',
        body: [
          'Many Indian AMCs and portfolio managers decline US residents. It is a commercial decision — accepting US money risks pulling them into US securities law — not an Indian legal bar on you.',
          'So people spend their energy hunting for a house that will accept them. That is solving the easier half.',
          'If the house that says yes sells you a pooled fund, you have bought a PFIC. <b>Solving access without solving tax makes your position worse, not better.</b> Establish which structures work for you first, then find a house that offers one of them.',
        ],
      },
      {
        h: 'Reporting obligations that come with the territory',
        body: ['These sit alongside the PFIC question and are not optional.'],
        points: [
          '<b>FBAR.</b> Foreign financial accounts above the threshold are reported annually. Indian bank and demat accounts count.',
          '<b>FATCA.</b> Specified foreign financial assets are reported on your return above thresholds that vary with filing status and residence.',
          '<b>Form 8621.</b> Per PFIC, per year, with the elections that are available to you made in time.',
          '<b>India-side filing.</b> Indian income may require an Indian return, and treaty relief needs a residency certificate plus the Indian information form.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Buying Indian mutual funds because a relative in India recommended them',
        why: 'The recommendation is sound for someone filing only in India. For a US person the same fund carries punitive default taxation and annual reporting that the person recommending it has never had to deal with.',
      },
      {
        m: 'Treating GIFT City as a way around US reporting',
        why: 'An offshore pooled fund is precisely what the PFIC rules were written to catch. GIFT City can be an excellent Indian-side structure; it changes nothing about what a US person files.',
      },
      {
        m: 'Discovering the problem at your first filing after investing',
        why: 'Some of the elections that soften PFIC treatment must be made in the first year you hold the interest. Finding out afterwards can leave you with only the harshest regime available.',
      },
      {
        m: 'Renouncing the investment case entirely',
        why: 'The opposite error. India exposure is entirely achievable for a US person through direct holdings, a PMS, or a US-domiciled fund. The constraint is on the wrapper, not on the exposure.',
      },
    ],
    faqs: [
      {
        q: 'Can a US-based NRI invest in Indian mutual funds?',
        a: 'Legally yes, subject to the AMC accepting US residents, and several do not. The harder question is whether you should: a pooled Indian fund is generally a PFIC, bringing punitive default taxation and annual Form 8621 reporting.',
      },
      {
        q: 'Is PMS a PFIC for a US taxpayer?',
        a: 'Generally not, because a PMS holds shares in your own name rather than issuing you units in a pooled vehicle. That is its main structural advantage in this corridor — but confirm it against your own facts with a US tax professional before relying on it.',
      },
      {
        q: 'What is the simplest way for a US person to get India exposure?',
        a: 'A US-domiciled fund holding Indian securities, bought through your existing US broker. No Form 8621, ordinary US tax treatment, no FEMA routing, no Indian filing. It gets you most of the exposure with almost none of the complexity.',
      },
      {
        q: 'Does GIFT City solve the PFIC problem?',
        a: 'No. A GIFT City fund is an offshore pooled vehicle from a US perspective, which is exactly what the PFIC regime targets. It may be an excellent structure for other reasons; it is not a US tax solution.',
      },
    ],
    related: [
      { label: 'US and Canadian NRIs: PFIC, FATCA and FBAR', href: '/learn/us-nri-pfic' },
      { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic' },
      { label: 'Which AMCs accept US NRIs?', href: '/learn/which-amcs-accept-us-nri' },
      { label: 'Form 8621 filing requirements', href: '/us-tax/form-8621-filing-requirements' },
      { label: 'How to avoid PFIC status', href: '/us-tax/how-to-avoid-pfic-status' },
      { label: 'The US corridor guide', href: '/nri/us' },
    ],
    sources: [IRS_PFIC, SEBI_PMS, SEBI_MF, RBI_FI, IFSCA_FM],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'where-to-invest-1-crore-in-india',
    kind: 'best-for',
    title: 'Where to invest ₹1 crore in India',
    sides: [
      { label: 'Mutual funds', sub: 'The core', href: '/learn/mutual-funds' },
      { label: 'PMS', sub: 'Clears the minimum', href: '/learn/what-is-pms' },
      { label: 'SIF', sub: 'The hedged sleeve', href: '/learn/long-short-sif' },
      { label: 'AIF', sub: 'Exactly one commitment', href: '/learn/what-is-aif' },
      { label: 'REITs', sub: 'Income, listed', href: '/learn/reits-invits' },
    ],
    hook: '₹1 crore is the first amount at which every structure in India is technically open to you. That is exactly why it is the easiest amount to misallocate.',
    capsule:
      'At ₹1 crore you clear every SEBI minimum, which makes the shelf larger than your portfolio can safely use. The structural answer is a low-cost listed core, a hedged or income sleeve, and at most one illiquid commitment — sized so that if it returned nothing, your plans would not change.',
    metaTitle: 'Where to Invest ₹1 Crore in India: The Structural Shortlist',
    metaDescription:
      'At ₹1 crore every SEBI minimum is open to you. Which structures actually belong at this size, how to sequence them, and the mistake that defines this bracket.',
    table: {
      caption: 'What ₹1 crore unlocks, and whether it should',
      head: ['Structure', 'Minimum', 'Now open to you?', 'Should it be the whole ₹1 crore?'],
      rows: [
        ['Mutual funds', '₹500', 'Already was', 'It can be, and for many people it should be. Nothing is cheaper for listed exposure'],
        ['REITs and InvITs', 'One unit', 'Already was', 'No — but a sensible income sleeve, sized deliberately'],
        ['SIF', '₹10 lakh', 'Yes', 'No. One or two strategies at ₹10–25 lakh is the natural size here'],
        ['PMS', '₹50 lakh', 'Yes, just', 'Almost never. ₹50 lakh with one manager is half your liquid wealth at this level'],
        ['AIF', '₹1 crore', 'Yes, exactly', 'Absolutely not. A single ₹1 crore illiquid commitment at ₹1 crore of net worth is the classic error'],
        ['GIFT City funds', 'From US $5,000, fund-dependent', 'Yes', 'No — but a currency-diversification sleeve is reasonable if you have foreign obligations'],
      ],
      note: 'Structural guidance about category suitability, not personal advice. Your own liquidity needs, income and existing holdings decide the answer.',
    },
    verdicts: [
      {
        side: 'If ₹1 crore is most of your liquid wealth',
        when: [
          'The answer is dull and correct: a low-cost listed core, short-dated money in deposits, and an emergency reserve you never touch',
          'PMS at ₹50 lakh would be half of everything with one manager — the minimum is not a suitability test',
          'A ₹1 crore AIF commitment would be all of it, locked, with capital calls arriving on the fund\'s schedule rather than yours',
          'A SIF at ₹10–25 lakh is a proportionate way to add a hedged sleeve',
          'The right move at this level is usually to keep compounding and revisit when the shelf is a smaller share of the whole',
        ],
      },
      {
        side: 'If ₹1 crore is surplus above a much larger portfolio',
        when: [
          'You can treat this as a sleeve rather than a portfolio, which changes everything',
          'One illiquid commitment is reasonable if it would not change your plans were it to return nothing',
          'A PMS makes sense if you specifically want direct ownership, exclusions, or a manager you have diligenced',
          'A GIFT City allocation is worth considering if you have foreign currency obligations — fees abroad, family overseas',
          'Decide the sleeve\'s job first, then pick the cheapest structure that can do it',
        ],
      },
    ],
    sections: [
      {
        h: 'The mistake that defines this bracket',
        body: [
          'At ₹1 crore, every door opens at once. Every distributor in India knows it, and the calls start.',
          'The predictable outcome is one of each: a PMS, an AIF commitment, a structured note, some direct stocks, and the mutual funds that were already there. No allocation policy, heavy overlap between the holdings, and no single view of the whole.',
          'Three years later the portfolio has more products than positions. Most of them do the same thing, several are locked, and none of it was designed.',
          '<b>Allocation is the decision. Product selection is what happens afterwards.</b> Anyone who starts with the product has skipped the only part that matters.',
        ],
      },
      {
        h: 'The order to do this in',
        body: ['Nothing here is exotic. It is the sequence that prevents the expensive errors.'],
        points: [
          '<b>One.</b> Emergency reserve — six to twelve months of actual outgoings, in a deposit or liquid fund. It never gets invested.',
          '<b>Two.</b> Every obligation inside three years, funded in something that matures before it is due. School fees, a tax payment, a property instalment.',
          '<b>Three.</b> The listed core. This is the largest slice and the cheapest to own. Boring by design.',
          '<b>Four.</b> One diversifying sleeve — hedged, or income-producing — if the core is all one bet on Indian equity.',
          '<b>Five.</b> At most one illiquid commitment, and only if steps one to four are genuinely complete.',
        ],
      },
      {
        h: 'The liquidity test that settles most arguments',
        body: [
          'Before any lock-in, run this: if the whole commitment returned nothing and the money were unavailable for seven years, would your plans change?',
          'If the answer is yes, the position is too large. The expected return does not matter, because you will not be there to collect it — you will have been forced to exit something else at the wrong moment.',
          'At exactly ₹1 crore of liquid wealth, a ₹1 crore AIF commitment fails this test completely. It is the single most common misallocation in this bracket, and it is always sold with a good story.',
        ],
      },
      {
        h: 'What actually changes as the number grows',
        body: [
          'Not the quality of the instruments — a mutual fund does not become worse at ₹10 crore. What changes is the range of problems you have.',
          'At ₹1 crore, the problem is usually growth and discipline. At ₹5 crore, it becomes correlation: everything you own falls together. At ₹25 crore, it becomes currency, succession and governance.',
          'Alternatives are answers to the later problems. Buying them early means paying for solutions to problems you do not have yet, and giving up liquidity you probably still need.',
        ],
      },
    ],
    mistakes: [
      {
        m: 'Committing the full ₹1 crore to a single AIF because the minimum matched',
        why: 'The minimum describing who may be sold the product is not the same as the amount you should commit. A single illiquid position equal to your entire liquid net worth is a concentration, not an allocation.',
      },
      {
        m: 'Buying one of everything in the first six months',
        why: 'Products bought individually rarely add up to a portfolio. Heavy overlap, unmeasured concentration and several lock-ins that nobody totalled. Decide the shape first, then fill it.',
      },
      {
        m: 'Treating the ₹50 lakh PMS minimum as permission',
        why: 'At ₹1 crore of liquid wealth, ₹50 lakh with one manager is half of everything you have, in one strategy, with one team. The threshold is regulatory, not a suitability assessment.',
      },
      {
        m: 'Investing the money earmarked for something specific',
        why: 'A down payment, a tax bill, a capital call, school fees abroad. Money with a date does not belong in anything that can be worth less on that date.',
      },
    ],
    faqs: [
      {
        q: 'Should I put ₹1 crore into a PMS?',
        a: 'Rarely, if that ₹1 crore is most of your liquid wealth. ₹50 lakh is the minimum, which would be half of everything with a single manager. If ₹1 crore is a sleeve of a much larger portfolio, a PMS is a reasonable use for part of it.',
      },
      {
        q: 'What return can I expect on ₹1 crore in India?',
        a: 'Depends entirely on what you hold. This site publishes indicative ranges per structure — roughly 6–7.5% for debt, 12–14% for diversified equity, higher and far more dispersed for private assets. All indicative, none contractual, and the dispersion in private assets is wider than the headline suggests.',
      },
      {
        q: 'Is ₹1 crore enough to invest in AIFs?',
        a: 'It clears the minimum, which is not the same question. A single ₹1 crore illiquid commitment against ₹1 crore of liquid wealth fails any sensible liquidity test. AIFs generally make sense once ₹1 crore is a modest share of your portfolio, not the whole of it.',
      },
      {
        q: 'How should I split ₹1 crore?',
        a: 'By when you need each rupee, not by product. Fund the emergency reserve, then everything needed within three years, then the low-cost listed core, then one diversifying sleeve. Illiquid commitments come last, if at all.',
      },
    ],
    related: [
      { label: 'Mutual fund alternatives for HNIs', href: '/compare/mutual-fund-alternatives-for-hni' },
      { label: 'PMS minimum investment', href: '/learn/pms-minimum-investment' },
      { label: 'AIF minimum investment', href: '/learn/aif-minimum-investment' },
      { label: 'SIF vs PMS', href: '/compare/sif-vs-pms' },
      { label: 'Alternatives to a fixed deposit', href: '/compare/fixed-deposit-alternatives' },
      { label: 'Run the Fit Finder', href: '/fit-finder' },
    ],
    sources: [SEBI_PMS, SEBI_AIF, SEBI_SIF, SEBI_MF, SEBI_REIT, IFSCA_FM],
    reviewed: REVIEWED,
    published: PUBLISHED,
    regulatoryAsAt: REVIEWED,
  },
]
