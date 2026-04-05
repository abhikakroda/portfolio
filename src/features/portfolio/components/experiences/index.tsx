import React from "react"

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
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {workExperiences.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  )
}
