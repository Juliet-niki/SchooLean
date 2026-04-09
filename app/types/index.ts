export type VerifyPageState = {
  identifier: string;
  type: "email" | "phone";
  context: "register" | "forgot-password";
};

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
export type PlanType = "PREMIUM" | "FREE TRIAL" | "STANDARD";

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
  status: "ACTIVE" | "INACTIVE" | "AT-RISK";
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
}
