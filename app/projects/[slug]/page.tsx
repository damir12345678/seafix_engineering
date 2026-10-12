import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Calendar, Check, Clock, MapPin, Ship } from "lucide-react"
import { getProject, projectList } from "@/lib/projects"
import { getService } from "@/lib/services"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projectList.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — ${project.vessel} | SeaFix Engineering`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const service = getService(project.service)
  const otherProjects = projectList.filter((item) => item.slug !== project.slug).slice(0, 3)
  const meta = [
    { icon: Ship, label: "Vessel", value: project.vessel },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Clock, label: "Duration", value: project.duration },
    { icon: Calendar, label: "Date", value: project.date },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge={service?.title.toUpperCase()}
        title={project.title}
        description={project.summary}
        image={project.image}
        breadcrumbs={[
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      >
        <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {meta.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-[#0A0E1A]/70 p-4 backdrop-blur-sm"
            >
              <dt className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </dt>
              <dd className="font-semibold text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="bg-[#0A0E1A] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="overflow-hidden rounded-xl border border-border">
                <img
                  src={project.image}
                  alt={`${project.title} on a ${project.vessel}`}
                  className="h-[260px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">The challenge</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{project.challenge}</p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">What we did</h2>
                <ol className="space-y-4">
                  {project.work.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-white">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl border border-primary/40 bg-primary/5 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">The result</h2>
                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-white">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <Card className="bg-card border-border gap-0 p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-bold text-white mb-4">Key facts</h2>
                <dl className="divide-y divide-border">
                  {project.facts.map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                      <dd className="text-right font-semibold text-white">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                {service && (
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-6 flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
                  >
                    <service.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="flex-1 text-sm font-semibold text-white">{service.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                )}
                <Button
                  asChild
                  className="mt-6 w-full bg-primary hover:bg-[#1D4ED8] text-white font-semibold"
                >
                  <Link href={service ? `/contact?service=${service.slug}` : "/contact"}>
                    REQUEST A SIMILAR JOB
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#0D1526] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">More projects</h2>
            <Link href="/projects" className="inline-flex items-center text-sm font-semibold text-primary">
              ALL PROJECTS
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {otherProjects.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="mb-1 text-xs text-muted-foreground">{item.vessel}</p>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
