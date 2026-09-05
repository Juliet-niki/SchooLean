import { useState } from "react";
import {
  CreateIcon,
  ExportIcon,
  ImageIcon,
  ScheduleIcon,
  SendIcon,
  TablerIcon,
} from "~/assets/Icons";
import { cn } from "~/lib/utils";
import CreateAnnouncement from "../components/CreateAnnouncement";
import ScheduledAnnouncements from "../components/ScheduledAnnouncements";
import SentAnnouncements from "../components/SentAnnouncements";
import AnnouncementTemplates from "../components/AnnouncementTemplates";
import { Button } from "~/components/ui/button";

const ANNOUNCEMENTS_CARD = [
  {
    key: "create",
    icon: <CreateIcon className="w-4 h-4 md:w-6 md:h-6" />,
    iconBg: "#0EB26B14",
    title: "Create Announcement",
    description:
      "Create and send announcements to users across the Schoolean platform",
  },
  {
    key: "scheduled",
    icon: <ScheduleIcon className="w-4 h-4 md:w-6 md:h-6" />,
    iconBg: "#E59C1514",
    title: "Scheduled Announcement",
    description:
      "Manage announcements that are scheduled to be sent in the future",
  },
  {
    key: "sent",
    icon: <SendIcon className="w-4 h-4 md:w-6 md:h-6" />,
    iconBg: "#1C88BE14",
    title: "Sent Announcement",
    description:
      "View announcement that have been sent and their and their delivery performance",
  },
  {
    key: "report",
    icon: <ImageIcon className="w-4 h-4 md:w-6 md:h-6" />,
    iconBg: "#F54F5214",
    title: "Announcement Report",
    description:
      "View delivery and engagement analytics for sent announcements.",
  },
  {
    key: "templates",
    icon: <TablerIcon className="w-4 h-4 md:w-6 md:h-6" />,
    iconBg: "#881CBE14",
    title: "Announcement Templates",
    description: "Create and manage reusable announcement templates.",
  },
];

const Announcements = () => {
  const [activeCard, setActiveCard] = useState("create");

  const activeCardData = ANNOUNCEMENTS_CARD.find(
    (card) => card.key === activeCard,
  )!;

  const handleCardChange = (key: string) => {
    setActiveCard(key);
  };

  return (
    <div className="min-h-screen w-full px-4 ml:px-6 py-4 ml:py-8 text-[#4E4E4E] bg-[#EDEDED] flex flex-col">
      {/* Header */}

      <div className="flex flex-col gap-1">
        <h2 className="text-[clamp(16px,1.8vw,24px)] font-semibold leading-tight">
          {activeCardData.title}
        </h2>
        <p className="text-[#868686] text-[clamp(12px,1.4vw,15px)] font-medium">
          {activeCardData.description}
        </p>
      </div>

      <div className="ml-auto">
        {activeCard === "templates" && (
          <Button
            variant="secondary"
            size="sm"
            className=" bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white h-10 px-6 rounded-[5px]"
            onClick={() => {}}
          >
            <span>
              <CreateIcon className="w-3 h-3 md:w-5 md:h-5 mr-2" fill="#fff" />
            </span>
            <span> Create Template</span>
          </Button>
        )}
        {activeCard === "report" && (
          <Button
            variant="secondary"
            size="sm"
            className=" bg-white hover:bg-white/90 text-[#0EB26B] border border-[#CACACA] h-10 px-6 rounded-[5px]"
            onClick={() => {}}
          >
            <span>
              <ExportIcon className="w-3 h-3 md:w-5 md:h-5 mr-2" />
            </span>
            <span> Export Report</span>
          </Button>
        )}
      </div>

      {/* Announcements Card */}
      <div
        className={cn(
          "w-full overflow-x-auto hide-scrollbar py-2 px-1",
          activeCard === "templates" || activeCard === "report"
            ? "my-2 md:my-4 lg:my-6"
            : "my-6 md:my-8 lg:my-10",
        )}
      >
        <div className="flex items-center gap-5">
          {ANNOUNCEMENTS_CARD.map((item) => {
            const isActive = item.key === activeCard;
            return (
              <div
                key={item.key}
                role="button"
                tabIndex={0}
                onClick={() => handleCardChange(item.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleCardChange(item.key);
                }}
                className={cn(
                  "grid grid-cols-[auto_1fr] items-start shadow-sm shadow-[#00000026] rounded-[7px] p-4 gap-4 w-full cursor-pointer transition-colors outline-none border",
                  isActive ? "border-[#0EB26B] " : "border-[#D9D9D9]",
                )}
              >
                <div>{item.icon}</div>

                <h3 className="text-[clamp(14px,1.6vw,16px)] font-semibold leading-tight">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Announcements Content */}
      <div className="h-full w-full">
        {activeCard === "create" && (
          <>
            <CreateAnnouncement />
          </>
        )}
        {activeCard === "scheduled" && <ScheduledAnnouncements />}
        {activeCard === "sent" && <SentAnnouncements />}
        {activeCard === "report" && <div> Announcement Report</div>}
        {activeCard === "templates" && (
          <div>
            <AnnouncementTemplates />
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
