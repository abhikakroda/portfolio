import { NextResponse } from "next/server"

import { CERTIFICATIONS } from "@/features/portfolio/data/certifications"
import { EDUCATION } from "@/features/portfolio/data/education"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ""

const GEMINI_MODEL = "gemini-2.5-flash-lite"
const GITHUB_USERNAME = "abhikakroda"

export async function POST(request: Request) {
  try {
    const { question } = (await request.json()) as { question?: string }

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      )
    }

    if (!GEMINI_API_KEY) {
      const fastAnswer = getFastAnswer(question)

      if (fastAnswer) {
        return NextResponse.json({ answer: fastAnswer })
      }

      return NextResponse.json(
        {
          error:
            "AI search is not configured. Add GEMINI_API_KEY or GOOGLE_API_KEY to enable ask-about-me search.",
        },
        { status: 503 }
      )
    }

    const fastAnswer = getFastAnswer(question)

    if (fastAnswer) {
      return NextResponse.json({ answer: fastAnswer })
    }

    const profileContext = await buildProfileContext()

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "You are the portfolio assistant for Abhishek Meena. Use the provided profile context first. You may also answer broader, general questions about engineering, projects, learning, careers, AI, or software in a helpful way when they do not require personal facts. Be concise, factual, and useful. When a question asks about Abhishek specifically, stay grounded in the provided profile context and clearly label any inference. If a question needs personal facts not present in the context, say you do not have enough information and suggest contacting Abhishek directly.",
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Profile context:\n${profileContext}\n\nQuestion: ${question.trim()}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 260,
          },
        }),
      }
    )

    const data = (await res.json()) as GeminiResponse

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "AI request failed." },
        { status: 500 }
      )
    }

    const answer =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim() || "I do not have enough information for that."

    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while asking AI." },
      { status: 500 }
    )
  }
}

function getFastAnswer(question: string) {
  const normalized = question.toLowerCase().trim()

  if (
    matchesAny(normalized, [
      "contact",
      "email",
      "mail",
      "linkedin",
      "github",
      "x ",
      "twitter",
      "resume",
    ])
  ) {
    return [
      `You can reach **${USER.displayName}** here:`,
      ...SOCIAL_LINKS.map((item) => `- **${item.title}:** ${item.href}`),
    ].join("\n")
  }

  if (
    matchesAny(normalized, [
      "education",
      "study",
      "studying",
      "college",
      "school",
      "cgpa",
      "class x",
      "class xii",
      "10th",
      "12th",
    ])
  ) {
    return [
      `Here is **${USER.displayName}**'s education:`,
      ...EDUCATION.map(
        (item) =>
          `- **${item.school}**\n  - ${item.degree} - ${item.field}\n  - ${item.years}${item.details?.length ? `\n  - ${item.details.join("\n  - ")}` : ""}`
      ),
    ].join("\n")
  }

  if (
    matchesAny(normalized, [
      "intern",
      "internship",
      "experience",
      "worked",
      "iisc",
      "drdo",
      "cdac",
      "work",
    ])
  ) {
    return [
      `Here is **${USER.displayName}**'s experience:`,
      ...EXPERIENCES.filter((item) => item.id !== "education").flatMap(
        (company) =>
          company.positions.map(
            (position) =>
              `- **${position.title}** at **${company.companyName}**\n  - ${position.employmentPeriod.start}${position.employmentPeriod.end ? ` — ${position.employmentPeriod.end}` : " — Present"}\n  - ${position.employmentType || "Role"}${position.skills?.length ? `\n  - Skills: ${position.skills.join(", ")}` : ""}`
          )
      ),
    ].join("\n")
  }

  if (matchesAny(normalized, ["project", "build", "github"])) {
    return [
      `These are the main projects currently highlighted for **${USER.displayName}**:`,
      ...PROJECTS.map(
        (project) =>
          `- **${project.title}**\n  - ${cleanMarkdown(project.description || "")}\n  - ${project.link}`
      ),
    ].join("\n")
  }

  if (
    matchesAny(normalized, [
      "certificate",
      "certification",
      "nvidia",
      "qualcomm",
      "credential",
    ])
  ) {
    return [
      `These are **${USER.displayName}**'s certifications:`,
      ...CERTIFICATIONS.map(
        (item) =>
          `- **${item.title}** by **${item.issuer}**\n  - Issued: ${item.issueDate}\n  - Credential ID: ${item.credentialID}\n  - ${item.credentialURL}`
      ),
    ].join("\n")
  }

  if (
    matchesAny(normalized, [
      "who is",
      "about abhishek",
      "about me",
      "introduce",
      "tell me about yourself",
    ])
  ) {
    return [
      `**${USER.displayName}** is based in **${USER.address}**.`,
      "",
      USER.bio,
      "",
      cleanMarkdown(USER.about),
    ].join("\n")
  }

  if (
    matchesAny(normalized, [
      "what can you help with",
      "what can i ask",
      "help",
      "who are you",
    ])
  ) {
    return [
      "You can ask about **Abhishek Meena**, his projects, internships, education, certifications, contact links, and GitHub work.",
      "",
      "You can also ask broader questions about software, AI, building projects, learning paths, and engineering in general.",
    ].join("\n")
  }

  return null
}

function matchesAny(input: string, needles: string[]) {
  return needles.some((needle) => input.includes(needle))
}

async function buildProfileContext() {
  const experienceLines = EXPERIENCES.filter((item) => item.id !== "education")
    .map((company) =>
      [
        `Organization: ${company.companyName}`,
        ...company.positions.map((position) =>
          [
            `Role: ${position.title}`,
            `Dates: ${position.employmentPeriod.start}${position.employmentPeriod.end ? ` — ${position.employmentPeriod.end}` : " — Present"}`,
            `Type: ${position.employmentType || "Not specified"}`,
            `Description: ${cleanMarkdown(position.description || "")}`,
            `Skills: ${(position.skills || []).join(", ")}`,
          ].join("\n")
        ),
      ].join("\n")
    )
    .join("\n\n")

  const educationLines = EDUCATION.map((item) =>
    [
      `School: ${item.school}`,
      `Program: ${item.degree} — ${item.field}`,
      `Years: ${item.years}`,
      `Details: ${(item.details || []).join("; ")}`,
    ].join("\n")
  ).join("\n\n")

  const projectLines = PROJECTS.map((project) =>
    [
      `Project: ${project.title}`,
      `Link: ${project.link}`,
      `Summary: ${cleanMarkdown(project.description || "")}`,
      `Skills: ${project.skills.join(", ")}`,
    ].join("\n")
  ).join("\n\n")

  const certificationLines = CERTIFICATIONS.map((item) =>
    [
      `Certification: ${item.title}`,
      `Issuer: ${item.issuer}`,
      `Issued: ${item.issueDate}`,
      `Credential ID: ${item.credentialID}`,
      `Credential URL: ${item.credentialURL}`,
    ].join("\n")
  ).join("\n\n")

  const socialLines = SOCIAL_LINKS.map(
    (item) => `${item.title}: ${item.href}`
  ).join("\n")

  const githubContext = await buildGitHubContext()

  return [
    `Name: ${USER.displayName}`,
    `Username: ${USER.username}`,
    `Bio: ${USER.bio}`,
    `About: ${cleanMarkdown(USER.about)}`,
    `Location: ${USER.address}`,
    "",
    "Experience:",
    experienceLines,
    "",
    "Education:",
    educationLines,
    "",
    "Projects:",
    projectLines,
    "",
    "Certifications:",
    certificationLines,
    "",
    "Public GitHub Activity:",
    githubContext,
    "",
    "Contact and Links:",
    socialLines,
  ].join("\n")
}

async function buildGitHubContext() {
  try {
    const [profileResponse, repoResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "abhikakroda-portfolio",
        },
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "abhikakroda-portfolio",
          },
          next: { revalidate: 3600 },
        }
      ),
    ])

    if (!profileResponse.ok || !repoResponse.ok) {
      throw new Error("GitHub lookup failed.")
    }

    const profile = (await profileResponse.json()) as GitHubProfile
    const repos = (await repoResponse.json()) as GitHubRepo[]

    const publicRepos = repos.filter((repo) => !repo.fork)
    const topLanguages = [
      ...new Set(publicRepos.map((repo) => repo.language).filter(Boolean)),
    ]
      .slice(0, 6)
      .join(", ")

    const featuredRepos = [...publicRepos]
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }

        return (
          new Date(b.pushed_at || 0).getTime() -
          new Date(a.pushed_at || 0).getTime()
        )
      })
      .slice(0, 6)
      .map((repo) =>
        [
          `Repo: ${repo.name}`,
          `Description: ${repo.description || "No description provided."}`,
          `Primary language: ${repo.language || "Not specified"}`,
          `Stars: ${repo.stargazers_count}`,
          `Homepage: ${repo.homepage || "None"}`,
          `Last pushed: ${repo.pushed_at || "Unknown"}`,
        ].join("\n")
      )
      .join("\n\n")

    return [
      `GitHub login: ${profile.login}`,
      `GitHub display name: ${profile.name || USER.displayName}`,
      `GitHub location: ${profile.location || USER.address}`,
      `GitHub bio: ${cleanMarkdown(profile.bio || "") || "No public bio provided."}`,
      `Public repo count: ${profile.public_repos}`,
      `Follower count: ${profile.followers}`,
      `Following count: ${profile.following}`,
      `Top public repo languages: ${topLanguages || "Not enough data"}`,
      "",
      "Featured public repos:",
      featuredRepos || "No public repositories found.",
    ].join("\n")
  } catch {
    return "Live public GitHub data is temporarily unavailable."
  }
}

function cleanMarkdown(input: string) {
  return input.replace(/^- /gm, "").replace(/\s+/g, " ").trim()
}

type GitHubProfile = {
  bio: string | null
  followers: number
  following: number
  location: string | null
  login: string
  name: string | null
  public_repos: number
}

type GitHubRepo = {
  description: string | null
  fork: boolean
  homepage: string | null
  language: string | null
  name: string
  pushed_at: string | null
  stargazers_count: number
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
  error?: {
    message?: string
  }
}
