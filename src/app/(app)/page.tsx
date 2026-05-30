import type { Metadata } from "next"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { SITE_INFO } from "@/config/site"
import { About } from "@/features/portfolio/components/about"
import { Certifications } from "@/features/portfolio/components/certifications"
import { Education } from "@/features/portfolio/components/education"
import { Experiences } from "@/features/portfolio/components/experiences"
import { ProfileCover } from "@/features/portfolio/components/profile-cover"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: USER.displayName,
    description:
      "ECE student at NIT Srinagar, AI/ML intern at IISc Bangalore. Building at the intersection of AI and real-world impact.",
    url: "/",
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="page-reveal mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileCover />
        <ProfileHeader />
        <Separator />

        <About />
        <Separator />

        <SocialLinks />
        <Separator />

        <Experiences />
        <Separator />

        <Education />
        <Separator />

        <Projects />
        <Separator />

        <TechStack />
        <Separator />

        <Certifications />
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_INFO.url,
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date(USER.dateUpdated).toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      url: SITE_INFO.url,
      image: new URL(USER.avatar, SITE_INFO.url).toString(),
      sameAs: [
        "https://github.com/abhikakroda",
        "https://www.linkedin.com/in/abhishekxmeena/",
        "https://x.com/opentropic",
      ],
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "screen-line-top screen-line-bottom relative flex h-8 w-full border-x border-line",
        className
      )}
    >
      <div className="absolute -left-[100vw] -z-1 h-8 w-[200vw] bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-line)]/56" />
    </div>
  )
}
