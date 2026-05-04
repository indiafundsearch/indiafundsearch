import { formatINR, formatIndianNumber } from '@/lib/utils/formatCurrency'

type Props = {
  value: number
  compact?: boolean
  decimals?: number
  withSymbol?: boolean
  className?: string
}

export function IndianNumber({ value, compact, decimals = 0, withSymbol = true, className }: Props) {
  const text = withSymbol
    ? formatINR(value, { compact, decimals })
    : formatIndianNumber(value, decimals)

  return <span className={className}>{text}</span>
}
