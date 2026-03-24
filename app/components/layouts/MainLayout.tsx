import { Outlet } from "react-router";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="max-w-[23%] shrink-0 overflow-y-auto hide-scrollbar">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
