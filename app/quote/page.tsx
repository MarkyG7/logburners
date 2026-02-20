import Container from '@/components/Container'
import HeaderLanding from '@/components/HeaderLanding'
import QuoteFormMultiStep from '@/components/QuoteFormMultiStep'
import TrustBar from '@/components/TrustBar'

export const metadata = {
  title: 'Get a Quote | North West Log Burners',
  description:
    'Homeowner log burner installations from £2,000+. Get matched with one trusted local installer in Oldham, Bury, Saddleworth, Failsworth & Middleton.',
}

export default function QuotePage() {
  return (
    <div className="min-h-screen">
      <HeaderLanding />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-65 [background:radial-gradient(900px_circle_at_15%_25%,rgba(255,140,0,0.22),transparent_55%),radial-gradient(900px_circle_at_85%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
          <Container className="relative py-12 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,140,0,0.35)] bg-[rgba(255,140,0,0.10)] px-4 py-2 text-xs text-[rgb(var(--muted))]">
                  <span className="h-2 w-2 rounded-full bg-[rgba(255,140,0,0.85)]" />
                  Homeowners only • From £2,000+
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Get matched with one trusted local installer
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--muted))]">
                  This isn&apos;t a quote marketplace. We route your enquiry to a single vetted installer for a tailored,
                  compliant quote.
                </p>

                <div className="mt-8">
                  <TrustBar />
                </div>

                <div className="mt-8 rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="text-sm font-semibold">Typical costs</div>
                  <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
                    <li>
                      <span className="text-white">£2,000–£3,500</span> — existing chimney installs
                    </li>
                    <li>
                      <span className="text-white">£3,000–£6,000+</span> — new flue system installs
                    </li>
                  </ul>
                  <div className="mt-3 text-xs text-[rgb(var(--muted))]">
                    Final pricing depends on stove choice, flue route and chimney condition.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <QuoteFormMultiStep source="ads" />
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[rgb(var(--border))]">
          <Container className="py-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { t: 'No spam', d: 'Your details go to one installer, not a marketplace.' },
                { t: 'Premium filters', d: 'Homeowners only, from £2,000+ installs.' },
                { t: 'Fast response', d: 'Most quotes start with a call within 24 hours.' },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5"
                >
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-2 text-sm text-[rgb(var(--muted))]">{x.d}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}
