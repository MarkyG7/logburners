import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function safeText(v: unknown, max = 500): string {
  if (typeof v !== 'string') return ''
  const s = v.trim()
  return s.length > max ? s.slice(0, max) : s
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Minimal server-side validation (client already filters)
    const postcode = safeText(body.postcode, 12)
    const homeowner = safeText(body.homeowner, 10)
    const name = safeText(body.name, 80)
    const phone = safeText(body.phone, 30)

    if (!postcode || !name || !phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }
    if (homeowner && homeowner !== 'yes') {
      return NextResponse.json({ error: 'Homeowners only.' }, { status: 400 })
    }

    // Payload for downstream (email/webhook/CRM)
    const lead = {
      receivedAt: new Date().toISOString(),
      source: safeText(body.source, 40) || 'site',
      postcode,
      homeowner,
      propertyType: safeText(body.propertyType, 20),
      chimney: safeText(body.chimney, 10),
      installType: safeText(body.installType, 20),
      budget: safeText(body.budget, 10),
      timeframe: safeText(body.timeframe, 10),
      name,
      phone,
      email: safeText(body.email, 120),
      contactTime: safeText(body.contactTime, 80),
      notes: safeText(body.notes, 800),
      userAgent: req.headers.get('user-agent') || '',
      ip:
        req.headers.get('x-forwarded-for') ||
        req.headers.get('x-real-ip') ||
        '',
    }

    // 1) Optional webhook (recommended): Zapier/Make -> Google Sheets + notify installer
    const webhookUrl = process.env.LEAD_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
    }

    // 2) Optional email (if you wire a provider) — placeholder for your implementation
    // You can implement Resend, Postmark, SendGrid, etc.

    // Always log (useful during early testing)
    console.log('NEW_LEAD', lead)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
