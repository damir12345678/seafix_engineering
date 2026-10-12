import type { ReactNode } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

export function PageHero({
  badge,
  title,
  description,
  image,
  breadcrumbs = [],
  children,
}: {
  badge?: string
  title: ReactNode
  description?: string
  image?: string
  breadcrumbs?: { name: string; href: string }[]
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[#0D1526] pt-32 pb-16 lg:pt-40 lg:pb-24">
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/70 via-[#0D1526]/80 to-[#0A0E1A]" />
        </>
      )}
      <div className="container relative mx-auto px-4 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <Link href={crumb.href} className="hover:text-white transition-colors">
                {crumb.name}
              </Link>
            </span>
          ))}
        </nav>
        {badge && (
          <Badge
            variant="outline"
            className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
          >
            {badge}
          </Badge>
        )}
        <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
