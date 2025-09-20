// auth/AccessDeniedPage.jsx
import React from "react";
import { useMsal } from "@azure/msal-react";
import { useLocation, Link } from "react-router-dom";
import AnalyticsLayout from "../portals/dret-analytics/components/layout";
import { ShieldAlert, Home, RefreshCw, Mail, HelpCircle, Lock } from "lucide-react";

// Optional: map your GROUPS constants to friendly labels for display
// (If you prefer, import GROUPS and build this map centrally.)
const FRIENDLY_GROUP_LABELS = {
  EDUCATION: "Education",
  GOVERNANCE: "Governance",
  WORKING_GROUP: "Working Group",
  FINANCE: "Finance",
  HR: "HR",
  IT_DATA: "IT & Data",
  OPERATIONS: "Operations",
};

const TRUST_GREEN = "#205c40";

export default function AccessDeniedPage({
  requiredGroups = [],
  hasOverage = false,
}) {
  const { accounts } = useMsal();
  const account = accounts?.[0];
  const upn = account?.username || account?.idTokenClaims?.preferred_username || "";
  const name = account?.name || "";
  const location = useLocation();

  // Make a readable list for the UI / email
  const friendlyGroups = requiredGroups.map((g) => FRIENDLY_GROUP_LABELS[g] || g).join(", ");

  // Build a helpful mailto with context
  const subject = encodeURIComponent("Analytics access request");
  const bodyLines = [
    `Hi IT Support,`,
    ``,
    `Please could you grant me access to the following page:`,
    `${window.location.origin}${location.pathname}`,
    ``,
    `Signed in as: ${name} (${upn})`,
    requiredGroups.length ? `Required group(s): ${friendlyGroups}` : ``,
    hasOverage
      ? `Note: AAD group overage is indicated on this token, so Graph lookup may be required.`
      : ``,
    ``,
    `Thanks!`,
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join("\n"));
  const requestHref = `mailto:itsupport@dret.co.uk?subject=${subject}&body=${body}`;

  return (
    <AnalyticsLayout>
      <div className="min-h-screen bg-gray-50 font-avenir">
        {/* Header strip matching HomePage spacing */}
        <div className="shrink-0 z-20 shadow-sm px-6 md:px-8 h-24 flex items-center justify-between" style={{ backgroundColor: "#ffffff" }}>
          <h1 className="text-2xl font-black" style={{ color: TRUST_GREEN }}>
            Access denied
          </h1>
          {name && (
            <div className="text-sm text-gray-500 truncate max-w-[40ch]" title={upn}>
              {name}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${TRUST_GREEN}10`, color: TRUST_GREEN }}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">403 — Not authorised</h2>
                    <p className="text-gray-700">
                      You don’t currently have access to this page. If you believe this is a mistake, use the options below.
                    </p>

                    {/* Diagnostics */}
                    {(requiredGroups.length > 0 || hasOverage) && (
                      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                          <div className="text-sm text-gray-700">
                            {requiredGroups.length > 0 && (
                              <p className="mb-2">
                                <span className="font-medium">Required group(s):</span>{" "}
                                {friendlyGroups || "—"}
                              </p>
                            )}
                            {hasOverage ? (
                              <p className="text-gray-600">
                                <span className="font-medium">Note:</span> Your token indicates{" "}
                                <span className="whitespace-nowrap">AAD group overage</span>, so membership checks may require a Graph lookup.
                              </p>
                            ) : (
                              <p className="text-gray-600">
                                If your access was granted recently, try refreshing—group claims can take a short time to appear in your token.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/analytics"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
                        title="Go to Analytics home"
                      >
                        <Home className="w-4 h-4" />
                        <span>Go to Analytics home</span>
                      </Link>
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
                        title="Retry"
                        type="button"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh and retry</span>
                      </button>
                      <a
                        href={requestHref}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition"
                        style={{ backgroundColor: TRUST_GREEN }}
                        title="Request access"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Request access</span>
                      </a>
                    </div>

                    {/* Tip for protected content */}
                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                      <Lock className="w-4 h-4" />
                      <span>
                        If you need temporary access for a specific task, mention the report name or URL in your request.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional subtle footer bar */}
              <div className="bg-gray-50 px-6 md:px-8 py-3 border-t border-gray-200 text-xs text-gray-500">
                Path: <code className="text-[11px]">{location.pathname}</code>
                {upn ? ` • Signed in as ${upn}` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsLayout>
  );
}
