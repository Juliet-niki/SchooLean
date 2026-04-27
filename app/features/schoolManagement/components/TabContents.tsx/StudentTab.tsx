import { useMemo, useState } from "react";
import {
  ChartIcon,
  CircleIcon,
  Calendar2Icon,
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
import { STUDENT_TAB_FILTERS } from "~/data/schoolData";
import type { ISchool, IStudent } from "~/types";
import { StudentChart } from "./studentChart";
import NestedDropdown from "~/components/NestedDropdown";

const TableRow = ({ student }: { student: IStudent }) => {
  const planProgress =
    student.attendanceRate > 0 ? (student.attendanceRate / 100) * 100 : 0;
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#EBEBEB]">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div>
            {student.profilePic ? (
              <img
                src={student.profilePic}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#D9D9D9]" />
            )}
          </div>

          <p className="font-bold">{student.name}</p>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        {student.class} {student.classArm}
      </td>
      <td className="py-3 px-4 text-center">
        {student.gender}, {student.age}
      </td>
      <td className="py-3 px-4">
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
            className="w-fit py-1 px-1 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-12 text-[13px] font-medium"
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

  const classFilter = STUDENT_TAB_FILTERS.find((f) => f.key === "class")!;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[2.1fr_1fr] gap-4 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mx-4">
          <div>
            <h2 className="text-[#4E4E4E] text-[clamp(15px,1.8vw,20px)] font-bold leading-tight pb-3 ml:pb-6">
              Students
            </h2>
            <SearchInput
              setSearchText={(text) => {
                setSearchText(text);
                setCurrentPage(1);
              }}
              className="border-[#D5D5D5] h-10 w-60 md:w-80"
              placeholder="Search for name of student "
            />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <NestedDropdown
              label={classFilter.label}
              options={classFilter.options}
              selectedValue={filters.class}
              selectedArm={filters.classArm}
              onChange={(value, arm) =>
                setFilters((prev) => ({
                  ...prev,
                  class: value,
                  classArm: arm ?? "",
                }))
              }
            />
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] xl:grid-cols-[2.1fr_1fr] gap-4 border-t border-[#DCDADA] text-[#4E4E4E]">
        <div className="flex flex-col gap-5">
          <div className="pt-2 lg:border-r border-[#DCDADA] overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[700px] border-collapse table-fixed ">
              <colgroup>
                <col style={{ width: "27%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "13%" }} />
              </colgroup>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 mx-4 md:mx-6 lg:mx-0 lg:mr-2 pt-2 text-[clamp(12px,1.4vw,16px)] font-medium">
          <div className="border border-[#B7B7B7] shadow-md shadow-[#00000040] rounded-[10px] divide-y divide-[#E4E4E4]">
            <div className="px-5 py-6 flex flex-col gap-6">
              <h2 className="font-bold">Attendance Summary</h2>
              <div className="flex items-center gap-2">
                <StudentChart
                  value={averageAttendance}
                  color="#0EB26B"
                  trackColor="#E2C028"
                />
                <div className="text-[clamp(12px,1.2vw,14px)]">
                  <p>Overall Attendance</p>
                  <p className="font-bold text-[clamp(18px,2.1vw,26px)]">
                    {Math.round(averageAttendance)}%
                  </p>
                  <p className="text-[clamp(13px,1.4vw,15px)] font-extrabold">
                    <span className="text-lg">+</span> 3% Attendance Rate
                  </p>
                  <p> This Term</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-6 text-[clamp(12px,1.2vw,14px)]">
              <div className="flex items-center gap-2 mb-3">
                <ChartIcon className="w-4 h-4" />
                <p>
                  Classes With Low Attendance: {school.classesWithLowAttendance}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <WaterDropletIcon className="w-4 h-4" />
                <p>
                  Days/Weeks with Abnormal Drops:{" "}
                  {school.daysWeekswithAbnormalDrops}
                </p>
              </div>
            </div>
          </div>
          <div className="border border-[#B7B7B7] shadow-md shadow-[#00000040] rounded-[10px] divide-y divide-[#E4E4E4]">
            <div className="px-5.5 py-6 flex flex-col gap-6">
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
            <div className="flex items-center gap-3 px-5.5 py-6">
              <Calendar2Icon className="w-5 h-5" />
              <p>Upcoming Exams: {school.upcomingExams}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTab;
