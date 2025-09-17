import React from "react";
import { useParams } from "react-router-dom";
import SchoolToolkit from "../components/schoolToolkit";
import { schoolToolkitConfigs } from "./allToolkits";

function normaliseSchoolLabel(label) {
  if (!label) return "";
  return (
    label
      .replace(/\bToolkit\b/i, "")
      .replace(/\bAcademy\b/i, "")
      .replace(/\bPrimary\b/i, "")
      .replace(/[\W_]+/g, "")
      .trim()
  );
}

export default function ToolkitRouter() {
  const { schoolKey } = useParams();
  const items = schoolToolkitConfigs[schoolKey];

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="p-8">
        No toolkit found for: <code>{schoolKey}</code>
      </div>
    );
  }

  const schoolName =
    items[0]?.sourceToolkit ||
    schoolKey.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase());

  const storageKey = `toolkitFavourites_${normaliseSchoolLabel(schoolName)}`;

  return (
    <SchoolToolkit
      schoolName={schoolName}
      items={items}
      storageKey={storageKey}
      defaultMode="cosy"
    />
  );
}
