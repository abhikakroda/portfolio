import { cn } from "@/lib/utils"

import { TECH_STACK } from "../data/tech-stack"
import { Panel, PanelHeader, PanelTitle } from "./panel"

const TECH_STACK_ROWS = [
  TECH_STACK.slice(0, 7),
  TECH_STACK.slice(7, 13),
  TECH_STACK.slice(13, 19),
  TECH_STACK.slice(19, 27),
  TECH_STACK.slice(27),
]

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Skills &amp; Tools</PanelTitle>
      </PanelHeader>

      <div className="p-4">
        <ul className="flex flex-wrap justify-center gap-2 lg:hidden">
          {TECH_STACK.map((tech) => (
            <li key={tech.key}>
              <TechStackLink tech={tech} />
            </li>
          ))}
        </ul>

        <div className="hidden space-y-2 lg:block">
          {TECH_STACK_ROWS.map((row, index) => (
            <ul key={index} className="flex justify-center gap-2">
              {row.map((tech) => (
                <li key={tech.key}>
                  <TechStackLink tech={tech} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function TechStackLink({ tech }: { tech: (typeof TECH_STACK)[number] }) {
  return (
    <a
      href={tech.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Search ${tech.title} on Google`}
      className={cn(
        "group inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-background/60 px-3 text-sm leading-none font-medium text-muted-foreground transition-colors hover:border-foreground/65 hover:bg-muted/50 hover:text-foreground focus-visible:border-foreground/70 focus-visible:ring-2 focus-visible:outline-none data-[featured=true]:border-foreground/65 data-[featured=true]:bg-muted/45 data-[featured=true]:text-foreground"
      )}
      data-featured={tech.featured ? "true" : undefined}
    >
      <img
        src={tech.icon}
        alt=""
        aria-hidden="true"
        className="size-4 shrink-0 opacity-80 grayscale transition-opacity group-hover:opacity-100 group-data-[featured=true]:opacity-100"
      />
      <span className="whitespace-nowrap">{tech.title}</span>
    </a>
  )
}
