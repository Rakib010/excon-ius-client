import { role } from "@/constants/role";

/**
 * Login ছাড়াই UI/route কাজ করাতে `.env` এ সেট করুন:
 *   VITE_DEV_MOCK_AUTH=true
 *   VITE_DEV_MOCK_ROLE=ADMIN   | SUPER_ADMIN | TEACHER
 * প্রোডাকশনে এগুলো false/অপসারণ করুন।
 */
export const DEV_MOCK_AUTH_ENABLED = import.meta.env.VITE_DEV_MOCK_AUTH === "true";

function normalizeMockRole(): string {
  const env = import.meta.env.VITE_DEV_MOCK_ROLE as string | undefined;
  if (!env?.trim()) return role.admin;
  const raw = env.trim().toUpperCase().replace(/\s+/g, "_");
  if (raw === "SUPERADMIN") return role.superAdmin;
  if (raw === role.superAdmin || raw === role.admin || raw === role.teacher) return raw;
  return role.admin;
}

export const DEV_MOCK_ROLE = normalizeMockRole();

export const DEV_MOCK_USER = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Dev (mock)",
  email: "dev@localhost",
  role: DEV_MOCK_ROLE,
} as const;

export function isDevMockAuthEnabled(): boolean {
  return DEV_MOCK_AUTH_ENABLED;
}
