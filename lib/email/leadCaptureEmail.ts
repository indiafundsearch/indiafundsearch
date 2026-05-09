/**
 * Email templates for lead-capture confirmations.
 * Inline-styled HTML — most clients ignore <style> blocks. Plain-text
 * fallback in `text` for accessibility and spam-score.
 */

import { formatINR } from '@/lib/utils/formatCurrency'

export type LeadSource =
  | 'Fee X-Ray'
  | 'Diagnostic'
  | 'Scorecard'
  | 'FD Visualiser'
  | 'Translator Pathfinder'
  | 'Newsletter'

export type LeadCapturePayload = Record<string, unknown> & {
  diagnosticVerdict?: string
  diagnosticScore?: number
  scorecardPMS?: string
  feeXRayInputs?: {
    amount?: number
    feeType?: string
    expectedReturn?: number
    timeHorizon?: number
    totalFees?: number
    breakevenAlpha?: number
  }
  fdInputs?: {
    amount?: number
    taxBracket?: number
    realValue?: number
  }
  fundLabel?: string
}

export type RenderedEmail = {
  subject: string
  html: string
  text: string
}

const COLORS = {
  bg: '#fafafa',
  card: '#ffffff',
  border: '#e7e7e9',
  text: '#1d1d1f',
  muted: '#86868b',
  gold: '#b8960c',
}

export function renderLeadCaptureEmail(
  source: LeadSource,
  payload: LeadCapturePayload,
): RenderedEmail {
  switch (source) {
    case 'Fee X-Ray':
      return feeXRayEmail(payload)
    case 'Diagnostic':
      return diagnosticEmail(payload)
    case 'FD Visualiser':
      return fdVisualiserEmail(payload)
    case 'Scorecard':
      return scorecardEmail(payload)
    case 'Newsletter':
      return newsletterEmail()
    default:
      return genericEmail(source)
  }
}

// ---------- Templates ----------

function feeXRayEmail(payload: LeadCapturePayload): RenderedEmail {
  const inputs = payload.feeXRayInputs ?? {}
  const amount = numOrNull(inputs.amount)
  const horizon = numOrNull(inputs.timeHorizon)
  const cagr = numOrNull(inputs.expectedReturn)
  const totalFees = numOrNull(inputs.totalFees)
  const breakeven = numOrNull(inputs.breakevenAlpha)

  const rows: [string, string][] = []
  if (amount != null) rows.push(['Amount', formatINR(amount)])
  if (cagr != null) rows.push(['Gross CAGR', `${cagr.toFixed(1)}%`])
  if (horizon != null) rows.push(['Horizon', `${horizon} years`])
  if (inputs.feeType) rows.push(['Fee preset', String(inputs.feeType)])
  if (totalFees != null) rows.push(['Total fees', formatINR(totalFees)])
  if (breakeven != null) rows.push(['Breakeven alpha', `${(breakeven * 100).toFixed(2)}%`])

  return template({
    subject: `Your Fee X-Ray analysis ${payload.fundLabel ? `— ${payload.fundLabel}` : ''}`.trim(),
    eyebrow: 'Fee X-Ray',
    headline: 'Here is what those fees actually cost.',
    leadParagraph: payload.fundLabel
      ? `We modelled ${payload.fundLabel}'s fees over your inputs. Numbers below.`
      : 'We modelled the fees you entered. Numbers below.',
    rows,
    cta: { label: 'Open the calculator', href: 'https://indiafundsearch.com/tools/fee-x-ray' },
  })
}

function diagnosticEmail(payload: LeadCapturePayload): RenderedEmail {
  const verdict = String(payload.diagnosticVerdict ?? '')
  const score = numOrNull(payload.diagnosticScore)
  const rows: [string, string][] = []
  if (score != null) rows.push(['Readiness score', `${Math.round(score)}/100`])
  if (verdict) rows.push(['Verdict', verdict])

  return template({
    subject: `Your Diagnostic verdict: ${verdict || 'IndiaFundSearch'}`,
    eyebrow: 'Diagnostic',
    headline: verdict || 'Your readiness verdict is in.',
    leadParagraph:
      'You will hear from no one. This email is not the start of a sales sequence — it is the report you asked for, in your inbox so you can revisit it.',
    rows,
    cta: { label: 'Re-take or share', href: 'https://indiafundsearch.com/diagnostic' },
  })
}

function fdVisualiserEmail(payload: LeadCapturePayload): RenderedEmail {
  const inputs = payload.fdInputs ?? {}
  const amount = numOrNull(inputs.amount)
  const taxBracket = numOrNull(inputs.taxBracket)
  const realValue = numOrNull(inputs.realValue)

  const rows: [string, string][] = []
  if (amount != null) rows.push(['FD amount', formatINR(amount)])
  if (taxBracket != null) rows.push(['Tax bracket', `${(taxBracket * 100).toFixed(0)}%`])
  if (realValue != null) rows.push(['Real value · 10y', formatINR(realValue)])

  return template({
    subject: 'Your FD is quietly shrinking — here is the math',
    eyebrow: 'FD Visualiser',
    headline: 'Your FD, deflated by tax and inflation.',
    leadParagraph:
      'Numbers below. If the real-value number is lower than the FD amount, you are losing purchasing power even while the rupee balance grows.',
    rows,
    cta: { label: 'Compare alternatives', href: 'https://indiafundsearch.com/explore' },
  })
}

function scorecardEmail(payload: LeadCapturePayload): RenderedEmail {
  const pms = String(payload.scorecardPMS ?? '')
  const overall = numOrNull(payload.scorecardOverall)
  const dims = (payload.scorecardDimensions as Record<string, number> | undefined) ?? {}

  const rows: [string, string][] = []
  if (overall != null) rows.push(['Overall score', `${Math.round(overall)}/100`])
  const dimLabels: Record<string, string> = {
    manager: 'Manager Quality',
    performance: 'Performance Integrity',
    fees: 'Fee Fairness',
    operations: 'Operational Robustness',
    fit: 'Suitability Fit',
  }
  for (const [key, label] of Object.entries(dimLabels)) {
    const v = numOrNull(dims[key])
    if (v != null) rows.push([label, `${Math.round(v)}/100`])
  }

  return template({
    subject: pms ? `Your scorecard for ${pms}` : 'Your PMS scorecard',
    eyebrow: 'Scorecard',
    headline: pms ? `Your scorecard for ${pms}` : 'Your PMS scorecard',
    leadParagraph:
      'Twenty criteria across five dimensions. Use the lowest-scoring rows as the agenda for your first conversation with the manager.',
    rows,
    cta: { label: 'Score another', href: 'https://indiafundsearch.com/tools/scorecard' },
  })
}

function newsletterEmail(): RenderedEmail {
  return template({
    subject: 'You\'re on the IndiaFundSearch alerts list',
    eyebrow: 'Newsletter',
    headline: 'You\'re on the alerts list.',
    leadParagraph:
      'You\'ll get a note when something changes on a fund worth knowing about — manager moves, AUM swings, fee structure tweaks, SEBI observations — plus a Friday digest of what actually moved Indian alternatives this week. No filler, no sales pitch.',
    rows: [],
    cta: { label: 'Browse the universe', href: 'https://indiafundsearch.com/explore' },
  })
}

function genericEmail(source: LeadSource): RenderedEmail {
  return template({
    subject: 'Your IndiaFundSearch result',
    eyebrow: source,
    headline: 'Here is what you asked for.',
    leadParagraph:
      'Saved to your inbox so you can revisit later. We will not add you to a marketing list.',
    rows: [],
  })
}

// ---------- Renderer ----------

type TemplateInput = {
  subject: string
  eyebrow: string
  headline: string
  leadParagraph: string
  rows: [string, string][]
  cta?: { label: string; href: string }
}

function template(input: TemplateInput): RenderedEmail {
  const { subject, eyebrow, headline, leadParagraph, rows, cta } = input

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};color:${COLORS.muted};font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${COLORS.border};color:${COLORS.text};font-size:15px;font-weight:500;text-align:right;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('')

  const ctaHtml = cta
    ? `<a href="${cta.href}" style="display:inline-block;margin-top:24px;padding:12px 20px;border-radius:8px;background:${COLORS.text};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;">${escapeHtml(cta.label)} →</a>`
    : ''

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;background:${COLORS.bg};font-family:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;color:${COLORS.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.gold};font-weight:600;">${escapeHtml(eyebrow)}</p>
              <h1 style="margin:6px 0 0 0;font-size:24px;line-height:1.25;font-weight:600;color:${COLORS.text};letter-spacing:-0.02em;">${escapeHtml(headline)}</h1>
              <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:${COLORS.text};">${escapeHtml(leadParagraph)}</p>
            </td>
          </tr>
          ${rowsHtml ? `<tr><td style="padding:8px 32px 16px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}</table></td></tr>` : ''}
          ${cta ? `<tr><td style="padding:0 32px 28px 32px;">${ctaHtml}</td></tr>` : ''}
          <tr>
            <td style="padding:20px 32px;background:${COLORS.bg};border-top:1px solid ${COLORS.border};font-size:12px;line-height:1.6;color:${COLORS.muted};">
              IndiaFundSearch is an educational platform. We do not distribute or sell financial products. For investment advice, consult a SEBI-registered advisor.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const textRows = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const text = [
    eyebrow.toUpperCase(),
    '',
    headline,
    '',
    leadParagraph,
    textRows ? '\n' + textRows : '',
    cta ? `\n${cta.label}: ${cta.href}` : '',
    '\n— IndiaFundSearch (education-first; not advice)',
  ]
    .filter(Boolean)
    .join('\n')

  return { subject, html, text }
}

function numOrNull(value: unknown): number | null {
  if (typeof value !== 'number') return null
  return Number.isFinite(value) ? value : null
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
