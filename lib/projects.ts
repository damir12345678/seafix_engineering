export type Project = {
  slug: string
  title: string
  vessel: string
  location: string
  service: string
  duration: string
  date: string
  image: string
  summary: string
  challenge: string
  work: string[]
  results: string[]
  facts: { label: string; value: string }[]
}

export const projectList: Project[] = [
  {
    slug: "emergency-liner-piston-replacement-bulk-carrier",
    title: "Emergency Liner & Piston Replacement",
    vessel: "82,000 DWT Bulk Carrier",
    location: "Port of Rotterdam, Netherlands",
    service: "engine-repair",
    duration: "42 hours",
    date: "October 2025",
    image: "/images/project-engine-liner.jpg",
    summary:
      "Emergency replacement of a scuffed cylinder liner and piston on unit No. 4 of a MAN B&W 6S60MC main engine.",
    challenge:
      "Unit No. 4 had a scuffed cylinder liner and burnt piston rings. Exhaust gas temperature rose above 480 °C, and the vessel risked being stopped at anchorage with an off-hire penalty from the charterer.",
    work: [
      "Lifted the cylinder cover, disconnected and pulled the piston together with the connecting rod",
      "Removed the damaged cylinder liner with a hydraulic jack",
      "Cleaned the landing surfaces in the engine block, fitted a new liner and secured it to the maker's manual",
      "Renewed piston rings and seals and fitted a calibrated fuel injector",
      "Reassembled the unit, pressure-tested the cooling circuit and ran a 4-hour load test at 85%",
    ],
    results: [
      "Exhaust temperature and scavenge air pressure back within the maker's limits",
      "Chief engineer and surveyor signed the acceptance report with no remarks",
      "Vessel left on charter on schedule, with zero hours of downtime beyond the port stay",
    ],
    facts: [
      { label: "Engine", value: "MAN B&W 6S60MC" },
      { label: "Ring gap", value: "3.8 mm" },
      { label: "Team", value: "3 engineers" },
      { label: "Completed in", value: "42 hours" },
    ],
  },
  {
    slug: "insulation-fault-switchboard-breaker-container-ship",
    title: "Insulation Fault Tracing & Switchboard Breaker Replacement",
    vessel: "4,500 TEU Container Ship",
    location: "Singapore Anchorage",
    service: "marine-electrical",
    duration: "28 hours",
    date: "December 2025",
    image: "/images/project-ecdis-radar.jpg",
    summary:
      "Traced a 440 V insulation fault to the bow thruster cable and replaced a burnt main switchboard breaker.",
    challenge:
      "Insulation resistance on the 440 V busbar dropped to 0.02 MΩ, and generator No. 2 kept shedding its load without warning.",
    work: [
      "Ran section-by-section megger tests and found a breakdown in the bow thruster power cable",
      "Opened the cable route, cut out the damaged section and fitted a heat-shrink joint",
      "Removed the burnt Schneider Masterpact air circuit breaker on the generator section",
      "Installed a new breaker, set the trip unit and checked the PMS logic",
      "Synchronised all three generators and tested emergency load shedding",
    ],
    results: [
      "Insulation resistance raised from 0.02 MΩ to over 100 MΩ",
      "Power management works normally in all operating modes",
      "DNV surveyor closed the finding at first presentation",
    ],
    facts: [
      { label: "Network", value: "440 V / 60 Hz" },
      { label: "Breaker rating", value: "2,500 A" },
      { label: "On board in", value: "3 hours" },
      { label: "Team", value: "2 engineers" },
    ],
  },
  {
    slug: "radar-transceiver-vdr-test-oil-tanker",
    title: "X-Band Radar Repair & VDR Annual Performance Test",
    vessel: "115,000 DWT Crude Oil Tanker",
    location: "Port of Antwerp, Belgium",
    service: "navigation-bridge",
    duration: "14 hours",
    date: "January 2026",
    image: "/images/service-navigation-bridge.jpg",
    summary:
      "Restored a failed Furuno FAR-3220 radar and completed the overdue VDR annual performance test before a Port State Control inspection.",
    challenge:
      "The Furuno FAR-3220 radar showed no echoes on the long ranges, and the VDR annual performance test was overdue right before a Port State Control inspection.",
    work: [
      "Climbed the mast, opened the scanner unit and found a worn-out magnetron and a faulty circulator",
      "Replaced the magnetron, the transceiver module and the antenna drive belt",
      "Aligned heading zero and synchronised the radar with the gyro compass and speed log",
      "Ran the VDR annual test and downloaded test recordings from all microphones and VHF channels",
      "Replaced the PT9 Ninety underwater locator beacon and the capsule's backup battery",
    ],
    results: [
      "Clear target picture on ranges up to 48 NM",
      "Certificate of Compliance (CoC) issued in the format accepted by class",
      "Port State Control inspection passed with no deficiencies",
    ],
    facts: [
      { label: "Transmitter", value: "25 kW" },
      { label: "Audio channels recorded", value: "100%" },
      { label: "Team", value: "2 radio engineers" },
      { label: "Completed in", value: "14 hours" },
    ],
  },
  {
    slug: "stern-tube-seal-shaft-alignment-cargo-ship",
    title: "Stern Tube Seal Renewal & Laser Shaft Alignment",
    vessel: "12,000 DWT Multipurpose Cargo Ship",
    location: "Dry Dock, Tuzla, Türkiye",
    service: "shaft-line",
    duration: "4 days",
    date: "November 2025",
    image: "/images/project-shaft-line.jpg",
    summary:
      "Stopped a stern tube oil leak and removed shaft line vibration without withdrawing the propeller shaft.",
    challenge:
      "Stern tube oil was leaking to sea through the aft Simplex seal, and the intermediate shaft bearing had high vibration above 70% of engine speed.",
    work: [
      "Dismantled the aft seal and measured wear on the chrome liner",
      "Fitted a new set of FKM lip seals without withdrawing the propeller shaft",
      "Opened the coupling halves and laser-aligned the intermediate shaft to the main engine flywheel",
      "Replaced deformed shims under the thrust bearing feet and brought gap and offset to zero",
      "Reassembled the seal housing and pressure-tested it at 2.5 bar for 4 hours",
    ],
    results: [
      "Oil leak fully stopped, with no level drop in the gravity tank",
      "Shaft line vibration reduced to ISO 10816 limits (below 1.8 mm/s)",
      "Pressure test accepted by the Lloyd's Register surveyor",
    ],
    facts: [
      { label: "Shaft diameter", value: "380 mm" },
      { label: "Misalignment", value: "0.38 → 0.03 mm" },
      { label: "Test pressure", value: "2.5 bar" },
      { label: "Team", value: "3 specialists" },
    ],
  },
  {
    slug: "ballast-tank-blasting-recoating-product-tanker",
    title: "Ballast Tank Blasting & Recoating",
    vessel: "50,000 DWT Product Tanker",
    location: "Shipyard, Gdańsk, Poland",
    service: "ballast-tank",
    duration: "5 days",
    date: "August 2025",
    image: "/images/project-ballast-recoating.jpg",
    summary:
      "Blasted and recoated the bottom structure of water ballast tank No. 2 so the vessel could pass its SIRE vetting inspection.",
    challenge:
      "Old epoxy coating had peeled off on 30% of the tank structure, with pitting corrosion underneath. Because of this the vessel could not pass its SIRE vetting inspection.",
    work: [
      "Set up explosion-proof ventilation, pumped out sludge and cleaned deposits",
      "Took ultrasonic thickness measurements (UTM) of floors and stringers",
      "Blasted damaged areas with copper slag to Sa 2.5 with a 75 µm surface profile",
      "Removed dust and applied two coats of high-build epoxy",
      "Measured dry film thickness (DFT) and holiday-tested the whole area with a spark tester",
    ],
    results: [
      "All corrosion removed and the steel protected by a 5-year coating system",
      "Holiday test showed zero defects over the whole area",
      "SIRE finding closed and the tank accepted by the superintendent",
    ],
    facts: [
      { label: "Area treated", value: "380 m²" },
      { label: "Average DFT", value: "340 µm" },
      { label: "Holidays at 3 kV", value: "0" },
      { label: "Team", value: "5 incl. FROSIO Level 3 inspector" },
    ],
  },
  {
    slug: "bow-shell-plate-frame-renewal-tug",
    title: "Bow Shell Plate & Frame Renewal",
    vessel: "Ocean Tug, 70 t Bollard Pull",
    location: "Port of Klaipėda, Lithuania",
    service: "welding",
    duration: "48 hours",
    date: "February 2026",
    image: "/images/project-hull-steel.jpg",
    summary:
      "Renewed a dented and cracked side shell plate and two frames after the tug hit a quay in a storm.",
    challenge:
      "After contact with a quay in stormy weather, the side shell above the waterline had a 90 mm deep dent and a 400 mm long crack.",
    work: [
      "Cut out the damaged shell plate and two deformed frames",
      "Made and fitted inserts from 14 mm Grade A ship steel with 60° bevelled edges",
      "Tack-welded the structure with strict control of hull lines and gaps",
      "Welded butt and fillet joints by FCAW with flux-cored wire in three passes",
      "Carried out 100% visual inspection and ultrasonic testing (UT) of all welds",
    ],
    results: [
      "Hull shape and frame strength restored to the original design",
      "No porosity, slag inclusions or lack of fusion found in the welds",
      "Class surveyor signed the survey report with no operating restrictions",
    ],
    facts: [
      { label: "Steel renewed", value: "1.9 t" },
      { label: "Weld length", value: "22 m" },
      { label: "UT coverage", value: "100%, no defects" },
      { label: "Team", value: "4 incl. 6GR welders" },
    ],
  },
]

export function getProject(slug: string) {
  return projectList.find((project) => project.slug === slug)
}
