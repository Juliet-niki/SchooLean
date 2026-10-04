import type { SessionAttendance } from "./mock";

export const getAge = (dob: string) => {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());
  if (!hadBirthday) age--;
  return age;
};

export const formatNaira = (amount: number, decimals = false) =>
  `₦ ${amount.toLocaleString("en-NG", decimals ? { minimumFractionDigits: 2 } : undefined)}`;

export const total = (s: { test: number; exam: number }) => s.test + s.exam;

export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

type Subject = { name: string; test: number; exam: number };

export const getTopSubjects = (subjects: Subject[], count = 5) =>
  subjects
    .map((s) => ({ name: s.name, score: total(s) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

export const getGrade = (score: number) =>
  score >= 70
    ? { grade: "A", remarks: "Distinction" }
    : score >= 60
      ? { grade: "B", remarks: "Very Good" }
      : score >= 50
        ? { grade: "C", remarks: "Good" }
        : score >= 45
          ? { grade: "D", remarks: "Pass" }
          : { grade: "F", remarks: "Fail" };

export const getOutcome = (score: number) => (score >= 45 ? "Pass" : "Fail");

export const getPercentile = (position: number, classSize: number) =>
  classSize ? Math.round((position / classSize) * 100) : 0;

export const getReportSummary = (subjects: Subject[]) => {
  const obtained = subjects.reduce((sum, s) => sum + total(s), 0);
  const max = subjects.length * 100;
  return {
    obtained,
    max,
    average: max ? +((obtained / max) * 100).toFixed(1) : 0,
  };
};

export const getFeeSummary = (fees: {
  totalCharged: number;
  payments: { amount: number; status: string }[];
}) => {
  const paid = fees.payments
    .filter((p) => p.status === "Successful")
    .reduce((sum, p) => sum + p.amount, 0);
  return {
    paid,
    outstanding: fees.totalCharged - paid,
    count: fees.payments.length,
  };
};

export const getAttendance = (att: SessionAttendance, term: string) => {
  // Falls back to the last term if this session has no matching term
  const t = att.byTerm.find((x) => x.term === term) ?? att.byTerm.at(-1);
  if (!t) return { term, daysPresent: 0, daysAbsent: 0, percentage: 0 };
  return {
    ...t,
    percentage: att.schoolDaysPerTerm
      ? Math.round((t.daysPresent / att.schoolDaysPerTerm) * 100)
      : 0,
  };
};
