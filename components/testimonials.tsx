"use client"

import { Badge } from "@/components/ui/badge"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "They cut our dry-docking downtime by three days. For our fleet that means hundreds of thousands of dollars saved, not just a nice line in a report.",
    author: "Technical Superintendent",
    company: "Tanker operator",
  },
  {
    quote:
      "Spare parts and support arrived on time, right in port, when everything else was falling apart. A rare contractor that doesn't make promises, but quietly solves the problem.",
    author: "Fleet Director",
    company: "Container line",
  },
  {
    quote:
      "We passed our vetting inspection without a single finding on equipment. If you want results without stress for your crew, these are the people to call.",
    author: "Marine Operations Manager",
    company: "Bulk carrier fleet",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-[#0A0E1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
          >
            CLIENT FEEDBACK
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            WHAT OUR <span className="text-primary">CLIENTS SAY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.author}
              className="relative flex flex-col rounded-xl border border-border bg-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Quote className="h-8 w-8 text-primary/60 mb-4" />
              <blockquote className="flex-1 text-white/90 leading-relaxed">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-white">{item.author}</p>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
