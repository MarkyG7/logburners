import Link from 'next/link'
import Container from './Container'
import { BRAND, TOWNS } from '@/lib/areas'

export default function HeaderSEO() {
  return (
    <header className="border-b border-[rgb(var(--border))] bg-[rgba(10,10,10,0.65)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(10,10,10,0.45)]">
      <Container className="py-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group">
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-semibold tracking-tight">{BRAND}</span>
              <span className="hidden text-sm text-[rgb(var(--muted))] sm:inline">Premium installer matching</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[rgb(var(--muted))] md:flex">
            <Link className="hover:text-white" href="/quote">Get a quote</Link>
            <div className="relative group">
              <span className="cursor-default hover:text-white">Areas</span>
              <div className="invisible absolute right-0 top-full z-20 mt-3 w-56 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                {TOWNS.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/areas/${t.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-[rgb(var(--muted))] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link className="hover:text-white" href="/privacy">Privacy</Link>
          </nav>

          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-xl bg-[rgba(255,140,0,0.14)] px-4 py-2 text-sm font-medium text-white ring-1 ring-[rgba(255,140,0,0.45)] hover:bg-[rgba(255,140,0,0.20)]"
          >
            Get a quote
          </Link>
        </div>
      </Container>
    </header>
  )
}
