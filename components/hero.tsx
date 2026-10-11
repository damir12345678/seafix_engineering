"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Globe, ShieldCheck, Award } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { icon: Clock, label: "24/7 Support" },
  { icon: Globe, label: "Global Service" },
  { icon: Award, label: "Certified Experts" },
  { icon: ShieldCheck, label: "Safety First" },
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568347877321-f8935c7dc5a3?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/80 via-[#0A0E1A]/70 to-[#0A0E1A]" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-6"
            >
              WE ARE MARITIME ENGINEERS
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block">KEEPING FLEETS</span>
            <span className="block">
              MOVING <span className="text-primary">FORWARD</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SeaFix Engineering delivers reliable repair, maintenance and
            engineering solutions for vessels of all types.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-[#1D4ED8] text-white font-semibold px-8"
            >
              <a href="#services">
                OUR SERVICES
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              <a href="#contact">
                GET A QUOTE
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#111827]/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-border"
              >
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-white text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
