import type { Metadata } from "next"
import { InfoPage } from "@/components/info-page"

export const metadata: Metadata = {
  title: "Privacy Policy | SeaFix Engineering",
  description: "How SeaFix Engineering handles information submitted through this website.",
}

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy">
      <p>
        SeaFix Engineering uses this website to describe repair and maintenance
        services and to receive quote requests.
      </p>
      <h2>What you send us</h2>
      <p>
        The quote form asks for your name, email, phone, the service you need,
        vessel type, and a message. Phone and vessel type are optional.
      </p>
      <h2>How we use it</h2>
      <p>
        We use these details to reply to your enquiry and prepare a quote. We
        do not sell or share them with other companies. We keep them only as
        long as needed to respond and follow up on the request.
      </p>
      <h2>Questions</h2>
      <p>
        Write to <a href="mailto:info@seafix.com">info@seafix.com</a> or call{" "}
        <a href="tel:+306983012050">+30 69 830 12 050</a>.
      </p>
    </InfoPage>
  )
}
