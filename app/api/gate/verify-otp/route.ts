import { NextResponse, type NextRequest } from 'next/server'
import { writeClient } from '@/lib/sanity/client'
import { verifyOtpToken } from '@/lib/gate/otp'
import { notifyDesk } from '@/lib/email/deskNotify'

export const runtime = 'nodejs'

/**
 * POST /api/gate/verify-otp
 * Body: { email, code, token, name?, phone?, location? }
 * On success: persists the verified lead in Sanity and returns ok — the
 * client then unlocks the site locally for GATE.verifiedDays.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { email?: unknown; code?: unknown; token?: unknown; name?: unknown; phone?: unknown; location?: unknown }
    | null

  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const code = typeof body?.code === 'string' ? body.code.trim() : ''
  const token = typeof body?.token === 'string' ? body.token : ''

  if (!email || !code || !token) {
    return NextResponse.json({ error: 'Email, code and token required.' }, { status: 400 })
  }
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'The code is 6 digits.' }, { status: 400 })
  }
  if (!verifyOtpToken(email, code, token)) {
    return NextResponse.json({ error: 'Incorrect or expired code.' }, { status: 401 })
  }

  // Persist the verified lead — best-effort; verification still succeeds
  // for the visitor even if the CRM write hiccups.
  try {
    await writeClient.create({
      _type: 'leadCapture',
      email,
      name: typeof body?.name === 'string' ? body.name.slice(0, 120) : undefined,
      phone: typeof body?.phone === 'string' ? body.phone.slice(0, 32) : undefined,
      city: typeof body?.location === 'string' ? body.location.slice(0, 120) : undefined,
      source: 'Site Gate',
      emailVerified: true,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('gate: Sanity lead write failed', error)
  }

  // Instant desk notification — best-effort.
  await notifyDesk({
    source: 'Site Gate',
    email,
    name: typeof body?.name === 'string' ? body.name.slice(0, 120) : undefined,
    phone: typeof body?.phone === 'string' ? body.phone.slice(0, 32) : undefined,
    location: typeof body?.location === 'string' ? body.location.slice(0, 120) : undefined,
  })

  return NextResponse.json({ ok: true })
}
