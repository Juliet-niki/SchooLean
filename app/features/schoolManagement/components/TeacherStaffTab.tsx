import { useState } from "react";
import { MoreIcon } from "~/assets/icons";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ISchool, ITeacher } from "~/types";
import { formatWithAnd } from "~/utils/formatText";

const TableRow = ({ teacher }: { teacher: ITeacher }) => {
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#373737] font-medium border-b last:border-none border-[#EBEBEB]">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {teacher.profilePic ? (
            <img
              src={teacher.profilePic}
              alt={teacher.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D9D9D9]" />
          )}
          <div>
            <p className="font-bold mb-1">{teacher.name}</p>
            <p className="text-[clamp(11px,1.1vw,13px)] font-semibold">
              {teacher.email}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">{formatWithAnd(teacher.assignedSubjects)}</td>
      <td className="py-3 px-4 text-center">
        {formatWithAnd(teacher.assignedClass)}
      </td>
      <td className="py-3 px-4 ">
        <div className="flex items-center justify-center">
          <StatusView
            styleOption={true}
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 px-3 rounded-[7px] w-fit text-center"
            status={teacher.status === "ACTIVE" ? "Active" : "Inactive"}
            green="Active"
            red="Inactive"
          />
        </div>
      </td>
      <td className="py-3 px-4 text-center">
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
            <div className="flex flex-col gap-1 mb-2">
              {[
                { label: "View Teacher Profile", onClick: () => {} },
                { label: "Reset Password", onClick: () => {} },
                { label: "Reassign Subject/Class", onClick: () => {} },
                { label: "Deactivate", onClick: () => {} },
              ].map((option) => (
                <p
                  key={option.label}
                  className={`cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg ${
                    option.label === "Deactivate"
                      ? "text-[#DD3232]"
                      : "text-[#404040]"
                  }`}
                  onClick={option.onClick}
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
};

const TeacherStaffTab = ({ school }: { school: ISchool }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(school.teachers.length / itemsPerPage);

  const paginatedData = school.teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="border border-[#F3F3F3] shadow-md shadow-[#0000001A] rounded-t-[15px]">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] text-nowrap">
          <tr>
            {[
              "Name & Email",
              "Assigned Subjects",
              "Assigned Classes",
              "Status",
              "Actions",
            ].map((col, index, arr) => (
              <th
                key={col}
                className={`py-3 px-4 text-center font-bold bg-[#E6F7F0]
                    ${index === 0 ? "rounded-tl-[15px] text-start" : ""}
                    ${index === 1 ? "text-start" : ""}
                    ${index === arr.length - 1 ? "rounded-tr-[15px]" : ""}
                  `}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((teacher) => (
              <TableRow key={teacher.teacherId} teacher={teacher} />
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
              >
                No teachers found.
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
  );
};

export default TeacherStaffTab;
