import { Outlet } from "react-router";

const FullScreenLayout = () => {
  return (
    <div className="bg-[#EDEDED] h-screen overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default FullScreenLayout;
