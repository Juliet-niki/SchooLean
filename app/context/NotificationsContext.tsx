import { createContext, useContext, useState, type ReactNode } from "react";
import { NOTIFICATIONS } from "~/data/notificationData";
import type { INotification, ActionHistory } from "~/types";

interface NotificationsContextValue {
  notifications: INotification[];
  error: string | null;
  clearError: () => void;
  markAsRead: (ids: string[]) => Promise<void>;
  archive: (ids: string[]) => Promise<void>;
  unarchive: (ids: string[]) => Promise<void>;
  addActionTaken: (
    notificationId: string,
    userId: string,
    actionTaken: string,
  ) => Promise<void>;
  removeAttachment: (
    notificationId: string,
    attachmentId: string,
  ) => Promise<void>;
  assignToMember: (
    notificationIds: string[],
    memberId: string,
  ) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const markAsRead = async (ids: string[]) => {
    try {
      // TODAY: synchronous mock
      setNotifications((prev) =>
        prev.map((n) =>
          ids.includes(n.notificationId) ? { ...n, isRead: true } : n,
        ),
      );

      // TOMORROW:
      // const res = await fetch(`/api/notifications/mark-read`, {
      //   method: "POST",
      //   body: JSON.stringify({ ids }),
      // });
      // if (!res.ok) throw new Error("Failed to mark as read");
      // setNotifications(await res.json());
    } catch (err) {
      setError("Couldn't mark notifications as read. Please try again.");
      throw err;
    }
  };

  const archive = async (ids: string[]) => {
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          ids.includes(n.notificationId) ? { ...n, isArchived: true } : n,
        ),
      );
      // TOMORROW: POST /api/notifications/archive
    } catch (err) {
      setError("Couldn't archive notifications. Please try again.");
      throw err;
    }
  };

  const unarchive = async (ids: string[]) => {
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          ids.includes(n.notificationId) ? { ...n, isArchived: false } : n,
        ),
      );
      // TOMORROW: POST /api/notifications/unarchive
    } catch (err) {
      setError("Couldn't unarchive notifications. Please try again.");
      throw err;
    }
  };

  const addActionTaken = async (
    notificationId: string,
    userId: string,
    actionTaken: string,
  ) => {
    try {
      const newEntry: ActionHistory = {
        userId,
        actionTaken,
        TimeStamp: new Date().toISOString(),
      };

      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId
            ? { ...n, actionHistory: [newEntry, ...n.actionHistory] }
            : n,
        ),
      );
      // TOMORROW: POST /api/notifications/:id/actions, then merge server response
    } catch (err) {
      setError("Couldn't save this action. Please try again.");
      throw err;
    }
  };

  const removeAttachment = async (
    notificationId: string,
    attachmentId: string,
  ) => {
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId && n.customerMessage
            ? {
                ...n,
                customerMessage: {
                  ...n.customerMessage,
                  attachments: n.customerMessage.attachments.filter(
                    (file) => file.id !== attachmentId,
                  ),
                },
              }
            : n,
        ),
      );
      // TOMORROW: DELETE /api/notifications/:id/attachments/:attachmentId
    } catch (err) {
      setError("Couldn't remove attachment. Please try again.");
      throw err;
    }
  };

  const assignToMember = async (
    notificationIds: string[],
    memberId: string,
  ) => {
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.notificationId)
            ? { ...n, assignedMember: { userId: memberId } }
            : n,
        ),
      );
      // TOMORROW: POST /api/notifications/assign { notificationIds, memberId }
    } catch (err) {
      setError("Couldn't assign notification. Please try again.");
      throw err;
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        error,
        clearError,
        markAsRead,
        archive,
        unarchive,
        addActionTaken,
        removeAttachment,
        assignToMember,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider",
    );
  }
  return ctx;
}
