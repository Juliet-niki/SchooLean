import { ActivityIcon } from "~/assets/Icons";
import { STUDENT_PROFILE_MOCK, type IActivity } from "../components/mock";
import SectionHeader from "../components/SectionHeader";
import { formatDate, formatTime } from "~/utils/formatDate";
import { formatNaira } from "../components/helpers";
import StatusView from "~/components/StatusView";

const ActivityTab = () => {
  const activities = STUDENT_PROFILE_MOCK.activity;

  const getStatusLabel = (item: IActivity) => {
    if (item.type === "PAYMENT") {
      return item.status === "SUCCESS"
        ? "Successful"
        : item.status === "PENDING"
          ? "Pending"
          : "Failed";
    }
    return item.source === "SYSTEM"
      ? "System"
      : item.source === "ADMIN"
        ? "Admin"
        : "Student";
  };

  return (
    <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[clamp(15px,1.6vw,18px)] text-[#4E4E4E]">
      <SectionHeader
        title="Activity"
        icon={<ActivityIcon className="size-5 ml:size-6" fill="#0EB26B" />}
      />
      <div className="px-3 ml:px-5 pt-2 ml:pt-3 pb-6 ml:pb-10">
        <div className="border border-[#D9D9D9] rounded-[10px] px-4 md:px-14">
          {activities.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 md:grid-cols-[1.2fr_1.5fr_1fr_1fr] items-center gap-x-4 gap-y-3 py-4"
            >
              {/* Date */}
              <div className="flex flex-col order-3 md:order-1">
                <span className="text-[#313131] font-semibold text-[clamp(13px,1.4vw,15px)]">
                  {formatDate(item.at)}
                </span>
                <span className="text-[#868686] text-[clamp(12px,1.3vw,14px)]">
                  {formatTime(item.at)}
                </span>
              </div>

              {/* Title */}
              <div className="flex flex-col order-1 md:order-2 min-w-0">
                <span className="text-[#313131] font-bold text-[clamp(14px,1.5vw,16px)] truncate">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-[#868686] font-medium text-[clamp(13px,1.4vw,15px)] truncate">
                    {item.subtitle}
                  </span>
                )}
              </div>

              {/* Amount: hidden on mobile when empty, kept on desktop so columns stay aligned */}
              <div
                className={`order-4 md:order-3 text-right md:text-center ${
                  item.amount === undefined ? "hidden md:block" : ""
                }`}
              >
                {item.amount !== undefined && (
                  <span className="text-[#313131] font-bold text-[clamp(14px,1.5vw,16px)]">
                    {formatNaira(item.amount)}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="order-2 md:order-4 justify-self-end md:justify-self-start">
                <StatusView
                  variant="soft"
                  status={getStatusLabel(item)}
                  green="Successful"
                  red="Failed"
                  purple="Pending"
                  yellow="Student"
                  blue={item.source === "SYSTEM" ? "System" : "Admin"}
                  classText="rounded-[10px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
