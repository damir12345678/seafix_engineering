import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { Industries } from "@/components/industries"
import { Projects } from "@/components/projects"
import { CTABanner } from "@/components/cta-banner"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Industries />
      <Projects />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  )
}
