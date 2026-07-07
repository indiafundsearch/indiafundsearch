interface LogoMarkProps {
  /** pixel size of the square mark */
  size?: number
  /** 'ink' for light surfaces, 'paper' for the dark ink-green footer */
  tone?: 'ink' | 'paper'
  className?: string
}

/**
 * IndiaFundSearch mark — a site-plan square with corner registration marks
 * and a rising spectrum path ending in a signal node. Echoes the drawing-set
 * motifs used across the site (plot cards, corner brackets, map nodes).
 */
export function LogoMark({ size = 34, tone = 'ink', className }: LogoMarkProps) {
  const line = tone === 'ink' ? '#013528' : '#FCFBF8'
  const grid = tone === 'ink' ? '#013528' : '#FCFBF8'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* plot frame */}
      <rect x="7" y="7" width="34" height="34" fill="none" stroke={line} strokeWidth="2.5" />
      {/* faint grid */}
      <path d="M7 24 h34 M24 7 v34" stroke={grid} strokeOpacity=".18" strokeWidth="1" />
      {/* corner registration marks */}
      <path d="M2 8 v-6 h6" fill="none" stroke="#FF862F" strokeWidth="2.5" />
      <path d="M40 2 h6 v6" fill="none" stroke="#FF862F" strokeWidth="2.5" />
      <path d="M46 40 v6 h-6" fill="none" stroke="#FF862F" strokeWidth="2.5" />
      <path d="M8 46 h-6 v-6" fill="none" stroke="#FF862F" strokeWidth="2.5" />
      {/* rising spectrum path */}
      <path d="M12 34 L21 26 L27 29.5 L35 15" fill="none" stroke={line} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
      {/* signal node */}
      <circle cx="35" cy="15" r="4" fill="#FF862F" stroke={line} strokeWidth="1.8" />
    </svg>
  )
}

interface LogoProps {
  tone?: 'ink' | 'paper'
  /** mark height in px; wordmark scales with it */
  size?: number
  className?: string
}

/** Mark + wordmark lockup. */
export function Logo({ tone = 'ink', size = 34, className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark size={size} tone={tone} />
      <span
        className={`font-sans font-bold tracking-tight leading-none ${
          tone === 'ink' ? 'text-ink' : 'text-white-warm'
        }`}
        style={{ fontSize: size * 0.56 }}
      >
        IndiaFundSearch
      </span>
    </span>
  )
}
