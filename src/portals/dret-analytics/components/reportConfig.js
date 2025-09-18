import PowerBIReportPage from "./reportPage";

export const reportConfig = [
  {
    id: "dret-education-team-report",
    name: "Education Report",
    description: "Education metrics and analysis. This is a demo report, data is not live.",
    category: "DRET",
    tag: "Demo",
    href: "/analytics/education/dret-education-team-report",
    component: () => (
      <PowerBIReportPage
        reportKey="dret-education-team-report"
        title="Education Report"
        showFilters={true}
        expandFilters={true}
      />
    ),
    status: "active",
  },
  {
    id: "dret-academy-report",
    name: "Academy Report",
    description: "Academy-level performance and analysis. This is a demo report, data is not live.",
    category: "DRET",
    tag: "Demo",
    href: "/analytics/education/dret-academy-report",
    component: () => (
      <PowerBIReportPage
        reportKey="dret-academy-report"
        title="Academy Report"
        showFilters={true}
        expandFilters={true}
      />
    ),
    status: "active",
  },
  {
    id: "dret-pupil-profile",
    name: "Pupil Profile",
    description: "Detailed profile data for each pupil. This is a demo report, data is not live.",
    category: "DRET",
    tag: "Demo",
    href: "/analytics/education/dret-pupil-profile",
    component: () => (
      <PowerBIReportPage
        reportKey="dret-pupil-profile"
        title="Pupil Profile"
        showFilters={true}
        expandFilters={true}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-attendance",
    name: "Attendance Overview",
    description: "Attendance data analysis.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-attendance",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-attendance"
        title="Attendance Overview"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-eyfs-assessment",
    name: "EYFS Assessment",
    description: "Outcomes for the previous academic year.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-eyfs-assessment",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-eyfs-assessment"
        title="EYFS Assessment"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-formative-assessment",
    name: "Formative Assessment",
    description: "Track formative progress over time.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-formative-assessment",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-formative-assessment"
        title="Formative Assessment"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "hidden",
  },
  {
    id: "bromcom-ks1-ks2-assessment",
    name: "KS1/KS2 Assessment",
    description: "Outcomes for the current and previous academic years.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-ks1-ks2-assessment",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-ks1-ks2-assessment"
        title="KS1/KS2 Assessment"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-ks1-ks2-tracker",
    name: "KS1/KS2 Tracker",
    description: "Compare Summative results to ARE/Summative Targets.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-ks1-ks2-tracker",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-ks1-ks2-tracker"
        title="KS1/KS2 Tracker"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-ks4-performance",
    name: "KS4 Performance",
    description: "Progress 8 and other metric analysis.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-ks4-performance",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-ks4-performance"
        title="KS4 Performance"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-mat-performance-overview",
    name: "MAT Performance Overview",
    description: "MAT-level overview of aggregated statistics.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-mat-performance-overview",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-mat-performance-overview"
        title="MAT Performance Overview"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "bromcom-suspensions-exclusions",
    name: "Suspensions & Exclusions",
    description: "Suspension and permanent exclusion analysis.",
    category: "Bromcom",
    tag: "",
    href: "/analytics/education/bromcom-suspensions-exclusions",
    component: () => (
      <PowerBIReportPage
        reportKey="bromcom-suspensions-exclusions"
        title="Suspensions & Exclusions"
        showFilters={false}
        expandFilters={false}
      />
    ),
    status: "active",
  },
  {
    id: "mat-comparison-analysis-ks2",
    name: "MAT KS2 Comparison",
    description: "Compare KS2 outcomes across MATs.",
    category: "DRET",
    tag: "",
    href: "/analytics/education/mat-comparison-analysis-ks2",
    component: () => (
      <PowerBIReportPage
        reportKey="mat-comparison-analysis-ks2"
        title="MAT KS2 Comparison"
        showFilters={true}
        expandFilters={true}
      />
    ),
    status: "active",
  },
  {
    id: "mat-comparison-analysis-ks4",
    name: "MAT KS4 Comparison",
    description: "Compare KS4 outcomes across MATs.",
    category: "DRET",
    tag: "",
    href: "/analytics/education/mat-comparison-analysis-ks4",
    component: () => (
      <PowerBIReportPage
        reportKey="mat-comparison-analysis-ks4"
        title="MAT KS4 Comparison"
        showFilters={true}
        expandFilters={true}
      />
    ),
    status: "active",
  },
];

export const isActive = (r) => r.status === "active";
export const isVisible = (r) => r.status !== "hidden";

export const activeReports = reportConfig.filter(isActive);
export const visibleReports = reportConfig.filter(isVisible);
