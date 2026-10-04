import {
  LeftIcon,
  Person3Icon,
  LogIcon,
  School3Icon,
  Student3Icon,
  CalendarIcon,
  Clock2Icon,
  DashboardIcon,
  AuditIcon,
  File3Icon,
  GraduationCap2Icon,
  MoneyIcon,
  AttendanceIcon,
  ActivityIcon,
  Security2Icon,
  FileReportIcon,
} from "~/assets/Icons";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { useNavigate, useParams } from "react-router";
import StatusView from "~/components/StatusView";
import PersonalInfoTab from "../components/studentProfile/tabContents/PersonalInfoTab";
import { STUDENT_PROFILE_MOCK } from "../components/studentProfile/components/mock";
import AcademicsTab from "../components/studentProfile/tabContents/AcademicsTab";
import ActivityTab from "../components/studentProfile/tabContents/ActivityTab";
import AttendanceTab from "../components/studentProfile/tabContents/AttendanceTab";
import AuditLogTab from "../components/studentProfile/tabContents/AuditLogTab";
import FeesPaymentsTab from "../components/studentProfile/tabContents/FeesPaymentsTab";
import ReportCardsTab from "../components/studentProfile/tabContents/ReportCardsTab";
import SecurityTab from "../components/studentProfile/tabContents/SecurityTab";

const TABS = [
  {
    value: "personalInfo",
    label: "Personal Info",
    icon: Person3Icon,
    Content: PersonalInfoTab,
  },
  {
    value: "academics",
    label: "Academics",
    icon: GraduationCap2Icon,
    Content: AcademicsTab,
  },
  {
    value: "feesPayments",
    label: "Fees & Payments",
    icon: MoneyIcon,
    Content: FeesPaymentsTab,
  },
  {
    value: "attendance",
    label: "Attendance",
    icon: AttendanceIcon,
    Content: AttendanceTab,
  },
  {
    value: "reportCards",
    label: "Report Cards",
    icon: FileReportIcon,
    Content: ReportCardsTab,
  },
  {
    value: "activity",
    label: "Activity",
    icon: ActivityIcon,
    Content: ActivityTab,
  },
  {
    value: "security",
    label: "Security",
    icon: Security2Icon,
    Content: SecurityTab,
  },
  {
    value: "auditLog",
    label: "Audit Log",
    icon: LogIcon,
    Content: AuditLogTab,
  },
];

const ACTIONS = [
  { label: "View School", Icon: School3Icon, onClick: () => {} },
  {
    label: "Open Dashboard (Read Only)",
    Icon: DashboardIcon,
    onClick: () => {},
  },
  { label: "View Report Card", Icon: File3Icon, onClick: () => {} },
  { label: "View Audit Log", Icon: AuditIcon, onClick: () => {} },
];

const StudentProfile = () => {
  const { userID, schoolID } = useParams();
  const navigate = useNavigate();
  const { student, school } = STUDENT_PROFILE_MOCK;
  const infoItems = [
    { title: school.name, subtitle: school.type, icon: School3Icon },
    { title: school.class, subtitle: "Class", icon: Student3Icon },
    { title: school.session, subtitle: "Academic Session", icon: CalendarIcon },
    { title: school.term, subtitle: "Current Term", icon: Clock2Icon },
  ];

  return (
    <div className="pt-4 md:pt-7 pb-6 md:pb-12 px-4 md:px-6 font-medium bg-[#EDEDED] min-h-screen text-[#4E4E4E]">
      <div className="flex flex-col items-start gap-3 ml:gap-4 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent h-fit p-0"
          onClick={() => navigate(-1)}
        >
          <LeftIcon className="size-5 ml:size-6" />
        </Button>
        <h1 className="text-[clamp(18px,2vw,26px)] font-semibold">
          Student Profile
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        {/* Top Header Card */}
        <div className="bg-white border border-[#CACACA] rounded-[13px] p-5 ml:p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
          {student.profilePic ? (
            <img
              src={student.profilePic}
              alt={student.fullName}
              className="size-24 md:size-36 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="size-24 md:size-36 rounded-full bg-[#989898] shrink-0" />
          )}

          <div className="flex flex-col flex-1 gap-3 w-full">
            <div className="flex items-center gap-4">
              <h2 className="text-[clamp(18px,2vw,22px)] font-semibold">
                {student.fullName}
              </h2>
              <StatusView
                variant="soft"
                classStyleName="rounded-[15px] py-[5PX] px-4"
                status={student.status === "ACTIVE" ? "Active" : "Inactive"}
                green="Active"
                red="Inactive"
              />
            </div>
            <p className="text-[#868686] text-[clamp(14px,1.4vw,16px)]">
              {student.id} / {student.admissionNumber}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 mt-2">
              {infoItems.map((item) => (
                <div key={item.subtitle} className="flex items-center gap-3">
                  <div className="size-8 lg:size-10 bg-[#0EB26B1A] border border-[#D1D1D1] rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="size-4 lg:size-5" fill="#0EB26B" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[clamp(14px,1.4vw,16px)]">
                      {item.title}
                    </span>
                    <span className="text-[#868686] text-[clamp(13px,1.3vw,15px)]">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-[#CACACA] rounded-[5px] px-3 md:px-6 lg:px-9 py-3 md:py-5">
          {ACTIONS.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center gap-2 bg-[#0EB26B17] text-[#0EB26B] font-semibold text-[clamp(13px,1.4vw,15px)] px-4 py-2.5 rounded-[5px] border border-[#CACACA]"
            >
              <item.Icon className="size-5 lg:size-6" fill="#0EB26B" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Tabs Section */}

        <Tabs defaultValue="personalInfo" className="w-full gap-3">
          <div className="overflow-x-auto hide-scrollbar border border-[#CACACA] bg-white rounded-[5px]">
            <TabsList className="w-max gap-4 md:gap-5 lg:gap-6 bg-transparent h-auto p-0 px-4">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-3 data-[state=active]:border-[#0EB26B] data-[state=active]:text-[#0EB26B] text-[#4E4E4E] border-b-2 border-transparent rounded-none py-4 px-1 flex items-center gap-2 font-semibold text-[clamp(13px,1.4vw,15px)]"
                >
                  <tab.icon
                    className="size-4 ml:size-5 data-[state=active]:fill-[#0EB26B] data-[state=active]:stroke-[#0EB26B]"
                    fill="currentColor"
                    stroke="currentColor"
                  />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div>
            {TABS.map(({ value, Content }) => (
              <TabsContent
                key={value}
                value={value}
                className="m-0 focus:outline-none"
              >
                <Content />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;
