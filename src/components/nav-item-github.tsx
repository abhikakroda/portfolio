import { GitHubStars } from "@/components/github-stars"
import { SOURCE_CODE_GITHUB_REPO } from "@/config/site"

export async function NavItemGitHub() {
  return <GitHubStars repo={SOURCE_CODE_GITHUB_REPO} stargazersCount={0} />
}
