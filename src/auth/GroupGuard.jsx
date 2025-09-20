import React from "react";
import { useMsal } from "@azure/msal-react";
import { isMemberOfAny } from "./groups";
import AccessDeniedPage from "./AccessDeniedPage";

export default function GroupGuard({ allowedGroups = [], fallback = null, children }) {
  const { accounts } = useMsal();
  const account = accounts?.[0];
  const claims = account?.idTokenClaims || {};
  const tokenGroups = claims.groups || [];

  const hasOverage = !!claims?._claim_names?.groups;

  const isAllowed = isMemberOfAny(allowedGroups, tokenGroups);

  if (isAllowed) return <>{children}</>;

  if (fallback) return fallback;

  return (
    <AccessDeniedPage
      requiredGroups={allowedGroups}
      hasOverage={hasOverage}
    />
  );
}