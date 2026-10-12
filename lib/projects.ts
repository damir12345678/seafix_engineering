export type Project = {
  slug: string
  title: string
  vessel: string
  location: string
  service: string
  duration: string
  year: string
  image: string
  summary: string
  challenge: string
  work: string[]
  results: string[]
  facts: { label: string; value: string }[]
}

export const projectList: Project[] = [
  {
    slug: "main-engine-overhaul-bulk-carrier",
    title: "Main Engine Overhaul",
    vessel: "82,000 DWT Bulk Carrier",
    location: "Jebel Ali, Dubai",
    service: "engine-repair",
    duration: "9 days",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1569875875269-6943dc3154c4?q=80&w=1470&auto=format&fit=crop",
    summary:
      "Overhaul of three units and the turbocharger on a 2-stroke main engine during a planned port stay.",
    challenge:
      "The crew reported high exhaust temperatures and blow-by on units 2, 4 and 5. The owner had a fixed loading window, so the work had to be finished before the next charter.",
    work: [
      "Pulled pistons on three units and replaced rings and liners",
      "Overhauled cylinder covers and exhaust valves",
      "Cleaned and balanced the turbocharger rotor",
      "Calibrated fuel injectors and checked fuel pump timing",
      "Took crankshaft deflection readings before and after the work",
    ],
    results: [
      "Exhaust temperatures back within the maker's limits",
      "Vessel sailed on schedule for the next charter",
      "Full report with measurements handed to the superintendent",
    ],
    facts: [
      { label: "Engine", value: "2-stroke, 6 cylinders" },
      { label: "Team", value: "6 engineers" },
      { label: "Downtime", value: "9 days" },
    ],
  },
  {
    slug: "blackout-recovery-tanker",
    title: "Blackout Recovery at Anchorage",
    vessel: "Product Tanker",
    location: "Fujairah Anchorage, UAE",
    service: "marine-electrical",
    duration: "36 hours",
    year: "2026",
    image:
      "/images/project-blackout-recovery.jpg",
    summary:
      "Fly electrician attendance to find and fix the cause of repeated blackouts on the main switchboard.",
    challenge:
      "The tanker had three blackouts in two days while waiting at anchorage. Generators tripped under load and the crew could not find the cause.",
    work: [
      "Boarded the vessel by launch within 12 hours of the call",
      "Tested the AVRs and governor response of all generators",
      "Found a faulty reverse power relay and a loose busbar connection",
      "Replaced the relay and re-tightened and checked the switchboard connections",
      "Ran load tests with the generators in parallel",
    ],
    results: [
      "No blackouts after the repair",
      "Vessel cleared to berth as planned",
      "Recommendations for the next planned maintenance",
    ],
    facts: [
      { label: "Response", value: "Under 12 hours" },
      { label: "Team", value: "2 electricians" },
      { label: "On board", value: "36 hours" },
    ],
  },
  {
    slug: "ecdis-radar-upgrade-container-ship",
    title: "ECDIS & Radar Upgrade",
    vessel: "4,500 TEU Container Ship",
    location: "Khalifa Port, Abu Dhabi",
    service: "navigation-bridge",
    duration: "4 days",
    year: "2026",
    image:
      "/images/project-ecdis-radar.jpg",
    summary:
      "Replacement of two ECDIS units and the X-band radar during cargo operations.",
    challenge:
      "The bridge equipment was out of date and the X-band radar kept losing the picture. The work had to fit into the vessel's normal port call.",
    work: [
      "Installed two new ECDIS workstations and connected the sensors",
      "Replaced the X-band radar transceiver and display",
      "Connected gyro, GNSS, AIS and speed log to the new equipment",
      "Tested all alarms and BNWAS integration",
      "Trained the officers on the new systems",
    ],
    results: [
      "All work done during cargo operations, no extra port days",
      "Equipment ready for the flag state inspection",
      "Commissioning report and as-built drawings provided",
    ],
    facts: [
      { label: "Systems", value: "2 × ECDIS, 1 × radar" },
      { label: "Team", value: "3 technicians" },
      { label: "Port days", value: "0 extra" },
    ],
  },
  {
    slug: "shaft-line-alignment-container-ship",
    title: "Shaft Line Alignment",
    vessel: "Feeder Container Ship",
    location: "Drydocks World, Dubai",
    service: "shaft-line",
    duration: "6 days",
    year: "2025",
    image:
      "/images/project-shaft-line.jpg",
    summary:
      "Shaft line alignment and stern tube seal renewal during a scheduled dry docking.",
    challenge:
      "The vessel had vibration at service speed and an oil leak at the aft stern tube seal.",
    work: [
      "Measured bearing clearances and stern tube weardown",
      "Checked and corrected the shaft alignment",
      "Removed and refitted the propeller",
      "Renewed the aft and forward stern tube seals",
      "Pressure-tested the seals before undocking",
    ],
    results: [
      "Vibration at service speed reduced",
      "No oil leak after undocking",
      "Alignment report accepted by the class surveyor",
    ],
    facts: [
      { label: "Shaft length", value: "28 m" },
      { label: "Team", value: "5 specialists" },
      { label: "Duration", value: "6 days" },
    ],
  },
  {
    slug: "ballast-tank-recoating-tanker",
    title: "Ballast Tank Recoating",
    vessel: "Aframax Oil Tanker",
    location: "Sohar, Oman",
    service: "ballast-tank",
    duration: "18 days",
    year: "2025",
    image:
      "/images/project-ballast-recoating.jpg",
    summary:
      "Blasting and full recoating of four ballast tanks with a riding team during the voyage and in port.",
    challenge:
      "The last inspection showed coating breakdown and pitting in four ballast tanks. The owner wanted to avoid an extra dry docking.",
    work: [
      "Ventilated and gas-freed the tanks and set up safe access",
      "Blasted the surfaces to the required standard",
      "Applied a two-coat epoxy system to the maker's specification",
      "Measured dry film thickness and recorded it for each tank",
      "Renewed sacrificial anodes",
    ],
    results: [
      "Four tanks recoated without dry docking",
      "Coating records ready for the next class survey",
      "Photo report of every stage of the work",
    ],
    facts: [
      { label: "Tanks", value: "4" },
      { label: "Area", value: "≈ 6,000 m²" },
      { label: "Team", value: "10 painters" },
    ],
  },
  {
    slug: "hull-steel-renewal-general-cargo",
    title: "Hull Steel Renewal",
    vessel: "General Cargo Vessel",
    location: "Port Rashid, Dubai",
    service: "welding",
    duration: "7 days",
    year: "2025",
    image:
      "/images/project-hull-steel.jpg",
    summary:
      "Cropping and renewal of wasted side shell plating and internal frames after a class survey.",
    challenge:
      "The class surveyor found wasted plating and frames in the forward hold. The vessel needed the repair to keep its class certificate.",
    work: [
      "Took thickness readings and marked the areas to renew",
      "Cropped wasted plating and frames",
      "Fitted and welded new steel in the workshop and on board",
      "Carried out NDT on the welds",
      "Painted the new steel to match the existing coating",
    ],
    results: [
      "Repair accepted by the class surveyor",
      "Class condition removed",
      "Vessel returned to service on time",
    ],
    facts: [
      { label: "Steel renewed", value: "≈ 12 t" },
      { label: "Team", value: "8 welders" },
      { label: "Duration", value: "7 days" },
    ],
  },
]

export function getProject(slug: string) {
  return projectList.find((project) => project.slug === slug)
}
