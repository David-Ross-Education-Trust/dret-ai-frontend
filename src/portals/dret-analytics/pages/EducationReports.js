// src/portals/dret-analytics/pages/EducationReports.js
import React, { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import AnalyticsLayout from "../components/layout";
import ReportCard from "../components/reportCard";
import { visibleReports } from "../components/reportConfig";

// 🔧 Set these via env vars in your Static Web App if possible
const API_BASE =
  process.env.REACT_APP_BACKEND_URL ||
  "https://dretai-backend-fkf6bhgug2f3eney.uksouth-01.azurewebsites.net";
const API_SCOPE =
  process.env.REACT_APP_API_SCOPE ||
  "api://6080bbaa-4454-430b-8295-8ffe42fb7595/Access.AsUser"; // <-- your real scope

// Local favourites hook
function useFavourites(key = "analyticsFavourites") {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
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
  const TRUST_GREEN = "#205c40";
  const navigate = useNavigate();
  const [favourites, toggleFavourite] = useFavourites();
  const [clickedStar, setClickedStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // --- NEW: fetch allowed report ids from backend using ACCESS token
  const { instance, accounts } = useMsal();
  const [allowedIds, setAllowedIds] = useState(null); // null = loading; [] = none
  const [accessErr, setAccessErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAllowed() {
      setAccessErr(null);
      setAllowedIds(null); // loading

      try {
        if (!accounts[0]) throw new Error("Not signed in");

        // 🔐 ACCESS token for your API scope (NOT idToken)
        const tokenResp = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: [API_SCOPE],
        });

        const res = await fetch(`${API_BASE}/api/powerbi/allowed-reports`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenResp.accessToken}`,
          },
        });

        if (!res.ok) {
          // Show server message if present
          let msg = `${res.status} ${res.statusText}`;
          try {
            const body = await res.json();
            if (body?.error) msg = body.error;
          } catch {}
          throw new Error(msg);
        }

        const data = await res.json();
        if (!cancelled) setAllowedIds(Array.isArray(data?.allowed) ? data.allowed : []);
      } catch (err) {
        if (!cancelled) {
          setAccessErr(err?.message || "Failed to fetch");
          setAllowedIds([]); // safe default: show none
        }
      }
    }

    loadAllowed();
    return () => {
      cancelled = true;
    };
  }, [instance, accounts]);

  // Search + category filter
  const educationReports = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return visibleReports.filter((r) => {
      // category filter
      const cat = Array.isArray(r.category) ? r.category[0] : r.category;
      const inCategory = cat && ["dret", "bromcom"].includes(String(cat).toLowerCase());

      // search
      const matchesSearch =
        !term ||
        r.name?.toLowerCase().includes(term) ||
        r.description?.toLowerCase().includes(term);

      // access (only apply once we have allowedIds loaded)
      const hasAccess = allowedIds ? allowedIds.includes(r.id) : false;

      return inCategory && matchesSearch && hasAccess;
    });
  }, [allowedIds, searchTerm]);

  const handleFavourite = (id) => {
    toggleFavourite(id);
    setClickedStar(id);
    setTimeout(() => setClickedStar(null), 400);
  };

  const header = (
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
          className={`w-full border ${searchFocused ? "" : "border-gray-300"} rounded-md px-4 py-2 pr-10 text-sm outline-none transition`}
          style={{
            borderColor: searchFocused ? TRUST_GREEN : undefined,
            boxShadow: searchFocused ? `0 0 0 2px ${TRUST_GREEN}40` : undefined,
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
  );

  return (
    <AnalyticsLayout>
      <div
        className="bg-gray-100 min-h-screen h-screen flex flex-col font-avenir"
        style={{ fontFamily: "AvenirLTStdLight, Avenir, ui-sans-serif, system-ui, sans-serif" }}
      >
        {header}

        {/* ---- ACCESS STATUS / GRID ---- */}
        <div className="scroll-area flex-1 overflow-y-auto bg-gray-100 font-avenir p-8 pb-16">
          {/* Loading */}
          {allowedIds === null && (
            <div className="text-gray-600 italic text-center w-full">
              Checking your report access…
            </div>
          )}

          {/* Error */}
          {allowedIds !== null && accessErr && (
            <div className="w-full text-center">
              <div className="text-red-600 font-medium">
                Couldn’t determine your report access. Showing none.
              </div>
              <div className="text-gray-500 mt-1">{accessErr}</div>
              <button
                className="mt-4 px-4 py-2 rounded bg-white border border-gray-300 shadow-sm hover:bg-gray-50"
                onClick={() => {
                  // force a refetch by clearing state; the effect will run again
                  setAllowedIds(null);
                }}
              >
                Try again
              </button>
            </div>
          )}

          {/* Grid */}
          {allowedIds !== null && !accessErr && (
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
              {educationReports.length === 0 ? (
                <div className="text-gray-500 italic text-center w-full col-span-full">
                  No education reports available{searchTerm ? " for this search." : "."}
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
          )}
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
