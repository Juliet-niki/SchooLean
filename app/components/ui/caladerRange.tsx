"use client";

import * as React from "react";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
import { Card, CardContent } from "./card";

interface CalendarRangeProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export function CalendarRange({ value, onChange }: CalendarRangeProps) {
  //   const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
  //     from: new Date(new Date().getFullYear(), 0, 12),
  //     to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  //   });

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
