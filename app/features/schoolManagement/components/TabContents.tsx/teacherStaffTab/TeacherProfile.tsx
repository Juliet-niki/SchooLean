import {
  LeftIcon,
  Location2Icon,
  Phone2Icon,
  AdminIcon,
  Mail2Icon,
  HeartIcon,
} from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { ITeacher } from "~/types";

const TeacherProfile = ({
  teacher,
  onBack,
}: {
  teacher: ITeacher | null;
  onBack: () => void;
}) => {
  if (!teacher) return null;

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
        {/* Top Section: Profile Card, Personal & Employment Details */}
        <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-4 md:gap-5">
          {/* Profile Card */}
          <div className="bg-white rounded-[20px] px-4 md:px-7 py-8 md:py-12 flex flex-col shrink-0 shadow-md shadow-[#0000001A] border border-[#E4E4E4]">
            {teacher.profilePic ? (
              <img
                src={teacher.profilePic}
                alt={teacher.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover mb-6"
              />
            ) : (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#D9D9D9] mb-6" />
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-x-7 mb-6 lg:justify-start">
              <h2 className="text-[clamp(20px,2.5vw,22px)] font-semibold">
                {teacher.name}
              </h2>
              <StatusView
                variant="solid"
                styleOption={true}
                status={teacher.status === "ACTIVE" ? "Active" : "Inactive"}
                green="Active"
                red="Inactive"
                classStyleName="text-[clamp(13px,1.3vw,15px)] py-[2px] px-3 rounded-[7px] w-fit text-center text-white"
              />
            </div>

            <div className="w-full flex flex-col gap-5 text-[clamp(14px,1.4vw,16px)] font-semibold">
              <div className="flex items-start gap-3">
                <AdminIcon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{teacher.position || "Teacher"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Location2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{teacher.address || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  fill="#4E4E4E"
                />
                <span>{teacher.phoneNumber || "N/A"}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail2Icon
                  className="w-4 h-4 md:h-6 md:w-6 shrink-0"
                  stroke="#4E4E4E"
                />
                <span className="min-w-0 wrap-break-word">
                  {teacher.email || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] overflow-hidden">
            {/* Personal Information Column */}
            <div className="lg:border-r border-[#E4E4E4]">
              <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-br-[10px] lg:rounded-br-none rounded-bl-[10px]">
                <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                  Personal Information
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <InfoRow label="Full Name" value={teacher.name} />
                <InfoRow label="Email Address" value={teacher.email} />
                <InfoRow label="Phone Number" value={teacher.phoneNumber} />
                <InfoRow label="Date of Birth" value={teacher.dateOfBirth} />
                <InfoRow label="Gender" value={teacher.gender} />
                <InfoRow label="Country" value={teacher.country} />
                <InfoRow label="City" value={teacher.city} />
                <InfoRow label="Postal Code" value={teacher.postalCode} />
                <InfoRow label="Teacher ID" value={teacher.teacherId} />
              </div>
            </div>

            {/* Employment Details Column */}
            <div>
              <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-bl-[10px] lg:rounded-bl-none rounded-br-[10px]">
                <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
                  Employment Details
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <InfoRow label="Department" value={teacher.department} />
                <InfoRow label="Position" value={teacher.position} />
                <InfoRow
                  label="Employment Type"
                  value={teacher.employmentType}
                />
                <InfoRow label="Hire Date" value={teacher.hireDate} />
                <InfoRow
                  label="Year of Experience"
                  value={teacher.yearsOfExperience}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Education & Certification */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-b-[10px]">
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Education & Certification
            </h3>
          </div>
          <div className="p-4 md:p-6">
            {/* Mobile View (Cards) */}
            <div className="flex flex-col gap-4 ml:hidden">
              {teacher.educationAndCertification &&
              teacher.educationAndCertification.length > 0 ? (
                teacher.educationAndCertification.map((edu, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-4 border border-[#E4E4E4] rounded-[10px] bg-[#F9F9F9]"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[#868686] text-[13px] font-semibold">
                        Degree / Certification
                      </span>
                      <span className="font-bold text-[15px]">
                        {edu.degree}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#868686] text-[13px] font-semibold">
                        Institution
                      </span>
                      <span className="font-semibold text-[14px]">
                        {edu.institution}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#868686] text-[13px] font-semibold">
                        Year
                      </span>
                      <span className="font-semibold text-[14px]">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-[#868686] py-4">
                  No education records found.
                </div>
              )}
            </div>

            {/* Desktop View (Table) */}
            <table className="w-full hidden ml:table">
              <thead>
                <tr className="text-left font-bold text-[clamp(16px,1.6vw,18px)] border-b border-[#E4E4E4]">
                  <th className="py-3 px-6 font-bold">
                    Degree / Certification
                  </th>
                  <th className="py-3 px-6 font-bold">Institution</th>
                  <th className="py-3 px-6 font-bold">Year</th>
                </tr>
              </thead>
              <tbody>
                {teacher.educationAndCertification &&
                teacher.educationAndCertification.length > 0 ? (
                  teacher.educationAndCertification.map((edu, index) => (
                    <tr
                      key={index}
                      className="font-semibold text-[clamp(14px,1.4vw,16px)]"
                    >
                      <td className="py-4 px-6">{edu.degree}</td>
                      <td className="py-4 px-6">{edu.institution}</td>
                      <td className="py-4 px-6">{edu.year}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-[#868686]">
                      No education records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Skills & Interest */}
        <div className="bg-white rounded-[20px] shadow-md shadow-[#0000001A] border border-[#E4E4E4] flex flex-col overflow-hidden">
          <div className="bg-[#0EB26B1A] px-6 py-[18px] rounded-b-[10px]">
            <h3 className="text-[#0EB26B] font-semibold text-[clamp(16px,1.7vw,18px)]">
              Skills & Interest
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[#E4E4E4]">
            <div className="p-6 flex flex-wrap gap-3 items-start content-start">
              {teacher.skills && teacher.skills.length > 0 ? (
                teacher.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#0EB26B1A] text-[#0EB26B] font-semibold px-4 py-2 rounded-[8px] text-[clamp(13px,1.4vw,15px)]"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-[#868686]">No skills listed.</span>
              )}
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-bold text-[clamp(14px,1.5vw,16px)]">
                <HeartIcon className="w-5 h-5 text-current" />
                <h4>Hobbies & Interest</h4>
              </div>
              <p className="text-[#868686] font-semibold text-[clamp(13px,1.4vw,15px)] leading-relaxed">
                {teacher.hobbiesAndInterest.join(", ") || "No hobbies listed."}
              </p>
            </div>
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

export default TeacherProfile;
