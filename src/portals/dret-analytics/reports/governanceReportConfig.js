import PowerBIReportPage from "../components/reportPage";

export const governanceReportConfig = [
  {
    id: "data-protection",
    name: "Data Protection Dashboard",
    description: "Trust-wide data protection and compliance overview.",
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
export const isVisible = (r) => r.status !== "hidden";

export const activeReports  = governanceReportConfig.filter(isActive);
export const visibleReports = governanceReportConfig.filter(isVisible);