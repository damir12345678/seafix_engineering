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
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState, type FormEvent } from "react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+30 69 830 12 050",
    href: "tel:+306983012050",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@seafix.com",
    href: "mailto:info@seafix.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Athens, Greece",
    href: "https://www.google.com/maps/search/?api=1&query=Athens%2C+Greece",
    external: true,
  },
  {
    icon: Clock,
    title: "24/7 Emergency",
    value: "Always Available",
    href: "tel:+306983012050",
  },
]

const services = [
  { value: "engine-repair", label: "Engine Repair" },
  { value: "shaft-line", label: "Shaft Line" },
  { value: "ballast-tank", label: "Ballast Tank Coating" },
  { value: "welding", label: "Welding" },
  { value: "other", label: "Other" },
]

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  vessel: "",
  message: "",
}

type FormValues = typeof emptyForm
type FormErrors = Partial<Record<keyof FormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+\d][\d\s()-]{6,}$/

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = "Enter your full name."
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters."
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address."
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address."
  }

  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number."
  }

  if (!values.service) {
    errors.service = "Select a service."
  }

  if (!values.message.trim()) {
    errors.message = "Enter a message."
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters."
  }

  return errors
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
  const [formKey, setFormKey] = useState(0)

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSent(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSent(false)
      return
    }

    setSending(true)
    setSent(false)
    window.setTimeout(() => {
      setSending(false)
      setSent(true)
      setValues(emptyForm)
      setFormKey((key) => key + 1)
    }, 1400)
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
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={"external" in info && info.external ? "_blank" : undefined}
                rel={"external" in info && info.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary/50 p-6 flex items-center gap-4 transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">
                      {info.title}
                    </p>
                    <p className="text-white font-semibold">{info.value}</p>
                  </div>
                </Card>
              </motion.a>
            ))}

            {/* Map Placeholder */}
            <Card className="bg-card border-border overflow-hidden h-[200px] relative">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-white font-medium">
                  Athens, Greece
                </span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
