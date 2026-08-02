import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { writeClient } from '@/lib/sanity/client'
import {
  renderLeadCaptureEmail,
  type LeadCapturePayload,
  type LeadSource,
} from '@/lib/email/leadCaptureEmail'
import { notifyDesk } from '@/lib/email/deskNotify'

const VALID_SOURCES: LeadSource[] = [
  'Fit Finder',
  'GIFT City Enquiry',
  'Contact',
  'Corridor Access List',
]

/**
 * POST /api/lead-capture
 *
 * 1. Validate the request body.
 * 2. Persist a leadCapture document in Sanity.
 * 3. Fire a branded Resend email (best-effort — failure here does not fail
 *    the request as long as the lead was saved).
 *
 * RESEND_API_KEY missing → step 3 is skipped silently with a warning log.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | (LeadCapturePayload & { email?: unknown; source?: unknown; phone?: unknown; city?: unknown })
    | null

  if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }
  if (typeof body.source !== 'string' || !VALID_SOURCES.includes(body.source as LeadSource)) {
    return NextResponse.json({ error: 'Lead source required.' }, { status: 400 })
  }

  const source = body.source as LeadSource
  const email = body.email
  const phone = typeof body.phone === 'string' ? body.phone : undefined
  const city = typeof body.city === 'string' ? body.city : undefined

  // Save to Sanity.
  let leadId: string | undefined
  try {
    const doc = await writeClient.create({
      _type: 'leadCapture',
      email,
      phone,
      city,
      source,
      fitObjective: typeof body.fitObjective === 'string' ? body.fitObjective : undefined,
      fitHorizon: typeof body.fitHorizon === 'string' ? body.fitHorizon : undefined,
      fitShortlist: Array.isArray(body.fitShortlist)
        ? body.fitShortlist
            .slice(0, 6)
            .map((s) => `${s.fitIndex} · ${s.name} (${s.badge})`)
            .join(' | ')
        : undefined,
      giftProduct: typeof body.giftProduct === 'string' ? body.giftProduct : undefined,
      giftDirection: typeof body.giftDirection === 'string' ? body.giftDirection : undefined,
      interest: typeof body.interest === 'string' ? body.interest : undefined,
      message: typeof body.message === 'string' ? body.message.slice(0, 2000) : undefined,
      createdAt: new Date().toISOString(),
    })
    leadId = doc._id
  } catch (error) {
    console.error('lead-capture: Sanity write failed', error)
    return NextResponse.json({ error: 'Could not save lead.' }, { status: 500 })
  }

  // Notify the desk instantly + send the visitor's branded confirmation.
  // Both best-effort — the lead is already saved.
  const [, emailResult] = await Promise.all([
    notifyDesk({
      source,
      email,
      phone,
      location: city,
      details: {
        Interest: typeof body.interest === 'string' ? body.interest : undefined,
        Product: typeof body.giftProduct === 'string' ? body.giftProduct : undefined,
        Route: typeof body.giftDirection === 'string' ? body.giftDirection : undefined,
        Objective: typeof body.fitObjective === 'string' ? body.fitObjective : undefined,
        Message: typeof body.message === 'string' ? body.message.slice(0, 500) : undefined,
      },
    }),
    sendLeadEmail(email, source, body),
  ])

  return NextResponse.json({ ok: true, id: leadId, emailSent: emailResult.sent })
}

async function sendLeadEmail(
  to: string,
  source: LeadSource,
  payload: LeadCapturePayload,
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('lead-capture: RESEND_API_KEY not set — skipping send')
    return { sent: false, reason: 'no-api-key' }
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'IndiaFundSearch <hello@indiafundsearch.com>'

  try {
    const resend = new Resend(apiKey)
    const { subject, html, text } = renderLeadCaptureEmail(source, payload)
    const result = await resend.emails.send({ from, to, subject, html, text })
    if ('error' in result && result.error) {
      console.error('lead-capture: Resend error', result.error)
      return { sent: false, reason: 'resend-error' }
    }
    return { sent: true }
  } catch (error) {
    console.error('lead-capture: send failed', error)
    return { sent: false, reason: 'exception' }
  }
}
