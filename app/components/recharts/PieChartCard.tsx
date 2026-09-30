import type { ReactNode } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { cn } from "~/lib/utils";

interface PieChartProps {
  value: number;
  color: string;
  trackColor: string;
  isText?: boolean;
  text?: ReactNode;
  size?: number;
  valueClass?: string;
}

export const PieChartCard = ({
  value,
  color,
  trackColor,
  isText,
  text,
  size = 120,
  valueClass,
}: PieChartProps) => {
  const chartData = [
    { name: "value", value },
    { name: "remaining", value: 100 - value },
  ];

  const outerRadius = size * 0.46;
  const innerRadius = size * 0.34;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          strokeWidth={0}
        >
          <Cell fill={color} />
          <Cell fill={trackColor} />
        </Pie>
      </PieChart>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          className={cn(
            "font-medium text-[clamp(16px,1.9vw,24px)] text-[#4E4E4E]",
            valueClass,
          )}
        >
          {Math.round(value)}%
        </p>

        {isText && <p>{text}</p>}
      </div>
    </div>
  );
};
