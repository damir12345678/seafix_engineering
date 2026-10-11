import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/seafix-logo.png"
      alt="SeaFix Engineering"
      width={769}
      height={199}
      className={cn("h-11 w-auto", className)}
      priority={priority}
    />
  )
}
