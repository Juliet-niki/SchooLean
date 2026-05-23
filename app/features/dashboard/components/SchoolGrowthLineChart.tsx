import { CalendarIcon, FilledDownIcon, TrendUpIcon } from "~/assets/Icons";
import PopoverDropdown from "../../../components/PopoverDropdown";
import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarRange } from "~/components/ui/calendarRange";
import type { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { SCHOOL_ANALYTICS_DATA } from "~/data/schoolData";
import SchoolChart from "./SchoolChart";

// Trends
const TRENDS = {
  daily: {
    label: "School Onboarding Trend (Daily View)",
    subtext: null,
    xLabel: null,
    yDomain: [0, 1000] as [number, number],
    yTickCount: 11,
  },
  weekly: {
    label: "School Weekly Onboarding Trend (Weekly Breakdown)",
    subtext: "Sun - Sat (Complete data)",
    xLabel: "Days of The Week",
    yDomain: [0, 10000] as [number, number],
    yTickCount: 11,
  },
  monthly: {
    label: "School Monthly Onboarding Trend (Yearly View)",
    subtext: "Jan - Dec (Complete data)",
    xLabel: "Months of The Year",
    yDomain: [0, 10000] as [number, number],
    yTickCount: 11,
  },
};

const today = new Date();

const TREND_OPTIONS = Object.entries(TRENDS).map(([key, value]) => ({
  label: value.label,
  value: key,
}));

const YEAR_OPTIONS = Object.keys(SCHOOL_ANALYTICS_DATA).map((year) => ({
  label: year,
  value: year,
}));

const SchoolGrowthLineChart = () => {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedTrend, setSelectedTrend] =
    useState<keyof typeof TRENDS>("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 7),
  });

  const formattedRange = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return "";
    return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
  }, [dateRange]);

  const yearData =
    SCHOOL_ANALYTICS_DATA[selectedYear] ?? SCHOOL_ANALYTICS_DATA["2026"];

  const trend = TRENDS[selectedTrend];
  const data = yearData[selectedTrend];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-[#404040] text-[clamp(14px,1.6vw,18px)]">
          SCHOOL ONBOARDING ANALYTICS GROWTH CHART
        </h2>
        {/* Year Dropdown */}
        <PopoverDropdown
          icon={<FilledDownIcon className="w-4 h-4" />}
          options={YEAR_OPTIONS}
          onChange={setSelectedYear}
        />
      </div>

      <div className="bg-white rounded-2xl py-6 px-6 space-y-6">
        {/* Chart Header */}
        <div className="flex items-start justify-between ml-40">
          <div className="flex items-start gap-2 ">
            <div className="bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] rounded-[10px] p-2">
              <TrendUpIcon className="w-4 h-4" />
            </div>

            {/* Trend Dropdown */}
            <div className="space-y-1">
              <PopoverDropdown
                icon={<FilledDownIcon className="w-4 h-4" />}
                options={TREND_OPTIONS}
                BtnClassName="text-[#323333] font-bold"
                onChange={(value) =>
                  setSelectedTrend(value as keyof typeof TRENDS)
                }
              />
              <p className="text-[#5C5C5C] text-xs">
                {selectedTrend === "daily" ? formattedRange : trend.subtext}
              </p>
            </div>
          </div>

          {/* Date Picker */}
          {selectedTrend === "daily" && (
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="cursor-pointer">
                  <CalendarIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0 border-0 rounded-md">
                <CalendarRange value={dateRange} onChange={setDateRange} />
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Chart */}
        <SchoolChart
          data={data}
          xLabel={trend.xLabel}
          yDomain={trend.yDomain}
          yTickCount={trend.yTickCount}
        />
      </div>
    </div>
  );
};

export default SchoolGrowthLineChart;
