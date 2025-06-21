import $001 from "./tools/001";

export const toolsConfig = [
  // Generic ToolRenderer-based tool (edit/add as needed)
  {
    id: "lesson-planner",
    name: "Lesson Planner",
    description: "Plan and manage your lessons with ease.",
    category: "Planning",
    tag: "New",
    href: "/tool/lesson-planner",
    agentId: "asst_1UapHOvlRnY8SYKyizeXmUcZ",
    fields: [
      { name: "subject", label: "Subject", type: "text", placeholder: "Maths" },
      { name: "audience", label: "Audience", type: "text", placeholder: "Year 7" },
      { name: "topic", label: "Topic", type: "text", placeholder: "Fractions" },
      { name: "description", label: "Brief Description", type: "textarea", placeholder: "What are some of the key points this lesson should cover?" },
      { name: "length", label: "Length (minutes)", type: "text", placeholder: "60" },
    ],
    promptSuffix: "Please generate a detailed lesson plan with objectives, activities, and time breakdown, formatted with clear markdown headings, tables, and lists.",
    buttonText: "Generate",
    comingSoon: false,
  },

  // Legacy/component-based tool example (kept for reference)
  {
    id: "001",
    name: "Legacy Lesson Planner",
    description: "Legacy: Custom lesson planner component.",
    category: "Planning",
    tag: "",
    href: "/lesson-planner-legacy",
    component: $001,
    comingSoon: false,
  },

  // Placeholder/future tools (coming soon)
  {
    id: "002",
    comingSoon: true,
  },
  {
    id: "003",
    comingSoon: true,
  },
  {
    id: "004",
    comingSoon: true,
  },
  {
    id: "005",
    comingSoon: true,
  },
  {
    id: "006",
    comingSoon: true,
  },
  {
    id: "007",
    comingSoon: true,
  },
  {
    id: "008",
    comingSoon: true,
  },
  {
    id: "009",
    comingSoon: true,
  },
  {
    id: "010",
    comingSoon: true,
  },
  {
    id: "011",
    comingSoon: true,
  },
  {
    id: "012",
    comingSoon: true,
  },
  {
    id: "013",
    comingSoon: true,
  },
  {
    id: "014",
    comingSoon: true,
  },
  {
    id: "015",
    comingSoon: true,
  }
];
