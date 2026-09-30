import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockDelay } from "~/lib/mockDelay";
import { schoolKeys } from "./keys";

interface ToggleSuspensionPayload {
  schoolId: string;
  suspend: boolean;
}

/**
 * Suspends or re-activates a school.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  PATCH /api/schools/:schoolId/suspension
 * Request:   { suspend: boolean }
 * Response:  204 No Content (or the updated ISchool)
 * Replace the mock block with:
 *   await api.patch(`/schools/${schoolId}/suspension`, { suspend });
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useToggleSchoolSuspensionMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ToggleSuspensionPayload>({
    mutationFn: async (_payload) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      // ── API: PATCH /api/schools/:schoolId/suspension ────────────────────────
      // await api.patch(`/schools/${_payload.schoolId}/suspension`, {
      //   suspend: _payload.suspend,
      // });
      // ─────────────────────────────────────────────────────────────────────────
    },
    onSuccess: (_data, { schoolId }) => {
      // No optimistic update here — suspensionStatus lives inside the full
      // ISchool detail object, and it's simpler/safer to just refetch it than
      // to hand-patch a nested field in the cache.
      queryClient.invalidateQueries({ queryKey: schoolKeys.detail(schoolId) });
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
    },
  });
}