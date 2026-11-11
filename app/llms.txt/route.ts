import { SITE } from '@/lib/constants'
import { PRODUCTS } from '@/lib/content/products'
import { ANSWERS } from '@/lib/content/answers'
import { US_TAX } from '@/lib/content/usTax'
import { UK_TAX } from '@/lib/content/ukTax'
import { GIFT_CITY } from '@/lib/content/giftCity'
import { CORRIDORS } from '@/lib/content/corridors'

/**
 * /llms.txt — a plain-text map of the site for AI assistants.
 *
 * Whether any given engine reads this file is unproven; it costs nothing and
 * it is generated from the same content data as the pages, so it cannot drift.
 * Categories and questions only: the named fund shelves are gated and are
 * deliberately absent, same as the sitemap.
 */
export const dynamic = 'force-static'

const line = (label: string, path: string, note?: string) =>
  `- [${label}](${SITE.url}${path})${note ? `: ${note}` : ''}`

export function GET() {
  const body = [
    `# ${SITE.name}`,
    '',
    '> A free, education-first map of every SEBI- and IFSCA-regulated alternative investment structure in India: PMS, AIF, SIF, REITs, private credit and GIFT City. Written for resident Indian families and for NRIs in the United States, the United Kingdom and the UAE. Published by Beyond, a wealth-distribution boutique within JSL Wealth Management Private Limited, Vadodara, built on Jhaveri Securities Ltd (est. 1992).',
    '',
    'Every page carries a named author, a last-reviewed date and its primary sources. Content is education, not investment or tax advice. Indian income-tax section numbers are deliberately not cited: the Income-tax Act, 1961 was repealed on 1 April 2026 and replaced by the Income-tax Act, 2025.',
    '',
    '## Start here',
    line('The Spectrum: every structure on one map', '/'),
    line('Learn: the fundamentals', '/learn'),
    line('Fit Finder: seven questions, a shortlist', '/fit-finder'),
    line('Tax schedule for FY 2026-27, resident and NRI', '/tax'),
    line('About the desk and the author', '/about'),
    '',
    '## Fundamentals',
    line('What is PMS?', '/learn/what-is-pms'),
    line('What is an AIF?', '/learn/what-is-aif'),
    line('PMS vs AIF', '/learn/pms-vs-aif'),
    '',
    '## The thirteen structures',
    ...PRODUCTS.map((p) => line(p.name, `/learn/${p.slug}`, `${p.badge}, minimum ${p.min}`)),
    '',
    '## NRI corridors',
    line('NRI investing in India: the three corridors', '/nri'),
    ...CORRIDORS.map((c) => line(`NRIs in ${c.label}`, `/nri/${c.slug}`, c.hook)),
    '',
    '## US tax for NRIs (PFIC, Form 8621, Form 8802)',
    line('US tax hub', '/us-tax'),
    ...US_TAX.map((a) => line(a.question, `/us-tax/${a.slug}`)),
    line('US and Canadian NRIs: PFIC, FATCA and FBAR', '/learn/us-nri-pfic'),
    '',
    '## UK tax for NRIs (HMRC reporting funds)',
    line('UK tax hub', '/uk-tax'),
    ...UK_TAX.map((a) => line(a.question, `/uk-tax/${a.slug}`)),
    '',
    '## GIFT City',
    line('GIFT City: inbound and outbound routes', '/gift-city'),
    ...GIFT_CITY.map((a) => line(a.question, `/gift-city/${a.slug}`)),
    '',
    '## Straight answers',
    ...ANSWERS.map((a) => line(a.question, `/learn/${a.slug}`)),
    '',
    '## Legal',
    line('Disclosures', '/disclosures'),
    line('Privacy', '/privacy'),
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
