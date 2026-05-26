import { PROJECTS } from "../../data/projects"
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel"
import { ProjectItem } from "./project-item"

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-1 gap-6 px-4 pb-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </Panel>
  )
}
