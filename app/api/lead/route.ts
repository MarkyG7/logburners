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
      budget: safeText(body.budget, 20),
      timeframe: safeText(body.timeframe, 20),
      name,
      phone,
      email: safeText(body.email, 120),
      contactTime: safeText(body.contactTime, 80),
      notes: safeText(body.notes, 800),
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Missing RESEND_API_KEY' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || 'North West Log Burners <onboarding@resend.dev>',
      to: [process.env.LEAD_TO_EMAIL || 'logburners@itwp.co.uk'],
      subject: `New Log Burner Lead — ${lead.postcode} — ${lead.budget} — ${lead.timeframe}`,
      text: [
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email || '-'}`,
        ``,
        `Postcode: ${lead.postcode}`,
        `Homeowner: ${lead.homeowner}`,
        `Property type: ${lead.propertyType}`,
        `Chimney: ${lead.chimney}`,
        `Install type: ${lead.installType}`,
        `Budget: ${lead.budget}`,
        `Timeframe: ${lead.timeframe}`,
        `Preferred contact time: ${lead.contactTime || '-'}`,
        ``,
        `Notes:`,
        `${lead.notes || '-'}`,
        ``,
        `Received: ${lead.receivedAt}`,
      ].join('\n'),
    })

    if (error) {
      return NextResponse.json({ ok: false, resendError: error }, { status: 500 })
    }

    // ✅ THIS is the proof: you will see an id in curl output
    return NextResponse.json({ ok: true, resend: data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}