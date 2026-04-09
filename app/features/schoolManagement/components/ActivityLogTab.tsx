import { useMemo, useState } from "react";
import {
  GearIcon,
  MoreIcon,
  SafetyIcon,
  TriangleAlert2Icon,
} from "~/assets/icons";
import PopoverDropdown from "~/components/PopoverDropdown";
import SearchInput from "~/components/SearchInput";
import TablePagination from "~/components/TablePagination";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ACTIVITY_LOG_TAB_FILTERS } from "~/data";
import type { IActivityLogItem, ISchool } from "~/types";
import { formatDate } from "~/utils/formatDate";

const ITEMS_PER_PAGE = 7;

const ROLE_GROUPS: Record<string, string[]> = {
  admin: ["admin", "staff"],
  student: ["student"],
  parent: ["parent"],
};

const getDiffDays = (dateStr: string): number => {
  const now = new Date();
  const logDate = new Date(dateStr);
  if (isNaN(logDate.getTime())) return 0;
  return Math.floor(
    (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
  );
};

const matchesDateFilter = (dateStr: string, filterValue: string): boolean => {
  if (!filterValue || filterValue === "all") return true;
  const diffDays = getDiffDays(dateStr);
  switch (filterValue) {
    case "30days":
      return diffDays <= 30;
    case "60days":
      return diffDays <= 60;
    case "90days":
      return diffDays <= 90;
    case "180days":
      return diffDays <= 180;
    default:
      return true;
  }
};

const getActivityColor = (activityType: string) => {
  switch (activityType) {
    case "LOGIN":
      return "bg-[#0EB26B] text-white";
    case "LOGOUT":
      return "bg-[#F7B801] text-white";
    default:
      return "bg-[#E2E2E2] text-[#4E4E4E] border border-[#B8B4B4]";
  }
};

interface IResolvedLog extends IActivityLogItem {
  resolvedName: string;
  resolvedProfilePic: string | null;
}

const fallBack = {
  name: "Unknown",
  profilePic: null,
};

const resolveUser = (
  log: IActivityLogItem,
  school: ISchool,
): { name: string; profilePic: string | null } => {
  switch (log.user.type) {
    case "ADMIN":
      return school.admins.find((a) => a.adminId === log.user.id) ?? fallBack;
    case "TEACHER":
      return (
        school.teachers.find((t) => t.teacherId === log.user.id) ?? fallBack
      );
    case "STUDENT":
      return (
        school.students.find((s) => s.studentId === log.user.id) ?? fallBack
      );
    case "PARENT":
      return school.parents.find((p) => p.parentId === log.user.id) ?? fallBack;
    default:
      return fallBack;
  }
};

// ---- Table Header ----
const TableHead = ({ columns }: { columns: string[] }) => (
  <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-nowrap">
    <tr>
      {columns.map((col, index, arr) => (
        <th
          key={col}
          className={`py-3 px-4 text-center font-bold bg-[#E6F7F0]
            ${index === 0 ? "rounded-tl-[15px]" : ""}
            ${index > 0 && index < arr.length - 1 ? "border-x border-[#E4E4E4]" : ""}
            ${index === arr.length - 1 ? "rounded-tr-[15px]" : ""}
          `}
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

// ---- Table Row ----
const TableRow = ({ log }: { log: IResolvedLog }) => (
  <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-semibold border-b border-[#EBEBEB]">
    <td className="py-3 px-4">
      <div className="flex items-center gap-3 min-w-56">
        {log.resolvedProfilePic ? (
          <img
            src={log.resolvedProfilePic}
            alt={log.resolvedName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D9D9D9]" />
        )}
        <p className="font-bold">{log.resolvedName}</p>
      </div>
    </td>
    <td className="py-3 px-4 text-center border-l border-[#E4E4E4]">
      {log.role}
    </td>
    <td className="py-3 px-4 text-center border-x border-[#E4E4E4]">
      <div className="flex items-center justify-center">
        <p
          className={`px-3 py-1 rounded-[7px] font-medium w-fit ${getActivityColor(log.activityType)}`}
        >
          {log.activity}
        </p>
      </div>
    </td>
    <td className="py-3 px-4 text-center border-x border-[#E4E4E4]">
      {log.ipAddress}
    </td>
    <td className="py-3 px-4 text-center border-r border-[#E4E4E4]">
      {formatDate(log.date)}
    </td>
    <td className="py-3 px-4 text-center">
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="cursor-pointer">
            <MoreIcon className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit py-1 px-1 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-24 text-[13px] font-medium"
          sideOffset={6}
        >
          <div className="flex flex-col gap-1">
            {[
              { label: "View detailed log", onClick: () => {} },
              { label: "Export log", onClick: () => {} },
              { label: "Escalate issue", onClick: () => {} },
            ].map((option) => (
              <p
                key={option.label}
                onClick={option.onClick}
                className={`cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg ${
                  option.label === "Escalate issue"
                    ? "text-[#E81E1E]"
                    : "text-[#404040]"
                }`}
              >
                {option.label}
              </p>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </td>
  </tr>
);

// ---- Main Component ----
const ActivityLogTab = ({ school }: { school: ISchool }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const resolvedLogs = useMemo<IResolvedLog[]>(() => {
    return school.activityLog.logs.map((log) => {
      const { name, profilePic } = resolveUser(log, school);
      return { ...log, resolvedName: name, resolvedProfilePic: profilePic };
    });
  }, [school]);

  const filteredLogs = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return resolvedLogs.filter((log) => {
      const matchesSearch =
        !search || log.resolvedName.toLowerCase().includes(search);

      const matchesRole =
        !filters.role ||
        filters.role === "all" ||
        ROLE_GROUPS[filters.role]?.includes(log.role.toLowerCase());

      const matchesActivity =
        !filters.activity ||
        filters.activity === "all" ||
        log.activityType === filters.activity;

      const matchesDate = matchesDateFilter(log.date, filters.date);

      return matchesSearch && matchesRole && matchesActivity && matchesDate;
    });
  }, [resolvedLogs, filters, searchText]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

  const paginatedData = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 ml:gap-10 text-[#4E4E4E] px-6 ml:px-12">
      {/* Summary */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight">
          Usage & Activity Logs
        </h2>
        <div className="border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-[13px] flex justify-center gap-2 md:gap-4 lg:gap-8 py-4 px-4 flex-wrap">
          {[
            {
              icon: <SafetyIcon className="w-5 h-5 md:w-7 md:h-7" />,
              label: "Login Activities",
              value: school.activityLog.summary.totalLogins,
              sub: "Logins",
            },
            {
              icon: (
                <GearIcon className="w-5 h-5 md:w-7 md:h-7" fill="#0EB26B" />
              ),
              label: "Feature Usage",
              value: school.activityLog.summary.totalActions,
              sub: "Actions",
            },
            {
              icon: <TriangleAlert2Icon className="w-5 h-5 md:w-7 md:h-7" />,
              label: "Error Logs",
              value: school.activityLog.summary.totalErrors,
              sub: "Errors",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-[#CFCFCF] rounded-[7px] w-44 md:w-56 ml:w-65 lg:w-72 px-2.5 ml:px-5 py-3.5 flex items-start gap-3 md:gap-6 font-semibold"
            >
              {item.icon}
              <div>
                <p className="text-[clamp(12px,1.6vw,18px)]">{item.label}</p>
                <p className="text-[clamp(14px,1.8vw,20px)] text-nowrap">
                  {item.value}{" "}
                  <span className="text-[clamp(12px,1.6vw,18px)]">
                    {item.sub}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + Table */}
      <div className="flex flex-col gap-4">
        <div className="grid ml:grid-cols-[1.5fr_2fr] gap-4">
          <div className="flex items-center">
            <SearchInput
              setSearchText={(text) => {
                setSearchText(text);
                setCurrentPage(1);
              }}
              className="border-[#D5D5D5] h-10 w-60 md:w-80"
              placeholder="Search"
            />
            <div className="block sm:hidden ml-auto">
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#0EB26B] border border-[#B8B4B4] text-white"
              >
                Export Logs
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-end gap-10">
            <div className="flex items-center gap-4">
              {ACTIVITY_LOG_TAB_FILTERS.map((filter) => (
                <PopoverDropdown
                  key={filter.key}
                  options={filter.options}
                  defaultSelected={filter.options[0].value}
                  BtnClassName="border border-[#D5D5D5] rounded-[5px] px-2.5 py-1.5 text-[#4E4E4E] font-semibold"
                  onChange={(value) => handleFilterChange(filter.key, value)}
                  Iconfill="#000"
                />
              ))}
            </div>
            <div className="hidden sm:block">
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#0EB26B] border border-[#B8B4B4] text-white"
              >
                Export Logs
              </Button>
            </div>
          </div>
        </div>

        <div className="shadow-md shadow-[#0000001A] rounded-[15px] overflow-x-auto hide-scrollbar">
          <table className="w-full border-collapse">
            <TableHead
              columns={[
                "User",
                "Role",
                "Activity",
                "IP Address",
                "Time",
                "Action",
              ]}
            />
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((log) => (
                  <TableRow key={log.logId} log={log} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                  >
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="py-5">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogTab;
