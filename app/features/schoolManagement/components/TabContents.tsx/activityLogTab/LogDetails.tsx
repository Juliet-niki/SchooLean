import {
  Calendar2Icon,
  DownloadIcon,
  GraduationCapIcon,
  LeftIcon,
  Location2Icon,
  LoginIcon,
  Logout2Icon,
  MonitorIcon,
  PersonsIcon,
  UpdateIcon,
} from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { IResolvedActivityLog } from "~/types";
import { formatDate, formatTime } from "~/utils/formatDate";

const ACTION_ICON_MAP: Record<string, React.ReactNode> = {
  Login: <LoginIcon className="size-5 shrink-0" fill="#4E4E4E" />,
  Logout: <Logout2Icon className="size-5 shrink-0" fill="#4E4E4E" />,
  Update: <UpdateIcon className="size-5 shrink-0" fill="#4E4E4E" />,
  Export: <DownloadIcon className="size-5 shrink-0" fill="#4E4E4E" />,
};

const LogDetails = ({
  log,
  onBack,
}: {
  log: IResolvedActivityLog | null;
  onBack: () => void;
}) => {
  if (!log) return null;

  return (
    <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-6 py-10 w-full text-[#4E4E4E]">
      <div className="flex flex-col gap-3 font-semibold">
        <Button
          variant="ghost"
          size="icon"
          className="h-fit w-fit hover:bg-transparent"
          onClick={onBack}
        >
          <LeftIcon className="size-6 shrink-0" fill="#4E4E4E" />
        </Button>
        <div>
          <h1 className="text-[clamp(20px,2vw,24px)]">View Detail Log</h1>
          <p className="text-[clamp(14px,1.4vw,16px)] text-[#868686]">
            Here are the complete details of this activity log.
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-[#0EB26B1A] rounded-[20px] px-6 md:px-8 py-6 md:py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex flex-col gap-3">
          <StatusView
            variant="solid"
            styleOption={true}
            status={log.status === "SUCCESS" ? "Success" : "Failed"}
            green="Success"
            red="Failed"
            classStyleName="text-[clamp(13px,1.3vw,15px)] py-1 px-5 rounded-[10px] w-fit text-center text-white"
          />
          <div className="space-y-1">
            <h2 className="text-[clamp(18px,1.8vw,20px)] font-semibold">
              {log.title}
            </h2>
            <p className="text-[#868686] text-[clamp(14px,1.4vw,15px)]">
              {log.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-4 font-semibold text-[clamp(14px,1.4vw,16px)]">
            <Calendar2Icon className="size-5 shrink-0" fill="#4E4E4E" />
            <span>{formatDate(log.date)}</span>
            <span>{formatTime(log.date)}</span>
          </div>
          <div className="flex items-center gap-4 font-semibold text-[clamp(14px,1.4vw,16px)]">
            <GraduationCapIcon
              className="size-6 shrink-0 scale-x-[-1]"
              fill="#4E4E4E"
            />
            <span>Module: {log.module}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] px-6 md:px-10 py-8 grid grid-cols-1 ml:grid-cols-[1fr_1px_1fr] gap-8">
        <div className="flex flex-col gap-6">
          <InfoRow
            label="User"
            value={
              <div className="flex items-center gap-3">
                {log.resolvedProfilePic ? (
                  <img
                    src={log.resolvedProfilePic}
                    alt={log.resolvedName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#D9D9D9]" />
                )}
                <div className="flex flex-col">
                  <span className="text-[clamp(18px,1.8vw,20px)] font-semibold">
                    {log.resolvedName}
                  </span>
                  <span className="text-[#868686] font-medium">{log.role}</span>
                </div>
              </div>
            }
          />
          <InfoRow
            label="Action"
            value={
              <span className="flex items-center gap-4">
                {ACTION_ICON_MAP[log.action]}
                {log.action}
              </span>
            }
          />
          {log.target && (
            <InfoRow
              label="Target"
              value={
                <span className="flex items-center gap-4">
                  <PersonsIcon className="size-5 shrink-0" fill="#4E4E4E" />
                  {log.target}
                </span>
              }
            />
          )}
          {log.recordId && <InfoRow label="Record ID" value={log.recordId} />}
        </div>

        <div className="hidden ml:block w-px bg-[#E4E4E4]" />

        <div className="flex flex-col gap-6">
          <InfoRow
            label="IP Address"
            value={
              <span className="flex items-center gap-4">
                <Location2Icon className="size-5 shrink-0" fill="#4E4E4E" />
                {log.ipAddress}
              </span>
            }
          />
          <InfoRow
            label="Device"
            value={
              <span className="flex items-center gap-4">
                <MonitorIcon className="size-5 shrink-0" fill="#4E4E4E" />
                {log.device}
              </span>
            }
          />
          <InfoRow
            label="Location"
            value={
              <span className="flex items-center gap-4">
                <Location2Icon className="size-5 shrink-0" fill="#4E4E4E" />
                {log.location}
              </span>
            }
          />
          <InfoRow
            label="Module"
            value={
              <span className="flex items-center gap-4">
                <GraduationCapIcon
                  className="size-5 shrink-0 scale-x-[-1]"
                  fill="#4E4E4E"
                />
                {log.module}
              </span>
            }
          />
        </div>
      </div>

      {/* System Information */}
      <div className="bg-[#0EB26B1A] rounded-[20px] px-6 md:px-8 py-6 flex flex-col gap-2">
        <h3 className="text-[#0EB26B] font-bold text-[clamp(16px,1.7vw,18px)]">
          System Information
        </h3>
        <p className="text-[#868686] text-[clamp(14px,1.4vw,16px)]">
          This activity was recorded automatically by the system and cannot be
          edited
        </p>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-2 sm:gap-6 text-[clamp(14px,1.4vw,16px)]",
      className,
    )}
  >
    <span className="text-[#868686] font-semibold shrink-0 text-nowrap">
      {label}
    </span>
    <span className="text-[#4E4E4E] font-semibold min-w-0 wrap-break-word">
      {value || "N/A"}
    </span>
  </div>
);

export default LogDetails;
