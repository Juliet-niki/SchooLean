export type VerifyPageState = {
  identifier: string;
  type: "email" | "phone";
  context: "register" | "forgot-password";
};

export interface ISchool {
  id: string;
  schoolId: string;
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
}
