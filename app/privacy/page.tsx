import Container from '@/components/Container'
import HeaderSEO from '@/components/HeaderSEO'
import Footer from '@/components/Footer'
import { BRAND } from '@/lib/areas'

export const metadata = {
  title: 'Privacy Policy | North West Log Burners',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <HeaderSEO />
      <main>
        <Container className="py-14">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
            <p className="mt-4 text-sm text-[rgb(var(--muted))] leading-relaxed">
              This is a practical starter privacy policy for {BRAND}. Replace/update this with your final legal text.
            </p>

            <div className="mt-10 space-y-6 text-sm leading-relaxed text-[rgb(var(--muted))]">
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">What we collect</h2>
                <p>
                  When you submit a quote request, we collect the information you provide (such as your postcode, property details,
                  budget range, timeframe, and contact details).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">How we use your information</h2>
                <p>
                  We use your information to match you with a trusted local installer and to facilitate a quote for log burner installation.
                  We may also use aggregated, non-identifying information to improve our service.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Sharing your information</h2>
                <p>
                  We share your quote request details with <span className="text-white">one</span> local installer for the purpose of providing a quote.
                  We do not sell your personal data to third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Data retention</h2>
                <p>
                  We retain enquiries for as long as needed to provide the service and for operational record-keeping. You can request deletion by contacting us.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-white">Contact</h2>
                <p>
                  Add your contact email/address here.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
