export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-top mx-auto border-x border-line group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="screen-line-bottom flex min-h-24 items-end justify-between gap-6 px-6 py-6 sm:px-8">
          <div className="space-y-0.5 text-[11px] leading-tight text-muted-foreground sm:text-xs">
            <p>© 2026 Abhishek Meena</p>
            <p>Built with love, LLMs and Coffee</p>
          </div>

          <div className="flex items-start gap-1 text-muted-foreground">
            <span className="translate-x-3 -translate-y-2 text-[10px] leading-none opacity-70">
              z
            </span>
            <SleepingCat />
          </div>
        </div>

        <div className="screen-line-top px-6 py-7 sm:px-8">
          <div className="h-24 w-full bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[16px_16px] bg-center [--pattern-foreground:var(--color-zinc-950)]/18 dark:[--pattern-foreground:var(--color-white)]/18" />
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-16 sm:h-2" />
      </div>
    </footer>
  )
}

function SleepingCat() {
  return (
    <svg
      className="h-14 w-[4.5rem] shrink-0 sm:h-16 sm:w-20"
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path
        d="M24 14H52V18H56V22H60V34H56V42H52V46H20V42H16V26H20V18H24V14Z"
        fill="var(--background)"
        stroke="var(--foreground)"
        strokeWidth="2"
      />
      <path d="M24 14L28 8H32V14" fill="var(--background)" />
      <path d="M44 14L48 8H52V14" fill="var(--background)" />
      <path d="M24 14L28 8H32V14" stroke="var(--foreground)" strokeWidth="2" />
      <path d="M44 14L48 8H52V14" stroke="var(--foreground)" strokeWidth="2" />
      <path d="M28 26H32" stroke="var(--foreground)" strokeWidth="2" />
      <path d="M40 26H44" stroke="var(--foreground)" strokeWidth="2" />
      <path d="M34 34H40" stroke="var(--foreground)" strokeWidth="2" />
      <path
        d="M58 28H64V34H68V42H64V46H56"
        stroke="var(--foreground)"
        strokeWidth="2"
      />
      <path
        d="M20 38H12V34H8V26H12"
        stroke="var(--foreground)"
        strokeWidth="2"
      />
      <path d="M24 46V50H52V46" stroke="var(--foreground)" strokeWidth="2" />
    </svg>
  )
}
