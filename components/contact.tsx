"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Navigation, ArrowRight, CheckCircle2, AlertCircle, Loader2, ImagePlus, X } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import {
  emptyForm,
  MAX_PHOTOS,
  MAX_PHOTOS_TOTAL_BYTES,
  services,
  validateForm,
  type FormErrors,
  type FormValues,
} from "@/lib/contact"

const officeAddress =
  "Office 1402, Al Saaha Offices (Building B), Souk Al Bahar, Old Town Island, Downtown Dubai, Dubai, UAE"
const mapQuery = encodeURIComponent("Al Saaha Offices, Souk Al Bahar, Downtown Dubai, UAE")
const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`
const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+971 4 438 9200",
    href: "tel:+97144389200",
    note: "24/7",
  },
  {
    icon: Mail,
    title: "Sales & Quotes",
    value: "sales@seafixengineering.com",
    href: "mailto:sales@seafixengineering.com",
  },
  {
    icon: Mail,
    title: "Repair & Service",
    value: "repair@seafixengineering.com",
    href: "mailto:repair@seafixengineering.com",
  },
]

type Photo = { file: File; url: string }

// Shrink a photo in the browser so several of them fit into one request.
async function shrinkPhoto(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.8),
    )
    if (!blob) return file
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg"
    return new File([blob], name, { type: "image/jpeg" })
  } catch {
    // Formats the browser cannot decode are sent as they are.
    return file
  }
}

function fieldClass(hasError: boolean) {
  return `bg-card text-white placeholder:text-muted-foreground h-12 ${
    hasError ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
  }`
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [photoError, setPhotoError] = useState<string | null>(null)
  const photoInput = useRef<HTMLInputElement>(null)

  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    )
    event.target.value = ""
    if (!picked.length) return
    setPhotoError(null)
    setSent(false)

    const room = MAX_PHOTOS - photos.length
    if (picked.length > room) {
      setPhotoError(`You can attach up to ${MAX_PHOTOS} photos.`)
    }
    const shrunk = await Promise.all(picked.slice(0, Math.max(room, 0)).map(shrinkPhoto))
    let total = photos.reduce((sum, photo) => sum + photo.file.size, 0)
    const accepted: Photo[] = []
    for (const file of shrunk) {
      if (total + file.size > MAX_PHOTOS_TOTAL_BYTES) {
        setPhotoError("Photos are too large. Attach fewer or smaller photos (4 MB in total).")
        break
      }
      total += file.size
      accepted.push({ file, url: URL.createObjectURL(file) })
    }
    setPhotos((current) => [...current, ...accepted])
  }

  function removePhoto(index: number) {
    setPhotos((current) => {
      URL.revokeObjectURL(current[index].url)
      return current.filter((_, i) => i !== index)
    })
    setPhotoError(null)
  }

  // Preselect the service when arriving from a service page (/contact?service=slug).
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service")
    if (service && services.some((item) => item.value === service)) {
      setValues((current) => ({ ...current, service }))
    }
  }, [])

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSent(false)
    setSubmitError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateForm(values)
    setErrors(nextErrors)
    setSubmitError(null)
    if (Object.keys(nextErrors).length > 0) {
      setSent(false)
      return
    }

    const body = new FormData()
    for (const [field, value] of Object.entries(values)) body.append(field, value)
    body.append("website", String(new FormData(event.currentTarget).get("website") ?? ""))
    for (const photo of photos) body.append("photos", photo.file)

    setSending(true)
    setSent(false)
    try {
      const response = await fetch("/api/contact", { method: "POST", body })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (data.errors) setErrors(data.errors)
        setSubmitError(
          data.errors
            ? "Please check the highlighted fields."
            : response.status === 400 && data.error
              ? data.error
              : "Something went wrong. Please try again or email us at sales@seafixengineering.com.",
        )
        return
      }

      setSent(true)
      setValues(emptyForm)
      photos.forEach((photo) => URL.revokeObjectURL(photo.url))
      setPhotos([])
      setPhotoError(null)
      setFormKey((key) => key + 1)
    } catch {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-32 bg-[#0D1526]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="border-primary text-primary bg-primary/10 text-xs tracking-wider mb-4"
            >
              GET IN TOUCH
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Request a <span className="text-primary">Free Quote</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Our team is available 24/7 to support your vessel anywhere in the
              world.
            </p>

            {sent && (
              <div
                role="status"
                className="mb-4 flex items-start gap-3 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-white"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Message sent</p>
                  <p className="text-sm text-muted-foreground">
                    Thank you. Our team will get back to you shortly.
                  </p>
                </div>
              </div>
            )}
            {submitError && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-white"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field for spam bots — hidden from real visitors */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Full Name *"
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className={fieldClass(Boolean(errors.name))}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="Email Address *"
                    value={values.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={fieldClass(Boolean(errors.email))}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="Phone Number"
                    value={values.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className={fieldClass(Boolean(errors.phone))}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Select
                    key={formKey}
                    value={values.service || undefined}
                    onValueChange={(value) => updateField("service", value)}
                  >
                    <SelectTrigger
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "service-error" : undefined}
                      className={`w-full focus:border-primary h-12 ${
                        errors.service
                          ? "bg-card border-red-500 text-white"
                          : values.service
                            ? "bg-card border-border text-white"
                            : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      <SelectValue placeholder="Service Required *" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {services.map((service) => (
                        <SelectItem
                          key={service.value}
                          value={service.value}
                          className="text-white hover:bg-primary/20"
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p id="service-error" className="mt-1.5 text-sm text-red-400">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              <Input
                name="vessel"
                placeholder="Vessel Type"
                value={values.vessel}
                onChange={(event) => updateField("vessel", event.target.value)}
                className="bg-card border-border text-white placeholder:text-muted-foreground focus:border-primary h-12"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="port"
                  placeholder="Port / Vessel Location"
                  value={values.port}
                  onChange={(event) => updateField("port", event.target.value)}
                  className="bg-card border-border text-white placeholder:text-muted-foreground focus:border-primary h-12"
                />
                <Input
                  name="eta"
                  placeholder="Vessel ETA (e.g. 20 Oct, 08:00)"
                  value={values.eta}
                  onChange={(event) => updateField("eta", event.target.value)}
                  className="bg-card border-border text-white placeholder:text-muted-foreground focus:border-primary h-12"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Message *"
                  rows={4}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className={`bg-card text-white placeholder:text-muted-foreground resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  ref={photoInput}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={addPhotos}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => photoInput.current?.click()}
                  disabled={photos.length >= MAX_PHOTOS}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-card px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ImagePlus className="h-5 w-5 text-primary" />
                  Attach photos of the damage (optional, up to {MAX_PHOTOS})
                </button>
                {photos.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {photos.map((photo, index) => (
                      <li key={photo.url} className="relative">
                        <img
                          src={photo.url}
                          alt={`Attached photo ${index + 1}`}
                          className="h-20 w-20 rounded-md border border-border object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          aria-label={`Remove photo ${index + 1}`}
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A0E1A] border border-border text-white hover:bg-red-500"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {photoError && <p className="mt-1.5 text-sm text-red-400">{photoError}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full bg-primary hover:bg-[#1D4ED8] text-white font-semibold"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border gap-0 py-0 overflow-hidden divide-y divide-border">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/5"
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-muted-foreground text-sm">
                      {info.title}
                      {info.note && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          {info.note}
                        </span>
                      )}
                    </p>
                    <p className="text-white font-semibold wrap-anywhere">{info.value}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              ))}
            </Card>

            {/* Office map */}
            <Card className="bg-card border-border gap-0 py-0 overflow-hidden">
              <iframe
                title="SeaFix Engineering office on the map"
                src={mapEmbedUrl}
                className="block w-full h-[260px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 min-w-0">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-white font-semibold">Dubai Office</p>
                    <p className="text-sm text-muted-foreground">{officeAddress}</p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="h-4 w-4" />
                    Directions
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
