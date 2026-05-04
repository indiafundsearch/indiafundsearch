'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { STAGES, type Stage } from './productMapData'
import { cn } from '@/lib/utils'

type Props = {
  /** Optional override — used by Pathfinder to highlight matching stages. */
  highlight?: Record<string, 'fit' | 'partial' | 'not-fit'>
}

export function ProductMap({ highlight }: Props) {
  const [activeKey, setActiveKey] = useState<string>(STAGES[0].key)
  const active = STAGES.find((s) => s.key === activeKey) ?? STAGES[0]

  return (
    <div>
      <div className="-mx-6 overflow-x-auto pb-2 md:mx-0">
        <ol className="flex min-w-max items-center gap-2 px-6 md:px-0">
          {STAGES.map((stage, index) => {
            const verdict = highlight?.[stage.key]
            return (
              <li key={stage.key} className="flex items-center gap-2">
                <StageNode
                  stage={stage}
                  active={activeKey === stage.key}
                  verdict={verdict}
                  onSelect={() => setActiveKey(stage.key)}
                />
                {index < STAGES.length - 1 ? (
                  <ChevronRight
                    aria-hidden
                    size={18}
                    className="shrink-0 text-text-muted"
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-card border border-card-border bg-card p-5 shadow-card md:p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold text-text-primary">{active.label}</h3>
            <div className="flex flex-wrap gap-3 text-xs text-text-muted">
              <span>
                Min. ticket{' '}
                <span className="font-medium text-text-primary">{active.minTicket}</span>
              </span>
              <span>
                Complexity{' '}
                <span className="font-medium text-text-primary">{active.complexity}</span>
              </span>
            </div>
          </div>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-primary">
            {active.summary}
          </p>
          {active.learnMoreSlug ? (
            <Link
              href={`/knowledge/${active.learnMoreSlug}`}
              className="mt-4 inline-flex text-sm font-medium text-text-primary hover:text-gold"
            >
              Learn more →
            </Link>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function StageNode({
  stage,
  active,
  verdict,
  onSelect,
}: {
  stage: Stage
  active: boolean
  verdict?: 'fit' | 'partial' | 'not-fit'
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'flex flex-col items-start gap-1 rounded-card border px-4 py-3 text-left transition-all',
        'min-w-[140px] shadow-card hover:shadow-card-hover',
        active
          ? 'border-text-primary bg-text-primary text-white'
          : 'border-card-border bg-card text-text-primary',
        verdict === 'not-fit' && !active && 'opacity-40',
        verdict === 'fit' && !active && 'border-gold ring-1 ring-gold/40',
      )}
    >
      <span className="text-xs uppercase tracking-widest opacity-70">{stage.complexity}</span>
      <span className="text-base font-semibold">{stage.label}</span>
      <span className="text-xs opacity-80">{stage.minTicket}</span>
    </button>
  )
}
