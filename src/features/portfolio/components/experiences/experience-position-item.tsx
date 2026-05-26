import { BriefcaseBusinessIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleChevronDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Markdown } from "@/components/markdown"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

import type { ExperiencePosition } from "../../types/experiences"

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  return (
    <Collapsible
      className="relative"
      defaultOpen={position.isExpanded}
      disabled={!position.description}
    >
      <CollapsibleTrigger
        className={cn(
          "motion-press group flex w-full items-center justify-between gap-3 text-left",
          "rounded-lg py-1 text-sm text-muted-foreground hover:text-foreground",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
        )}
      >
        <span className="flex items-center gap-2">
          <BriefcaseBusinessIcon className="size-3.5" />
          Details
        </span>

        <div className="shrink-0 group-data-disabled:hidden [&_svg]:size-4">
          <CollapsibleChevronDownIcon duration={0.15} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {position.description && (
          <ProseMono className="pt-2">
            <Markdown>{position.description}</Markdown>
          </ProseMono>
        )}

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-3">
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
