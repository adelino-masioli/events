import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://decidedigital.com.br"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Decide Digital
            </a>
            . All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms">
            <Button variant="ghost" size="sm">
              Terms
            </Button>
          </Link>
          <Link href="/privacy">
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
