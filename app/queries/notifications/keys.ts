/**
 * Query key factory for notifications.
 * Centralising keys prevents typos and makes cache invalidation predictable.
 *
 * Usage:
 *   queryClient.invalidateQueries({ queryKey: notificationKeys.all() })
 *   queryClient.invalidateQueries({ queryKey: notificationKeys.detail(id) })
 */
export const notificationKeys = {
  /** Invalidates everything under the notifications namespace */
  all: () => ["notifications"] as const,

  /** The full list of notifications */
  list: () => [...notificationKeys.all(), "list"] as const,

  /** A single notification by ID */
  detail: (id: string) => [...notificationKeys.all(), "detail", id] as const,

  /** Team members (used in assign-ticket) */
  teamMembers: () => [...notificationKeys.all(), "team-members"] as const,
};
