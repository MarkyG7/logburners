import Link from 'next/link'
import { TOWNS } from '@/lib/areas'

export default function AreasGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOWNS.map((t) => (
        <Link
          key={t.slug}
          href={`/areas/${t.slug}`}
          className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5 hover:bg-[rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">{t.name}</div>
            <div className="text-sm text-[rgb(var(--muted))] group-hover:text-white">→</div>
          </div>
          <div className="mt-2 text-sm text-[rgb(var(--muted))]">Log burner installation quotes</div>
        </Link>
      ))}
    </div>
  )
}
