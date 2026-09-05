import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { Spinner } from "../ui/spinner";
import { Loader2Icon } from "lucide-react";

const RequireAuth = () => {
  const { isAuthenticated, hasHydrated } = useAuth();

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
