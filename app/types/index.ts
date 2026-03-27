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
  // classes: {
  //   class: string;
  //   classArm: string[];
  // }[];
  parents: IParent[];
}
export interface ITeacher {
  id: number;
  name: string;
  email: string;
  profilePic: null | string;
  assignedSubjects: string[];
  assignedClass: string[];
  status: "ACTIVE" | "INACTIVE";
}

export interface IStudent {
  id: number;
  name: string;
  profilePic: null | string;
  class: string;
  classArm: string;
  gender: string;
  Age: number;
  attendanceRate: number;
  averageGrade: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface IParent {
  id: number;
  name: string;
  profilePic: null;
  linkedChildren: {
    id: number;
    name: string;
    class: string;
    classArm: string;
  }[];
  loginActivity: string;
  status: string;
}
