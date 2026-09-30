import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "~/store";

/**
 * Route guard for all authenticated routes.
 * Reads auth state from the Redux store (populated by AuthHydrator in root.tsx).
 *
 * No loading spinner needed — hydrateAuth() in AuthHydrator runs synchronously
 * from localStorage before the first render, so hasHydrated flips to true
 * on the very first state update after mount.
 */
const RequireAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const hasHydrated = useAppSelector((state) => state.auth.hasHydrated);

  if (!hasHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <p className="font-medium text-[#4E4E4E] text-[clamp(14px,1.6vw,18px)]">
            Loading...
          </p>
          <div className="w-4 h-4 md:h-8 md:w-8 animate-spin rounded-full border-4 border-[#DADADA] border-t-[#0EB26B]"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
