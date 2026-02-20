import Link from 'next/link'
import Container from './Container'
import { BRAND } from '@/lib/areas'

export default function HeaderLanding() {
  return (
    <header className="border-b border-[rgb(var(--border))] bg-[rgba(10,10,10,0.65)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(10,10,10,0.45)]">
      <Container className="py-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-[rgb(var(--muted))] hover:text-white">← Back</Link>
          <div className="text-sm font-semibold tracking-tight">{BRAND}</div>
          <div className="text-xs text-[rgb(var(--muted))]">Homeowner installs • From £2,000+</div>
        </div>
      </Container>
    </header>
  )
}
