'use client'

import { cn } from '@/lib/utils'
import {
  EMPTY_FILTERS,
  answeredCount,
  isAnyFilterActive,
  type PathfinderFilters,
  type RiskAnswer,
  type TicketAnswer,
} from '@/lib/pathfinder'

const TOTAL_QUESTIONS = 4

type Props = {
  filters: PathfinderFilters
  onChange: (next: PathfinderFilters) => void
  showNudge?: boolean
}

export function PathfinderQuiz({ filters, onChange, showNudge = false }: Props) {
  const active = isAnyFilterActive(filters)
  const answered = answeredCount(filters)

  return (
    <div className="rounded-card border border-card-border bg-background/50 p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
          Find your fit · 4 quick questions
        </p>
        <p className="text-[11px] tabular-nums uppercase tracking-widest text-text-muted">
          {answered} / {TOTAL_QUESTIONS} answered
        </p>
      </div>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-pill bg-card-border">
        <div
          className="h-full rounded-pill bg-gold transition-[width] duration-300 ease-out"
          style={{ width: `${(answered / TOTAL_QUESTIONS) * 100}%` }}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Question num={1} label="Lock-in OK?" nudge={showNudge && !active}>
          <Choice
            label="Yes, OK to lock"
            active={filters.access === 'ok'}
            onClick={() =>
              onChange({ ...filters, access: filters.access === 'ok' ? 'any' : 'ok' })
            }
          />
          <Choice
            label="No, need access"
            active={filters.access === 'need'}
            onClick={() =>
              onChange({ ...filters, access: filters.access === 'need' ? 'any' : 'need' })
            }
          />
        </Question>

        <Question num={2} label="Cashflow required?">
          <Choice
            label="Yes, distributions"
            active={filters.income === 'yes'}
            onClick={() =>
              onChange({ ...filters, income: filters.income === 'yes' ? 'any' : 'yes' })
            }
          />
          <Choice
            label="No, growth"
            active={filters.income === 'no'}
            onClick={() =>
              onChange({ ...filters, income: filters.income === 'no' ? 'any' : 'no' })
            }
          />
        </Question>

        <Question num={3} label="Risk you'll accept">
          <Choice
            label="Low"
            active={filters.risk === 'low'}
            onClick={() => onChange({ ...filters, risk: pickRisk(filters.risk, 'low') })}
          />
          <Choice
            label="Medium"
            active={filters.risk === 'medium'}
            onClick={() => onChange({ ...filters, risk: pickRisk(filters.risk, 'medium') })}
          />
          <Choice
            label="High"
            active={filters.risk === 'high'}
            onClick={() => onChange({ ...filters, risk: pickRisk(filters.risk, 'high') })}
          />
        </Question>

        <Question num={4} label="Budget you can deploy">
          <Choice
            label="₹50L"
            active={filters.ticket === '50L'}
            onClick={() => onChange({ ...filters, ticket: pickTicket(filters.ticket, '50L') })}
          />
          <Choice
            label="₹1Cr"
            active={filters.ticket === '1Cr'}
            onClick={() => onChange({ ...filters, ticket: pickTicket(filters.ticket, '1Cr') })}
          />
          <Choice
            label="₹1.5Cr+"
            active={filters.ticket === '1.5Cr'}
            onClick={() => onChange({ ...filters, ticket: pickTicket(filters.ticket, '1.5Cr') })}
          />
        </Question>
      </div>

      {active ? (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="text-[11px] font-medium uppercase tracking-widest text-text-muted hover:text-text-primary"
          >
            Reset ↻
          </button>
        </div>
      ) : null}
    </div>
  )
}

function pickRisk(current: RiskAnswer, next: Exclude<RiskAnswer, 'any'>): RiskAnswer {
  return current === next ? 'any' : next
}

function pickTicket(
  current: TicketAnswer,
  next: Exclude<TicketAnswer, 'any'>,
): TicketAnswer {
  return current === next ? 'any' : next
}

function Question({
  num,
  label,
  nudge,
  children,
}: {
  num: number
  label: string
  nudge?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
        <span className="rounded-pill bg-card-border px-1.5 py-0.5 text-[9px] tabular-nums text-text-primary">
          {num}
        </span>
        {label}
      </p>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        {children}
        {nudge && num === 1 ? (
          <span className="text-[10px] font-medium uppercase tracking-widest text-gold">
            ← start here
          </span>
        ) : null}
      </div>
    </div>
  )
}

type ChoiceProps = {
  label: string
  active: boolean
  onClick: () => void
}

function Choice({ label, active, onClick }: ChoiceProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-pill border px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-gold bg-gold/10 text-gold'
          : 'border-card-border bg-card text-text-muted hover:border-text-primary hover:text-text-primary',
      )}
    >
      {label}
    </button>
  )
}

export type { PathfinderFilters }
