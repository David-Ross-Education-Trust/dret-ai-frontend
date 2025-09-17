import React from "react";
import { useMsal } from "@azure/msal-react";
import { isMemberOfAny } from "./groups";

export default function GroupGuard({ allowedGroups = [], fallback = null, children }) {
  const { accounts } = useMsal();
  const account = accounts?.[0];
  const claims = account?.idTokenClaims || {};
  const tokenGroups = claims.groups || [];

  // NOTE: If AAD group overage occurs, Azure puts a "_claim_names": {"groups": ...}
  // and omits the "groups" array. In that case you'll need a Graph fallback.
  const hasOverage = !!claims?._claim_names?.groups;

  const isAllowed = isMemberOfAny(allowedGroups, tokenGroups);

  if (isAllowed) return <>{children}</>;

  // Simple 403 fallback
  return (
    fallback ?? (
      <div className="p-8 max-w-xl">
        <h1 className="text-2xl font-semibold mb-2">403 — Not authorized</h1>
        {hasOverage ? (
          <p className="text-gray-700">
            You don’t have access to this page.
            If you believe this is an error, please contact itsupport@dret.co.uk.
          </p>
        ) : (
          <p className="text-gray-700">
            You don’t have access to this page.
            If you believe this is an error, please contact itsupport@dret.co.uk.
          </p>
        )}
      </div>
    )
  );
}
