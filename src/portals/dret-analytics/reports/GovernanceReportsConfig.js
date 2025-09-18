import PowerBIReportPage from "./reportPage";

export const reportConfig = [
  {
    id: "data-protection",
    name: "Data Protection Dashboard",
    description: "",
    category: "DRET",
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
export const isVisible = (r) => r.status !== "hidden"; // active or coming-soon

export const activeReports   = reportConfig.filter(isActive);   // use for routes
export const visibleReports  = reportConfig.filter(isVisible);  // use for cards/menus