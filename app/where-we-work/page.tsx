import type { Metadata } from "next"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { WorkMap } from "@/components/work-map"
import { Projects } from "@/components/projects"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { workLocations } from "@/lib/locations"
import { serviceList } from "@/lib/services"

export const metadata: Metadata = {
  title: "Where We've Worked | SeaFix Engineering",
  description:
    "Ports, anchorages and shipyards where SeaFix Engineering teams have repaired vessels: Europe, the Middle East, Asia, the Americas, Africa and Australia.",
}

const countryCount = new Set(workLocations.map((location) => location.country)).size

const figures = [
  { value: String(workLocations.length), label: "Ports, anchorages & shipyards" },
  { value: String(countryCount), label: "Countries & territories" },
  { value: "5", label: "Continents" },
  { value: String(serviceList.length), label: "Service lines" },
]

export default function WhereWeWorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge="GLOBAL REACH"
        title={
          <>
            Where We&apos;ve <span className="text-primary">Worked</span>
          </>
        }
        description="From Rotterdam to Singapore and from Fujairah to Houston: every point on the map is a port, anchorage or shipyard where our teams have completed a job."
        image="/images/page-services.jpg"
        breadcrumbs={[{ name: "Where We've Worked", href: "/where-we-work" }]}
      />

      <section className="bg-[#0A0E1A] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {figures.map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-card p-6 text-center">
                <p className="text-4xl font-bold text-white md:text-5xl">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <WorkMap />
        </div>
      </section>

      <Projects showLink={false} />
      <CTABanner />
      <Footer />
    </main>
  )
}
