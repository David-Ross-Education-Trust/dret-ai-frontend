export const GROUPS = {
  WORKING_GROUP: "fb120534-ff47-4f9b-a0a1-697499205535",
  EDUCATION:     "418a7cea-db25-4f14-97b1-a42fec769a68",
  OPERATIONS:    "519bdce2-50e2-4bdf-81dd-02e6d784049b",
  FINANCE:       "bf7041f3-93b0-4388-83b3-775a48416c17",
  IT_DATA:       "dd6aede9-82f1-46ff-a095-1f2ee725ea12",
  HR:            "00eab1ce-38ba-48e9-9404-7544a7a25bc5",
  GOVERNANCE:    "3fe5465a-e2e6-48be-8461-3241747ba0d7"
};

export function isMemberOfAny(requiredGroups = [], userGroups = []) {
  if (!requiredGroups.length) return true;
  if (!Array.isArray(userGroups) || !userGroups.length) return false;
  const set = new Set(userGroups.map(String));
  return requiredGroups.some(g => set.has(String(g)));
}
