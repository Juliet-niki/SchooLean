import { useNavigate } from "react-router";
import {
  CustomerSuccessIcon,
  CustomerSupportIcon,
  FinanceIcon,
  LeftIcon,
  SecurityIcon,
  SystemIcon,
} from "~/assets/Icons";
import { Button } from "~/components/ui/button";

const Notifications = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(`/`);
  return (
    <div className="my-8 mx-6 md:my-10 md:mx-9">
      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={goBack}
        >
          <LeftIcon className="w-6 h-6 md:w-7 md:h-7" />
        </Button>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#4E4E4E] text-[clamp(16px,1.8vw,24px)] font-semibold leading-tight">
            Customer Success & Sales
          </h2>
          <p className="text-[#868686] text-[clamp(12px,1.4vw,16px)] font-medium">
            Operational alert that require your attention and action
          </p>
        </div>
      </div>
      <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {[
          {
            key: 1,
            icon: <CustomerSuccessIcon className="w-6 h-6 md:w-8 md:h-8" />,
            iconBg: "#0EB26B14",
            title: "Customer Success & Sales",
            totalUnread: 5,
            textColor: "#0EB26B",
          },
          {
            key: 2,
            icon: <FinanceIcon className="w-6 h-6 md:w-8 md:h-8" />,
            iconBg: "#E59C1514",
            title: "Finance",
            totalUnread: 7,
            textColor: "#E59C15",
          },
          {
            key: 3,
            icon: <CustomerSupportIcon className="w-6 h-6 md:w-8 md:h-8" />,
            iconBg: "#1C88BE14",
            title: "Customer Support",
            totalUnread: 5,
            textColor: "#1C88BE",
          },
          {
            key: 4,
            icon: <SecurityIcon className="w-6 h-6 md:w-8 md:h-8" />,
            iconBg: "#F54F5214",
            title: "Security",
            totalUnread: 7,
            textColor: "#F54F52",
          },
          {
            key: 5,
            icon: <SystemIcon className="w-6 h-6 md:w-8 md:h-8" />,
            iconBg: "#881CBE14",
            title: "System",
            totalUnread: 7,
            textColor: "#881CBE",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="grid grid-cols-[auto_1fr] items-center border border-[#D9D9D9] shadow shadow-[#00000026] rounded-[7px] p-4 gap-5 w-full"
          >
            <div
              className="rounded-[7px] flex items-center justify-center w-[47px] h-[50px] shrink-0"
              style={{ backgroundColor: item.iconBg }}
            >
              {item.icon}
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <h3 className="text-[#4E4E4E] text-[clamp(14px,1.6vw,16px)] font-semibold leading-tight">
                {item.title}
              </h3>

              <div className="flex items-center gap-2 mt-auto">
                <p
                  className="font-semibold text-[clamp(18px,1.8vw,24px)]"
                  style={{ color: item.textColor }}
                >
                  {item.totalUnread}
                </p>

                <p className="text-[#7D7D7DEE] text-[clamp(12px,1.4vw,14px)] font-medium">
                  Unread
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
