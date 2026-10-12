import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { PageHero } from "@/components/page-hero"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Check, Mail, Phone } from "lucide-react"
import { getService, serviceList } from "@/lib/services"
import { projectList } from "@/lib/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return serviceList.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: `${service.title} | SeaFix Engineering`,
    description: service.short,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const otherServices = serviceList.filter((item) => item.slug !== service.slug)
  const relatedProjects = projectList.filter((project) => project.service === service.slug)
  const quoteHref = `/contact?service=${service.slug}`

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge="OUR SERVICES"
        title={service.title}
        description={service.short}
        image={service.image}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <Button
          asChild
          size="lg"
          className="mt-8 bg-primary hover:bg-[#1D4ED8] text-white font-semibold"
        >
          <Link href={quoteHref}>
            REQUEST A QUOTE
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </PageHero>

      <section className="bg-[#0A0E1A] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Details */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {service.intro}
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  What we cover
                </h2>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.extra && (
                <div className="rounded-xl border border-primary/40 bg-primary/5 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {service.extra.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{service.extra.text}</p>
                  <ul className="space-y-3">
                    {service.extra.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <Card className="bg-card border-border gap-0 p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-bold text-white mb-2">Need this service?</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Tell us about your vessel and the job. Our team is available 24/7.
                </p>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-[#1D4ED8] text-white font-semibold mb-6"
                >
                  <Link href={quoteHref}>
                    REQUEST A QUOTE
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="space-y-4 border-t border-border pt-6">
                  <a
                    href="tel:+97144389200"
                    className="flex items-center gap-3 text-white hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-primary" />
                    +971 4 438 9200
                  </a>
                  <a
                    href="mailto:repair@seafixengineering.com"
                    className="flex items-center gap-3 text-white hover:text-primary transition-colors wrap-anywhere"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    repair@seafixengineering.com
                  </a>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-[#0A0E1A] pb-16 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Recent projects</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <p className="mb-1 text-xs text-muted-foreground">
                      {project.vessel} · {project.location}
                    </p>
                    <h3 className="font-semibold text-white">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="bg-[#0D1526] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Other services</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </span>
                <span className="flex-1 font-semibold text-white">{item.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
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
