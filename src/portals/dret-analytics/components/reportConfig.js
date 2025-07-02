import EducationReports from "../pages/EducationReports";
import AttendanceOverviewReport from "../reports/education/report001";
import ProgressTrackerReport from "../reports/education/report002";
// ...other imports

export const reportConfig = [
  {
    id: "education-analytics",
    name: "Education Analytics",
    description: "All education-related analytics and reports.",
    category: "Education",
    tag: "",
    href: "/analytics/education",
    component: EducationReports,
    comingSoon: false,
  },
  {
    id: "attendance-overview",
    name: "Attendance Overview",
    description: "Track attendance across the trust.",
    category: "Education",
    tag: "New",
    href: "/analytics/report/attendance-overview",
    component: AttendanceOverviewReport,
    comingSoon: false,
  },
  {
    id: "progress-tracker",
    name: "Progress Tracker",
    description: "Monitor student progress by cohort.",
    category: "Education",
    tag: "New",
    href: "/analytics/report/progress-tracker",
    component: ProgressTrackerReport,
    comingSoon: false,
  },
  { id: "003", comingSoon: true },
  // ...add more as you go
];
