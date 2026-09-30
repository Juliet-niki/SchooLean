import { studentProfileMock } from "../mock";
import { formatDate, formatTime } from "../helpers";
import { GearIcon } from "~/assets/Icons";

const COLUMNS = [
  { label: "Date & Time", width: "25%" },
  { label: "Action", width: "35%" },
  { label: "Performed By", width: "20%" },
  { label: "Source", width: "20%" },
];

const AuditLogTab = () => {
  const auditLogs = studentProfileMock.auditLog;

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden bg-white">
        <div className="bg-[#E4F4EC] px-6 py-4 flex items-center gap-2 text-[#0EB26B]">
          <div className="w-5 h-5 flex items-center justify-center bg-[#0EB26B] rounded-sm text-white">
            <GearIcon className="w-3 h-3 fill-white stroke-white" />
          </div>
          <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
            Audit Log
          </h3>
        </div>

        <div className="p-6">
          <div className="border border-[#E4E4E4] rounded-[10px] overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
              <colgroup>
                {COLUMNS.map((c) => (
                  <col key={c.label} style={{ width: c.width }} />
                ))}
              </colgroup>
              <thead>
                <tr className="bg-[#F0FDF4] border-b border-[#E4E4E4]">
                  {COLUMNS.map((c) => (
                    <th
                      key={c.label}
                      className="py-4 px-6 text-[#0EB26B] font-bold text-[clamp(13px,1.4vw,15px)]"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4E4]">
                {auditLogs.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9F9F9]">
                    <td className="py-4 px-6 text-[#313131] font-bold text-[clamp(13px,1.4vw,15px)]">
                      <div className="flex items-center gap-2">
                        <span>{formatDate(item.at)}</span>
                        <span className="text-[#868686]">
                          {formatTime(item.at)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)]">
                      {item.action}
                    </td>
                    <td className="py-4 px-6 text-[#4E4E4E] font-bold text-[clamp(13px,1.4vw,15px)]">
                      {item.performedBy}
                    </td>
                    <td className="py-4 px-6 text-[#4E4E4E] font-bold text-[clamp(13px,1.4vw,15px)]">
                      {item.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogTab;