import Link from 'next/link'
import Container from '@/components/Container'
import HeaderLanding from '@/components/HeaderLanding'

export const metadata = {
  title: 'Thank you | North West Log Burners',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen">
      <HeaderLanding />
      <main>
        <Container className="py-16">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-8">
            <div className="text-2xl font-semibold tracking-tight">Thanks — we&apos;ve received your details.</div>
            <p className="mt-4 text-sm text-[rgb(var(--muted))] leading-relaxed">
              A trusted local installer will usually contact you within <span className="text-white">24 hours</span>.
              If you miss the call, they may follow up by text.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] px-6 py-3 text-sm font-semibold text-white hover:bg-[rgba(255,255,255,0.06)]"
              >
                Back to home
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-2xl bg-[rgba(255,140,0,0.18)] px-6 py-3 text-sm font-semibold text-white ring-1 ring-[rgba(255,140,0,0.55)] hover:bg-[rgba(255,140,0,0.24)]"
              >
                Submit another enquiry
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
