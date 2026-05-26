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
        <PanelTitle>Experiences</PanelTitle>
      </PanelHeader>

      <div>
        {workExperiences.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  )
}
