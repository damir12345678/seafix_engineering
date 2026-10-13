"use client"

import { Badge } from "@/components/ui/badge"
import { ClipboardList, Plane, Wrench, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: ClipboardList,
    title: "Request",
    text: "Send us the vessel, port, ETA and the problem, with photos if you have them. We come back with a plan and a quote.",
  },
  {
    icon: Plane,
    title: "Team Mobilisation",
    text: "Engineers, spare parts and tools head to the vessel: in port, at anchorage or in dry dock. Often within hours.",
  },
  {
    icon: Wrench,
    title: "Repair Works",
    text: "We work to the maker's manuals and class requirements, around your cargo and sailing schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Report & Class Acceptance",
    text: "You get a full report with measurements and photos. We hand the work over to the class surveyor and inspectors.",
  },
]

export function HowWeWork() {
  return (
    <section className="py-20 lg:py-32 bg-[#0D1526]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
          >
            HOW WE WORK
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            FROM CALL TO <span className="text-primary">CLASS ACCEPTANCE</span>
          </h2>
        </div>

        <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line on wide screens */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 lg:block"
          />
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-[#0A0E1A] shadow-lg shadow-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
