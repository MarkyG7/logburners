import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import HeaderSEO from '@/components/HeaderSEO'
import Footer from '@/components/Footer'
import QuoteFormMultiStep from '@/components/QuoteFormMultiStep'
import { TOWNS } from '@/lib/areas'

export function generateStaticParams() {
  return TOWNS.map((t) => ({ town: t.slug }))
}

export default function TownPage({ params }: { params: { town: string } }) {
  const town = TOWNS.find((t) => t.slug === params.town)
  if (!town) return notFound()

  return (
    <div className="min-h-screen">
      <HeaderSEO />
      <main>
        <Container className="py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="text-xs text-[rgb(var(--muted))]">Area page</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Log burner installation in <span className="text-[rgba(255,140,0,0.95)]">{town.name}</span>
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-[rgb(var(--muted))]">{town.intro}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { t: 'Existing chimney installs', d: 'Efficient stove installs with correct flue lining and hearth setup.' },
                  { t: 'Twin wall flue systems', d: 'Compliant solutions for homes without a chimney.' },
                  { t: 'Fireplace conversions', d: 'Convert an open fireplace into a modern stove setup.' },
                  { t: 'Regs & certification', d: 'Installer-led compliance and documentation.' },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="text-sm font-semibold">{x.t}</div>
                    <div className="mt-2 text-sm text-[rgb(var(--muted))]">{x.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-7">
                <div className="text-sm font-semibold">Cost guide for {town.name}</div>
                <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
                  <li>
                    <span className="text-white">£2,000–£3,500</span> — existing chimney installs
                  </li>
                  <li>
                    <span className="text-white">£3,000–£6,000+</span> — new flue system installs
                  </li>
                </ul>
                <div className="mt-3 text-xs text-[rgb(var(--muted))]">
                  Final pricing depends on stove choice, flue route, and chimney condition.
                </div>
              </div>

              <div className="mt-10">
                <div className="text-sm font-semibold">Nearby areas</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {town.nearby.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs text-[rgb(var(--muted))]"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-[rgba(255,255,255,0.90)]"
                >
                  Get a quote
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <QuoteFormMultiStep source={`seo-${town.slug}`} compact />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
