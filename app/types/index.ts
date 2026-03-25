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
}
