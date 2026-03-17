export const SCHOOL_ANALYTICS_DATA: Record<
  string,
  {
    daily: { x: string; schools: number }[];
    weekly: { x: string; schools: number }[];
    monthly: { x: string; schools: number }[];
  }
> = {
  "2026": {
    daily: [
      { x: "May 1", schools: 50 },
      { x: "May 2", schools: 180 },
      { x: "May 3", schools: 160 },
      { x: "May 4", schools: 300 },
      { x: "May 5", schools: 380 },
      { x: "May 6", schools: 540 },
      { x: "May 7", schools: 950 },
    ],
    weekly: [
      { x: "Sun", schools: 500 },
      { x: "Mon", schools: 2000 },
      { x: "Tue", schools: 1500 },
      { x: "Wed", schools: 3000 },
      { x: "Thu", schools: 3800 },
      { x: "Fri", schools: 5400 },
      { x: "Sat", schools: 9500 },
    ],
    monthly: [
      { x: "Jan", schools: 500 },
      { x: "Feb", schools: 1200 },
      { x: "Mar", schools: 900 },
      { x: "Apr", schools: 2000 },
      { x: "May", schools: 3500 },
      { x: "Jun", schools: 2800 },
      { x: "Jul", schools: 4200 },
      { x: "Aug", schools: 3800 },
      { x: "Sep", schools: 5500 },
      { x: "Oct", schools: 7000 },
      { x: "Nov", schools: 6200 },
      { x: "Dec", schools: 8500 },
    ],
  },

  "2027": {
    daily: [
      { x: "May 1", schools: 80 },
      { x: "May 2", schools: 220 },
      { x: "May 3", schools: 210 },
      { x: "May 4", schools: 350 },
      { x: "May 5", schools: 430 },
      { x: "May 6", schools: 600 },
      { x: "May 7", schools: 1100 },
    ],
    weekly: [
      { x: "Sun", schools: 650 },
      { x: "Mon", schools: 2300 },
      { x: "Tue", schools: 1800 },
      { x: "Wed", schools: 3400 },
      { x: "Thu", schools: 4200 },
      { x: "Fri", schools: 5800 },
      { x: "Sat", schools: 10000 },
    ],
    monthly: [
      { x: "Jan", schools: 700 },
      { x: "Feb", schools: 1500 },
      { x: "Mar", schools: 1200 },
      { x: "Apr", schools: 2300 },
      { x: "May", schools: 3900 },
      { x: "Jun", schools: 3200 },
      { x: "Jul", schools: 4700 },
      { x: "Aug", schools: 4200 },
      { x: "Sep", schools: 6000 },
      { x: "Oct", schools: 7500 },
      { x: "Nov", schools: 6900 },
      { x: "Dec", schools: 9000 },
    ],
  },
};

export const PLATFORM_ACTIVITY_DATA = {
  "2026": [
    { x: "Sun", students: 1000, staff: 400, parents: 800 },
    { x: "Mon", students: 2800, staff: 1200, parents: 2200 },
    { x: "Tue", students: 2500, staff: 1000, parents: 2000 },
    { x: "Wed", students: 4000, staff: 1800, parents: 3200 },
    { x: "Thu", students: 5500, staff: 2200, parents: 4500 },
    { x: "Fri", students: 7900, staff: 3000, parents: 6500 },
    { x: "Sat", students: 9500, staff: 3800, parents: 8000 },
  ],

  "2027": [
    { x: "Sun", students: 1200, staff: 500, parents: 900 },
    { x: "Mon", students: 3000, staff: 1300, parents: 2400 },
    { x: "Tue", students: 2700, staff: 1100, parents: 2100 },
    { x: "Wed", students: 4300, staff: 1900, parents: 3500 },
    { x: "Thu", students: 5900, staff: 2400, parents: 4800 },
    { x: "Fri", students: 8200, staff: 3200, parents: 6800 },
    { x: "Sat", students: 9900, staff: 4000, parents: 8400 },
  ],
};

export const PLATFORM_HIGHLIGHTS_DATA: Record<
  string,
  Record<string, { month: string; digit: number }>
> = {
  "2026": {
    reportCards: { month: "Jan 2026", digit: 467788 },
    feePayment: { month: "Jan 2026", digit: 453767 },
    cbtExams: { month: "Jan 2026", digit: 564889 },
    premiumPlan: { month: "Jan 2026", digit: 4876 },
    standardPlan: { month: "Jan 2026", digit: 1666865 },
  },
  "2027": {
    reportCards: { month: "Jan 2027", digit: 512000 },
    feePayment: { month: "Jan 2027", digit: 498000 },
    cbtExams: { month: "Jan 2027", digit: 620000 },
    premiumPlan: { month: "Jan 2027", digit: 5200 },
    standardPlan: { month: "Jan 2027", digit: 1800000 },
  },
};
