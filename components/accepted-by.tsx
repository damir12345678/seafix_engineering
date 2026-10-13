const authorities = [
  "DNV",
  "Lloyd's Register (LR)",
  "ABS",
  "Bureau Veritas (BV)",
  "ClassNK",
  "RINA",
  "Paris MoU",
  "Tokyo MoU",
  "OCIMF / SIRE 2.0",
  "Flag Administrations",
]

export function AcceptedBy() {
  return (
    <section className="py-12 bg-[#0A0E1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Our work has been accepted by
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {authorities.map((name) => (
            <li
              key={name}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-white/90"
            >
              {name}
            </li>
          ))}
          <li className="px-2 py-2 text-sm text-muted-foreground">and others</li>
        </ul>
      </div>
    </section>
  )
}
