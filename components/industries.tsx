"use client"

import { Badge } from "@/components/ui/badge"
import {
  Ship,
  Anchor,
  Sailboat,
  Shield,
  Fish,
  Container,
  Droplet,
  Users,
} from "lucide-react"
import { motion } from "framer-motion"

const industries = [
  { id: "commercial-shipping", icon: Ship, name: "Commercial Shipping" },
  { id: "offshore-oil-gas", icon: Anchor, name: "Offshore & Oil/Gas" },
  { id: "yachts", icon: Sailboat, name: "Yachts & Superyachts" },
  { id: "government-navy", icon: Shield, name: "Government & Navy" },
  { id: "fishing-vessels", icon: Fish, name: "Fishing Vessels" },
  { id: "bulk-carrier", icon: Container, name: "Bulk Carrier" },
  { id: "oil-tanker", icon: Droplet, name: "Oil Tanker" },
  { id: "cruise-ship", icon: Users, name: "Cruise Ship" },
]

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-24 py-20 lg:py-32 bg-[#0D1526]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
            >
              WE WORK ACROSS
            </Badge>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            MULTIPLE INDUSTRIES
          </motion.h2>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.a
              key={industry.id}
              id={industry.id}
              href="#contact"
              className="group scroll-mt-28 bg-card hover:bg-card/80 border border-border hover:border-primary/50 rounded-lg p-6 text-center transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <industry.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-white font-medium text-sm md:text-base">
                {industry.name}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
