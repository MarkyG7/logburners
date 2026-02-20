import Container from '@/components/Container'
import HeaderSEO from '@/components/HeaderSEO'
import Footer from '@/components/Footer'
import { BRAND } from '@/lib/areas'

export const metadata = {
  title: 'Terms | North West Log Burners',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <HeaderSEO />
      <main>
        <Container className="py-14">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight">Terms</h1>
            <p className="mt-4 text-sm text-[rgb(var(--muted))] leading-relaxed">
              Starter terms for {BRAND}. Replace/update this with your final legal text.
            </p>

            <div className="mt-10 space-y-6 text-sm leading-relaxed text-[rgb(var(--muted))]">
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Service</h2>
                <p>
                  We provide an installer-matching service. We do not carry out installation work ourselves unless explicitly stated.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Quotes & third parties</h2>
                <p>
                  Any quote, availability, and installation agreement is between you and the installer. Always verify certifications,
                  insurance, and final scope before proceeding.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Liability</h2>
                <p>
                  To the maximum extent permitted by law, we are not liable for losses arising from the work performed by third-party installers.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Contact</h2>
                <p>Add your contact email/address here.</p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
