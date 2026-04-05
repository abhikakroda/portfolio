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
    description: `A modern multi-model AI chat platform supporting Mistral, Qwen, DeepSeek, and more.
- Voice chat and image analysis
- Code assistance and deep research workflows
- Translation, summarization, and scheduled AI tasks
- Built as a fast, installable PWA with Supabase-backed infrastructure`,
    isExpanded: true,
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
    description: `A browser-based utility suite for image and PDF processing with no server uploads required.
- Compress, convert, crop, and resize images
- Merge, split, compress, and export PDFs
- Fast client-side workflow focused on privacy and usability`,
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
    description: `An interactive ECE workbench for students and engineers.
- Circuit solving and signal visualization
- Digital logic, communication systems, and control systems practice
- Formula engine, flashcards, interview prep, and simulation-focused learning tools`,
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
    description: `A hospital operations platform built for patients and administrators.
- Smart queue and token generation
- Live queue position, estimated wait times, and realtime updates
- Doctor, medicine, bed, and equipment availability management
- Admin workflows with responsive patient-facing access`,
  },
]
