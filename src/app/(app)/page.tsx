import type { Metadata } from "next"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { About } from "@/features/portfolio/components/about"
import { Certifications } from "@/features/portfolio/components/certifications"
import { Education } from "@/features/portfolio/components/education"
import { Experiences } from "@/features/portfolio/components/experiences"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { ProfileCover } from "@/features/portfolio/components/profile-cover"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
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

        <GitHubContributions />
        <Separator />

        <Experiences />
        <Separator />

        <Education />
        <Separator />

        <Projects />
        <Separator />

        <Certifications />
        <Separator />

        <QuoteSection />
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-line",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    />
  )
}

function QuoteSection() {
  return (
    <section className="screen-line-bottom border-x border-line px-6 py-14 sm:px-10 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="pb-4 text-[2.8rem] leading-none text-muted-foreground/30 sm:text-[3rem]">
          &quot;
        </div>

        <blockquote className="mx-auto max-w-[50rem] text-[1.72rem] leading-[1.35] font-medium text-balance text-foreground/75 italic sm:text-[1.9rem]">
          I was not born with a whole lot of natural talent... but I work hard
          and I never give up.
        </blockquote>

        <div className="pt-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase sm:text-xs">
            <span className="h-px w-7 bg-line" />
            <span>Rock Lee</span>
            <span className="h-px w-7 bg-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
