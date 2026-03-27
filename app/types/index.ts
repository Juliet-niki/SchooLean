export type VerifyPageState = {
  identifier: string;
  type: "email" | "phone";
  context: "register" | "forgot-password";
};

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
  plan: "PREMIUM" | "FREE TRIAL" | "STANDARD";
  status: "ACTIVE" | "INACTIVE" | "AT-RISK";
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

  admins: {
    name: string;
    email: string;
    role: string;
    profilePic: null | string;
  }[];

  teachers: ITeacher[];
  students: IStudent[];
  parents: IParent[];
  reportCards: IReportCard[];
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
  averageGrade: number;
  status: "PENDING" | "COMPLETED";
}
