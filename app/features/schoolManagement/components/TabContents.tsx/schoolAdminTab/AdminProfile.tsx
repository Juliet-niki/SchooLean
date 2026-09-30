import {
  LeftIcon,
  Location2Icon,
  Phone2Icon,
  AdminIcon,
  MegaPhone3Icon,
  CheckMarkIcon,
  School2Icon,
  MotionIcon,
  LoginIcon,
} from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { IAdmin } from "~/types";
import { formatDateTime } from "~/utils/formatDate";

const AdminProfile = ({
  admin,
  onBack,
}: {
  admin: IAdmin | null;
  onBack: () => void;
}) => {
  if (!admin) return null;

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
        {/* Top Section: Profile Card, Personal & Account Information */}
        <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-4 md:gap-5">
          {/* Profile Card */}
          <div className="bg-white rounded-[20px] px-4 md:px-7 py-8 md:py-12 flex flex-col shrink-0 shadow-md shadow-[#0000001A] border border-[#E4E4E4]">
            {admin.profilePic ? (
              <img
                src={admin.profilePic}
                alt={admin.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mb-6"
              />
            ) : (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#D9D9D9] mb-6" />
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-x-7 mb-6 lg:justify-start">
              <h2 className="text-[clamp(20px,2.5vw,22px)] font-semibold">
                {admin.name}
              </h2>

              <StatusView
                variant="solid"
                styleOption={true}
                status={
                  admin.accountStatus === "ACTIVE" ? "Active" : "Deactivated"
                }
                green="Active"
                red="Deactivated"
                classStyleName="text-[clamp(13px,1.3vw,15px)] py-[2px] px-3 rounded-[7px] w-fit text-center text-white"
              />
            </div>

            <div className="w-full flex flex-col gap-5 text-[clamp(14px,1.4vw,16px)] font-semibold">
              {[
                { icon: AdminIcon, value: admin.role || "Admin" },
                {
                  icon: Location2Icon,
                  value: admin.address || "N/A",
                },
                { icon: Phone2Icon, value: admin.phoneNumber || "N/A" },
              ].map((item) => (
                <div key={item.value} className="flex items-start gap-3">
                  <item.icon className="w-4 h-4 md:h-6 md:w-6 shrink-0" />
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {/* Personal Information Column */}
            <div className="lg:border-r border-[#E4E4E4]">
              <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-br-[10px] lg:rounded-br-none rounded-bl-[10px]">
                <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                  Personal Information
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <InfoRow label="Full Name" value={admin.name} />
                <InfoRow label="Email Address" value={admin.email} />
                <InfoRow label="Phone Number" value={admin.phoneNumber} />
                <InfoRow label="Date of Birth" value={admin.dateOfBirth} />
                <InfoRow label="Gender" value={admin.gender} />
                <InfoRow label="Address" value={admin.address} />
                <InfoRow label="Country" value={admin.country} />
                <InfoRow label="City" value={admin.city} />
                <InfoRow label="Postal Code" value={admin.postalCode} />
              </div>
            </div>

            {/* Account Information Column */}
            <div>
              <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-bl-[10px] lg:rounded-bl-none rounded-br-[10px]">
                <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                  Account Information
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-4 text-[14px]">
                <InfoRow label="User ID" value={admin.adminId} />
                <InfoRow label="Username" value={admin.username} />
                <InfoRow
                  label="Email Status"
                  value={
                    <StatusView
                      variant="soft"
                      styleOption={true}
                      status={
                        admin.emailStatus === "VERIFIED"
                          ? "Verified"
                          : "Unverified"
                      }
                      green="Verified"
                      red="Unverified"
                    />
                  }
                />
                <InfoRow
                  label="Phone Status"
                  value={
                    <StatusView
                      variant="soft"
                      styleOption={true}
                      status={
                        admin.phoneStatus === "VERIFIED"
                          ? "Verified"
                          : "Unverified"
                      }
                      green="Verified"
                      red="Unverified"
                    />
                  }
                />
                <InfoRow
                  label="Account Status"
                  value={
                    <StatusView
                      variant="soft"
                      styleOption={true}
                      status={
                        admin.accountStatus === "ACTIVE"
                          ? "Active"
                          : "Deactivated"
                      }
                      green="Active"
                      red="Deactivated"
                    />
                  }
                />
                <InfoRow
                  label="Last login"
                  value={formatDateTime(admin.lastLogin)}
                />
                <InfoRow
                  label="Account Created"
                  value={formatDateTime(admin.accountCreated)}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(admin.lastUpdated)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Role & Access Information */}
        <div className="bg-white rounded-[20px] shadow-md border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-b-[10px]">
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Role & Access Information
            </h3>
          </div>
          <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <InfoRow
                label="Role"
                value={admin.role}
                className="font-bold text-[clamp(16px,1.6vw,18px)] text-[#868686]"
                valueClassName="text-[#868686]"
              />
              <InfoRow
                label="Permissions"
                value={
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      admin.permissions === "FULL_ACCESS"
                        ? "Full Access"
                        : "Limited"
                    }
                    green="Full Access"
                    blue="Limited"
                  />
                }
              />
              <InfoRow
                label="School Access"
                value={
                  <div className="flex items-center gap-3">
                    <School2Icon className="size-6 shrink-0" fill="#4E4E4E" />
                    <span>
                      {admin.schoolAccess || "Greenwood International Schools"}
                    </span>
                  </div>
                }
              />
              <InfoRow
                label="Assigned By"
                value={
                  <div className="flex items-center gap-3">
                    <AdminIcon className="size-6 shrink-0" fill="#4E4E4E" />
                    <span>{admin.assignedBy || "System"}</span>
                  </div>
                }
              />
            </div>

            {/* What this role can do box */}
            <div className="flex-1 bg-[#0EB26B1A] rounded-[10px] p-5 border border-[#E4F8ED]">
              <h4 className="font-semibold mb-4 text-[clamp(16px,1.7vw,18px)]">
                What this role can do
              </h4>
              <ul className="flex flex-col gap-3 text-[clamp(14px,1.4vw,16px)] text-[#868686] font-semibold">
                {[
                  "Manage all schools",
                  "Access all modules",
                  "View and manage users",
                  "View audit logs",
                  "Send announcements",
                  "Suspend/activate",
                ].map((cap, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckMarkIcon className="size-5 shrink-0" fill="#0EB26B" />

                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Activity Summary */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.6vw,18px)]">
            Activity Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <ActivityCard
              count={admin.activitySummary?.totalLogins || 0}
              label="Total Logins"
              icon={<LoginIcon className="size-6 stroke-2" fill="#145FC4" />}
              colorClass="#145FC4"
              iconBgColor="#145FC421"
            />
            <ActivityCard
              count={admin.activitySummary?.actionsPerformed || 0}
              label="Actions Performed"
              icon={<MotionIcon className="size-6" />}
              colorClass="#0EB26B"
              iconBgColor="#0EB26B21"
            />
            <ActivityCard
              count={admin.activitySummary?.supportTickets || 0}
              label="Support Tickets"
              icon={<MotionIcon className="size-6" fill="#B91EC7" />}
              colorClass="#B91EC7"
              iconBgColor="#B91EC721"
            />
            <ActivityCard
              count={admin.activitySummary?.announcementSent || 0}
              label="Announcement Sent"
              icon={<MegaPhone3Icon className="size-6" />}
              colorClass="#E59C15"
              iconBgColor="#E59C1521"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
}) => (
  <div
    className={cn(
      "grid grid-cols-1 sm:grid-cols-[1.2fr_2fr] gap-2 sm:gap-6 text-[clamp(14px,1.4vw,16px)]",
      className,
    )}
  >
    <span className="text-[#868686] font-semibold shrink-0">{label}</span>
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

const ActivityCard = ({
  count,
  label,
  icon,
  colorClass,
  iconBgColor,
}: {
  count: number;
  label: string;
  icon: React.ReactNode;
  iconBgColor: string;
  colorClass: string;
}) => (
  <div className="bg-white rounded-[7px] p-5 lg:p-6 flex items-center gap-5 sm:gap-6 shadow-md shadow-[#00000026] border border-[#D9D9D9]">
    <div
      style={{
        backgroundColor: iconBgColor,
        color: colorClass,
      }}
      className={`size-[50px] lg:size-[70px] rounded-full flex items-center justify-center shrink-0`}
    >
      {icon}
    </div>
    <div className="flex flex-col">
      <span
        style={{ color: colorClass }}
        className={`text-[clamp(24px,2.8vw,32px)] font-semibold leading-tight`}
      >
        {count}
      </span>
      <span className="text-[clamp(16px,1.6vw,18px)] font-medium text-[#4E4E4EEE]">
        {label}
      </span>
    </div>
  </div>
);

export default AdminProfile;
