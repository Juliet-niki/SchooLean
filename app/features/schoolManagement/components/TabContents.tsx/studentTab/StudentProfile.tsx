import {
  LeftIcon,
  Location2Icon,
  Phone2Icon,
  Mail2Icon,
  File2Icon,
  GraduationCapIcon,
  Parents2Icon,
} from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { IStudent } from "~/types";

const StudentProfile = ({
  student,
  onBack,
}: {
  student: IStudent | null;
  onBack: () => void;
}) => {
  if (!student) return null;

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
            {student.profilePic ? (
              <img
                src={student.profilePic}
                alt={student.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mb-6"
              />
            ) : (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#D9D9D9] mb-6" />
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-x-7 mb-6 lg:justify-start">
              <h2 className="text-[clamp(20px,2.5vw,22px)] font-semibold">
                {student.name}
              </h2>
              <StatusView
                variant="solid"
                styleOption={true}
                status={student.status === "ACTIVE" ? "Active" : "Inactive"}
                green="Active"
                red="Inactive"
                classStyleName="text-[clamp(13px,1.3vw,15px)] py-[2px] px-3 rounded-[7px] w-fit text-center text-white"
              />
            </div>

            <div className="w-full flex flex-col gap-5 text-[clamp(14px,1.4vw,16px)] font-semibold">
              <div className="flex items-start gap-3">
                <Location2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{student.address || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{student.phoneNumber || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  stroke="#4E4E4E"
                />
                <span className="min-w-0 wrap-break-word">
                  {student.email || "N/A"}
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
                <InfoRow label="Full Name" value={student.name} />
                <InfoRow label="Student ID" value={student.studentId} />
                <InfoRow label="Date of Birth" value={student.dateOfBirth} />
                <InfoRow label="Gender" value={student.gender} />
                <InfoRow
                  label="Grade"
                  value={student.education.currentGrade || "N/A"}
                />
                <InfoRow
                  label="Class"
                  value={
                    student.education.currentClass +
                      " " +
                      student.education.currentClassArm || "N/A"
                  }
                />
              </div>
              <div className="flex flex-col gap-4 lg:border-l lg:border-[#E4E4E4] lg:pl-8">
                <InfoRow
                  label="Phone Number"
                  value={student.phoneNumber || "N/A"}
                />
                <InfoRow label="Email Address" value={student.email || "N/A"} />
                <InfoRow label="Address" value={student.address || "N/A"} />
                <InfoRow
                  label="Enrollment Date"
                  value={student.enrollmentDate || "N/A"}
                />
                <InfoRow
                  label="Status"
                  value={
                    <StatusView
                      variant="soft"
                      styleOption={true}
                      status={
                        student.status === "ACTIVE" ? "Active" : "Inactive"
                      }
                      green="Active"
                      red="Inactive"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Education & Certification */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] flex items-center gap-5 rounded-b-[10px]">
            <GraduationCapIcon className="size-6" />
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Education & Certification
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col gap-4">
              <InfoRow
                label="Current Grade"
                value={student.education.currentGrade || "N/A"}
              />
              <InfoRow
                label="Class"
                value={
                  student.education.currentClass +
                    " " +
                    student.education.currentClassArm || "N/A"
                }
              />
              <InfoRow
                label="Homeroom Teacher"
                value={student.education.classroomTeacher || "N/A"}
              />
              <InfoRow
                label="Learning Track"
                value={student.education.learningTrack || "N/A"}
              />
            </div>
            <div className="flex flex-col gap-4 lg:border-l lg:border-[#E4E4E4] lg:pl-8">
              <InfoRow
                label="Program"
                value={student.education.program || "N/A"}
              />
              <InfoRow label="GPA" value={student.education.gpa || "N/A"} />
              <InfoRow
                label="Academic Status"
                value={
                  <StatusView
                    variant="soft"
                    styleOption={true}
                    status={
                      student.education.academicStatus === "ON_TRACK"
                        ? "On Track"
                        : "Needs Improvement"
                    }
                    green="On Track"
                    yellow="Needs Improvement"
                  />
                }
              />
            </div>
          </div>
        </div>

        {/* Parent / Guardian Information */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] flex items-center gap-5 rounded-b-[10px] mb-4">
            <Parents2Icon className="size-6" stroke="#0EB26B" />
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Parent / Guardian Information
            </h3>
          </div>
          <div className="mx-6">
            {/* Mobile View (Cards) */}
            <div className="flex flex-col gap-4 p-4 ml:hidden">
              {student.guardians && student.guardians.length > 0 ? (
                student.guardians.map((g, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-4 border border-[#E4E4E4] rounded-[10px] bg-[#F9F9F9]"
                  >
                    <InfoRow label="Name" value={g.name} />
                    <InfoRow label="Relationship" value={g.relationship} />
                    <InfoRow label="Phone Number" value={g.phoneNumber} />
                    <InfoRow label="Email Address" value={g.email} />
                  </div>
                ))
              ) : (
                <div className="text-center text-[#868686] py-4">
                  No guardian records found.
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
                  <th className="py-3 px-6 font-semibold">Relationship</th>
                  <th className="py-3 px-6 font-semibold">Phone Number</th>
                  <th className="py-3 px-6 font-semibold  rounded-r-[10px]">
                    Email Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {student.guardians && student.guardians.length > 0 ? (
                  student.guardians.map((g, index) => (
                    <tr
                      key={index}
                      className="font-semibold text-[clamp(14px,1.4vw,16px)]"
                    >
                      <td className="py-4 px-6">{g.name}</td>
                      <td className="py-4 px-6">{g.relationship}</td>
                      <td className="py-4 px-6">{g.phoneNumber}</td>
                      <td className="py-4 px-6">{g.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-[#868686]">
                      No guardian records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] flex items-center gap-5 rounded-b-[10px]">
            <File2Icon className="size-6" />
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Notes
            </h3>
          </div>
          <div className="p-6">
            <p className="text-[#868686] font-semibold text-[clamp(14px,1.4vw,16px)] leading-relaxed">
              {student.notes || "No notes added."}
            </p>
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

export default StudentProfile;
