export const dashboardKeys = {
  all: () => ["dashboard"] as const,
  platformStats: () => [...dashboardKeys.all(), "platform-stats"] as const,
};