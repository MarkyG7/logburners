export type Town = {
  slug: string
  name: string
  intro: string
  nearby: string[]
}

export const BRAND = 'North West Log Burners'

export const TOWNS: Town[] = [
  {
    slug: 'oldham',
    name: 'Oldham',
    intro:
      'From Victorian terraces to modern estates, Oldham homes often suit efficient stove installations — whether you\'re converting an old fireplace or fitting a new flue system.',
    nearby: ['Chadderton', 'Failsworth', 'Saddleworth'],
  },
  {
    slug: 'bury',
    name: 'Bury',
    intro:
      'Bury homeowners often choose a log burner for warmth, character and efficiency. We can arrange compliant installs for properties with existing chimneys or new flue systems.',
    nearby: ['Prestwich', 'Ramsbottom', 'Tottington'],
  },
  {
    slug: 'saddleworth',
    name: 'Saddleworth',
    intro:
      'Saddleworth properties and rural-edge homes are ideal for premium stove installations. We match homeowners with experienced local installers for clean, compliant work.',
    nearby: ['Uppermill', 'Greenfield', 'Delph'],
  },
  {
    slug: 'failsworth',
    name: 'Failsworth',
    intro:
      'Failsworth homes frequently benefit from fireplace conversions and modern DEFRA-approved stoves. We arrange installation quotes from trusted local fitters.',
    nearby: ['Newton Heath', 'Chadderton', 'Oldham'],
  },
  {
    slug: 'middleton',
    name: 'Middleton',
    intro:
      'Middleton homeowners can install a wood-burning stove with the right flue design and certification. We\'ll match you with a vetted installer for a tailored quote.',
    nearby: ['Heywood', 'Chadderton', 'Rochdale'],
  },
]

// Premium postcode filter: outward codes commonly covering the chosen towns.
// - Oldham/Saddleworth: OL*
// - Bury: BL*
// - Middleton: M24
// - Failsworth: M35
export const ALLOWED_OUTWARD_PREFIXES = ['OL', 'BL']
export const ALLOWED_OUTWARD_EXACT = ['M24', 'M35']
