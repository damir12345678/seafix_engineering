"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { Linkedin, Facebook, Instagram } from "lucide-react"

const footerLinks = {
  services: [
    { name: "Engine Repair", href: "/#engine-repair" },
    { name: "Shaft Line Services", href: "/#shaft-line" },
    { name: "Ballast Tank Coating", href: "/#ballast-tank" },
    { name: "Welding Works", href: "/#welding" },
  ],
  industries: [
    { name: "Commercial Shipping", href: "/#commercial-shipping" },
    { name: "Offshore & Oil/Gas", href: "/#offshore-oil-gas" },
    { name: "Yachts & Superyachts", href: "/#yachts" },
    { name: "Government & Navy", href: "/#government-navy" },
  ],
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Our Projects", href: "/#projects" },
    { name: "Careers", href: "/careers" },
    { name: "News & Updates", href: "/news" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-[#070B14] pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-border">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/#home" className="inline-flex items-center mb-4">
              <Logo className="h-14" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your trusted partner for maritime engineering, repair, and
              maintenance solutions worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-semibold mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 SeaFix Engineering. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
