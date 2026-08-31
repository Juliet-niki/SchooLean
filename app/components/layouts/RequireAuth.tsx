import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { Spinner } from "../ui/spinner";

const RequireAuth = () => {
  const { isAuthenticated, hasHydrated } = useAuth();

  if (!hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
