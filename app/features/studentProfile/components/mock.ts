// export const studentProfileMock: IStudentProfileMock = {
//   header: {
//     name: "Adebayo Chidimma Ciroma",
//     status: "ACTIVE",
//     studentId: "STU-0001",
//     admissionNumber: "ADM-2023-4567",
//     school: {
//       name: "Bright Future Academy",
//       type: "(Secondary School)",
//     },
//     class: {
//       name: "SS 2",
//       label: "Class",
//     },
//     session: {
//       year: "2026/2027",
//       label: "Academic Session",
//     },
//     term: {
//       name: "First Term",
//       label: "Current Term",
//     },
//     profilePic: "/images/student.jpg",
//   },
//   attendance: {
//     summary: {
//       percentage: "94%",
//       schoolDays: 90,
//       daysPresent: 85,
//       daysAbsent: 5,
//     },
//     byTerm: [
//       { term: "First Term", daysPresent: 85, daysAbsent: 5, attendance: "94%" },
//       {
//         term: "Second Term",
//         daysPresent: 82,
//         daysAbsent: 8,
//         attendance: "91%",
//       },
//       { term: "Third Term", daysPresent: 83, daysAbsent: 2, attendance: "98%" },
//     ],
//   },
//   fees: {
//     summary: {
//       totalFeesCharged: 420000.0,
//       totalPaid: 280000.0,
//       outstandingBalance: 140000.0,
//       numberOfPayments: 5,
//     },
//     history: [
//       {
//         id: 1,
//         date: "Apr 10, 2026",
//         time: "10:42 AM",
//         purpose: "First Term",
//         amount: 150000,
//         status: "Successful",
//         reference: "PAY-12456",
//         method: "Paystack",
//       },
//       {
//         id: 2,
//         date: "Apr 10, 2026",
//         time: "10:42 AM",
//         purpose: "Textbook Fee",
//         amount: 20000,
//         status: "Successful",
//         reference: "PAY-12456",
//         method: "Paystack",
//       },
//       {
//         id: 3,
//         date: "Apr 10, 2026",
//         time: "10:42 AM",
//         purpose: "Exam Fee",
//         amount: 30000,
//         status: "Successful",
//         reference: "PAY-12456",
//         method: "Paystack",
//       },
//       {
//         id: 4,
//         date: "Apr 10, 2026",
//         time: "10:42 AM",
//         purpose: "Other Fees",
//         amount: 10000,
//         status: "Successful",
//         reference: "PAY-12456",
//         method: "Paystack",
//       },
//     ],
//   },
//   academics: {
//     performance: {
//       overallAverage: "82%",
//       position: "5TH of 42",
//       promotionalStatus: "Eligible",
//       topSubjects: [
//         { name: "Mathematics", score: 88 },
//         { name: "English Language", score: 85 },
//         { name: "Biology", score: 82 },
//         { name: "Chemistry", score: 78 },
//         { name: "Physics", score: 76 },
//       ],
//     },
//     currentSubjects: [
//       {
//         id: 1,
//         subject: "Mathematics",
//         teacher: "Mr. John Doe",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//       {
//         id: 2,
//         subject: "English Language",
//         teacher: "Ms. Jane Doe",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//       {
//         id: 3,
//         subject: "Biology",
//         teacher: "Mrs. Jane Amadi",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//       {
//         id: 4,
//         subject: "Physics",
//         teacher: "Mr. Peter Okoro",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//       {
//         id: 5,
//         subject: "Chemistry",
//         teacher: "Ms. Mary Oteh",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//       {
//         id: 6,
//         subject: "Economics",
//         teacher: "Ms. Faith Ola",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//       {
//         id: 7,
//         subject: "Civic Education",
//         teacher: "Ms. Omala Dami",
//         class: "SS 2",
//         session: "2026/2027",
//         term: "First",
//       },
//     ],
//   },
//   personalInfo: {
//     school: {
//       name: "Bright Future Academy",
//       type: "Secondary School",
//       class: "SS 2",
//       section: "A",
//       classTeacher: "Mr. Jon Snow",
//       academicSession: "2026/2027",
//       term: "First Term",
//     },
//     student: {
//       fullName: "Adebayo Chidimma Ciroma",
//       studentId: "STU-0001",
//       admissionNumber: "ADM-2023-4567",
//       dateOfBirth: "Jan 15, 2010 (15 Years)",
//       gender: "Female",
//       status: "ACTIVE",
//       admissionDate: "Sep 1, 2023",
//     },
//   },
//   activity: [
//     {
//       id: 1,
//       date: "Apr 10, 2026",
//       time: "10:41 AM",
//       title: "Fee Payment Made",
//       subtitle: "Environmental fee",
//       value: "#150,000",
//       status: "Successful",
//       statusColor: "green",
//     },
//     {
//       id: 2,
//       date: "Apr 1, 2026",
//       time: "02:41 PM",
//       title: "Report card generated",
//       subtitle: "",
//       value: "",
//       status: "System",
//       statusColor: "blue",
//     },
//     {
//       id: 3,
//       date: "Mar 10, 2026",
//       time: "10:41 AM",
//       title: "Class Assigned",
//       subtitle: "",
//       value: "",
//       status: "Admin",
//       statusColor: "blue",
//     },
//     {
//       id: 4,
//       date: "Mar 9, 2026",
//       time: "10:41 AM",
//       title: "Parent link",
//       subtitle: "",
//       value: "",
//       status: "Admin",
//       statusColor: "blue",
//     },
//     {
//       id: 5,
//       date: "Mar 5, 2026",
//       time: "10:41 AM",
//       title: "Profile updated",
//       subtitle: "",
//       value: "",
//       status: "Student",
//       statusColor: "orange",
//     },
//   ],
//   reportCards: {
//     summary: {
//       cumulativeAverage: "88.5%",
//       cumulativeGrade: "Grade A (Excellent)",
//       classPosition: "3rd / 42",
//       percentile: "Percentile: Top 7%",
//       totalScoreObtained: "708 / 800",
//       totalScoreSubtext: "Out of 8 Subjects registered",
//       termAttendance: "94%",
//       termAttendanceSubtext: "85 of 90 Days present",
//     },
//     subjects: [
//       {
//         name: "Mathematics",
//         test: 28,
//         exam: 63,
//         total: 91,
//         grade: "A",
//         remarks: "Distinction",
//         outcome: "Pass",
//       },
//       {
//         name: "English Language",
//         test: 26,
//         exam: 58,
//         total: 84,
//         grade: "B",
//         remarks: "Very Good",
//         outcome: "Pass",
//       },
//       {
//         name: "Physics",
//         test: 27,
//         exam: 61,
//         total: 88,
//         grade: "A",
//         remarks: "Excellent",
//         outcome: "Pass",
//       },
//       {
//         name: "Chemistry",
//         test: 25,
//         exam: 59,
//         total: 84,
//         grade: "B",
//         remarks: "Very Good",
//         outcome: "Pass",
//       },
//       {
//         name: "Biology",
//         test: 29,
//         exam: 66,
//         total: 95,
//         grade: "A",
//         remarks: "Distinction",
//         outcome: "Pass",
//       },
//       {
//         name: "Civic Education",
//         test: 24,
//         exam: 52,
//         total: 76,
//         grade: "B",
//         remarks: "Very Good",
//         outcome: "Pass",
//       },
//       {
//         name: "Geography",
//         test: 22,
//         exam: 48,
//         total: 70,
//         grade: "C",
//         remarks: "Good",
//         outcome: "Pass",
//       },
//       {
//         name: "Technical Drawing",
//         test: 26,
//         exam: 54,
//         total: 80,
//         grade: "B",
//         remarks: "Very Good",
//         outcome: "Pass",
//       },
//     ],
//   },
//   security: {
//     accountStatus: "Active",
//     lastLogin: { date: "Apr 10, 2026", time: "10:12 AM" },
//     loginAttempts: "2 failed attempts",
//     twoFactorAuth: "Disabled",
//     passwordLastChanged: { date: "Mar 1, 2026", time: "09:30 AM" },
//   },
//   auditLog: [
//     {
//       id: 1,
//       date: "Apr 10, 2026",
//       time: "10:42 AM",
//       action: "Updated class from SS 1A to SS 2A",
//       performedBy: "School Admin",
//       source: "Admin portal",
//     },
//     {
//       id: 2,
//       date: "Apr 5, 2026",
//       time: "2:15 PM",
//       action: "Fee payment recorded",
//       performedBy: "Parent",
//       source: "Parent portal",
//     },
//     {
//       id: 3,
//       date: "Apr 1, 2026",
//       time: "9:20 PM",
//       action: "Assigned to Mathematics",
//       performedBy: "School Admin",
//       source: "Admin portal",
//     },
//     {
//       id: 4,
//       date: "Mar 29, 2026",
//       time: "11:20 AM",
//       action: "Updated profile information",
//       performedBy: "Student",
//       source: "Student portal",
//     },
//     {
//       id: 5,
//       date: "Mar 20, 2026",
//       time: "2:45 PM",
//       action: "Linked parent profile",
//       performedBy: "School Admin",
//       source: "Admin portal",
//     },
//   ],
// };

// export interface IStudentProfileMock {
//   header: {
//     name: string;
//     status: "ACTIVE" | "INACTIVE";
//     studentId: string;
//     admissionNumber: string;
//     school: {
//       name: string;
//       type: string;
//     };
//     class: {
//       name: string;
//       label: string;
//     };
//     session: {
//       year: string;
//       label: string;
//     };
//     term: {
//       name: string;
//       label: string;
//     };
//     profilePic?: string;
//   };

//   attendance: {
//     summary: {
//       percentage: string;
//       schoolDays: number;
//       daysPresent: number;
//       daysAbsent: number;
//     };
//     byTerm: {
//       term: string;
//       daysPresent: number;
//       daysAbsent: number;
//       attendance: string;
//     }[];
//   };
//   fees: {
//     summary: {
//       totalFeesCharged: number;
//       totalPaid: number;
//       outstandingBalance: number;
//       numberOfPayments: number;
//     };
//     history: {
//       id: number;
//       date: string;
//       time: string;
//       purpose: string;
//       amount: number;
//       status: string;
//       reference: string;
//       method: string;
//     }[];
//   };
//   academics: {
//     performance: {
//       overallAverage: string;
//       position: string;
//       promotionalStatus: string;
//       topSubjects: {
//         name: string;
//         score: number;
//       }[];
//     };
//     currentSubjects: {
//       id: number;
//       subject: string;
//       teacher: string;
//       class: string;
//       session: string;
//       term: string;
//     }[];
//   };
//   personalInfo: {
//     school: {
//       name: string;
//       type: string;
//       class: string;
//       section: string;
//       classTeacher: string;
//       academicSession: string;
//       term: string;
//     };
//     student: {
//       fullName: string;
//       studentId: string;
//       admissionNumber: string;
//       dateOfBirth: string;
//       gender: string;
//       status: "ACTIVE" | "INACTIVE";
//       admissionDate: string;
//     };
//   };
//   activity: {
//     id: number;
//     date: string;
//     time: string;
//     title: string;
//     subtitle: string;
//     value: string;
//     status: "Successful" | "System" | "Admin" | "Student";
//     statusColor: "green" | "blue" | "orange";
//   }[];
//   reportCards: {
//     summary: {
//       cumulativeAverage: string;
//       cumulativeGrade: string;
//       classPosition: string;
//       percentile: string;
//       totalScoreObtained: string;
//       totalScoreSubtext: string;
//       termAttendance: string;
//       termAttendanceSubtext: string;
//     };
//     subjects: {
//       name: string;
//       test: number;
//       exam: number;
//       total: number;
//       grade: string;
//       remarks: string;
//       outcome: "Pass" | "Fail";
//     }[];
//   };
//   security: {
//     accountStatus: string;
//     lastLogin: {
//       date: string;
//       time: string;
//     };
//     loginAttempts: string;
//     twoFactorAuth: string;
//     passwordLastChanged: {
//       date: string;
//       time: string;
//     };
//   };
//   auditLog: {
//     id: number;
//     date: string;
//     time: string;
//     action: string;
//     performedBy: string;
//     source: string;
//   }[];
// }

export type Status = "ACTIVE" | "INACTIVE";

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
  attendance: {
    schoolDaysPerTerm: number;
    byTerm: { term: string; daysPresent: number; daysAbsent: number }[];
  };
  fees: {
    totalCharged: number;
    payments: {
      id: number;
      paidAt: string; // ISO datetime
      purpose: string;
      amount: number;
      status: "Successful" | "Pending" | "Failed";
      reference: string;
      method: string;
    }[];
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
  activity: {
    id: number;
    at: string; // ISO datetime
    title: string;
    subtitle?: string;
    amount?: number;
    source: "Successful" | "System" | "Admin" | "Student";
  }[];
  security: {
    accountStatus: string;
    lastLogin: string; // ISO datetime
    failedLoginAttempts: number;
    twoFactorEnabled: boolean;
    passwordLastChanged: string; // ISO datetime
  };
  auditLog: {
    id: number;
    at: string; // ISO datetime
    action: string;
    performedBy: string;
    source: string;
  }[];
}

export const studentProfileMock: IStudentProfileMock = {
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
  attendance: {
    schoolDaysPerTerm: 90,
    byTerm: [
      { term: "First Term", daysPresent: 85, daysAbsent: 5 },
      { term: "Second Term", daysPresent: 82, daysAbsent: 8 },
      { term: "Third Term", daysPresent: 83, daysAbsent: 7 },
    ],
  },
  fees: {
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
  activity: [
    {
      id: 1,
      at: "2026-04-10T10:41:00",
      title: "Fee Payment Made",
      subtitle: "First Term",
      amount: 150000,
      source: "Successful",
    },
    {
      id: 2,
      at: "2026-04-01T14:41:00",
      title: "Report card generated",
      source: "System",
    },
    {
      id: 3,
      at: "2026-03-10T10:41:00",
      title: "Class Assigned",
      source: "Admin",
    },
    { id: 4, at: "2026-03-09T10:41:00", title: "Parent link", source: "Admin" },
    {
      id: 5,
      at: "2026-03-05T10:41:00",
      title: "Profile updated",
      source: "Student",
    },
  ],
  security: {
    accountStatus: "Active",
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
