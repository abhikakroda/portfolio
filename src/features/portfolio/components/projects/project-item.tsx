import { ArrowUpRightIcon } from "lucide-react"
import Image from "next/image"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

import type { Project } from "../../types/projects"

export function ProjectItem({ project }: { project: Project }) {
  const statusColor =
    project.status === "Live"
      ? "bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.6)]"
      : project.status === "Building"
        ? "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.6)]"
        : "bg-zinc-400"

  return (
    <div className="flex flex-col">
      {project.image && (
        <div className="overflow-hidden rounded-xl border border-dashed border-muted-foreground/30">
          <div className="px-3 pt-3 text-xs text-muted-foreground">
            {project.title}
          </div>
          <div className="p-3">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={340}
              className="w-full rounded-lg object-cover"
              unoptimized
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">{project.title}</h3>
        {project.status && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span
              className={cn("size-2 animate-pulse rounded-full", statusColor)}
            />
            {project.status}
          </span>
        )}
      </div>

      {project.description && (
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description.split("\n")[0]}
        </p>
      )}

      <a
        href={addQueryParams(project.link, UTM_PARAMS)}
        target="_blank"
        rel="noopener"
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
      >
        View Project
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </div>
  )
}
