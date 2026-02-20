const faqs = [
  {
    q: 'Are log burners banned in Greater Manchester?',
    a: 'No. Some areas are classed as smoke control zones, which means you should use a DEFRA-approved stove and the correct fuel. Your installer will advise what\'s compliant for your location.',
  },
  {
    q: 'Do I need planning permission?',
    a: 'Most installations don\'t require planning permission, but listed buildings or certain alterations may. Your installer can guide you based on your property.',
  },
  {
    q: 'Can I install a log burner without a chimney?',
    a: 'Yes — many homes use a twin wall flue system. A site assessment will confirm the best compliant route.',
  },
  {
    q: 'What does installation typically cost?',
    a: 'As a guide: £2,000–£3,500 with an existing chimney, and £3,000–£6,000+ for a new flue system. Final cost depends on stove choice, flue requirements, and chimney condition.',
  },
]

export default function FAQ() {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5"
        >
          <summary className="cursor-pointer list-none text-sm font-semibold">
            <span className="mr-2 text-[rgba(255,140,0,0.85)]">+</span>
            {f.q}
          </summary>
          <p className="mt-3 text-sm text-[rgb(var(--muted))] leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
