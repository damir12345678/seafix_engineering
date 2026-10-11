import type { Metadata } from "next"
import Link from "next/link"
import { InfoPage } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Careers | SeaFix Engineering",
  description: "Roles SeaFix Engineering is looking for in maritime repair.",
}

export default function CareersPage() {
  return (
    <InfoPage title="Careers">
      <p>
        SeaFix Engineering hires people who repair ships in yards and on board:
        marine engineers, welders, coating teams, and shaft-line specialists.
      </p>
      <h2>What we look for</h2>
      <p>
        Certificates for the trade, experience on commercial vessels, and
        readiness for 24/7 call-outs.
      </p>
      <h2>How to apply</h2>
      <p>
        There is no separate application form. Use the{" "}
        <Link href="/#contact">quote form</Link> and write the role you want
        in the message. You can also email{" "}
        <a href="mailto:info@seafix.com">info@seafix.com</a>.
      </p>
    </InfoPage>
  )
}
