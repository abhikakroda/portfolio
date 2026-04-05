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
        "motion-surface motion-press group inline-flex h-11 items-center gap-2.5 rounded-[0.9rem] border border-line bg-background px-4 text-foreground shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-line/80 hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)] sm:h-12 sm:gap-3 sm:rounded-[1rem] sm:px-4.5"
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
