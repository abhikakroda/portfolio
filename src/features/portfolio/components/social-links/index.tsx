import { SOCIAL_LINKS } from "../../data/social-links"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { SocialLinkItem } from "./social-link-item"

export function SocialLinks() {
  return (
    <Panel className="before:content-none after:content-none">
      <PanelHeader>
        <PanelTitle>Connect</PanelTitle>
      </PanelHeader>

      <div className="px-4 py-4 sm:px-8 sm:py-5">
        <div className="flex flex-wrap gap-3 sm:gap-5">
          {SOCIAL_LINKS.map((link, index) => {
            return <SocialLinkItem key={index} {...link} />
          })}
        </div>
      </div>
    </Panel>
  )
}
