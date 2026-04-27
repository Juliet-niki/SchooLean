import { useMemo, useState } from "react";
import {
  FeesIcon,
  MoreIcon,
  PendingPaymentIcon,
  ReceiptIcon,
  TriangleAlertIcon,
} from "~/assets/icons";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type {
  IParent,
  IParentFeesPayment,
  ISchool,
  ISchoolFailedTransaction,
  ISchoolPaymentHistory,
} from "~/types";
import { formatDate } from "~/utils/formatDate";
import { CapitalizeFirstLetter } from "~/utils/formatText";

const ITEMS_PER_PAGE = 3;

const formatNaira = (amount: number) =>
  `₦ ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const paginate = <T,>(data: T[], page: number) => ({
  totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
  paginatedData: data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
});

//  ---- Table Header ----
const TableHead = ({ columns }: { columns: string[] }) => (
  <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-nowrap">
    <tr>
      {columns.map((col, index, arr) => (
        <th
          key={col}
          className={`py-3 px-4 text-center font-bold bg-[#E6F7F0]
            ${index === 0 ? "rounded-tl-[15px]" : ""}
            ${index > 0 && index < arr.length - 1 ? "border-x border-[#E4E4E4]" : ""}
            ${index === arr.length - 1 ? "rounded-tr-[15px]" : ""}
          `}
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

// ---- Row Components ----
const SchoolPaymentHistoryTableRow = ({
  payment,
}: {
  payment: ISchoolPaymentHistory;
}) => {
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-semibold border-b  border-[#EBEBEB]">
      <td className="py-3 px-4 text-center font-medium">
        {formatDate(payment.date)}
      </td>
      <td className="py-3 px-4 text-center border-l border-[#E4E4E4]">
        {payment.referenceId}
      </td>
      <td className="py-3 px-4 text-center border-x border-[#E4E4E4]">
        {formatNaira(payment.amount)}
      </td>
      <td className="py-3 px-4 border-r border-[#E4E4E4]">
        <div className="flex items-center justify-center">
          <StatusView
            styleOption={true}
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 px-3 rounded-[7px] w-fit text-center"
            status={payment.status === "COMPLETED" ? "Completed" : "Pending"}
            green="Completed"
            yellow="Pending"
          />
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <Button
          variant="secondary"
          size="sm"
          className="bg-[#A2A2A2] hover:bg-[#A2A2A2]/80 rounded-[7px] border border-[#B8B4B4] text-white text-[clamp(12px,1.4vw,16px)] px-3 ml:px-6"
        >
          <ReceiptIcon className="w-5 h-5" />
          Receipt
        </Button>
      </td>
    </tr>
  );
};
const SchoolFailedTransactionsTableRow = ({
  transaction,
}: {
  transaction: ISchoolFailedTransaction;
}) => {
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-semibold border-b  border-[#EBEBEB]">
      <td className="py-3 px-4 text-center font-medium">
        {formatDate(transaction.date)}
      </td>
      <td className="py-3 px-4 text-center border-l border-[#E4E4E4]">
        {transaction.referenceId}
      </td>
      <td className="py-3 px-4 text-center border-x border-[#E4E4E4]">
        {formatNaira(transaction.amount)}
      </td>
      <td className="py-3 px-4 border-r border-[#E4E4E4]">
        <div className="flex items-center justify-center ">
          <p className="border border-[#B8B4B4] bg-[#E2E2E2] px-3 py-1 rounded-[7px] font-medium w-fit">
            {transaction.receiptError}
          </p>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <Button
          variant="secondary"
          size="sm"
          className="bg-[#E2E2E2] hover:bg-[#E2E2E2]/80 rounded-[7px] border border-[#B8B4B4] text-[#4E4E4E] text-[clamp(12px,1.4vw,16px)] px-3 ml:px-6"
        >
          Retry Payment
        </Button>
      </td>
    </tr>
  );
};
const ParentFeesPaymentTableRow = ({
  payment,
  parentMap,
}: {
  payment: IParentFeesPayment;
  parentMap: Record<number, IParent>;
}) => {
  const parent = parentMap[payment.parentId];

  if (!parent) return null;

  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-semibold border-b  border-[#EBEBEB]">
      <td className="py-3 px-4 text-center font-medium">
        {formatDate(payment.date)}
      </td>
      <td className="py-3 px-4 text-center border-l border-[#E4E4E4]">
        {parent.name}
      </td>
      <td className="py-3 px-4 text-center border-x border-[#E4E4E4]">
        {formatNaira(payment.amount)}
      </td>
      <td className="py-3 px-4 border-r border-[#E4E4E4]">
        <div className="flex items-center justify-center">
          <StatusView
            styleOption={true}
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 px-3 rounded-[7px] w-fit text-center"
            status={
              payment.status === "COMPLETED"
                ? "Completed"
                : payment.status === "PENDING"
                  ? "Pending"
                  : "Failed"
            }
            green="Completed"
            yellow="Pending"
            red="Failed"
          />
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="cursor-pointer">
              <MoreIcon className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit py-1 px-1 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-12 text-[13px] font-medium"
            sideOffset={6}
          >
            <div className="flex flex-col gap-1 mb-2">
              {[
                { label: "View Transaction", onClick: () => {} },
                { label: "Sync with Paystack", onClick: () => {} },
                { label: "Generate Receipt", onClick: () => {} },
                {
                  label: "Fix Payment Status (with audit log)",
                  onClick: () => {},
                },
              ].map((option) => (
                <p
                  key={option.label}
                  className="cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lgtext-[#404040]"
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

const FeesPaymentTab = ({ school }: { school: ISchool }) => {
  const [schoolPaymentHistoryPage, setSchoolPaymentHistoryPage] = useState(1);
  const [schoolFailedTransactionPage, setSchoolFailedTransactionPage] =
    useState(1);
  const [parentFeesPaymentPage, setParentFeesPaymentPage] = useState(1);

  const parentMap = useMemo<Record<number, IParent>>(
    () => Object.fromEntries(school.parents.map((p) => [p.parentId, p])),
    [school.parents],
  );

  const schoolPaymentHistory = paginate(
    school.feesPayment.schoolPaymentHistory,
    schoolPaymentHistoryPage,
  );
  const schoolFailedTransactions = paginate(
    school.feesPayment.schoolFailedTransactions,
    schoolFailedTransactionPage,
  );
  const parentFeesPayment = paginate(
    school.feesPayment.parentFeesPayment,
    parentFeesPaymentPage,
  );

  const { subscription } = school.feesPayment;

  return (
    <div className="flex flex-col gap-6 ml:gap-10 text-[#4E4E4E]">
      {/* Subscription Table*/}
      <div className="flex flex-col gap-4">
        <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight px-4 ml:px-6">
          Fees & Payments{" "}
          <span className="font-medium">(School - Schoolean)</span>
        </h2>
        <div className="mx-4 ml:mx-6 shadow-md shadow-[#0000001A] rounded-t-[7px] rounded-b-[15px] overflow-x-auto hide-scrollbar">
          <table className="w-full border-collapse">
            <TableHead
              columns={["Plan", "Amount", "Billing Cycle", "Actions"]}
            />
            <tbody>
              <tr className="text-[clamp(12px,1.4vw,16px)] font-medium">
                <td className="py-3 px-4 text-center text-nowrap">
                  Schoolean {CapitalizeFirstLetter(subscription.planName)}
                </td>
                <td className="py-3 px-4 text-center border-x border-[#E4E4E4] text-nowrap">
                  <span className="font-semibold text-[clamp(14px,1.6vw,18px)]">
                    {formatNaira(subscription.amount)}
                  </span>{" "}
                  per {subscription.billingCycleDays} days
                </td>
                <td className="py-3 px-4 text-center border-r border-[#E4E4E4]">
                  <p className="text-nowrap">
                    {subscription.billingCycleStart} to{" "}
                    {subscription.billingCycleEnd}.
                  </p>
                  <p className="text-nowrap">
                    Grace Period = {subscription.gracePeriod}
                  </p>
                </td>

                <td className="py-3 px-4 text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="cursor-pointer">
                        <MoreIcon className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-fit py-1 px-1 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026] rounded-[5px] mr-12 text-[13px] font-medium"
                      sideOffset={6}
                    >
                      <div className="flex flex-col gap-1 mb-2">
                        {[
                          { label: "Extend Subscription", onClick: () => {} },
                          { label: "Change Plan", onClick: () => {} },
                          { label: "Generate Receipt", onClick: () => {} },
                          {
                            label: "Retry Failed Payment",
                            onClick: () => {},
                          },
                        ].map((option) => (
                          <p
                            key={option.label}
                            className={`cursor-pointer hover:bg-[#F7F7F7] py-2 px-2 rounded-lg ${
                              option.label === "Retry Failed Payment"
                                ? "text-[#DD3232]"
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History Table*/}
      <div className="flex flex-col gap-3">
        <h2 className="text-[clamp(15px,1.8vw,20px)] leading-tight px-4 ml:px-6">
          Payment History
        </h2>
        <div className="mx-4 ml:mx-6 shadow-md shadow-[#0000001A] rounded-t-[7px] rounded-b-[15px] space-y-5 pb-5">
          <div className="rounded-t-[7px] overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[700px] border-collapse table-fixed">
              <colgroup>
                <col style={{ width: "16%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <TableHead
                columns={[
                  "Date",
                  "Reference ID",
                  "Amount",
                  "Status",
                  "Receipt",
                ]}
              />

              <tbody>
                {schoolPaymentHistory.paginatedData.length > 0 ? (
                  schoolPaymentHistory.paginatedData.map((payment) => (
                    <SchoolPaymentHistoryTableRow
                      key={payment.paymentId}
                      payment={payment}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                    >
                      No payments history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <TablePagination
              currentPage={schoolPaymentHistoryPage}
              totalPages={schoolPaymentHistory.totalPages}
              onPageChange={setSchoolPaymentHistoryPage}
            />
          </div>
        </div>
      </div>

      {/* Failed Transaction Table*/}
      <div className="flex flex-col gap-3">
        <h2 className="text-[clamp(15px,1.8vw,20px)] leading-tight px-4 ml:px-6">
          Failed Transactions
        </h2>
        <div className="mx-4 ml:mx-6 shadow-md shadow-[#0000001A] rounded-t-[7px] rounded-b-[15px] space-y-5 pb-5">
          <div className="rounded-t-[7px] overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[800px] border-collapse table-fixed">
              <colgroup>
                <col style={{ width: "16%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <TableHead
                columns={[
                  "Date",
                  "Reference ID",
                  "Amount",
                  "Receipt",
                  "Action",
                ]}
              />

              <tbody>
                {schoolFailedTransactions.paginatedData.length > 0 ? (
                  schoolFailedTransactions.paginatedData.map((transaction) => (
                    <SchoolFailedTransactionsTableRow
                      key={transaction.transactionId}
                      transaction={transaction}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                    >
                      No failed transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <TablePagination
              currentPage={schoolFailedTransactionPage}
              totalPages={schoolFailedTransactions.totalPages}
              onPageChange={setSchoolFailedTransactionPage}
            />
          </div>
        </div>
      </div>

      {/* Parent fees & payments*/}
      <div className="mx-4 ml:mx-6 pt-4 ml:pt-6 px-4 ml:px-6 flex flex-col gap-8 border border-b-0 border-[#E9E9E9] shadow-sm shadow-[#0000001A] rounded-t-[7px]">
        <div className="flex flex-col gap-6">
          <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight">
            Fees & Payments{" "}
            <span className="font-medium">(Parents - School)</span>
          </h2>
          <div className="border border-[#E9E9E9] shadow-md shadow-[#0000001A] rounded-[13px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 py-4 px-4 md:px-8 ml:px-12 lg:px-16">
            {[
              {
                icon: (
                  <FeesIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                ),
                label: "Total Fees Collected",
                value: formatNaira(school.feesPayment.parentTotalFeesCollected),
                textColor: "#4E4E4E",
              },
              {
                icon: (
                  <PendingPaymentIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                ),
                label: "Pending Payments",
                value: formatNaira(school.feesPayment.parentPendingPayments),
                textColor: "#F7B801",
              },
              {
                icon: (
                  <TriangleAlertIcon
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    color="#E81E1E"
                  />
                ),
                label: "Failed Payments",
                value: formatNaira(school.feesPayment.parentFailedPayments),
                textColor: "#E81E1E",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-[#CFCFCF] rounded-[7px] px-2.5 ml:px-5 py-3.5 flex items-start gap-1.5 font-semibold"
              >
                {item.icon}
                <div>
                  <p className="text-[clamp(10px,1.6vw,18px)]">{item.label}</p>
                  <p
                    className="text-[clamp(14px,1.8vw,20px)] text-nowrap"
                    style={{ color: item.textColor }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[clamp(15px,1.8vw,20px)] font-bold leading-tight">
            Fees
          </h2>
          <div className="shadow-sm shadow-[#0000001A] rounded-t-[7px] space-y-5 pb-5">
            <div className="rounded-t-[7px] overflow-x-auto hide-scrollbar">
              <table className="w-full min-w-[700px] border-collapse table-fixed">
                <colgroup>
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "28%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "14%" }} />
                </colgroup>
                <TableHead
                  columns={["Date", "Parent", "Amount", "Status", "Actions"]}
                />

                <tbody>
                  {parentFeesPayment.paginatedData.length > 0 ? (
                    parentFeesPayment.paginatedData.map((payment) => (
                      <ParentFeesPaymentTableRow
                        key={payment.feeId}
                        payment={payment}
                        parentMap={parentMap}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]"
                      >
                        No payments history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <TablePagination
                currentPage={parentFeesPaymentPage}
                totalPages={parentFeesPayment.totalPages}
                onPageChange={setParentFeesPaymentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesPaymentTab;
