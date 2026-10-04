import { Link } from "react-router";
import { MoreIcon } from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ISchool } from "~/types";

const TableRow = ({ item }: { item: ISchool }) => {
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
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 rounded-[7px] w-full text-center text-white"
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
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 rounded-[7px] w-full text-center text-white"
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
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
};

type SchoolTableProps = {
  schools: ISchool[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

const SchoolTable = ({
  schools,
  totalPages,
  currentPage,
  onPageChange,
  isLoading,
}: SchoolTableProps) => {
  return (
    <>
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan={11}
                    className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                  >
                    Loading schools...
                  </td>
                </tr>
              ) : schools.length > 0 ? (
                schools.map((item) => <TableRow key={item.id} item={item} />)
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
      </div>
      <div className="my-5">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default SchoolTable;
