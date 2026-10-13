import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { Industries } from "@/components/industries"
import { Projects } from "@/components/projects"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { HowWeWork } from "@/components/how-we-work"
import { AcceptedBy } from "@/components/accepted-by"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <HowWeWork />
      <About />
      <Stats />
      <AcceptedBy />
      <Industries />
      <Projects limit={3} />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}
