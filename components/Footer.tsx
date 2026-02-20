import Container from './Container'
import Link from 'next/link'
import { BRAND } from '@/lib/areas'

export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))]">
      <Container className="py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-semibold">{BRAND}</div>
            <div className="mt-1 text-xs text-[rgb(var(--muted))]">Homeowner log burner installation matching.</div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[rgb(var(--muted))]">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
        <div className="mt-6 text-xs text-[rgb(var(--muted))]">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
