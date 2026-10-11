"use client"

import { Button } from "@/components/ui/button"
import { Headphones, Phone, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CTABanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-primary to-[#1D4ED8]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hidden lg:flex">
              <Headphones className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {"LET'S KEEP YOUR FLEET MOVING"}
              </h3>
              <p className="text-white/80">
                Contact us today for a fast and reliable solution.
              </p>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              <a href="tel:+306983012050">
                <Phone className="mr-2 h-5 w-5" />
                CALL US NOW
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20 font-semibold"
            >
              <a href="#contact">
                GET A QUOTE
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
