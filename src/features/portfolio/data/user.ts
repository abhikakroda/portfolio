import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Abhishek",
  lastName: "Meena",
  displayName: "Abhishek Meena",
  username: "abhishekmeena",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Design Engineer",
    "Open Source Contributor",
  ],
  address: "Ho Chi Minh City, Viet Nam",
  phoneNumber: "Kzg0Nzc3ODg4MTQ4", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "ZGFpQGNoYW5oZGFpLmNvbQ==", // base64 encoded
  website: "https://chanhdai.com",
  jobTitle: "Design Engineer",
  jobs: [
    {
      title: "Design Engineer",
      company: "shadcncraft",
      website: "https://shadcncraft.com",
      experienceId: "shadcncraft",
    },
    {
      title: "Founder",
      company: "Quaric",
      website: "https://quaric.com",
      experienceId: "quaric",
    },
  ],
  about: `
- I’m a builder who’s still figuring things out, but doing it by creating along the way. I enjoy working at the intersection of AI and real world impact, whether it’s building systems, experimenting with LLMs, or turning ideas into something real.
- At my core, I’m curious, not just about technology, but about how it shapes the way people think, act, and grow. That curiosity pushes me beyond just coding, into exploring meaning and purpose.
- I don’t see growth as just skills or achievements, but as becoming more aware, disciplined, and aligned with what I’m doing, and that’s something I’m continuously working on.
`,
  avatar: "/abhishek-avatar.jpg",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-dark.png?v=8",
  namePronunciationUrl: "https://assets.chanhdai.com/audio/chanhdai.mp3",
  timeZone: "Asia/Ho_Chi_Minh",
  keywords: ["abhishek meena", "abhishekmeena", "abhishek", "meena"],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
