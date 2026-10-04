import { useState } from "react";
import { AttendanceSummaryIcon, AttendanceIcon } from "~/assets/Icons";
import { PieChartCard } from "~/components/recharts/PieChartCard";
import SessionSelect from "~/components/SessionSelect";
import { getAttendance } from "../components/helpers";
import {
  STUDENT_PROFILE_MOCK,
  EMPTY_ATTENDANCE,
  SESSION_OPTIONS,
} from "../components/mock";
import SectionHeader from "../components/SectionHeader";

const TABLE_HEADERS = ["Term", "Days Present", "Days Absent", "Attendance"];

const AttendanceTab = () => {
  const { school, attendance } = STUDENT_PROFILE_MOCK;
  const [session, setSession] = useState(school.session);

  const sessionAttendance = attendance[session] ?? EMPTY_ATTENDANCE;

  // Summary is for the current term (last term for sessions without it)
  const summary = getAttendance(sessionAttendance, school.term);
  const percentage = `${summary.percentage}%`;

  const stats = [
    {
      label: "School Days",
      value: sessionAttendance.schoolDaysPerTerm,
      dot: "bg-[#087E4B]",
    },
    { label: "Days Present", value: summary.daysPresent, dot: "bg-[#0EB26B]" },
    { label: "Days Absent", value: summary.daysAbsent, dot: "bg-[#E81E1E]" },
    {
      label: "Attendance",
      fullLabel: "Attendance Percentage",
      value: percentage,
      dot: "bg-[#0C965A]",
    },
  ];

  return (
    <>
      {/* Attendance Summary */}
      <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[#4E4E4E] font-semibold">
        <SectionHeader
          icon={
            <AttendanceSummaryIcon
              className="size-5 ml:size-6"
              fill="#0EB26B"
            />
          }
          title="Attendance Summary"
          children={
            <SessionSelect
              options={SESSION_OPTIONS}
              value={session}
              onChange={setSession}
              currentValue={school.session}
            />
          }
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full sm:w-[80%] mx-auto py-5 sm:py-7 px-4">
          <div className="flex items-center justify-center md:justify-start">
            <PieChartCard
              value={summary.percentage}
              color="#0EB26B"
              trackColor="#0EB26B21"
              size={180}
              valueClass="text-[clamp(28px,2.7vw,36px)] text-[#4E4E4E]"
              isText={true}
              text="Present"
            />
          </div>

          <div className="w-full flex flex-col gap-4 ml:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="grid grid-cols-[2fr_0.5fr]">
                <div className="flex items-center gap-5">
                  <div className={`size-3 rounded-full shrink-0 ${stat.dot}`} />
                  <span className="text-[#868686] text-[clamp(14px,1.4vw,16px)]">
                    {stat.fullLabel ?? stat.label}
                  </span>
                </div>
                <span className="text-[clamp(18px,1.8vw,20px)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance */}
      <div className="bg-white border border-[#CACACA] rounded-[5px] overflow-hidden mt-4 md:mt-7">
        <SectionHeader
          icon={
            <AttendanceIcon className="size-5 ml:size-6" stroke="#0EB26B" />
          }
          title="Attendance"
        />

        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0EB26B0D] rounded-[5px] px-5 md:px-7 py-2 md:py-4 border border-[#CACACA]">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-4">
                <span className="text-[#868686] text-[clamp(16px,1.6vw,18px)]">
                  {stat.label}
                </span>
                <span className="font-bold text-[clamp(22px,2.2vw,28px)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <h4 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.6vw,18px)] mt-8 mb-3">
            Attendance by Term
          </h4>
          <div className="border border-[#CACACA] rounded-[5px] overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[600px] text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-[#0EB26B17] border-b border-[#CACACA]">
                  {TABLE_HEADERS.map((h) => (
                    <th
                      key={h}
                      className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(16px,1.6vw,18px)]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessionAttendance.byTerm.map((item) => {
                  const { percentage } = getAttendance(
                    sessionAttendance,
                    item.term,
                  );
                  return (
                    <tr key={item.term}>
                      {[
                        item.term,
                        item.daysPresent,
                        item.daysAbsent,
                        `${percentage}%`,
                      ].map((cell, i) => (
                        <td
                          key={i}
                          className="py-5 px-6 text-[#4E4E4E] font-semibold text-[clamp(14px,1.4vw,16px)]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceTab;
