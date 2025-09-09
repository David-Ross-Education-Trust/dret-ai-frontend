// src/portals/dret-analytics/pages/EducationReports.js
import React, { useEffect, useMemo, useState } from "react";
import { Search, X, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import { visibleReports } from "../components/reportConfig";

// ---- CONFIG (inline for now; lift to a config file if you prefer)
const BACKEND_BASE =
  "https://dretai-backend-fkf6bhgug2f3eney.uksouth-01.azurewebsites.net";
const API_SCOPE =
  "api://6080bbaa-4454-430b-8295-8ffe42fb7595/Access.AsUser";

const TRUST_GREEN = "#205c40";

// Custom hook for persisting favourites in localStorage
function useFavourites(key = "analyticsFavourites") {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favourites));
  }, [favourites, key]);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );

  return [favourites, toggleFavourite];
}

export default function EducationReports() {
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const [allowedIds, setAllowedIds] = useState(null); // null=loading, []=none, ['id',...]=allowed, 'ALL'=fallback
  const [accessError, setAccessError] = useState(null);

  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  // Fetch allowed report ids for this user (non-blocking; fallback to ALL on failure)
  useEffect(() => {
    let cancelled = false;

    async function loadAccess() {
      if (!accounts[0]) {
        setAllowedIds("ALL"); // fallback; RequireAuth should guard this anyway
        return;
      }
      try {
        const tokenResp = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: [API_SCOPE],
        });

        const resp = await fetch(`${BACKEND_BASE}/api/access/reports`, {
          headers: {
            Authorization: `Bearer ${tokenResp.accessToken}`,
          },
        });

        if (!resp.ok) {
          // If 404 (endpoint not deployed yet) or any error => fallback to ALL
          const txt = await resp.text().catch(() => "");
          throw new Error(`HTTP ${resp.status} ${txt}`.trim());
        }

        const data = await resp.json();
        const list = Array.isArray(data?.allowedReportIds)
          ? data.allowedReportIds
          : [];

        if (!cancelled) {
          setAllowedIds(list);
          setAccessError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setAllowedIds("ALL"); // fallback so the page still works
          setAccessError(
            err?.message || "Couldn’t determine access; showing all."
          );
        }
      }
    }

    loadAccess();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, instance]);

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  // Filter reports: visible + category + allowedIds + search
  const educationReports = useMemo(() => {
    // Limit to DRET / Bromcom
    const base = visibleReports.filter((r) => {
      const cat = Array.isArray(r.category) ? r.category[0] : r.category;
      return cat && ["dret", "bromcom"].includes(String(cat).toLowerCase());
    });

    // Allowed filter
    const allowedFiltered =
      allowedIds === null
        ? [] // still loading → show nothing (spinner could be added if you like)
        : allowedIds === "ALL"
        ? base // fallback path: show all visible; embed endpoint will still enforce auth
        : base.filter((r) => allowedIds.includes(r.id));

    // Search filter
    const term = searchTerm.trim().toLowerCase();
    if (!term) return allowedFiltered;

    return allowedFiltered.filter(
      (r) =>
        r.name?.toLowerCase().includes(term) ||
        r.description?.toLowerCase().includes(term)
    );
  }, [allowedIds, searchTerm]);

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{
          fontFamily:
            "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* --- Top Bar (Heading + Search) --- */}
        <div
          className="shrink-0 z-20 shadow-sm px-8 h-24 flex items-center justify-between"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: TRUST_GREEN }}>
            Education Dashboards
          </h1>
          <div className="relative flex-shrink-0 w-[240px] ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search education reports"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full border ${
                searchFocused ? "" : "border-gray-300"
              } rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
              style={{
                borderColor: searchFocused ? TRUST_GREEN : undefined,
                boxShadow: searchFocused
                  ? `0 0 0 2px ${TRUST_GREEN}40`
                  : undefined,
                fontFamily: "AvenirLTStdLight, Avenir, sans-serif",
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-9 top-2.5 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                <X size={16} />
              </button>
            )}
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Warning bar if we fell back */}
        {allowedIds === "ALL" && accessError && (
          <div className="px-8 py-2 bg-yellow-50 text-yellow-800 text-sm flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>
              Couldn’t determine your report access ({accessError}). Showing all
              visible reports; access is still enforced when you open a report.
            </span>
          </div>
        )}

        {/* --- Report Grid --- */}
        <div className="scroll-area flex-1 overflow-y-auto bg-gray-100 font-avenir p-8 pb-16">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {allowedIds === null ? (
              <div className="text-gray-500 text-center w-full col-span-full">
                Loading available reports…
              </div>
            ) : educationReports.length === 0 ? (
              <div className="text-gray-500 italic text-center w-full col-span-full">
                No education reports available
                {searchTerm ? " for this search." : "."}
              </div>
            ) : (
              educationReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isFavourite={favourites.includes(report.id)}
                  onFavourite={handleFavourite}
                  onClick={() => navigate(report.href)}
                  clickedStar={clickedStar}
                  disabled={report.status === "coming-soon"}
                />
              ))
            )}
          </div>
        </div>

        <style>{`
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        `}</style>
      </div>
    </AnalyticsLayout>
  );
}
