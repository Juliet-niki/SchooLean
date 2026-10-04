import { useState } from "react";
import { AtmCardIcon } from "~/assets/Icons";
import SessionSelect from "~/components/SessionSelect";
import StatusView from "~/components/StatusView";
import { formatDate, formatTime } from "~/utils/formatDate";
import { getFeeSummary, formatNaira } from "../components/helpers";
import { STUDENT_PROFILE_MOCK, SESSION_OPTIONS } from "../components/mock";
import SectionHeader from "../components/SectionHeader";

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
  const [activeSubTab, setActiveSubTab] = useState(SUB_TABS[0]);
  const { school, fees } = STUDENT_PROFILE_MOCK;
  const [session, setSession] = useState(school.session);

  // Sessions with no data yet fall back to empty
  const { totalCharged, payments } = fees[session] ?? {
    totalCharged: 0,
    payments: [],
  };
  const { paid, outstanding, count } = getFeeSummary({
    totalCharged,
    payments,
  });

  // Full class strings are kept as literals so Tailwind can detect them
  const summaryCards = [
    {
      label: "Total Fees Charged",
      value: formatNaira(totalCharged, true),
      box: "bg-[#0EB26B17]",
      text: "text-[#0EB26B]",
    },
    {
      label: "Total Paid",
      value: formatNaira(paid, true),
      box: "bg-[#145FC417]",
      text: "text-[#145FC4]",
    },
    {
      label: "Outstanding Balance",
      value: formatNaira(outstanding, true),
      box: "bg-[#E81E1E17]",
      text: "text-[#E81E1E]",
    },
    {
      label: "Number of Payments",
      value: count,
      box: "bg-[#B91EC717]",
      text: "text-[#B91EC7]",
    },
  ];

  return (
    <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[clamp(15px,1.6vw,18px)] text-[#4E4E4E] font-semibold ">
      <SectionHeader
        icon={<AtmCardIcon className="size-5 ml:size-6" fill="#0EB26B" />}
        title="Fees"
        children={
          <SessionSelect
            options={SESSION_OPTIONS}
            value={session}
            onChange={setSession}
            currentValue={school.session}
          />
        }
      />
      <div className="bg-white">
        <div className="flex items-center border-b border-[#E4E4E4] px-4 gap-4 ml:gap-6">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-2.5 sm:px-4 md:px-6 py-4 font-semibold text-[clamp(14px,1.4vw,16px)] ${
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
          <div className="p-6 space-y-4 ml:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className={`border border-[#CACACA] rounded-[12px] py-2 px-6 flex flex-col gap-1 ${card.box}`}
                >
                  <span
                    className={`font-semibold text-[clamp(14px,1.4vw,16px)] ${card.text}`}
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

            <div className="">
              {/* Mobile and tablet: one card per payment */}
              <ul className="lg:hidden flex flex-col gap-3">
                {payments.map((item) => (
                  <li
                    key={item.id}
                    className="border border-[#D9D9D9] rounded-[10px] p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-[clamp(14px,1.4vw,16px)] break-words">
                          {item.purpose}
                        </p>
                        <p className="text-[#868686] text-[clamp(12px,1.3vw,14px)]">
                          {formatDate(item.paidAt)} · {formatTime(item.paidAt)}
                        </p>
                      </div>
                      <p className="font-semibold text-[clamp(14px,1.4vw,16px)] shrink-0">
                        {formatNaira(item.amount)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E4E4E4]">
                      <StatusView
                        variant="soft"
                        styleOption={true}
                        status={item.status}
                        green="Successful"
                        classStyleName="text-[clamp(12px,1.3vw,15px)] font-semibold py-1 px-3 rounded-[15px]"
                      />
                      <dl className="grid grid-cols-2 gap-4 text-[clamp(12px,1.3vw,14px)] text-right">
                        <div className="min-w-0">
                          <dt className="text-[#868686]">Reference</dt>
                          <dd className="font-semibold break-words">
                            {item.reference}
                          </dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-[#868686]">Method</dt>
                          <dd className="font-semibold break-words">
                            {item.method}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Desktop: real table */}
              <div className="hidden lg:block border border-[#D9D9D9] rounded-[10px] overflow-x-auto hide-scrollbar">
                <table className="w-full text-left border-collapse table-fixed">
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
                    {payments.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#F9F9F9] text-[clamp(14px,1.4vw,16px)]"
                      >
                        <td className="py-4 px-6">
                          {formatDate(item.paidAt)}
                          <br />
                          <span className="text-[#868686]">
                            {formatTime(item.paidAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#868686]">
                          {item.purpose}
                        </td>
                        <td className="py-4 px-6">
                          {formatNaira(item.amount)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusView
                            variant="soft"
                            styleOption={true}
                            status={item.status}
                            green="Successful"
                            classStyleName="text-[clamp(12px,1.3vw,15px)] font-semibold py-1 px-3 rounded-[15px]"
                          />
                        </td>
                        <td className="py-4 px-6 text-[#868686]">
                          {item.reference}
                        </td>
                        <td className="py-4 px-6">{item.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {}}
                className="bg-[#0EB26B17] text-[#0EB26B] border border-[#CACACA] px-6 py-2 rounded-md text-[clamp(14px,1.4vw,16px)] cursor-pointer"
              >
                View All Payments
              </button>
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
  );
};

export default FeesPaymentsTab;
