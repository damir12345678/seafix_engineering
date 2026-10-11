"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Phone, ArrowRight, Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0E1A]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/#home" className="flex items-center shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo className="h-12 md:h-[52px]" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+13055550198"
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">+1 (305) 555-0198</span>
            </a>
            <Button asChild className="bg-primary hover:bg-[#1D4ED8] text-white font-semibold">
              <a href="/#contact">
                GET A QUOTE
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1526] border-t border-border">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-white transition-colors py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+13055550198"
              className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors py-2"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (305) 555-0198</span>
            </a>
            <Button asChild className="bg-primary hover:bg-[#1D4ED8] text-white font-semibold w-full mt-2">
              <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                GET A QUOTE
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
