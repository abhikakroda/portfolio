import { EyeIcon } from "lucide-react"

import { USER } from "@/features/portfolio/data/user"

import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom border-x border-line">
      <div className="flex flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-10 sm:py-8">
        <div className="shrink-0 rounded-[1.2rem] border border-line/80 p-1 sm:rounded-[1.5rem]">
          <img
            className="size-20 rounded-[0.9rem] object-cover select-none sm:size-36 sm:rounded-[1.2rem]"
            alt="Avatar"
            src={USER.avatar}
            fetchPriority="high"
          />
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="text-muted-foreground">
              <span className="inline-block size-3 rounded-full border border-current align-middle" />
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <EyeIcon className="size-4" />
              <span className="font-mono text-xs sm:text-sm">11,631</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <h1 className="font-pixel-square text-[1.35rem] leading-[0.95] text-foreground sm:text-[1.95rem] md:text-[2.15rem]">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none sm:size-5"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                className="translate-y-0.5"
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <p className="pt-2 font-pixel-square text-[13px] text-muted-foreground sm:pt-3 sm:text-[0.95rem]">
            Always Learning
          </p>

          <div className="pt-1.5 font-pixel-square text-[10px] leading-snug text-muted-foreground sm:pt-2 sm:text-[13px]">
            <span className="mr-2 inline-block size-2 rounded-full bg-zinc-300 align-middle dark:bg-zinc-600" />
            <span>Idle</span>
            <span className="px-2">·</span>
            <span>Currently sleeping</span>
          </div>
        </div>
      </div>
    </div>
  )
}
