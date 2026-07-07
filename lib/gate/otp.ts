import { createHmac, timingSafeEqual } from 'node:crypto'

function gateSecret(): string {
  const secret = process.env.OTP_GATE_SECRET ?? process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    console.warn('gate: no OTP_GATE_SECRET / SANITY_REVALIDATE_SECRET set — using insecure fallback')
    return 'ifs-dev-only-fallback'
  }
  return secret
}

/** Stateless OTP token: HMAC(email|code|expiry) + '.' + expiry. */
export function otpToken(email: string, code: string, expiresAt: number): string {
  const mac = createHmac('sha256', gateSecret())
    .update(`${email.toLowerCase()}|${code}|${expiresAt}`)
    .digest('hex')
  return `${mac}.${expiresAt}`
}

/** Verify a code against the token issued by send-otp. */
export function verifyOtpToken(email: string, code: string, token: string): boolean {
  const [mac, expiryRaw] = token.split('.')
  const expiresAt = Number(expiryRaw)
  if (!mac || !Number.isFinite(expiresAt)) return false
  if (Date.now() > expiresAt) return false
  const expected = otpToken(email, code, expiresAt).split('.')[0]
  if (mac.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(expected, 'hex'))
}
