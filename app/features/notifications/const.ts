import type {
  FinanceType,
  NotificationStatus,
  PriorityType,
  ProgressStatus,
  SchoolStatus,
  SubscriptionStatus,
  UserAccountStatus,
} from "~/types";

export const PRIORITY_STYLES: Record<PriorityType, string> = {
  LOW: "bg-[#0EB26B21] text-[#0EB26B]",
  MEDIUM: "bg-[#E59C1521] text-[#E59C15]",
  HIGH: "bg-[#F54F5221] text-[#F54F52]",
};

export const FINANCE_TYPE_STYLES: Record<FinanceType, string> = {
  SUBSCRIPTION: "bg-[#E59C1521] text-[#E59C15]",
  SCHOOL_FEES: "bg-[#1C88BE21] text-[#1C88BE]",
  DISPUTE: "bg-[#881CBE21] text-[#881CBE]",
  REFUND: "bg-[#0EB26B21] text-[#0EB26B]",
};

export const NOTIFICATION_STATUS_STYLES: Record<NotificationStatus, string> = {
  IN_PROGRESS: "bg-[#E59C1521] text-[#E59C15]",
  NEW: "bg-[#0EB26B21] text-[#0EB26B]",
  ASSIGNED: "bg-[#1C88BE21] text-[#1C88BE]",
};

export const SCHOOL_STATUS_STYLES: Record<SchoolStatus, string> = {
  ACTIVE: "bg-[#0EB26B21] text-[#0EB26B]",
  INACTIVE: "bg-[#E59C1521] text-[#E59C15]",
  AT_RISK: "bg-[#F54F5221] text-[#F54F52]",
};

export const SUBSCRIPTION_STATUS_STYLES: Record<SubscriptionStatus, string> = {
  ACTIVE: "bg-[#0EB26B21] text-[#0EB26B]",
  PAYMENT_FAILED: "bg-[#F54F5221] text-[#F54F52]",
};

export const PROGRESS_STATUS_STYLES: Record<ProgressStatus, string> = {
  COMPLETED: "bg-[#0EB26B21] text-[#0EB26B]",
  PENDING: "bg-[#E59C1521] text-[#E59C15]",
};

export const USER_ACCOUNT_STATUS_STYLES: Record<UserAccountStatus, string> = {
  ACTIVE: "bg-[#0EB26B21] text-[#0EB26B]",
  INACTIVE: "bg-[#F54F5221] text-[#F54F52]",
};
