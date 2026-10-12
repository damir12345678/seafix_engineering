import type { Metadata } from "next"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { Services } from "@/components/services"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Services | SeaFix Engineering",
  description:
    "Engine repair, marine electrical, navigation equipment, shaft line, ballast tank coating and welding services for vessels of all types.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge="WHAT WE DO"
        title={
          <>
            Our <span className="text-primary">Services</span>
          </>
        }
        description="Repair, maintenance and engineering for vessels of all types, on board or in the workshop, 24/7."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
      />
      <div className="bg-[#0A0E1A] pt-16 lg:pt-20">
        <Services showHeader={false} />
      </div>
      <CTABanner />
      <Footer />
    </main>
  )
}
