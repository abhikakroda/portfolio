export type TechStack = {
  /** Unique identifier used to resolve icon files. */
  key: string
  /** Display name of the technology. */
  title: string
  /** Google search URL opened from the skill pill. */
  href: string
  /** Monochrome icon URL shown inside the skill pill. */
  icon: string
  /** Optional query override for the Google search link. */
  searchQuery?: string
  /** Matches the emphasized state in the supplied visual reference. */
  featured?: boolean
}
