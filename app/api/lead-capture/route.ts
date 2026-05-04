import { NextResponse, type NextRequest } from 'next/server'
import { writeClient } from '@/lib/sanity/client'

/**
 * POST /api/lead-capture
 *
 * Persists a lead capture document to Sanity and (in Phase 3) sends a branded
 * Resend email to the lead with their personalised result.
 *
 * For Phase 1 we accept the request, validate the shape, and write to Sanity.
 * The Resend email send is wired in Phase 3 step 16.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  if (typeof body.source !== 'string') {
    return NextResponse.json({ error: 'Lead magnet source required.' }, { status: 400 })
  }

  try {
    const doc = await writeClient.create({
      _type: 'leadCapture',
      email: body.email,
      phone: typeof body.phone === 'string' ? body.phone : undefined,
      city: typeof body.city === 'string' ? body.city : undefined,
      source: body.source,
      diagnosticVerdict: body.diagnosticVerdict,
      diagnosticScore: body.diagnosticScore,
      feeXRayInputs: body.feeXRayInputs,
      scorecardPMS: body.scorecardPMS,
      investableSurplus: body.investableSurplus,
      createdAt: new Date().toISOString(),
    })

    // TODO(Phase 3): send Resend email with personalised result.

    return NextResponse.json({ ok: true, id: doc._id })
  } catch (error) {
    console.error('lead-capture error', error)
    return NextResponse.json({ error: 'Could not save lead.' }, { status: 500 })
  }
}
