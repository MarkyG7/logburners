# North West Log Burners (Next.js)

Premium lead-gen site for homeowner log burner installations across:
- Oldham
- Bury
- Saddleworth
- Failsworth
- Middleton

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Pages
- `/` SEO homepage
- `/quote` Ads landing page (conversion-focused)
- `/areas/[town]` Town pages
- `/thank-you` Confirmation
- `/privacy` and `/terms`

## Premium lead filters
The multi-step form enforces:
- Homeowners only
- Budget starts at £2,000+
- Valid UK postcode
- Service-area postcode check (OL*, BL*, M24, M35)

Adjust these in `lib/areas.ts`.

## Lead delivery (recommended)
Use a webhook so you can:
- Save to Google Sheets
- Notify installer(s) via email/SMS
- Create CRM records

### 1) Set LEAD_WEBHOOK_URL
Create a Zapier/Make webhook and set:

```bash
LEAD_WEBHOOK_URL=https://hooks.zapier.com/...
```

### 2) Local env
Create `.env.local`:

```bash
LEAD_WEBHOOK_URL=
```

If `LEAD_WEBHOOK_URL` is not set, the API will still log leads to the server console (`NEW_LEAD`).

## Deploy
- Vercel: push to GitHub and import project
- Netlify: Next.js runtime supported

