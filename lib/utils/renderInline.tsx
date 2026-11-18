import type { ReactNode } from 'react'

/**
 * Guide copy marks emphasis with literal <b> and <em> tags. Render exactly
 * those two tags as elements and nothing else, so no raw HTML from a content
 * file ever reaches the page.
 */
export function renderInline(text: string): ReactNode[] {
  return text.split(/(<b>.*?<\/b>|<em>.*?<\/em>)/g).map((part, i) => {
    if (part.startsWith('<b>')) return <b key={i} className="font-semibold text-ink">{part.slice(3, -4)}</b>
    if (part.startsWith('<em>')) return <em key={i}>{part.slice(4, -5)}</em>
    return part
  })
}
