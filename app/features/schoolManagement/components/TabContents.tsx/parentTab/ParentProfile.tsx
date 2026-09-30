import {
  LeftIcon,
  Location2Icon,
  Phone2Icon,
  Mail2Icon,
  Parents2Icon,
} from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { IParent, ISchool } from "~/types";

const CHILD_STATUS_LABEL: Record<
  "ENROLLED" | "WITHDRAWN" | "SUSPENDED",
  string
> = {
  ENROLLED: "Enrolled",
  WITHDRAWN: "Withdrawn",
  SUSPENDED: "Suspended",
};

const ParentProfile = ({
  parent,
  onBack,
  school,
}: {
  parent: IParent | null;
  onBack: () => void;
  school: ISchool;
}) => {
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
        grade:
          student.education.currentClass +
          " " +
          student.education.currentClassArm,
        school: school.name,
        status: linked.childStatus,
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

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
        {/* Top Section: Profile Card + Personal Information */}
        <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-4 md:gap-5">
          {/* Profile Card */}
          <div className="bg-white rounded-[20px] px-4 md:px-7 py-8 md:py-12 flex flex-col shrink-0 shadow-md shadow-[#0000001A] border border-[#E4E4E4]">
            {parent.profilePic ? (
              <img
                src={parent.profilePic}
                alt={parent.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mb-6"
              />
            ) : (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#D9D9D9] mb-6" />
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-x-7 mb-2 lg:justify-start">
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

            <p className="font-semibold text-[clamp(14px,1.4vw,16px)] mb-6">
              Parent of {children.length} student
              {children.length === 1 ? "" : "s"}
            </p>

            <div className="w-full flex flex-col gap-5 text-[clamp(14px,1.4vw,16px)] font-semibold">
              <div className="flex items-start gap-3">
                <Location2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{parent.address || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{parent.phoneNumber || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  stroke="#4E4E4E"
                />
                <span className="min-w-0 wrap-break-word">
                  {parent.email || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
            <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-b-[10px]">
              <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                Personal Information
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-8 gap-y-4">
              <div className="flex flex-col gap-4">
                <InfoRow label="Full Name" value={parent.name} />
                <InfoRow label="Date of Birth" value={parent.dateOfBirth} />
                <InfoRow label="Gender" value={parent.gender} />
                <InfoRow label="Nationality" value={parent.nationality} />
                <InfoRow label="Marital Status" value={parent.maritalStatus} />
                <InfoRow
                  label="Alternate Phone"
                  value={parent.alternatePhone}
                />
              </div>
              <div className="flex flex-col gap-4 lg:border-l lg:border-[#E4E4E4] lg:pl-8">
                <InfoRow label="State of Origin" value={parent.stateOfOrigin} />
                <InfoRow label="Occupation" value={parent.occupation} />
                <InfoRow label="Company" value={parent.company} />
                <InfoRow label="Work Phone" value={parent.workPhone} />
                <InfoRow label="Work Email" value={parent.workEmail} />
              </div>
            </div>
          </div>
        </div>

        {/* Children Information */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] flex items-center gap-5 rounded-b-[10px] mb-4">
            <Parents2Icon className="size-6" stroke="#0EB26B" />
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Children Information
            </h3>
          </div>
          <div className="mx-6 mb-6">
            {/* Mobile View (Cards) */}
            <div className="flex flex-col gap-4 p-4 ml:hidden">
              {children.length > 0 ? (
                children.map((child) => (
                  <div
                    key={child.studentId}
                    className="flex flex-col gap-3 p-4 border border-[#E4E4E4] rounded-[10px] bg-[#F9F9F9]"
                  >
                    <InfoRow label="Name" value={child.name} />
                    <InfoRow label="Grade" value={child.grade} />
                    <InfoRow label="School" value={child.school} />
                    <InfoRow
                      label="Status"
                      value={
                        <StatusView
                          variant="soft"
                          styleOption={true}
                          status={CHILD_STATUS_LABEL[child.status]}
                          green="Enrolled"
                          red="Withdrawn"
                          yellow="Suspended"
                        />
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-[#868686] py-4">
                  No children records found.
                </div>
              )}
            </div>

            {/* Desktop View (Table) */}
            <table className="w-full hidden ml:table">
              <thead>
                <tr className="text-left text-[clamp(16px,1.6vw,18px)] bg-[#0EB26B1A]">
                  <th className="py-3 px-6 font-semibold rounded-l-[10px]">
                    Name
                  </th>
                  <th className="py-3 px-6 font-semibold">Grade</th>
                  <th className="py-3 px-6 font-semibold">School</th>
                  <th className="py-3 px-6 font-semibold rounded-r-[10px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {children.length > 0 ? (
                  children.map((child) => (
                    <tr
                      key={child.studentId}
                      className="font-semibold text-[clamp(14px,1.4vw,16px)]"
                    >
                      <td className="py-4 px-6">{child.name}</td>
                      <td className="py-4 px-6">{child.grade}</td>
                      <td className="py-4 px-6">{child.school}</td>
                      <td className="py-4 px-6">
                        <StatusView
                          variant="soft"
                          styleOption={true}
                          status={CHILD_STATUS_LABEL[child.status]}
                          green="Enrolled"
                          red="Withdrawn"
                          yellow="Suspended"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-[#868686]">
                      No children records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
      "grid grid-cols-1 sm:grid-cols-[1.5fr_2fr] gap-2 sm:gap-6 text-[clamp(14px,1.4vw,16px)]",
      className,
    )}
  >
    <span className="text-[#868686] font-semibold shrink-0 text-nowrap">
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

export default ParentProfile;
