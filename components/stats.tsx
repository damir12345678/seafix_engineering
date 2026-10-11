"use client"

import { motion } from "framer-motion"

const stats = [
  { number: "20", suffix: "+", label: "Years Experience" },
  { number: "500", suffix: "+", label: "Projects Completed" },
  { number: "50", suffix: "+", label: "Expert Engineers" },
  { number: "24/7", suffix: "", label: "Support Available" },
]

export function Stats() {
  return (
    <section className="py-16 bg-[#0A0E1A] border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {stat.number}
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
