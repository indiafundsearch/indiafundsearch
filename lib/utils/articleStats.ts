const WORDS_PER_MINUTE = 220

type AnyBlock = { _type?: string; style?: string; children?: { text?: string }[] }

/** Number of h2 sections in the body. Falls back to 1 (the article itself). */
export function countSections(body: AnyBlock[] | undefined): number {
  if (!body?.length) return 1
  const h2s = body.filter((b) => b._type === 'block' && b.style === 'h2').length
  return Math.max(h2s, 1)
}

/** Approximate read time in minutes, minimum 1. */
export function readingTimeMinutes(body: AnyBlock[] | undefined): number {
  if (!body?.length) return 1
  const text = body
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children ?? [])
    .map((c) => c.text ?? '')
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** First non-heading paragraph, truncated. Used for the featured-card excerpt. */
export function firstParagraph(body: AnyBlock[] | undefined, maxChars = 220): string | null {
  if (!body?.length) return null
  const para = body.find(
    (b) => b._type === 'block' && b.style === 'normal' && (b.children?.length ?? 0) > 0,
  )
  if (!para) return null
  const text = (para.children ?? []).map((c) => c.text ?? '').join('').trim()
  if (!text) return null
  if (text.length <= maxChars) return text
  return text.slice(0, maxChars).replace(/\s+\S*$/, '') + '…'
}
