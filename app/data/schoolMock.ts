import type {
  IActivityLog,
  IAdmin,
  ICustomWebsite,
  IFeesPayment,
  IParent,
  IPerformanceAnalytics,
  IReportCard,
  ISchool,
  IStudent,
  ISubject,
  ITeacher,
} from "~/types";
import type { SchoolListFilters } from "~/queries/schools/keys";
import { parseDDMMYYYY } from "~/utils/formatDate";
import { mockRequest, pad, pick } from "./config";
import { mockCurrentUser, teamMemberAt } from "./peopleMock";
import type {
  IActivityLogItem,
  IAdminActivityLog,
  IParentFeesPayment,
  ITransaction,
} from "~/types";

// ─── Lists the generators pick from ─────────────────────────────────────────
// Change these to change what the generated data looks like.

const SCHOOL_NAMES = [
  "Greenwood International Schools",
  "Royal Crest Academy",
  "Excel Scholars Academy",
  "Brightway Academy",
  "Hillcrest College",
  "Sunrise Group of Schools",
];
const LOCATIONS = [
  { city: "Umuahia", state: "Abia", country: "Nigeria" },
  { city: "Owerri", state: "Imo", country: "Nigeria" },
  { city: "Warri", state: "Delta", country: "Nigeria" },
  { city: "Accra", state: "Greater Accra", country: "Ghana" },
];
const PLANS = ["PREMIUM", "FREE_TRIAL", "STANDARD"] as const;
const STATUSES = ["ACTIVE", "INACTIVE", "AT_RISK"] as const;
const FIRST_NAMES = ["Chidi", "Amaka", "Tunde", "Ngozi", "Femi", "Zainab"];
const LAST_NAMES = ["Okafor", "Adeyemi", "Ibrahim", "Eze", "Balogun", "Nwosu"];
const CLASSES = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"];

const fullName = (i: number) =>
  `${pick(FIRST_NAMES, i)} ${pick(LAST_NAMES, i + 2)}`;
const dd = (i: number) => pad(((i * 3) % 28) + 1, 2);
const mm = (i: number) => pad(((i * 5) % 12) + 1, 2);

// ─── Small generators for the nested lists ──────────────────────────────────

const makeAdmin = (s: number, i: number): IAdmin => ({
  adminId: `ADM-${pad(i + 1)}`,
  name: fullName(s + i),
  email: `admin${i + 1}@school${s + 1}.com`,
  role: "School Admin",
  profilePic: null,
  phoneNumber: "+234 801 234 5678",
  dateOfBirth: "1985-04-12",
  gender: i % 2 ? "Female" : "Male",
  address: "12 Admin Close",
  country: "Nigeria",
  city: "Owerri",
  postalCode: "460001",
  username: `admin${s + 1}_${i + 1}`,
  emailStatus: "VERIFIED",
  phoneStatus: i % 2 ? "UNVERIFIED" : "VERIFIED",
  accountStatus: "ACTIVE",
  lastLogin: "2026-02-27T09:12:00Z",
  accountCreated: "2025-01-10",
  lastUpdated: "2026-01-05",
  permissions: i === 0 ? "FULL_ACCESS" : "LIMITED",
  schoolAccess: "All",
  assignedBy: "Super Admin",
  activitySummary: {
    totalLogins: 120 + i * 10,
    actionsPerformed: 340 + i * 20,
    supportTickets: 4 + i,
    announcementSent: 7 + i,
  },
});

const makeTeacher = (s: number, i: number): ITeacher => ({
  teacherId: `TCH-${pad(i + 1)}`,
  name: fullName(s + i + 1),
  email: `teacher${i + 1}@school${s + 1}.com`,
  profilePic: null,
  assignedSubjects: ["Mathematics", "English Language"],
  assignedClass: [pick(CLASSES, i), pick(CLASSES, i + 1)],
  status: i % 5 === 4 ? "INACTIVE" : "ACTIVE",
  phoneNumber: "+234 802 345 6789",
  dateOfBirth: "1990-08-21",
  gender: i % 2 ? "Female" : "Male",
  country: "Nigeria",
  city: "Owerri",
  postalCode: "460001",
  address: "5 Staff Quarters",
  department: "Sciences",
  position: "Senior Teacher",
  employmentType: "Full-time",
  hireDate: "2022-09-01",
  yearsOfExperience: `${3 + i} years`,
  educationAndCertification: [
    {
      degree: "B.Ed Mathematics",
      institution: "University of Nigeria",
      year: 2015,
    },
  ],
  skills: ["Classroom management", "Curriculum design"],
  hobbiesAndInterest: ["Reading", "Football"],
});

const makeStudent = (s: number, i: number): IStudent => ({
  studentId: `STD-${pad(i + 1)}`,
  name: fullName(s + i + 3),
  profilePic: null,
  status: i % 6 === 5 ? "INACTIVE" : "ACTIVE",
  gender: i % 2 ? "Female" : "Male",
  age: 11 + (i % 7),
  dateOfBirth: "2012-05-14",
  phoneNumber: "+234 803 456 7890",
  email: `student${i + 1}@school${s + 1}.com`,
  address: "8 Student Avenue",
  enrollmentDate: "2024-09-09",
  education: {
    currentGrade: pick(CLASSES, i),
    currentClass: pick(CLASSES, i),
    currentClassArm: pick(["A", "B", "C"], i),
    averageGrade: 55 + ((i * 7) % 40),
    attendanceRate: 80 + ((i * 3) % 20),
    classroomTeacher: fullName(s + 1),
    learningTrack: "General",
    program: "Secondary",
    gpa: (2.5 + ((i * 3) % 15) / 10).toFixed(1),
    academicStatus: i % 4 === 3 ? "NEEDS_IMPROVEMENT" : "ON_TRACK",
  },
  guardians: [
    {
      name: fullName(s + i + 4),
      relationship: "Parent",
      phoneNumber: "+234 804 567 8901",
      email: `guardian${i + 1}@mail.com`,
    },
  ],
  notes: "",
});

const PAYMENT_PURPOSES = [
  "Tuition Fee",
  "School Supplies",
  "Uniform",
  "Exam Fee",
  "Transport",
];

/** A parent's transactions, always for the child they are linked to. */
const makeParentPayments = (
  s: number,
  i: number,
  students: IStudent[],
): ITransaction[] =>
  Array.from({ length: 5 }, (_, t) => ({
    transactionId: `TXN-${pad(s * 100 + i * 10 + t + 1)}`,
    date: `2026-${pad(((i + t) % 9) + 1, 2)}-${pad(((i * 3 + t * 5) % 27) + 1, 2)}T09:15:00Z`,
    linkedStudent: { studentId: students[i % students.length].studentId },
    description: pick(PAYMENT_PURPOSES, t + i),
    amount: 25000 + ((i + t) % 6) * 12500,
    paymentMethod: pick(["DEBIT_CARD", "BANK_TRANSFER"] as const, t + i),
    status: pick(["PAID", "PAID", "PAID", "PENDING", "FAILED"] as const, t + i),
    receipt: "/images/reportCard.png",
  }));

/** Each parent is linked to a real generated student so links never break. */
const makeParent = (s: number, i: number, students: IStudent[]): IParent => ({
  parentId: `PRT-${pad(i + 1)}`,
  name: fullName(s + i + 4),
  profilePic: null,
  linkedChildren: [
    {
      studentId: students[i % students.length].studentId,
      childStatus: "ENROLLED",
    },
  ],
  loginActivity: "2026-02-20T08:30:00Z",
  status: "ACTIVE",
  address: "3 Parent Street",
  phoneNumber: "+234 805 678 9012",
  email: `parent${i + 1}@mail.com`,
  dateOfBirth: "1982-11-02",
  gender: i % 2 ? "Male" : "Female",
  nationality: "Nigerian",
  maritalStatus: "Married",
  alternatePhone: "+234 806 789 0123",
  stateOfOrigin: "Imo",
  occupation: "Trader",
  company: "Self-employed",
  workPhone: "+234 807 890 1234",
  workEmail: `work${i + 1}@mail.com`,
  paymentHistory: makeParentPayments(s, i, students),
});

const makeReportCards = (students: IStudent[]): IReportCard[] =>
  students.slice(0, 6).map((_, i) => ({
    reportCardId: i + 1,
    studentId: i + 1,
    session: "2026/2027",
    term: "1st Term",
    generatedOn: "2026-03-01",
    averageGrade: i % 3 === 2 ? null : 55 + i * 5,
    status: i % 3 === 2 ? "PENDING" : "COMPLETED",
  }));

// Parts that don't need to vary between schools are plain constants.

const PERFORMANCE: IPerformanceAnalytics = {
  schoolAverage: 68,
  topClass: { name: "SS 3", average: 79 },
  lowestScore: { subject: "Physics", score: 41 },
  bestPerforming: { subject: "English Language", score: 84 },
  reportCardsGenerated: 6,
  performanceTrend: [
    { term: "1st Term", average: 62 },
    { term: "2nd Term", average: 66 },
    { term: "3rd Term", average: 68 },
  ],
  subjectPerformance: [
    { subject: "Mathematics", average: 64 },
    { subject: "English Language", average: 84 },
  ],
  classPerformance: [
    { class: "JSS 1", average: 65 },
    { class: "SS 3", average: 79 },
  ],
  smartInsights: [
    {
      type: "warning",
      subject: "Physics",
      message: "Scores dropped this term",
      change: -6,
    },
    {
      type: "success",
      subject: "English Language",
      message: "Scores improved",
      change: 5,
    },
  ],
};

const SUBJECTS: ISubject[] = [
  {
    category: "Secondary Section",
    coreSubjects: ["English Language", "Mathematics", "Civic Education"],
    NAPPSSchemeofWorkSubjects: ["Basic Science"],
    optionalEnrichmentSubjects: ["Music", "French"],
  },
];

const FEE_CATEGORIES = [
  "Tuition Fee",
  "Exam Fee",
  "Uniform",
  "Transport",
  "Boarding",
];
const FAILED_REASONS = ["Network Error", "Insufficient Funds", "Card Declined"];
const GATEWAY_STEPS = [
  ["Payment Initiated", "Transaction created on Flutterwave"],
  ["Payment Processed", "Money captured successfully"],
  ["Payment Successful", "Transaction complete"],
  ["Fund Settled", "Available in merchant account"],
] as const;

const isoDate = (month: number, day: number) =>
  `2026-${pad((month % 12) + 1, 2)}-${pad((day % 27) + 1, 2)}`;

const makeParentFee = (
  s: number,
  n: number,
  parents: IParent[],
): IParentFeesPayment => {
  const parent = parents[n % parents.length];
  const status = pick(
    ["COMPLETED", "COMPLETED", "COMPLETED", "PENDING", "FAILED"] as const,
    n,
  );
  // a step is "completed" only if the payment got that far
  const reached = status === "COMPLETED" ? 4 : status === "PENDING" ? 2 : 1;
  const date = `${isoDate(n, n * 4)}T09:24:00Z`;
  const card = n % 2 === 0;

  return {
    feeId: n + 1,
    date,
    parentId: parent.parentId,
    studentId: parent.linkedChildren[0].studentId,
    amount: 50000 + (n % 6) * 25000,
    status,
    feeCategory: pick(FEE_CATEGORIES, n),
    academicSession: "2026/2027",
    description: "School Fees Payment",
    transactionReference: `FLW-2026-${pad(s * 1000 + n + 1, 7)}`,
    flutterwaveReference: String(51905832712 + s * 1000 + n),
    flutterwaveTransactionId: String(519045835712 + s * 1000 + n),
    paymentMethod: card ? "CARD" : "BANK_TRANSFER",
    cardDetails: card ? `Visa ****${4000 + n}` : "GTBank",
    transactionType: "Payment",
    paymentLink: "https://pay.flutterwave.com/v3/pay",
    gatewayResponseCode: pad(2678 + n, 6),
    gatewayResponseMessage:
      status === "COMPLETED"
        ? "Transaction Successful"
        : status === "PENDING"
          ? "Awaiting confirmation"
          : "Transaction Failed",
    timeline: GATEWAY_STEPS.map(([label, description], k) => ({
      label,
      description,
      date,
      completed: k < reached,
    })),
  };
};

const sumBy = (
  list: IParentFeesPayment[],
  status: IParentFeesPayment["status"],
) => list.filter((f) => f.status === status).reduce((t, f) => t + f.amount, 0);

const makeFees = (
  s: number,
  plan: ISchool["plan"],
  schoolId: string,
  parents: IParent[],
): IFeesPayment => {
  const amount = plan === "PREMIUM" ? 250000 : plan === "STANDARD" ? 120000 : 0;
  const parentFeesPayment = Array.from({ length: 24 }, (_, n) =>
    makeParentFee(s, n, parents),
  );

  return {
    subscription: {
      planName: plan,
      amount,
      billingCycleDays: 30,
      billingCycleStart: "February 10th, 2026",
      billingCycleEnd: "March 10th, 2026",
      gracePeriod: "March 17th, 2026",
    },
    schoolPaymentHistory: Array.from({ length: 6 }, (_, n) => ({
      paymentId: n + 1,
      date: isoDate(n + 6, n * 5 + s),
      referenceId: `${schoolId}/${39830398 + s * 100 + n}`,
      amount,
      status: pick(["COMPLETED", "COMPLETED", "PENDING"] as const, n + s),
    })),
    schoolFailedTransactions: Array.from({ length: 3 }, (_, n) => ({
      transactionId: n + 1,
      date: isoDate(n + 9, n * 6 + s),
      referenceId: `${schoolId}/${49830398 + s * 100 + n}`,
      amount,
      receiptError: pick(FAILED_REASONS, n + s),
    })),
    // totals come from the list, so the cards always match the table
    parentTotalFeesCollected: sumBy(parentFeesPayment, "COMPLETED"),
    parentPendingPayments: sumBy(parentFeesPayment, "PENDING"),
    parentFailedPayments: sumBy(parentFeesPayment, "FAILED"),
    parentFeesPayment,
  };
};

// Activity log: one entry per kind of event, performed by real people from this school.

const ACTIVITY_KINDS = [
  {
    type: "LOGIN",
    activity: "Login",
    module: "Authentication",
    action: "Login",
    target: "Session",
    noRecord: false,
  },
  {
    type: "LOGOUT",
    activity: "Logout",
    module: "Authentication",
    action: "Logout",
    target: "Session",
    noRecord: false,
  },
  {
    type: "PASSWORD_CHANGE",
    activity: "Changed password",
    module: "Security",
    action: "Update",
    target: "Account",
    noRecord: false,
  },
  {
    type: "EXPORT",
    activity: "Exported students data",
    module: "Students",
    action: "Export",
    target: undefined,
    noRecord: true,
  },
  {
    type: "OTHER",
    activity: "Updated student profile",
    module: "Students",
    action: "Update",
    target: "Student",
    noRecord: false,
  },
] as const;
const DEVICES = ["Chrome on Windows", "Safari on macOS", "Chrome on Android"];
const LOG_PLACES = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Port Harcourt, Nigeria",
];

const makeActivityLog = (
  s: number,
  people: Pick<ISchool, "admins" | "teachers" | "students" | "parents">,
): IActivityLog => {
  const actors = [
    ...people.admins.map(
      (a) => ({ id: a.adminId, type: "ADMIN", role: "Admin" }) as const,
    ),
    ...people.teachers
      .slice(0, 3)
      .map(
        (t) => ({ id: t.teacherId, type: "TEACHER", role: "Staff" }) as const,
      ),
    ...people.students
      .slice(0, 3)
      .map(
        (x) => ({ id: x.studentId, type: "STUDENT", role: "Student" }) as const,
      ),
    ...people.parents
      .slice(0, 3)
      .map(
        (p) => ({ id: p.parentId, type: "PARENT", role: "Parent" }) as const,
      ),
  ];

  const logs: IActivityLogItem[] = Array.from({ length: 20 }, (_, n) => {
    const actor = pick(actors, n + s);
    const kind = pick(ACTIVITY_KINDS, n);
    const failed = n % 6 === 5;
    return {
      logId: `LOG-${pad(n + 1, 3)}`,
      user: { id: actor.id, type: actor.type },
      role: actor.role,
      activity: kind.activity,
      activityType: kind.type,
      ipAddress: `192.168.${10 + n}.${s + 1}`,
      date: `2026-${pad((n % 9) + 1, 2)}-${pad(((n * 4) % 27) + 1, 2)}T${pad(8 + (n % 10), 2)}:${pad((n * 7) % 60, 2)}:00Z`,
      status: failed ? "FAILED" : "SUCCESS",
      title: `${actor.role} ${kind.activity}`,
      description: `The ${actor.role} ${failed ? "attempted:" : "completed:"} ${kind.activity.toLowerCase()}`,
      module: kind.module,
      action: kind.action,
      // login/logout/export have no real target record, same as the type says
      ...(kind.target ? { target: kind.target } : {}),
      ...(kind.noRecord || !kind.target ? {} : { recordId: actor.id }),
      device: pick(DEVICES, n),
      location: pick(LOG_PLACES, n + s),
    };
  });

  return {
    summary: {
      totalLogins: logs.filter((l) => l.activityType === "LOGIN").length,
      totalActions: logs.length,
      totalErrors: logs.filter((l) => l.status === "FAILED").length,
    },
    logs,
  };
};

const WEBSITE: ICustomWebsite = {
  status: "ACTIVE",
  domain: "school.example.com",
  numberOfPages: 3,
  totalVisitors: 1200,
  visitorsOverview: { todayVisitors: 34, thisMonthVisitors: 640 },
  weeklyVisitors: [
    { day: "Mon", visitors: 120 },
    { day: "Tue", visitors: 98 },
  ],
  websitePages: [
    { name: "Home", url: "/", status: "ACTIVE", lastUpdated: "2026-02-01" },
  ],
};

// ─── One school, built from an index ────────────────────────────────────────

export function makeSchool(index: number): ISchool {
  const name = pick(SCHOOL_NAMES, index);
  const plan = pick(PLANS, index);
  const schoolId = `SCH${1000 + index * 137}`;
  const students = Array.from({ length: 12 }, (_, i) => makeStudent(index, i));
  const admins = Array.from({ length: 2 }, (_, i) => makeAdmin(index, i));
  const teachers = Array.from({ length: 8 }, (_, i) => makeTeacher(index, i));
  const parents = Array.from({ length: 8 }, (_, i) =>
    makeParent(index, i, students),
  );

  return {
    id: String(index + 1),
    schoolId,
    name,
    logo: "/images/schoolLogo.png",
    motto: "Strive for Excellence",
    location: pick(LOCATIONS, index),
    plan,
    status: pick(STATUSES, index),
    totalStudents: 300 + index * 40,
    totalStaff: 40 + index * 3,
    totalParents: 200 + index * 25,
    dateJoined: `${dd(index)}/${mm(index)}/2026`,
    lastActivity: `${dd(index + 1)}/${mm(index)}/2026`,
    address: `No ${10 + index} Wetheral Road`,
    email: `info@school${index + 1}.com`,
    phone: "+234 908 978 5906",
    website: `www.school${index + 1}.com`,
    subscriptionExpiry: "April 10, 2026",
    suspensionStatus: index % 3 === 0 ? "SUSPENDED" : "NOT_SUSPENDED",
    classesWithLowAttendance: index % 5,
    daysWeekswithAbnormalDrops: index % 4,
    upcomingExams: index % 3,
    admins,
    teachers,
    students,
    parents,
    reportCards: makeReportCards(students),
    performanceAnalytics: PERFORMANCE,
    subjects: SUBJECTS,
    feesPayment: makeFees(index, plan, schoolId, parents),
    activityLog: makeActivityLog(index, {
      admins,
      teachers,
      students,
      parents,
    }),
    customWebsite: WEBSITE,
  };
}

/** The whole list. Change the number to get more or fewer schools. */
export const mockSchools: ISchool[] = Array.from({ length: 24 }, (_, i) =>
  makeSchool(i),
);

// ─── Admin tools (the "Admin Tools" tab) ────────────────────────────────────
// The person running a tool is a Schoolean team member, so this comes from
// the people mock (and is built after it in the dependency order).

const ADMIN_TOOL_RUNS = [
  {
    action: "Merge duplicate users",
    icon: "PersonsIcon",
    reason: "Duplicate parents accounts found for same student",
  },
  {
    action: "Unlock Account",
    icon: "PadlockIcon",
    reason: "User requested account unlock",
  },
  {
    action: "Recalculate Results",
    icon: "CalculatorIcon",
    reason: "Scores were corrected after a late upload",
  },
  {
    action: "Fix class assignments",
    icon: "TabListIcon",
    reason: "Students were placed in the wrong class arm",
  },
  {
    action: "Reset academic calendar",
    icon: "Calendar3Icon",
    reason: "New session dates were published",
  },
  {
    action: "Force logout users",
    icon: "LogoutIcon",
    reason: "Security review after suspicious logins",
  },
  {
    action: "Clear school cache",
    icon: "BroomIcon",
    reason: "School dashboard was loading stale data",
  },
  {
    action: "Restore archive data",
    icon: "RestoreIcon",
    reason: "Previous term records were requested",
  },
] as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "May 24, 2026. 11:45 AM" — built by hand so server and browser always agree. */
const displayTimestamp = (n: number) => {
  const hour24 = 8 + (n % 10);
  const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
  return `${MONTHS[(n + 4) % 12]} ${pad(((n * 4) % 27) + 1, 2)}, 2026. ${hour12}:${pad((n * 15) % 60, 2)} ${hour24 >= 12 ? "PM" : "AM"}`;
};

export const mockAdminActivityLogs: IAdminActivityLog[] = ADMIN_TOOL_RUNS.map(
  (run, n) => {
    const who = teamMemberAt(n + 1); // skip the logged-in user so the log shows others
    return {
      logId: n + 1,
      action: run.action,
      actionIcon: run.icon,
      adminName: who.name,
      adminProfilePic: who.profilePicture,
      timestamp: displayTimestamp(n),
      reason: run.reason,
      ipAddress: `127.${200 + n}.${100 + n * 7}`,
    };
  },
);

/** Whoever is logged in is the one running tools. Replaces ADMIN_DATA. */
export const mockAdminProfile = {
  adminId: mockCurrentUser.userId,
  adminFirstName: mockCurrentUser.userFirstName,
  adminMiddleName: mockCurrentUser.userMiddleName,
  adminLastName: mockCurrentUser.userLastName,
  profilePicture: mockCurrentUser.profilePicture,
  email: mockCurrentUser.email,
  phoneNumber: mockCurrentUser.phoneNumber,
  country: mockCurrentUser.country,
  state: mockCurrentUser.state,
  city: mockCurrentUser.city,
  accessCode: mockCurrentUser.accessCode,
};

// ─── The "fake backend" ─────────────────────────────────────────────────────

export interface PaginatedSchools {
  data: ISchool[];
  total: number;
  totalPages: number;
}

export function fetchMockSchools(
  filters: SchoolListFilters,
): Promise<PaginatedSchools> {
  return mockRequest(() => {
    const search = filters.search.toLowerCase().trim();
    const isAll = (v: string) => !v || v === "all";
    const slug = (v: string) => v.toLowerCase().replace(/[\s_]+/g, "-");

    const filtered = mockSchools.filter((school) => {
      const joined = parseDDMMYYYY(school.dateJoined);
      const diffDays = Math.floor((Date.now() - joined.getTime()) / 86_400_000);
      const maxDays: Record<string, number> = {
        "24hours": 1,
        "30days": 30,
        "60days": 60,
        "90days": 90,
        "120days": 120,
      };
      const picked = new Date(filters.joinedDate ?? "");

      return (
        (!search ||
          school.name.toLowerCase().includes(search) ||
          school.schoolId.toLowerCase().includes(search)) &&
        (isAll(filters.country) ||
          school.location.country.toLowerCase() === filters.country) &&
        (isAll(filters.state) ||
          school.location.state.toLowerCase() === filters.state) &&
        (isAll(filters.lga) || slug(school.location.city) === filters.lga) &&
        (isAll(filters.planType) || slug(school.plan) === filters.planType) &&
        (isAll(filters.registrationdateRange) ||
          diffDays <= (maxDays[filters.registrationdateRange] ?? Infinity)) &&
        (!filters.joinedDate || joined.toDateString() === picked.toDateString())
      );
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / filters.limit));
    const start = (filters.page - 1) * filters.limit;
    return {
      data: filtered.slice(start, start + filters.limit),
      total,
      totalPages,
    };
  }, 500);
}

export function fetchMockSchool(
  schoolId: string,
): Promise<ISchool | undefined> {
  return mockRequest(
    () => mockSchools.find((s) => s.schoolId === schoolId || s.id === schoolId),
    400,
  );
}
