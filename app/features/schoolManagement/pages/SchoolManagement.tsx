import { MegaPhone2Icon, PersonIcon } from "~/assets/Icons";
import FilterBar from "../components/FilterBar";
import SearchInput from "~/components/SearchInput";
import SchoolTable from "../components/SchoolTable";
import { useState } from "react";

const SchoolManagement = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [joinedDate, setJoinedDate] = useState<Date | undefined>();

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  return (
    <div className="px-4 ml:px-6 py-4 ml:py-8 bg-white flex flex-col">
      <div className="flex items-center gap-2 cursor-pointer  bg-[#0A9157] rounded-[10px] px-3 py-2 ml-auto">
        <MegaPhone2Icon className="w-4 h-4 lg:w-5 lg:h-5" />
        <p className="text-white font-semibold text-[clamp(12px,1.2vw,14px)]">
          Send Announcement
        </p>
      </div>
      <div className="w-full overflow-x-auto hide-scrollbar pb-2 px-1">
        <div className="border border-[#D5D5D5] shadow-md shadow-[#00000040] rounded-[15px] px-2.5 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 mt-8 w-fit ml-auto">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            joinedDate={joinedDate}
            onJoinedDateChange={(date) => {
              setJoinedDate(date);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="ml-auto mt-16">
        <SearchInput
          setSearchText={(text) => {
            setSearchText(text);
            setCurrentPage(1);
          }}
          className="border-[#D5D5D5] shadow-sm shadow-[#00000040] h-10 w-60 md:w-80 lg:w-110"
          placeholder="Search school name, code, admin email, phone no"
        />
      </div>
      <div className="pb-2 border border-[#D5D5D5] shadow-md shadow-[#0000001A] rounded-4xl px-5 py-2 mt-5">
        <SchoolTable
          filters={filters}
          searchText={searchText}
          joinedDate={joinedDate}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SchoolManagement;
