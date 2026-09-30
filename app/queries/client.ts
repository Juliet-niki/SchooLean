import { QueryClient } from "@tanstack/react-query";

/**
 * Singleton QueryClient shared across the entire app.
 *
 * Configuration choices:
 * - staleTime 5 min: data stays "fresh" for 5 minutes before a background
 *   refetch is triggered. Adjust per-query for volatile data (e.g. notifications).
 * - retry 1: failed requests retry once before surfacing an error. Auth
 *   mutations override this to 0 (never retry login failures).
 * - refetchOnWindowFocus false: avoids surprise refetches during development.
 *   Set to true in production if you want live data on tab re-focus.
 *
 * ── API INTEGRATION ────────────────────────────────────────────────────────
 * Once on a real API, consider enabling refetchOnWindowFocus for pages like
 * Notifications where freshness matters.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
