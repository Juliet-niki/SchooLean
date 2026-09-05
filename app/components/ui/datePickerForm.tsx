import { format } from "date-fns";
import { FormLabel } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Calendar2Icon } from "~/assets/Icons";
import { cn } from "~/lib/utils";

interface FormDatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  hasError?: boolean;
  subtext?: React.ReactNode;
  labelClassName?: string;
  bgclassName?: string;
}

export function DatePickerForm({
  label,
  value,
  onChange,
  hasError,
  subtext,
  labelClassName,
  bgclassName,
}: FormDatePickerProps) {
  return (
    <div className="w-full">
      {label && (
        <FormLabel
          className={cn(
            "text-[#525252] text-[clamp(13px,1.2vw,14px)] mb-2 block",
            labelClassName,
          )}
        >
          {label}
        </FormLabel>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "px-3 h-10 text-left rounded-[7px] flex items-center gap-3 justify-between bg-transparent hover:bg-transparent hover:text-none font-poppins text-[#4E4E4E] text-[clamp(13px,1.4vw,15px)] font-medium border",
              !value && "text-muted-foreground",
              hasError ? "border-red-500" : "border-[#D9D9D9]",
              bgclassName,
            )}
          >
            {value ? format(value, "PPP") : "dd/mm/yy"}
            <Calendar2Icon className="size-5" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            mode="single"
            required={true}
            selected={value}
            onSelect={(date) => date && onChange?.(date)}
            disabled={(date) => date < new Date("1900-01-01")}
            startMonth={new Date("1900-01-01")}
            endMonth={new Date("2100-12-31")}
            captionLayout="dropdown"
            className="border rounded-md"
            classNames={{
              button: "p-2 rounded-md text-sm text-left",
            }}
          />
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
