import { Suspense } from "react"

import { getGitHubContributions } from "../../data/github-contributions"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph"

export function GitHubContributions() {
  const contributions = getGitHubContributions()

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>GitHub Activity</PanelTitle>
      </PanelHeader>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>
    </Panel>
  )
}
