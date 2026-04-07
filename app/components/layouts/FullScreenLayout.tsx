import { Outlet } from "react-router";

const FullScreenLayout = () => {
  return (
    <div className="bg-[#EDEDED] h-screen overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default FullScreenLayout;
// bg-[#EDEDED];
// bg-fuchsia-400 sm:bg-emerald-400 md:bg-cyan-400 ml:bg-red-400 lg:bg-blue-400 xl:bg-indigo-800
