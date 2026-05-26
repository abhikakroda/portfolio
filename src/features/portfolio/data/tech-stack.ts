import type { TechStack } from "../types/tech-stack"

const googleSearch = (query: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(query)}`

const withGoogleHref = (items: Omit<TechStack, "href">[]): TechStack[] =>
  items.map((item) => ({
    ...item,
    href: googleSearch(item.searchQuery ?? item.title),
  }))

const simpleIcon = (slug: string) =>
  `https://cdn.simpleicons.org/${slug}/a3a3a3`

const svgIcon = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`

export const TECH_STACK: TechStack[] = withGoogleHref([
  {
    key: "react",
    title: "React",
    icon: simpleIcon("react"),
    searchQuery: "React JavaScript library",
  },
  {
    key: "next",
    title: "Next",
    icon: simpleIcon("nextdotjs"),
    searchQuery: "Next.js",
  },
  {
    key: "expo",
    title: "Expo",
    icon: simpleIcon("expo"),
  },
  {
    key: "django",
    title: "Django",
    icon: simpleIcon("django"),
  },
  {
    key: "express",
    title: "Express",
    icon: simpleIcon("express"),
    searchQuery: "Express.js",
  },
  {
    key: "node",
    title: "Node",
    icon: simpleIcon("nodedotjs"),
    searchQuery: "Node.js",
  },
  {
    key: "bun",
    title: "Bun",
    icon: simpleIcon("bun"),
  },
  {
    key: "postgresql",
    title: "PostgreSQL",
    icon: simpleIcon("postgresql"),
  },
  {
    key: "mongodb",
    title: "MongoDB",
    icon: simpleIcon("mongodb"),
  },
  {
    key: "redis",
    title: "Redis",
    icon: simpleIcon("redis"),
  },
  {
    key: "prisma",
    title: "Prisma",
    icon: simpleIcon("prisma"),
  },
  {
    key: "zustand",
    title: "Zustand",
    icon: svgIcon(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8.5 9.5 5h5L17 8.5"/><path d="M6 10.5c0 5 2.8 8 6 8s6-3 6-8"/><path d="M8 10.5h8"/><path d="M9 14h.01"/><path d="M15 14h.01"/><path d="M10.5 16.5c1 .7 2 .7 3 0"/></svg>'
    ),
  },
  {
    key: "tanstack-query",
    title: "Tanstack Query",
    icon: simpleIcon("reactquery"),
    searchQuery: "TanStack Query",
  },
  {
    key: "postman",
    title: "Postman",
    icon: simpleIcon("postman"),
  },
  {
    key: "tailwind",
    title: "Tailwind",
    icon: simpleIcon("tailwindcss"),
    searchQuery: "Tailwind CSS",
  },
  {
    key: "shadcn",
    title: "shadcn",
    icon: simpleIcon("shadcnui"),
    searchQuery: "shadcn ui",
  },
  {
    key: "motion",
    title: "Motion",
    icon: simpleIcon("framer"),
    searchQuery: "Motion React animation library",
  },
  {
    key: "gsap",
    title: "GSAP",
    icon: simpleIcon("greensock"),
  },
  {
    key: "javascript",
    title: "JavaScript",
    icon: simpleIcon("javascript"),
  },
  {
    key: "typescript",
    title: "TypeScript",
    icon: simpleIcon("typescript"),
  },
  {
    key: "java",
    title: "Java",
    icon: simpleIcon("openjdk"),
  },
  {
    key: "python",
    title: "Python",
    icon: simpleIcon("python"),
  },
  {
    key: "c-cpp",
    title: "C/C++",
    icon: simpleIcon("cplusplus"),
    searchQuery: "C and C++ programming",
  },
  {
    key: "sql",
    title: "SQL",
    icon: svgIcon(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>'
    ),
    searchQuery: "SQL database language",
  },
  {
    key: "git",
    title: "Git",
    icon: simpleIcon("git"),
  },
  {
    key: "github",
    title: "Github",
    icon: simpleIcon("github"),
    searchQuery: "GitHub",
  },
  {
    key: "figma",
    title: "Figma",
    icon: simpleIcon("figma"),
  },
  {
    key: "docker",
    title: "Docker",
    icon: simpleIcon("docker"),
  },
  {
    key: "linux",
    title: "Linux",
    icon: simpleIcon("linux"),
  },
])
