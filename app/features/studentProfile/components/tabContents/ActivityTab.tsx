import { studentProfileMock } from "../mock";
import { formatDate, formatTime, formatNaira } from "../helpers";
import { DashedMenuIcon } from "~/assets/Icons";

const BADGE_STYLES: Record<string, string> = {
  Successful: "bg-[#E4F4EC] text-[#0EB26B]",
  System: "bg-[#E8F1FC] text-[#2392E7]",
  Admin: "bg-[#E8F1FC] text-[#2392E7]",
  Student: "bg-[#FCF4E8] text-[#E79223]",
};

const ActivityTab = () => {
  const activities = studentProfileMock.activity;

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden bg-white">
        <div className="bg-[#E4F4EC] px-6 py-4 flex items-center gap-2 text-[#0EB26B]">
          <div className="w-5 h-5 flex items-center justify-center bg-[#0EB26B] rounded-sm text-white">
            <DashedMenuIcon className="w-3 h-3 stroke-white" />
          </div>
          <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
            Activity
          </h3>
        </div>
        <div className="p-6 md:p-10">
          <div className="flex flex-col gap-6">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E4E4E4] last:border-0 pb-6 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full">
                  <div className="flex flex-col w-32 shrink-0">
                    <span className="text-[#313131] font-semibold text-[clamp(13px,1.4vw,15px)]">
                      {formatDate(item.at)}
                    </span>
                    <span className="text-[#868686] text-[clamp(12px,1.3vw,14px)]">
                      {formatTime(item.at)}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1">
                    <span className="text-[#313131] font-bold text-[clamp(14px,1.5vw,16px)]">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[#868686] font-medium text-[clamp(13px,1.4vw,15px)]">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  {item.amount !== undefined && (
                    <div className="md:w-32 text-left md:text-right">
                      <span className="text-[#313131] font-bold text-[clamp(14px,1.5vw,16px)]">
                        {formatNaira(item.amount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center md:justify-end w-32 shrink-0">
                    <span
                      className={`px-4 py-1.5 rounded-full font-semibold text-[clamp(12px,1.3vw,14px)] ${BADGE_STYLES[item.source]}`}
                    >
                      {item.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
