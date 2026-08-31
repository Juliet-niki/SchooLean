import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { USER_DATA } from "~/data/userData";
import type { IUserData } from "~/types";
import { getUserData, updateUserData } from "~/utils/userData";

type LoginFailureReason = "invalid_credentials" | "not_verified";

interface RegisterPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  accessCode: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
  reason?: LoginFailureReason;
}

interface RegisterResult {
  success: boolean;
  error?: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  currentUser: IUserData | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  error: string | null;
  clearError: () => void;
  register: (data: RegisterPayload) => Promise<RegisterResult>;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  verify: (identifier: string) => Promise<ActionResult>;
  requestPasswordReset: (identifier: string) => Promise<ActionResult>;
  identifierExists: (identifier: string) => boolean;
  resetPassword: (
    identifier: string,
    newPassword: string,
  ) => Promise<ActionResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Always start from the safe server-matching default — never read
  // localStorage synchronously here, or SSR/client output will mismatch.
  const [user, setUser] = useState<IUserData>(USER_DATA);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUserData());
    setHasHydrated(true);
  }, []);

  const clearError = () => setError(null);

  const register = async (data: RegisterPayload): Promise<RegisterResult> => {
    try {
      const stored = getUserData();

      if (data.accessCode !== stored.accessCode) {
        const message = "Invalid access code";
        setError(message);
        return { success: false, error: message };
      }

      // TODAY: synchronous mock
      const updated = updateUserData({
        userFirstName: data.firstName,
        userMiddleName: data.middleName,
        userLastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        isLoggedIn: false, // account exists now, but must still log in
        isVerified: false, // NEW — explicit, not just inherited from old data
      });
      setUser(updated);

      // TOMORROW:
      // const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
      // if (!res.ok) { const { error } = await res.json(); setError(error); return { success: false, error }; }
      // const updated = await res.json();
      // setUser(updated);

      return { success: true };
    } catch (err) {
      const message = "Something went wrong. Please try again.";
      setError(message);
      throw err;
    }
  };

  const verify = async (identifier: string): Promise<ActionResult> => {
    try {
      const stored = getUserData();

      if (stored.email.toLowerCase() !== identifier.toLowerCase()) {
        const message = "Verification failed. Identifier mismatch.";
        setError(message);
        return { success: false, error: message };
      }

      // TODAY: synchronous mock
      const updated = updateUserData({ isVerified: true });
      setUser(updated);

      // TOMORROW:
      // const res = await fetch("/api/auth/verify", { method: "POST", body: JSON.stringify({ identifier, code }) });
      // if (!res.ok) { const { error } = await res.json(); setError(error); return { success: false, error }; }
      // const updated = await res.json();
      // setUser(updated);

      return { success: true };
    } catch (err) {
      const message = "Something went wrong. Please try again.";
      setError(message);
      throw err;
    }
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    try {
      const stored = getUserData();
      const isMatch =
        stored.email.toLowerCase() === email.trim().toLowerCase() &&
        stored.password === password;

      if (!isMatch) {
        const message = "Incorrect email or password";
        setError(message);
        return {
          success: false,
          error: message,
          reason: "invalid_credentials",
        };
      }

      if (!stored.isVerified) {
        const message = "Please verify your email before logging in.";
        setError(message);
        return { success: false, error: message, reason: "not_verified" };
      }

      // TODAY: synchronous mock
      const updated = updateUserData({ isLoggedIn: true });
      setUser(updated);

      // TOMORROW:
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      // if (!res.ok) { const { error } = await res.json(); setError(error); return { success: false, error }; }
      // const updated = await res.json();
      // setUser(updated);

      return { success: true };
    } catch (err) {
      setError("Something went wrong. Please try again.");
      throw err;
    }
  };

  const logout = async () => {
    try {
      const updated = updateUserData({ isLoggedIn: false });
      setUser(updated);
      // TOMORROW: await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      setError("Couldn't log out. Please try again.");
      throw err;
    }
  };

  const requestPasswordReset = async (
    identifier: string,
  ): Promise<ActionResult> => {
    try {
      // Deliberately does NOT reveal whether `identifier` actually matches
      // a real account. Always reports success to avoid leaking which
      // emails/phone numbers are registered (user enumeration).
      // The real check happens silently later, in `identifierExists`,
      // used inside Verification.tsx before letting the person proceed
      // to the reset-password screen.

      // TODAY: mock — nothing is actually "sent" either way
      // TOMORROW: await fetch("/api/auth/request-reset", { method: "POST", body: JSON.stringify({ identifier }) });
      return { success: true };
    } catch (err) {
      setError("Something went wrong. Please try again.");
      throw err;
    }
  };

  const identifierExists = (identifier: string): boolean => {
    const stored = getUserData();
    return (
      stored.email.toLowerCase() === identifier.trim().toLowerCase() ||
      stored.phoneNumber === identifier.trim()
    );
  };

  const resetPassword = async (
    identifier: string,
    newPassword: string,
  ): Promise<ActionResult> => {
    try {
      const stored = getUserData();
      const matches =
        stored.email.toLowerCase() === identifier.trim().toLowerCase();

      if (!matches) {
        const message =
          "Something went wrong. Please restart the reset process.";
        setError(message);
        return { success: false, error: message };
      }

      const updated = updateUserData({ password: newPassword });
      setUser(updated);

      // TOMORROW: await fetch("/api/auth/reset-password", { method: "POST", body: JSON.stringify({ identifier, newPassword }) });

      return { success: true };
    } catch (err) {
      setError("Something went wrong. Please try again.");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: user.isLoggedIn ? user : null,
        isAuthenticated: user.isLoggedIn,
        hasHydrated,
        error,
        clearError,
        register,
        login,
        logout,
        verify,
        requestPasswordReset,
        identifierExists,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
