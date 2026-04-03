export const role = {
  superAdmin: "SUPER_ADMIN",
  admin: "ADMIN",
  teacher: "TEACHER",
} as const;

/** API/JWT থেকে আসা role স্ট্রিং রাউট চেকের জন্য এক ফরম্যাটে আনে। */
export function normalizeRoleForRoute(r: string | null | undefined): string {
  if (r == null || String(r).trim() === "") return "";
  const u = String(r).trim().toUpperCase().replace(/\s+/g, "_");
  if (u === "SUPERADMIN") return role.superAdmin;
  return u;
}

