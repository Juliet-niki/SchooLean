import { LogIcon } from "~/assets/Icons";
import { STUDENT_PROFILE_MOCK } from "../components/mock";
import SectionHeader from "../components/SectionHeader";
import { formatDate, formatTime } from "~/utils/formatDate";

const COLUMNS = [
  { label: "Date & Time", width: "25%" },
  { label: "Action", width: "35%" },
  { label: "Performed By", width: "20%" },
  { label: "Source", width: "20%" },
];

const AuditLogTab = () => {
  const auditLogs = STUDENT_PROFILE_MOCK.auditLog;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[#4E4E4E]">
        <SectionHeader
          title="Audit Log"
          icon={<LogIcon className="size-5 ml:size-6" fill="#0EB26B" />}
        />

        <div className="p-4 md:p-6">
          {/* Mobile and tablet: one card per entry */}
          <ul className="lg:hidden flex flex-col gap-3">
            {auditLogs.map((item) => (
              <li
                key={item.id}
                className="border border-[#E4E4E4] rounded-[10px] p-4 flex flex-col gap-3"
              >
                <p className="font-semibold text-[clamp(14px,1.4vw,16px)] wrap-break-word">
                  {item.action}
                </p>

                <p className="text-[#868686] text-[clamp(12px,1.3vw,14px)]">
                  {formatDate(item.at)} · {formatTime(item.at)}
                </p>

                <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E4E4E4] text-[clamp(12px,1.3vw,14px)]">
                  <div className="min-w-0">
                    <dt className="text-[#868686]">Performed By</dt>
                    <dd className="font-semibold wrap-break-word">
                      {item.performedBy}
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[#868686]">Source</dt>
                    <dd className="font-semibold wrap-break-word">
                      {item.source}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          {/* Desktop: real table */}
          <div className="hidden lg:block border border-[#E4E4E4] rounded-[10px]">
            <table className="w-full text-left border-collapse table-fixed">
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
                      className="py-4 px-6 text-[#0EB26B] font-semibold text-[clamp(16px,1.6vw,18px)]"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F9F9F9] font-semibold text-[clamp(14px,1.5vw,16px)]"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span>{formatDate(item.at)}</span>
                        <span className="text-[#868686] font-medium text-[clamp(12px,1.4vw,14px)]">
                          {formatTime(item.at)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 wrap-break-word">{item.action}</td>
                    <td className="py-4 px-6">{item.performedBy}</td>
                    <td className="py-4 px-6">{item.source}</td>
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
