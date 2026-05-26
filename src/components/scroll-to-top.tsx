"use client"

import { ArrowUpIcon } from "lucide-react"
import { useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"

import { Button } from "@/components/base/ui/button"
import { cn } from "@/lib/utils"

export function ScrollToTop({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll()

  const [visible, setVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 400)

    const prev = scrollY.getPrevious() ?? 0
    const diff = latestValue - prev
    setScrollDirection(diff > 0 ? "down" : "up")
  })

  return (
    <Button
      data-visible={visible}
      data-scroll-direction={scrollDirection}
      className={cn(
        "[--bottom:1rem] lg:[--bottom:2rem]",
        "fixed right-4 bottom-[calc(var(--bottom,1rem)+env(safe-area-inset-bottom,0px))] z-50 lg:right-8",
        "size-9 rounded-lg border border-line bg-background text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground dark:bg-background dark:text-muted-foreground dark:hover:bg-muted [&_svg]:size-4 [&_svg]:stroke-2",
        "transition-[background-color,opacity,transform] duration-300 data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0 data-[visible=true]:opacity-100",
        "data-[scroll-direction=down]:hover:opacity-100",
        className
      )}
      variant="secondary"
      size="icon-sm"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      {...props}
    >
      <ArrowUpIcon className="size-4 stroke-2" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}
