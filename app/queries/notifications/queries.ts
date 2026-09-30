import { useQuery } from "@tanstack/react-query";
import { NOTIFICATIONS } from "~/data/notificationData";
import { TEAM_MEMBERS } from "~/data/teamMembersData";
import { mockDelay } from "~/lib/mockDelay";
import type { INotification, ITeamMember } from "~/types";
import { notificationKeys } from "./keys";

/**
 * Fetches the full notifications list.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/notifications
 * Response:  INotification[]
 * Replace the mock block with:
 *   const { data } = await api.get<INotification[]>('/notifications');
 *   return data;
 * Consider adding query params for pagination/filtering:
 *   api.get('/notifications', { params: { page, limit, tab, category } })
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useNotificationsQuery() {
  return useQuery<INotification[]>({
    queryKey: notificationKeys.list(),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      return NOTIFICATIONS;
      // ── API: GET /api/notifications ────────────────────────────────────────
      // const { data } = await api.get<INotification[]>('/notifications');
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
    // Notifications should be relatively fresh — override the 5-min default
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Fetches a single notification by ID.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/notifications/:id
 * Response:  INotification
 * Replace the mock block with:
 *   const { data } = await api.get<INotification>(`/notifications/${id}`);
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useNotificationDetailQuery(id: string) {
  return useQuery<INotification | undefined>({
    queryKey: notificationKeys.detail(id),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(300);
      return NOTIFICATIONS.find((n) => n.notificationId === id);
      // ── API: GET /api/notifications/:id ────────────────────────────────────
      // const { data } = await api.get<INotification>(`/notifications/${id}`);
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
    enabled: !!id,
  });
}

/**
 * Fetches the list of team members for the assign-ticket dropdown.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/team-members
 * Response:  ITeamMember[]
 * Replace the mock block with:
 *   const { data } = await api.get<ITeamMember[]>('/team-members');
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useTeamMembersQuery() {
  return useQuery<ITeamMember[]>({
    queryKey: notificationKeys.teamMembers(),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(200);
      return TEAM_MEMBERS;
      // ── API: GET /api/team-members ─────────────────────────────────────────
      // const { data } = await api.get<ITeamMember[]>('/team-members');
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
    staleTime: 10 * 60 * 1000, // Team list rarely changes — 10 minutes
  });
}
