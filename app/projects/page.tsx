import type { Metadata } from "next"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { Projects } from "@/components/projects"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Projects | SeaFix Engineering",
  description: "Recent repair and maintenance projects by SeaFix Engineering.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge="OUR WORK"
        title={
          <>
            Our <span className="text-primary">Projects</span>
          </>
        }
        description="A selection of repair and maintenance jobs we have completed for our clients."
        breadcrumbs={[{ name: "Projects", href: "/projects" }]}
      />
      <Projects showLink={false} />
      <CTABanner />
      <Footer />
    </main>
  )
}
