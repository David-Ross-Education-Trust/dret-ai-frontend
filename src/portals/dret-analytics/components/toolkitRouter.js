import React from "react";
import { useParams } from "react-router-dom";
import SchoolToolkit from "./schoolToolkit"; // note: lowercase path
import { schoolToolkitConfigs } from "../toolkits/allToolkits";

// Same normaliser you’ve been using (no lowercase so storage keys match existing)
function normaliseSchoolLabel(label) {
  if (!label) return "";
  return (
    label
      .replace(/\bToolkit\b/i, "")
      .replace(/\bAcademy\b/i, "")
      .replace(/\bPrimary\b/i, "")
      .replace(/[\W_]+/g, "") // remove spaces, punctuation, underscores
      .trim()
  );
}

export default function SchoolToolkitRouter() {
  const { schoolKey } = useParams(); // e.g. "ainthorpe", "barneswallis"
  const items = schoolToolkitConfigs[schoolKey];

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="p-8">
        No toolkit found for: <code>{schoolKey}</code>
      </div>
    );
  }

  // Prefer the readable name from data; fallback to a title-cased key
  const schoolName =
    items[0]?.sourceToolkit ||
    schoolKey.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase());

  // Preserve your legacy per-school favourites key format
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
