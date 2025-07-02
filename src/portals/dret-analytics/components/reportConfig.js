import PupilProfileReport from "../reports/education/report001";
import ToolkitExample from "../reports/education/report002";
// ...other imports

export const reportConfig = [
  {
    id: "pupil-profile",
    name: "Pupil Profile",
    description: "In-depth Pupil Profile.",
    category: "Education",
    tag: "New",
    href: "/analytics/report/pupil-profile",
    component: PupilProfileReport,
    comingSoon: false,
  },
  {
    id: "toolkit-example",
    name: "Toolkit",
    description: "Toolkit Example.",
    category: "Toolkit",
    tag: "New",
    href: "/analytics/report/toolkit-example",
    component: ToolkitExample,
    comingSoon: false,
  },
  { id: "003", comingSoon: true },
  // ...add more as you go
];
