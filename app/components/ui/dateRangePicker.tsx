import { format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "~/assets/Icons";
import { CalendarRange } from "./calendarRange";
import { cn } from "~/lib/utils";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  hasError?: boolean;
  subtext?: React.ReactNode;
}

export function DateRangePicker({
  value,
  onChange,
  hasError,
  subtext,
}: DateRangePickerProps) {
  const formatRangeDisplay = (range?: DateRange) => {
    if (!range?.from) return "Select date range";
    if (!range.to) return format(range.from, "MMM d, yyyy");
    return `${format(range.from, "MMM d")} - ${format(range.to, "MMM d, yyyy")}`;
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "w-full px-3 text-left font-normal rounded-[10px] flex items-center justify-between bg-[#FBFAFC] dark:bg-[#242325] border-[#E6E4EA] dark:border-[#59575C]",
              !value?.from && "text-black dark:text-white",
              hasError ? "border-red-500" : "border-[#0000001A]",
            )}
          >
            <span className="text-foreground">{formatRangeDisplay(value)}</span>

            <CalendarIcon className="size-4 text-black dark:text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarRange value={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
      {(hasError || subtext) && (
        <small
          className={
            hasError ? "text-xs text-red-500" : "text-sm text-[#626C7A]"
          }
        >
          {subtext ?? (hasError ? "An error occurred" : "")}
        </small>
      )}
    </div>
  );
}
