import { Settings, Zap, Radar, Compass, Droplets, Flame, type LucideIcon } from "lucide-react"

export type Service = {
  slug: string
  title: string
  short: string
  intro: string
  image: string
  icon: LucideIcon
  highlights: string[]
  extra?: {
    title: string
    text: string
    items: string[]
  }
}

export const serviceList: Service[] = [
  {
    slug: "engine-repair",
    title: "Engine Repair & Overhaul",
    short:
      "2-stroke and 4-stroke engines, auxiliary engines, turbochargers and engine components.",
    intro:
      "Our engineers overhaul and repair main and auxiliary engines on board and in the workshop. We plan the work around your schedule so the vessel is back in service as soon as possible.",
    image:
      "/images/service-engine-repair.jpg",
    icon: Settings,
    highlights: [
      "Main engine overhauls for 2-stroke and 4-stroke engines",
      "Auxiliary engines and generator sets",
      "Turbocharger inspection, overhaul and balancing",
      "Fuel injection pumps and injectors",
      "Cylinder heads, liners, pistons and bearings",
      "Crankshaft deflection checks and running-hour based maintenance",
    ],
  },
  {
    slug: "marine-electrical",
    title: "Marine Electrical Services",
    short:
      "Fly electricians, electrical troubleshooting, switchboards, motors and automation.",
    intro:
      "From a single fault to a full system upgrade, we find and fix electrical problems on board. Our electricians work with switchboards, motors, generators and automation systems on all vessel types.",
    image:
      "/images/service-marine-electrical.jpg",
    icon: Zap,
    highlights: [
      "Electrical troubleshooting and fault finding",
      "Main and emergency switchboards",
      "Electric motors, starters and drives",
      "Generators, AVRs and power management systems",
      "Automation, alarm and monitoring systems",
      "Cabling, insulation testing and lighting",
    ],
    extra: {
      title: "Fly Electrician Services",
      text: "Need an electrician on board fast? We send a qualified marine electrician to your vessel in port or at anchorage to find and fix the fault, with as little impact on your schedule as possible.",
      items: [
        "Fast attendance in port or at anchorage",
        "Onboard electrical troubleshooting & repair",
        "Riding electricians for work during the voyage",
        "Service report after every attendance",
      ],
    },
  },
  {
    slug: "navigation-bridge",
    title: "Navigation & Bridge Equipment",
    short:
      "ECDIS, radar, gyro compass, autopilot, AIS, GNSS and other navigation systems.",
    intro:
      "We install, repair and maintain navigation and bridge equipment so your vessel stays safe and compliant. Our technicians troubleshoot faults on board and support you before surveys and inspections.",
    image:
      "/images/service-navigation-bridge.jpg",
    icon: Radar,
    highlights: [
      "ECDIS installation, updates and troubleshooting",
      "X-band and S-band radar",
      "Gyro compass and autopilot",
      "AIS, GNSS / GPS and VDR",
      "Echo sounder, speed log and BNWAS",
      "Pre-survey checks of bridge equipment",
    ],
  },
  {
    slug: "shaft-line",
    title: "Shaft Line Services",
    short: "Shaft alignment, inspections, measurements and stern tube services.",
    intro:
      "Shaft line problems cause vibration, bearing wear and leaks. We measure, align and repair propeller shaft lines and stern tubes and give you a clear report of the condition.",
    image:
      "/images/service-shaft-line.jpg",
    icon: Compass,
    highlights: [
      "Shaft alignment checks and corrections",
      "Bearing clearance and weardown measurements",
      "Stern tube seals and bearings",
      "Intermediate shaft bearings",
      "Propeller removal and refitting",
      "Inspection reports with measurements",
    ],
  },
  {
    slug: "ballast-tank",
    title: "Ballast Tank Coating",
    short: "Surface preparation, coating application and corrosion protection.",
    intro:
      "Corrosion in ballast tanks is expensive to fix late. Our coating teams prepare surfaces and apply coatings to the manufacturer's specification, during voyage or in dock.",
    image:
      "/images/service-ballast-tank.jpg",
    icon: Droplets,
    highlights: [
      "Surface preparation: blasting and mechanical cleaning",
      "Coating application to manufacturer specification",
      "Touch-up repairs and full recoating",
      "Coating thickness and quality inspections",
      "Corrosion protection and anode renewal",
      "Work reports with photos",
    ],
  },
  {
    slug: "welding",
    title: "Welding & Steel Repairs",
    short:
      "Onboard and workshop welding, hull repairs, structural steelwork and pipe repairs.",
    intro:
      "Our welders repair hulls, structures and pipework on board and in the workshop. We work together with class surveyors when the repair requires it.",
    image:
      "/images/service-welding.jpg",
    icon: Flame,
    highlights: [
      "Onboard and workshop welding",
      "Hull repairs and plate renewal",
      "Structural steelwork: frames, brackets, hatch covers",
      "Pipe repairs and fabrication",
      "Cropping and renewal of wasted steel",
      "Repairs in cooperation with class surveyors",
    ],
  },
]

export function getService(slug: string) {
  return serviceList.find((service) => service.slug === slug)
}
