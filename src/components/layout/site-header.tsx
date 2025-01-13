import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/layout/user-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href="/cart"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Carrinho
            </Link>

            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Cadastre-se
            </Link>
          </nav>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
