import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">Dionor</span>
      </Link>
      <nav
        className={cn("flex items-center space-x-6 text-sm font-medium", className)}
        {...props}
      >
        <Link
          href="/events"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Eventos
        </Link>
        <Link
          href="/about"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Sobre
        </Link>
        <Link
          href="/contact"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Contato
        </Link>
      </nav>
    </div>
  )
}
