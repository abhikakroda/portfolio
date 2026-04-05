export type EducationItem = {
  id: string
  school: string
  degree: string
  field: string
  years: string
  details?: string[]
}

export const EDUCATION: EducationItem[] = [
  {
    id: "nit-srinagar",
    school: "National Institute of Technology Srinagar",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Electronics and Communication Engineering",
    years: "2023 – 2027",
    details: [
      "Relevant Coursework: Digital Electronics, Signals & Systems, Semiconductor Devices, VLSI Design",
      "CGPA: 8.0",
    ],
  },
  {
    id: "rbse",
    school: "Board of Secondary Education Rajasthan",
    degree: "Senior Secondary (Class XII)",
    field: "Physics, Chemistry, Mathematics",
    years: "Aug 2020 – Mar 2022",
    details: ["Percentage: 92.20"],
  },
]
