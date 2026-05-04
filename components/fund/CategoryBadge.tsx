'use client'

import { useMode } from '@/components/shared/SimpleProToggle'
import { CATEGORY_LABELS, type FundCategory } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Props = {
  category?: FundCategory
  simpleCategoryName?: string
  className?: string
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, simpleCategoryName, className, size = 'sm' }: Props) {
  const { mode } = useMode()
  const label = labelFor(category, simpleCategoryName, mode)
  if (!label) return null

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill bg-text-primary/5 font-medium text-text-primary',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        className,
      )}
    >
      {label}
    </span>
  )
}

function labelFor(
  category: FundCategory | undefined,
  simple: string | undefined,
  mode: 'simple' | 'pro',
): string {
  if (mode === 'simple' && simple) return simple
  if (category) {
    const map = CATEGORY_LABELS[category]
    if (map) return mode === 'simple' ? map.simple : map.pro
    return category
  }
  return ''
}
