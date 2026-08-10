import {
  CheckMarkIcon,
  NotificationBellIcon,
  ParentsIcon,
  SchoolIcon,
  StaffIcon,
  StudentIcon,
} from "~/assets/Icons";
import SearchInput from "~/components/SearchInput";

import PopoverDropdown from "../../../components/PopoverDropdown";
import SchoolGrowthLineChart from "../components/SchoolGrowthLineChart";
import PlatformActivityLineChart from "../components/PlatformActivityLineChart";
import PlatformHighlight from "../components/PlatformHighlight";
import { useState } from "react";
import FullScreenModal from "~/components/FullScreenModal";
import InactiveSchools from "../components/InactiveSchools";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const  = () => navigate(`/dashboard`);
  return (
    <div className="px-4 ml:px-6 py-4 ml:py-8 bg-[#EDEDED]">
      <div className="w-full flex flex-col gap-10 mb-15">
        <div className="ml-auto flex items-center gap-8 lg:gap-16">
          <SearchInput
            setSearchText={() => {}}
            className="h-10 w-55 lg:h-12 lg:w-75"
          />
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-transparent"
            onClick={() => {
              navigate(`/notifications`);
            }}
          >
            <NotificationBellIcon className="w-5 h-5 lg:w-8 lg:h-8" />
            <span className="rounded-full w-4 h-4 lg:w-5 lg:h-5 bg-[#E93F3F] flex items-center justify-center p-1 absolute -bottom-1 -right-2 text-xs text-white">
              2
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-2 ml:grid-cols-3 gap-3 lg:gap-5">
          {dashboardData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between px-3 lg:px-4 py-3 rounded-[15px] w-full ${item.title === "Inactive Schools" ? "bg-[#E13838] cursor-pointer" : "bg-white cursor-default"} ${item.title === "Total New Schools" ? "items-start" : "items-center"}`}
              onClick={
                item.title === "Inactive Schools"
                  ? () => setOpen(true)
                  : undefined
              }
            >
              <div className="space-y-1 lg:space-y-2">
                <p
                  className={`font-medium text-[clamp(12px,1.2vw,14px)] ${item.title === "Inactive Schools" ? "text-white" : "text-[#373737]"}`}
                >
                  {item.title}
                </p>

                <p
                  className={`font-bold text-[clamp(14px,1.4vw,16px)] ${item.title === "Inactive Schools" ? "text-white" : "text-[#323333]"}`}
                >
                  {item.digit.toLocaleString()}
                </p>
              </div>
              <div>
                {item.icon && (
                  <div className="bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] rounded-[10px] p-2 lg:p-3">
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                )}
                {item.title === "Total New Schools" && (
                  <div>
                    <PopoverDropdown BtnClassName="text-[#097043] text-[clamp(8px,1vw,12px)] text-nowrap" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <SchoolGrowthLineChart />
        <PlatformActivityLineChart />
        <PlatformHighlight />
      </div>
      <FullScreenModal isOpen={open}>
        <InactiveSchools onBack={() => setOpen(false)} />
      </FullScreenModal>
    </div>
  );
};

export default Dashboard;

const dashboardData = [
  {
    title: "Total Registered Schools",
    digit: 10383,
    icon: SchoolIcon,
  },
  {
    title: "Total New Schools",
    digit: 1289,
    icon: null,
  },
  {
    title: "Active Schools",
    digit: 7657,
    icon: CheckMarkIcon,
  },
  {
    title: "Inactive Schools",
    digit: 12,
    icon: null,
  },
  {
    title: "Total Students",
    digit: 2344678,
    icon: StudentIcon,
  },
  {
    title: "Total Staff",
    digit: 45090,
    icon: StaffIcon,
  },
  {
    title: "Total Parents",
    digit: 2124223,
    icon: ParentsIcon,
  },
];
