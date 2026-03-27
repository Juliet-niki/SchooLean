import { useMemo, useState } from "react";
import {
  ChartIcon,
  CircleIcon,
  DateCalenderIcon,
  DownIcon,
  MoreIcon,
  WaterDropletIcon,
} from "~/assets/icons";
import PopoverDropdown from "~/components/PopoverDropdown";
import SearchInput from "~/components/SearchInput";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Progress } from "~/components/ui/progress";
import { STUDENT_TAB_FILTERS } from "~/data";
import type { ISchool, IStudent } from "~/types";
import { StudentChart } from "./studentChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const TableRow = ({ student }: { student: IStudent }) => {
  const planProgress =
    student.attendanceRate > 0 ? (student.attendanceRate / 100) * 100 : 0;
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#EBEBEB]">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {student.profilePic ? (
            <img
              src={student.profilePic}
              alt={student.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D9D9D9]" />
          )}

          <p className="font-bold w-44">{student.name}</p>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        {student.class} {student.classArm}
      </td>
      <td className="py-3 px-4 text-center">
        {student.gender}, {student.age}
      </td>
      <td className="py-3 px-4 ">
        <div className="flex items-center gap-2 font-bold">
          <Progress value={planProgress} max={100} className="h-3" />
          {student.attendanceRate}%
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
            className="w-fit py-1 px-1 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-24 text-[13px] font-medium"
            sideOffset={6}
          >
            <div className="flex flex-col gap-1 mb-2">
              {[
                { label: "View Profile", onClick: () => {} },
                { label: "Change Class", onClick: () => {} },
                { label: "Merge Duplicate Student", onClick: () => {} },
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

const StudentTab = ({ school }: { school: ISchool }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredStudents = useMemo(() => {
    const search = searchText.toLowerCase().trim();
    return school.students.filter((student) => {
      const matchesSearch =
        !search ||
        student.name.toLowerCase().includes(search) ||
        student.class.toLowerCase().includes(search);
      const matchesClass =
        !filters.class ||
        filters.class === "all" ||
        student.class.toLowerCase() === filters.class.toLowerCase();
      const matchesClassArm =
        !filters.classArm ||
        `${student.class} ${student.classArm}` === filters.classArm;
      const matchesGender =
        !filters.gender ||
        filters.gender === "all" ||
        student.gender.toLowerCase() === filters.gender.toLowerCase();
      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        student.status === filters.status;
      return (
        matchesSearch &&
        matchesClass &&
        matchesGender &&
        matchesStatus &&
        matchesClassArm
      );
    });
  }, [filters, searchText, school.students]);

  const itemsPerPage = 7;

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const paginatedData = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const averageAttendance = useMemo(() => {
    if (!school.students.length) return 0;
    return (
      school.students.reduce((sum, s) => sum + s.attendanceRate, 0) /
      school.students.length
    );
  }, [school.students]);

  const averageGrade = useMemo(() => {
    if (!school.students.length) return 0;
    return (
      school.students.reduce((sum, s) => sum + s.averageGrade, 0) /
      school.students.length
    );
  }, [school.students]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getClassLabel = () => {
    if (!filters.class || filters.class === "all") return "Classes";
    if (filters.classArm) return filters.classArm;
    return filters.class;
  };

  return (
    <div>
      <div className="grid grid-cols-[2.1fr_1fr] gap-4 pb-3">
        <div className="flex items-center justify-between gap-4 ml-4 ">
          <div>
            <SearchInput
              setSearchText={(text) => {
                setSearchText(text);
                setCurrentPage(1);
              }}
              className="border-[#D5D5D5] h-10 w-80"
              placeholder="Search for name of student "
            />
          </div>
          <div className="flex items-center gap-4">
            {STUDENT_TAB_FILTERS.filter((f) => f.key === "class").map(
              (filter) => (
                <DropdownMenu key={filter.key}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="border border-[#D5D5D5] rounded-[5px] px-2.5 py-1.5 text-[#4E4E4E] font-semibold flex items-center gap-1"
                    >
                      {getClassLabel()}
                      <DownIcon
                        className="w-2.5 h-2.5 lg:w-3 lg:h-3"
                        fill="#000"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          class: "all",
                          classArm: "",
                        }))
                      }
                    >
                      All Classes
                    </DropdownMenuItem>
                    {filter.options
                      .filter((o) => o.value !== "all")
                      .map((option) => (
                        <DropdownMenuSub key={option.value}>
                          <DropdownMenuSubTrigger>
                            {option.label}
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  setFilters((prev) => ({
                                    ...prev,
                                    class: option.value,
                                    classArm: "",
                                  }))
                                }
                              >
                                All {option.label}
                              </DropdownMenuItem>
                              {option.classArm?.map((arm) => (
                                <DropdownMenuItem
                                  key={arm}
                                  onClick={() =>
                                    setFilters((prev) => ({
                                      ...prev,
                                      class: option.value,
                                      classArm: arm,
                                    }))
                                  }
                                >
                                  {arm}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            )}
            {STUDENT_TAB_FILTERS.filter((filter) => filter.key !== "class").map(
              (filter) => (
                <PopoverDropdown
                  key={filter.key}
                  options={filter.options}
                  defaultSelected={filter.options[0].value}
                  BtnClassName="border border-[#D5D5D5] rounded-[5px] px-2.5 py-1.5 text-[#4E4E4E] font-semibold"
                  onChange={(value) => handleFilterChange(filter.key, value)}
                  Iconfill="#000"
                />
              ),
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2.1fr_1fr] gap-4 border-t border-[#DCDADA] text-[#4E4E4E]">
        <div className="flex flex-col gap-5">
          <div className="pt-2 border-r border-[#DCDADA]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {[
                    "Name",
                    "Class & Arm",
                    "Gender & Age",
                    "Attendance Rate",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      className={`sticky top-0 z-50 text-[clamp(12px,1.4vw,16px)] text-nowrap py-3 px-4  text-center font-bold bg-[#E6F7F0] 
                    `}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((student) => (
                    <TableRow key={student.studentId} student={student} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-[clamp(12px,1.2vw,14px)]"
                    >
                      No Student found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-auto">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mr-2 pt-2 text-[clamp(12px,1.4vw,16px)] font-medium">
          <div className="border border-[#B7B7B7] shadow-md shadow-[#00000040] rounded-[10px] divide-y divide-[#E4E4E4]">
            <div className="px-7 py-6 flex flex-col gap-6">
              <h2 className="font-bold">Attendance Summary</h2>
              <div className="flex items-center gap-3">
                <StudentChart
                  value={averageAttendance}
                  color="#0EB26B"
                  trackColor="#E2C028"
                />
                <div className="text-[clamp(12px,1.2vw,14px)]">
                  <p>Overall Attendance</p>
                  <p className="font-bold text-[clamp(18px,2.2vw,30px)]">
                    {Math.round(averageAttendance)}%
                  </p>
                  <p className="text-[clamp(14px,1.6vw,18px)] font-extrabold">
                    <span className=" text-2xl">+</span> 3% Attendance Rate
                  </p>
                  <p> This Term</p>
                </div>
              </div>
            </div>
            <div className="px-7 py-6 text-[clamp(12px,1.2vw,14px)]">
              <div className="flex items-center gap-2 mb-3">
                <ChartIcon className="w-4 h-4" />
                <p>Classes With Low Attendance: 10</p>
              </div>
              <div className="flex items-center gap-2">
                <WaterDropletIcon className="w-4 h-4" />
                <p>Days/Weeks with Abnormal Drops: 3</p>
              </div>
            </div>
          </div>
          <div className="border border-[#B7B7B7] shadow-md shadow-[#00000040] rounded-[10px] divide-y divide-[#E4E4E4]">
            <div className="px-7.5 py-6 flex flex-col gap-6">
              <h2 className="font-bold">Academic Performance</h2>
              <div className="flex items-center gap-3">
                <StudentChart
                  value={averageGrade}
                  color="#0EB26B"
                  trackColor="#E2C028"
                />
                <div className="text-[clamp(12px,1.2vw,14px)]">
                  <p className="text-[clamp(12px,1.2vw,16px)] font-semibold mb-4">
                    Average Grade:{" "}
                    <span className="ml-3">{Math.round(averageGrade)}%</span>
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <ChartIcon className="w-4 h-4" />
                    <p>Excellent Student</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <CircleIcon className="w-4 h-4" />
                    <p>Struggling Student</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleIcon className="w-4 h-4" />
                    <p>Classes With Low Grades</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-7.5 py-6">
              <DateCalenderIcon className="w-5 h-5" />
              <p>Upcoming Exams: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTab;
