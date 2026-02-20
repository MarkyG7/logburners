export function normalizePostcode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, ' ')
}

export function isValidUKPostcode(input: string): boolean {
  const pc = normalizePostcode(input)
  // Pragmatic UK postcode regex (not perfect, but good for forms)
  const re = /^([A-Z]{1,2}\d{1,2}[A-Z]?|[A-Z]{1,2}\d[A-Z])\s?\d[A-Z]{2}$/
  return re.test(pc.replace(' ', '')) || /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s\d[A-Z]{2}$/.test(pc)
}

export function getOutwardCode(input: string): string | null {
  const pc = normalizePostcode(input)
  const parts = pc.split(' ')
  if (parts.length === 0) return null
  const outward = parts[0]
  return outward || null
}

export function isValidUKMobile(input: string): boolean {
  const v = input.trim().replace(/\s+/g, '')
  // Accept +44... or 07...
  if (/^\+44\d{10}$/.test(v)) return true
  if (/^07\d{9}$/.test(v)) return true
  return false
}
