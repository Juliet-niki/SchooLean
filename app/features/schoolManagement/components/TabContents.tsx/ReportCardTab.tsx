import { useMemo, useState } from "react";
import { LeftIcon, MoreIcon } from "~/assets/icons";
import NestedDropdown from "~/components/NestedDropdown";
import PopoverDropdown from "~/components/PopoverDropdown";
import SearchInput from "~/components/SearchInput";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { GRADING_SYSTEM, REPORT_CARD_TAB_FILTERS } from "~/data/schoolData";
import type { IReportCard, ISchool, IStudent } from "~/types";
import PerformanceAnalytics from "./PerformanceAnalytics";
import FullScreenModal from "~/components/FullScreenModal";
import { Button } from "~/components/ui/button";

const TableRow = ({
  reportCard,
  studentMap,
  onViewReportCard,
}: {
  reportCard: IReportCard;
  studentMap: Record<number, IStudent>;
  onViewReportCard: (id: number) => void;
}) => {
  const student = studentMap[reportCard.studentId];

  if (!student) return null;

  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#EBEBEB]">
      <td className="py-4 px-4">
        <p className="font-bold">{student.name}</p>
      </td>
      <td className="py-4 px-4 text-center lg:px-8 border-x border-[#EBEBEB]">
        {reportCard.generatedOn}
      </td>
      <td className="py-4 px-4 lg:px-8 border-x border-[#EBEBEB]">
        <p
          className={`text-[clamp(13px,1.3vw,15px)] flex items-center mx-auto font-medium text-white rounded-[7px] w-fit px-3 py-1 ${reportCard.status === "PENDING" ? "bg-[#F7B801]" : "bg-[#0EB26B]"}`}
        >
          {reportCard.status === "PENDING"
            ? "Pending"
            : `${reportCard.averageGrade ?? "—"}`}
        </p>
      </td>
      <td className="py-4 px-4 lg:px-8 border-x border-[#EBEBEB]">
        <StatusView
          styleOption={true}
          classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 px-3 rounded-[7px] w-fit text-center mx-auto"
          status={reportCard.status === "COMPLETED" ? "Completed" : "Pending"}
          green="Completed"
          yellow="Pending"
        />
      </td>
      <td className="py-4 px-4 text-center">
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
                {
                  label: "View Report Card",
                  onClick: () => onViewReportCard(reportCard.reportCardId),
                },
                { label: "Regenerate Report Card", onClick: () => {} },
                { label: "Fix grading errors", onClick: () => {} },
                { label: "Export PDF", onClick: () => {} },
              ].map((option) => (
                <p
                  key={option.label}
                  className={`cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg ${
                    option.label === "Export PDF"
                      ? "text-[#F7B801]"
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

const ReportCardTab = ({ school }: { school: ISchool }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedReportCardId, setSelectedReportCardId] = useState<
    number | null
  >(null);

  const studentMap = useMemo<Record<number, IStudent>>(
    () => Object.fromEntries(school.students.map((s) => [s.studentId, s])),
    [school.students],
  );

  const filterReportCards = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return school.reportCards.filter((reportCard) => {
      const student = studentMap[reportCard.studentId];

      if (!student) return false;

      const matchesSearch =
        !search ||
        student.name.toLowerCase().includes(search) ||
        student.class.toLowerCase().includes(search);

      const matchesSession =
        !filters.session ||
        filters.session === "all" ||
        reportCard.session.toLowerCase() === filters.session.toLowerCase();

      const matchesTerm =
        !filters.term ||
        filters.term === "all" ||
        reportCard.term === filters.term;

      const matchesClass =
        !filters.class ||
        filters.class === "all" ||
        student.class.toLowerCase() === filters.class.toLowerCase();

      const matchesClassArm =
        !filters.classArm ||
        `${student.class} ${student.classArm}`.trim() ===
          filters.classArm.trim();

      return (
        matchesSearch &&
        matchesSession &&
        matchesTerm &&
        matchesClass &&
        matchesClassArm
      );
    });
  }, [filters, searchText, school.reportCards, studentMap]);

  const itemsPerPage = 7;

  const totalPages = Math.ceil(filterReportCards.length / itemsPerPage);

  const paginatedData = filterReportCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const classFilter = REPORT_CARD_TAB_FILTERS.find((f) => f.key === "class")!;

  return (
    <>
      <div className="flex flex-col divide-y divide-[#E4E4E4] gap-6">
        <div className="flex flex-col divide-y divide-[#E4E4E4] pb-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 px-4 pb-2">
            <div>
              <h2 className="text-[#4E4E4E] text-[clamp(15px,1.8vw,20px)] font-bold leading-tight pb-4 ml:pb-6">
                Report Cards & Academics
              </h2>
              <SearchInput
                setSearchText={(text) => {
                  setSearchText(text);
                  setCurrentPage(1);
                }}
                className="border-[#D5D5D5] h-10 w-60 md:w-80 ml-auto"
                placeholder="Search by student name or class"
              />
            </div>

            <div className="flex items-center gap-4 ml-auto">
              {REPORT_CARD_TAB_FILTERS.filter(
                (filter) => filter.key !== "class",
              ).map((filter) => (
                <PopoverDropdown
                  key={filter.key}
                  options={filter.options}
                  defaultSelected={filter.options[0].value}
                  BtnClassName="border border-[#D5D5D5] rounded-[5px] px-2.5 py-1.5 text-[#4E4E4E] font-semibold"
                  onChange={(value) => handleFilterChange(filter.key, value)}
                  Iconfill="#000"
                />
              ))}
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
            </div>
          </div>

          {/*Report Cards & Academics Table */}
          <div className="shadow-md shadow-[#0000001A] rounded-[15px] mx-4 md:mx-6 pt-2 overflow-x-auto hide-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] text-nowrap">
                <tr>
                  {[
                    "Name",
                    "Generated On",
                    "Average Grade",
                    "Status",
                    "Actions",
                  ].map((col, index, arr) => (
                    <th
                      key={col}
                      className={`py-3 px-4 text-center font-bold bg-[#E6F7F0]
                      ${index === 0 ? "rounded-tl-[15px] text-start" : ""}
                      ${index === 1 ? "lg:px-8" : ""}
                      ${index === 2 ? "lg:px-8" : ""}
                      ${index === arr.length - 1 ? "rounded-tr-[15px] " : ""}
                    `}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((reportCard) => (
                    <TableRow
                      key={reportCard.reportCardId}
                      reportCard={reportCard}
                      studentMap={studentMap}
                      onViewReportCard={setSelectedReportCardId}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                    >
                      No Report Card found.
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
        </div>

        {/* Grading system table */}
        <div className="px-4 md:px-6 pb-6">
          <div className="border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-[13px] px-3 md:px-6 lg:px-8 py-4 md:py-6 ">
            <h2 className=" text-[#4E4E4E] text-[clamp(14px,1.8vw,20px)] font-bold mb-3">
              Grading System
            </h2>
            <div className="-mx-3 md:-mx-6 ml:-mx-14 lg:-mx-20 -my-3">
              <table className="w-full border-separate border-spacing-x-3 md:border-spacing-x-6 ml:border-spacing-x-14 lg:border-spacing-x-20 border-spacing-y-3">
                <thead className="sticky top-0 z-10 text-[clamp(14px,1.8vw,20px)] text-[#4E4E4E]">
                  <tr className="">
                    {[
                      "Grade",
                      "Minimum Score",
                      "Maximum Score",
                      "Remarks",
                      "GPA (5.0 Scale)",
                    ].map((col) => (
                      <th
                        key={col}
                        className={`py-3 px-2 md:px-4 text-center font-semibold bg-[#E6F7F0]
                    border-2 border-[#545454]`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {GRADING_SYSTEM.map((grade, index) => (
                    <tr
                      key={index}
                      className="text-[clamp(16px,1.9vw,20px)] text-[#4E4E4E] font-semibold "
                    >
                      <td className="py-4 px-2 md:px-4 text-center border-2 border-[#545454]">
                        {grade.grade}
                      </td>
                      <td className="py-4 px-2 md:px-4 text-center border-2 border-[#545454]">
                        {grade.minScore}
                      </td>
                      <td className="py-4 px-2 md:px-4 text-center border-2 border-[#545454]">
                        {grade.maxScore}
                      </td>
                      <td className="py-4 px-2 md:px-4 text-center border-2 border-[#545454]">
                        {grade.remark}
                      </td>
                      <td className="py-4 px-2 md:px-4 text-center border-2 border-[#545454]">
                        {grade.gpaScale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="px-4 md:px-6 pb-6">
          <PerformanceAnalytics analytics={school.performanceAnalytics} />
        </div>

        {/* Subjects */}
        <div className="px-4 md:px-6 pb-6">
          <div className="text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] font-medium border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-t-[13px] px-4 md:px-8 py-4 md:py-6">
            <h2 className="text-[clamp(18px,1.8vw,20px)] font-bold mb-3">
              Subjects
            </h2>
            <div className="flex flex-col gap-5 lg:gap-8">
              {school.subjects.map((section, index) => (
                <div
                  key={index}
                  className="border border-[#E9E9E9] shadow-sm rounded-[15px] p-5 space-y-3"
                >
                  <h3 className="font-bold italic text-[clamp(15px,1.6vw,18px)] text-[#0EB26B]">
                    {section.category}
                  </h3>

                  {/* Core Subjects */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-[#3D3D3F] text-[clamp(15px,1.6vw,18px)]">
                      Core Subjects{" "}
                      {section.category === "Pre-Nursery Section" && (
                        <span>
                          (Approved by the Nigerian Ministry of Education)
                        </span>
                      )}
                    </h4>

                    <ul className="grid grid-cols-2 ml:grid-cols-3 gap-2 gap-x-6 ml:gap-x-10 mt-2">
                      {section.coreSubjects.map((subject, i) => (
                        <li key={i}>{subject}</li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`grid ${section.NAPPSSchemeofWorkSubjects.length > 0 ? "grid-cols-[1fr_2fr] gap-5 ml:gap-10 " : ""}`}
                  >
                    {/* NAPPS */}
                    {section.NAPPSSchemeofWorkSubjects.length > 0 && (
                      <div className="mb-5">
                        <h4 className="font-semibold text-[#3D3D3F] text-[clamp(15px,1.6vw,18px)] ">
                          NAPPS Scheme of Work Subjects
                        </h4>
                        <ul className="space-y-2 mt-2">
                          {section.NAPPSSchemeofWorkSubjects.map(
                            (subject, i) => (
                              <li key={i}>{subject}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Optional */}
                    {section.optionalEnrichmentSubjects.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-[#3D3D3F] text-[clamp(15px,1.6vw,18px)]">
                          Optional Subjects
                        </h4>
                        <ul className="grid grid-cols-2 gap-2 gap-x-6 ml:gap-x-10 mt-2">
                          {section.optionalEnrichmentSubjects.map(
                            (subject, i) => (
                              <li key={i}>{subject}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FullScreenModal isOpen={selectedReportCardId !== null}>
        <ViewReportCard
          reportCardId={selectedReportCardId}
          onBack={() => setSelectedReportCardId(null)}
        />
      </FullScreenModal>
    </>
  );
};

export default ReportCardTab;

export const ViewReportCard = ({
  onBack,
  reportCardId,
}: {
  onBack: () => void;
  reportCardId: number | null;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center px-20 py-10">
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit hover:bg-transparent mr-auto"
        onClick={onBack}
      >
        <LeftIcon className="h-6 w-6" />
      </Button>
      <div className="flex-1 flex flex-col gap-10 ">
        <img
          src="/images/reportCard.png"
          alt={`Report card ${reportCardId}`}
          className="object-contain w-200 h-full"
        />
        <Button variant="default" size="lg" className="w-full">
          Download
        </Button>
      </div>
    </div>
  );
};
