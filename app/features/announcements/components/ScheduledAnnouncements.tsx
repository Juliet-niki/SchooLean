import { useMemo, useState } from "react";
import {
  CancelIcon,
  ChatIcon,
  EditIcon,
  Mail2Icon,
  MoreIcon,
  RescheduleIcon,
  ShowEyeIcon,
} from "~/assets/Icons";
import SearchInput from "~/components/SearchInput";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ANNOUNCEMENTS, type IAnnouncement } from "~/data/announcementData";
import { cn } from "~/lib/utils";
import { formatDate, formatTime } from "~/utils/formatDate";
import { formatDisplayText } from "~/utils/formatText";

const TableRow = ({
  a,
  onView,
  onEdit,
  onReschedule,
  onCancelSchedule,
}: {
  a: IAnnouncement;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onReschedule: (id: string) => void;
  onCancelSchedule: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancelSchedule = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    onCancelSchedule(a.id);
    setIsOpen(false);
  };

  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#BCBCBC] bg-[#0EB26B08]">
      <td className="py-3 pr-4 pl-6 text-start">{a.title}</td>
      <td className="py-3 px-4 text-center ">
        <div
          className={cn(
            "flex items-center justify-center",
            a.deliveryChannels.length > 1 && "gap-2",
          )}
        >
          <span>
            {a.deliveryChannels.includes("EMAIL") && (
              <Mail2Icon className="w-5 h-5" stroke="#000" />
            )}
          </span>
          <span>
            {a.deliveryChannels.includes("IN_APP") && (
              <ChatIcon className="w-5 h-5" />
            )}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-start">{formatDisplayText(a.audience)}</td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">
            {formatDate(a.schedule?.scheduledFor)}
          </span>
          <span className="font-normal">
            {formatTime(a.schedule?.scheduledFor)}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-start">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{a.createdBy.name}</span>
          <span className="font-normal">{formatDate(a.createdAt)}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center">
          <StatusView
            variant="soft"
            styleOption={true}
            status={a.schedule?.status === "SCHEDULED" ? "Scheduled" : "Failed"}
            green="Scheduled"
            red="Failed"
          />
        </div>
      </td>
      <td className="py-3 pl-4 pr-6 text-center">
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="cursor-pointer">
              <MoreIcon className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit py-1 px-1 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-12 text-[13px] font-medium"
            sideOffset={6}
          >
            <div className="flex flex-col mb-2">
              {[
                {
                  label: "View",
                  onClick: () => {
                    onView(a.id);
                  },
                  icon: <ShowEyeIcon className="w-4 h-4" stroke="#4E4E4E" />,
                },
                {
                  label: "Edit",
                  onClick: () => {
                    onEdit(a.id);
                  },
                  icon: <EditIcon className="w-4 h-4" />,
                },
                {
                  label: "Reschedule",
                  onClick: () => {
                    onReschedule(a.id);
                  },
                  icon: <RescheduleIcon className="w-4 h-4" />,
                },
                {
                  label: "Cancel Schedule",
                  onClick: () => {
                    setIsOpen(true);
                  },
                  icon: <CancelIcon className="w-4 h-4" />,
                },
              ].map((option) => (
                <div
                  key={option.label}
                  className="cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg flex items-center gap-2"
                  onClick={option.onClick}
                >
                  <span>{option.icon}</span>
                  <p> {option.label}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent className="p-12">
            <div className="flex flex-col gap-12 md:gap-20">
              <p className="text-[clamp(14px,1.6vw,18px)] text-[#4E4E4E] font-semibold">
                Are you sure you want to cancel schedule?
              </p>

              <div className="flex items-center ml-auto gap-6 md:gap-8">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#C2C2C2] border text-[#4E4E4E] h-10 px-6"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 px-6 bg-[#D3F0E3] hover:bg-[#D3F0E3]/80 text-[#4E4E4E] border border-[#C2C2C2]"
                  onClick={handleCancelSchedule}
                >
                  Yes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

const ScheduledAnnouncements = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelledIds, setCancelledIds] = useState<string[]>([]);

  const filteredAnnouncement = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    const scheduledAnnouncements = ANNOUNCEMENTS.filter(
      (announcement) =>
        announcement.status === "SCHEDULED" &&
        !cancelledIds.includes(announcement.id),
    );

    if (!search) return scheduledAnnouncements;

    return scheduledAnnouncements.filter((announcement) => {
      const matchesId = announcement.id.toLowerCase().includes(search);

      const matchesTitle = announcement.title.toLowerCase().includes(search);

      const matchesChannel = announcement.deliveryChannels.some((channel) =>
        channel.toLowerCase().includes(search),
      );

      const matchesAudience = announcement.audience
        .toLowerCase()
        .includes(search);

      const matchesCreatedBy = announcement.createdBy.name
        .toLowerCase()
        .includes(search);

      return (
        matchesId ||
        matchesTitle ||
        matchesChannel ||
        matchesAudience ||
        matchesCreatedBy
      );
    });
  }, [searchText, cancelledIds]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAnnouncement.length / itemsPerPage);
  const paginatedData = filteredAnnouncement.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const startIndex =
    filteredAnnouncement.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredAnnouncement.length,
  );

  const handleView = (id: string) => {
    // TODO: view announcement details
  };
  const handleEdit = (id: string) => {
    // TODO: open Create/Edit form pre-filled with this template
  };

  const handleReschedule = (id: string) => {
    // TODO: open Create/Edit form pre-filled with this template
  };

  const handleCancelSchedule = (announcementId: string) => {
    setCancelledIds((prev) => [...prev, announcementId]);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <SearchInput
        setSearchText={(text) => setSearchText(text)}
        className="h-[45px] w-[380px] border-[#CACACA] px-5"
        placeholder="Search  announcements"
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto hide-scrollbar border border-[#CACACA] rounded-[10px]">
          <table className="w-full min-w-[1100px] border-collapse table-fixed">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead className="border-b border-[#CACACA]">
              <tr>
                {[
                  "Title",
                  "Delivery Channel",
                  "Audience",
                  "Date Sched",
                  "Created By",
                  "Status",
                  "Action",
                ].map((col, index) => (
                  <th
                    key={col}
                    className={cn(
                      "sticky top-0 z-50 px-4 py-4 text-nowrap text-[clamp(12px,1.4vw,16px)] font-semibold text-start",
                      index === 0 && "pl-6",
                      index === 6 && "pr-6",
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((announcement) => (
                  <TableRow
                    key={announcement.id}
                    a={announcement}
                    onView={handleView}
                    onEdit={handleEdit}
                    onReschedule={handleReschedule}
                    onCancelSchedule={handleCancelSchedule}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                  >
                    No announcement found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-7 md:mt-10 lg:mt-12 flex items-center justify-between">
          <div className="flex items-center justify-between text-[#868686] text-[clamp(11px,1.2vw,13px)]">
            <span>
              Showing {startIndex} to {endIndex} of{" "}
              {filteredAnnouncement.length} announcements
            </span>
          </div>
          <div>
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

export default ScheduledAnnouncements;
