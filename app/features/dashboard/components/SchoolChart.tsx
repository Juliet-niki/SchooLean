import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CapitalizeFirstLetter } from "~/utils/formatText";

interface SchoolChartProps {
  data: { x: string; schools: number }[];
  xLabel: string | null;
  yDomain: [number, number];
  yTickCount: number;
}

const SchoolChart = ({
  data,
  xLabel,
  yDomain,
  yTickCount,
}: SchoolChartProps) => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: xLabel ? 30 : 10,
          }}
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
            label={
              xLabel
                ? {
                    value: xLabel,
                    position: "insideBottom",
                    offset: -15,
                    fill: "#484848",
                    fontSize: 14,
                  }
                : undefined
            }
          />
          <YAxis
            domain={yDomain}
            tickCount={yTickCount}
            tick={{ fill: "#000", fontSize: 12 }}
            axisLine={{ stroke: "#6C6C6C" }}
            tickLine={false}
            label={{
              value: "Number of Schools",
              angle: -90,
              position: "insideLeft",
              offset: 3,
              fill: "#484848",
              fontSize: 14,
              dy: 70,
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
          <Line
            type="monotone"
            dataKey="schools"
            stroke="#882C87"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SchoolChart;
