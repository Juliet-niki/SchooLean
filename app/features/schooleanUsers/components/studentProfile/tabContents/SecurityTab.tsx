import { Security2Icon } from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { formatDate, formatTime } from "~/utils/formatDate";
import { STUDENT_PROFILE_MOCK } from "../components/mock";
import SectionHeader from "../components/SectionHeader";

const DateTime = ({ iso }: { iso: string }) => (
  <div className={`flex items-center gap-4`}>
    <span>{formatDate(iso)}</span>
    <span>{formatTime(iso)}</span>
  </div>
);

const SecurityTab = () => {
  const security = STUDENT_PROFILE_MOCK.security;

  const rows = [
    {
      label: "Account Status",
      value: (
        <div className="flex justify-start">
          <StatusView
            variant="soft"
            status={security.accountStatus === "ACTIVE" ? "Active" : "Inactive"}
            green="Active"
            red="Inactive"
            classText="rounded-[10px]"
          />
        </div>
      ),
    },
    {
      label: "Last Login",
      value: <DateTime iso={security.lastLogin} />,
    },
    {
      label: "Login Attempts",
      value: (
        <span>
          {security.failedLoginAttempts} failed{" "}
          {security.failedLoginAttempts === 1 ? "attempt" : "attempts"}
        </span>
      ),
    },
    {
      label: "Two-Factor Authentication",
      value: (
        <span className="bg-[#A5A5A521] px-4 py-1 rounded-[10px] w-fit text-[clamp(12px,1.2vw,14px)]">
          {security.twoFactorEnabled ? "Enabled" : "Disabled"}
        </span>
      ),
    },
    {
      label: "Password Last Changed",
      value: <DateTime iso={security.passwordLastChanged} />,
    },
  ];

  return (
    <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[clamp(14px,1.4vw,16px)] text-[#4E4E4E]">
      <SectionHeader
        title="Security"
        icon={<Security2Icon className="size-5 ml:size-6" fill="#0EB26B" />}
      />
      <div className="px-3 ml:px-5 pt-2 ml:pt-3 pb-6 ml:pb-10">
        <div className="border border-[#D9D9D9] rounded-[10px] px-4 md:px-14 flex flex-col gap-6 md:gap-8 py-3 font-semibold">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 md:grid-cols-2 items-center "
            >
              <span className="">{row.label}</span>
              {row.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
