"use client";
import { type DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
import { Card, CardContent } from "./card";

interface CalendarRangeProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export function CalendarRange({ value, onChange }: CalendarRangeProps) {
  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="range"
          //   defaultMonth={dateRange?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          disabled={(date) => date < new Date("1900-01-01")}
        />
      </CardContent>
    </Card>
  );
}
