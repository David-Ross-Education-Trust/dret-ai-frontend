import AttendanceOverviewReport from "../reports/education/report001";
import ProgressTrackerReport from "../reports/education/report002";
// ...add more imports for each report as you scale

export const reportConfig = [
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
  // Example coming soon card
  { id: "003", comingSoon: true },
  // ...add more as you go
];
