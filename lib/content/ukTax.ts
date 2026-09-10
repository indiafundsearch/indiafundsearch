import type { Answer } from './answers'
import type { Source } from './types'

/**
 * /uk-tax cluster (Appendix A, Task A.2) — the fastest win on the site.
 *
 * The existing /learn/hmrc-reporting-fund-status-india page already ranks at
 * position 26 with no backlinks, and six UK keywords totalling ~1,300 searches
 * a month all show keyword difficulty 0.
 *
 * CRITICAL INTENT NOTE. The two highest-volume terms want a LIST, not an
 * explanation. /uk-tax/hmrc-reporting-funds-list therefore leads with the
 * maintained table (see components/learn/HmrcFundTable.tsx), not with prose.
 *
 * The original /learn URL stays live and linked; it holds the only positional
 * equity this cluster has, and the brief is explicit that it must not be moved.
 */

const HMRC_LIST: Source = { label: 'Offshore funds: list of reporting funds', url: 'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds', issuer: 'HMRC', date: 'updated monthly' }
const IFM13412: Source = { label: 'IFM13412 — charge to tax on offshore income gains', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13412', issuer: 'HMRC', documentNumber: 'IFM13412' }
const IFM12220: Source = { label: 'IFM12220 — definition of an offshore fund', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12220', issuer: 'HMRC', documentNumber: 'IFM12220' }
const IFM12146: Source = { label: 'IFM12146 — UK investors in reporting funds', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm12146', issuer: 'HMRC', documentNumber: 'IFM12146' }
const IFM13550: Source = { label: 'IFM13550 — losses on non-reporting funds', url: 'https://www.gov.uk/hmrc-internal-manuals/investment-funds/ifm13550', issuer: 'HMRC', documentNumber: 'IFM13550' }

const PUBLISHED = 'September 2026'
const REVIEWED = 'September 2026'
const base = { published: PUBLISHED, reviewed: REVIEWED, regulatoryAsAt: REVIEWED }

export const UK_TAX: Answer[] = [
  {
    ...base,
    slug: 'hmrc-reporting-funds-list',
    question: 'HMRC reporting funds list: which Indian funds are on it',
    answer:
      'HMRC publishes the list of approved offshore reporting funds monthly. As at 4 August 2026, 18 India-domiciled or GIFT City parent funds held status across 69 share classes. The table below is the India-exposed extract, dated, with the method stated.',
    metaTitle: 'HMRC Reporting Funds List: Indian Funds Extract',
    metaDescription:
      'The India-exposed extract of HMRC\'s approved reporting funds list: 18 parent funds across 69 share classes, dated, with the method and three cautions.',
    sections: [
      { h: 'What this list is',
        body: ['HMRC maintains a register of offshore funds that have been approved as reporting funds. A UK investor in a fund on that list is taxed on disposal as a capital gain. A UK investor in one that is not is taxed as income.',
               'The full file runs to more than 124,000 share-class rows across every jurisdiction. The table below is the India-exposed extract.'] },
      { h: 'Three cautions before you read the table',
        body: [],
        points: ['<b>Status belongs to a share class</b>, not to a fund. Finding the fund name is not the check.',
                 '<b>Status runs from a date.</b> Most Indian entries only begin in April 2025, so a longer-held holding may have been non-reporting for part of its life.',
                 '<b>Status can cease.</b> One GIFT City class came off the list on 31 March 2026.'] },
      { h: 'How to check your own holding',
        body: ['Open HMRC\'s published file, search for your exact share class rather than the fund name, and check the dates it covers. Do it before you subscribe and again before you sell.'] },
      { h: 'Reproducing this table',
        body: ['This extract may be reproduced with attribution and a link to this page. The underlying data is HMRC\'s and is published monthly; our extract states the file date it was taken from.'] },
    ],
    faqs: [
      { q: 'How often does HMRC update the list?', a: 'Monthly. Our extract names the file date it was parsed from, so you can see how current it is.' },
      { q: 'Are GIFT City funds on the list?', a: 'Some are. Five of the eighteen India-exposed parent funds in the current extract are GIFT City or IFSC funds.' },
      { q: 'Does a fund on the list stay on it?', a: 'Not necessarily. Status can cease, and one GIFT City share class came off the list on 31 March 2026.' },
      { q: 'Can I rely on this table?', a: 'Treat it as a signpost to HMRC\'s own file, not as a substitute for it. Always confirm your exact share class against the current HMRC publication.' },
    ],
    related: [
      { label: 'UK reporting fund status explained', href: '/uk-tax/uk-reporting-fund-status' },
      { label: 'Reporting vs non-reporting funds', href: '/uk-tax/reporting-vs-non-reporting-funds' },
      { label: 'Offshore reporting funds', href: '/uk-tax/offshore-reporting-funds' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
    ],
    sources: [HMRC_LIST, IFM13412, IFM12220],
  },
  {
    ...base,
    slug: 'uk-reporting-fund-status',
    question: 'What is UK reporting fund status?',
    answer:
      'It is a status HMRC grants to an offshore fund that agrees to report its income to UK investors each year, whether or not it distributes that income. With it, your gain on sale is a capital gain. Without it, the gain is charged to income tax instead.',
    metaTitle: 'UK Reporting Fund Status: What It Means for You',
    metaDescription:
      'What HMRC reporting fund status is, what a fund must do to hold it, and what changes for a UK investor on disposal when a fund has it and when it does not.',
    sections: [
      { h: 'What the status is',
        body: ['A reporting fund undertakes to report its income to UK investors annually, in a form HMRC prescribes, whether or not that income is paid out.',
               'In return, UK investors are taxed on disposal under the capital gains rules rather than as income.'] },
      { h: 'What you take on when a fund has it',
        body: ['Reporting status is better on exit, but it is not free. You must declare the fund\'s reported income each year, including excess reported income the fund did not distribute.',
               'In an accumulating fund that means tax on money you have not received.'] },
      { h: 'What it does not cover',
        body: ['Status attaches to a share class from a stated date. It does not reach back over a period before that date, and it can be withdrawn.'] },
      { h: 'Where to check', body: ['HMRC publishes the approved list monthly. Our India-exposed extract is on the reporting funds list page.'] },
    ],
    related: [
      { label: 'HMRC reporting funds list: Indian funds', href: '/uk-tax/hmrc-reporting-funds-list' },
      { label: 'Reporting vs non-reporting funds', href: '/uk-tax/reporting-vs-non-reporting-funds' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
    ],
    sources: [IFM12146, IFM12220, HMRC_LIST],
  },
  {
    ...base,
    slug: 'offshore-reporting-funds',
    question: 'What counts as an offshore fund for HMRC?',
    answer:
      'Broadly, a non-UK body corporate, property held on trust, or an arrangement creating rights in the nature of co-ownership. If your holding is inside one of those and it lacks reporting status, your gain on disposal is taxed as income rather than as a capital gain.',
    metaTitle: 'HMRC Offshore Reporting Funds: What Counts',
    metaDescription:
      'How HMRC defines an offshore fund, what falls inside and outside the rules, and why a discretionary managed account is treated differently.',
    sections: [
      { h: 'The definition',
        body: ['The offshore fund rules bite on three things: a non-UK body corporate, property held on trust, and arrangements creating rights in the nature of co-ownership.',
               'Most pooled Indian vehicles fall inside one of those descriptions.'] },
      { h: 'What sits outside',
        body: ['A discretionary managed account is not a fund. In an Indian portfolio management service, SEBI requires that the manager must not hold client securities in its own name, so you hold the shares directly, pooled with nobody.',
               'On that basis the offshore fund rules should not apply and your gains should be capital gains. Two honest caveats: HMRC has published no guidance on managed accounts, so this is a well-supported reading rather than settled law, and it turns on how your particular mandate is constituted.'] },
      { h: 'The administrative trade',
        body: ['If the offshore fund rules do not apply, every trade your manager makes is your own UK disposal, each needing share-pooling treatment and a sterling conversion. Ask whether the manager provides UK-basis reporting.'] },
    ],
    related: [
      { label: 'UK reporting fund status', href: '/uk-tax/uk-reporting-fund-status' },
      { label: 'HMRC reporting funds list: Indian funds', href: '/uk-tax/hmrc-reporting-funds-list' },
      { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms' },
    ],
    sources: [IFM12220, IFM13412],
  },
  {
    ...base,
    slug: 'reporting-vs-non-reporting-funds',
    question: 'Reporting vs non-reporting funds: what actually changes',
    answer:
      'The rate and the character of the charge. A reporting fund gives you capital gains treatment on disposal, plus an annual duty to declare reported income. A non-reporting fund produces an offshore income gain, charged to income tax with no annual exempt amount.',
    metaTitle: 'Reporting vs Non-Reporting Funds: The Real Difference',
    metaDescription:
      'What changes between a reporting and a non-reporting offshore fund: the character of the charge on disposal, the allowances you keep, and loss relief.',
    sections: [
      { h: 'Side by side',
        body: ['The difference shows up on disposal, and it is not marginal.'],
        points: ['<b>Reporting:</b> capital gains treatment on disposal, plus annual tax on reported income including amounts not paid out.',
                 '<b>Non-reporting:</b> an offshore income gain, charged to income tax at your marginal rate.',
                 '<b>Annual exempt amount:</b> available against a capital gain, not against an offshore income gain.',
                 '<b>Allowances:</b> the dividend and savings allowances do not apply to an offshore income gain.',
                 '<b>Losses:</b> asymmetric. No loss arises for offshore income gain purposes, and a capital loss cannot be set against the income charge.'] },
      { h: 'Why the loss point matters most',
        body: ['If one holding gains and another loses, you might expect them to offset. They do not. The gain is charged as income and the loss is a capital loss, so they never meet.'] },
      { h: 'What to do about it',
        body: ['Check the status of your exact share class before you buy, and again before you sell. Our India-exposed extract of HMRC\'s list is the starting point.'] },
    ],
    related: [
      { label: 'HMRC reporting funds list: Indian funds', href: '/uk-tax/hmrc-reporting-funds-list' },
      { label: 'UK reporting fund status', href: '/uk-tax/uk-reporting-fund-status' },
      { label: 'NRIs in the United Kingdom', href: '/nri/uk' },
    ],
    sources: [IFM13412, IFM13550, IFM12146],
  },
]

export const ukTaxBySlug = (slug: string) => UK_TAX.find((a) => a.slug === slug)
export const UK_TAX_SLUGS = UK_TAX.map((a) => a.slug)
