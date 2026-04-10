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
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { ADMIN_DATA } from "~/data/adminData";
import { formatDate } from "~/utils/formatDate";

interface Tool {
  icon: React.ElementType;
  title: string;
  description: string;
  reason: string;
  onClick: () => void;
}

const TOOLS: Tool[] = [
  {
    icon: PersonsIcon,
    title: "Merge duplicate users",
    description: "Find and combine duplicate students or parents account",
    reason: "Detected multiple duplicate parent account",
    onClick: () => {},
  },
  {
    icon: TabListIcon,
    title: "Fix class assignments",
    description: "Correct errors in class rosters and assignments",
    reason: "Class roster inconsistencies detected",
    onClick: () => {},
  },
  {
    icon: Calendar3Icon,
    title: "Reset academic calendar",
    description: "Restore the calendar to default academic date",
    reason: "Academic calendar reset requested",
    onClick: () => {},
  },
  {
    icon: PadlockIcon,
    title: "Unlock accounts",
    description: "Restore access for users locked out of their account",
    reason: "Multiple locked accounts detected",
    onClick: () => {},
  },
  {
    icon: LogoutIcon,
    title: "Force logout users",
    description: "Immediately sign out all users from the system",
    reason: "Security breach suspected",
    onClick: () => {},
  },
  {
    icon: BroomIcon,
    title: "Clear school cache",
    description: "Clear temporary data to improve system performance",
    reason: "Performance degradation detected",
    onClick: () => {},
  },
  {
    icon: CalculatorIcon,
    title: "Recalculate results",
    description: "Recalculate student results",
    reason: "Grading system update applied",
    onClick: () => {},
  },
  {
    icon: RestoreIcon,
    title: "Restore archive data",
    description: "Recover and import data from previous school terms",
    reason: "Data recovery requested",
    onClick: () => {},
  },
];

const AdminToolsTab = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [timestamp, setTimestamp] = useState("");

  const currentAdmin = ADMIN_DATA;
  const adminName = `${currentAdmin.adminFirstName} ${currentAdmin.adminMiddleName} ${currentAdmin.adminLastName}`;

  const handleOpenTool = (tool: Tool) => {
    const now = new Date();
    const date = formatDate(now);
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setTimestamp(`${date}. ${time}`);
    setSelectedTool(tool);
  };

  const handleConfirm = () => {
    selectedTool?.onClick();
    setSelectedTool(null);
  };

  return (
    <div className="flex flex-col gap-2 ml:gap-4 text-[#4E4E4E] px-5 ml:px-8 font-medium">
      <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight">
        Admin Tools
      </h2>
      <p className="text-[clamp(12px,1.4vw,16px)]">
        Operation tools for managing and troubleshooting the school system
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {TOOLS.map((tool) => (
          <div
            key={tool.title}
            className="flex items-start gap-3 p-4 border-[1.5px] border-[#CFCFCF] rounded-[13px] hover:border-[#0EB26B] transition-colors"
          >
            <div>
              <tool.icon className="w-7 h-7" />
            </div>
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
                  onClick={() => handleOpenTool(tool)}
                >
                  Run
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DIALOG */}
      <Dialog
        open={selectedTool !== null}
        onOpenChange={(open) => !open && setSelectedTool(null)}
      >
        <DialogContent className="p-12">
          <div className="flex flex-col gap-12 text-[clamp(14px,1.6vw,18px)]">
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <p>Admin :</p>
                <div className="flex items-center gap-3">
                  <div>
                    {currentAdmin?.profilePicture ? (
                      <img
                        src={currentAdmin.profilePicture}
                        alt={adminName}
                        className="w-10 h-10 lg:w-12 lg:h-12  rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#D9D9D9]" />
                    )}
                  </div>
                  <p className="font-bold text-[clamp(14px,1.4vw,16px)]">
                    {adminName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                <p>Timestamp :</p>
                <p>{timestamp}</p>
              </div>

              <div className="grid grid-cols-[1fr_2fr] items-start gap-2">
                <p className="text-nowrap">Reason :</p>
                <p>{selectedTool?.reason}</p>
              </div>

              <div className="flex items-center gap-6 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#000000] border text-[#4E4E4E]"
                  onClick={() => setSelectedTool(null)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleConfirm}>
                  Confirm & Proceed
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminToolsTab;
