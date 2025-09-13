import React from "react";
import { useParams } from "react-router-dom";
import SchoolToolkit from "../../../components/schoolToolkit";
import { schoolToolkitConfigs } from "./allToolkits";

export default function SchoolToolkitRouter() {
  const { schoolKey } = useParams(); // e.g. /toolkits/BarnesWallis
  const school = schoolToolkitConfigs[schoolKey];

  if (!school) {
    return <div className="p-8">No toolkit found for: {schoolKey}</div>;
  }

  return (
    <SchoolToolkit
      schoolName={school.name}
      items={school.config}
      storageKey={school.storageKey}
      defaultMode="cosy"
    />
  );
}