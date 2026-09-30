import axios from "axios";

/**
 * Central Axios instance for all API calls.
 *
 * Request interceptor: attaches the Bearer token from the Redux store to
 * every outgoing request once the real auth API is live.
 *
 * Response interceptor: globally handles 401 Unauthorized — clears the
 * session and redirects to /login so individual query functions never need
 * to repeat that logic.
 *
 * ── API INTEGRATION NOTE ────────────────────────────────────────────────────
 * 1. Set VITE_API_BASE_URL in your .env file (e.g. https://api.schoolean.com)
 * 2. Uncomment the request interceptor token attachment block below.
 * 3. Uncomment the response interceptor 401 redirect block below.
 * ────────────────────────────────────────────────────────────────────────────
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

// ── REQUEST INTERCEPTOR ───────────────────────────────────────────────────────
// Attach auth token to every outgoing request.
//
// ── API INTEGRATION ───────────────────────────────────────────────────────────
// Endpoint: All authenticated endpoints require: Authorization: Bearer <token>
// Uncomment the block below and import { store } from "~/store" to enable.
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  // const token = store.getState().auth.token;
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// ── RESPONSE INTERCEPTOR ──────────────────────────────────────────────────────
// Handle expired/invalid sessions globally — no per-query handling needed.
//
// ── API INTEGRATION ───────────────────────────────────────────────────────────
// Uncomment the block below and import { store } + { clearCredentials } to enable.
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   store.dispatch(clearCredentials());
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  },
);

export default api;
