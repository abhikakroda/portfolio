import { cn } from "@/lib/utils"

export function ProfileCover() {
  return (
    <div
      className={cn(
        "border-x border-line select-none",
        "screen-line-top screen-line-bottom before:-top-px after:-bottom-px"
      )}
    >
      <div className="px-5 py-5 sm:px-10 sm:py-8">
        <div
          className={cn(
            "h-4 w-full sm:h-20",
            "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[16px_16px] bg-center [--pattern-foreground:var(--color-zinc-950)]/14 dark:[--pattern-foreground:var(--color-white)]/16"
          )}
        />
      </div>
    </div>
  )
}
