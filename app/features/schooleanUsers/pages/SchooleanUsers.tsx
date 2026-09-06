import { useState } from "react";
import { Calendar2Icon } from "~/assets/Icons";
import SearchInput from "~/components/SearchInput";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { SCHOOLEAN_USER_DATA } from "~/data/schooleanUsersData";
import FilterList from "../components/FilterList";
import SchooleanUsersTable from "../components/SchooleanUsersTable";
import type { DateRange } from "react-day-picker";

const SchooleanUsers = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleFilterChange = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const dateRangeLabel =
    dateRange?.from && dateRange?.to
      ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
      : "Select date range";

  return (
    <div className="min-h-screen w-full px-4 ml:px-6 py-4 ml:py-8 text-[#4E4E4E] bg-[#EDEDED] flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-10 md:mb-14">
        <h2 className="text-[clamp(16px,1.8vw,24px)] font-semibold leading-tight">
          Schoolean Users
        </h2>
        <p className="text-[#868686] text-[clamp(12px,1.4vw,15px)] font-medium">
          View and manage users registered across the Schoolean platform.
        </p>
      </div>

      {/* Search + date range */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <SearchInput
            setSearchText={(text) => {
              setSearchText(text);
              setCurrentPage(1);
            }}
            className="border-[#CACACA] h-[45px] w-60 md:w-[350px] lg:w-[400px] rounded-[5px]"
            placeholder="Search by name, email, or user ID"
          />
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-[45px] px-4 flex items-center gap-2 border border-[#CACACA] text-[#4E4E4E]"
              >
                <Calendar2Icon className="w-4 h-4" />
                {dateRangeLabel}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                // onSelect={setDateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  setCurrentPage(1);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Filters */}
      <div className="overflow-x-auto px-1 mt-7 md:mt-9 mb-5 md:mb-8">
        {/* <div className="w-fit"> */}
        <FilterList filters={filters} onFilterChange={handleFilterChange} />
        {/* </div> */}
      </div>

      <p className="text-[#4E4E4E] font-medium text-[clamp(14px,1.5vw,16px)] mb-3">
        {SCHOOLEAN_USER_DATA.length.toLocaleString()} Users
      </p>

      {/* Table */}
      <div>
        <SchooleanUsersTable
          filters={filters}
          searchText={searchText}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          dateRange={dateRange}
        />
      </div>
    </div>
  );
};

export default SchooleanUsers;
