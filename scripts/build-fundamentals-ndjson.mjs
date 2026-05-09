/**
 * Build scripts/seed-articles-fundamentals.ndjson from a structured
 * source so re-runs produce stable, diff-friendly Portable Text JSON.
 *
 * Usage: node scripts/build-fundamentals-ndjson.mjs
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

const ARTICLES = [
  {
    id: 'article-what-is-pms',
    slug: 'what-is-pms',
    title: 'What is PMS?',
    publishedAt: '__PUBLISHED_AT__',
    seoTitle: 'What is PMS? A plain-English guide to Portfolio Management Services',
    seoDescription:
      'Portfolio Management Services explained without jargon — what they are, who they\'re for, and how they actually differ from a mutual fund.',
    sections: [
      {
        paragraphs: [
          'Portfolio Management Service is the official name for "I have at least ₹50 lakh and I want a SEBI-registered manager to buy stocks for me directly, in my own demat account, instead of pooling my money with thousands of other investors." That is roughly the entire concept.',
        ],
      },
      {
        heading: 'How is it different from a mutual fund?',
        paragraphs: [
          'In a mutual fund, your money is pooled with everyone else\'s. The fund holds the stocks; you hold units of the fund. Tax events happen at the fund level. Strategies are diversified by regulation, so even an "aggressive" equity mutual fund cannot put 30% of its book into one company.',
          'In a PMS, the stocks sit in a demat account that has your name on it. The manager has discretionary power to buy and sell, but the holdings are yours, line-by-line. That changes three things: you see exactly what you own; tax events happen on your individual buys and sells; and the manager can run a much more concentrated book — 25 stocks, 15 stocks, sometimes fewer.',
        ],
      },
      {
        heading: 'Who is PMS for?',
        paragraphs: [
          'The ₹50 lakh minimum is a hard regulatory floor. But the more useful question is: who is it appropriate for? Roughly, an investor who already has a mutual fund and direct-equity portfolio they understand, has ₹50L–₹5Cr of incremental surplus they can lock up for at least three years, and wants concentrated exposure to a manager\'s best ideas without trying to run a stock book themselves.',
          'It is not a starter product. If your portfolio is mostly fixed deposits and you have never held a single stock through a 30% drawdown, the PMS structure will amplify a discomfort you have not yet sat with.',
        ],
      },
      {
        heading: 'What to know before allocating',
        paragraphs: [
          'Fees are not standardised. A PMS can charge 2.5% management with no performance fee, or 1% management plus 20% performance over a hurdle, or any combination in between. Two structures with the same headline often produce very different net outcomes — run them through the Fee X-Ray before signing.',
          'Concentration cuts both ways. The same structural feature that lets a great manager outperform also lets a mediocre one underperform sharply. Read the manager\'s full-cycle track record (including their drawdowns) and the SEBI registration record. The Scorecard walks you through twenty things worth checking before you commit.',
          'And: lock-in. Most PMS strategies have an exit-load grid that punishes early withdrawal. The capital you allocate should match a real three-to-seven-year horizon, not a "we\'ll see how it goes" intent.',
        ],
      },
    ],
  },
  {
    id: 'article-what-is-aif',
    slug: 'what-is-aif',
    title: 'What is AIF?',
    publishedAt: '__PUBLISHED_AT__',
    seoTitle: 'What is AIF? Alternative Investment Funds, decoded',
    seoDescription:
      'Alternative Investment Funds — what they are, the three SEBI categories, and what AIFs can do that mutual funds and PMS cannot.',
    sections: [
      {
        paragraphs: [
          'An Alternative Investment Fund is a pooled vehicle, regulated by SEBI, that exists specifically to do things mutual funds are not allowed to do. The minimum ticket is ₹1 crore, the structures are typically closed-ended, and the underlying investments are often illiquid — private companies, real estate, structured credit, hedge-fund-style long/short books.',
        ],
      },
      {
        heading: 'The three categories',
        paragraphs: [
          'SEBI buckets every AIF into one of three categories, and they are very different products.',
          'Category I covers early-stage and impact: venture capital funds, social-impact funds, infrastructure funds, SME funds. The regulator considers these economically beneficial and gives them tax pass-through.',
          'Category II is the largest by assets and the most diverse. It is the "everything else that isn\'t hedge-fund-like" bucket — private equity, real estate, private credit, pre-IPO. Lock-ups are long (often 7–10 years).',
          'Category III is hedge-fund-style: long-short equity, derivatives strategies, quant. These are the only AIFs allowed to use leverage. They are also the only category where the fund itself is taxed at the entity level (not pass-through), which materially affects net returns.',
        ],
      },
      {
        heading: 'What AIFs can do that mutual funds cannot',
        paragraphs: [
          'Concentration. An AIF can hold a single position at 25% of NAV without raising eyebrows. A mutual fund cannot.',
          'Illiquidity. AIFs can lock up capital for years and invest in things that have no daily price (private companies, real estate). Mutual funds cannot.',
          'Strategy. Long/short, quant, derivatives-heavy — none of these are available in mutual fund form in India.',
          'The cost of those freedoms is a higher fee load (2% management + 20% performance is typical), longer lock-ups, and far less daily liquidity.',
        ],
      },
      {
        heading: 'What to watch for',
        paragraphs: [
          'AIF disclosures are not standardised the way mutual fund factsheets are. Two Cat II funds claiming "real estate exposure" can be doing very different things. Read the Private Placement Memorandum (PPM) — it is the source of truth on what the fund will actually do.',
          'Past performance is even less indicative than usual. Vintage matters: a 2017-vintage real estate fund and a 2024-vintage real estate fund are not comparable. Ask for both gross and net IRRs, and ask how the manager calculates them.',
        ],
      },
    ],
  },
  {
    id: 'article-pms-vs-aif',
    slug: 'pms-vs-aif',
    title: 'PMS vs AIF',
    publishedAt: '__PUBLISHED_AT__',
    seoTitle: 'PMS vs AIF — which is the right structure for you?',
    seoDescription:
      'PMS and AIF are both HNI products but they solve different problems. A practical comparison of structure, liquidity, fees, and fit.',
    sections: [
      {
        paragraphs: [
          'PMS and AIF often get talked about in the same breath because they share an HNI audience and a SEBI registration. Structurally, they are completely different products doing different jobs.',
        ],
      },
      {
        heading: 'PMS = direct stock ownership',
        paragraphs: [
          'In a PMS the underlying assets sit in a demat account that has your name on it. The manager runs a concentrated portfolio of listed Indian equities (occasionally with a small fixed-income sleeve). You can see every line item. Tax events happen on your individual trades. Liquidity is high — you can typically exit within a few weeks, paying any disclosed exit load.',
          'The product is best understood as "an actively managed concentrated equity portfolio, owned in your own name." That is it.',
        ],
      },
      {
        heading: 'AIF = pooled access to private markets',
        paragraphs: [
          'In an AIF your capital is pooled with other investors. The fund (not you) owns the underlying — which is rarely listed equity. Real estate, private credit, pre-IPO equity, hedge-fund-style strategies. Lock-ups are long, often 5–10 years. Liquidity is low. Tax treatment depends on the category and is materially different from PMS.',
          'The product is best understood as "a private-markets vehicle that gives you access to asset classes mutual funds cannot reach."',
        ],
      },
      {
        heading: 'When each makes sense',
        paragraphs: [
          'Choose PMS when you want concentrated active management of listed Indian equities, in your own name, with reasonable liquidity. Most first-time alternative-tier allocators belong here.',
          'Choose an AIF when your portfolio already has solid public-market exposure and you want a specific private-markets exposure (real estate, credit, pre-IPO, long-short) that you cannot get any other way. The lock-up and complexity make sense only when you are paying for an exposure you genuinely want.',
          'A surprisingly common mistake: allocating to an AIF when what you actually wanted was a high-quality concentrated equity fund. If the underlying is going to be listed equities anyway, the PMS structure is almost always more transparent, more liquid, and tax-cleaner.',
        ],
      },
    ],
  },
  {
    id: 'article-aif-categories-decoded',
    slug: 'aif-categories-decoded',
    title: 'AIF Categories Decoded',
    publishedAt: '__PUBLISHED_AT__',
    seoTitle: 'AIF Cat I, II, III — decoded',
    seoDescription:
      'The three AIF categories sound similar but behave like different products. What each can do, lock-ups, tax, and how to pick.',
    sections: [
      {
        paragraphs: [
          'AIFs come in three SEBI categories. They share a name and a ₹1 crore minimum, and almost nothing else. The category determines what the fund can invest in, how it is taxed, whether it can use leverage, and what kind of investor it is suitable for.',
        ],
      },
      {
        heading: 'Cat I: early-stage and impact',
        paragraphs: [
          'Venture capital funds, social-impact funds, infrastructure funds, SME funds. The regulator considers Cat I economically beneficial and grants pass-through tax treatment — gains flow through to the investor, taxed at the investor\'s slab/rate.',
          'Lock-ups are long (7–10 years is common). Risk is concentrated. For most investors, Cat I is appropriate only as a small slice of a much larger portfolio, and only when the manager has a verifiable track record.',
        ],
      },
      {
        heading: 'Cat II: PE, real estate, debt',
        paragraphs: [
          'The largest category by assets and the most diverse. Private equity funds, real estate funds, infrastructure debt funds, distressed-credit funds, pre-IPO funds. Cat II is also pass-through for tax.',
          'Within Cat II, "real estate" can mean stabilised yielding properties, development credit, or opportunistic equity — three very different risk profiles. Read the PPM. Two funds with identical category labels can do very different things.',
        ],
      },
      {
        heading: 'Cat III: hedge-fund-style',
        paragraphs: [
          'Long-short equity, market-neutral, quant, derivatives strategies. The only AIF category allowed to use leverage. The only category taxed at the fund level rather than pass-through, which materially eats into net returns — Cat III at 30%+ effective fund-level tax is hard to justify against a high-quality long-only PMS unless the strategy genuinely earns its keep.',
          'Cat III is also where due diligence matters most. Many "long-short" funds in India are 90% long with a token short overlay — beta dressed up as alpha. The Scorecard\'s performance integrity dimension is built specifically to surface this.',
        ],
      },
      {
        heading: 'Picking the right category',
        paragraphs: [
          'Start with the exposure you want, not the category. If you want exposure to private companies before they list, you are looking for Cat II pre-IPO. If you want to fund stabilised commercial real estate, Cat II real estate yield. If you want a long/short equity strategy, Cat III. If you want to back early-stage Indian startups, Cat I venture.',
          'The category follows the exposure. Working the other way around — picking a category and then shopping for funds — is how investors end up in vehicles whose underlying does not match their actual goal.',
        ],
      },
    ],
  },
]

function buildPortableText(sections) {
  const blocks = []
  let counter = 0
  const next = () => {
    counter += 1
    return counter.toString().padStart(3, '0')
  }

  for (const section of sections) {
    if (section.heading) {
      const k = next()
      blocks.push({
        _type: 'block',
        _key: `b${k}`,
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: `s${k}`, marks: [], text: section.heading }],
      })
    }
    for (const text of section.paragraphs) {
      const k = next()
      blocks.push({
        _type: 'block',
        _key: `b${k}`,
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: `s${k}`, marks: [], text }],
      })
    }
  }
  return blocks
}

// Stagger publishedAt by one hour per article so the natural ascending
// sort gives the intended educational progression: PMS → AIF → PMS vs AIF
// → AIF Categories Decoded. The base is intentionally earlier than the
// other Education-category articles so the fundamentals lead the Learn
// page when sorted ascending.
const BASE_TIMESTAMP = new Date('2026-03-15T09:00:00.000Z')

const out = ARTICLES.map((article, index) => {
  const ts = new Date(BASE_TIMESTAMP.getTime() + index * 60 * 60 * 1000).toISOString()
  const doc = {
    _type: 'article',
    _id: article.id,
    title: article.title,
    slug: { _type: 'slug', current: article.slug },
    author: 'IndiaFundSearch',
    publishedAt: ts,
    category: 'Education',
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    body: buildPortableText(article.sections),
  }
  return JSON.stringify(doc)
}).join('\n') + '\n'

const outPath = join(here, 'seed-articles-fundamentals.ndjson')
writeFileSync(outPath, out)
console.log(`Wrote ${ARTICLES.length} articles to ${outPath}`)
