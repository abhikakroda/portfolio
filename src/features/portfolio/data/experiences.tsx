import { CodeXmlIcon, GraduationCapIcon, LightbulbIcon } from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "iisc-cense",
    displayName: "IISc CeNSE",
    companyName: "Indian Institute of Science (CeNSE Lab), Bangalore, India",
    companyLogo: "/org-icons/iisc.png",
    positions: [
      {
        id: "1",
        title: "AI/ML Intern – Semiconductor Control & Fault Detection",
        employmentPeriod: {
          start: "10 Dec 2025",
        },
        employmentType: "Internship",
        location: "Bangalore, India",
        icon: <CodeXmlIcon />,
        description: `- Developed AI/ML models for fault detection in semiconductor systems.
- Worked on process monitoring and predictive maintenance techniques.
- Applied data-driven approaches to improve device reliability and yield.
- Collaborated with researchers on real-time control systems using ML.`,
        skills: [
          "AI/ML",
          "Fault Detection",
          "Predictive Maintenance",
          "Process Monitoring",
          "Semiconductor Systems",
          "Real-time Control",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "drdo-sspl",
    displayName: "DRDO SSPL",
    companyName: "Solid State Physics Laboratory (DRDO), Delhi, India",
    companyLogo: "/org-icons/drdo.png",
    positions: [
      {
        id: "1",
        title: "Research Intern – Semiconductor Devices & Applications",
        employmentPeriod: {
          start: "15 Dec 2025",
          end: "26 Jan 2026",
        },
        employmentType: "Internship",
        location: "Delhi, India",
        icon: <GraduationCapIcon />,
        description: `- Studied semiconductor device physics and fabrication techniques.
- Analyzed device performance characteristics and applications.
- Assisted in experimental work related to advanced semiconductor materials.
- Gained exposure to defense-oriented electronics and device research.`,
        skills: [
          "Semiconductor Devices",
          "Device Physics",
          "Fabrication",
          "Experimental Research",
          "Materials Analysis",
          "Electronics",
        ],
      },
    ],
  },
  {
    id: "cdac-noida",
    displayName: "C-DAC Noida",
    companyName: "Centre for Development of Advanced Computing, Noida, India",
    companyLogo: "/org-icons/cdac.png",
    positions: [
      {
        id: "1",
        title: "Cybersecurity Intern",
        employmentPeriod: {
          start: "Jul 2025",
          end: "Aug 2025",
        },
        employmentType: "Internship",
        location: "Noida, India",
        icon: <LightbulbIcon />,
        description: `- Worked on cybersecurity fundamentals, threat analysis, and system protection.
- Performed vulnerability assessment and basic penetration testing.
- Learned secure coding practices and network security concepts.
- Contributed to projects focused on data protection and system hardening.`,
        skills: [
          "Cybersecurity",
          "Threat Analysis",
          "Vulnerability Assessment",
          "Penetration Testing",
          "Secure Coding",
          "Network Security",
        ],
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    companyLogo: "/org-icons/nit-srinagar.png",
    positions: [
      {
        id: "2",
        title: "National Institute of Technology Srinagar",
        employmentPeriod: {
          start: "2023",
          end: "2027",
        },
        employmentType:
          "Bachelor of Technology - BTech, Electronic and communication engineering",
        icon: <GraduationCapIcon />,
        description:
          "- Pursuing Bachelor of Technology in Electronic and Communication Engineering.",
        skills: ["Electronics", "Communication Engineering", "BTech"],
      },
      {
        id: "1",
        title: "Board of Secondary Education, Rajasthan (RBSE)",
        employmentPeriod: {
          start: "08.2020",
          end: "03.2022",
        },
        employmentType:
          "Senior Secondary (Class XII), Physics, Chemistry, Mathematics",
        icon: <GraduationCapIcon />,
        description: "- Grade: 92.20%",
        skills: ["Physics", "Chemistry", "Mathematics"],
      },
    ],
  },
]
