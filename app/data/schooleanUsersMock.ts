import type {
  IActivity,
  IStudentProfileMock,
  ReportCardData,
} from "~/features/schooleanUsers/components/studentProfile/components/mock";
import { mockRequest, pad, pick } from "./config";
import { mockSchools } from "./schoolMock";

// ─── Types (move these into ~/types when you merge the type files) ──────────

export type UserRole =
  | "TEACHER"
  | "SCHOOL_ADMIN"
  | "PARENT"
  | "STUDENT"
  | "NON_ACADEMIC_STAFF";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "PENDING_ACTIVATION"
  | "DEACTIVATED";

export interface ISchoolSummary {
  schoolID: string;
  schoolName: string;
  role: UserRole;
  status: UserStatus;
  dateJoined: string;
  lastLoginDate: string;
  isSuspended: boolean;
}

export interface IRecentActivity {
  activity: string;
  timestamp: string;
}

export interface ISchooleanUser {
  id: number;
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  country: string;
  state: string;
  lga: string;
  schoolSummary: ISchoolSummary[];
  recentActivities: IRecentActivity[];
}

// ─── Lists the generators pick from ─────────────────────────────────────────

const FIRST_NAMES = [
  "John",
  "Uche",
  "Amaka",
  "Tunde",
  "Blessing",
  "Samuel",
  "Ngozi",
  "Ifeanyi",
  "Zainab",
  "Chidera",
];
const LAST_NAMES = [
  "Okoro",
  "Okere",
  "Chukwu",
  "Bakare",
  "Iheanacho",
  "Okafor",
  "Eze",
  "Adeyemi",
  "Balogun",
  "Nwosu",
];
// Values match the filter options (state / lga slugs) in SCHOOLEAN_USERS_FILTERS
const LOCATIONS = [
  { country: "Nigeria", state: "Abia", lga: "Umuahia" },
  { country: "Nigeria", state: "Rivers", lga: "Port Harcourt" },
  { country: "Nigeria", state: "Imo", lga: "Owerri Municipal" },
  { country: "Nigeria", state: "Lagos", lga: "Ikeja" },
  { country: "Ghana", state: "Greater Accra", lga: "Accra" },
];
const ROLES: UserRole[] = [
  "TEACHER",
  "SCHOOL_ADMIN",
  "PARENT",
  "STUDENT",
  "NON_ACADEMIC_STAFF",
  "STUDENT",
  "TEACHER",
  "PARENT",
];
// Mostly ACTIVE so the table looks realistic
const STATUSES: UserStatus[] = [
  "ACTIVE",
  "ACTIVE",
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
  "ACTIVE",
  "PENDING_ACTIVATION",
  "DEACTIVATED",
];
const PROFILE_PICS = [
  "/images/teamMember1.jpg",
  "/images/teamMember2.jpg",
  null,
];
const ACTIVITY_NAMES = [
  "Logged in",
  "Updated profile",
  "Changed password",
  "Viewed report card",
];

const isoDay = (offset: number) =>
  new Date(Date.UTC(2026, 4, 1) + offset * 86_400_000).toISOString();

// ─── Users ──────────────────────────────────────────────────────────────────

function makeMembership(userIdx: number, m: number): ISchoolSummary {
  const school = pick(mockSchools, userIdx + m * 5);
  const status = pick(STATUSES, userIdx * 3 + m); // different step than ROLES so combos vary
  const joined = userIdx * 2 + m * 9;
  return {
    schoolID: school.schoolId,
    schoolName: school.name,
    role: pick(ROLES, userIdx + m),
    status,
    dateJoined: isoDay(joined),
    lastLoginDate: isoDay(joined + 3 + m),
    isSuspended: status === "SUSPENDED",
  };
}

export function makeUser(i: number): ISchooleanUser {
  const firstName = pick(FIRST_NAMES, i);
  // offset by i/10 so first+last pairs don't repeat for the first 100 users
  const lastName = pick(LAST_NAMES, i + Math.floor(i / 10));

  // 1 to 3 school memberships, always at different schools
  const memberships = Array.from({ length: 1 + (i % 3) }, (_, m) =>
    makeMembership(i, m),
  );

  return {
    id: i + 1,
    userID: `USR-${10001 + i}`,
    firstName,
    lastName,
    email: `${firstName}.${lastName}${i + 1}@gmail.com`.toLowerCase(),
    phoneNumber: `0801${pad(2345678 + i * 1111, 7)}`,
    profilePicture: pick(PROFILE_PICS, i),
    ...pick(LOCATIONS, i),
    schoolSummary: memberships,
    recentActivities: ACTIVITY_NAMES.slice(0, 2 + (i % 3)).map(
      (activity, a) => ({
        activity,
        timestamp: isoDay(120 - a),
      }),
    ),
  };
}

/** The whole list. Change the number to get more or fewer users. */
export const mockUsers: ISchooleanUser[] = Array.from({ length: 40 }, (_, i) =>
  makeUser(i),
);

// ─── Student profiles (built FROM the user, so they can never disagree) ─────

const SESSIONS = ["2026/2027", "2025/2026", "2024/2025", "2023/2024"];
const TERMS = ["First Term", "Second Term", "Third Term"];
const CLASSES = ["JSS 3", "SS 1", "SS 2", "SS 3"];
const SUBJECT_NAMES = [
  "Mathematics",
  "English Language",
  "Physics",
  "Chemistry",
  "Biology",
  "Civic Education",
  "Geography",
  "Technical Drawing",
];
const TEACHERS = [
  "Mr. John Doe",
  "Ms. Jane Doe",
  "Mr. Peter Okoro",
  "Ms. Mary Oteh",
  "Mrs. Jane Amadi",
  "Ms. Omala Dami",
  "Mr. Femi Bello",
  "Mr. Sule Musa",
];

const scores = (seed: number, j: number) => ({
  test: 18 + ((seed + j * 3) % 12),
  exam: 40 + ((seed + j * 7) % 25),
});

const makeReportCard = (seed: number): ReportCardData => ({
  position: 1 + (seed % 10),
  classSize: 42,
  subjects: SUBJECT_NAMES.map((name, j) => ({
    id: j + 1,
    name,
    ...scores(seed, j),
  })),
});

export function makeStudentProfile(
  user: ISchooleanUser,
  membership: ISchoolSummary,
): IStudentProfileMock {
  const seed = user.id;
  const active = membership.status === "ACTIVE";

  const activity: IActivity[] = [
    {
      id: 1,
      at: "2026-04-10T10:41:00",
      title: "Fee Payment Made",
      subtitle: "First Term",
      amount: 150000,
      type: "PAYMENT",
      status: "SUCCESS",
    },
    {
      id: 2,
      at: "2026-04-01T14:41:00",
      title: "Report card generated",
      type: "OTHER",
      source: "SYSTEM",
    },
    {
      id: 3,
      at: "2026-03-10T10:41:00",
      title: "Class Assigned",
      type: "OTHER",
      source: "ADMIN",
    },
    {
      id: 4,
      at: "2026-03-05T10:41:00",
      title: "Profile updated",
      type: "OTHER",
      source: "STUDENT",
    },
  ];

  return {
    student: {
      id: `STU-${pad(user.id)}`,
      admissionNumber: `ADM-2023-${4500 + user.id}`,
      fullName: `${user.firstName} ${user.lastName}`,
      status: active ? "ACTIVE" : "INACTIVE",
      gender: seed % 2 ? "Male" : "Female",
      dateOfBirth: `2010-${pad((seed % 12) + 1, 2)}-${pad((seed % 27) + 1, 2)}`,
      admissionDate: "2023-09-01",
      profilePic: user.profilePicture ?? undefined,
    },
    school: {
      name: membership.schoolName,
      type: "Secondary School",
      class: pick(CLASSES, seed),
      section: pick(["A", "B", "C"], seed),
      classTeacher: pick(TEACHERS, seed),
      session: SESSIONS[0],
      term: TERMS[0],
    },
    academics: {
      position: 1 + (seed % 10),
      classSize: 42,
      promotionalStatus: seed % 7 === 0 ? "Not Eligible" : "Eligible",
      subjects: SUBJECT_NAMES.map((name, j) => ({
        id: j + 1,
        name,
        teacher: pick(TEACHERS, j),
        ...scores(seed, j),
      })),
    },
    fees: Object.fromEntries(
      SESSIONS.map((session, s) => [
        session,
        {
          totalCharged: 420000,
          payments: TERMS.map((term, t) => ({
            id: t + 1,
            paidAt: `${session.slice(0, 4)}-0${4 + t * 3}-10T10:42:00`,
            purpose: term,
            amount: t === 2 ? 120000 : 150000,
            status: pick(
              ["Successful", "Successful", "Pending", "Failed"] as const,
              seed + s + t,
            ),
            reference: `PAY-${12000 + seed * 10 + s * 3 + t}`,
            method: "Paystack",
          })),
        },
      ]),
    ),
    attendance: Object.fromEntries(
      SESSIONS.map((session, s) => [
        session,
        {
          schoolDaysPerTerm: 90,
          byTerm: TERMS.map((term, t) => {
            const absent = (seed + s * 5 + t * 3) % 15;
            return { term, daysPresent: 90 - absent, daysAbsent: absent };
          }),
        },
      ]),
    ),
    reportCards: Object.fromEntries(
      SESSIONS.map((session, s) => [
        session,
        Object.fromEntries(
          TERMS.map((term, t) => [term, makeReportCard(seed + s * 2 + t)]),
        ),
      ]),
    ),
    activity,
    security: {
      accountStatus: active ? "ACTIVE" : "INACTIVE",
      lastLogin: "2026-04-10T10:12:00",
      failedLoginAttempts: seed % 4,
      twoFactorEnabled: seed % 3 === 0,
      passwordLastChanged: "2026-03-01T09:30:00",
    },
    auditLog: [
      {
        id: 1,
        at: "2026-04-10T10:42:00",
        action: "Updated class",
        performedBy: "School Admin",
        source: "Admin portal",
      },
      {
        id: 2,
        at: "2026-04-05T14:15:00",
        action: "Fee payment recorded",
        performedBy: "Parent",
        source: "Parent portal",
      },
      {
        id: 3,
        at: "2026-03-29T11:20:00",
        action: "Updated profile information",
        performedBy: "Student",
        source: "Student portal",
      },
    ],
  };
}

/** One profile per STUDENT membership, found by userID + schoolID. */
export const mockStudentProfiles = mockUsers.flatMap((user) =>
  user.schoolSummary
    .filter((m) => m.role === "STUDENT")
    .map((m) => ({
      userID: user.userID,
      schoolID: m.schoolID,
      profile: makeStudentProfile(user, m),
    })),
);

// ─── The "fake backend" ─────────────────────────────────────────────────────

export interface UserListFilters {
  page: number;
  limit: number;
  search: string;
  /** Same shape the FilterList already produces: { role: ["teacher"], ... } */
  filters: Record<string, string[]>;
  /** ISO strings, not Date objects, so they're stable in query keys */
  dateFrom: string | null;
  dateTo: string | null;
}

export interface PaginatedUsers {
  data: ISchooleanUser[];
  total: number;
  totalPages: number;
}

const slug = (v: string) => v.toLowerCase().replace(/[\s_]+/g, "-");

export function fetchMockUsers(f: UserListFilters): Promise<PaginatedUsers> {
  return mockRequest(() => {
    const search = f.search.toLowerCase().trim();
    const has = (key: string, value: string) => {
      const picked = f.filters[key];
      return (
        !picked?.length ||
        picked.includes("all") ||
        picked.includes(slug(value))
      );
    };
    const from = f.dateFrom ? new Date(f.dateFrom) : null;
    // a single picked day (or the last day of a range) includes the whole day
    const to =
      (f.dateTo ?? f.dateFrom)
        ? new Date(
            new Date((f.dateTo ?? f.dateFrom)!).getTime() + 86_400_000 - 1,
          )
        : null;

    const filtered = mockUsers.filter((u) => {
      const matchesUser =
        (!search ||
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          u.userID.toLowerCase().includes(search)) &&
        has("country", u.country) &&
        has("state", u.state) &&
        has("lga", u.lga);

      // role + school + status + date must all match on the SAME membership
      const matchesMembership = u.schoolSummary.some((m) => {
        const joined = new Date(m.dateJoined);
        return (
          has("role", m.role) &&
          has("schools", m.schoolName) &&
          has("status", m.status) &&
          (!from || joined >= from) &&
          (!to || joined <= to)
        );
      });

      return matchesUser && matchesMembership;
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / f.limit));
    const start = (f.page - 1) * f.limit;
    return { data: filtered.slice(start, start + f.limit), total, totalPages };
  }, 500);
}

export function fetchMockUser(userID: string, schoolID: string) {
  return mockRequest(
    () =>
      mockUsers.find(
        (u) =>
          u.userID === userID &&
          u.schoolSummary.some((s) => s.schoolID === schoolID),
      ),
    400,
  );
}

export function fetchMockStudentProfile(userID: string, schoolID: string) {
  return mockRequest(
    () =>
      mockStudentProfiles.find(
        (p) => p.userID === userID && p.schoolID === schoolID,
      )?.profile,
    400,
  );
}
