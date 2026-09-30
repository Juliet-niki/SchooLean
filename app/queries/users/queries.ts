import { useQuery } from "@tanstack/react-query";
import { SCHOOLEAN_USER_DATA } from "~/data/schooleanUsersData";
import { mockDelay } from "~/lib/mockDelay";
import type { ISchooleanUser, ISchoolSummary } from "~/data/schooleanUsersData";
import { userKeys } from "./keys";

/**
 * Fetches the full list of Schoolean platform users.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/users
 * Query params: ?page=1&limit=20&role=TEACHER&status=ACTIVE&search=...
 * Response:  ISchooleanUser[]  (or paginated: { data: ISchooleanUser[]; total: number })
 * Replace the mock block with:
 *   const { data } = await api.get<ISchooleanUser[]>('/users');
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useSchooleanUsersQuery() {
  return useQuery<ISchooleanUser[]>({
    queryKey: userKeys.list(),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(500);
      return SCHOOLEAN_USER_DATA;
      // ── API: GET /api/users ────────────────────────────────────────────────
      // const { data } = await api.get<ISchooleanUser[]>('/users');
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}

/**
 * Fetches a single Schoolean user's detail view.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/users/:userId/schools/:schoolId
 * Response:  ISchooleanUser
 * Replace the mock block with:
 *   const { data } = await api.get<ISchooleanUser>(`/users/${userId}/schools/${schoolId}`);
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useSchooleanUserDetailsQuery(userId: string, schoolId: string) {
  return useQuery<ISchooleanUser | undefined>({
    queryKey: userKeys.detail(userId, schoolId),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      return SCHOOLEAN_USER_DATA.find(
        (u: ISchooleanUser) => u.userID === userId && u.schoolSummary.some((s: ISchoolSummary) => s.schoolID === schoolId),
      );
      // ── API: GET /api/users/:userId/schools/:schoolId ──────────────────────
      // const { data } = await api.get<ISchooleanUser>(`/users/${userId}/schools/${schoolId}`);
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
    enabled: !!userId && !!schoolId,
  });
}
