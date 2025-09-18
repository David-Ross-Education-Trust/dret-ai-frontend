export const reportConfig = [];

export const isActive = (r) => r.status === "active";
export const isVisible = (r) => r.status !== "hidden";

export const activeReports = reportConfig.filter(isActive);
export const visibleReports = reportConfig.filter(isVisible);
