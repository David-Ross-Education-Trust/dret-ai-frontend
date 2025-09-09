import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

// Same scopes you already use to grab the idToken for your backend
const ID_TOKEN_SCOPES = ["openid", "profile"];

// Centralise your API base (matches your report.js)
const API_BASE = "https://dretai-backend-fkf6bhgug2f3eney.uksouth-01.azurewebsites.net/api";

/**
 * Fetches the list of report IDs the current user is allowed to see.
 * Returns { loading, error, allowed }.
 */
export function useAllowedReports() {
  const { instance, accounts } = useMsal();
  const [state, setState] = useState({ loading: true, error: null, allowed: [] });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!accounts?.[0]) {
        if (!cancelled) setState({ loading: false, error: null, allowed: [] });
        return;
      }
      try {
        const tokenResp = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: ID_TOKEN_SCOPES,
        });

        const res = await fetch(`${API_BASE}/powerbi/allowed-reports`, {
          method: "GET",
          headers: { Authorization: `Bearer ${tokenResp.idToken}` },
        });

        const data = await res.json();
        if (cancelled) return;

        if (!res.ok) {
          setState({
            loading: false,
            error: data?.error || `HTTP ${res.status}`,
            allowed: [],
          });
        } else {
          setState({
            loading: false,
            error: null,
            allowed: data?.allowedReports || [],
          });
        }
      } catch (e) {
        if (!cancelled) {
          setState({ loading: false, error: e?.message || "Token error", allowed: [] });
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [accounts, instance]);

  return state;
}
