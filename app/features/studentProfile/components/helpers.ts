import type { IStudentProfileMock } from "./mock";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

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
  `₦${amount.toLocaleString("en-NG", decimals ? { minimumFractionDigits: 2 } : undefined)}`;

export const total = (s: { test: number; exam: number }) => s.test + s.exam;

export const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const getTopSubjects = (m: IStudentProfileMock, count = 5) =>
  [...m.academics.subjects]
    .map((s) => ({ name: s.name, score: total(s) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

export const getGrade = (score: number) =>
  score >= 85
    ? { grade: "A", remarks: "Excellent" }
    : score >= 75
      ? { grade: "B", remarks: "Very Good" }
      : score >= 60
        ? { grade: "C", remarks: "Good" }
        : { grade: "F", remarks: "Fail" };

export const getPercentile = (position: number, classSize: number) =>
  Math.round((position / classSize) * 100);

export const getOutcome = (score: number) => (score >= 40 ? "Pass" : "Fail");

export const getReportSummary = (m: IStudentProfileMock) => {
  const { subjects } = m.academics;
  const obtained = subjects.reduce((sum, s) => sum + total(s), 0);
  const max = subjects.length * 100;
  return { obtained, max, average: +((obtained / max) * 100).toFixed(1) };
};

export const getFeeSummary = (m: IStudentProfileMock) => {
  const paid = m.fees.payments
    .filter((p) => p.status === "Successful")
    .reduce((sum, p) => sum + p.amount, 0);
  return {
    paid,
    outstanding: m.fees.totalCharged - paid,
    count: m.fees.payments.length,
  };
};

export const getAttendance = (m: IStudentProfileMock, term: string) => {
  const t = m.attendance.byTerm.find((x) => x.term === term)!;
  return {
    ...t,
    percentage: Math.round(
      (t.daysPresent / m.attendance.schoolDaysPerTerm) * 100,
    ),
  };
};
