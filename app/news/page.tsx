import type { Metadata } from "next"
import Link from "next/link"
import { InfoPage } from "@/components/info-page"

export const metadata: Metadata = {
  title: "News & Updates | SeaFix Engineering",
  description: "Recent SeaFix Engineering repair projects.",
}

const updates = [
  {
    href: "/#project-engine-overhaul",
    title: "Engine overhaul on a bulk carrier",
    text: "Full diesel engine overhaul completed alongside routine propulsion checks.",
  },
  {
    href: "/#project-shaft-line",
    title: "Shaft line restoration on a container ship",
    text: "Propeller shaft alignment and restoration while the vessel was in dry dock.",
  },
  {
    href: "/#project-ballast-coating",
    title: "Ballast tank coating on an oil tanker",
    text: "Surface preparation and coating to protect ballast tanks from corrosion.",
  },
]

export default function NewsPage() {
  return (
    <InfoPage title="News & Updates">
      <p>Recent jobs from the yard. Open a project to see it on the main page.</p>
      <ul className="space-y-6 pt-2">
        {updates.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-xl font-semibold text-white no-underline">
              {item.title}
            </Link>
            <p className="mt-1">{item.text}</p>
          </li>
        ))}
      </ul>
    </InfoPage>
  )
}
