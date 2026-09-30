export const userKeys = {
  all: () => ["schoolean-users"] as const,
  list: () => [...userKeys.all(), "list"] as const,
  detail: (userId: string, schoolId: string) =>
    [...userKeys.all(), "detail", userId, schoolId] as const,
};
