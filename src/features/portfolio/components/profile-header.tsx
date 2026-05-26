import { USER } from "@/features/portfolio/data/user"

import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="glass-sheen screen-line-bottom relative border-x border-line">
      <div className="flex flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-10 sm:py-8">
        <div className="glass-surface relative shrink-0 rounded-[1.2rem] border p-1 sm:rounded-[1.5rem]">
          <img
            className="size-20 rounded-[0.9rem] object-cover select-none sm:size-36 sm:rounded-[1.2rem]"
            alt="Avatar"
            src={USER.avatar}
            fetchPriority="high"
          />
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <h1 className="font-pixel-square text-[1.35rem] leading-[0.95] text-foreground sm:text-[1.95rem] md:text-[2.15rem]">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none sm:size-5"
              aria-label="Verified"
            />
          </div>

          <p className="pt-2 font-pixel-square text-[13px] text-muted-foreground sm:pt-3 sm:text-[0.95rem]">
            Always Learning
          </p>
        </div>
      </div>
    </div>
  )
}
