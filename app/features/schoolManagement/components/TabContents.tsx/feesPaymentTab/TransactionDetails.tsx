import { useState } from "react";
import {
  BankIcon,
  CheckMarkIcon,
  CloseIcon,
  CreditCard2Icon,
  DownloadIcon,
  LeftIcon,
  Location2Icon,
} from "~/assets/Icons";
import FullScreenModal from "~/components/FullScreenModal";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { IParent, IParentFeesPayment, ISchool } from "~/types";
import { formatDate, formatDateTime, formatTime } from "~/utils/formatDate";
import { formatDisplayText } from "~/utils/formatText";

const formatNaira = (amount: number) =>
  `₦ ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const STATUS_LABEL: Record<
  IParentFeesPayment["status"],
  "Successful" | "Pending" | "Failed"
> = {
  COMPLETED: "Successful",
  PENDING: "Pending",
  FAILED: "Failed",
};

const PAYMENT_METHOD_ICON_MAP: Record<string, React.ReactNode> = {
  CARD: <CreditCard2Icon className="size-5" />,
  BANK_TRANSFER: <BankIcon className="size-5" />,
};

const TransactionDetails = ({
  payment,
  parent,
  school,
  onBack,
}: {
  payment: IParentFeesPayment | null;
  parent: IParent | null;
  school: ISchool;
  onBack: () => void;
}) => {
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  if (!payment || !parent) return null;

  const student = school.students.find(
    (s) => s.studentId === payment.studentId,
  );

  const children = parent.linkedChildren
    .map((linked) => {
      const s = school.students.find((st) => st.studentId === linked.studentId);
      if (!s) return null;
      return {
        studentId: s.studentId,
        name: s.name,
        class: s.education.currentClass,
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const statusLabel = STATUS_LABEL[payment.status];

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-6 py-10 w-full text-[#4E4E4E]">
        <div className="flex flex-col font-semibold">
          <Button
            variant="ghost"
            size="icon"
            className="h-fit w-fit hover:bg-transparent -ml-2 mb-2"
            onClick={onBack}
          >
            <LeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-[clamp(24px,2.8vw,32px)]">View Transaction</h1>
          <p className="text-[clamp(16px,1.6vw,18px)] text-[#868686]">
            Transaction details and payment status from Flutterwave
          </p>
        </div>

        {/* Parent + Linked Students */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] px-7 md:px-12 py-8 md:py-10 grid grid-cols-1 ml:grid-cols-[1fr_1px_1fr] gap-6">
          <div className="flex items-center gap-4">
            {parent.profilePic ? (
              <img
                src={parent.profilePic}
                alt={parent.name}
                className="size-20 lg:size-32 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="size-20 lg:size-32 rounded-full bg-[#D9D9D9] shrink-0" />
            )}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[clamp(16px,1.7vw,18px)]">
                  {parent.name}
                </span>
                <StatusView
                  variant="solid"
                  styleOption={true}
                  status={parent.status === "ACTIVE" ? "Active" : "Inactive"}
                  green="Active"
                  red="Inactive"
                  classStyleName="text-[clamp(12px,1.2vw,14px)] py-[2px] px-3 rounded-[9px] w-fit text-center text-white"
                />
              </div>
              <p className="font-semibold text-[clamp(13px,1.3vw,15px)]">
                Parent of {children.length} student
                {children.length === 1 ? "" : "s"}
              </p>
              <div className="flex items-start gap-2 text-[clamp(13px,1.3vw,15px)]">
                <Location2Icon
                  className="w-4 h-4 shrink-0 mt-0.5"
                  fill="#4E4E4E"
                />
                <span>{parent.address || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="hidden ml:block w-px bg-[#E4E4E4]" />

          <div className="flex flex-col gap-3">
            <div className="bg-[#0EB26B1A] text-[#0EB26B] w-fit px-4 py-1.5 rounded-[8px] font-semibold text-[clamp(13px,1.3vw,15px)]">
              Linked Students
            </div>
            <div className="grid grid-cols-2 gap-4 font-semibold text-[clamp(13px,1.3vw,15px)]">
              {children.map((child) => (
                <div key={child.studentId} className="flex flex-col gap-1">
                  <span>{child.name}</span>
                  <span className="text-[#868686] font-medium">
                    {child.class}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Details + Timeline/Flutterwave Details */}
        <div className="grid grid-cols-1 ml:grid-cols-2 grid-rows-1 ml:grid-rows-2 gap-4 items-stretch">
          {/* Payment Details */}
          <div className="row-span-2 bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] overflow-hidden">
            <div className="bg-[#0EB26B0D] px-6 py-5 flex items-start justify-between gap-4">
              <div className="flex flex-col gap-4">
                <StatusView
                  variant="solid"
                  styleOption={true}
                  status={statusLabel}
                  green="Successful"
                  red="Failed"
                  yellow="Pending"
                  classStyleName="text-[clamp(12px,1.2vw,14px)] py-1.5 px-6 rounded-[12px] w-fit text-center text-white"
                />

                <div>
                  <p className="text-[clamp(28px,3vw,34px)] font-semibold">
                    {formatNaira(payment.amount)}
                  </p>
                  <p className="text-[#868686] text-[clamp(13px,1.3vw,15px)]">
                    Payment Amount
                  </p>
                </div>
              </div>
              <img
                src="/images/flutterwaveLogo.png"
                alt="flutterwave"
                className="w-[120px] md:w-[180px] lg:w-[220px] h-12 object-contain "
              />
            </div>

            <div className="p-6 flex flex-col gap-5 lg:gap-7">
              {[
                {
                  label: "Transaction Reference",
                  value: payment.flutterwaveReference,
                },
                {
                  label: "Payment Method",
                  value: (
                    <div className="flex items-center gap-3 sm:justify-self-end">
                      {PAYMENT_METHOD_ICON_MAP[payment.paymentMethod]}
                      <span>
                        {formatDisplayText(payment.paymentMethod)} (
                        {payment.cardDetails})
                      </span>
                    </div>
                  ),
                },
                {
                  label: "Transaction Type",
                  value: payment.transactionType,
                },
                {
                  label: "Payment Status",
                  value: (
                    <div className="sm:justify-self-end">
                      <StatusView
                        variant="soft"
                        styleOption={true}
                        status={statusLabel}
                        green="Successful"
                        red="Failed"
                        yellow="Pending"
                      />
                    </div>
                  ),
                },
                {
                  label: "Transaction Date",
                  value: (
                    <p className="space-x-2">
                      <span> {formatDate(payment.date)} </span>
                      <span> {formatTime(payment.date)} </span>
                    </p>
                  ),
                },
                {
                  label: "Paid By",
                  value: `${parent.name} (parent)`,
                },
                {
                  label: "Student",
                  value: student ? (
                    <div className="flex items-center gap-2 sm:justify-self-end">
                      {student.profilePic ? (
                        <img
                          src={student.profilePic}
                          alt={student.name}
                          className="size-7 lg:size-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="size-7 lg:size-10 rounded-full bg-[#D9D9D9]" />
                      )}
                      <span>{student.name}</span>
                    </div>
                  ) : (
                    "N/A"
                  ),
                },
                {
                  label: "Fee Category",
                  value: payment.feeCategory,
                },
                {
                  label: "Academic Session",
                  value: payment.academicSession,
                },
                {
                  label: "Description",
                  value: payment.description,
                },
              ].map((item) => (
                <InfoRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  labelClassName="text-[clamp(12px,1.4vw,16px)]"
                  valueClassName="sm:text-right text-[clamp(14px,1.6vw,18px)]"
                />
              ))}
            </div>
          </div>
          {/* Transaction Timeline */}
          <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] overflow-hidden">
            <div className="bg-[#0EB26B1A] px-6 py-[18px]">
              <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                Transaction Timeline
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {payment.timeline.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckMarkIcon className="size-4 md:size-5" fill="#0EB26B" />
                  <div className="flex-1 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[clamp(12px,1.4vw,16px)]">
                        {step.label}
                      </p>
                      <p className="text-[#868686] text-[clamp(10px,1.2vw,14px)]">
                        {step.description}
                      </p>
                    </div>
                    <p className="text-[#868686] text-[clamp(10px,1.2vw,14px)] text-nowrap text-right space-x-2">
                      <span> {formatDate(step.date)} </span>
                      <span> {formatTime(step.date)} </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Flutterwave Details */}
          <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] overflow-hidden">
            <div className="bg-[#0EB26B1A] px-6 py-[18px] flex items-center justify-between">
              <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                Flutterwave Details
              </h3>
              <img
                src="/images/flutterwaveLogo.png"
                alt="flutterwave"
                className="w-[120px] md:w-[150px] lg:w-[180px] h-12 object-contain "
              />
            </div>
            <div className="p-6 flex flex-col gap-6">
              {[
                {
                  label: "Flutterwave Transaction ID",
                  value: payment.flutterwaveTransactionId,
                },
                {
                  label: "Flutterwave Payment Link",
                  value: (
                    <a
                      href={payment.paymentLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#145FC4] underline break-all"
                    >
                      {payment.paymentLink}
                    </a>
                  ),
                },
                {
                  label: "Gateway Response Code",
                  value: payment.gatewayResponseCode,
                },
                {
                  label: "Gateway Response Message",
                  value: payment.gatewayResponseMessage,
                },
              ].map((step) => (
                <InfoRow
                  key={step.label}
                  label={step.label}
                  value={step.value}
                  className="text-[clamp(14px,1.4vw,16px)]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secure Payment + Receipt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0EB26B21] rounded-[20px] border border-[#E4E4E4] p-6 flex flex-col gap-2">
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(15px,1.6vw,17px)]">
              Secure Payment
            </h3>
            <p className="text-[#868686] text-[clamp(13px,1.3vw,15px)] leading-relaxed">
              This transaction was processed securely by Flutterwave, a trusted
              payment gateway in Africa.
            </p>
          </div>
          <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] overflow-hidden space-y-2">
            <div className="bg-[#0EB26B1A] p-4">
              <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                Receipt
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3 p-4">
              <p className="text-[#868686] text-[clamp(13px,1.3vw,15px)]">
                Generate or download the official receipt.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border border-[#0EB26B] text-[#0EB26B] hover:bg-[#0EB26B0D] hover:text-[#0EB26B] rounded-[9px] font-semibold w-fit h-10"
                onClick={() => setOpenReceiptDialog(true)}
              >
                <DownloadIcon className="size-4" fill="#0EB26B" />
                <span>Download Receipt</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FullScreenModal isOpen={openReceiptDialog}>
        <ViewReceipt onClose={() => setOpenReceiptDialog(false)} />
      </FullScreenModal>
    </>
  );
};

const InfoRow = ({
  label,
  value,
  labelClassName,
  valueClassName,
  className,
}: {
  label: string;
  value: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
}) => (
  <div
    className={cn(
      "grid grid-cols-1 sm:grid-cols-[1.4fr_1.6fr] gap-2 sm:gap-6 text-[clamp(14px,1.4vw,16px)]",
      className,
    )}
  >
    <span
      className={cn(
        "text-[#868686] font-semibold shrink-0 text-nowrap",
        labelClassName,
      )}
    >
      {label}
    </span>
    <span
      className={cn(
        "text-[#4E4E4E] font-semibold min-w-0 wrap-break-word",
        valueClassName,
      )}
    >
      {value || "N/A"}
    </span>
  </div>
);

export default TransactionDetails;

export const ViewReceipt = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center px-20 py-10">
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit hover:bg-transparent ml-auto"
        onClick={onClose}
      >
        <CloseIcon className="size-5" />
      </Button>
      <div className="flex-1 flex flex-col gap-10 ">
        <img
          src="/images/flutterwaveReceipt.png"
          alt={`flutterwave receipt`}
          className="object-contain w-[748px] h-full"
        />
        <Button variant="default" size="lg" className="w-full">
          Download
        </Button>
      </div>
    </div>
  );
};
