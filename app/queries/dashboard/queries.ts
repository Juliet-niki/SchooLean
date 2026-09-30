import { useQuery } from "@tanstack/react-query";
import {
  SCHOOL_ANALYTICS_DATA,
  PLATFORM_ACTIVITY_DATA,
  PLATFORM_HIGHLIGHTS_DATA,
} from "~/data/platformData";
import { mockDelay } from "~/lib/mockDelay";
import { dashboardKeys } from "./keys";

export interface PlatformStats {
  schoolAnalytics: typeof SCHOOL_ANALYTICS_DATA;
  platformActivity: typeof PLATFORM_ACTIVITY_DATA;
  platformHighlights: typeof PLATFORM_HIGHLIGHTS_DATA;
}

/**
 * Fetches all platform statistics used on the Dashboard page.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/dashboard/stats
 * Response:  PlatformStats
 * Replace the mock block with:
 *   const { data } = await api.get<PlatformStats>('/dashboard/stats');
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function usePlatformStatsQuery() {
  return useQuery<PlatformStats>({
    queryKey: dashboardKeys.platformStats(),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(300);
      return {
        schoolAnalytics: SCHOOL_ANALYTICS_DATA,
        platformActivity: PLATFORM_ACTIVITY_DATA,
        platformHighlights: PLATFORM_HIGHLIGHTS_DATA,
      };
      // ── API: GET /api/dashboard/stats ──────────────────────────────────────
      // const { data } = await api.get<PlatformStats>('/dashboard/stats');
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}
