import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockDelay } from "~/lib/mockDelay";
import type { ActionHistory, INotification } from "~/types";
import { notificationKeys } from "./keys";

/**
 * Helper: optimistically updates the cached notification list.
 * All mutations use this pattern to give instant UI feedback.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Once on a real API, replace the setQueryData call with invalidateQueries
 * to refetch from the server, or keep optimistic updates and add a rollback
 * in the onError handler.
 * ─────────────────────────────────────────────────────────────────────────────
 */
function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  return (updater: (prev: INotification[]) => INotification[]) => {
    queryClient.setQueryData<INotification[]>(notificationKeys.list(), (prev) =>
      prev ? updater(prev) : prev ?? [],
    );
  };
}

// ─── Mark as Read ─────────────────────────────────────────────────────────────

/**
 * Marks one or more notifications as read.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/notifications/mark-read
 * Request:   { ids: string[] }
 * Response:  204 No Content (or updated notifications array)
 * Replace the mock block with:
 *   await api.post('/notifications/mark-read', { ids });
 *   queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useMarkAsReadMutation() {
  const optimisticUpdate = useOptimisticUpdate();

  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(300);
      // ── API: POST /api/notifications/mark-read ─────────────────────────────
      // await api.post('/notifications/mark-read', { ids });
      // ─────────────────────────────────────────────────────────────────────────
    },
    onMutate: (ids) => {
      optimisticUpdate((prev) =>
        prev.map((n) =>
          ids.includes(n.notificationId) ? { ...n, isRead: true } : n,
        ),
      );
    },
  });
}

// ─── Archive ──────────────────────────────────────────────────────────────────

/**
 * Archives one or more notifications.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/notifications/archive
 * Request:   { ids: string[] }
 * Response:  204 No Content
 * Replace the mock block with:
 *   await api.post('/notifications/archive', { ids });
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useArchiveMutation() {
  const optimisticUpdate = useOptimisticUpdate();

  return useMutation<void, Error, string[]>({
    mutationFn: async (_ids) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(300);
      // ── API: POST /api/notifications/archive ───────────────────────────────
      // await api.post('/notifications/archive', { ids: _ids });
      // ─────────────────────────────────────────────────────────────────────────
    },
    onMutate: (ids) => {
      optimisticUpdate((prev) =>
        prev.map((n) =>
          ids.includes(n.notificationId) ? { ...n, isArchived: true } : n,
        ),
      );
    },
  });
}

// ─── Unarchive ────────────────────────────────────────────────────────────────

/**
 * Unarchives one or more notifications.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/notifications/unarchive
 * Request:   { ids: string[] }
 * Response:  204 No Content
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useUnarchiveMutation() {
  const optimisticUpdate = useOptimisticUpdate();

  return useMutation<void, Error, string[]>({
    mutationFn: async (_ids) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(300);
      // ── API: POST /api/notifications/unarchive ─────────────────────────────
      // await api.post('/notifications/unarchive', { ids: _ids });
      // ─────────────────────────────────────────────────────────────────────────
    },
    onMutate: (ids) => {
      optimisticUpdate((prev) =>
        prev.map((n) =>
          ids.includes(n.notificationId) ? { ...n, isArchived: false } : n,
        ),
      );
    },
  });
}

// ─── Add Action Taken ─────────────────────────────────────────────────────────

interface AddActionPayload {
  notificationId: string;
  userId: string;
  actionTaken: string;
}

/**
 * Appends an action entry to a notification's action history.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/notifications/:id/actions
 * Request:   { userId: string; actionTaken: string }
 * Response:  Updated INotification (or 204 + invalidate)
 * Replace the mock block with:
 *   await api.post(`/notifications/${notificationId}/actions`, { userId, actionTaken });
 *   queryClient.invalidateQueries({ queryKey: notificationKeys.detail(notificationId) });
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useAddActionTakenMutation() {
  const optimisticUpdate = useOptimisticUpdate();

  return useMutation<void, Error, AddActionPayload>({
    mutationFn: async (_payload) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      // ── API: POST /api/notifications/:id/actions ───────────────────────────
      // await api.post(`/notifications/${_payload.notificationId}/actions`, {
      //   userId: _payload.userId,
      //   actionTaken: _payload.actionTaken,
      // });
      // ─────────────────────────────────────────────────────────────────────────
    },
    onMutate: ({ notificationId, userId, actionTaken }) => {
      const newEntry: ActionHistory = {
        userId,
        actionTaken,
        TimeStamp: new Date().toISOString(),
      };
      optimisticUpdate((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId
            ? { ...n, actionHistory: [newEntry, ...n.actionHistory] }
            : n,
        ),
      );
    },
  });
}

// ─── Remove Attachment ────────────────────────────────────────────────────────

interface RemoveAttachmentPayload {
  notificationId: string;
  attachmentId: string;
}

/**
 * Removes an attachment from a notification's customer message.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  DELETE /api/notifications/:id/attachments/:attachmentId
 * Response:  204 No Content
 * Replace the mock block with:
 *   await api.delete(`/notifications/${notificationId}/attachments/${attachmentId}`);
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useRemoveAttachmentMutation() {
  const optimisticUpdate = useOptimisticUpdate();

  return useMutation<void, Error, RemoveAttachmentPayload>({
    mutationFn: async (_payload) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(300);
      // ── API: DELETE /api/notifications/:id/attachments/:attachmentId ────────
      // await api.delete(
      //   `/notifications/${_payload.notificationId}/attachments/${_payload.attachmentId}`,
      // );
      // ─────────────────────────────────────────────────────────────────────────
    },
    onMutate: ({ notificationId, attachmentId }) => {
      optimisticUpdate((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId && n.customerMessage
            ? {
                ...n,
                customerMessage: {
                  ...n.customerMessage,
                  attachments: n.customerMessage.attachments.filter(
                    (f) => f.id !== attachmentId,
                  ),
                },
              }
            : n,
        ),
      );
    },
  });
}

// ─── Assign to Member ─────────────────────────────────────────────────────────

interface AssignToMemberPayload {
  notificationIds: string[];
  memberId: string;
}

/**
 * Assigns one or more notifications to a team member.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/notifications/assign
 * Request:   { notificationIds: string[]; memberId: string }
 * Response:  204 No Content
 * Replace the mock block with:
 *   await api.post('/notifications/assign', { notificationIds, memberId });
 *   queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useAssignToMemberMutation() {
  const optimisticUpdate = useOptimisticUpdate();

  return useMutation<void, Error, AssignToMemberPayload>({
    mutationFn: async (_payload) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      // ── API: POST /api/notifications/assign ────────────────────────────────
      // await api.post('/notifications/assign', {
      //   notificationIds: _payload.notificationIds,
      //   memberId: _payload.memberId,
      // });
      // ─────────────────────────────────────────────────────────────────────────
    },
    onMutate: ({ notificationIds, memberId }) => {
      optimisticUpdate((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.notificationId)
            ? { ...n, assignedMember: { userId: memberId } }
            : n,
        ),
      );
    },
  });
}
