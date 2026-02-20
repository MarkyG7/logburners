import Link from 'next/link'
import Container from '@/components/Container'
import HeaderSEO from '@/components/HeaderSEO'
import TrustBar from '@/components/TrustBar'
import AreasGrid from '@/components/AreasGrid'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeaderSEO />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-60 [background:radial-gradient(900px_circle_at_20%_20%,rgba(255,140,0,0.20),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
          <Container className="relative py-14 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,140,0,0.35)] bg-[rgba(255,140,0,0.10)] px-4 py-2 text-xs text-[rgb(var(--muted))]">
                  <span className="h-2 w-2 rounded-full bg-[rgba(255,140,0,0.85)]" />
                  Homeowner installations • From £2,000+
                </div>

                <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                  Log burner installation across <span className="text-[rgba(255,140,0,0.95)]">North East Manchester</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[rgb(var(--muted))]">
                  We match homeowners with <span className="text-white">one</span> trusted local installer — no quote marketplaces, no spam.
                  Fast, compliant installs for existing chimneys and twin wall flue systems.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-2xl bg-[rgba(255,140,0,0.18)] px-6 py-3 text-sm font-semibold text-white ring-1 ring-[rgba(255,140,0,0.55)] hover:bg-[rgba(255,140,0,0.24)]"
                  >
                    Get my installation quote
                  </Link>
                  <Link
                    href="#areas"
                    className="inline-flex items-center justify-center rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] px-6 py-3 text-sm font-semibold text-white hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    See areas covered
                  </Link>
                </div>

                <div className="mt-10">
                  <TrustBar />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-6">
                  <div className="text-sm font-semibold">Typical costs</div>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                    Most professional installations start from <span className="text-white">£2,000</span>.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-[rgba(0,0,0,0.25)] p-4">
                      <div className="text-sm font-semibold">Existing chimney</div>
                      <div className="mt-1 text-sm text-[rgb(var(--muted))]">£2,000–£3,500 (typical)</div>
                    </div>
                    <div className="rounded-2xl bg-[rgba(0,0,0,0.25)] p-4">
                      <div className="text-sm font-semibold">New flue system</div>
                      <div className="mt-1 text-sm text-[rgb(var(--muted))]">£3,000–£6,000+ (typical)</div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[rgb(var(--muted))]">
                    Final cost depends on stove choice, flue route, and chimney condition.
                  </p>
                  <Link
                    href="/quote"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-[rgba(255,255,255,0.90)]"
                  >
                    Check my postcode & get a quote
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[rgb(var(--border))]">
          <Container className="py-14">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold tracking-tight">What we arrange</h2>
                <p className="mt-3 text-sm text-[rgb(var(--muted))] leading-relaxed">
                  Practical, compliant installation quotes — designed for homeowners who want it done properly.
                </p>
              </div>
              <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
                {[
                  { t: 'Stove supply & installation', d: 'End-to-end installation planning and fitting.' },
                  { t: 'Fireplace conversions', d: 'Turn an open fireplace into an efficient stove setup.' },
                  { t: 'Twin wall flue systems', d: 'Compliant installs for homes without a chimney.' },
                  { t: 'Regs & certification', d: 'Installer-led compliance and documentation.' },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="text-sm font-semibold">{x.t}</div>
                    <div className="mt-2 text-sm text-[rgb(var(--muted))]">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="areas" className="border-t border-[rgb(var(--border))]">
          <Container className="py-14">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Areas covered</h2>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">Oldham • Bury • Saddleworth • Failsworth • Middleton</p>
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-2xl bg-[rgba(255,140,0,0.18)] px-5 py-3 text-sm font-semibold text-white ring-1 ring-[rgba(255,140,0,0.55)] hover:bg-[rgba(255,140,0,0.24)]"
              >
                Get a quote
              </Link>
            </div>

            <div className="mt-8">
              <AreasGrid />
            </div>
          </Container>
        </section>

        <section className="border-t border-[rgb(var(--border))]">
          <Container className="py-14">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
                <p className="mt-3 text-sm text-[rgb(var(--muted))] leading-relaxed">
                  A few quick answers — your installer will confirm what applies to your property.
                </p>
              </div>
              <div className="lg:col-span-7">
                <FAQ />
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[rgb(var(--border))]">
          <Container className="py-14">
            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-8">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <h2 className="text-2xl font-semibold tracking-tight">Ready to get a tailored quote?</h2>
                  <p className="mt-3 text-sm text-[rgb(var(--muted))]">
                    We\'ll check your postcode and match you with one trusted installer. Homeowner installs from £2,000+.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <Link
                    href="/quote"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-[rgba(255,255,255,0.90)]"
                  >
                    Get my quote
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
