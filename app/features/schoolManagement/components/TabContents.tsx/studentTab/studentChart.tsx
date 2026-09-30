import { Cell, Pie, PieChart } from "recharts";

interface StudentChartProps {
  value: number;
  color: string;
  trackColor: string;
}

export const StudentChart = ({
  value,
  color,
  trackColor,
}: StudentChartProps) => {
  const chartData = [
    { name: "value", value },
    { name: "remaining", value: 100 - value },
  ];

  return (
    <div className="relative w-30 h-30 shrink-0">
      <PieChart width={120} height={120}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={55}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          strokeWidth={0}
        >
          <Cell fill={color} />
          <Cell fill={trackColor} />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-medium text-[clamp(16px,1.9vw,24px)] text-[#4E4E4E]">
          {Math.round(value)}%
        </p>
      </div>
    </div>
  );
};
