import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { USER_DATA } from "~/data/userData";
import type { IUserData } from "~/types";

const LOCAL_STORAGE_KEY = "schoolean_user_data";

interface AuthState {
  /**
   * The currently authenticated user. Null when logged out.
   *
   * ── API INTEGRATION ──────────────────────────────────────────────────────
   * After login, the API response should return the full user profile.
   * Replace IUserData here with whatever shape your API returns for the
   * authenticated user (e.g. include `token` as a separate field below).
   * ─────────────────────────────────────────────────────────────────────────
   */
  user: IUserData | null;

  /**
   * Auth token for API requests.
   *
   * ── API INTEGRATION ──────────────────────────────────────────────────────
   * Endpoint: POST /api/auth/login — Response includes `token: string`
   * Store it here, then the Axios interceptor in ~/lib/api.ts will attach it
   * to every outgoing request as: Authorization: Bearer <token>
   * ─────────────────────────────────────────────────────────────────────────
   */
  token: string | null;

  isAuthenticated: boolean;

  /**
   * True once localStorage has been read on the client.
   * Used by RequireAuth to avoid a redirect flash on first render.
   */
  hasHydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  hasHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Dispatched once on app mount (from AuthHydrator in root.tsx).
     * Reads localStorage synchronously and restores the previous session.
     * This eliminates the loading spinner that the old AuthContext needed.
     *
     * ── API INTEGRATION ──────────────────────────────────────────────────
     * Replace the localStorage read with a session check endpoint call:
     * Endpoint: GET /api/auth/me  — Response: { user: IUserData; token: string }
     * Move this logic into an async thunk (createAsyncThunk) or a React
     * Query query with `enabled: true` on mount.
     * ─────────────────────────────────────────────────────────────────────
     */
    hydrateAuth: (state) => {
      if (typeof window === "undefined") {
        state.hasHydrated = true;
        return;
      }

      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const stored: IUserData = raw ? JSON.parse(raw) : USER_DATA;

      if (stored.isLoggedIn) {
        state.user = stored;
        state.isAuthenticated = true;
      }

      state.hasHydrated = true;
    },

    /**
     * Called after a successful login or register+verify flow.
     *
     * ── API INTEGRATION ──────────────────────────────────────────────────
     * Endpoint: POST /api/auth/login
     * Request:  { email: string; password: string }
     * Response: { user: IUserData; token: string }
     * Call: dispatch(setCredentials({ user: res.data.user, token: res.data.token }))
     * ─────────────────────────────────────────────────────────────────────
     */
    setCredentials: (
      state,
      action: PayloadAction<{ user: IUserData; token?: string | null }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token ?? null;
      state.isAuthenticated = true;

      // Persist session for page refreshes (mock only — real auth uses httpOnly cookies or token storage)
      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ ...action.payload.user, isLoggedIn: true }),
        );
      }
    },

    /**
     * Called on logout. Clears all session state.
     *
     * ── API INTEGRATION ──────────────────────────────────────────────────
     * Endpoint: POST /api/auth/logout
     * Call this action's dispatch AFTER the API call resolves.
     * The Axios interceptor also dispatches this automatically on 401.
     * ─────────────────────────────────────────────────────────────────────
     */
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          const stored = JSON.parse(raw);
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({ ...stored, isLoggedIn: false }),
          );
        }
      }
    },

    /**
     * Patches the current user's profile fields in-place.
     *
     * ── API INTEGRATION ──────────────────────────────────────────────────
     * Endpoint: PATCH /api/users/me
     * Request:  Partial<IUserData>
     * Response: updated IUserData
     * Dispatch this after a successful profile update API call.
     * ─────────────────────────────────────────────────────────────────────
     */
    updateCurrentUser: (state, action: PayloadAction<Partial<IUserData>>) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };

      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.user));
      }
    },
  },
});

export const { hydrateAuth, setCredentials, clearCredentials, updateCurrentUser } =
  authSlice.actions;

export default authSlice.reducer;
