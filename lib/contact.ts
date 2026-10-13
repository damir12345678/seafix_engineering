import { serviceList } from "@/lib/services"

export const services = [
  ...serviceList.map((service) => ({ value: service.slug, label: service.title })),
  { value: "other", label: "Other" },
]

export const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  vessel: "",
  port: "",
  eta: "",
  message: "",
}

export type FormValues = typeof emptyForm
export type FormErrors = Partial<Record<keyof FormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+\d][\d\s()-]{6,}$/

export const maxLengths: Record<keyof FormValues, number> = {
  name: 100,
  email: 200,
  phone: 40,
  service: 50,
  vessel: 100,
  port: 120,
  eta: 60,
  message: 5000,
}

// Photos attached to a request. Vercel functions accept bodies up to 4.5 MB,
// so the browser shrinks photos before upload and the total stays under 4 MB.
export const MAX_PHOTOS = 5
export const MAX_PHOTOS_TOTAL_BYTES = 4 * 1024 * 1024

export function validateForm(values: FormValues): FormErrors {
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

  if (!services.some((service) => service.value === values.service)) {
    errors.service = "Select a service."
  }

  if (!values.message.trim()) {
    errors.message = "Enter a message."
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters."
  }

  for (const field of Object.keys(maxLengths) as (keyof FormValues)[]) {
    if (!errors[field] && values[field].length > maxLengths[field]) {
      errors[field] = `Must be at most ${maxLengths[field]} characters.`
    }
  }

  return errors
}
