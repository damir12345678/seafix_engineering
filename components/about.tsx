"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  "Experienced & Certified Engineers",
  "Modern Equipment & Facilities",
  "Compliance with International Standards",
  "Commitment to Quality & Safety",
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-32 bg-[#0D1526]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1749867053314-ebfa14d9b9c4?q=80&w=1470&auto=format&fit=crop"
                alt="Engineers working under a vessel hull"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1526] via-transparent to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-primary rounded-lg hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
            >
              WHO WE ARE
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ABOUT SEAFIX ENGINEERING
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              SeaFix Engineering is a trusted partner in the maritime industry,
              providing high-quality repair and maintenance services with a
              strong focus on safety, efficiency and customer satisfaction.
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 font-semibold"
            >
              <a href="#about">
                ABOUT US
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
