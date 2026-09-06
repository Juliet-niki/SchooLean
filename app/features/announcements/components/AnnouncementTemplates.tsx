import { useMemo, useState } from "react";
import {
  EditIcon,
  CopyIcon,
  DeleteIcon,
  MoreIcon,
  TablerIcon,
} from "~/assets/Icons";
import SearchInput from "~/components/SearchInput";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  ANNOUNCEMENT_TEMPLATES,
  type IAnnouncementTemplate,
} from "~/data/announcementData";
import { cn } from "~/lib/utils";
import { formatDate } from "~/utils/formatDate";
import { formatDisplayText } from "~/utils/formatText";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";

const TableRow = ({
  t,
  onEdit,
  onDuplicate,
  onUseTemplate,
  onDelete,
}: {
  t: IAnnouncementTemplate;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUseTemplate: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteTemplate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    onDelete(t.id);
    setIsOpen(false);
  };

  return (
    <tr className="text-[clamp(11px,1.4vw,15px)] text-[#4E4E4E] font-medium border-b border-[#BCBCBC] bg-[#0EB26B08]">
      <td className="py-5 pr-4 pl-6 text-start font-semibold text-[clamp(12px,1.4vw,16px)] ">
        {t.name}
      </td>
      <td className="py-5 px-4 text-start text-[clamp(12px,1.4vw,16px)] ">
        {formatDisplayText(t.category)}
      </td>
      <td className="py-5 px-4 text-start">{formatDisplayText(t.audience)}</td>
      <td className="py-5 px-4 text-start">{t.createdBy.name}</td>
      <td className="py-5 px-4 text-start">{formatDate(t.createdAt)}</td>
      <td className="py-5 pl-4 pr-6 text-center">
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
                  label: "Edit",
                  onClick: () => onEdit(t.id),
                  icon: <EditIcon className="w-4 h-4" />,
                },
                {
                  label: "Duplicate",
                  onClick: () => onDuplicate(t.id),
                  icon: <CopyIcon className="w-4 h-4" />,
                },
                {
                  label: "Use Template",
                  onClick: () => onUseTemplate(t.id),
                  icon: <TablerIcon className="w-4 h-4" stroke="#4E4E4E" />,
                },
                {
                  label: "Delete",
                  onClick: () => setIsOpen(true),
                  icon: <DeleteIcon className="w-4 h-4" />,
                },
              ].map((option) => (
                <div
                  key={option.label}
                  className="cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg flex items-center gap-2"
                  onClick={option.onClick}
                >
                  <span>{option.icon}</span>
                  <p>{option.label}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent className="p-12">
            <div className="flex flex-col gap-12 md:gap-20">
              <p className="text-[clamp(14px,1.6vw,18px)] text-[#4E4E4E] font-semibold">
                Are you sure you want to delete?
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
                  onClick={handleDeleteTemplate}
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

const AnnouncementTemplates = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const filteredTemplates = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    const activeTemplates = ANNOUNCEMENT_TEMPLATES.filter(
      (t) => !deletedIds.includes(t.id),
    );

    if (!search) return activeTemplates;

    return activeTemplates.filter((t) => {
      const matchesName = t.name.toLowerCase().includes(search);
      const matchesCategory = t.category.toLowerCase().includes(search);
      const matchesAudience = t.audience.toLowerCase().includes(search);
      const matchesCreatedBy = t.createdBy.name.toLowerCase().includes(search);
      return (
        matchesName || matchesCategory || matchesAudience || matchesCreatedBy
      );
    });
  }, [searchText, deletedIds]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedData = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const startIndex =
    filteredTemplates.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredTemplates.length,
  );

  const handleEdit = (id: string) => {
    // TODO: open Create/Edit form pre-filled with this template
  };

  const handleDuplicate = (id: string) => {
    // TODO: create a copy of this template with a new id
  };

  const handleUseTemplate = (id: string) => {
    // TODO: navigate to Create Announcement pre-filled from this template
  };

  const handleDelete = (id: string) => {
    setDeletedIds((prev) => [...prev, id]);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <SearchInput
          setSearchText={(text) => setSearchText(text)}
          className="h-[45px] w-[380px] border-[#CACACA] px-5"
          placeholder="Search announcements"
        />
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto hide-scrollbar border border-[#CACACA] rounded-[10px]">
          {paginatedData.length > 0 ? (
            <table className="w-full min-w-[1000px] border-collapse table-fixed">
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "17%" }} />
                <col style={{ width: "17%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead className="border-b border-[#CACACA]">
                <tr>
                  {[
                    "Template Name",
                    "Category",
                    "Audience",
                    "Created By",
                    "Date Created",
                    "Action",
                  ].map((col, index) => (
                    <th
                      key={col}
                      className={cn(
                        "sticky top-0 z-50 py-4 px-4 text-nowrap text-[clamp(12px,1.4vw,16px)] font-semibold text-start",
                        index === 0 && "pl-6",
                        index === 5 && "pr-6",
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((t) => (
                  <TableRow
                    key={t.id}
                    t={t}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onUseTemplate={handleUseTemplate}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]">
              No templates found.
            </div>
          )}
        </div>

        <div className="mt-7 md:mt-10 lg:mt-12 flex items-center justify-between">
          <div className="flex items-center justify-between text-[#868686] text-[clamp(11px,1.2vw,13px)]">
            <span>
              Showing {startIndex} to {endIndex} of {filteredTemplates.length}{" "}
              templates
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

export default AnnouncementTemplates;
