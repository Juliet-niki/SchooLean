import { useQuery } from "@tanstack/react-query";
import { ADMIN_ACTIVITY_LOGS } from "~/data/adminData";
import { mockDelay } from "~/lib/mockDelay";
import type { IAdminActivityLog } from "~/types";
import { adminToolsKeys } from "./keys";

/**
 * Fetches the admin tools activity log — the audit trail of every admin
 * tool that's been run (who ran it, when, why, from where).
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/admin-tools/activity-log
 * Response:  IAdminActivityLog[]
 * Replace the mock block with:
 *   const { data } = await api.get<IAdminActivityLog[]>('/admin-tools/activity-log');
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useAdminActivityLogQuery() {
  return useQuery<IAdminActivityLog[]>({
    queryKey: adminToolsKeys.activityLog(),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      return ADMIN_ACTIVITY_LOGS;
      // ── API: GET /api/admin-tools/activity-log ──────────────────────────────
      // const { data } = await api.get<IAdminActivityLog[]>(
      //   '/admin-tools/activity-log',
      // );
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}