export type Status = "ACTIVE" | "INACTIVE";

export type SessionAttendance = IStudentProfileMock["attendance"][string];

export type ReportCardData = {
  position: number;
  classSize: number;
  subjects: { id: number; name: string; test: number; exam: number }[];
};

export const EMPTY_ATTENDANCE: SessionAttendance = {
  schoolDaysPerTerm: 0,
  byTerm: [],
};

export const EMPTY_REPORT_CARD: ReportCardData = {
  position: 0,
  classSize: 0,
  subjects: [],
};

export interface IActivity {
  id: number;
  at: string;
  title: string;
  subtitle?: string;
  amount?: number;
  type: "PAYMENT" | "OTHER";
  source?: "SYSTEM" | "ADMIN" | "STUDENT";
  status?: "SUCCESS" | "FAILED" | "PENDING";
}

export interface IStudentProfileMock {
  student: {
    id: string;
    admissionNumber: string;
    fullName: string;
    status: Status;
    gender: string;
    dateOfBirth: string; // ISO, compute age in UI
    admissionDate: string; // ISO
    profilePic?: string;
  };
  school: {
    name: string;
    type: string;
    class: string;
    section: string;
    classTeacher: string;
    session: string;
    term: string;
  };
  academics: {
    position: number;
    classSize: number;
    promotionalStatus: string;
    subjects: {
      id: number;
      name: string;
      teacher: string;
      test: number;
      exam: number;
    }[];
  };
  fees: Record<
    string,
    {
      totalCharged: number;
      payments: {
        id: number;
        paidAt: string;
        purpose: string;
        amount: number;
        status: "Successful" | "Pending" | "Failed";
        reference: string;
        method: string;
      }[];
    }
  >;
  attendance: Record<
    string,
    {
      schoolDaysPerTerm: number;
      byTerm: { term: string; daysPresent: number; daysAbsent: number }[];
    }
  >;
  reportCards: Record<string, Record<string, ReportCardData>>;
  activity: IActivity[];
  security: {
    accountStatus: "ACTIVE" | "INACTIVE";
    lastLogin: string;
    failedLoginAttempts: number;
    twoFactorEnabled: boolean;
    passwordLastChanged: string;
  };
  auditLog: {
    id: number;
    at: string; // ISO datetime
    action: string;
    performedBy: string;
    source: string;
  }[];
}

export const SESSION_OPTIONS = [
  { label: "2026/2027", value: "2026/2027" },
  { label: "2025/2026", value: "2025/2026" },
  { label: "2024/2025", value: "2024/2025" },
  { label: "2023/2024", value: "2023/2024" },
];

export const TERM_OPTIONS = [
  { label: "First Term", value: "First Term" },
  { label: "Second Term", value: "Second Term" },
  { label: "Third Term", value: "Third Term" },
];

export const STUDENT_PROFILE_MOCK: IStudentProfileMock = {
  student: {
    id: "STU-0001",
    admissionNumber: "ADM-2023-4567",
    fullName: "Adebayo Chidimma Ciroma",
    status: "ACTIVE",
    gender: "Female",
    dateOfBirth: "2010-01-15",
    admissionDate: "2023-09-01",
    profilePic: "/images/student.jpg",
  },
  school: {
    name: "Bright Future Academy",
    type: "Secondary School",
    class: "SS 2",
    section: "A",
    classTeacher: "Mr. Jon Snow",
    session: "2026/2027",
    term: "First Term",
  },
  academics: {
    position: 3,
    classSize: 42,
    promotionalStatus: "Eligible",
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        teacher: "Mr. John Doe",
        test: 28,
        exam: 63,
      },
      {
        id: 2,
        name: "English Language",
        teacher: "Ms. Jane Doe",
        test: 26,
        exam: 58,
      },
      {
        id: 3,
        name: "Physics",
        teacher: "Mr. Peter Okoro",
        test: 27,
        exam: 61,
      },
      {
        id: 4,
        name: "Chemistry",
        teacher: "Ms. Mary Oteh",
        test: 25,
        exam: 59,
      },
      {
        id: 5,
        name: "Biology",
        teacher: "Mrs. Jane Amadi",
        test: 29,
        exam: 66,
      },
      {
        id: 6,
        name: "Civic Education",
        teacher: "Ms. Omala Dami",
        test: 24,
        exam: 52,
      },
      {
        id: 7,
        name: "Geography",
        teacher: "Mr. Femi Bello",
        test: 22,
        exam: 48,
      },
      {
        id: 8,
        name: "Technical Drawing",
        teacher: "Mr. Sule Musa",
        test: 26,
        exam: 54,
      },
    ],
  },
  fees: {
    "2026/2027": {
      totalCharged: 420000,
      payments: [
        {
          id: 1,
          paidAt: "2026-04-10T10:42:00",
          purpose: "First Term",
          amount: 150000,
          status: "Successful",
          reference: "PAY-12456",
          method: "Paystack",
        },
        {
          id: 2,
          paidAt: "2026-04-10T10:42:00",
          purpose: "Textbook Fee",
          amount: 20000,
          status: "Successful",
          reference: "PAY-12457",
          method: "Paystack",
        },
        {
          id: 3,
          paidAt: "2026-04-10T10:42:00",
          purpose: "Exam Fee",
          amount: 30000,
          status: "Successful",
          reference: "PAY-12458",
          method: "Paystack",
        },
        {
          id: 4,
          paidAt: "2026-04-10T10:42:00",
          purpose: "Other Fees",
          amount: 10000,
          status: "Successful",
          reference: "PAY-12459",
          method: "Paystack",
        },
      ],
    },
    "2025/2026": {
      totalCharged: 450000,
      payments: [
        {
          id: 1,
          paidAt: "2026-04-10T10:42:00",
          purpose: "First Term",
          amount: 150000,
          status: "Successful",
          reference: "PAY-12456",
          method: "Paystack",
        },
        {
          id: 2,
          paidAt: "2026-04-10T10:42:00",
          purpose: "Textbook Fee",
          amount: 20000,
          status: "Successful",
          reference: "PAY-12457",
          method: "Paystack",
        },
        {
          id: 3,
          paidAt: "2026-04-10T10:42:00",
          purpose: "Exam Fee",
          amount: 30000,
          status: "Successful",
          reference: "PAY-12458",
          method: "Paystack",
        },
        {
          id: 4,
          paidAt: "2026-04-10T10:42:00",
          purpose: "Other Fees",
          amount: 10000,
          status: "Successful",
          reference: "PAY-12459",
          method: "Paystack",
        },
      ],
    },
  },
  attendance: {
    "2026/2027": {
      schoolDaysPerTerm: 90,
      byTerm: [
        { term: "First Term", daysPresent: 85, daysAbsent: 5 },
        { term: "Second Term", daysPresent: 82, daysAbsent: 8 },
        { term: "Third Term", daysPresent: 83, daysAbsent: 7 },
      ],
    },
    "2025/2026": {
      schoolDaysPerTerm: 90,
      byTerm: [
        { term: "First Term", daysPresent: 65, daysAbsent: 25 },
        { term: "Second Term", daysPresent: 70, daysAbsent: 20 },
        { term: "Third Term", daysPresent: 75, daysAbsent: 15 },
      ],
    },
    "2024/2025": {
      schoolDaysPerTerm: 90,
      byTerm: [
        { term: "First Term", daysPresent: 80, daysAbsent: 10 },
        { term: "Second Term", daysPresent: 85, daysAbsent: 5 },
        { term: "Third Term", daysPresent: 90, daysAbsent: 0 },
      ],
    },
    "2023/2024": {
      schoolDaysPerTerm: 90,
      byTerm: [
        { term: "First Term", daysPresent: 77, daysAbsent: 13 },
        { term: "Second Term", daysPresent: 81, daysAbsent: 9 },
        { term: "Third Term", daysPresent: 85, daysAbsent: 5 },
      ],
    },
  },
  reportCards: {
    "2026/2027": {
      "First Term": {
        position: 3,
        classSize: 42,
        subjects: [
          { id: 1, name: "Mathematics", test: 28, exam: 63 },
          { id: 2, name: "English Language", test: 20, exam: 42 },
          { id: 3, name: "Physics", test: 18, exam: 34 },
          { id: 4, name: "Chemistry", test: 15, exam: 31 },
          { id: 5, name: "Biology", test: 12, exam: 32 },
          { id: 6, name: "Civic Education", test: 24, exam: 24 },
          { id: 7, name: "Geography", test: 22, exam: 48 },
          { id: 8, name: "Technical Drawing", test: 26, exam: 54 },
        ],
      },
    },
    "2025/2026": {
      "First Term": {
        position: 6,
        classSize: 45,
        subjects: [
          { id: 1, name: "Mathematics", test: 25, exam: 55 },
          { id: 2, name: "English Language", test: 24, exam: 52 },
          { id: 3, name: "Physics", test: 22, exam: 50 },
          { id: 4, name: "Chemistry", test: 23, exam: 49 },
          { id: 5, name: "Biology", test: 12, exam: 32 },
          { id: 6, name: "Civic Education", test: 24, exam: 24 },
          { id: 7, name: "Geography", test: 22, exam: 48 },
          { id: 8, name: "Technical Drawing", test: 26, exam: 54 },
        ],
      },
      "Second Term": {
        position: 5,
        classSize: 45,
        subjects: [
          { id: 1, name: "Mathematics", test: 27, exam: 60 },
          { id: 2, name: "English Language", test: 25, exam: 56 },
          { id: 3, name: "Physics", test: 24, exam: 54 },
          { id: 4, name: "Chemistry", test: 24, exam: 52 },
          { id: 5, name: "Biology", test: 12, exam: 32 },
          { id: 6, name: "Civic Education", test: 24, exam: 24 },
          { id: 7, name: "Geography", test: 22, exam: 48 },
          { id: 8, name: "Technical Drawing", test: 26, exam: 54 },
        ],
      },
    },
  },
  activity: [
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
      at: "2026-03-09T10:41:00",
      title: "Parent link",
      type: "OTHER",
      source: "ADMIN",
    },
    {
      id: 5,
      at: "2026-03-05T10:41:00",
      title: "Profile updated",
      type: "OTHER",
      source: "STUDENT",
    },
  ],
  security: {
    accountStatus: "ACTIVE",
    lastLogin: "2026-04-10T10:12:00",
    failedLoginAttempts: 2,
    twoFactorEnabled: false,
    passwordLastChanged: "2026-03-01T09:30:00",
  },
  auditLog: [
    {
      id: 1,
      at: "2026-04-10T10:42:00",
      action: "Updated class from SS 1A to SS 2A",
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
      at: "2026-04-01T21:20:00",
      action: "Assigned to Mathematics",
      performedBy: "School Admin",
      source: "Admin portal",
    },
    {
      id: 4,
      at: "2026-03-29T11:20:00",
      action: "Updated profile information",
      performedBy: "Student",
      source: "Student portal",
    },
    {
      id: 5,
      at: "2026-03-20T14:45:00",
      action: "Linked parent profile",
      performedBy: "School Admin",
      source: "Admin portal",
    },
  ],
};
