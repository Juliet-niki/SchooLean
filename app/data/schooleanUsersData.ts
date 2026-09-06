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

export const SCHOOLEAN_USER_DATA: ISchooleanUser[] = [
  {
    id: 1,
    userID: "USR-10001",
    firstName: "John",
    lastName: "Okoro",
    email: "john.okoro@gmail.com",
    phoneNumber: "08012345678",
    profilePicture: "/images/teamMember2.jpg",
    country: "Nigeria",
    state: "Abia",
    lga: "Umuahia",
    schoolSummary: [
      {
        schoolID: "SCH1350",
        schoolName: "Greenwood International Schools",
        role: "TEACHER",
        status: "ACTIVE",
        dateJoined: "2026-05-24T08:50:00Z",
        lastLoginDate: "2026-05-24T10:30:00Z",
        isSuspended: false,
      },
      {
        schoolID: "SCH2461",
        schoolName: "Royal Crest Academy",
        role: "SCHOOL_ADMIN",
        status: "ACTIVE",
        dateJoined: "2026-05-24T08:50:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
      {
        schoolID: "SCH6699",
        schoolName: "Excel Scholars Academy",
        role: "PARENT",
        status: "ACTIVE",
        dateJoined: "2026-05-24T08:50:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
    ],
    recentActivities: [
      { activity: "Logged in", timestamp: "2026-09-06T08:50:00Z" },
      { activity: "Updated profile", timestamp: "2026-09-05T14:20:00Z" },
    ],
  },
  {
    id: 2,
    userID: "USR-10002",
    firstName: "Uche",
    lastName: "Okere",
    email: "uche.okere@gmail.com",
    phoneNumber: "08023456789",
    profilePicture: "/images/teamMember1.jpg",
    country: "Nigeria",
    state: "Rivers",
    lga: "Port Harcourt",
    schoolSummary: [
      {
        schoolID: "SCH1350",
        schoolName: "Greenwood International Schools",
        role: "TEACHER",
        status: "ACTIVE",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
      {
        schoolID: "SCH1350",
        schoolName: "Greenwood International Schools",
        role: "SCHOOL_ADMIN",
        status: "ACTIVE",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
      {
        schoolID: "SCH2461",
        schoolName: "Royal Crest Academy",
        role: "PARENT",
        status: "ACTIVE",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
    ],
    recentActivities: [
      { activity: "Logged in", timestamp: "2026-09-06T09:15:00Z" },
    ],
  },
  {
    id: 3,
    userID: "USR-10003",
    firstName: "Amaka",
    lastName: "Chukwu",
    email: "amaka.chukwu@gmail.com",
    phoneNumber: "08034567890",
    profilePicture: "/images/teamMember1.jpg",
    country: "Nigeria",
    state: "Enugu",
    lga: "Enugu East",
    schoolSummary: [
      {
        schoolID: "SCH2461",
        schoolName: "Royal Crest Academy",
        role: "SCHOOL_ADMIN",
        status: "ACTIVE",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
    ],
    recentActivities: [
      { activity: "Logged in", timestamp: "2026-09-05T11:00:00Z" },
    ],
  },
  {
    id: 4,
    userID: "USR-10004",
    firstName: "Tunde",
    lastName: "Bakare",
    email: "tunde.bakare@gmail.com",
    phoneNumber: "08045678901",
    profilePicture: "/images/admin-1.jpg",
    country: "Nigeria",
    state: "Rivers",
    lga: "Port Harcourt",
    schoolSummary: [
      {
        schoolID: "SCH1350",
        schoolName: "Greenwood International Schools",
        role: "STUDENT",
        status: "ACTIVE",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
      {
        schoolID: "SCH1350",
        schoolName: "Greenwood International Schools",
        role: "STUDENT",
        status: "ACTIVE",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "2026-05-24T09:15:00Z",
        isSuspended: false,
      },
    ],
    recentActivities: [
      { activity: "Logged in", timestamp: "2026-09-04T16:45:00Z" },
    ],
  },
  {
    id: 5,
    userID: "USR-10005",
    firstName: "Blessing",
    lastName: "Iheanacho",
    email: "blessing.iheanacho@gmail.com",
    phoneNumber: "08056789012",
    profilePicture: "/images/admin-2.jpg",
    country: "Nigeria",
    state: "Rivers",
    lga: "Obio-Akpor",
    schoolSummary: [
      {
        schoolID: "SCH6699",
        schoolName: "Excel Scholars Academy",
        role: "NON_ACADEMIC_STAFF",
        status: "PENDING_ACTIVATION",
        dateJoined: "2026-05-24T09:15:00Z",
        lastLoginDate: "pending",
        isSuspended: false,
      },
    ],
    recentActivities: [],
  },
  {
    id: 6,
    userID: "USR-10006",
    firstName: "Samuel",
    lastName: "Okafor",
    email: "samuel.okafor@gmail.com",
    phoneNumber: "08067890123",
    profilePicture: "/images/admin-3.jpg",
    country: "Nigeria",
    state: "Abia",
    lga: "Umuahia",
    schoolSummary: [
      {
        schoolID: "SCH1350",
        schoolName: "Greenwood International Schools",
        role: "TEACHER",
        status: "SUSPENDED",
        dateJoined: "2026-04-10T09:15:00Z",
        lastLoginDate: "2026-08-30T10:00:00Z",
        isSuspended: true,
      },
    ],
    recentActivities: [
      { activity: "Logged in", timestamp: "2026-08-30T10:00:00Z" },
    ],
  },
  {
    id: 7,
    userID: "USR-10007",
    firstName: "Ngozi",
    lastName: "Eze",
    email: "ngozi.eze@gmail.com",
    phoneNumber: "08078901234",
    profilePicture: null,
    country: "Nigeria",
    state: "Enugu",
    lga: "Enugu North",
    schoolSummary: [
      {
        schoolID: "SCH2461",
        schoolName: "Royal Crest Academy",
        role: "PARENT",
        status: "INACTIVE",
        dateJoined: "2026-01-15T09:15:00Z",
        lastLoginDate: "2026-06-02T09:15:00Z",
        isSuspended: false,
      },
    ],
    recentActivities: [],
  },
  {
    id: 8,
    userID: "USR-10008",
    firstName: "John",
    lastName: "Adeyemi",
    email: "john.adeyemi@gmail.com",
    phoneNumber: "08089012345",
    profilePicture: "/images/admin-2.jpg",
    country: "Nigeria",
    state: "Rivers",
    lga: "Port Harcourt",
    schoolSummary: [
      {
        schoolID: "SCH2964",
        schoolName: "Brightway Academy",
        role: "SCHOOL_ADMIN",
        status: "DEACTIVATED",
        dateJoined: "2025-11-01T09:15:00Z",
        lastLoginDate: "2026-03-14T09:15:00Z",
        isSuspended: false,
      },
    ],
    recentActivities: [],
  },
];

export const SCHOOLEAN_USERS_FILTERS = [
  {
    key: "role",
    label: "Role",
    options: [
      { label: "All Roles", value: "all" },
      { label: "School Admin", value: "school-admin" },
      { label: "Teacher", value: "teacher" },
      { label: "Student", value: "student" },
      { label: "Parent", value: "parent" },
      { label: "Non-Academic Staff", value: "non-academic-staff" },
    ],
  },
  {
    key: "schools",
    label: "Schools",
    options: [
      { value: "all", label: "All Schools" },
      {
        value: "greenwood-international-schools",
        label: "Greenwood International Schools",
      },
      { value: "royal-crest-academy", label: "Royal Crest Academy" },
      { value: "excel-scholars-academy", label: "Excel Scholars Academy" },
      { value: "brightway-academy", label: "Brightway Academy" },
      // TODO: not yet in SCHOOL_MANAGEMENT_DATA / SCHOOLEAN_USER_DATA —
      // remove if these were only placeholders, or add matching mock data if real
      // { value: "wright-excel-academy", label: "Wright Excel Academy" },
      // { value: "kings-college-lagos", label: "Kings College Lagos" },
      // { value: "victory-intl-school", label: "Victory Intl. School" },
      // { value: "lighthouse-academy", label: "Lighthouse Academy" },
      // { value: "topline-intl-school", label: "Topline intl. School" },
      // { value: "amanda-high-school", label: "Amanda High School" },
    ],
  },
  {
    key: "status",
    label: "Account Status",
    options: [
      { label: "All Statuses", value: "all" },
      { label: "Active", value: "active" },
      { label: "Pending Activation", value: "pending-activation" },
      { label: "Inactive", value: "inactive" },
      { label: "Suspended", value: "suspended" },
      { label: "Deactivated", value: "deactivated" },
    ],
  },
  {
    key: "country",
    label: "Country",
    options: [
      { label: "All Countries", value: "all" },
      { label: "Nigeria", value: "nigeria" },
      { label: "Ghana", value: "ghana" },
      { label: "Togo", value: "togo" },
      { label: "Kenya", value: "kenya" },
      { label: "Uganda", value: "uganda" },
      { label: "Rwanda", value: "rwanda" },
      { label: "South Africa", value: "south-africa" },
      { label: "Zimbabwe", value: "zimbabwe" },
      { label: "Botswana", value: "botswana" },
      { label: "Namibia", value: "namibia" },
      { label: "Malawi", value: "malawi" },
    ],
  },
  {
    key: "state",
    label: "State",
    options: [
      { label: "All States", value: "all" },
      { label: "Abia", value: "abia" },
      { label: "Lagos", value: "lagos" },
      { label: "Rivers", value: "rivers" },
      { label: "Anambra", value: "anambra" },
      { label: "Edo", value: "edo" },
      { label: "Oyo", value: "oyo" },
      { label: "Ogun", value: "ogun" },
      { label: "Osun", value: "osun" },
      { label: "Ondo", value: "ondo" },
      { label: "Imo", value: "imo" },
      { label: "Delta", value: "delta" },
      { label: "Akwa Ibom", value: "akwa-ibom" },
      { label: "Ebonyi", value: "ebonyi" },
      { label: "Enugu", value: "enugu" },
      { label: "Kaduna", value: "kaduna" },
      { label: "Kano", value: "kano" },
      { label: "Katsina", value: "katsina" },
    ],
  },
  {
    key: "lga",
    label: "LGA",
    options: [
      { label: "All LGAs", value: "all" },
      { label: "Ikeja", value: "ikeja" },
      { label: "Eti-Osa", value: "eti-osa" },
      { label: "Ibadan North", value: "ibadan-north" },
      { label: "Ibadan South-West", value: "ibadan-south-west" },
      { label: "Uyo", value: "uyo" },
      { label: "Calabar Municipal", value: "calabar-municipal" },
      { label: "Enugu North", value: "enugu-north" },
      { label: "Enugu East", value: "enugu-east" },
      { label: "Owerri Municipal", value: "owerri-municipal" },
      { label: "Port Harcourt", value: "port-harcourt" },
      { label: "Obio-Akpor", value: "obio-akpor" },
      { label: "Umuahia", value: "umuahia" },
      {
        label: "Abuja Municipal Area Council",
        value: "abuja-municipal-area-council",
      },
      { label: "Kano Municipal", value: "kano-municipal" },
      { label: "Zaria", value: "zaria" },
      { label: "Jos North", value: "jos-north" },
      { label: "Maiduguri", value: "maiduguri" },
    ],
  },
];
