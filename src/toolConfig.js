import LessonPlanningTool from "./tools/001";
import ReportWritingTool from "./tools/002";

export const toolsConfig = [

  {
    id: "report-writer",
    name: "Report Writing Tool",
    description: "Generate constructive, supportive student report comments.",
    category: "Assessment",
    tag: "New",
    href: "/tool/report-writing",
    component: ReportWritingTool,
    comingSoon: false,
  },

  {
    id: "lesson-planner",
    name: "Lesson Planner",
    description: "Plan and manage lessons with ease.",
    category: "Planning",
    tag: "New",
    href: "/tool/lesson-planner",
    component: LessonPlanningTool,
    comingSoon: false,
  },

  { id: "003", comingSoon: true },
  { id: "004", comingSoon: true },
  { id: "005", comingSoon: true },
  { id: "006", comingSoon: true },
  { id: "007", comingSoon: true },
  { id: "008", comingSoon: true },
  { id: "009", comingSoon: true },
  { id: "010", comingSoon: true },
  { id: "011", comingSoon: true },
  { id: "012", comingSoon: true },
  { id: "013", comingSoon: true },
  { id: "014", comingSoon: true },
  { id: "015", comingSoon: true }
];