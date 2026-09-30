export const adminToolsKeys = {
  all: () => ["admin-tools"] as const,
  activityLog: () => [...adminToolsKeys.all(), "activity-log"] as const,
};