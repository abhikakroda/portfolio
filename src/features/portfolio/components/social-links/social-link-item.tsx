"use client"

import Image from "next/image"

import { UTM_PARAMS } from "@/config/site"
import type { SocialLink } from "@/features/portfolio/types/social-links"
import { triggerHaptic } from "@/lib/haptics"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

export function SocialLinkItem({ icon, title, href }: SocialLink) {
  return (
    <a
      className={cn(
        "glass-surface glass-sheen motion-surface motion-press group inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-[0.9rem] border px-3 text-foreground hover:-translate-y-0.5 sm:h-12 sm:w-auto sm:justify-start sm:gap-3 sm:rounded-[1rem] sm:px-4.5 dark:hover:bg-white/[0.03]"
      )}
      href={addQueryParams(href, UTM_PARAMS)}
      onPointerDown={() => triggerHaptic()}
      target="_blank"
      rel="noopener"
    >
      <div className="relative h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5">
        <Image
          className="select-none"
          src={icon}
          alt={title}
          width={20}
          height={20}
          quality={100}
          unoptimized
        />
      </div>

      <span className="text-[15px] font-medium tracking-tight whitespace-nowrap sm:text-base">
        {title}
      </span>
    </a>
  )
}
