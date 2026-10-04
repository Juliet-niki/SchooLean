/**
 * One place to control every mock request in the app.
 *
 * - MOCK_DELAY_MS: how long a fake request takes (so loading states show up)
 * - FORCE_ERROR:   flip to `true` to see every error state in the UI
 *
 * Delete this file (and the /mocks folder) when the real API is ready.
 */
export const MOCK_DELAY_MS = 600;
export const FORCE_ERROR = false;

/** Runs `produce` after a fake delay, or rejects when FORCE_ERROR is on. */
export function mockRequest<T>(
  produce: () => T,
  delay: number = MOCK_DELAY_MS,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (FORCE_ERROR) {
        reject(new Error("Mock request failed"));
        return;
      }
      resolve(produce());
    }, delay);
  });
}

/** Picks a value from a list by index, wrapping around at the end. */
export const pick = <T>(list: readonly T[], index: number): T =>
  list[index % list.length];

/** 1 -> "0001" */
export const pad = (n: number, length = 4) => String(n).padStart(length, "0");
