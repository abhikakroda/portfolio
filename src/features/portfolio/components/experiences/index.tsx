import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/base/ui/button"

import { EXPERIENCES } from "../../data/experiences"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { ExperienceItem } from "./experience-item"

export function Experiences() {
  const workExperiences = EXPERIENCES.filter(
    (experience) => experience.id !== "education"
  )

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experiences</PanelTitle>
      </PanelHeader>

      <div>
        {workExperiences.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/experience.md" />}
        >
          View All
          <ArrowUpRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
