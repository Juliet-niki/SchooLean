import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MoreIcon, RightIcon } from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { SCHOOL_MANAGEMENT_DATA } from "~/data/schoolData";
import type { ISchool } from "~/types";

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const TableRow = ({ item }: { item: ISchool }) => {
  // const [isEnabled, setIsEnabled] = useState<"enable" | "disable" | null>(null);
  // const navigate = useNavigate();

  return (
    <tr className="text-[clamp(11px,1.2vw,14px)] text-[#373737] font-medium">
      <td className="py-3 px-4 w-44 md:w-52 border-y border-l border-[#D5D5D5] rounded-l-[15px] text-[#067890] text-[clamp(13px,1.4vw,16px)]">
        {item.name}
      </td>
      <td className="py-3 px-4 border-y border-[#D5D5D5]">{item.schoolId}</td>
      <td className="py-3 px-4 w-36 md:w-44 border-y border-[#D5D5D5] text-wrap">
        {item.location.city}, {item.location.state} state,{" "}
        {item.location.country}
      </td>
      <td className="py-2 px-3 border-y border-[#D5D5D5]">
        <div className="w-24">
          <StatusView
            styleOption={true}
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 rounded-[7px] w-full text-center"
            status={
              item.plan === "PREMIUM"
                ? "Premium"
                : item.plan === "FREE_TRIAL"
                  ? "Free Trial"
                  : "Standard"
            }
            green="Premium"
            grey="Free Trial"
            blue="Standard"
          />
        </div>
      </td>
      <td className="py-2 px-3 border-y border-[#D5D5D5]">
        <div className="w-24">
          <StatusView
            styleOption={true}
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 rounded-[7px] w-full text-center"
            status={
              item.status === "ACTIVE"
                ? "Active"
                : item.status === "INACTIVE"
                  ? "Inactive"
                  : "At-Risk"
            }
            green="Active"
            red="Inactive"
            yellow="At-Risk"
          />
        </div>
      </td>
      <td className="py-3 px-4 border-y border-[#D5D5D5] text-center">
        {item.totalStudents}
      </td>
      <td className="py-3 px-4 border-y border-[#D5D5D5] text-center">
        {item.totalStaff}
      </td>
      <td className="py-3 px-4 border-y border-[#D5D5D5] text-center">
        {item.totalParents}
      </td>
      <td className="py-3 px-4 border-y border-[#D5D5D5]">{item.dateJoined}</td>
      <td className="py-3 px-4 border-y border-[#D5D5D5]">
        {item.lastActivity}
      </td>

      <td className="py-3 px-4 border-y border-r border-[#D5D5D5] rounded-r-[15px] text-end">
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="cursor-pointer">
              <MoreIcon className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit py-1 px-2 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026]  rounded-[5px] mr-20  text-[13px] font-medium"
            sideOffset={6}
          >
            <Link
              to={`/school-management/${item.schoolId}`}
              className="text-[#373737] cursor-pointer"
            >
              View School
            </Link>
            {/* <div className="flex items-center gap-1 mb-2">
              <RightIcon className="h-3.5 w-3.5 " />
              <p className="text-[clamp(11px,1.2vw,14px)] font-medium text-[#373737]">
                Custom website
              </p>
            </div>
            <div className="flex flex-col gap-2 mb-2">
              {[
                {
                  key: "enable" as const,
                  label: "Enable",
                  color: "text-[#0EB26B]",
                },
                {
                  key: "disable" as const,
                  label: "Disable",
                  color: "text-[#E81E1E]",
                },
              ].map((option) => (
                <p
                  key={option.key}
                  className={`cursor-pointer hover:bg-[#F7F7F7] py-1 px-4 rounded-lg ${option.color} ${isEnabled === option.key ? "bg-[#e6e3e3]" : ""}`}
                  onClick={() => {
                    setIsEnabled(option.key);
                  }}
                >
                  {option.label}
                </p>
              ))}
            </div> */}
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
};

type SchoolTableProps = {
  filters: Record<string, string>;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchText: string;
  joinedDate: Date | undefined;
};

const SchoolTable = ({
  filters,
  currentPage,
  onPageChange,
  searchText,
  joinedDate,
}: SchoolTableProps) => {
  const itemsPerPage = 11;

  const filteredData = useMemo(() => {
    return SCHOOL_MANAGEMENT_DATA.filter((school) => {
      const search = searchText.toLowerCase().trim();
      const matchSearch =
        !search ||
        school.name.toLowerCase().includes(search) ||
        school.schoolId.toLowerCase().includes(search);

      const matchCountry =
        !filters.country ||
        filters.country === "all" ||
        school.location.country.toLowerCase() === filters.country;

      const matchState =
        !filters.state ||
        filters.state === "all" ||
        school.location.state.toLowerCase() === filters.state;

      const matchLga =
        !filters.lga ||
        filters.lga === "all" ||
        school.location.city.toLowerCase().replace(/\s+/g, "-") === filters.lga;

      const matchPlanType =
        !filters.planType ||
        filters.planType === "all" ||
        school.plan.toLowerCase().replace(/\s+/g, "-") === filters.planType;

      const matchRegistrationDateRange = (() => {
        if (
          !filters.registrationdateRange ||
          filters.registrationdateRange === "all"
        )
          return true;

        const joined = parseDate(school.dateJoined);
        const now = new Date();
        const diffDays = Math.floor(
          (now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24),
        );

        switch (filters.registrationdateRange) {
          case "24hours":
            return diffDays <= 1;
          case "30days":
            return diffDays <= 30;
          case "60days":
            return diffDays <= 60;
          case "90days":
            return diffDays <= 90;
          case "120days":
            return diffDays <= 120;
          default:
            return true;
        }
      })();

      const matchJoinedDate = (() => {
        if (!joinedDate) return true;
        const joined = parseDate(school.dateJoined);
        return (
          joined.getFullYear() === joinedDate.getFullYear() &&
          joined.getMonth() === joinedDate.getMonth() &&
          joined.getDate() === joinedDate.getDate()
        );
      })();

      return (
        matchSearch &&
        matchCountry &&
        matchState &&
        matchLga &&
        matchPlanType &&
        matchRegistrationDateRange &&
        matchJoinedDate
      );
    });
  }, [filters, searchText, joinedDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="overflow-x-auto hide-scrollbar">
      <div className="w-max">
        <table className="w-full border-separate border-spacing-y-3">
          <thead className="sticky top-0 z-10 rounded-[15px] bg-[#0B653E] border border-[#D5D5D5] text-[clamp(12px,1.2vw,14px)] text-white text-nowrap">
            <tr>
              {[
                "School Name",
                "School ID",
                "Location",
                "Plan",
                "Status",
                "Total Stu.",
                "Total Stf.",
                "Total Parents",
                "Date Joined",
                "Last Activity",
                "Action",
              ].map((item, index, arr) => (
                <th
                  key={index}
                  className={`py-3 px-4 font-normal text-start bg-[#0B653E]
            ${index === 0 ? "rounded-l-[15px]" : ""}
            ${index === arr.length - 1 ? "rounded-r-[15px]" : ""}
          `}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.id} item={item} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                >
                  No schools match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default SchoolTable;
