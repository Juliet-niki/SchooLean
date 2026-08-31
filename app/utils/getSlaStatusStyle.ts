export function getSlaStatusStyle(slaStatus: string): string {
  const normalized = slaStatus.toLowerCase();

  if (normalized.includes("overdue")) {
    return "text-[#F54F52EE]"; // red
  }
  if (normalized.includes("on track") || normalized.includes("met")) {
    return "text-[#0EB26BEE]"; // green
  }
  return "text-[#4E4E4EEE]"; // neutral fallback for anything unrecognized
}
