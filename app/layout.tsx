import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'North West Log Burners | Log Burner Installation Quotes',
  description: 'Homeowner log burner installations across Oldham, Bury, Saddleworth, Failsworth & Middleton. Get matched with one trusted local installer.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
