import { FilledDownIcon } from "~/assets/icon";
import PopoverDropdown from "./PopoverDropdown";
import { useMemo, useState } from "react";
import { PLATFORM_ACTIVITY_DATA } from "~/data";
import PlatformChart from "./PlatformChart";

export const usersMeta = [
  { key: "students", label: "Students", color: "#0EB26B" },
  { key: "staff", label: "Staff", color: "#0F70AC" },
  { key: "parents", label: "Parents", color: "#0D633E" },
];

const YEAR_OPTIONS = Object.keys(PLATFORM_ACTIVITY_DATA).map((year) => ({
  label: year,
  value: year,
}));

const PlatformActivityLineChart = () => {
  const [selectedYear, setSelectedYear] = useState("2026");

  const data =
    PLATFORM_ACTIVITY_DATA[
      selectedYear as keyof typeof PLATFORM_ACTIVITY_DATA
    ] ?? PLATFORM_ACTIVITY_DATA["2026"];

  const totals = useMemo(
    () => ({
      students: data.reduce((sum, d) => sum + d.students, 0),
      staff: data.reduce((sum, d) => sum + d.staff, 0),
      parents: data.reduce((sum, d) => sum + d.parents, 0),
    }),
    [data],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-[#404040] text-[clamp(14px,1.6vw,18px)]">
          PLATFORM ACTIVITY OVERVIEW
        </h2>
        <PopoverDropdown
          icon={<FilledDownIcon className="w-4 h-4" />}
          options={YEAR_OPTIONS}
          onChange={setSelectedYear}
        />
      </div>

      <div className="bg-white rounded-2xl py-6 px-6 space-y-6">
        {/* Legend */}
        <div className="flex items-center justify-around">
          {usersMeta.map((user) => (
            <div key={user.key} className="flex flex-col items-center">
              <p className="font-medium text-[12px] text-[#404040]">
                {user.label}
              </p>
              <p
                className="font-semibold text-[10px] flex items-center gap-1"
                style={{ color: user.color }}
              >
                <span
                  className="w-3 h-3 rounded-full border-3 inline-block"
                  style={{ borderColor: user.color }}
                />
                {totals[user.key as keyof typeof totals].toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <PlatformChart data={data} />
      </div>
    </div>
  );
};

export default PlatformActivityLineChart;
