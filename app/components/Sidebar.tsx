import { NavLink, useNavigate } from "react-router";
import {
  AdminManagementIcon,
  AnalyticsIcon,
  ConfigurationIcon,
  ContentIcon,
  MegaPhoneIcon,
  MenuIcon,
  QuestionMarkIcon,
  SchoolManagementIcon,
  SubscriptionIcon,
  SystemSecurityIcon,
} from "~/assets/icon";

const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      name: "DASHBOARD",
      route: "/",
      icon: MenuIcon,
    },
    {
      id: 2,
      name: "SCHOOL MANAGEMENT",
      route: "/school-management",
      icon: SchoolManagementIcon,
    },
    {
      id: 3,
      name: "USER & ADMIN MANAGEMENT",
      route: "/user-admin-management",
      icon: AdminManagementIcon,
    },
    {
      id: 4,
      name: "SUBSCRIPTIONS & PAYMENTS TRACKING",
      route: "/subscriptions-payments-tracking",
      icon: SubscriptionIcon,
    },
    {
      id: 5,
      name: "CONTENT  & WEBSITE MANAGEMENT",
      route: "/content-website-management",
      icon: ContentIcon,
    },
    {
      id: 6,
      name: "ANALYTICS & REPORTING",
      route: "/analytics-reporting",
      icon: AnalyticsIcon,
    },
    {
      id: 7,
      name: "REVENUE ANALYTICS",
      route: "/revenue-analytics",
      icon: AnalyticsIcon,
    },
    {
      id: 8,
      name: "SUPPORT & OPERATIONS",
      route: "/support-operations",
      icon: AnalyticsIcon,
    },
    {
      id: 9,
      name: "SYSTEM & SECURITY",
      route: "/system-security",
      icon: SystemSecurityIcon,
    },
    {
      id: 10,
      name: "CONFIGURATIONS",
      route: "/configurations",
      icon: ConfigurationIcon,
    },
    {
      id: 11,
      name: "MARKETING & AFFILIATES",
      route: "/marketing-affiliates",
      icon: MegaPhoneIcon,
    },
    {
      id: 12,
      name: "HELP CENTER",
      route: "/help-center",
      icon: QuestionMarkIcon,
    },
    {
      id: 13,
      name: "SYSTEM HEALTH STATUS",
      route: "/system-health-status",
      icon: QuestionMarkIcon,
    },
  ];

  return (
    <div className="bg-[#333232] border-2 border-[#159D6233] flex flex-col items-start gap-8 pb-24 pt-14 px-2 ml:px-4 lg:px-5 min-h-full">
      <img
        src="/images/schooleanLogo.png"
        alt="Logo"
        className="w-30 lg:w-37 pl-2 lg:pl-4"
      />
      <div className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 lg:py-3 px-2 lg:px-4 text-[#F1F0F0] rounded-[10px] transition-colors ${
                isActive
                  ? "bg-[#159D62]"
                  : "hover:bg-[#159D62]/40 cursor-pointer"
              }`
            }
          >
            <div className="bg-white rounded-[7px] lg:rounded-[10px] p-1.25 lg:p-2">
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <p className="text-[clamp(10px,1vw,14px)] font-medium ml:font-semibold">
              {item.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
