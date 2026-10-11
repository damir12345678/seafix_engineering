import type { Metadata } from "next"
import { InfoPage } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Terms of Use | SeaFix Engineering",
  description: "Terms for using the SeaFix Engineering website.",
}

export default function TermsPage() {
  return (
    <InfoPage title="Terms of Use">
      <p>
        This website presents SeaFix Engineering services for general
        information. It is not a contract and not a technical instruction for
        a vessel.
      </p>
      <h2>Quotes</h2>
      <p>
        Sending the quote form does not book a job. Work starts only after both
        sides agree in writing.
      </p>
      <h2>Site content</h2>
      <p>
        Photos and descriptions show the kind of work we do. They are not a
        promise about a particular ship, timeline, or price.
      </p>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:info@seafix.com">info@seafix.com</a>.
      </p>
    </InfoPage>
  )
}
