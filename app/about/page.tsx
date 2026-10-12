import type { Metadata } from "next"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { Industries } from "@/components/industries"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us | SeaFix Engineering",
  description:
    "SeaFix Engineering is a Dubai-based maritime repair and maintenance company supporting vessels worldwide, 24/7.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge="WHO WE ARE"
        title={
          <>
            About <span className="text-primary">SeaFix Engineering</span>
          </>
        }
        description="Maritime engineers from Dubai, supporting vessels in any port around the world."
        image="/images/page-about.jpg"
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />
      <About showLink={false} />
      <Stats />
      <Industries />
      <CTABanner />
      <Footer />
    </main>
  )
}
