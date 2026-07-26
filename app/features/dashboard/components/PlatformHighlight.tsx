import { FilledDownIcon } from "~/assets/Icons";
import PopoverDropdown from "../../../components/PopoverDropdown";
import { useState } from "react";
import { PLATFORM_HIGHLIGHTS_DATA } from "~/data/schoolData";

const PlatformHighlight = () => {
  const PLATFORM_HIGHLIGHTS_META = [
    {
      key: "reportCards",
      title: "Report Cards Generated",
      image: "/avatars/reportCardGenerated.svg",
    },
    {
      key: "feePayment",
      title: "Fee Payment Initiated & Completed",
      image: "/avatars/feePayment.svg",
    },
    {
      key: "cbtExams",
      title: "CBT Exams Created & Attempted",
      image: "/avatars/cbtExamsCreated.svg",
    },
    {
      key: "premiumPlan",
      title: "Schools Using Premium Plan",
      image: "/avatars/premiumPlan.svg",
    },
    {
      key: "standardPlan",
      title: "Schools Using Standard Plan",
      image: "/avatars/standardPlan.svg",
    },
  ];

  const YEAR_OPTIONS = Object.keys(PLATFORM_HIGHLIGHTS_DATA).map((year) => ({
    label: year,
    value: year,
  }));

  const [selectedYear, setSelectedYear] = useState("2026");

  // per-card month state, e.g. { reportCards: "January", feePayment: "March", ... }
  const [selectedMonths, setSelectedMonths] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        PLATFORM_HIGHLIGHTS_META.map((item) => [item.key, "January"]),
      ),
  );

  // month list is the same across cards, so derive options from any one key
  const MONTH_OPTIONS = PLATFORM_HIGHLIGHTS_DATA[selectedYear][
    PLATFORM_HIGHLIGHTS_META[0].key
  ].map(({ month }) => ({
    label: `${month.slice(0, 3)} ${selectedYear}`,
    value: month,
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="ml-auto">
        <PopoverDropdown
          icon={<FilledDownIcon className="w-4 h-4" />}
          options={YEAR_OPTIONS}
          defaultSelected={selectedYear}
          onChange={setSelectedYear}
        />
      </div>

      <div className="bg-white rounded-2xl py-6 px-4 lg:px-7">
        <div className="grid grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-7">
          {PLATFORM_HIGHLIGHTS_META.map((item) => {
            const monthForCard = selectedMonths[item.key];
            const entry = PLATFORM_HIGHLIGHTS_DATA[selectedYear][item.key].find(
              (d) => d.month === monthForCard,
            );

            return (
              <div
                key={item.key}
                className="flex flex-col gap-3 items-center rounded-[10px] font-medium text-[clamp(10px,1.2vw,14px)] shadow-lg shadow-[#00000040] border-[0.5px] pt-2 pb-3 px-1"
              >
                <img src={item.image} alt={item.title} className="w-14 h-14" />
                <p className="text-[#484848] text-center px-2">{item.title}</p>
                <div className="mt-auto flex flex-col items-center gap-3">
                  <PopoverDropdown
                    options={MONTH_OPTIONS}
                    defaultSelected={monthForCard}
                    label={`${monthForCard.slice(0, 3)} ${selectedYear}`}
                    icon={<FilledDownIcon className="w-3 h-3" />}
                    BtnClassName="text-[#101010] text-[clamp(10px,1vw,12px)] bg-[#E2E2E2] py-1 px-5 rounded-lg gap-2"
                    onChange={(value) =>
                      setSelectedMonths((prev) => ({
                        ...prev,
                        [item.key]: value,
                      }))
                    }
                  />
                  <p className="text-[#2E2E2E] font-semibold">
                    {entry?.digit.toLocaleString() ?? "—"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformHighlight;
