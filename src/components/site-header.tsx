import dynamic from "next/dynamic"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { MOBILE_NAV } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
)

export function SiteHeader() {
  const initials =
    `${USER.firstName[0] ?? ""}${USER.lastName[0] ?? ""}`.toUpperCase()

  return (
    <>
      <header className="sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2">
        <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-3 border-x border-line px-3 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:transition-[background-color] sm:px-4 md:max-w-3xl">
          <Link
            href="/"
            className="min-w-14 font-pixel-square text-xl leading-none text-foreground sm:min-w-24 sm:text-2xl"
          >
            {initials}
          </Link>

          <div className="ml-auto flex items-center">
            <ThemeToggle />
          </div>

          <div className="absolute top-[-3.5px] left-[-4.5px] z-2 flex size-2 border border-line bg-background" />
          <div className="absolute top-[-3.5px] right-[-4.5px] z-2 flex size-2 border border-line bg-background" />
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[calc(--spacing(16)+env(safe-area-inset-bottom,0px))] bg-linear-to-t from-background from-[calc(env(safe-area-inset-bottom,0%))] to-transparent sm:hidden" />
      <div className="fixed bottom-[calc(--spacing(2)+env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex w-fit -translate-x-1/2 items-center rounded-xl bg-popover p-1 shadow-md ring ring-foreground/10 sm:hidden dark:ring-foreground/20">
        <MobileNav items={MOBILE_NAV} />
      </div>
    </>
  )
}
