import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"

import { Markdown } from "@/components/markdown"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

import type { Experience } from "../../types/experiences"

export function ExperienceItem({ experience }: { experience: Experience }) {
  const primaryPosition = experience.positions[0]

  if (!primaryPosition) {
    return null
  }

  return (
    <details
      id={`experience-${experience.id}`}
      className="group screen-line-bottom scroll-mt-14"
    >
      <summary
        className={cn(
          "grid w-full cursor-pointer list-none gap-3 px-4 py-3.5 text-left marker:hidden",
          "sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6",
          "transition-colors outline-none hover:bg-accent-muted/40",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
        )}
      >
        <div className="flex min-w-0 items-start gap-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-muted-foreground/20 bg-background text-muted-foreground ring-1 ring-line ring-offset-2 ring-offset-background select-none [&_svg]:size-5">
            {experience.companyLogo ? (
              <Image
                src={experience.companyLogo}
                alt={`${experience.companyName} logo`}
                width={48}
                height={48}
                quality={100}
                className="size-7 rounded-md object-contain"
                unoptimized
                aria-hidden
              />
            ) : (
              (primaryPosition.icon ?? (
                <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              ))
            )}
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <h3 className="min-w-0 text-base leading-snug font-medium">
                {experience.companyWebsite ? (
                  <a
                    className="underline-offset-4 hover:underline"
                    href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                  >
                    {experience.displayName ?? experience.companyName}
                  </a>
                ) : (
                  (experience.displayName ?? experience.companyName)
                )}
              </h3>

              {experience.isCurrentEmployer && (
                <span className="relative flex items-center justify-center">
                  <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-info" />
                  <span className="sr-only">Current Employer</span>
                </span>
              )}

              {primaryPosition.employmentType && (
                <span className="inline-flex h-5 items-center rounded-md border border-muted-foreground/25 px-1.5 text-xs leading-none font-medium text-muted-foreground">
                  {primaryPosition.employmentType}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              {primaryPosition.title}
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 sm:justify-end">
          <div className="space-y-1 text-left text-sm leading-snug sm:text-right">
            <p className="font-medium text-foreground">
              {primaryPosition.employmentPeriod.start} -{" "}
              {primaryPosition.employmentPeriod.end ?? "Present"}
            </p>
            {primaryPosition.location && (
              <p className="text-muted-foreground">
                {primaryPosition.location}
              </p>
            )}
          </div>

          <div className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
            <ChevronDownIcon className="size-4" />
          </div>
        </div>
      </summary>

      <div className="px-4 pb-4 pl-19">
        {primaryPosition.description && (
          <ProseMono>
            <Markdown>{primaryPosition.description}</Markdown>
          </ProseMono>
        )}

        {Array.isArray(primaryPosition.skills) &&
          primaryPosition.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 pt-3">
              {primaryPosition.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
      </div>
    </details>
  )
}
