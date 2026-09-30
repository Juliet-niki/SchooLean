import { useState } from "react";
import {
  LeftIcon,
  Location2Icon,
  CreditCard2Icon,
  BankIcon,
  ReceiptIcon,
} from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import TablePagination from "~/components/TablePagination";
import { Button } from "~/components/ui/button";
import type { IParent, ISchool, ITransaction } from "~/types";
import { formatDateTime } from "~/utils/formatDate";
import { formatDisplayText } from "~/utils/formatText";

const ParentPaymentHistory = ({
  parent,
  onBack,
  school,
}: {
  parent: IParent | null;
  onBack: () => void;
  school: ISchool;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!parent) return null;

  const children = parent.linkedChildren
    .map((linked) => {
      const student = school.students.find(
        (s) => s.studentId === linked.studentId,
      );
      if (!student) return null;

      return {
        studentId: student.studentId,
        name: student.name,
        class:
          student.education.currentClass +
          " " +
          student.education.currentClassArm,
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const itemsPerPage = 7;

  const totalPages = Math.ceil(parent.paymentHistory.length / itemsPerPage);

  const paginatedData = parent.paymentHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-6 py-10 w-full text-[#4E4E4E]">
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit hover:bg-transparent"
        onClick={onBack}
      >
        <LeftIcon className="h-6 w-6" />
      </Button>

      {/* Main Content Layout */}
      <div className="flex flex-col gap-6 md:gap-9">
        {/* Profile Card */}
        <div className="bg-white rounded-[20px] px-4 md:px-7 py-8 md:py-12 flex gap-5 md:gap-7 lg:gap-10 items-start shadow-md shadow-[#0000001A] border border-[#E4E4E4]">
          <div className="shrink-0">
            {parent.profilePic ? (
              <img
                src={parent.profilePic}
                alt={parent.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#D9D9D9]" />
            )}
          </div>
          <div className="grid grid-cols-1 ml:grid-cols-2 gap-6 mlgap-4 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4 md:gap-x-7 lg:justify-start">
                <h2 className="text-[clamp(20px,2.5vw,22px)] font-semibold">
                  {parent.name}
                </h2>
                <StatusView
                  variant="solid"
                  styleOption={true}
                  status={parent.status === "ACTIVE" ? "Active" : "Inactive"}
                  green="Active"
                  red="Inactive"
                  classStyleName="text-[clamp(13px,1.3vw,15px)] py-[2px] px-3 rounded-[7px] w-fit text-center text-white"
                />
              </div>
              <p className="font-semibold text-[clamp(14px,1.4vw,16px)]">
                Parent of {children.length} student
                {children.length === 1 ? "" : "s"}
              </p>
              <div className="flex items-start gap-3">
                <Location2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{parent.address || "N/A"}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-[#D9D9D9] ml:border-l ml:pl-10">
              <div className="bg-[#0EB26B21] w-fit text-[#0EB26B] px-4 md:px-6 py-2 rounded-[10px]">
                <span className="text-[clamp(15px,1.5vw,17px)] font-semibold">
                  Linked Children
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[clamp(14px,1.4vw,16px)] font-semibold">
                {children.map((child) => (
                  <div key={child.studentId} className="flex flex-col gap-2">
                    <span>{child.name}</span>
                    <span>{child.class}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="space-y-3">
          <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
            Payment History
          </h3>
          <div className="">
            <div className="shadow-md shadow-[#0000001A] rounded-[15px] overflow-x-auto hide-scrollbar">
              <table className="w-full min-w-[1100px] border-collapse table-fixed ">
                <colgroup>
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "11%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                </colgroup>
                <thead className="sticky top-0 z-10 text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] text-nowrap">
                  <tr>
                    {[
                      "Date",
                      "Transaction ID",
                      "Student",
                      "Description",
                      "Amount",
                      "Payment Method",
                      "Status",
                      "Receipt",
                    ].map((col, index, arr) => (
                      <th
                        key={col}
                        className={`py-4 px-5 font-semibold bg-[#E6F7F0] 
                    ${index === 0 && "rounded-tl-[15px]"}
                    ${index === arr.length - 1 ? "rounded-tr-[15px] text-center" : "text-start"}
                  `}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((transaction) => {
                      const child = children.find(
                        (child) =>
                          child.studentId ===
                          transaction.linkedStudent.studentId,
                      );

                      return (
                        <TableRow
                          key={transaction.transactionId}
                          transaction={transaction}
                          child={child}
                        />
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-10 text-center text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)]  bg-white"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pt-7">
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({
  transaction,
  child,
}: {
  transaction: ITransaction;
  child?: {
    name: string;
  };
}) => {
  const PAYMENT_METHOD_ICON_MAP: Record<string, React.ReactNode> = {
    DEBIT_CARD: <CreditCard2Icon className="size-5" />,
    BANK_TRANSFER: <BankIcon className="size-5" />,
  };
  return (
    <tr className="text-[clamp(12px,1.4vw,16px)] text-[#4E4E4E] font-medium border-b border-[#EBEBEB] bg-white">
      <td className="py-5 px-5">{formatDateTime(transaction.date)}</td>
      <td className="py-5 px-5">{transaction.transactionId}</td>
      <td className="py-5 px-5">{child?.name || "N/A"}</td>
      <td className="py-5 px-5">{transaction.description}</td>
      <td className="py-5 px-5">{`₦ ${transaction.amount.toLocaleString()}`}</td>
      <td className="py-5 px-5">
        <div className="flex items-center gap-3">
          {PAYMENT_METHOD_ICON_MAP[transaction.paymentMethod] ?? null}
          {formatDisplayText(transaction.paymentMethod)}
        </div>
      </td>
      <td className="py-5 px-5">
        <StatusView
          variant="soft"
          styleOption={true}
          status={
            transaction.status === "PAID"
              ? "Paid"
              : transaction.status === "PENDING"
                ? "Pending"
                : "Failed"
          }
          green="Paid"
          red="Failed"
          yellow="Pending"
        />
      </td>
      <td className="py-5 px-5">
        <span className="flex items-center justify-center">
          <ReceiptIcon className="size-5" fill="#145FC4" />
        </span>
      </td>
    </tr>
  );
};

export default ParentPaymentHistory;
