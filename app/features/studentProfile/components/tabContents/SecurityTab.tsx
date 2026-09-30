import { studentProfileMock } from "../mock";
import { formatDate, formatTime } from "../helpers";
import { SupportTikcetIcon } from "~/assets/Icons";

const LABEL = "w-64 text-[#313131] font-bold text-[clamp(13px,1.4vw,15px)]";
const VALUE = "text-[#313131] font-bold text-[clamp(13px,1.4vw,15px)]";

const DateTime = ({ iso }: { iso: string }) => (
  <div className={`flex items-center gap-4 ${VALUE}`}>
    <span>{formatDate(iso)}</span>
    <span className="text-[#868686]">{formatTime(iso)}</span>
  </div>
);

const SecurityTab = () => {
  const security = studentProfileMock.security;

  const rows = [
    {
      label: "Account Status",
      value: (
        <span className="bg-[#E4F4EC] text-[#0EB26B] font-semibold text-[clamp(12px,1.3vw,14px)] px-4 py-1.5 rounded-full w-fit">
          {security.accountStatus}
        </span>
      ),
    },
    {
      label: "Last Login",
      value: <DateTime iso={security.lastLogin} />,
    },
    {
      label: "Login Attempts",
      value: (
        <span className={VALUE}>
          {security.failedLoginAttempts} failed{" "}
          {security.failedLoginAttempts === 1 ? "attempt" : "attempts"}
        </span>
      ),
    },
    {
      label: "Two-Factor Authentication",
      value: (
        <span className="bg-[#F0F0F0] text-[#4E4E4E] font-semibold text-[clamp(12px,1.3vw,14px)] px-4 py-1.5 rounded-full w-fit">
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
    <div className="flex flex-col gap-6">
      <div className="border border-[#E4E4E4] rounded-[10px] overflow-hidden bg-white">
        <div className="bg-[#E4F4EC] px-6 py-4 flex items-center gap-2 text-[#0EB26B]">
          <div className="w-5 h-5 flex items-center justify-center bg-[#0EB26B] rounded-sm text-white">
            <SupportTikcetIcon className="w-3 h-3 fill-white" />
          </div>
          <h3 className="font-semibold text-[clamp(14px,1.5vw,16px)]">
            Security
          </h3>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-8">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16"
            >
              <span className={LABEL}>{row.label}</span>
              {row.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
