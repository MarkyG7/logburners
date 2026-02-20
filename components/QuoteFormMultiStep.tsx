'use client'

import { useMemo, useState } from 'react'
import { ALLOWED_OUTWARD_EXACT, ALLOWED_OUTWARD_PREFIXES } from '@/lib/areas'
import { getOutwardCode, isValidUKMobile, isValidUKPostcode, normalizePostcode } from '@/lib/validators'

type Budget = '2-4' | '4-6' | '6+'
type Timeframe = 'asap' | '3m' | '6m'
type InstallType = 'new' | 'replace' | 'conversion'

type Lead = {
  postcode: string
  homeowner: 'yes' | 'no'
  propertyType: 'detached' | 'semi' | 'terrace' | 'bungalow' | 'other'
  chimney: 'yes' | 'no' | 'unsure'
  installType: InstallType
  budget: Budget
  timeframe: Timeframe
  name: string
  phone: string
  email?: string
  contactTime?: string
  notes?: string
}

function outwardAllowed(postcode: string): boolean {
  const outward = getOutwardCode(postcode)
  if (!outward) return false
  if (ALLOWED_OUTWARD_EXACT.includes(outward)) return true
  return ALLOWED_OUTWARD_PREFIXES.some((p) => outward.startsWith(p))
}

export default function QuoteFormMultiStep({
  source = 'site',
  compact = false,
}: {
  source?: string
  compact?: boolean
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [lead, setLead] = useState<Lead>({
    postcode: '',
    homeowner: 'yes',
    propertyType: 'semi',
    chimney: 'unsure',
    installType: 'new',
    budget: '2-4',
    timeframe: '3m',
    name: '',
    phone: '',
    email: '',
    contactTime: '',
    notes: '',
  })

  const progress = useMemo(() => (step / 3) * 100, [step])

  function next() {
    setError(null)
    if (step === 1) {
      const pc = normalizePostcode(lead.postcode)
      if (!isValidUKPostcode(pc)) return setError('Please enter a valid UK postcode.')
      if (!outwardAllowed(pc))
        return setError('This service currently covers Oldham, Bury, Saddleworth, Failsworth & Middleton. Please enter a local postcode.')
      if (lead.homeowner !== 'yes') return setError('This service is currently for homeowners only.')
      setLead((p) => ({ ...p, postcode: pc }))
    }
    if (step === 2) {
      // Premium-only: budget starts at £2k by design, timeframe 6m is allowed but flagged.
      if (!lead.budget) return setError('Please select a budget range.')
      if (!lead.timeframe) return setError('Please select a timeframe.')
    }
    setStep((s) => (s === 3 ? 3 : ((s + 1) as any)))
  }

  function back() {
    setError(null)
    setStep((s) => (s === 1 ? 1 : ((s - 1) as any)))
  }

  async function submit() {
    setError(null)
    const pc = normalizePostcode(lead.postcode)
    if (!isValidUKPostcode(pc)) return setError('Please enter a valid UK postcode.')
    if (!outwardAllowed(pc))
      return setError('This service currently covers Oldham, Bury, Saddleworth, Failsworth & Middleton. Please enter a local postcode.')
    if (lead.homeowner !== 'yes') return setError('This service is currently for homeowners only.')
    if (!lead.name.trim()) return setError('Please enter your name.')
    if (!isValidUKMobile(lead.phone)) return setError('Please enter a valid UK mobile number (07… or +44…).')

    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, postcode: pc, source }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }
      window.location.href = '/thank-you'
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const shell = compact
    ? 'rounded-2xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-5'
    : 'rounded-3xl border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)] p-6 sm:p-8'

  return (
    <div className={shell}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-base font-semibold">Get matched with one trusted installer</div>
          <div className="mt-1 text-sm text-[rgb(var(--muted))]">Homeowner installs • From £2,000+ • Quotes within 24 hours</div>
        </div>
        <div className="hidden text-xs text-[rgb(var(--muted))] sm:block">Step {step} of 3</div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
        <div className="h-full rounded-full bg-[rgba(255,140,0,0.75)]" style={{ width: `${progress}%` }} />
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-[rgba(255,90,90,0.35)] bg-[rgba(255,90,90,0.08)] p-4 text-sm">
          {error}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-6 space-y-4">
          <Field label="Postcode" help="We currently cover Oldham, Bury, Saddleworth, Failsworth & Middleton.">
            <input
              value={lead.postcode}
              onChange={(e) => setLead((p) => ({ ...p, postcode: e.target.value }))}
              placeholder="e.g. OL1 1AA"
              className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
              inputMode="text"
              autoComplete="postal-code"
            />
          </Field>

          <Field label="Do you own this property?" help="We currently work with homeowners only.">
            <Segment
              value={lead.homeowner}
              onChange={(v) => setLead((p) => ({ ...p, homeowner: v as any }))}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Property type">
              <select
                value={lead.propertyType}
                onChange={(e) => setLead((p) => ({ ...p, propertyType: e.target.value as any }))}
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
              >
                <option value="detached">Detached</option>
                <option value="semi">Semi-detached</option>
                <option value="terrace">Terrace</option>
                <option value="bungalow">Bungalow</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <Field label="Chimney present?">
              <select
                value={lead.chimney}
                onChange={(e) => setLead((p) => ({ ...p, chimney: e.target.value as any }))}
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">Unsure</option>
              </select>
            </Field>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-6 space-y-4">
          <Field label="Installation type">
            <select
              value={lead.installType}
              onChange={(e) => setLead((p) => ({ ...p, installType: e.target.value as any }))}
              className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
            >
              <option value="new">New install (no stove yet)</option>
              <option value="replace">Replace existing stove</option>
              <option value="conversion">Fireplace conversion</option>
            </select>
          </Field>

          <Field label="Budget range" help="Premium installations typically start from £2,000.">
            <Segment
              value={lead.budget}
              onChange={(v) => setLead((p) => ({ ...p, budget: v as any }))}
              options={[
                { value: '2-4', label: '£2k–£4k' },
                { value: '4-6', label: '£4k–£6k' },
                { value: '6+', label: '£6k+' },
              ]}
            />
          </Field>

          <Field label="Timeframe">
            <Segment
              value={lead.timeframe}
              onChange={(v) => setLead((p) => ({ ...p, timeframe: v as any }))}
              options={[
                { value: 'asap', label: 'ASAP' },
                { value: '3m', label: 'Within 3 months' },
                { value: '6m', label: '3–6 months' },
              ]}
            />
            <div className="mt-2 text-xs text-[rgb(var(--muted))]">
              Tip: ASAP / within 3 months gets the fastest installer availability.
            </div>
          </Field>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input
                value={lead.name}
                onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
                autoComplete="name"
              />
            </Field>
            <Field label="Mobile number" help="Used only for the installer to contact you.">
              <input
                value={lead.phone}
                onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
                placeholder="07… or +44…"
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email (optional)">
              <input
                value={lead.email}
                onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
                inputMode="email"
                autoComplete="email"
              />
            </Field>
            <Field label="Preferred contact time (optional)">
              <input
                value={lead.contactTime}
                onChange={(e) => setLead((p) => ({ ...p, contactTime: e.target.value }))}
                placeholder="e.g. Evenings after 6pm"
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
              />
            </Field>
          </div>

          <Field label="Anything we should know? (optional)" help="Access, chimney condition, fireplace photos, etc.">
            <textarea
              value={lead.notes}
              onChange={(e) => setLead((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Optional notes"
              className="min-h-[96px] w-full resize-y rounded-xl border border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(255,140,0,0.35)]"
            />
          </Field>

          <div className="text-xs text-[rgb(var(--muted))]">
            By submitting, you agree we may share your details with <span className="text-white">one</span> trusted local installer to provide a quote.
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 1 || submitting}
          className="rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-2 text-sm text-[rgb(var(--muted))] hover:text-white disabled:opacity-40"
        >
          Back
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-[rgba(255,140,0,0.14)] px-5 py-2 text-sm font-semibold text-white ring-1 ring-[rgba(255,140,0,0.45)] hover:bg-[rgba(255,140,0,0.20)]"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-xl bg-[rgba(255,140,0,0.18)] px-5 py-2 text-sm font-semibold text-white ring-1 ring-[rgba(255,140,0,0.55)] hover:bg-[rgba(255,140,0,0.24)] disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Get my quote'}
          </button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  help,
  children,
}: {
  label: string
  help?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-sm font-semibold">{label}</div>
        {help ? <div className="text-xs text-[rgb(var(--muted))]">{help}</div> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function Segment({
  value,
  options,
  onChange,
}: {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-4 py-3 text-sm transition ${
              active
                ? 'border-[rgba(255,140,0,0.65)] bg-[rgba(255,140,0,0.14)] text-white'
                : 'border-[rgb(var(--border))] bg-[rgba(0,0,0,0.25)] text-[rgb(var(--muted))] hover:text-white'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
