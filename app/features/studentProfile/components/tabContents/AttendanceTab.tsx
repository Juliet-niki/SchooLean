import { studentProfileMock } from "../mock";
import { getAttendance } from "../helpers";

const TABLE_HEADERS = ["Term", "Days Present", "Days Absent", "Attendance"];

const AttendanceTab = () => {
  const { school, attendance } = studentProfileMock;

  // Summary is for the current term
  const summary = getAttendance(studentProfileMock, school.term);
  const percentage = `${summary.percentage}%`;

  const stats = [
    {
      label: "School Days",
      cardLabel: "School Days",
      value: attendance.schoolDaysPerTerm,
      dot: "bg-[#868686]",
    },
    {
      label: "Days Present",
      cardLabel: "Days Present",
      value: summary.daysPresent,
      dot: "bg-[#0EB26B]",
    },
    {
      label: "Days Absent",
      cardLabel: "Days Absent",
      value: summary.daysAbsent,
      dot: "bg-[#E81E1E]",
    },
    {
      label: "Attendance Percentage",
      cardLabel: "Attendance",
      value: percentage,
      dot: "bg-[#0EB26B]",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Attendance Summary */}
      <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden">
        <div className="bg-[#E4F4EC] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0EB26B]">
            {/* Replace with actual icon */}
            <div className="w-5 h-5 bg-[#0EB26B]" />
            <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
              Attendance Summary
            </h3>
          </div>
          <select className="bg-white border border-[#E4E4E4] rounded-md px-3 py-1.5 text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] outline-none">
            <option>Current Session</option>
            <option>Previous Session</option>
          </select>
        </div>
        <div className="bg-white p-8 flex flex-col md:flex-row items-center gap-10">
          {/* Circular Chart Placeholder */}
          <div className="w-40 h-40 rounded-full border-[15px] border-[#0EB26B] border-t-[#E4F4EC] flex flex-col items-center justify-center shrink-0">
            <span className="text-[#313131] font-bold text-[clamp(24px,2.5vw,32px)]">
              {percentage}
            </span>
            <span className="text-[#868686] text-[clamp(12px,1.2vw,14px)]">
              Present
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-6 w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-[#E4E4E4] pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${stat.dot}`} />
                  <span className="text-[#868686] font-medium text-[clamp(14px,1.4vw,16px)]">
                    {stat.label}
                  </span>
                </div>
                <span className="text-[#313131] font-semibold text-[clamp(14px,1.5vw,16px)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden">
        <div className="bg-[#E4F4EC] px-6 py-4 flex items-center gap-2 text-[#0EB26B]">
          <div className="w-5 h-5 bg-[#0EB26B]" />
          <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
            Attendance
          </h3>
        </div>
        <div className="bg-white p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#F9F9F9] rounded-lg p-6 border border-[#E4E4E4]">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-[#868686] font-medium text-[clamp(13px,1.4vw,15px)]">
                  {stat.cardLabel}
                </span>
                <span className="text-[#313131] font-bold text-[clamp(20px,2vw,24px)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <h4 className="text-[#0EB26B] font-semibold text-[clamp(14px,1.5vw,16px)] mt-8 mb-4">
            Attendance by Term
          </h4>
          <div className="border border-[#E4E4E4] rounded-lg overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[600px] text-left border-collapse table-fixed">
              <colgroup>
                {TABLE_HEADERS.map((h) => (
                  <col key={h} style={{ width: "25%" }} />
                ))}
              </colgroup>
              <thead>
                <tr className="bg-[#F9F9F9] border-b border-[#E4E4E4]">
                  {TABLE_HEADERS.map((h) => (
                    <th
                      key={h}
                      className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(14px,1.4vw,16px)]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4E4]">
                {attendance.byTerm.map((item) => {
                  const { percentage } = getAttendance(
                    studentProfileMock,
                    item.term,
                  );
                  return (
                    <tr key={item.term} className="bg-white">
                      {[
                        item.term,
                        item.daysPresent,
                        item.daysAbsent,
                        `${percentage}%`,
                      ].map((cell, i) => (
                        <td
                          key={i}
                          className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)]"
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
    </div>
  );
};

export default AttendanceTab;
