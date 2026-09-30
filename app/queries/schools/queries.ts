
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { SCHOOL_MANAGEMENT_DATA } from "~/data/schoolData";
import { mockDelay } from "~/lib/mockDelay";
import { parseDDMMYYYY } from "~/utils/formatDate";
import type { ISchool } from "~/types";
import { schoolKeys, type SchoolListFilters } from "./keys";

export interface PaginatedSchools {
  data: ISchool[];
  total: number;
  totalPages: number;
}

/**
 * Fetches a filtered, paginated list of schools.
 *
 * Filtering + pagination are done here in the mock so the contract matches
 * what a real paginated endpoint returns — nothing above this hook
 * (SchoolManagement, SchoolTable, FilterBar) needs to change once the API
 * is live.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/schools
 * Query params: page, limit, search, country, state, lga, planType,
 *               registrationdateRange, joinedDate (yyyy-MM-dd)
 * Response:  { data: ISchool[]; total: number; totalPages: number }
 * Replace the mock block with:
 *   const { data } = await api.get<PaginatedSchools>('/schools', { params: filters });
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useSchoolsQuery(filters: SchoolListFilters) {
  return useQuery<PaginatedSchools>({
    queryKey: schoolKeys.list(filters),
    // Keeps the previous page's data on screen while the next page/filter
    // combo loads, instead of flashing an empty table on every change.
    placeholderData: keepPreviousData,
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(500);

      const search = filters.search.toLowerCase().trim();
      const joinedDateFilter = filters.joinedDate
        ? new Date(filters.joinedDate)
        : null;

      const filtered = SCHOOL_MANAGEMENT_DATA.filter((school) => {
        const matchSearch =
          !search ||
          school.name.toLowerCase().includes(search) ||
          school.schoolId.toLowerCase().includes(search);

        const matchCountry =
          !filters.country ||
          filters.country === "all" ||
          school.location.country.toLowerCase() === filters.country;

        const matchState =
          !filters.state ||
          filters.state === "all" ||
          school.location.state.toLowerCase() === filters.state;

        const matchLga =
          !filters.lga ||
          filters.lga === "all" ||
          school.location.city.toLowerCase().replace(/\s+/g, "-") ===
            filters.lga;

        const matchPlanType =
          !filters.planType ||
          filters.planType === "all" ||
          school.plan.toLowerCase().replace(/\s+/g, "-") === filters.planType;

        const matchRegistrationDateRange = (() => {
          if (
            !filters.registrationdateRange ||
            filters.registrationdateRange === "all"
          )
            return true;

          const joined = parseDDMMYYYY(school.dateJoined);
          const now = new Date();
          const diffDays = Math.floor(
            (now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24),
          );

          switch (filters.registrationdateRange) {
            case "24hours":
              return diffDays <= 1;
            case "30days":
              return diffDays <= 30;
            case "60days":
              return diffDays <= 60;
            case "90days":
              return diffDays <= 90;
            case "120days":
              return diffDays <= 120;
            default:
              return true;
          }
        })();

        const matchJoinedDate = (() => {
          if (!joinedDateFilter) return true;
          const joined = parseDDMMYYYY(school.dateJoined);
          return (
            joined.getFullYear() === joinedDateFilter.getFullYear() &&
            joined.getMonth() === joinedDateFilter.getMonth() &&
            joined.getDate() === joinedDateFilter.getDate()
          );
        })();

        return (
          matchSearch &&
          matchCountry &&
          matchState &&
          matchLga &&
          matchPlanType &&
          matchRegistrationDateRange &&
          matchJoinedDate
        );
      });

      const total = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / filters.limit));
      const start = (filters.page - 1) * filters.limit;
      const data = filtered.slice(start, start + filters.limit);

      return { data, total, totalPages };
      // ── API: GET /api/schools ──────────────────────────────────────────────
      // const { data } = await api.get<PaginatedSchools>('/schools', {
      //   params: filters,
      // });
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}

/**
 * Fetches a single school's full detail (including tabs data).
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  GET /api/schools/:schoolId
 * Response:  ISchool (full detail including admins, teachers, students, etc.)
 * Replace the mock block with:
 *   const { data } = await api.get<ISchool>(`/schools/${schoolId}`);
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useSchoolDetailsQuery(schoolId: string) {
  return useQuery<ISchool | undefined>({
    queryKey: schoolKeys.detail(schoolId),
    queryFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(400);
      return SCHOOL_MANAGEMENT_DATA.find(
        (s) => s.schoolId === schoolId || s.id === schoolId,
      );
      // ── API: GET /api/schools/:schoolId ────────────────────────────────────
      // const { data } = await api.get<ISchool>(`/schools/${schoolId}`);
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
    enabled: !!schoolId,
  });
}