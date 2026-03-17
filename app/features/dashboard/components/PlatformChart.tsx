import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usersMeta } from "./PlatformActivityLineChart";
import { CapitalizeFirstLetter } from "~/utils/formatText";

interface PlatformChartProps {
  data: { x: string; students: number; staff: number; parents: number }[];
}

const PlatformChart = ({ data }: PlatformChartProps) => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="1 1"
            stroke="#F1F1F1"
            strokeWidth={1.5}
            vertical={false}
          />
          <XAxis
            dataKey="x"
            padding={{ left: 30, right: 30 }}
            tick={{ fill: "#000", fontSize: 12 }}
            axisLine={{ stroke: "#6C6C6C" }}
            tickLine={false}
            label={{
              value: "Days of the week",
              position: "insideBottom",
              offset: -15,
              fill: "#484848",
              fontSize: 14,
            }}
          />
          <YAxis
            domain={[0, 10000]}
            tickCount={11}
            tick={{ fill: "#000", fontSize: 12 }}
            axisLine={{ stroke: "#6C6C6C" }}
            tickLine={false}
            label={{
              value: "Total Daily Active Users",
              angle: -90,
              position: "insideLeft",
              offset: 3,
              fill: "#484848",
              fontSize: 14,
              dy: 80,
            }}
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
          {usersMeta.map((user) => (
            <Line
              key={user.key}
              type="monotone"
              dataKey={user.key}
              stroke={user.color}
              strokeWidth={2}
              dot={{ r: 4, fill: user.color }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformChart;
