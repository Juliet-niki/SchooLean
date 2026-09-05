export const ANNOUNCEMENTS: IAnnouncement[] = [
  {
    id: "ANCMT-001",
    status: "SCHEDULED",
    title: "Scheduled System Maintenance",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "ALL_USERS",
    createdBy: {
      id: "USR002",
      name: "Emily Amadi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    schedule: {
      scheduledFor: "2026-08-16T06:50:00Z",
      status: "SCHEDULED",
    },
  },

  {
    id: "ANCMT-002",
    status: "SCHEDULED",
    title: "New Feature: Online Exam",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "TEACHERS",
    createdBy: {
      id: "USR003",
      name: "John Akandu",
    },
    createdAt: "2026-08-14T06:50:00Z",
    schedule: {
      scheduledFor: "2026-08-16T06:50:00Z",
      status: "SCHEDULED",
    },
  },

  {
    id: "ANCMT-003",
    status: "SCHEDULED",
    title: "Happy New Term!",
    deliveryChannels: ["EMAIL"],
    audience: "STUDENTS",
    createdBy: {
      id: "USR004",
      name: "Petter Amadi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    schedule: {
      scheduledFor: "2026-08-16T06:50:00Z",
      status: "SCHEDULED",
    },
  },

  {
    id: "ANCMT-004",
    status: "SCHEDULED",
    title: "Subscription Price Update",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "SCHOOL_ADMINS",
    createdBy: {
      id: "USR005",
      name: "Grace Onyedi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    schedule: {
      scheduledFor: "2026-08-16T06:50:00Z",
      status: "SCHEDULED",
    },
  },

  {
    id: "ANCMT-005",
    status: "SCHEDULED",
    title: "Security Advisory Notice",
    deliveryChannels: ["IN_APP"],
    audience: "ALL_USERS",
    createdBy: {
      id: "USR006",
      name: "James Chen",
    },
    createdAt: "2026-08-14T06:50:00Z",
    schedule: {
      scheduledFor: "2026-08-16T06:50:00Z",
      status: "SCHEDULED",
    },
  },
  {
    id: "ANCMT-0011",
    status: "SCHEDULED",
    title: "Scheduled System Maintenance",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "ALL_USERS",
    createdBy: {
      id: "USR002",
      name: "Emily Amadi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    schedule: {
      scheduledFor: "2026-08-16T06:50:00Z",
      status: "SCHEDULED",
    },
  },

  // SENT ANNOUNCEMENTS
  {
    id: "ANCMT-006",
    status: "SENT",
    title: "Scheduled System Maintenance",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "ALL_USERS",
    createdBy: {
      id: "USR002",
      name: "Emily Amadi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    delivery: {
      sentAt: "2026-08-14T08:50:00Z",
      status: "DELIVERED",
    },
    analytics: {
      totalRecipients: 2458,
      totalDelivered: 2398,
      totalFailed: 60,
      totalRead: 1870,
      readRate: 78.2,
    },
  },

  {
    id: "ANCMT-007",
    status: "SENT",
    title: "New Feature: Online Exam",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "TEACHERS",
    createdBy: {
      id: "USR003",
      name: "John Akandu",
    },
    createdAt: "2026-08-14T06:50:00Z",
    delivery: {
      sentAt: "2026-08-14T08:50:00Z",
      status: "DELIVERED",
    },
    analytics: {
      totalRecipients: 3245,
      totalDelivered: 3245,
      totalFailed: 35,
      totalRead: 2567,
      readRate: 86.0,
    },
  },

  {
    id: "ANCMT-008",
    status: "SENT",
    title: "Happy New Term!",
    deliveryChannels: ["EMAIL"],
    audience: "STUDENTS",
    createdBy: {
      id: "USR004",
      name: "Petter Amadi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    delivery: {
      sentAt: "2026-08-14T08:50:00Z",
      status: "DELIVERED",
    },
    analytics: {
      totalRecipients: 1234,
      totalDelivered: 1234,
      totalFailed: 14,
      totalRead: 885,
      readRate: 82.4,
    },
  },

  {
    id: "ANCMT-009",
    status: "SENT",
    title: "Subscription Price Update",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "SCHOOL_ADMINS",
    createdBy: {
      id: "USR005",
      name: "Grace Onyedi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    delivery: {
      sentAt: "2026-08-14T08:50:00Z",
      status: "DELIVERED",
    },
    analytics: {
      totalRecipients: 876,
      totalDelivered: 876,
      totalFailed: 11,
      totalRead: 801,
      readRate: 75.6,
    },
  },

  {
    id: "ANCMT-010",
    status: "SENT",
    title: "Security Advisory Notice",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "ALL_USERS",
    createdBy: {
      id: "USR006",
      name: "James Chen",
    },
    createdAt: "2026-08-14T06:50:00Z",
    delivery: {
      sentAt: "2026-08-14T08:50:00Z",
      status: "DELIVERED",
    },
    analytics: {
      totalRecipients: 2134,
      totalDelivered: 2134,
      totalFailed: 24,
      totalRead: 1875,
      readRate: 78.4,
    },
  },
  {
    id: "ANCMT-0012",
    status: "SENT",
    title: "Scheduled System Maintenance",
    deliveryChannels: ["IN_APP", "EMAIL"],
    audience: "ALL_USERS",
    createdBy: {
      id: "USR002",
      name: "Emily Amadi",
    },
    createdAt: "2026-08-14T06:50:00Z",
    delivery: {
      sentAt: "2026-08-14T08:50:00Z",
      status: "DELIVERED",
    },
    analytics: {
      totalRecipients: 2458,
      totalDelivered: 2398,
      totalFailed: 60,
      totalRead: 1870,
      readRate: 78.2,
    },
  },
];

export interface IAnnouncement {
  id: string;
  title: string;
  deliveryChannels: DeliveryChannel[];
  audience: Audience;
  createdBy: UserSummary;
  createdAt: string;
  status: AnnouncementStatus;
  schedule?: AnnouncementSchedule;
  delivery?: AnnouncementDelivery;
  analytics?: AnnouncementAnalytics;
}

export interface UserSummary {
  id: string;
  name: string;
}

export interface AnnouncementSchedule {
  scheduledFor: string;
  status: ScheduleStatus;
  cancelledAt?: string;
  cancelledBy?: UserSummary;
}

export interface AnnouncementDelivery {
  sentAt: string;
  status: DeliveryStatus;
}

export interface AnnouncementAnalytics {
  totalRecipients: number;
  totalDelivered: number;
  totalFailed: number;
  totalRead: number;
  readRate: number;
}

export type DeliveryChannel = "IN_APP" | "EMAIL";

export type Audience =
  | "ALL_USERS"
  | "TEACHERS"
  | "STUDENTS"
  | "PARENTS"
  | "SCHOOL_ADMINS";

export type AnnouncementStatus = "DRAFT" | "SCHEDULED" | "SENT" | "CANCELLED";

export type ScheduleStatus = "SCHEDULED" | "CANCELLED" | "COMPLETED";

export type DeliveryStatus =
  | "PENDING"
  | "SENDING"
  | "DELIVERED"
  | "PARTIALLY_DELIVERED"
  | "FAILED";

//*****
//*****
//*****
//*****
//*****
//*****
// ANNOUNCEMENTS TEMPLATES

export interface IAnnouncementTemplate {
  id: string;
  name: string;
  category: AnnouncementCategory;
  audience: Audience;
  message: string;
  createdBy: UserSummary;
  createdAt: string;
}

export type AnnouncementCategory =
  | "SYSTEM_UPDATE"
  | "MAINTENANCE"
  | "FEATURE_RELEASE"
  | "SECURITY"
  | "GENERAL_NOTICE"
  | "BILLING"
  | "EMERGENCY";

export const ANNOUNCEMENT_TEMPLATES: IAnnouncementTemplate[] = [
  {
    id: "TPL-001",
    name: "Scheduled Maintenance",
    category: "SYSTEM_UPDATE",
    audience: "ALL_USERS",
    message: "The system will be unavailable for scheduled maintenance.",
    createdBy: { id: "USR002", name: "Emily Amadi" },
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "TPL-002",
    name: "Happy New Term",
    category: "GENERAL_NOTICE",
    audience: "ALL_USERS",
    message: "We wish all our students and staff a wonderful new term ahead.",
    createdBy: { id: "USR002", name: "Emily Amadi" },
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "TPL-003",
    name: "Welcome to Schoolean",
    category: "GENERAL_NOTICE",
    audience: "ALL_USERS",
    message:
      "Welcome to Schoolean! We're excited to have your school on board.",
    createdBy: { id: "USR002", name: "Emily Amadi" },
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "TPL-004",
    name: "Feature Update",
    category: "FEATURE_RELEASE",
    audience: "SCHOOL_ADMINS",
    message: "We've rolled out new features to improve your experience.",
    createdBy: { id: "USR002", name: "Emily Amadi" },
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "TPL-005",
    name: "Security Advisory",
    category: "SECURITY",
    audience: "ALL_USERS",
    message: "Please review the recent security update to your account.",
    createdBy: { id: "USR002", name: "Emily Amadi" },
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "TPL-006",
    name: "Payment Reminder",
    category: "BILLING",
    audience: "SCHOOL_ADMINS",
    message: "This is a reminder that your subscription payment is due.",
    createdBy: { id: "USR002", name: "Emily Amadi" },
    createdAt: "2026-05-25T00:00:00Z",
  },
];
