import { useState } from "react";
import { studentProfileMock } from "../mock";
import { formatDate, formatTime, formatNaira, getFeeSummary } from "../helpers";
import StatusView from "~/components/StatusView";

const SUB_TABS = ["Payment History", "Fee Breakdown"];

const TABLE_HEADERS = [
  { label: "Date & Time", width: "20%" },
  { label: "Purpose", width: "20%" },
  { label: "Amount", width: "15%" },
  { label: "Status", width: "15%" },
  { label: "Reference", width: "15%" },
  { label: "Method", width: "15%" },
];

const FeesPaymentsTab = () => {
  const { totalCharged, payments } = studentProfileMock.fees;
  const { paid, outstanding, count } = getFeeSummary(studentProfileMock);
  const [activeSubTab, setActiveSubTab] = useState(SUB_TABS[0]);

  // Full class strings are kept as literals so Tailwind can detect them
  const summaryCards = [
    {
      label: "Total Fees Charged",
      value: formatNaira(totalCharged, true),
      box: "bg-[#E4F4EC] border-[#0EB26B33]",
      text: "text-[#0EB26B]",
    },
    {
      label: "Total Paid",
      value: formatNaira(paid, true),
      box: "bg-[#EAF3FA] border-[#2392E733]",
      text: "text-[#2392E7]",
    },
    {
      label: "Outstanding Balance",
      value: formatNaira(outstanding, true),
      box: "bg-[#FCEAE8] border-[#E81E1E33]",
      text: "text-[#E81E1E]",
    },
    {
      label: "Number of Payments",
      value: count,
      box: "bg-[#F6E8FC] border-[#A523E733]",
      text: "text-[#A523E7]",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden">
        <div className="bg-[#E4F4EC] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0EB26B]">
            <div className="w-5 h-5 bg-[#0EB26B]" />
            <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
              Fees
            </h3>
          </div>
          <select className="bg-white border border-[#E4E4E4] rounded-md px-3 py-1.5 text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] outline-none">
            <option>Current Session</option>
            <option>Previous Session</option>
          </select>
        </div>
        <div className="bg-white">
          <div className="flex items-center border-b border-[#E4E4E4]">
            {SUB_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-6 py-4 font-semibold text-[clamp(14px,1.5vw,16px)] ${
                  activeSubTab === tab
                    ? "text-[#0EB26B] border-b-2 border-[#0EB26B]"
                    : "text-[#868686]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeSubTab === "Payment History" && (
            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className={`border rounded-[10px] p-4 flex flex-col gap-1 ${card.box}`}
                  >
                    <span
                      className={`font-semibold text-[clamp(12px,1.3vw,14px)] ${card.text}`}
                    >
                      {card.label}
                    </span>
                    <span
                      className={`font-bold text-[clamp(18px,2vw,22px)] ${card.text}`}
                    >
                      {card.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border border-[#E4E4E4] rounded-[10px] overflow-x-auto hide-scrollbar">
                <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
                  <colgroup>
                    {TABLE_HEADERS.map((h) => (
                      <col key={h.label} style={{ width: h.width }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr className="bg-[#F9F9F9] border-b border-[#E4E4E4]">
                      {TABLE_HEADERS.map((h) => (
                        <th
                          key={h.label}
                          className="py-4 px-6 text-[#868686] font-semibold text-[clamp(14px,1.4vw,16px)]"
                        >
                          {h.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E4]">
                    {payments.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)]">
                          {formatDate(item.paidAt)}
                          <br />
                          <span className="text-[clamp(11px,1.2vw,13px)] text-[#868686]">
                            {formatTime(item.paidAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#868686] font-semibold text-[clamp(13px,1.4vw,15px)]">
                          {item.purpose}
                        </td>
                        <td className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)]">
                          {formatNaira(item.amount)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusView
                            variant="soft"
                            styleOption={true}
                            status={item.status}
                            green="Successful"
                            classStyleName="text-[clamp(12px,1.3vw,14px)] py-1 px-3 rounded-full"
                          />
                        </td>
                        <td className="py-4 px-6 text-[#868686] font-semibold text-[clamp(13px,1.4vw,15px)]">
                          {item.reference}
                        </td>
                        <td className="py-4 px-6 text-[#4E4E4E] font-semibold text-[clamp(13px,1.4vw,15px)]">
                          {item.method}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 flex justify-end">
                  <button className="bg-[#E4F4EC] text-[#0EB26B] px-6 py-2 rounded-md font-semibold text-[clamp(13px,1.4vw,15px)]">
                    View All Payments
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "Fee Breakdown" && (
            <div className="p-6 text-center text-[#868686]">
              Fee breakdown data goes here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeesPaymentsTab;
