import { useState } from "react";
import { studentProfileMock } from "../mock";
import {
  total,
  getGrade,
  getOutcome,
  getReportSummary,
  getAttendance,
  getPercentile,
  ordinal,
} from "../helpers";
import { IdCardIcon, CheckMark2Icon } from "~/assets/Icons";
import FullScreenModal from "~/components/FullScreenModal";
import { Button } from "~/components/ui/button";

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
  F: "text-[#E81E1E]",
};

const ReportCardsTab = () => {
  const { school, attendance, academics } = studentProfileMock;
  const { subjects, position, classSize } = academics;
  const [showPdfModal, setShowPdfModal] = useState(false);

  const { obtained, max, average } = getReportSummary(studentProfileMock);
  const { grade, remarks } = getGrade(average);
  const term = getAttendance(studentProfileMock, school.term);

  const summaryCards = [
    {
      label: "Cumulative Average",
      value: `${average}%`,
      subtext: `Grade ${grade} (${remarks})`,
      valueColor: "text-[#0EB26B]",
      icon: <span className="text-[#0EB26B]">⭐</span>,
    },
    {
      label: "Class Position",
      value: `${ordinal(position)} / ${classSize}`,
      subtext: `Percentile: Top ${getPercentile(position, classSize)}%`,
      valueColor: "text-[#313131]",
      icon: <span className="text-[#0EB26B]">🏆</span>,
    },
    {
      label: "Total Score Obtained",
      value: `${obtained} / ${max}`,
      subtext: `Out of ${subjects.length} Subjects registered`,
      valueColor: "text-[#313131]",
      icon: <span className="text-[#0EB26B]">📖</span>,
    },
    {
      label: "Term Attendance",
      value: `${term.percentage}%`,
      subtext: `${term.daysPresent} of ${attendance.schoolDaysPerTerm} Days present`,
      valueColor: "text-[#313131]",
      icon: <div className="w-5 h-5 bg-[#0EB26B] rounded-sm" />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-[#E4E4E4] p-6 rounded-[10px] shadow-sm flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-[#E4F4EC] flex items-center justify-center rounded-sm shrink-0">
                {card.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#868686] text-[clamp(11px,1.2vw,13px)] font-medium">
                  {card.label}
                </span>
                <span
                  className={`font-bold text-[clamp(20px,2vw,24px)] ${card.valueColor}`}
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
        <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden bg-white">
          <div className="bg-[#E4F4EC] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#0EB26B]">
              <div className="w-5 h-5 flex items-center justify-center bg-[#0EB26B] rounded-sm">
                <IdCardIcon className="w-3 h-3 fill-white stroke-white" />
              </div>
              <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
                Report Card
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-white border border-[#E4E4E4] rounded-md px-4 py-2 text-[#4E4E4E] font-medium text-[clamp(13px,1.4vw,15px)] outline-none min-w-[150px]">
                <option>Current Session</option>
                <option>2025/2026</option>
              </select>
              <select className="bg-white border border-[#E4E4E4] rounded-md px-4 py-2 text-[#4E4E4E] font-medium text-[clamp(13px,1.4vw,15px)] outline-none min-w-[150px]">
                <option>Current Term</option>
                <option>Previous Term</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <div className="border border-[#E4E4E4] rounded-[10px] overflow-x-auto hide-scrollbar mb-6">
              <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
                <colgroup>
                  {TABLE_HEADERS.map((h) => (
                    <col key={h.label} style={{ width: h.width }} />
                  ))}
                </colgroup>
                <thead>
                  <tr className="border-b border-[#E4E4E4]">
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h.label}
                        className={`py-4 px-6 text-[#313131] font-bold text-[clamp(13px,1.4vw,15px)] ${
                          h.center ? "text-center" : ""
                        }`}
                      >
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E4E4]">
                  {subjects.map((item) => {
                    const score = total(item);
                    const { grade, remarks } = getGrade(score);
                    const passed = getOutcome(score) === "Pass";
                    return (
                      <tr key={item.id} className="hover:bg-[#F9F9F9]">
                        <td className="py-4 px-6 text-[#4E4E4E] font-bold text-[clamp(13px,1.4vw,15px)]">
                          {item.name}
                        </td>
                        <td className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)] text-center">
                          {item.test}
                        </td>
                        <td className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)] text-center">
                          {item.exam}
                        </td>
                        <td className="py-4 px-6 text-[#313131] font-bold text-[clamp(13px,1.4vw,15px)] text-center">
                          {score}
                        </td>
                        <td
                          className={`py-4 px-6 font-bold text-[clamp(13px,1.4vw,15px)] text-center ${GRADE_COLORS[grade]}`}
                        >
                          {grade}
                        </td>
                        <td className="py-4 px-6 text-[#868686] font-medium text-[clamp(13px,1.4vw,15px)] text-center">
                          {remarks}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center">
                            {passed ? (
                              <CheckMark2Icon className="w-4 h-4 stroke-[#0EB26B] fill-[#0EB26B]" />
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
                className="bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white font-semibold flex items-center gap-2 px-6 h-11 rounded-md"
                onClick={() => setShowPdfModal(true)}
              >
                <span>↓</span> Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal isOpen={showPdfModal}>
        <div className="bg-[#F0F0F0] min-h-screen w-full flex flex-col items-center py-10 px-4 relative">
          <div
            className="absolute top-6 left-6 cursor-pointer"
            onClick={() => setShowPdfModal(false)}
          >
            <span className="text-2xl text-[#313131]">{"<"}</span>
          </div>
          <div className="text-left w-full max-w-[800px] mb-4">
            <h2 className="text-[#313131] text-lg font-medium">
              Report Card Review
            </h2>
          </div>
          <div className="bg-white border-[3px] border-[#666666] w-full max-w-[800px] p-2 min-h-[900px] shadow-sm relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-[#CCCCCC] text-9xl font-bold select-none pointer-events-none transform -rotate-45">
              MOCK
            </div>
            {/* Mock PDF Content layout structure for aesthetics */}
            <div className="w-full h-full border border-gray-200">
              <div className="h-40 border-b border-gray-300 flex items-center justify-center p-4">
                <div className="text-center font-serif">
                  <h1 className="text-xl font-bold">
                    STEP TO SUCCESS DEMO SCHOOL
                  </h1>
                  <p className="text-xs">Motto: Excellence Personified</p>
                </div>
              </div>
              <div className="p-8">
                <div className="h-20 bg-gray-100 mb-6 flex items-center justify-center">
                  Student Info Area
                </div>
                <div className="flex gap-4 h-[600px]">
                  <div className="w-2/3 bg-gray-50 border border-gray-300 flex items-center justify-center">
                    Subjects Grid Area
                  </div>
                  <div className="w-1/3 flex flex-col gap-4">
                    <div className="h-1/2 bg-gray-50 border border-gray-300 flex items-center justify-center text-center p-2">
                      Affective Skills
                    </div>
                    <div className="h-1/2 bg-gray-50 border border-gray-300 flex items-center justify-center text-center p-2">
                      Psychomotor Skills
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button className="bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white font-semibold px-12 h-12 text-lg rounded-md shadow-md">
              Download
            </Button>
          </div>
        </div>
      </FullScreenModal>
    </>
  );
};

export default ReportCardsTab;
