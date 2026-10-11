import { NextResponse } from "next/server"
import { emptyForm, services, validateForm, type FormValues } from "@/lib/contact"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true })
  }

  const values = Object.fromEntries(
    Object.keys(emptyForm).map((field) => {
      const value = body[field]
      return [field, typeof value === "string" ? value.trim() : ""]
    }),
  ) as FormValues

  const errors = validateForm(values)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || "SeaFix Website <onboarding@resend.dev>"
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set")
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
  }

  const serviceLabel = services.find((s) => s.value === values.service)?.label ?? values.service
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "—"],
    ["Service", serviceLabel],
    ["Vessel type", values.vessel || "—"],
  ]

  const html = `
    <h2>New quote request from seafix website</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#666"><b>${label}</b></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>
  `
  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${values.message}`

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      reply_to: values.email,
      subject: `Quote request: ${serviceLabel} — ${values.name}`,
      html,
      text,
    }),
  })

  if (!response.ok) {
    console.error("Contact form: Resend error", response.status, await response.text())
    return NextResponse.json({ error: "Could not send message." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
