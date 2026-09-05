import { useState } from "react";
import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { cn } from "~/lib/utils";
import type { TypeFormSchema } from "../CreateAnnouncement";
import { FormLabel } from "~/components/ui/form";

interface AnnouncementPreviewCardProps {
  control: Control<TypeFormSchema>;
}

export function AnnouncementPreviewCard({
  control,
}: AnnouncementPreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"mobile" | "web">("mobile");

  const title = useWatch({ control, name: "announcementTitle" });
  const message = useWatch({ control, name: "announcementMessage" });

  const displayTitle = title || "Your announcement title";
  const displayMessage =
    message || "Your announcement message will appear here...";

  return (
    <div className="flex flex-col bg-white rounded-[7px] border border-[#D9D9D9] shadow-sm shadow-[#00000026] overflow-hidden">
      <div className="bg-[#0EB26B08] px-6 py-3 border-b border-[#D9D9D9]">
        <FormLabel className="text-[#4E4E4EEE] text-[clamp(15px,1.4vw,16px)] font-medium">
          Preview
        </FormLabel>
      </div>

      <div className="flex border-b border-[#EDEDED]">
        {[
          { key: "mobile" as const, label: "Mobile App" },
          { key: "web" as const, label: "Web App" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 py-3 text-[clamp(13px,1.3vw,15px)] font-semibold border-b-2 transition-colors",
              activeTab === tab.key
                ? "text-[#0EB26B] border-[#0EB26B]"
                : "text-[#868686] border-transparent",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "mobile" ? (
          <div className="border border-[#D9D9D9] rounded-[10px] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/images/schooleanLogo.png"
                  alt="Schoolean"
                  className="h-5"
                />
              </div>
              <span className="text-[#4E4E4EEE] text-xs font-medium">Now</span>
            </div>
            <h3 className="text-[#4E4E4EEE] font-semibold text-[clamp(14px,1.4vw,16px)] truncate ">
              {displayTitle}
            </h3>
            <p className="text-[#4E4E4EEE] text-[clamp(12px,1.2vw,14px)] line-clamp-2">
              {displayMessage}
            </p>
            <button
              type="button"
              className="text-[#0EB26B] hover:text-[#0EB26B]/80 text-[clamp(12px,1.2vw,14px)] font-semibold text-left mt-3 cursor-pointer"
            >
              View Details
            </button>
          </div>
        ) : (
          <div className="border border-[#EDEDED] rounded-[10px] overflow-hidden">
            <div className="bg-[#F9F9F9] px-3 py-2 border-b border-[#EDEDED] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E93F3F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E59C15]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#0EB26B]" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-[#4E4E4E] font-semibold text-[clamp(14px,1.4vw,16px)] truncate">
                {displayTitle}
              </h3>
              <p className="text-[#868686] text-[clamp(12px,1.2vw,14px)] line-clamp-3">
                {displayMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
