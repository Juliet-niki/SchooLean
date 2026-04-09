import { useMemo, useState } from "react";
import { MoreIcon } from "~/assets/icons";
import SearchInput from "~/components/SearchInput";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { IParent, ISchool } from "~/types";

const TableRow = ({ parent, school }: { parent: IParent; school: ISchool }) => {
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#EBEBEB]">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {parent.profilePic ? (
            <img
              src={parent.profilePic}
              alt={parent.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D9D9D9]" />
          )}

          <p className="font-bold w-32 md:w-36 lg:w-44">{parent.name}</p>
        </div>
      </td>
      <td className="py-3 px-4 lg:px-8 border-x border-[#EBEBEB]">
        <div className="w-44 md:w-full">
          <div className="flex flex-col gap-2 w-full md:w-[90%] xl:w-[80%] ">
            {parent.linkedChildren.map((child) => {
              const student = school.students.find(
                (s) => s.studentId === child.studentId,
              );

              if (!student) return null;

              return (
                <div
                  key={student.studentId}
                  className="grid grid-cols-[2.2fr_1fr] gap-4 items-center"
                >
                  <p>{student.name}</p>
                  <p>
                    {student.class} {student.classArm}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </td>
      <td className="py-3 px-4 lg:px-8 border-x border-[#EBEBEB]">
        <div className="flex flex-col gap-2">
          <p>{parent.loginActivity}</p>

          <StatusView
            styleOption={true}
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 px-3 rounded-[7px] w-fit text-center"
            status={parent.status === "ACTIVE" ? "Active" : "Inactive"}
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
                { label: "View Profile", onClick: () => {} },
                { label: "Fix Parent-Student Link", onClick: () => {} },
                { label: "Payment History", onClick: () => {} },
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

const ParentTab = ({ school }: { school: ISchool }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredParents = useMemo(() => {
    const search = searchText.toLowerCase().trim();
    if (!search) return school.parents;

    return school.parents.filter((parent) => {
      const matchesParent = parent.name.toLowerCase().includes(search);

      const matchesChild = parent.linkedChildren.some((child) => {
        const student = school.students.find(
          (s) => s.studentId === child.studentId,
        );
        if (!student) return false;
        const matchesName = student.name.toLowerCase().includes(search);
        const matchesClass = student.class.toLowerCase().includes(search);
        return matchesName || matchesClass;
      });

      return matchesParent || matchesChild;
    });
  }, [searchText, school.parents]);

  const itemsPerPage = 7;

  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);

  const paginatedData = filteredParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-2 divide-y divide-[#E4E4E4]">
      <div className="pl-4 pb-3">
        <h2 className="text-[#4E4E4E] text-[clamp(15px,1.8vw,20px)] font-bold leading-tight pb-4 ml:pb-6">
          Parents
        </h2>
        <SearchInput
          setSearchText={(text) => {
            setSearchText(text);
            setCurrentPage(1);
          }}
          className="border-[#D5D5D5] h-10 w-80"
          placeholder="Search for name of parent"
        />
      </div>
      <div className="px-4">
        <div className="shadow-md shadow-[#0000001A] rounded-[15px]  overflow-x-auto hide-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] text-nowrap">
              <tr>
                {["Name", "Linked Children", "Login Activity", "Actions"].map(
                  (col, index, arr) => (
                    <th
                      key={col}
                      className={`py-3 px-4 font-bold bg-[#E6F7F0]
                    ${index === 0 ? "rounded-tl-[15px] " : ""}
                    ${index === 1 ? "lg:px-8" : ""}
                    ${index === 2 ? "lg:px-8" : ""}
                    ${index === arr.length - 1 ? "rounded-tr-[15px] text-center" : "text-start"}
                  `}
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((parent) => (
                  <TableRow
                    key={parent.parentId}
                    parent={parent}
                    school={school}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                  >
                    No parents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pt-7">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ParentTab;
