import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "~/store";
import { setCredentials, clearCredentials, updateCurrentUser } from "~/store/slices/authSlice";
import { getUserData, updateUserData } from "~/utils/userData";
import { mockDelay } from "~/lib/mockDelay";
import type { IUserData } from "~/types";

// ─── Shared result types (mirrors current AuthContext shapes) ────────────────

type LoginFailureReason = "invalid_credentials" | "not_verified";

interface LoginResult {
  success: boolean;
  error?: string;
  reason?: LoginFailureReason;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

interface RegisterPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  accessCode: string;
}

// ─── Login ───────────────────────────────────────────────────────────────────

/**
 * Authenticates the user with email + password.
 *
 * On success, dispatches setCredentials to the Redux auth slice.
 * The caller is responsible for navigating to "/" on success.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/auth/login
 * Request:   { email: string; password: string }
 * Response:  { user: IUserData; token: string }
 *          | { success: false; reason: "invalid_credentials" | "not_verified" }
 * Replace the mock block with:
 *   const { data } = await api.post<{ user: IUserData; token: string }>('/auth/login', { email, password });
 *   return { success: true, user: data.user, token: data.token };
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useLoginMutation() {
  const dispatch = useAppDispatch();

  return useMutation<LoginResult, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(800);
      const stored = getUserData();
      const isMatch =
        stored.email.toLowerCase() === email.trim().toLowerCase() &&
        stored.password === password;

      if (!isMatch) {
        return {
          success: false,
          error: "Failed to log in. Invalid credentials.",
          reason: "invalid_credentials" as LoginFailureReason,
        };
      }
      if (!stored.isVerified) {
        return {
          success: false,
          error: "Please verify your email before logging in.",
          reason: "not_verified" as LoginFailureReason,
        };
      }
      const updated = updateUserData({ isLoggedIn: true });
      return { success: true, user: updated };
      // ── API: POST /api/auth/login ───────────────────────────────────────────
      // const { data } = await api.post<{ user: IUserData; token: string }>(
      //   '/auth/login',
      //   { email, password },
      // );
      // return { success: true, user: data.user, token: data.token };
      // ─────────────────────────────────────────────────────────────────────────
    },
    onSuccess: (result) => {
      if (result.success && "user" in result && result.user) {
        dispatch(
          setCredentials({
            user: result.user as IUserData,
            token: ("token" in result ? result.token : null) as string | null,
          }),
        );
      }
    },
  });
}

// ─── Register ────────────────────────────────────────────────────────────────

/**
 * Creates a new admin account. On success the user must still verify their email.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/auth/register
 * Request:   RegisterPayload
 * Response:  { success: true } | { success: false; error: string }
 * Replace the mock block with:
 *   const { data } = await api.post<ActionResult>('/auth/register', payload);
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useRegisterMutation() {
  return useMutation<ActionResult, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(800);
      const stored = getUserData();

      if (payload.accessCode !== stored.accessCode) {
        return { success: false, error: "Invalid access code" };
      }

      updateUserData({
        userFirstName: payload.firstName,
        userMiddleName: payload.middleName,
        userLastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        isLoggedIn: false,
        isVerified: false,
      });

      return { success: true };
      // ── API: POST /api/auth/register ───────────────────────────────────────
      // const { data } = await api.post<ActionResult>('/auth/register', payload);
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}

// ─── Verify ──────────────────────────────────────────────────────────────────

/**
 * Verifies the user's email address using a 6-digit OTP code.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/auth/verify
 * Request:   { identifier: string; code: string }
 * Response:  { success: true } | { success: false; error: string }
 * Replace the mock block with:
 *   const { data } = await api.post<ActionResult>('/auth/verify', { identifier, code });
 *   return data;
 * Note: The `code` parameter is currently unused in the mock — add it to the
 * mutation variables type when the real endpoint requires it.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useVerifyMutation() {
  return useMutation<ActionResult, Error, { identifier: string; code: string }>({
    mutationFn: async ({ identifier }) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(1500);
      const stored = getUserData();

      if (stored.email.toLowerCase() !== identifier.toLowerCase()) {
        return { success: false, error: "Verification failed. Identifier mismatch." };
      }

      updateUserData({ isVerified: true });
      return { success: true };
      // ── API: POST /api/auth/verify ─────────────────────────────────────────
      // const { data } = await api.post<ActionResult>('/auth/verify', { identifier, code });
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}

// ─── Check identifier exists (for forgot-password flow) ──────────────────────

/**
 * Checks if an email or phone number is registered.
 * Used client-side only before allowing the user to proceed to reset-password.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * This helper is intentionally NOT an API call — it's a client-side guard
 * to prevent navigating to /reset-password without a valid identifier.
 * The real validation happens on the server during POST /api/auth/reset-password.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function identifierExists(identifier: string): boolean {
  const stored = getUserData();
  return (
    stored.email.toLowerCase() === identifier.trim().toLowerCase() ||
    stored.phoneNumber === identifier.trim()
  );
}

// ─── Request Password Reset ───────────────────────────────────────────────────

/**
 * Triggers a password reset email/SMS. Always reports success to avoid
 * leaking which identifiers are registered (anti-enumeration pattern).
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/auth/request-reset
 * Request:   { identifier: string }
 * Response:  { success: true } (always, per anti-enumeration policy)
 * Replace the mock block with:
 *   await api.post('/auth/request-reset', { identifier });
 *   return { success: true };
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useRequestPasswordResetMutation() {
  return useMutation<ActionResult, Error, { identifier: string }>({
    mutationFn: async (_payload) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      // Nothing is actually "sent" — always succeeds (anti-enumeration).
      await mockDelay(800);
      return { success: true };
      // ── API: POST /api/auth/request-reset ──────────────────────────────────
      // await api.post('/auth/request-reset', { identifier: _payload.identifier });
      // return { success: true };
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}

// ─── Reset Password ───────────────────────────────────────────────────────────

/**
 * Sets a new password for the account identified by `identifier`.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/auth/reset-password
 * Request:   { identifier: string; newPassword: string }
 * Response:  { success: true } | { success: false; error: string }
 * Replace the mock block with:
 *   const { data } = await api.post<ActionResult>('/auth/reset-password', { identifier, newPassword });
 *   return data;
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useResetPasswordMutation() {
  return useMutation<ActionResult, Error, { identifier: string; newPassword: string }>({
    mutationFn: async ({ identifier, newPassword }) => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      await mockDelay(800);
      const stored = getUserData();

      if (stored.email.toLowerCase() !== identifier.trim().toLowerCase()) {
        return {
          success: false,
          error: "Something went wrong. Please restart the reset process.",
        };
      }

      updateUserData({ password: newPassword });
      return { success: true };
      // ── API: POST /api/auth/reset-password ─────────────────────────────────
      // const { data } = await api.post<ActionResult>('/auth/reset-password', {
      //   identifier,
      //   newPassword,
      // });
      // return data;
      // ─────────────────────────────────────────────────────────────────────────
    },
  });
}

// ─── Logout ───────────────────────────────────────────────────────────────────

/**
 * Clears the user session. The caller is responsible for navigating to /login.
 *
 * ── API INTEGRATION ──────────────────────────────────────────────────────────
 * Endpoint:  POST /api/auth/logout
 * Request:   (none — token is in the Authorization header)
 * Response:  204 No Content
 * Replace the mock block with:
 *   await api.post('/auth/logout');
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useLogoutMutation() {
  const dispatch = useAppDispatch();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // ── MOCK (delete when API is ready) ────────────────────────────────────
      updateUserData({ isLoggedIn: false });
      // ── API: POST /api/auth/logout ─────────────────────────────────────────
      // await api.post('/auth/logout');
      // ─────────────────────────────────────────────────────────────────────────
    },
    onSuccess: () => {
      dispatch(clearCredentials());
    },
  });
}
