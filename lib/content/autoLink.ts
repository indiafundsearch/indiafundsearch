/**
 * Contextual internal links for answer-page bodies (page-structure rule 5).
 *
 * Hand-placed links are better, but across sixty answer pages they were not
 * happening, and a reader who meets "PFIC" or "Form 41" mid-paragraph should
 * be able to click it. This links the FIRST mention of each term in a page's
 * body, never inside the capsule, never to the page itself, never inside an
 * existing <a>, and never more than LIMIT links per page so the prose does not
 * turn blue. Deterministic, so the same page renders the same way every time.
 */
const TERMS: { re: RegExp; href: string }[] = [
  { re: /\bForm 8621\b/, href: '/us-tax/form-8621' },
  { re: /\bForm 8802\b/, href: '/us-tax/form-8802' },
  { re: /\bForm (?:10F|41)\b/, href: '/learn/form-10f-for-nri' },
  { re: /\breporting fund status\b/i, href: '/uk-tax/uk-reporting-fund-status' },
  { re: /\bPFICs?\b/, href: '/learn/are-indian-mutual-funds-pfic' },
  { re: /\bFBAR\b/, href: '/us-tax/pfic-reporting-threshold' },
  { re: /\bGIFT City\b/, href: '/gift-city' },
  { re: /\bliberalised remittance scheme\b|\bLRS\b/i, href: '/gift-city/for-resident-indians' },
  { re: /\bNRE\b|\bNRO\b/, href: '/learn/nre-vs-nro-account' },
  { re: /\brepatriat\w*/i, href: '/learn/nri-repatriation-limit' },
  { re: /\bmarket[- ]neutral\b/i, href: '/learn/market-neutral-funds' },
  { re: /\bprivate credit\b/i, href: '/learn/private-credit-real-estate-debt' },
  { re: /\bpre-IPO\b/i, href: '/learn/pre-ipo-unlisted-shares' },
  { re: /\bREITs?\b/, href: '/learn/reits-invits' },
  { re: /\bSIFs?\b/, href: '/learn/long-short-sif' },
  { re: /\bAIFs?\b/, href: '/learn/what-is-aif' },
  { re: /\bPMS\b/, href: '/learn/what-is-pms' },
  { re: /\bmutual funds?\b/i, href: '/learn/mutual-funds' },
]
const LIMIT = 6

/**
 * Link the first mention of each known term across an ordered list of HTML
 * fragments (the page's section bodies and bullet points, in reading order).
 * Returns the fragments with anchors inserted.
 */
export function autoLink(fragments: string[], currentPath: string): string[] {
  const used = new Set<string>()
  let count = 0
  return fragments.map((html) => {
    if (count >= LIMIT) return html
    // Split into tags and text so we only ever touch text nodes.
    const parts = html.split(/(<[^>]+>)/)
    let inAnchor = 0
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (part.startsWith('<')) {
        if (/^<a[\s>]/i.test(part)) inAnchor++
        else if (/^<\/a>/i.test(part)) inAnchor = Math.max(0, inAnchor - 1)
        continue
      }
      if (inAnchor || !part.trim()) continue
      let text = part
      for (const t of TERMS) {
        if (count >= LIMIT) break
        if (used.has(t.href) || t.href === currentPath) continue
        const m = t.re.exec(text)
        if (!m) continue
        const before = text.slice(0, m.index)
        const after = text.slice(m.index + m[0].length)
        text = `${before}<a href="${t.href}">${m[0]}</a>${after}`
        used.add(t.href)
        count++
        // Re-split is unnecessary: later terms search `text`, and a term
        // landing inside the anchor we just made is prevented by checking.
        if (after === '' ) break
      }
      parts[i] = text
    }
    return parts.join('')
  })
}
