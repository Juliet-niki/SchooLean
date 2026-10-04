import { useState } from "react";
import { STUDENT_PROFILE_MOCK } from "../components/mock";
import {
  getReportSummary,
  getTopSubjects,
  ordinal,
} from "../components/helpers";
import {
  GraduationCap2Icon,
  CloseIcon,
  PositionIcon,
  PromotionBadgeIcon,
} from "~/assets/Icons";
import { DrawerDialog } from "~/components/DrawerDialog";
import { PieChartCard } from "~/components/recharts/PieChartCard";
import SectionHeader from "../components/SectionHeader";

const SUB_TABS = ["Current Subjects", "Previous Subjects"];

const TABLE_HEADERS = [
  { label: "Subject", width: "25%" },
  { label: "Teacher", width: "25%" },
  { label: "Class", width: "15%" },
  { label: "Session", width: "15%" },
  { label: "Term", width: "20%" },
];

const AcademicsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState(SUB_TABS[0]);

  const { subjects, position, classSize, promotionalStatus } =
    STUDENT_PROFILE_MOCK.academics;
  const { school } = STUDENT_PROFILE_MOCK;

  const { average } = getReportSummary(subjects);
  const topSubjects = getTopSubjects(subjects);

  return (
    <>
      <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[clamp(15px,1.6vw,18px)] text-[#4E4E4E] font-semibold ">
        <SectionHeader
          icon={
            <GraduationCap2Icon className="size-5 ml:size-6" fill="#0EB26B" />
          }
          title="Academics"
        />
        <div className="bg-white">
          <div className="flex items-center border-b border-[#E4E4E4] px-4 gap-4 ml:gap-6">
            {SUB_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-2.5 sm:px-4 md:px-6 py-4 text-[clamp(14px,1.4vw,16px)] ${
                  activeSubTab === tab
                    ? "text-[#0EB26B] border-b-2 border-[#0EB26B]"
                    : "text-[#4E4E4E]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeSubTab === "Current Subjects" && (
            <div className="p-6 space-y-4 ml:space-y-5">
              <div className="border border-[#D9D9D9] rounded-[10px] overflow-x-auto hide-scrollbar">
                <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
                  <colgroup>
                    {TABLE_HEADERS.map((h) => (
                      <col key={h.label} style={{ width: h.width }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr className="bg-[#0EB26B17] border-b border-[#CACACA]">
                      {TABLE_HEADERS.map((h) => (
                        <th
                          key={h.label}
                          className="py-4 px-6 text-[clamp(16px,1.6vw,18px)] font-semibold"
                        >
                          {h.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((item) => (
                      <tr
                        key={item.id}
                        className="text-[clamp(14px,1.4vw,16px)]"
                      >
                        <td className="py-4 px-6">{item.name}</td>
                        <td className="py-4 px-6 text-[#868686]">
                          {item.teacher}
                        </td>
                        <td className="py-4 px-6">{school.class}</td>
                        <td className="py-4 px-6 text-[#868686EE]">
                          {school.session}
                        </td>
                        <td className="py-4 px-6 text-[#868686EE]">
                          {school.term}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#0EB26B17] text-[#0EB26B] border border-[#CACACA] px-6 py-2 rounded-md text-[clamp(14px,1.4vw,16px)] cursor-pointer"
                >
                  View Academic Performance
                </button>
              </div>
            </div>
          )}

          {activeSubTab === "Previous Subjects" && (
            <div className="p-6 text-center text-[#868686]">
              Previous subjects data goes here.
            </div>
          )}
        </div>
      </div>
      <DrawerDialog
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        size="xl"
        title="Academic Performance"
        titleCSS="text-[#0EB26B] text-[clamp(14px,1.4vw,16px)]"
        contentCSS="px-6 pb-6 gap-1 h-[90vh] "
        headerClassName="border-none py-0 h-fit"
        closeIcon={<CloseIcon className="size-4" />}
        scrollAreaClassName="max-h-[85vh]"
      >
        <AcademicPerformanceModal
          average={average}
          position={position}
          classSize={classSize}
          promotionalStatus={promotionalStatus}
          topSubjects={topSubjects}
        />
      </DrawerDialog>
    </>
  );
};

export default AcademicsTab;

export const AcademicPerformanceModal = ({
  average,
  position,
  classSize,
  promotionalStatus,
  topSubjects,
}: {
  average: number;
  position: number;
  classSize: number;
  promotionalStatus: string;
  topSubjects: { name: string; score: number }[];
}) => {
  return (
    <div className="text-[#4E4E4E] font-semibold mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1.6fr] sm:border-b border-[#E4E4E4] mb-4 gap-y-6">
        <div className="flex flex-col items-center justify-center gap-1 sm:mb-4">
          <PieChartCard
            value={average}
            color="#0EB26B"
            trackColor="#E2C028"
            size={180}
            valueClass="text-[clamp(28px,2.7vw,36px)] text-[#4E4E4E]"
          />
          <p className="text-center text-[clamp(16px,1.6vw,18px)]">
            Overall Average
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start justify-center gap-6 w-full sm:border-l border-[#D9D9D9] sm:pl-12 text-[clamp(14px,1.4vw,16px)]">
          <div className="flex items-start gap-4 ml:gap-6">
            <div className="size-7 ml:size-10 rounded-full border border-[#D1D1D1] flex items-center justify-center bg-white">
              <PositionIcon className="size-4 ml:size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#868686]">Position / Ranking</span>
              <span className="text-[clamp(16px,1.6vw,18px)]">
                {ordinal(position)} of {classSize}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-4 ml:gap-6">
            <div className="size-7 ml:size-10 rounded-full border border-[#D1D1D1] flex items-center justify-center bg-[#0EB26B1A]">
              <PromotionBadgeIcon className="size-4 ml:size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#868686]">Promotional Status</span>
              <span className="bg-[#0EB26B17] text-[#0EB26B] border border-[#D1D1D1] px-4 ml:px-6 py-1 rounded-[10px] w-fit mt-1">
                {promotionalStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[clamp(16px,1.6vw,18px)] mb-6">
          Top Subjects (Average Score)
        </h3>
        <div className="flex flex-col gap-6">
          {topSubjects.map((sub) => (
            <div key={sub.name} className="flex items-center gap-4">
              <span className="text-[#868686] text-[clamp(13px,1.4vw,16px)] w-32 md:w-40 truncate">
                {sub.name}
              </span>
              <div className="flex-1 bg-[#0EB26B17] h-2 md:h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#0EB26B] h-full rounded-full"
                  style={{ width: `${sub.score}%` }}
                />
              </div>
              <span className="text-[clamp(13px,1.4vw,16px)]">
                {sub.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
