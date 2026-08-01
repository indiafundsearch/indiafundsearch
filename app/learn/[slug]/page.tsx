import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PRODUCTS, productBySlug } from '@/lib/content/products'
import { FD_PATH_5Y, formatCr } from '@/lib/content/format'
import { DISCLOSURE, SHEETS } from '@/lib/constants'
import { pageMeta, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { UsPersonWarning } from '@/components/shared/UsPersonWarning'
import { JsonLd } from '@/components/shared/JsonLd'
import { Byline } from '@/components/shared/Byline'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) return {}
  return pageMeta({
    title: `${p.name} — what it is, costs, taxation`,
    description: `${p.name} (${p.badge}) explained: ${p.analogy.slice(0, 140)}…`,
    path: `/learn/${p.slug}`,
    ogTitle: p.name,
  })
}

function SpecList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2 flex items-center gap-2.5 after:content-[''] after:h-px after:flex-1 after:bg-line-soft">
        {title}
      </h3>
      <ul>
        {items.map((it) => (
          <li
            key={it}
            className="relative py-1.5 pl-[22px] text-[16px] text-ink-soft before:content-[''] before:absolute before:left-0.5 before:top-[15px] before:w-2.5 before:h-[1.5px] before:bg-signal"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) notFound()

  const index = PRODUCTS.findIndex((x) => x.id === p.id)
  const v5 = Math.pow(1 + p.mid / 100, 5)
  const related = [PRODUCTS[(index + 12) % 13], PRODUCTS[(index + 1) % 13]]
  const isGift = p.id === 'gift'

  const specs: [string, string][] = [
    ['Minimum', p.min],
    ['Indicative range', p.ret],
    ['Risk band', p.riskBand],
    ['Liquidity', p.liqLabel],
    ['Horizon', p.horizon],
  ]

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          articleJsonLd({
            title: `${p.name} — what it is, costs, taxation`,
            description: p.analogy,
            path: `/learn/${p.slug}`,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Learn', path: '/learn' },
            { name: p.name, path: `/learn/${p.slug}` },
          ]),
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/learn" className="hover:text-ink">Sheet {SHEETS.materials.no} — Materials</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">Specification {String(index + 1).padStart(2, '0')}</span>
      </nav>

      <header className="mb-10">
        <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-bronze mb-2">
          {p.tag}
          <span className="ml-3 font-mono text-[9.5px] tracking-[0.1em] bg-ink text-white-warm px-2 py-[3px] rounded-[2px]">
            {p.badge}
          </span>
        </div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          {p.name}
        </h1>
        <p className="font-serif italic text-[20px] text-ink-soft border-l-[3px] border-signal pl-4 mt-5 max-w-[760px]">
          {p.analogy}
        </p>
        <div className="mt-5">
          <Byline />
        </div>
      </header>

      {/* Spec strip */}
      <div className="flex flex-wrap border border-line bg-white-warm mb-10">
        {specs.map(([label, value]) => (
          <div key={label} className="flex-1 min-w-[150px] px-4 py-3.5 border-r border-line last:border-r-0 max-sm:min-w-[45%] max-sm:border-b">
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-slate block mb-[3px]">{label}</span>
            <b className="font-sans text-[14.5px] font-semibold">{value}</b>
          </div>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-8">
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-3">What it actually is</h2>
            <p className="text-[17.5px] text-ink-soft max-w-[720px]">{p.what}</p>
          </div>
          <SpecList title="The job it does" items={p.solves} />
          <SpecList title="Why people use it" items={p.benefits} />
          <SpecList title="What can go wrong" items={p.risks} />
        </div>

        <aside className="space-y-6">
          {/* ₹1 Cr story */}
          <div className="bg-paper border border-line px-[22px] py-[18px]">
            <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-slate mb-2">
              The story · ₹1 Cr · 5 years · at range midpoint
            </div>
            <div className="font-sans text-2xl font-bold">
              ₹1 Cr → <b className="text-bronze">{formatCr(v5)}</b>
            </div>
            <div className="text-[15px] text-slate mt-1">vs FD path (post-tax) → {formatCr(FD_PATH_5Y)}</div>
            <div className="font-sans font-bold text-base mt-2">{(v5 / FD_PATH_5Y).toFixed(2)}× the FD path.</div>
          </div>

          {/* Taxation */}
          <div className="bg-white-warm border border-line border-l-4 border-l-teal px-5 py-4.5">
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-teal mb-2">How it is taxed</h2>
            <p className="text-[15px] text-ink-soft">{p.tax}</p>
            <Link href="/tax" className="inline-block mt-3 font-sans text-[12.5px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
              Full tax schedule →
            </Link>
          </div>

          {/* NRI note */}
          {p.nriNote && (
            <div className="bg-bronze-wash border border-bronze-soft border-l-4 border-l-bronze px-5 py-4.5">
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2">If you are an NRI</h2>
              <p className="text-[15px] text-ink-soft">{p.nriNote}</p>
              <UsPersonWarning className="mt-3.5" />
            </div>
          )}

          {/* STT-on-hedged cross-link (P1-8) — market-neutral + long-short */}
          {(p.id === 'mn' || p.id === 'lssif') && (
            <Link
              href="/tax#stt-hedged"
              className="block bg-white-warm border border-line border-l-4 border-l-signal px-5 py-4.5 hover:bg-paper transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze block mb-1.5">
                Cost watch — 2026 STT hike
              </span>
              <span className="font-sans text-[14.5px] font-semibold text-ink">
                The April 2026 STT rise hits high-turnover hedged books hardest. See what it does to
                the net spread →
              </span>
            </Link>
          )}

          {isGift && (
            <Link
              href="/gift-city"
              className="block bg-ink text-white-warm px-5 py-5 hover:bg-ink-soft transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal block mb-1.5">
                On our shelf now
              </span>
              <span className="font-sans font-bold text-[17px]">
                Explore curated GIFT City products →
              </span>
            </Link>
          )}
        </aside>
      </div>

      {/* CTA band */}
      <div className="mt-16 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Does {p.name} belong in your architecture?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1">
            Seven questions narrow thirteen structures to a shortlist.
          </p>
        </div>
        <Link
          href="/fit-finder"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
        >
          Run the Fit Finder →
        </Link>
      </div>

      {/* Related */}
      <div className="dim my-11"><span>Adjacent materials</span></div>
      <div className="grid gap-4 sm:grid-cols-2 max-w-[720px]">
        {related.map((r) => (
          <Link key={r.id} href={`/learn/${r.slug}`} className="plot-card p-5 hover:shadow-plot-hover transition-shadow group">
            <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-slate">{r.badge}</span>
            <h3 className="font-sans text-[17px] font-bold mt-1 group-hover:text-bronze transition-colors">{r.name}</h3>
            <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-slate mt-0.5">{r.tag}</p>
          </Link>
        ))}
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-12 border-t border-line pt-5 max-w-[820px]">
        {DISCLOSURE.education}
      </p>
    </article>
  )
}
