import { useQuery } from "@tanstack/react-query";
import { ANNOUNCEMENTS, type IAnnouncement } from "~/data/announcementData";
import { mockDelay } from "~/lib/mockDelay";
import { announcementKeys } from "./keys";

/**
 * Fetches the announcements list.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/announcements
 * Response:  IAnnouncement[]
 * Replace the mock block with:
 *   const { data } = await api.get<IAnnouncement[]>('/announcements');
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useAnnouncementsQuery() {
  return useQuery<IAnnouncement[]>({
    queryKey: announcementKeys.list(),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      return ANNOUNCEMENTS;
      // ── API: GET /api/announcements ────────────────────────────────────────
      // const { data } = await api.get<IAnnouncement[]>('/announcements');
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}
