
import StatusView from "~/components/StatusView";
import {
  ClassIcon,
  ClassTeacherIcon,
  Clock2Icon,
  Clock3Icon,
  School3Icon,
  SectionIcon,
} from "~/assets/Icons";
import SectionHeader from "../components/SectionHeader";
import { STUDENT_PROFILE_MOCK } from "../components/mock";
import { formatDate } from "~/utils/formatDate";
import { getAge } from "../components/helpers";

const PersonalInfoTab = () => {
  const { school, student } = STUDENT_PROFILE_MOCK;

  return (
    <div className="bg-white rounded-[5px] w-full border border-[#CACACA] overflow-hidden text-[clamp(15px,1.6vw,18px)] text-[#4E4E4E]">
      <SectionHeader title="Personal Information" />
      <div className="bg-[#F9F9F9] px-6 ml:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: School Info */}
        <div className="flex flex-col gap-4 ml:gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 bg-[#0EB26B1A] rounded-full flex items-center justify-center shrink-0">
              <School3Icon className="size-8 ml:size-9" />
            </div>
            <div className="flex flex-col flex-1 text-[clamp(16px,1.6vw,18px)] space-y-[2px]">
              <h4 className="font-semibold">{school.name}</h4>
              <p className="text-[#868686]">{school.type}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <InfoRow
              label="Class"
              icon={<ClassIcon className="size-5" />}
              value={school.class}
            />
            <InfoRow
              label="Section"
              icon={<SectionIcon className="size-5" />}
              value={school.section}
            />
            <InfoRow
              label="Class Teacher"
              icon={<ClassTeacherIcon className="size-5" />}
              value={school.classTeacher}
            />
            <InfoRow
              label="Academic Session"
              icon={<Clock2Icon className="size-5" fill="#4E4E4E" />}
              value={school.session}
            />
            <InfoRow
              label="Term"
              icon={<Clock3Icon className="size-5" />}
              value={school.term}
            />
          </div>
        </div>

        {/* Right Side: Student Info */}
        <div className="flex flex-col gap-4 lg:border-l lg:border-[#E4E4E4] lg:pl-8">
          <InfoRow label="Full Name" value={student.fullName} />
          <InfoRow label="Student ID" value={student.id} />
          <InfoRow label="Admission Number" value={student.admissionNumber} />
          <InfoRow
            label="Date of Birth"
            value={`${formatDate(student.dateOfBirth)} (${getAge(student.dateOfBirth)} Years)`}
          />
          <InfoRow label="Gender" value={student.gender} />
          <InfoRow
            label="Status"
            value={
              <StatusView
                variant="soft"
                styleOption={true}
                status={student.status === "ACTIVE" ? "Active" : "Inactive"}
                green="Active"
                red="Inactive"
                classStyleName="rounded-[15px] py-[5PX] px-4 font-medium"
              />
            }
          />
          <InfoRow
            label="Admission Date"
            value={formatDate(student.admissionDate)}
          />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
    <div className="text-[#868686] font-medium flex items-center">
      <span className={`hidden sm:block shrink-0 ${icon ? "mr-4" : ""}`}>
        {icon}
      </span>
      <span>{label}</span>
    </div>
    <span className="text-[#4E4E4E] font-semibold min-w-0 break-words">
      {value}
    </span>
  </div>
);

export default PersonalInfoTab;
