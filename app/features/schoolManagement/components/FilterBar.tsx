import React from "react";
import { DateCalenderIcon } from "~/assets/icons";
import PopoverDropdown from "~/components/PopoverDropdown";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { SCHOOL_MANAGEMENT_FILTERS } from "~/data";

type FilterBarProps = {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  joinedDate: Date | undefined;
  onJoinedDateChange: (date: Date | undefined) => void;
};

const FilterBar = ({
  filters,
  onFilterChange,
  joinedDate,
  onJoinedDateChange,
}: FilterBarProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex items-center gap-3">
      {SCHOOL_MANAGEMENT_FILTERS.slice(0, 5).map((filter) => (
        <PopoverDropdown
          key={filter.key}
          options={filter.options}
          defaultSelected={filter.options[0].value}
          BtnClassName="border border-[#D5D5D5] rounded-[5px] px-2.5 py-1.5 text-[#4E4E4E] font-semibold"
          onChange={(value) => handleFilterChange(filter.key, value)}
          Iconfill="#000"
          searchInput={
            filter.key === "country" ||
            filter.key === "state" ||
            filter.key === "lga"
              ? true
              : false
          }
        />
      ))}

      {/* Joined Date Calendar */}
      <div className="flex items-center gap-2 border border-[#D5D5D5] rounded-[5px] text-[#4E4E4E] font-semibold">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full px-2.5 py-1.5 text-left text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] font-semibold flex items-center gap-2 hover:bg-transparent"
            >
              {joinedDate ? joinedDate.toLocaleDateString() : "Joined Date"}
              <DateCalenderIcon className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto mr-8 p-0 text-[#666666]">
            <Calendar
              mode="single"
              selected={joinedDate}
              onSelect={onJoinedDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilterBar;
