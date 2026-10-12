import type { Metadata } from "next"
import Link from "next/link"
import { InfoPage } from "@/components/info-page"
import { projectList } from "@/lib/projects"

export const metadata: Metadata = {
  title: "News & Updates | SeaFix Engineering",
  description: "Recent SeaFix Engineering repair projects.",
}

const updates = projectList.map((project) => ({
  href: `/projects/${project.slug}`,
  title: `${project.title} — ${project.vessel}`,
  text: `${project.location}, ${project.date}. ${project.summary}`,
}))

export default function NewsPage() {
  return (
    <InfoPage title="News & Updates">
      <p>Recent jobs from our engineers. Open a project to read the full case study.</p>
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
