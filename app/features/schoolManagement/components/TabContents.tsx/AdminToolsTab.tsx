import { useState } from "react";
import {
  BroomIcon,
  CalculatorIcon,
  Calendar3Icon,
  LogoutIcon,
  PadlockIcon,
  PersonsIcon,
  RestoreIcon,
  TabListIcon,
} from "~/assets/icons";
import TablePagination from "~/components/TablePagination";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ADMIN_ACTIVITY_LOGS, ADMIN_DATA } from "~/data/adminData";
import type { IAdminActivityLog } from "~/types";
import { formatDate } from "~/utils/formatDate";

interface Tool {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}

const TOOLS: Tool[] = [
  {
    icon: PersonsIcon,
    title: "Merge duplicate users",
    description: "Find and combine duplicate students or parents account",
    onClick: () => {},
  },
  {
    icon: TabListIcon,
    title: "Fix class assignments",
    description: "Correct errors in class rosters and assignments",
    onClick: () => {},
  },
  {
    icon: Calendar3Icon,
    title: "Reset academic calendar",
    description: "Restore the calendar to default academic date",
    onClick: () => {},
  },
  {
    icon: PadlockIcon,
    title: "Unlock accounts",
    description: "Restore access for users locked out of their account",
    onClick: () => {},
  },
  {
    icon: LogoutIcon,
    title: "Force logout users",
    description: "Immediately sign out all users from the system",
    onClick: () => {},
  },
  {
    icon: BroomIcon,
    title: "Clear school cache",
    description: "Clear temporary data to improve system performance",
    onClick: () => {},
  },
  {
    icon: CalculatorIcon,
    title: "Recalculate results",
    description: "Recalculate student results",
    onClick: () => {},
  },
  {
    icon: RestoreIcon,
    title: "Restore archive data",
    description: "Recover and import data from previous school terms",
    onClick: () => {},
  },
];

// ---- ICON MAP ----
const ICON_MAP: Record<string, React.ElementType> = {
  BroomIcon,
  CalculatorIcon,
  Calendar3Icon,
  LogoutIcon,
  PadlockIcon,
  PersonsIcon,
  RestoreIcon,
  TabListIcon,
};

// ---- TABLE ROW ----
const TableRow = ({ log }: { log: IAdminActivityLog }) => {
  const ActionIcon = log.actionIcon ? ICON_MAP[log.actionIcon] : null;

  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#373737] font-medium first:border-t border-b border-[#EBEBEB]">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {ActionIcon && (
            <ActionIcon className="w-4 h-4 lg:w-6 lg:h-6 shrink-0" />
          )}
          <p className="text-[clamp(14px,1.6vw,18px)] font-semibold">
            {log.action}
          </p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {log.adminProfilePic ? (
            <img
              src={log.adminProfilePic}
              alt={log.adminName}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#D9D9D9] shrink-0" />
          )}
          <p>{log.adminName}</p>
        </div>
      </td>
      <td className="py-3 px-4 whitespace-nowrap">{log.timestamp}</td>
      <td className="py-3 px-4 text-left wrap-break-word">{log.reason}</td>
      <td className="py-3 px-4 whitespace-nowrap">{log.ipAddress}</td>
    </tr>
  );
};

// ---- ACTIVITY LOG TABLE ----
const AdminActivityLog = ({ activity }: { activity: IAdminActivityLog[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(activity.length / itemsPerPage);
  const paginatedData = activity.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-white rounded-t-[13px] py-5">
      <h2 className="text-[#4E4E4E] text-[clamp(15px,1.8vw,20px)] font-bold leading-tight px-4 ml:px-6 pb-2 ml:pb-4">
        Activity Log
      </h2>
      <div className="mx-4 ml:mx-6 pb-5 space-y-5">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full min-w-[900px] border-collapse table-fixed">
            <colgroup>
              <col style={{ width: "23%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "21%" }} />
              <col style={{ width: "24%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>
            <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] text-nowrap ">
              <tr>
                {[
                  "Action performed",
                  "Admin Name",
                  "Time Stamp",
                  "Reason",
                  "IP address",
                ].map((col) => (
                  <th key={col} className="">
                    <div className="inline-flex items-center">
                      <div className="bg-[#E6F7F0] border border-[#CCCCCC] rounded-[7px] py-2 px-4 text-center font-semibold w-fit mb-2">
                        {col}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((log) => (
                  <TableRow key={log.logId} log={log} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                  >
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// ---- MAIN COMPONENT ----
const AdminToolsTab = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [reason, setReason] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const currentAdmin = ADMIN_DATA;
  const adminName = `${currentAdmin.adminFirstName} ${currentAdmin.adminMiddleName} ${currentAdmin.adminLastName}`;

  const handleRunTool = (tool: Tool) => {
    const now = new Date();
    setTimestamp(
      `${formatDate(now)}. ${now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
    );
    setReason("");
    setSelectedTool(tool);
  };

  const handleProceedToConfirm = () => {
    if (!reason.trim()) return;
    setIsShowConfirm(true);
  };

  const handleConfirm = () => {
    selectedTool?.onClick();
    setIsShowConfirm(false);
    setSelectedTool(null);
    setReason("");
  };

  const handleCancelReason = () => {
    setSelectedTool(null);
    setReason("");
  };

  const handleCancelConfirm = () => {
    setIsShowConfirm(false);
  };

  return (
    <div className="flex flex-col gap-8 bg-[#EDEDED]">
      <div className="bg-white flex flex-col gap-2 ml:gap-4 text-[#4E4E4E] px-5 ml:px-8 pb-5 ml:pb-8 rounded-b-[13px] font-medium">
        <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight">
          Admin Tools
        </h2>
        <p className="text-[clamp(12px,1.4vw,16px)]">
          Operation tools for managing and troubleshooting the school system
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <div
              key={tool.title}
              className="flex items-start gap-3 p-4 border-[1.5px] border-[#CFCFCF] rounded-[13px] hover:border-[#0EB26B] transition-colors"
            >
              <tool.icon className="w-7 h-7 shrink-0" />
              <div className="flex flex-col gap-2 h-full">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[clamp(14px,1.6vw,18px)] font-semibold">
                    {tool.title}
                  </h3>
                  <p className="text-[clamp(12px,1.4vw,15px)]">
                    {tool.description}
                  </p>
                </div>
                <div className="ml-auto mt-auto">
                  <Button
                    size="sm"
                    className="w-fit h-fit px-3 py-1"
                    onClick={() => handleRunTool(tool)}
                  >
                    Run
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminActivityLog activity={ADMIN_ACTIVITY_LOGS} />

      {/* STEP 1 — Reason Dialog */}
      <Dialog
        open={selectedTool !== null && !isShowConfirm}
        onOpenChange={(open) => !open && handleCancelReason()}
      >
        <DialogContent className="p-12">
          <div className="flex flex-col gap-12 md:gap-20 text-[clamp(14px,1.6vw,18px)]">
            <div className="space-y-2">
              <p className="font-semibold">{selectedTool?.title}</p>
              <p className="text-[clamp(12px,1.2vw,14px)] text-[#4E4E4E]">
                Please provide a reason for this action
              </p>
              <Input
                placeholder="Maximum of 100 characters"
                className="w-full mt-2"
                maxLength={100}
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="flex items-center mx-auto gap-6">
              <Button
                variant="outline"
                size="sm"
                className="border-[#000000] border text-[#4E4E4E] h-10"
                onClick={handleCancelReason}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-10"
                disabled={!reason.trim()}
                onClick={handleProceedToConfirm}
              >
                Confirm & Proceed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* STEP 2 — Confirm Dialog */}
      <Dialog
        open={isShowConfirm}
        onOpenChange={(open) => !open && handleCancelConfirm()}
      >
        <DialogContent className="p-10">
          <div className="flex flex-col gap-10 text-[clamp(14px,1.6vw,18px)]">
            <div className="grid grid-cols-[1fr_2fr] items-center gap-y-6">
              <p>Admin :</p>
              <div className="flex items-center gap-3">
                {currentAdmin.profilePicture ? (
                  <img
                    src={currentAdmin.profilePicture}
                    alt={adminName}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#D9D9D9]" />
                )}
                <p className="font-bold text-[clamp(14px,1.4vw,16px)]">
                  {adminName}
                </p>
              </div>
              <p>Timestamp :</p>
              <p className="text-[clamp(13px,1.3vw,15px)]">{timestamp}</p>
              <p>Reason :</p>
              <p className="text-[clamp(13px,1.3vw,15px)]">{reason}</p>
              <p>Action :</p>
              <p className="font-semibold text-[clamp(13px,1.3vw,15px)]">
                {selectedTool?.title}
              </p>
            </div>
            <p className="text-[clamp(13px,1.3vw,15px)] text-[#0EB26B] font-medium">
              Are you sure you want to proceed with this action?
            </p>
            <div className="flex items-center mx-auto gap-6">
              <Button
                variant="outline"
                size="sm"
                className="border-[#000000] border text-[#4E4E4E] h-10"
                onClick={handleCancelConfirm}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirm} className="h-10 px-6">
                Ok, Proceed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminToolsTab;

// Commit message
//  feat: build admin tools tab page #1
