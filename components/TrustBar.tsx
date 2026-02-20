export default function TrustBar() {
  const items = [
    { title: 'HETAS-ready', desc: 'Installer-led certification process' },
    { title: 'Fully insured', desc: 'Professional workmanship' },
    { title: 'Building regs', desc: 'Compliant installation standards' },
    { title: '1 installer', desc: 'Matched to one trusted fitter' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-4 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.title} className="rounded-xl bg-[rgba(0,0,0,0.25)] p-3">
          <div className="text-sm font-semibold">{it.title}</div>
          <div className="mt-1 text-xs text-[rgb(var(--muted))]">{it.desc}</div>
        </div>
      ))}
    </div>
  )
}
