import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

function safeText(v: unknown, max = 500): string {
  if (typeof v !== 'string') return ''
  const s = v.trim()
  return s.length > max ? s.slice(0, max) : s
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

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

    // 🔥 Send Email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from:
        process.env.LEAD_FROM_EMAIL ||
        'North West Log Burners <onboarding@resend.dev>',
      to: [process.env.LEAD_TO_EMAIL || 'logburners@itwp.co.uk'],
      subject: `New Log Burner Lead — ${lead.postcode} — ${lead.budget} — ${lead.timeframe}`,
      text: `
New Premium Lead

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email || '-'}

Postcode: ${lead.postcode}
Homeowner: ${lead.homeowner}
Property Type: ${lead.propertyType}
Chimney: ${lead.chimney}
Install Type: ${lead.installType}
Budget: ${lead.budget}
Timeframe: ${lead.timeframe}
Preferred Contact Time: ${lead.contactTime || '-'}

Notes:
${lead.notes || '-'}

Source: ${lead.source}
Received: ${lead.receivedAt}
      `,
    })

    console.log('NEW_LEAD', lead)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}