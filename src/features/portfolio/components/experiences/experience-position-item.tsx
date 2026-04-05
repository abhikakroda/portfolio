import { BriefcaseBusinessIcon, InfinityIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Markdown } from "@/components/markdown"
import { Separator } from "@/components/ui/separator"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

import type { ExperiencePosition } from "../../types/experiences"

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  const { start, end } = position.employmentPeriod
  const isOngoing = !end

  return (
    <Collapsible
      className="relative"
      defaultOpen={position.isExpanded}
      disabled={!position.description}
    >
      <CollapsibleTrigger
        className={cn(
          "glass-surface glass-sheen motion-surface motion-press group block w-full text-left",
          "rounded-xl border px-4 py-4 hover:bg-accent-muted/80 dark:hover:bg-white/[0.03]",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
        )}
      >
        <div className="mb-1 flex items-center gap-3">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-xl",
              "bg-muted text-muted-foreground",
              "border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background",
              "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            )}
          >
            {position.icon ?? <BriefcaseBusinessIcon />}
          </div>

          <h4 className="flex-1 text-base font-medium text-balance text-foreground">
            {position.title}
          </h4>

          <div className="shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:size-4">
            <CollapsibleChevronsIcon duration={0.15} />
          </div>
        </div>

        <div className="flex items-center gap-2 pl-11 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <dl>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </dl>

              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
              />
            </>
          )}

          <dl>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5">
              <span>{start}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <>
                  <InfinityIcon className="size-4.5 translate-y-[0.5px]" />
                  <span className="sr-only">Present</span>
                </>
              ) : (
                <span>{end}</span>
              )}
            </dd>
          </dl>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {position.description && (
          <ProseMono className="pt-3 pl-11">
            <Markdown>{position.description}</Markdown>
          </ProseMono>
        )}

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-3 pl-11">
            {position.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
