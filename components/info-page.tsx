import type { ReactNode } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function InfoPage({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#0A0E1A]">
      <Header />
      <article className="container mx-auto max-w-3xl px-4 lg:px-8 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{title}</h1>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white">
          {children}
        </div>
        <Link href="/#home" className="mt-10 inline-block font-semibold text-primary">
          Back to home
        </Link>
      </article>
      <Footer />
    </main>
  )
}
