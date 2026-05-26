import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "quanta-chat",
    title: "Quanta AI",
    period: {
      start: "02.2026",
    },
    link: "https://quantaai.dev",
    skills: [
      "AI Chat",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PWA",
      "Multi-model AI",
    ],
    description:
      "A modern multi-model AI chat platform supporting Mistral, Qwen, DeepSeek, and more.",
    image: "/projects/quanta-ai.png",
    status: "Live",
  },
  {
    id: "filetools",
    title: "FileTools",
    period: {
      start: "02.2026",
    },
    link: "https://filetools-chi.vercel.app",
    skills: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "PDF Tools",
      "Image Processing",
      "Client-side Web App",
    ],
    description:
      "A browser-based utility suite for image and PDF processing with no server uploads required.",
    image: "/projects/filetools.png",
    status: "Live",
  },
  {
    id: "ece-power-lab",
    title: "ECE Power Lab",
    period: {
      start: "03.2026",
    },
    link: "https://github.com/abhikakroda/ece-power-lab",
    skills: [
      "TypeScript",
      "React",
      "Vite",
      "Electronics",
      "Signal Processing",
      "Digital Logic",
      "Simulation",
    ],
    description:
      "An interactive ECE workbench for students and engineers with circuit solving and signal visualization.",
    image: "/projects/ece-power-lab.png",
    status: "Building",
  },
  {
    id: "opencare",
    title: "OpenCare",
    period: {
      start: "03.2026",
    },
    link: "https://opencare-mu.vercel.app",
    skills: [
      "TypeScript",
      "Healthcare",
      "Supabase",
      "Realtime",
      "Queue Management",
      "Admin Dashboard",
      "Responsive Web App",
    ],
    description:
      "A hospital operations platform with smart queue, live wait times, and admin workflows.",
    image: "/projects/opencare.png",
    status: "Live",
  },
]
