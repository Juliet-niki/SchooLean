

export interface SchoolListFilters {
  page: number;
  limit: number;
  search: string;
  country: string;
  state: string;
  lga: string;
  planType: string;
  /** Matches the `key` used in SCHOOL_MANAGEMENT_FILTERS — casing kept as-is
   *  since that config array is shared with other filter bars. */
  registrationdateRange: string;
  /** ISO date string ("yyyy-MM-dd") or null. Not a Date object — Date
   *  instances aren't stable, comparable query-key data. */
  joinedDate: string | null;
}

export const DEFAULT_SCHOOL_LIST_FILTERS: SchoolListFilters = {
  page: 1,
  limit: 11,
  search: "",
  country: "",
  state: "",
  lga: "",
  planType: "",
  registrationdateRange: "",
  joinedDate: null,
};

export const schoolKeys = {
  all: () => ["schools"] as const,
  lists: () => [...schoolKeys.all(), "list"] as const,
  list: (filters: SchoolListFilters) => [...schoolKeys.lists(), filters] as const,
  detail: (id: string) => [...schoolKeys.all(), "detail", id] as const,
};