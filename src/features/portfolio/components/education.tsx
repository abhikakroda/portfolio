import { GraduationCapIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"

import { EDUCATION } from "../data/education"
import { Panel, PanelHeader, PanelTitle } from "./panel"

export function Education() {
  const groupedEducation = Object.values(
    EDUCATION.reduce<Record<string, (typeof EDUCATION)[number][]>>(
      (acc, item) => {
        if (!acc[item.school]) {
          acc[item.school] = []
        }

        acc[item.school].push(item)
        return acc
      },
      {}
    )
  )

  return (
    <Panel id="education">
      <PanelHeader>
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {groupedEducation.map((items) => {
          const school = items[0]

          if (!school) {
            return null
          }

          return (
            <div
              key={school.school}
              id={`education-${school.id}`}
              className="screen-line-bottom scroll-mt-14 space-y-3 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center select-none">
                  <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                </div>

                <h3 className="text-lg leading-snug font-semibold">
                  {school.school}
                </h3>
              </div>

              <div className="space-y-3 pl-9">
                {items.map((item) => (
                  <Collapsible
                    key={item.id}
                    defaultOpen={false}
                    disabled={!item.details?.length}
                  >
                    <CollapsibleTrigger className="glass-surface glass-sheen motion-surface motion-press group block w-full rounded-xl border px-4 py-4 text-left outline-none hover:bg-accent-muted/80 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset dark:hover:bg-white/[0.03]">
                      <div className="flex items-start gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background">
                          <GraduationCapIcon className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base leading-snug">
                            <span className="font-medium text-foreground">
                              {item.degree}
                            </span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground">
                              {item.field}
                            </span>
                          </div>

                          <p className="pt-1 text-sm text-muted-foreground">
                            {item.years}
                          </p>
                        </div>

                        <div className="mt-0.5 shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:size-4">
                          <CollapsibleChevronsIcon duration={0.15} />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="overflow-hidden">
                      {item.details && item.details.length > 0 ? (
                        <div className="space-y-1.5 pt-3 pl-11">
                          {item.details.map((detail) => (
                            <p
                              key={detail}
                              className="text-sm text-muted-foreground"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
