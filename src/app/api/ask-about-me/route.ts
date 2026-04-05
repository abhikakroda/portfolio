import { NextResponse } from "next/server"

import { CERTIFICATIONS } from "@/features/portfolio/data/certifications"
import { EDUCATION } from "@/features/portfolio/data/education"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ""

const GEMINI_MODEL = "gemini-2.5-flash"
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
      return NextResponse.json(
        {
          error:
            "AI search is not configured. Add GEMINI_API_KEY or GOOGLE_API_KEY to enable ask-about-me search.",
        },
        { status: 503 }
      )
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
                text: "You are the portfolio assistant for Abhishek Meena. Answer only from the provided profile context. Be concise, factual, and helpful. Prefer exact facts over hype. If you rely on public GitHub activity to infer a current interest or focus area, say that it is based on public GitHub activity. If the answer is not in the profile context, say you do not have enough information and suggest contacting Abhishek directly.",
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
            temperature: 0.35,
            maxOutputTokens: 450,
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
