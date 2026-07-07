import { Resend } from 'resend'
import { CONTACT, SITE } from '@/lib/constants'

export interface DeskLead {
  source: string
  name?: string
  email: string
  phone?: string
  location?: string
  /** extra key/value context, e.g. { Product: '…', Route: '…' } */
  details?: Record<string, string | undefined>
}

function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Fire an instant new-lead notification to the desk inbox (CONTACT.email).
 * Best-effort: never throws — a notification failure must not break the
 * visitor-facing request. No-ops (with a warning) if Resend isn't configured.
 */
export async function notifyDesk(lead: DeskLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn(`desk-notify: RESEND_API_KEY not set — new ${lead.source} lead ${lead.email} not emailed`)
    return
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'IndiaFundSearch <hello@indiafundsearch.com>'
  const rows: [string, string][] = [
    ['Source', lead.source],
    ...(lead.name ? ([['Name', lead.name]] as [string, string][]) : []),
    ['Email', lead.email],
    ...(lead.phone ? ([['Phone', lead.phone]] as [string, string][]) : []),
    ...(lead.location ? ([['Location', lead.location]] as [string, string][]) : []),
    ...Object.entries(lead.details ?? {})
      .filter(([, v]) => v)
      .map(([k, v]) => [k, String(v)] as [string, string]),
  ]

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#587067;font-size:13px;">${escapeHtml(k)}</td><td style="padding:6px 0;color:#013528;font-size:14px;font-weight:600;">${escapeHtml(v)}</td></tr>`,
    )
    .join('')

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to: CONTACT.email,
      replyTo: lead.email,
      subject: `New lead · ${lead.source} · ${lead.name ?? lead.email}`,
      html: `<!doctype html><html><body style="margin:0;background:#f5f4ee;font-family:'Space Grotesk',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 16px;"><tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fcfbf8;border:1.5px solid #013528;">
<tr><td style="padding:14px 24px;border-bottom:2px solid #013528;font-size:12px;font-weight:700;color:#013528;">${SITE.name} — New lead</td></tr>
<tr><td style="padding:20px 24px;"><table role="presentation" cellpadding="0" cellspacing="0">${rowsHtml}</table></td></tr>
<tr><td style="padding:12px 24px;background:#013528;color:#9db5aa;font-size:11px;">Reply to this email to reach the lead directly.</td></tr>
</table></td></tr></table></body></html>`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    })
  } catch (error) {
    console.error('desk-notify: send failed', error)
  }
}
