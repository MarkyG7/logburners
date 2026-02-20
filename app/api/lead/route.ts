import { Resend } from "resend";

// ... inside POST, just before sending:
if (!process.env.RESEND_API_KEY) {
  return NextResponse.json(
    { error: "Missing RESEND_API_KEY (check Netlify env + redeploy)" },
    { status: 500 }
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

const toEmail = process.env.LEAD_TO_EMAIL || "logburners@itwp.co.uk";
const fromEmail =
  process.env.LEAD_FROM_EMAIL || "North West Log Burners <onboarding@resend.dev>";

const { data, error } = await resend.emails.send({
  from: fromEmail,
  to: [toEmail],
  subject: `New Log Burner Lead — ${lead.postcode} — ${lead.budget} — ${lead.timeframe}`,
  text: `Name: ${lead.name}\nPhone: ${lead.phone}\nPostcode: ${lead.postcode}\nBudget: ${lead.budget}\nTimeframe: ${lead.timeframe}\n`,
});

if (error) {
  return NextResponse.json(
    { error: "Resend send failed", details: error },
    { status: 500 }
  );
}

return NextResponse.json({ ok: true, resend: data });