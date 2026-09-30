import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center max-w-[1400px] mx-auto">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
