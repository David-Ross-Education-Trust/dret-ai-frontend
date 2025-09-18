import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const ID_TOKEN_SCOPES = ["openid", "profile"];
const API_BASE = "https://dretai-backend-fkf6bhgug2f3eney.uksouth-01.azurewebsites.net/api";

export function useAllowedReports() {
  const { instance, accounts } = useMsal();
  const [state, setState] = useState({ loading: true, error: null, allowed: [] });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const getIdToken = async (forceRefresh = false) => {
      try {
        return await instance.acquireTokenSilent({
          account: accounts?.[0],
          scopes: ID_TOKEN_SCOPES,
          forceRefresh,
        });
      } catch (e) {
        if (e?.errorCode === "interaction_required") {
          await instance.acquireTokenRedirect({ scopes: ID_TOKEN_SCOPES });
          return null;
        }
        throw e;
      }
    };

    const run = async () => {
      if (!accounts?.[0]) {
        if (!cancelled) setState({ loading: false, error: null, allowed: [] });
        return;
      }
      try {
        let tokenResp = await getIdToken(false);
        if (!tokenResp) return;

        let res = await fetch(`${API_BASE}/powerbi/allowed-reports`, {
          method: "GET",
          headers: { Authorization: `Bearer ${tokenResp.idToken}` },
          signal: controller.signal,
        });

        if (res.status === 401) {
          tokenResp = await getIdToken(true);
          if (!tokenResp) return;
          res = await fetch(`${API_BASE}/powerbi/allowed-reports`, {
            method: "GET",
            headers: { Authorization: `Bearer ${tokenResp.idToken}` },
            signal: controller.signal,
          });
        }

        const data = await res.json().catch(() => null);
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
            allowed: Array.isArray(data?.allowedReports) ? data.allowedReports : [],
          });
        }
      } catch (e) {
        if (!cancelled && e?.name !== "AbortError") {
          setState({ loading: false, error: e?.message || "Request failed", allowed: [] });
        }
      }
    };

    run();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [accounts, instance]);

  return state;
}
