import PowerBIReportPage from "../components/reportPage";

export const reportConfig = [
  {
    id: "data-protection",
    name: "Data Protection Dashboard",
    description: "",
    category: "Data Protection",
    tag: "",
    href: "/analytics/governance/data-protection",
    component: () => (
      <PowerBIReportPage
        reportKey="data-protection"
        title="Data Protection Dashboard"
        showFilters={true}
        expandFilters={true}
      />
    ),
    status: "active",
  },

];

export const isActive  = (r) => r.status === "active";
export const isVisible = (r) => r.status !== "hidden";

export const activeReports   = reportConfig.filter(isActive);
export const visibleReports  = reportConfig.filter(isVisible);