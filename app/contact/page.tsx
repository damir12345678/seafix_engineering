import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact Us | SeaFix Engineering",
  description:
    "Request a free quote or contact SeaFix Engineering in Dubai. Our team is available 24/7.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0D1526]">
      <Header />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
