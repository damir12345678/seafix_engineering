export const services = [
  { value: "engine-repair", label: "Engine Repair" },
  { value: "shaft-line", label: "Shaft Line" },
  { value: "ballast-tank", label: "Ballast Tank Coating" },
  { value: "welding", label: "Welding" },
  { value: "other", label: "Other" },
]

export const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  vessel: "",
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
  message: 5000,
}

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
