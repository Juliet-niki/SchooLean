import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  TrendIcon,
  TrophyIcon,
  TriangleAlertIcon,
  StarIcon,
  FileTextIcon,
} from "~/assets/Icons";
import { cn } from "~/lib/utils";
import type { IPerformanceAnalytics } from "~/types";
import { CapitalizeFirstLetter } from "~/utils/formatText";

// ---- Horizontal Bar ----
const HorizontalBar = ({
  label,
  value,
  color,
  labelClassName,
}: {
  label: string;
  value: number;
  color: string;
  labelClassName: string;
}) => (
  <div className="flex items-center gap-3 text-[#4E4E4E] font-medium">
    <p
      className={cn(
        "text-nowrap text-right text-[clamp(12px,1.4vw,16px)]",
        labelClassName,
      )}
    >
      {label}
    </p>
    <div className="flex-1 h-4 w-full ">
      <div
        className="h-full rounded-[5px] transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
    <p className="font-semibold text-[clamp(14px,1.6vw,18px)]">{value}%</p>
  </div>
);

// ---- Smart Insight Card ----
const InsightCard = ({
  insight,
}: {
  insight: {
    type: "warning" | "success";
    subject: string;
    message: string;
    change: number;
  };
}) => (
  <div className="border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-[10px] px-4 py-3 flex items-start gap-3">
    <div>
      {insight.type === "warning" ? (
        <TriangleAlertIcon className="w-5 h-5" color="#FFC444" />
      ) : (
        <StarIcon className="w-4 h-4" />
      )}
    </div>
    <div className="text-[clamp(14px,1.4vw,16px)] font-medium text-[#4E4E4E] ">
      <p>
        {insight.subject} {insight.message}
      </p>
      <p className="text-[clamp(12px,1.2vw,14px)]">
        By
        <span
          className={`text-[clamp(16px,1.6vw,18px)] mx-1 ${insight.type === "warning" ? "text-[#E81E1E]" : "text-[#0EB26B]"}`}
        >
          {Math.abs(insight.change)}
        </span>
        percent this term
      </p>
    </div>
  </div>
);

// ---- Main Component ----
const PerformanceAnalytics = ({
  analytics,
}: {
  analytics: IPerformanceAnalytics;
}) => {
  const trendImprovement =
    analytics.performanceTrend[analytics.performanceTrend.length - 1].average -
    analytics.performanceTrend[0].average;

  const performanceTrendWithIndex = analytics.performanceTrend.map(
    (item, i) => ({
      ...item,
      index: i,
    }),
  );

  const getBarColor = (score: number) => {
    if (score > 80) return "#068F54";
    if (score >= 70) return "#55A683";
    if (score >= 60) return "#568973";
    if (score >= 50) return "#B49F70";
    if (score >= 45) return "#E5C16F";
    if (score >= 40) return "#F1A94E";
    return "#B16767";
  };

  return (
    <div className="flex flex-col gap-6 px-3 md:px-6 pt-4 pb-10 border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-[13px]">
      <h2 className="text-[#4E4E4E] text-[clamp(18px,2vw,24px)] font-bold">
        Performance Analytics
      </h2>

      {/* Stats Row */}
      <div className="border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-[13px] grid grid-cols-1 sm:flex items-stretch sm:justify-center flex-wrap gap-3 sm:gap-5 lg:gap-10 px-4 py-4">
        {[
          {
            icon: TrendIcon,
            label: "School Average",
            value: `${analytics.schoolAverage}%`,
          },
          {
            icon: TrophyIcon,
            label: "Top Class",
            value: `${analytics.topClass.average}%`,
            subLabel: analytics.topClass.name,
          },
          {
            icon: TriangleAlertIcon,
            label: "Lowest Score",
            value: `${analytics.lowestScore.score}%`,
            subLabel: analytics.lowestScore.subject,
          },
          {
            icon: StarIcon,
            label: "Best Performing",
            value: `${analytics.bestPerforming.score}%`,
            subLabel: analytics.bestPerforming.subject,
          },
          {
            icon: FileTextIcon,
            label: "Report Cards",
            value: analytics.reportCardsGenerated,
            subLabel: "Generated",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 py-2 px-2 lg:px-4 text-[#4E4E4E] font-semibold border border-[#CFCFCF] rounded-[7px]"
          >
            <div className="flex items-center gap-1.5 lg:gap-2 text-[clamp(12px,1.3vw,15px)]">
              <stat.icon className="w-4 h-4" />
              <p>{stat.label}</p>
            </div>
            {stat.subLabel && (
              <p className="text-[clamp(13px,1.4vw,16px)]">{stat.subLabel}</p>
            )}
            <p
              className={`${index === 0 || index === 1 ? "text-[clamp(15px,2vw,20px)]" : "text-[clamp(12px,1.3vw,15px)]"}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Performance Trend  + Subject + Class Performance */}
      <div className="grid ml:grid-cols-[2.1fr_1fr] lg:grid-cols-[2.5fr_1fr] gap-5 text-[#4E4E4E] font-medium">
        <div className="flex flex-col gap-5">
          {/* Performance Trend  */}
          <div className="flex flex-col border border-[#E9E9E9] shadow-md rounded-[13px] p-3 lg:p-5">
            <h3 className="font-semibold text-[clamp(16px,1.6vw,18px)]">
              Performance Trend
            </h3>
            <p className="text-[clamp(12px,1.2vw,15px)] mb-4 ml-auto">
              Average Score
            </p>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceTrendWithIndex}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="1 1"
                    stroke="#E4E4E4"
                    strokeWidth={2.5}
                    vertical={false}
                  />
                  <ReferenceLine
                    x={0.5}
                    stroke="#E4E4E4"
                    strokeDasharray="1 1"
                  />
                  <ReferenceLine
                    x={1.5}
                    stroke="#E4E4E4"
                    strokeDasharray="1 1"
                  />

                  <XAxis
                    dataKey="index"
                    type="number"
                    domain={[0, analytics.performanceTrend.length - 1]}
                    ticks={[0, 1, 2]}
                    tickFormatter={(value) =>
                      analytics.performanceTrend[value]?.term ?? ""
                    }
                    padding={{ left: 30, right: 30 }}
                    tick={{ fill: "#4E4E4E", fontSize: 14 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[50, 100]}
                    tickCount={6}
                    tick={{ fill: "#4E4E4E", fontSize: 14 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E0E0E0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(
                      value: number | undefined,
                      name: string | undefined,
                    ) => [
                      (value ?? 0).toLocaleString(),
                      CapitalizeFirstLetter(name) ?? "",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="#3199BF"
                    strokeWidth={1}
                    dot={{ r: 7 }}
                    activeDot={{ r: 7, stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[clamp(12px,1.2vw,14px)] mt-1">
              Improved by{" "}
              <span className="text-[clamp(16px,1.6vw,18px)] text-[#0EB26B]">
                {trendImprovement}%
              </span>{" "}
              from term 1 to term 3
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {/* Subject Performance */}
            <div className="border border-[#E9E9E9] shadow-sm rounded-[13px]  p-3 lg:p-5 space-y-3">
              <h3 className="font-semibold text-[clamp(16px,1.6vw,18px)]">
                Subject Performance
              </h3>
              <div className="flex flex-col gap-2">
                {analytics.subjectPerformance.map((item) => (
                  <HorizontalBar
                    key={item.subject}
                    label={item.subject}
                    value={item.average}
                    color={getBarColor(item.average)}
                    labelClassName="w-24 sm:w-28"
                  />
                ))}
              </div>
            </div>

            {/* Class Performance */}
            <div className="border border-[#E9E9E9] shadow-sm rounded-[13px]  p-3 lg:p-5 space-y-3">
              <h3 className="font-semibold text-[clamp(16px,1.6vw,18px)]">
                Class Performance
              </h3>
              <div className="flex flex-col gap-2">
                {analytics.classPerformance.map((item) => (
                  <HorizontalBar
                    key={item.class}
                    label={item.class}
                    value={item.average}
                    color={getBarColor(item.average)}
                    labelClassName="w-12"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Smart Insights */}
        <div className="border border-[#E9E9E9] shadow-sm rounded-[13px] px-4 lg:px-6 py-5 space-y-3">
          <h3 className="font-semibold text-[clamp(16px,1.6vw,18px)]">
            Smart Insight
          </h3>
          <div className="flex flex-col gap-5">
            {analytics.smartInsights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
