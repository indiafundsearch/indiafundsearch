import { NextResponse, type NextRequest } from 'next/server'
import { randomInt } from 'node:crypto'
import { Resend } from 'resend'
import { SITE } from '@/lib/constants'
import { otpToken } from '@/lib/gate/otp'

export const runtime = 'nodejs'

const OTP_TTL_MS = 10 * 60 * 1000

/**
 * POST /api/gate/send-otp
 * Body: { email, name?, phone?, location? }
 * Emails a 6-digit code; returns a stateless HMAC token the client must
 * echo back to /api/gate/verify-otp. No server-side storage needed.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: unknown; name?: unknown } | null
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const name = typeof body?.name === 'string' ? body.name.trim() : ''

  if (!email || !email.includes('@') || email.length > 254) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  const code = String(randomInt(100000, 1000000))
  const expiresAt = Date.now() + OTP_TTL_MS
  const token = otpToken(email, code, expiresAt)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn(`gate: RESEND_API_KEY not set — OTP for ${email} is ${code} (dev only)`)
    return NextResponse.json({
      ok: true,
      token,
      // Never exposed in production builds
      ...(process.env.NODE_ENV !== 'production' ? { devCode: code } : {}),
    })
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'IndiaFundSearch <hello@indiafundsearch.com>'
  const firstName = name.split(' ')[0] || 'there'

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from,
      to: email,
      subject: `${code} is your ${SITE.name} verification code`,
      html: `<!doctype html><html><body style="margin:0;background:#f5f4ee;font-family:'Space Grotesk','Helvetica Neue',Arial,sans-serif;color:#013528;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fcfbf8;border:1.5px solid #013528;">
<tr><td style="padding:16px 28px;border-bottom:2px solid #013528;font-size:14px;font-weight:700;">${SITE.name} <span style="font-size:10px;font-weight:400;color:#587067;letter-spacing:.1em;text-transform:uppercase;">· ${SITE.initiative}</span></td></tr>
<tr><td style="padding:28px;">
<p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#c05c08;font-weight:600;">Verification code</p>
<p style="margin:12px 0 0;font-size:15px;line-height:1.6;">Hi ${firstName.replace(/[<>&"]/g, '')} — enter this code to continue reading:</p>
<p style="margin:18px 0;font-size:38px;font-weight:700;letter-spacing:.18em;color:#013528;">${code}</p>
<p style="margin:0;font-size:13px;color:#587067;">Valid for 10 minutes. If you didn't request this, ignore this email.</p>
</td></tr>
<tr><td style="padding:16px 28px;background:#013528;font-size:11px;line-height:1.6;color:#9db5aa;">Education only — not investment advice. ${SITE.url}</td></tr>
</table></td></tr></table></body></html>`,
      text: `Your ${SITE.name} verification code is ${code}. Valid for 10 minutes.`,
    })
    if ('error' in result && result.error) {
      console.error('gate: Resend error', result.error)
      return NextResponse.json({ error: 'Could not send the code — try again.' }, { status: 502 })
    }
  } catch (error) {
    console.error('gate: send failed', error)
    return NextResponse.json({ error: 'Could not send the code — try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, token })
}
