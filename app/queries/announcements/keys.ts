export const announcementKeys = {
  all: () => ["announcements"] as const,
  list: () => [...announcementKeys.all(), "list"] as const,
};