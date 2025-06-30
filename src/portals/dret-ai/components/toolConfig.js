import LessonPlanningTool from "../tools/001";
import ReportWritingTool from "../tools/002";
import ExclusionReportTool from "../tools/003";
import CASEParagraphFeedback from "../tools/004";
import CASEParagraphFeedbackStudent from "../tools/005";

export const toolsConfig = [
  {
    id: "report-writer",
    name: "Report Writer",
    description: "Generate constructive student reports.",
    category: ["Assessment"],
    tag: "New",
    href: "/ai/tool/report-writer",
    component: ReportWritingTool,
    comingSoon: false,
  },
  {
    id: "lesson-planner",
    name: "Lesson Planner",
    description: "Plan and manage lessons with ease.",
    category: ["Planning"],
    tag: "New",
    href: "/ai/tool/lesson-planner",
    component: LessonPlanningTool,
    comingSoon: false,
  },
  {
    id: "exclusion-report",
    name: "Exclusion Report",
    description: "Generate detailed exclusion reports.",
    category: ["Admin"],
    tag: "New",
    href: "/ai/tool/exclusion-report",
    component: ExclusionReportTool,
    comingSoon: false,
  },
  {
    id: "case-paragraph",
    name: "CASE Paragraph Feedback",
    description: "Provide feedback on student CASE paragraphs.",
    category: ["Assessment", "History"],
    tag: "New",
    href: "/ai/tool/case-paragraph",
    component: CASEParagraphFeedback,
    comingSoon: false,
  },
  {
    id: "case-paragraph-student",
    name: "Testing",
    description: "Testing",
    category: ["Assessment", "Geography"],
    tag: "New",
    href: "/ai/tool/case-paragraph-student",
    component: CASEParagraphFeedbackStudent,
    comingSoon: false,
  },
];
