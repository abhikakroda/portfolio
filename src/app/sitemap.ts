import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      route: "",
      lastModified: USER.dateUpdated,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      route: "/about.md",
      lastModified: USER.dateUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      route: "/experience.md",
      lastModified: USER.dateUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      route: "/projects.md",
      lastModified: USER.dateUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      route: "/certifications.md",
      lastModified: USER.dateUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ].map(({ route, lastModified, ...metadata }) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date(lastModified).toISOString(),
    ...metadata,
  }))

  return routes
}
