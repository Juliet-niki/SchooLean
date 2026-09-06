import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  Eye2Icon,
  Eye3Icon,
  EyeIcon,
  MoreIcon,
  ReactivateIcon,
  ShowEyeIcon,
  SignOutIcon,
  SuspendIcon,
} from "~/assets/Icons";
import { DrawerDialog } from "~/components/DrawerDialog";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  SCHOOLEAN_USER_DATA,
  type ISchooleanUser,
  type ISchoolSummary,
} from "~/data/schooleanUsersData";
import { cn } from "~/lib/utils";
import { formatDate, formatTime } from "~/utils/formatDate";
import SuspendAccountDialog from "./SuspendAccountModal";
import { useNavigate } from "react-router";

const STATUS_STYLES: Record<ISchoolSummary["status"], string> = {
  SUSPENDED: "#F54F52",
  INACTIVE: "#881CBE",
  PENDING_ACTIVATION: "#E59C15",
  ACTIVE: "#0EB26B",
  DEACTIVATED: "#4E4E4E",
};

const STATUS_LABELS: Record<ISchoolSummary["status"], string> = {
  SUSPENDED: "Suspended",
  INACTIVE: "Inactive",
  PENDING_ACTIVATION: "Pending",
  ACTIVE: "Active",
  DEACTIVATED: "Deactivated",
};

const UserRows = ({
  user,
  onViewUser,
  onSuspendAccount,
  onViewSchool,
  onSignOutAllSession,
  onViewSecurityActivity,
  onReactivateAccount,
  onViewAuditLog,
}: {
  user: ISchooleanUser;
  onViewUser: (id: string, schoolID: string) => void;
  onSuspendAccount: (id: string) => void;
  onViewSchool: (id: string) => void;
  onSignOutAllSession: (id: string) => void;
  onViewSecurityActivity: (id: string) => void;
  onReactivateAccount: (id: string) => void;
  onViewAuditLog: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<ISchoolSummary | null>(
    null,
  );
  const schoolRows = user.schoolSummary;
  const rowSpan = schoolRows.length;

  const handleSuspendAccount = async (reason: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Suspension reason:", reason);

    onSuspendAccount(user.userID);
    setIsOpen(false);
  };

  return (
    <>
      {schoolRows.map((school, index) => (
        <tr
          key={`${user.userID}-${school.schoolName}`}
          className="border-b border-[#BCBCBC] text-[clamp(12px,1.4vw,15px)] text-[#4E4E4E] font-medium"
        >
          {index === 0 && (
            <td
              rowSpan={rowSpan}
              className="py-3 pr-4 pl-6 border-r border-[#BCBCBC] align-top"
            >
              <div className="flex items-start gap-3 md:gap-5">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#D9D9D9] shrink-0" />
                )}
                <div className="flex flex-col gap-[2px] min-w-0 text-[#868686] font-semibold">
                  <p className="text-[#4E4E4E] text-[clamp(14px,1.5vw,17px)]">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate" title={user.email}>
                    {user.email}
                  </p>
                  <p>{user.phoneNumber}</p>
                  <p>User ID: {user.userID}</p>
                </div>
              </div>
            </td>
          )}
          <td className="py-3 px-4 border-r border-[#BCBCBC] text-[clamp(14px,1.5vw,17px)] font-semibold">
            {school.schoolName}
          </td>
          <td className="py-3 px-4 border-r border-[#BCBCBC]">
            <div className="flex items-center justify-center">
              <StatusView
                variant="soft"
                styleOption={true}
                status={
                  school.role === "TEACHER"
                    ? "Teacher"
                    : school.role === "SCHOOL_ADMIN"
                      ? "School Admin"
                      : school.role === "PARENT"
                        ? "Parent"
                        : school.role === "STUDENT"
                          ? "Student"
                          : "Non-Academic Staff"
                }
                green="Teacher"
                purple="Parent"
                blue="School Admin"
                yellow="Non-Academic Staff"
                pink="Student"
              />
            </div>
          </td>
          <td className="py-3 px-4 border-r border-[#BCBCBC]">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full bg-[${STATUS_STYLES[school.status]}]`}
              />
              <span className={`text-[${STATUS_STYLES[school.status]}]`}>
                {STATUS_LABELS[school.status]}
              </span>
            </div>
          </td>
          <td className="py-3 px-4 border-r border-[#BCBCBC] text-nowrap">
            {formatDate(school.dateJoined)}
          </td>
          <td className="py-3 px-4 border-r border-[#BCBCBC] text-nowrap">
            <div className="flex flex-col">
              <span>{formatDate(school.lastLoginDate)}</span>
              <span>{formatTime(school.lastLoginDate)}</span>
            </div>
          </td>

          <td className="py-3 pr-6 pl-4 border-l border-[#BCBCBC] text-center">
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="cursor-pointer">
                  <MoreIcon className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit py-1 px-2 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-16 text-[13px] font-medium"
                sideOffset={6}
              >
                <div className="flex flex-col mb-2">
                  {[
                    {
                      label: "View User",
                      onClick: () => {
                        onViewUser(user.userID, school.schoolID);
                      },
                      icon: (
                        <ShowEyeIcon className="w-4 h-4" stroke="#4E4E4E" />
                      ),
                    },
                    {
                      label: "View School",
                      onClick: () => {
                        onViewSchool(user.userID);
                      },
                      icon: <EyeIcon className="w-4 h-4" stroke="#4E4E4E" />,
                    },
                    {
                      label: "View Security Activity",
                      onClick: () => {
                        onViewSecurityActivity(user.userID);
                      },
                      icon: <Eye2Icon className="w-4 h-4" stroke="#4E4E4E" />,
                    },
                    {
                      label: "Sign out all Session",
                      onClick: () => {
                        onSignOutAllSession(user.userID);
                      },
                      icon: <SignOutIcon className="w-4 h-4" />,
                    },
                    {
                      label: "Suspend Account",
                      onClick: () => {
                        setSelectedSchool(school);
                        setIsOpen(true);
                      },
                      icon: <SuspendIcon className="w-4 h-4" />,
                    },
                    {
                      label: "Reactivate Account",
                      onClick: () => {
                        onReactivateAccount(user.userID);
                      },
                      icon: <ReactivateIcon className="w-4 h-4" />,
                    },
                    {
                      label: "View Audit Log",
                      onClick: () => {
                        onViewAuditLog(user.userID);
                      },
                      icon: <Eye3Icon className="w-4 h-4" />,
                    },
                  ].map((option) => (
                    <div
                      key={option.label}
                      className="cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg flex items-center gap-2 text-[#4E4E4E]"
                      onClick={option.onClick}
                    >
                      <span>{option.icon}</span>
                      <p> {option.label}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </td>
        </tr>
      ))}
      <DrawerDialog
        open={isOpen}
        close={() => {
          setIsOpen(false);
          setSelectedSchool(null);
        }}
        size="xl"
        title="Suspend Account"
        titleCSS="text-[clamp(16px,2vw,22px)] text-[#4E4E4E] font-semibold"
        subTitle="You are about to suspend this user’s account. this user will not be able to access
their account until the account is reactivated."
        descriptionCSS="text-[clamp(10px,1.4vw,16px)] text-[#868686] font-medium"
        contentCSS="h-fit py-8 px-10"
        headerClassName="border-none py-0"
        max_height
      >
        <>
          <hr />
          {selectedSchool && (
            <SuspendAccountDialog
              user={user}
              school={selectedSchool}
              onSuspend={handleSuspendAccount}
              onCancel={() => {
                setIsOpen(false);
                setSelectedSchool(null);
              }}
            />
          )}
        </>
      </DrawerDialog>
    </>
  );
};

type SchooleanUsersTableProps = {
  filters: Record<string, string[]>;
  searchText: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  dateRange?: DateRange;
};

const SchooleanUsersTable = ({
  filters,
  searchText,
  currentPage,
  onPageChange,
  dateRange,
}: SchooleanUsersTableProps) => {
  const navigate = useNavigate();
  const matchesFilter = (key: string, value: string) => {
    const selected = filters[key];
    if (!selected || selected.length === 0 || selected.includes("all")) {
      return true;
    }
    const slug = value.toLowerCase().replace(/[\s_]+/g, "-");
    return selected.includes(slug);
  };

  const matchesDateRange = (dateJoined: string) => {
    if (!dateRange?.from) return true; // no range picked yet — don't filter
    const joined = new Date(dateJoined);
    const from = dateRange.from;
    const to = dateRange.to ?? dateRange.from; // single day selected = filter that one day
    return joined >= from && joined <= to;
  };

  const filteredData = useMemo(() => {
    return SCHOOLEAN_USER_DATA.filter((user) => {
      const search = searchText.toLowerCase().trim();
      const matchesSearch =
        !search ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.userID.toLowerCase().includes(search);

      const matchesRole = user.schoolSummary.some((s) =>
        matchesFilter("role", s.role),
      );
      const matchesSchool = user.schoolSummary.some((s) =>
        matchesFilter("schools", s.schoolName),
      );
      const matchesStatus = user.schoolSummary.some((s) =>
        matchesFilter("status", s.status),
      );
      const matchesCountry = matchesFilter("country", user.country);
      const matchesState = matchesFilter("state", user.state);
      const matchesLga = matchesFilter("lga", user.lga);

      const matchesDate = user.schoolSummary.some((s) =>
        matchesDateRange(s.dateJoined),
      );

      return (
        matchesSearch &&
        matchesRole &&
        matchesSchool &&
        matchesStatus &&
        matchesCountry &&
        matchesState &&
        matchesLga &&
        matchesDate
      );
    });
  }, [filters, searchText, dateRange]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const startIndex =
    filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);

  const handleViewUser = (userID: string, schoolID: string) => {
    navigate(`/schoolean-users/${userID}/${schoolID}`);
  };

  const handleViewSchool = (userID: string) => {
    // Navigate to school details page
  };
  const handleViewSecurityActivity = (userID: string) => {
    // Navigate to security activity page
  };
  const handleSignOutAllSession = (userID: string) => {
    // Sign out all session
  };
  const handleViewAuditLog = (userID: string) => {
    // Navigate to audit log page
  };
  const handleReactivateAccount = (userID: string) => {
    // Reactivate account
  };

  const handleSuspendAccount = (userID: string) => {};

  return (
    <div className="flex flex-col ">
      <div className="border border-[#CACACA] rounded-[10px]">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full min-w-[1250px] border-collapse table-fixed">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "19%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "8%" }} />
            </colgroup>
            <thead className="border-b border-[#BCBCBC]">
              <tr>
                {[
                  "User",
                  "School",
                  "Role",
                  "Status",
                  "Date Joined",
                  "Last Login",
                  "Action",
                ].map((item, index, arr) => (
                  <th
                    key={index}
                    className={cn(
                      "py-4 px-4 font-semibold text-start sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-nowrap",
                      index === 0 && "pl-6",
                      index === 7 && "pr-6",
                    )}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((user) => (
                  <UserRows
                    key={user.userID}
                    user={user}
                    onReactivateAccount={handleReactivateAccount}
                    onViewAuditLog={handleViewAuditLog}
                    onSignOutAllSession={handleSignOutAllSession}
                    onSuspendAccount={handleSuspendAccount}
                    onViewSchool={handleViewSchool}
                    onViewSecurityActivity={handleViewSecurityActivity}
                    onViewUser={handleViewUser}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] border border
                  border-[#D5D5D5]"
                  >
                    No User Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 md:mt-6 lg:mt-8 flex items-center justify-between">
        <div className="flex items-center justify-between text-[#868686] text-[clamp(11px,1.2vw,13px)]">
          <span>
            Showing {startIndex} to {endIndex} of {filteredData.length}{" "}
            {filteredData.length === 1 ? "User" : "Users"}
          </span>
        </div>
        <div>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SchooleanUsersTable;
