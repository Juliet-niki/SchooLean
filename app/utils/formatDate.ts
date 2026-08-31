export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function formatReceivedAt(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffSecs = Math.max(0, Math.round(diffMs / 1000));

  if (diffSecs < 60) {
    return `${diffSecs} sec${diffSecs !== 1 ? "s" : ""} ago`;
  }

  const diffMins = Math.round(diffSecs / 60);
  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
  }

  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}

export const formatDateTime = (date: Date | string | undefined): string => {
  if (!date) return "N/A";

  const d = typeof date === "string" ? new Date(date.trim()) : date;

  if (isNaN(d.getTime())) {
    return "N/A";
  }

  const formattedDate = d.toLocaleDateString("en-US", {
    timeZone: "Africa/Lagos",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = d.toLocaleTimeString("en-US", {
    timeZone: "Africa/Lagos",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} at ${formattedTime}`;
};
