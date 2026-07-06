/**
 * Email templates for lead-capture confirmations — drawing-set palette.
 * Inline-styled HTML (most clients ignore <style> blocks) + plain-text fallback.
 */

import { CONTACT, DISCLOSURE, SITE } from '@/lib/constants'

export type LeadSource = 'Fit Finder' | 'GIFT City Enquiry' | 'Contact'

export type LeadCapturePayload = Record<string, unknown> & {
  /** Fit Finder */
  fitObjective?: string
  fitHorizon?: string
  fitShortlist?: { name: string; badge: string; fitIndex: number }[]
  /** GIFT City enquiry */
  giftProduct?: string
  giftDirection?: string
  /** Contact form */
  message?: string
  interest?: string
}

export type RenderedEmail = {
  subject: string
  html: string
  text: string
}

const C = {
  bg: '#f5f4ee',
  card: '#fcfbf8',
  border: '#d2d9d2',
  ink: '#013528',
  slate: '#587067',
  bronze: '#c05c08',
  signal: '#ff862f',
}

export function renderLeadCaptureEmail(
  source: LeadSource,
  payload: LeadCapturePayload,
): RenderedEmail {
  switch (source) {
    case 'Fit Finder':
      return fitFinderEmail(payload)
    case 'GIFT City Enquiry':
      return giftEnquiryEmail(payload)
    case 'Contact':
      return contactEmail(payload)
  }
}

// ---------- Templates ----------

function fitFinderEmail(payload: LeadCapturePayload): RenderedEmail {
  const rows: [string, string][] = []
  if (payload.fitObjective) rows.push(['Objective', String(payload.fitObjective)])
  if (payload.fitHorizon) rows.push(['Horizon', String(payload.fitHorizon)])
  for (const s of payload.fitShortlist ?? []) {
    rows.push([`Fit ${s.fitIndex}`, `${s.name} · ${s.badge}`])
  }
  return template({
    subject: 'Your blueprint — the structures that fit your answers',
    eyebrow: 'Fit Finder · Load calculation',
    headline: 'Your shortlist, drawn up.',
    leadParagraph:
      'These are the structures whose shape fits your seven answers — a starting point for a real conversation, not a recommendation. The desk will reach out; or skip the queue below.',
    rows,
    cta: { label: 'Book a conversation', href: CONTACT.calendlyUrl },
  })
}

function giftEnquiryEmail(payload: LeadCapturePayload): RenderedEmail {
  const rows: [string, string][] = []
  if (payload.giftProduct) rows.push(['Product', String(payload.giftProduct)])
  if (payload.giftDirection) rows.push(['Route', String(payload.giftDirection)])
  return template({
    subject: `We received your GIFT City enquiry${payload.giftProduct ? ` — ${payload.giftProduct}` : ''}`,
    eyebrow: 'GIFT City desk',
    headline: 'Enquiry logged. Here is what happens next.',
    leadParagraph:
      'The desk reviews your enquiry, checks eligibility for the route you asked about (residency, FEMA status, ticket size), and comes back within one working day with the honest picture — including whether this product is wrong for you.',
    rows,
    cta: { label: 'Book a conversation', href: CONTACT.calendlyUrl },
  })
}

function contactEmail(payload: LeadCapturePayload): RenderedEmail {
  const rows: [string, string][] = []
  if (payload.interest) rows.push(['Interest', String(payload.interest)])
  return template({
    subject: 'We received your message — Beyond desk',
    eyebrow: 'Beyond desk',
    headline: 'Thanks — a human reads this next.',
    leadParagraph:
      'Your note is with the desk. Expect a reply within one working day. If it is time-sensitive, WhatsApp is faster.',
    rows,
    cta: { label: 'WhatsApp the desk', href: `https://wa.me/${CONTACT.whatsappNumber}` },
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
          <td style="padding:10px 0;border-bottom:1px solid ${C.border};color:${C.slate};font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${C.border};color:${C.ink};font-size:15px;font-weight:500;text-align:right;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('')

  const ctaHtml = cta
    ? `<a href="${cta.href}" style="display:inline-block;margin-top:24px;padding:12px 22px;border-radius:3px;background:${C.ink};color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">${escapeHtml(cta.label)} →</a>`
    : ''

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;background:${C.bg};font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;color:${C.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${C.card};border:1.5px solid ${C.ink};overflow:hidden;">
          <tr>
            <td style="padding:16px 32px;border-bottom:2px solid ${C.ink};">
              <p style="margin:0;font-size:14px;font-weight:700;color:${C.ink};">${SITE.name} <span style="font-size:10px;font-weight:400;color:${C.slate};letter-spacing:0.1em;text-transform:uppercase;">· ${SITE.initiative}</span></p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${C.bronze};font-weight:600;">${escapeHtml(eyebrow)}</p>
              <h1 style="margin:6px 0 0 0;font-size:24px;line-height:1.25;font-weight:700;color:${C.ink};letter-spacing:-0.01em;">${escapeHtml(headline)}</h1>
              <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:${C.ink};">${escapeHtml(leadParagraph)}</p>
            </td>
          </tr>
          ${rowsHtml ? `<tr><td style="padding:8px 32px 16px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}</table></td></tr>` : ''}
          ${cta ? `<tr><td style="padding:0 32px 28px 32px;">${ctaHtml}</td></tr>` : ''}
          <tr>
            <td style="padding:20px 32px;background:${C.ink};font-size:11.5px;line-height:1.6;color:#9db5aa;">
              ${escapeHtml(DISCLOSURE.commission)}<br><br>${escapeHtml(DISCLOSURE.education)}
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
    `\n— ${SITE.name} · ${SITE.initiative}`,
    DISCLOSURE.education,
  ]
    .filter(Boolean)
    .join('\n')

  return { subject, html, text }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
