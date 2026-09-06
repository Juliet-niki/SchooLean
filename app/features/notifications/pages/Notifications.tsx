import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  CustomerSuccessIcon,
  CustomerSupportIcon,
  FinanceIcon,
  LeftIcon,
  SecurityIcon,
  SystemIcon,
  ArchiveIcon,
} from "~/assets/Icons";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import type { NotificationType } from "~/types";
import { useNotifications } from "~/context/NotificationsContext";
import { useAuth } from "~/context/AuthContext";
import TablePagination from "~/components/TablePagination";
import { DrawerDialog } from "~/components/DrawerDialog";
import AssignTicket from "../components/AssignTicket";
import { formatReceivedAt } from "~/utils/formatDate";
import StatusView from "~/components/StatusView";
import { useIsMobile } from "~/hooks/useIsMobile";
import { getTeamMember } from "~/data/teamMembersData";

const NOTIFICATION_TYPES: NotificationType[] = [
  {
    key: "customerSuccess",
    icon: <CustomerSuccessIcon className="w-6 h-6 md:w-8 md:h-8" />,
    iconBg: "#0EB26B14",
    title: "Customer Success & Sales",
    description: "Operational alert that require your attention and action",
    textColor: "#0EB26B",
  },
  {
    key: "finance",
    icon: <FinanceIcon className="w-6 h-6 md:w-8 md:h-8" />,
    iconBg: "#E59C1514",
    title: "Finance",
    description: "Payment, subscription and billing related alerts.",
    textColor: "#E59C15",
  },
  {
    key: "customerSupport",
    icon: <CustomerSupportIcon className="w-6 h-6 md:w-8 md:h-8" />,
    iconBg: "#1C88BE14",
    title: "Customer Support",
    description: "Payment, subscription and billing related alerts.",
    textColor: "#1C88BE",
  },
  {
    key: "security",
    icon: <SecurityIcon className="w-6 h-6 md:w-8 md:h-8" />,
    iconBg: "#F54F5214",
    title: "Security",
    description: "Security alerts, suspicious activities and access changes",
    textColor: "#F54F52",
  },
  {
    key: "system",
    icon: <SystemIcon className="w-6 h-6 md:w-8 md:h-8" />,
    iconBg: "#881CBE14",
    title: "System",
    description: "System errors, integration and maintenance alerts",
    textColor: "#881CBE",
  },
];

const TABS = [
  { key: "all", label: "All Notifications" },
  { key: "unread", label: "Unread" },
  { key: "archived", label: "Archived" },
  { key: "assigned", label: "Assigned to Me" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface ColumnConfig {
  key: string;
  header: string;
  width: string;
}

function getColumnsForType(
  activeType: string,
  isMobile: boolean,
): ColumnConfig[] {
  const columns: ColumnConfig[] = [
    { key: "checkbox", header: "", width: "5%" },
    {
      key: "notification",
      header: "Notification",
      width: isMobile ? "25%" : "32%",
    },
  ];

  if (activeType === "finance") {
    columns.push({ key: "financeType", header: "Type", width: "10%" });
  }

  if (activeType === "customerSupport") {
    columns.push({ key: "assignedTo", header: "Assigned To", width: "17%" });
  }

  if (activeType === "system") {
    columns.push({
      key: "relatedComponent",
      header: "Related Component",
      width: "16%",
    });
  } else {
    columns.push({
      key: "relatedSchool",
      header:
        activeType === "security" ? "Related School/User" : "Related School",
      width: "18%",
    });
  }

  if (activeType === "customerSupport") {
    columns.push({ key: "status", header: "Status", width: "12%" });
  }

  if (activeType === "finance") {
    columns.push({ key: "amount", header: "Amount", width: "10%" });
  }

  columns.push(
    { key: "received", header: "Received", width: "10%" },
    { key: "priority", header: "Priority", width: "10%" },
  );

  return columns;
}

const Notifications = () => {
  const { notifications, markAsRead, archive, unarchive, assignToMember } =
    useNotifications();
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenAssign, setIsOpenAssign] = useState(false);

  const isMobile = useIsMobile();

  const activeType = searchParams.get("type") ?? "customerSuccess";
  const activeTab = (searchParams.get("tab") ?? "all") as TabKey;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, activeTab]);

  const activeTypeData = NOTIFICATION_TYPES.find(
    (type) => type.key === activeType,
  )!;

  const columns = useMemo(
    () => getColumnsForType(activeType, isMobile),
    [activeType, isMobile],
  );

  const activeTypeNotifications = useMemo(
    () => notifications.filter((n) => n.type === activeType),
    [notifications, activeType],
  );

  const tabCounts = useMemo(() => {
    const visible = activeTypeNotifications.filter((n) => !n.isArchived);
    return {
      all: visible.length,
      unread: visible.filter((n) => !n.isRead).length,
      archived: activeTypeNotifications.filter((n) => n.isArchived).length,
      assigned: visible.filter(
        (n) => n.assignedMember?.userId === currentUser?.userId,
      ).length,
    };
  }, [activeTypeNotifications, currentUser]);

  const filteredNotifications = useMemo(() => {
    return activeTypeNotifications.filter((n) => {
      if (activeTab === "archived") return n.isArchived;
      if (n.isArchived) return false;
      if (activeTab === "unread") return !n.isRead;
      if (activeTab === "assigned")
        return n.assignedMember?.userId === currentUser?.userId;
      return true;
    });
  }, [activeTypeNotifications, activeTab, currentUser]);

  const allSelected =
    filteredNotifications.length > 0 &&
    filteredNotifications.every((n) => selectedIds.includes(n.notificationId));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) => !filteredNotifications.some((n) => n.notificationId === id),
        ),
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...filteredNotifications
          .filter((n) => !prev.includes(n.notificationId))
          .map((n) => n.notificationId),
      ]);
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleTypeChange = (key: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("type", key);
      next.set("tab", "all");
      return next;
    });
    setSelectedIds([]);
  };

  const handleTabChange = (tab: TabKey) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tab);
      return next;
    });
  };

  const itemsPerPage = 4;

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const paginatedData = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const startIndex =
    filteredNotifications.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredNotifications.length,
  );

  const handleMarkAsRead = async () => {
    await markAsRead(selectedIds);
    setSelectedIds([]);
  };

  const handleArchive = async () => {
    await archive(selectedIds);
    setSelectedIds([]);
  };

  const handleUnArchive = async () => {
    await unarchive(selectedIds);
    setSelectedIds([]);
  };

  const handleAssignTicket = async (memberId: string) => {
    try {
      await assignToMember(selectedIds, memberId);
      setSelectedIds([]);
      setIsOpenAssign(false);
    } catch {
      // modal stays open on failure
    }
  };

  const navigate = useNavigate();
  const goBack = () => navigate(`/`);

  return (
    <>
      <div className="my-8 mx-6 md:my-10 md:mx-9 text-[#4E4E4E]">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent"
            onClick={goBack}
          >
            <LeftIcon className="w-6 h-6 md:w-7 md:h-7" />
          </Button>
          <div className="flex flex-col gap-2">
            <h2 className="text-[clamp(16px,1.8vw,24px)] font-semibold leading-tight">
              {activeTypeData.title}
            </h2>
            <p className="text-[#868686] text-[clamp(12px,1.4vw,16px)] font-medium">
              {activeTypeData.description}
            </p>
          </div>
        </div>

        {/* Type cards */}
        <div className="mt-8 md-mt-10 lg:mt-12 mb-10 md:mb-12 lg:mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
          {NOTIFICATION_TYPES.map((item) => {
            const isActive = item.key === activeType;
            const unreadCount = notifications.filter(
              (n) => n.type === item.key && !n.isRead,
            ).length;

            return (
              <div
                key={item.key}
                role="button"
                tabIndex={0}
                onClick={() => handleTypeChange(item.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleTypeChange(item.key);
                }}
                className={cn(
                  "grid grid-cols-[auto_1fr] items-center  shadow-md shadow-[#00000026] rounded-[7px] p-4 gap-5 w-full cursor-pointer transition-colors outline-none border-2",
                  isActive ? "border-[#0EB26B] " : "border-[#D9D9D9]",
                )}
              >
                <div
                  className="rounded-[7px] flex items-center justify-center w-[47px] h-[50px] shrink-0"
                  style={{ backgroundColor: item.iconBg }}
                >
                  {item.icon}
                </div>

                <div className="flex flex-col gap-2 min-w-0">
                  <h3 className="text-[clamp(14px,1.6vw,16px)] font-semibold leading-tight">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-auto">
                    <p
                      className="font-semibold text-[clamp(18px,1.8vw,24px)]"
                      style={{ color: item.textColor }}
                    >
                      {unreadCount}
                    </p>
                    <p className="text-[#7D7D7DEE] text-[clamp(12px,1.4vw,14px)] font-medium">
                      Unread
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => handleTabChange(v as TabKey)}
        >
          <div className="overflow-x-auto hide-scrollbar flex items-center justify-between gap-3 border-b border-[#C4C4C4]">
            <TabsList className="w-full bg-transparent rounded-none p-0 h-auto  justify-start">
              <div className="w-max flex items-center gap-10 md:gap-12 lg:gap-16">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className="px-0 py-2 text-[clamp(16px,1.8vw,20px)] font-medium font-poppins text-[#4E4E4E] data-[state=active]:text-[#0EB26B] data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-[#0EB26B] rounded-none bg-transparent"
                  >
                    {tab.label}{" "}
                    <span
                      className={cn(
                        "ml-1 border border-[#C7C7C7] rounded-[5px] w-6 h-6 md:w-8 md:h-8",
                        tab.key === activeTab
                          ? "bg-[#0EB26B0F]"
                          : "bg-[#4E4E4E0F]",
                      )}
                    >
                      {tabCounts[tab.key]}
                    </span>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </div>

          {TABS.map((tab) => (
            <TabsContent
              key={tab.key}
              value={tab.key}
              className="mt-6 md:mt-10 lg:mt-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 lg:mb-6 gap-4">
                <div className="ml-2 md:ml-3 lg:ml-4 flex items-center gap-5 md:gap-7  text-[clamp(12px,1.4vw,16px)] font-medium">
                  <div className="flex items-center gap-[5px]">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                      className="cursor-pointer"
                    />
                    <p>Select All</p>
                  </div>
                  <p className="">{selectedIds.length} Selected</p>
                </div>

                {selectedIds.length > 0 && (
                  <div className="ml-auto flex items-center gap-2 md:gap-4 font-medium text-[#0EB26B]">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white border border-[#CACACA] rounded-[3px] text-[#0EB26B] h-7 md:h-[35px]"
                      onClick={handleMarkAsRead}
                    >
                      Mark as Read
                    </Button>
                    {activeTab === "archived" ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white border border-[#CACACA] rounded-[3px] flex items-center gap-2 h-7 md:h-[35px]"
                        onClick={handleUnArchive}
                      >
                        Unarchive
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white border border-[#CACACA] rounded-[3px] flex items-center gap-2 h-7 md:h-[35px]"
                        onClick={handleArchive}
                      >
                        <ArchiveIcon className="w-4 h-4 md:w-5 md:h-5" />{" "}
                        Archive
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white border border-[#CACACA] rounded-[3px] h-7 md:h-[35px]"
                      onClick={() => setIsOpenAssign(true)}
                    >
                      Assign
                    </Button>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto hide-scrollbar border border-[#CACACA]  rounded-[10px]">
                <table className="w-full border-collapse table-fixed min-w-[800px]">
                  <colgroup>
                    {columns.map((col) => (
                      <col key={col.key} style={{ width: col.width }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr className="text-[clamp(14px,1.6vw,18px)] font-semibold text-left border-b border-[#CACACA] ">
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          className="whitespace-nowrap px-4 py-5"
                        >
                          {col.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((n) => {
                        const assignee = getTeamMember(
                          n.assignedMember?.userId,
                        );

                        return (
                          <tr
                            key={n.notificationId}
                            className={cn(
                              "text-[clamp(12px,1.3vw,14px)] border-t first:border-t-0 border-[#CACACA]",
                              n.isRead === true
                                ? "bg-[#DCDCDC]"
                                : "bg-[#0EB26B08]",
                            )}
                          >
                            <td className="px-4 py-3">
                              <Checkbox
                                checked={selectedIds.includes(n.notificationId)}
                                onCheckedChange={() =>
                                  toggleSelectOne(n.notificationId)
                                }
                                className="cursor-pointer"
                              />
                            </td>
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/notifications/${n.notificationId}?${searchParams.toString()}`,
                                )
                              }
                            >
                              {activeType === "customerSupport" && (
                                <p className="text-[clamp(11px,1.2vw,15px)] font-medium">
                                  {n.notificationId}
                                </p>
                              )}
                              <p className="truncate font-semibold text-[clamp(14px,1.6vw,18px)]">
                                {n.subject}
                              </p>
                              <p className="truncate text-[clamp(11px,1.2vw,15px)] font-medium">
                                {n.summary}
                              </p>
                            </td>

                            {activeType === "finance" ? (
                              <td className="px-4 py-3">
                                <StatusView
                                  variant="soft"
                                  styleOption={true}
                                  status={
                                    n.financeType === "SUBSCRIPTION"
                                      ? "Subscription"
                                      : n.financeType === "SCHOOL_FEES"
                                        ? "School Fees"
                                        : n.financeType === "DISPUTE"
                                          ? "Dispute"
                                          : "Refund"
                                  }
                                  green="Refund"
                                  yellow="Subscription"
                                  blue="School Fees"
                                  purple="Dispute"
                                />
                              </td>
                            ) : null}

                            {activeType === "customerSupport" ? (
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={
                                      assignee?.profilePicture ??
                                      "/avatars/noProfilePic.svg"
                                    }
                                    alt={assignee?.name ?? "No Profile Pic"}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />

                                  <p className="text-[clamp(14px,1.6vw,18px)] font-semibold">
                                    {assignee?.name ?? "Unassigned"}
                                  </p>
                                </div>
                              </td>
                            ) : null}

                            {activeType === "system" ? (
                              <td className="px-4 py-3 text-[clamp(11px,1.2vw,15px)] font-medium">
                                {n.relatedComponent}
                              </td>
                            ) : (
                              <td className="px-4 py-3 text-[clamp(11px,1.2vw,15px)] font-medium">
                                {n.relatedSchool?.schoolName}
                              </td>
                            )}

                            {activeType === "customerSupport" ? (
                              <td className="px-4 py-3">
                                <StatusView
                                  variant="soft"
                                  styleOption={true}
                                  status={
                                    n.notificationStatus === "IN_PROGRESS"
                                      ? "In Progress"
                                      : n.notificationStatus === "NEW"
                                        ? "New"
                                        : "Assigned"
                                  }
                                  yellow="In Progress"
                                  green="New"
                                  blue="Assigned"
                                />
                              </td>
                            ) : null}

                            {activeType === "finance" ? (
                              <td className="px-4 py-3 text-[clamp(10px,1.1vw,13px)] font-medium">
                                NGN {n.amount?.toLocaleString("en-US")}
                              </td>
                            ) : null}

                            <td className="px-4 py-3 text-[clamp(10px,1.1vw,13px)] font-medium">
                              {formatReceivedAt(n.receivedAt)}
                            </td>
                            <td className="px-4 py-3">
                              <StatusView
                                variant="soft"
                                styleOption={true}
                                status={
                                  n.priority === "LOW"
                                    ? "Low"
                                    : n.priority === "MEDIUM"
                                      ? "Medium"
                                      : "High"
                                }
                                green="Low"
                                red="High"
                                yellow="Medium"
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-4 py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.3vw,14px)]"
                        >
                          No notifications here.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 md:mt-12 lg:mt-14 flex items-center justify-between">
                <div className="flex items-center justify-between text-[#868686] text-[clamp(11px,1.2vw,13px)]">
                  <span>
                    Showing {startIndex} to {endIndex} of{" "}
                    {filteredNotifications.length} notifications
                  </span>
                </div>
                <div className="">
                  <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* ASSIGN MODAL */}
      <DrawerDialog
        open={isOpenAssign}
        close={() => setIsOpenAssign(false)}
        size="lg"
        title="Assign Ticket"
        titleCSS="text-[clamp(18px,2.2vw,26px)] text-[#4E4E4E] font-semibold"
        subTitle="Select a team member to assign this ticket to."
        descriptionCSS="text-[clamp(12px,1.6vw,18px)] text-[#868686] font-medium"
        contentCSS="h-fit py-8 px-10"
        headerClassName="border-none py-0"
        max_height
      >
        <AssignTicket
          handleCancel={() => setIsOpenAssign(false)}
          handleAssign={handleAssignTicket}
        />
      </DrawerDialog>
    </>
  );
};

export default Notifications;
