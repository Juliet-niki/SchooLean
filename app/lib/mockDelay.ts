/**
 * Simulates network latency in mock query/mutation functions.
 *
 * Remove all calls to this helper once the real API is integrated —
 * search the codebase for `mockDelay` to find every usage.
 *
 * @param ms - Milliseconds to wait (default: 600)
 */
export const mockDelay = (ms = 600): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
