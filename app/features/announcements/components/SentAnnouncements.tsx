import { useMemo, useState } from "react";
import SearchInput from "~/components/SearchInput";
import TablePagination from "~/components/TablePagination";
import { ANNOUNCEMENTS, type IAnnouncement } from "~/data/announcementData";
import { cn } from "~/lib/utils";
import { formatDate, formatTime } from "~/utils/formatDate";
import { formatDisplayText } from "~/utils/formatText";

const TableRow = ({ a }: { a: IAnnouncement }) => {
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#BCBCBC] bg-[#0EB26B08]">
      <td className="py-3 pr-4 pl-6 text-start">{a.title}</td>
      <td className="py-3 px-4 text-start">{formatDisplayText(a.audience)}</td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">
            {formatDate(a.delivery?.sentAt)}
          </span>
          <span className="font-normal">{formatTime(a.delivery?.sentAt)}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-center">{a.analytics?.totalRecipients}</td>
      <td className="py-3 px-4 text-center">{a.analytics?.totalDelivered}</td>
      <td className="py-3 px-4 text-center">{a.analytics?.totalFailed}</td>
      <td className="py-3 px-4 text-center">{a.analytics?.totalRead}</td>
      <td className="py-3 pl-4 pr-6 text-center">{a.analytics?.readRate}%</td>
    </tr>
  );
};

const SentAnnouncements = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAnnouncement = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    const sentAnnouncements = ANNOUNCEMENTS.filter(
      (announcement) => announcement.status === "SENT",
    );

    if (!search) return sentAnnouncements;

    return sentAnnouncements.filter((announcement) => {
      const matchesId = announcement.id.toLowerCase().includes(search);

      const matchesTitle = announcement.title.toLowerCase().includes(search);

      const matchesAudience = announcement.audience
        .toLowerCase()
        .includes(search);

      return matchesId || matchesTitle || matchesAudience;
    });
  }, [searchText]);

  const itemsPerPage = 4;
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

  return (
    <div className="flex flex-col gap-6 w-full">
      <SearchInput
        setSearchText={(text) => setSearchText(text)}
        className="h-[45px] w-[380px] border-[#CACACA] px-5"
        placeholder="Search  announcements"
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto hide-scrollbar border border-[#CACACA] rounded-[10px]">
          <table className="w-full min-w-[1150px] border-collapse table-fixed">
            <colgroup>
              <col style={{ width: "22%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "9%" }} />
              <col style={{ width: "9%" }} />
              <col style={{ width: "9%" }} />
            </colgroup>
            <thead className="border-b border-[#CACACA]">
              <tr>
                {[
                  "Title",
                  "Audience",
                  "Date Sent",
                  "Total Recipients",
                  "Delivered",
                  "Failed",
                  "Read",
                  "Read %",
                ].map((col, index) => (
                  <th
                    key={col}
                    className={cn(
                      "sticky top-0 z-50 px-4 py-4 text-nowrap text-[clamp(12px,1.4vw,16px)] font-semibold text-start",
                      [3, 4, 5, 6, 7].includes(index) && "text-center",
                      index === 0 && "pl-6",
                      index === 7 && "pr-6",
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
                  <TableRow key={announcement.id} a={announcement} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
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

export default SentAnnouncements;
