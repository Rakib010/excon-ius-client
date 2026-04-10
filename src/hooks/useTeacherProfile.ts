import { useProfileQuery } from "@/redux/features/auth/auth.api";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import type { TeacherProfile } from "@/types/teacher";

/** Skip RTK calls when no JWT (avoids 401). */
export function useSkipTeacherApi() {
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  return !accessToken;
}

/**
 * Server GET /auth/profile merged with auth context (dev mock বা লগইন পরের স্টেটের জন্য)।
 */
export function useTeacherProfile() {
  const { user: ctxUser } = useAuth();
  const accessToken = useAppSelector((s) => s.auth.accessToken);

  const { data, isLoading, error, refetch } = useProfileQuery(undefined, {
    skip: !accessToken,
  });

  const profile = (data ?? ctxUser) as TeacherProfile | null;
  const isLoadingProfile = isLoading;

  return {
    profile,
    isLoading: isLoadingProfile,
    error,
    refetch,
    teacherId: profile?.id ?? null,
  };
}
