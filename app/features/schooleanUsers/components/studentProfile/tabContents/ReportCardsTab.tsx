import { useState } from "react";
import {
  EMPTY_ATTENDANCE,
  EMPTY_REPORT_CARD,
  SESSION_OPTIONS,
  STUDENT_PROFILE_MOCK,
  TERM_OPTIONS,
} from "../components/mock";
import {
  getAttendance,
  getGrade,
  getOutcome,
  getPercentile,
  getReportSummary,
  ordinal,
  total,
} from "../components/helpers";
import {
  AttendanceSummaryIcon,
  LoginIcon,
  OpenBookIcon,
  PassMarkIcon,
  Star2Icon,
  Trophy2Icon,
} from "~/assets/Icons";
import SectionHeader from "../components/SectionHeader";
import SessionSelect from "~/components/SessionSelect";
import { Button } from "~/components/ui/button";
import FullScreenModal from "~/components/FullScreenModal";
import ViewReportCard from "~/components/ViewReportCard";

const TABLE_HEADERS = [
  { label: "Subject Name", width: "22%", center: false },
  { label: "Test (30)", width: "13%", center: true },
  { label: "Exam (70)", width: "13%", center: true },
  { label: "Total (100)", width: "13%", center: true },
  { label: "Grade", width: "13%", center: true },
  { label: "Remarks", width: "16%", center: true },
  { label: "Outcome", width: "10%", center: true },
];

const GRADE_COLORS: Record<string, string> = {
  A: "text-[#0EB26B]",
  B: "text-[#0EB26B]",
  C: "text-[#E79223]",
  D: "text-[#E79223]",
  F: "text-[#E81E1E]",
};

const ReportCardsTab = () => {
  const { school, attendance, reportCards } = STUDENT_PROFILE_MOCK;
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [session, setSession] = useState(school.session);
  const [term, setTerm] = useState(school.term);

  const { subjects, position, classSize } =
    reportCards[session]?.[term] ?? EMPTY_REPORT_CARD;
  const hasData = subjects.length > 0;

  const sessionAttendance = attendance[session] ?? EMPTY_ATTENDANCE;
  const termAttendance = getAttendance(sessionAttendance, term);

  const { obtained, max, average } = getReportSummary(subjects);
  const { grade, remarks } = getGrade(average);

  const summaryCards = [
    {
      label: "Cumulative Average",
      value: hasData ? `${average}%` : "—",
      subtext: hasData ? `Grade ${grade} (${remarks})` : "No results yet",
      valueColor: "text-[#0EB26B]",
      icon: <Star2Icon className="size-4 md:size-5" />,
    },
    {
      label: "Class Position",
      value: hasData ? `${ordinal(position)} / ${classSize}` : "—",
      subtext: hasData
        ? `Percentile: Top ${getPercentile(position, classSize)}%`
        : "—",
      valueColor: "text-[#313131]",
      icon: <Trophy2Icon className="size-4 md:size-5" />,
    },
    {
      label: "Total Score Obtained",
      value: hasData ? `${obtained} / ${max}` : "—",
      subtext: `Out of ${subjects.length} Subjects registered`,
      valueColor: "text-[#313131]",
      icon: <OpenBookIcon className="size-4 md:size-5" />,
    },
    {
      label: "Term Attendance",
      value: `${termAttendance.percentage}%`,
      subtext: `${termAttendance.daysPresent} of ${sessionAttendance.schoolDaysPerTerm} Days present`,
      valueColor: "text-[#313131]",
      icon: <div className="size-4 md:size-5 bg-[#0EB26B] rounded-sm" />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 mt-5">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-[#CACACA] p-6 rounded-[10px] flex items-center gap-5"
            >
              <div className="w-10 h-10 bg-[#0EB26B17] flex items-center justify-center rounded-sm shrink-0">
                {card.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#868686] text-[clamp(12px,1.2vw,14px)] font-medium">
                  {card.label}
                </span>
                <span
                  className={`font-semibold text-[clamp(18px,2vw,22px)] ${card.valueColor}`}
                >
                  {card.value}
                </span>
                <span className="text-[#868686] text-[clamp(10px,1vw,12px)]">
                  {card.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Report Card Table Section */}
        <div className="border border-[#CACACA] rounded-[10px] overflow-hidden bg-white">
          <SectionHeader
            icon={
              <AttendanceSummaryIcon
                className="size-5 ml:size-6"
                fill="#0EB26B"
              />
            }
            title="Report Card"
            children={
              <div className="flex items-center gap-4">
                <SessionSelect
                  options={SESSION_OPTIONS}
                  value={session}
                  onChange={setSession}
                  currentValue={school.session}
                />
                <SessionSelect
                  options={TERM_OPTIONS}
                  value={term}
                  onChange={setTerm}
                  currentValue={school.term}
                  currentLabel="Current Term"
                />
              </div>
            }
          />

          <div className="p-6">
            <div className="border border-[#CACACA] rounded-b-[10px] overflow-x-auto hide-scrollbar mb-6">
              <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
                <colgroup>
                  {TABLE_HEADERS.map((h) => (
                    <col key={h.label} style={{ width: h.width }} />
                  ))}
                </colgroup>
                <thead>
                  <tr className="border-b border-[#CACACA] bg-[#FAFAFA] ">
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h.label}
                        className={`py-4 px-6 text-[#313131] font-semibold text-[clamp(15px,1.5vw,17px)] ${
                          h.center ? "text-center" : ""
                        }`}
                      >
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CACACA]">
                  {!hasData && (
                    <tr>
                      <td
                        colSpan={TABLE_HEADERS.length}
                        className="py-10 text-center text-[#868686]"
                      >
                        No report card for {session}, {term}.
                      </td>
                    </tr>
                  )}
                  {subjects.map((item) => {
                    const score = total(item);
                    const { grade, remarks } = getGrade(score);
                    const passed = getOutcome(score) === "Pass";
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[#F9F9F9] text-[#4E4E4E] text-[clamp(13px,1.3vw,15px)]"
                      >
                        <td className="py-4 px-6 font-semibold">{item.name}</td>
                        <td className="py-4 px-6 text-center">{item.test}</td>
                        <td className="py-4 px-6 text-center">{item.exam}</td>
                        <td className="py-4 px-6  text-center">{score}</td>
                        <td
                          className={`py-4 px-6 text-center ${GRADE_COLORS[grade]}`}
                        >
                          {grade}
                        </td>
                        <td className="py-4 px-6 text-center">{remarks}</td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center">
                            {passed ? (
                              <PassMarkIcon className="size-4" />
                            ) : (
                              <span className="text-[#E81E1E] font-bold">
                                ✕
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white font-semibold flex items-center gap-2 px-5 rounded-[5px] h-fit py-2"
                onClick={() => setShowPdfModal(true)}
              >
                <LoginIcon className="size-4 rotate-90" fill="#fff" />
                <span> Download PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal isOpen={showPdfModal}>
        <ViewReportCard onBack={() => setShowPdfModal(false)} />
      </FullScreenModal>
    </>
  );
};

export default ReportCardsTab;
