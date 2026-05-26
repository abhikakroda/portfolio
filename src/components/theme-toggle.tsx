"use client"

import { useTheme } from "next-themes"
import { useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { META_THEME_COLORS } from "@/config/site"
import { useMetaColor } from "@/hooks/use-meta-color"
import { useSound } from "@/hooks/use-sound"
import { SOUNDS } from "@/lib/sounds"

import { MoonIcon } from "./animated-icons/moon"
import { SunMediumIcon } from "./animated-icons/sun-medium"
import { Tooltip, TooltipContent, TooltipTrigger } from "./base/ui/tooltip"
import { Button } from "./ui/button"
import { Kbd } from "./ui/kbd"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const { setMetaColor } = useMetaColor()
  const playClick = useSound(SOUNDS.click)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const switchTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = resolvedTheme === "dark"
    const newTheme = isDark ? "light" : "dark"

    playClick(0.5)

    if (!document.startViewTransition) {
      setTheme(newTheme)
      setMetaColor(isDark ? META_THEME_COLORS.light : META_THEME_COLORS.dark)
      return
    }

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    if (e) {
      x = e.clientX
      y = e.clientY
    } else if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.remove(isDark ? "dark" : "light")
      document.documentElement.classList.add(newTheme)
      document.documentElement.style.colorScheme = newTheme
      setTheme(newTheme)
      setMetaColor(isDark ? META_THEME_COLORS.light : META_THEME_COLORS.dark)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  useHotkeys("d", () => switchTheme())

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            ref={buttonRef}
            className="border-none"
            variant="ghost"
            size="icon-sm"
            onClick={(e) => switchTheme(e)}
          >
            <MoonIcon className="relative hidden after:absolute after:-inset-2 [html.dark_&]:block" />
            <SunMediumIcon className="relative hidden after:absolute after:-inset-2 [html.light_&]:block" />
            <span className="sr-only">Theme Toggle</span>
          </Button>
        }
      />
      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
