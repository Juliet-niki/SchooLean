import type { ReactNode } from "react";

export interface IUserData {
  userId: string;
  userFirstName: string;
  userMiddleName: string;
  userLastName: string;
  profilePicture: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  isLoggedIn: boolean;
  isVerified: boolean;
  accessCode: string;
  password: string;
  role: string;
  totalOpenTickets: number;
}

export type VerifyPageState = {
  identifier: string;
  type: "email" | "phone";
  context: "register" | "forgot-password";
};

// SCHOOL MANAGEMENT
export interface IAdmin {
  adminId: number;
  name: string;
  email: string;
  role: string;
  profilePic: null | string;
}

export interface ITeacher {
  teacherId: number;
  name: string;
  email: string;
  profilePic: null | string;
  assignedSubjects: string[];
  assignedClass: string[];
  status: "ACTIVE" | "INACTIVE";
}

export interface IStudent {
  studentId: number;
  name: string;
  profilePic: null | string;
  class: string;
  classArm: string;
  gender: string;
  age: number;
  attendanceRate: number;
  averageGrade: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface IParent {
  parentId: number;
  name: string;
  profilePic: null | string;
  linkedChildren: {
    studentId: number;
  }[];
  loginActivity: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface IReportCard {
  reportCardId: number;
  studentId: number;
  session: string;
  term: "1st Term" | "2nd Term" | "3rd Term";
  generatedOn: string;
  averageGrade: number | null;
  status: "PENDING" | "COMPLETED";
}

export interface IPerformanceTrend {
  term: string;
  average: number;
}

export interface ISubjectPerformance {
  subject: string;
  average: number;
}

export interface IClassPerformance {
  class: string;
  average: number;
}

export interface ISmartInsight {
  type: "warning" | "success";
  subject: string;
  message: string;
  change: number;
}

export interface IPerformanceAnalytics {
  schoolAverage: number;
  topClass: { name: string; average: number };
  lowestScore: { subject: string; score: number };
  bestPerforming: { subject: string; score: number };
  reportCardsGenerated: number;
  performanceTrend: IPerformanceTrend[];
  subjectPerformance: ISubjectPerformance[];
  classPerformance: IClassPerformance[];
  smartInsights: ISmartInsight[];
}

export interface ISubject {
  category: string;
  coreSubjects: string[];
  NAPPSSchemeofWorkSubjects: string[];
  optionalEnrichmentSubjects: string[];
}

export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED";
export type PlanType = "PREMIUM" | "FREE_TRIAL" | "STANDARD";

export interface ISubscriptionPlan {
  planName: PlanType;
  amount: number;
  billingCycleDays: number;
  billingCycleStart: string;
  billingCycleEnd: string;
  gracePeriod: string;
}

export interface ISchoolPaymentHistory {
  paymentId: number;
  date: string;
  referenceId: string;
  amount: number;
  status: PaymentStatus;
}

export interface ISchoolFailedTransaction {
  transactionId: number;
  date: string;
  referenceId: string;
  amount: number;
  receiptError: "Network Error" | "Insufficient Funds" | string;
}

export interface IParentFeesPayment {
  feeId: number;
  date: string;
  parentId: number;
  amount: number;
  status: PaymentStatus;
}

export interface IFeesPayment {
  subscription: ISubscriptionPlan;
  schoolPaymentHistory: ISchoolPaymentHistory[];
  schoolFailedTransactions: ISchoolFailedTransaction[];
  parentTotalFeesCollected: number;
  parentPendingPayments: number;
  parentFailedPayments: number;
  parentFeesPayment: IParentFeesPayment[];
}

export type ActivityType =
  | "LOGIN"
  | "LOGOUT"
  | "PASSWORD_CHANGE"
  | "EXPORT"
  | "OTHER";

export type ActivityRole = "Admin" | "Staff" | "Student" | "Parent";

export type ActivityUserType = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export interface IActivityLogItem {
  logId: number;
  user: {
    id: number;
    type: ActivityUserType;
  };
  role: ActivityRole;
  activity: string;
  activityType: ActivityType;
  ipAddress: string;
  date: string;
}

export interface IActivitySummary {
  totalLogins: number;
  totalActions: number;
  totalErrors: number;
}

export interface IActivityLog {
  summary: IActivitySummary;
  logs: IActivityLogItem[];
}

export interface IWebsitePages {
  name: string;
  url: string;
  status: "ACTIVE" | "DRAFT";
  lastUpdated: string;
}

export interface ICustomWebsite {
  status: "ACTIVE" | "INACTIVE";
  domain: string;
  numberOfPages: number;
  totalVisitors: number;
  visitorsOverview: {
    todayVisitors: number;
    thisMonthVisitors: number;
  };
  weeklyVisitors: {
    day: string;
    visitors: number;
  }[];
  websitePages: IWebsitePages[];
}

export interface ISchool {
  id: string;
  schoolId: string;
  logo: string;
  motto: string;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  status: "ACTIVE" | "INACTIVE" | "AT_RISK";
  plan: PlanType;
  totalStudents: number;
  totalStaff: number;
  totalParents: number;
  dateJoined: string;
  lastActivity: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  subscriptionExpiry: string;
  suspensionStatus: string;
  classesWithLowAttendance: number;
  daysWeekswithAbnormalDrops: number;
  upcomingExams: number;
  admins: IAdmin[];
  teachers: ITeacher[];
  students: IStudent[];
  parents: IParent[];
  reportCards: IReportCard[];
  performanceAnalytics: IPerformanceAnalytics;
  subjects: ISubject[];
  feesPayment: IFeesPayment;
  activityLog: IActivityLog;
  customWebsite: ICustomWebsite;
}

export interface IAdminActivityLog {
  logId: number;
  action: string;
  actionIcon: string;
  adminName: string;
  adminProfilePic: string | null;
  timestamp: string;
  reason: string;
  ipAddress: string;
}

// NOTIFICATION
export type FinanceType = "SUBSCRIPTION" | "SCHOOL_FEES" | "DISPUTE" | "REFUND";
export type NotificationStatus = "IN_PROGRESS" | "NEW" | "ASSIGNED";
export type PriorityType = "LOW" | "MEDIUM" | "HIGH";
export type SchoolStatus = "ACTIVE" | "INACTIVE" | "AT_RISK";
export type ProgressStatus = "COMPLETED" | "PENDING";
export type GeoRisk = "HIGH" | "MEDIUM" | "LOW";
export type SubscriptionStatus = "ACTIVE" | "PAYMENT_FAILED";
export type UserAccountStatus = "ACTIVE" | "INACTIVE";
export type SystemStatus = "ACTIVE" | "INACTIVE";
export type PaymentMethod = "BANK_TRANSFER" | "CARD";
export type CardType = "VISA" | "MASTERCARD" | "VERVE";

export interface NotificationType {
  key: string;
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
  textColor: string;
}

export interface RelatedSchool {
  schoolId: string;
  schoolName: string;
  schoolStatus: SchoolStatus;
  schoolCode: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  state?: string;
  country?: string;
  dateStarted?: string;
  subscriptionplan?: PlanType;
  subscriptionStatus?: SubscriptionStatus;
  nextBillingDate?: string;
}

export interface OnboardingProgress {
  schoolInformation: ProgressStatus;
  adminAccountSetup: ProgressStatus;
  schoolProfileSetup: ProgressStatus;
  subscriptionPlan: ProgressStatus;
  paymentMethod: ProgressStatus;
  inviteStaff: ProgressStatus;
}

export interface ITeamMember {
  userId: string;
  name: string;
  profilePicture: string;
  role: string;
  totalOpenTickets: number;
}

export interface ActionHistory {
  userId: string;
  actionTaken: string;
  TimeStamp: string;
}

export interface PaymentInformation {
  amount: number;
  paymentReference: string;
  paymentMethod: PaymentMethod;
  bankName?: string;
  accountNumber?: string;
  cardType?: CardType;
  cardNumber?: string;
  attemptedOn: string;
  failureReason: string;
}

export interface ticketInformation {
  currentAssignee?: AssignedMember;
  slaResponseTime: string;
  firstResponseTime: string;
  firstResponseDue: string;
  resolutionDue: string;
  slaStatus: string;
}

export interface UserDetails {
  userId: string;
  userEmail: string;
  userName: string;
  fullName: string;
  role: string;
  lastSuccessfulLogin: string;
  userAccountStatus: UserAccountStatus;
}

export interface SecurityEventDetails {
  ipAddress: string;
  device: string;
  failedAttempts: string;
  firstAttempt: string;
  lastAttempt: string;
  threatType: string;
  riskScore: string;
  geoRisk: GeoRisk;
}

export interface AffectedSystem {
  systemName: string;
  systemStatus: SystemStatus;
  environment: string;
  lastSuccessfulDelivery: string;
  endpointUrl: string;
  failureCount: string;
  nextRetry: string;
  region: string;
}

export interface TechnicalDetails {
  transactionReference: string;
  httpStatusCode: string;
  errorMessage: string;
  payloadSize: string;
  webhookAttempt: string;
  responseTime: string;
  requestId: string;
  occurredAt: string;
}

export interface NotificationLifecycle {
  stage: string;
  TimeStamp: string;
}

export interface AssignedMember {
  userId: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string; // e.g. "PNG", "TXT", "PDF" — or a MIME type like "image/png"
  fileSizeBytes: number;
  url: string; // where to fetch/download/preview it
  thumbnailUrl?: string; // optional — for images, a smaller preview; falls back to url if absent
}

export interface CustomerMessage {
  message: string;
  attachments: Attachment[];
}

export interface INotification {
  notificationId: string;
  type: string;
  subject: string;
  summary: string;
  financeType?: FinanceType;
  amount?: number;
  relatedSchool?: RelatedSchool;
  receivedAt: string;
  detectedAt?: string;
  priority: PriorityType;
  isRead: boolean;
  isArchived: boolean;
  assignedToMe: boolean;
  assignedMember?: AssignedMember;
  notificationStatus: NotificationStatus;
  category: string;
  description: string;
  onboardingProgress?: OnboardingProgress;
  actionHistory: ActionHistory[];
  notificationLifecycle: NotificationLifecycle[];
  paymentInformation?: PaymentInformation;
  ticketInformation?: ticketInformation;
  customerMessage?: CustomerMessage;
  userDetails?: UserDetails;
  securityEventDetails?: SecurityEventDetails;
  relatedComponent?: string;
  systemType?: string;
  SystemService?: string;
  affectedSystem?: AffectedSystem;
  technicalDetails?: TechnicalDetails;
}
