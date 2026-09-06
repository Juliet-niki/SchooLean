import { LoginIcon, RetryIcon } from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import type { ISchooleanUser, ISchoolSummary } from "~/data/schooleanUsersData";
import { formatDate, formatDateTime } from "~/utils/formatDate";

interface SchooleanUserOverviewProps {
  user: ISchooleanUser;
  selectedSchool: ISchoolSummary;
  onAddRoleSchool?: () => void;
}

const SchooleanUserOverview = ({
  user,
  selectedSchool,
  onAddRoleSchool,
}: SchooleanUserOverviewProps) => {
  const ACTIVITY_ICON_MAP: Record<string, React.ReactNode> = {
    "Logged in": <LoginIcon className="w-4 h-4 md:w-6 md:h-6" />,
    "Updated profile": (
      <RetryIcon className="w-4 h-4 md:w-6 md:h-6" fill="#0EB26B" />
    ),
  };
  return (
    <div className="flex flex-col gap-5 text-[#4E4E4E] font-semibold text-[clamp(14px,1.6vw,17px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* User Information */}
        <div className="bg-white rounded-[10px] border border-[#D9D9D9] p-5 md:p-6">
          <h4 className="text-[clamp(16px,1.8vw,20px)] mb-4">
            User Information
          </h4>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Full Name",
                value: `${user.firstName} ${user.lastName}`,
              },
              { label: "Email", value: user.email },
              { label: "Phone", value: user.phoneNumber },
              { label: "User ID", value: user.userID },
              {
                label: "Account Status",
                value: (
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      selectedSchool.status === "ACTIVE"
                        ? "Active"
                        : selectedSchool.status === "INACTIVE"
                          ? "Inactive"
                          : selectedSchool.status === "SUSPENDED"
                            ? "Suspended"
                            : selectedSchool.status === "PENDING_ACTIVATION"
                              ? "Pending"
                              : "Deactivated"
                    }
                    green="Active"
                    purple="Inactive"
                    blue="School Admin"
                    yellow="Pending"
                    grey="Deactivated"
                    red="Suspended"
                  />
                ),
              },
              {
                label: "Date Joined",
                value: formatDate(selectedSchool.dateJoined),
              },
              {
                label: "Last Login",
                value: formatDateTime(selectedSchool.lastLoginDate),
              },
            ].map((item) => (
              <div key={item.label} className="grid grid-cols-2 gap-5 ">
                <p className="text-[#868686] ">{item.label}</p>
                <div>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Schools & Roles */}
        <div className="bg-white rounded-[10px] border border-[#D9D9D9] p-5 md:p-6 flex flex-col">
          <h4 className="text-[clamp(16px,1.8vw,20px)] mb-4">
            Schools & Roles
          </h4>

          <div className="flex flex-col gap-3 flex-1">
            {user.schoolSummary.map((school) => (
              <div
                key={school.schoolID}
                className="flex items-center gap-3 border border-[#D9D9D9] rounded-[8px] px-4 py-3"
              >
                <div className="w-4 h-4 rounded-[4px] border border-[#4E4E4E] shrink-0" />
                <p className=" flex-1">{school.schoolName}</p>
                <StatusView
                  variant="soft"
                  styleOption={true}
                  status={
                    school.role === "TEACHER"
                      ? "Teacher"
                      : school.role === "SCHOOL_ADMIN"
                        ? "School Admin"
                        : school.role === "PARENT"
                          ? "Parent"
                          : school.role === "STUDENT"
                            ? "Student"
                            : "Non Academic Staff"
                  }
                  green="Teacher"
                  purple="Parent"
                  blue="School Admin"
                  yellow="Non Academic Staff"
                  pink="Student"
                />
              </div>
            ))}
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="mt-5 w-fit ml-auto bg-[#0EB26B] hover:bg-[#0EB26B]/80 text-white"
            onClick={onAddRoleSchool}
          >
            Add Role/School
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[10px] border border-[#D9D9D9] p-5 md:p-6">
        <h4 className="text-[clamp(16px,1.8vw,20px)] mb-4">Recent Activity</h4>
        <div className="flex flex-wrap gap-3">
          {user.recentActivities?.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border border-[#D9D9D9] rounded-[9px] px-4 py-3 #868686"
            >
              <div>{ACTIVITY_ICON_MAP[activity.activity] ?? null}</div>
              <span>{activity.activity}</span>
              <span>{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchooleanUserOverview;
