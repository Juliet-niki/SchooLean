import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  AdminIcon,
  CheckMark2Icon,
  CreditCardIcon,
  DashedMenuIcon,
  GearIcon,
  GlobeIcon,
  IdCardIcon,
  LeftIcon,
  LocationIcon,
  Mail2Icon,
  MegaPhone2Icon,
  MoreIcon,
  NoFillPersonIcon,
  Parents2Icon,
  PhoneIcon,
  StatusIcon,
  Student2Icon,
  SupportTikcetIcon,
  TeacherIcon,
} from "~/assets/icons";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SCHOOL_MANAGEMENT_DATA } from "~/data";
import type { ISchool } from "~/types";
import { CapitalizeFirstLetter } from "~/utils/formatText";
import SchoolAdminTab from "../components/SchoolAdminTab";
import TeacherStaffTab from "../components/TeacherStaffTab";
import StudentTab from "../components/StudentTab";
import ParentTab from "../components/ParentTab";
import ReportCardTab from "../components/ReportCardTab";
import FeesPaymentTab from "../components/FeesPaymentTab";

const SchoolDetails = () => {
  const [school, setSchool] = useState<ISchool | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuspend, setIsSuspend] = useState<"ACTIVE" | "SUSPENDED">("ACTIVE");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.schoolId) {
      const found = SCHOOL_MANAGEMENT_DATA.find(
        (item) => item.schoolId === params.schoolId,
      );
      setSchool(found || null);
    }
  }, [params.saleId]);

  useEffect(() => {
    if (school) {
      setIsSuspend(
        school.suspensionStatus === "SUSPENDED" ? "SUSPENDED" : "ACTIVE",
      );
    }
  }, [school]);

  const goBack = () => navigate(`/school-management`);

  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <p className="text-[#4E4E4E] text-[clamp(14px,1.4vw,16px)]">
          School not found
        </p>
        <Button onClick={goBack} size="lg">
          Back to School Management
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "text-[#0EB26B]";
    if (status === "INACTIVE") return "text-[#E81E1E]";
    return "text-[#F7B801]";
  };

  const handleSuspendToggle = () => {
    setIsSuspend((prev) => (prev === "ACTIVE" ? "SUSPENDED" : "ACTIVE"));
    setIsOpen(false);
  };
  return (
    <div className="py-4 ml:py-7  font-medium">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent ml-14 mb-6"
        onClick={goBack}
      >
        <LeftIcon className="w-7 h-7" />
      </Button>
      <div className="bg-[#0B653E] flex items-start lg:items-center justify-between gap-5 px-5 py-2.5">
        <div className="flex items-center flex-wrap gap-2 lg:gap-4">
          {[
            {
              icon: NoFillPersonIcon,
              text: "Impersonate School Admin",
              onClick: () => {},
            },
            {
              icon: SupportTikcetIcon,
              text: "Create support Ticket",
              onClick: () => {},
            },
            {
              icon: MegaPhone2Icon,
              text: "Send Announcement",
              onClick: () => {},
            },
            {
              icon: DashedMenuIcon,
              text: "View Audit Logs",
              onClick: () => {},
            },
          ].map((item, index) => (
            <div
              className="flex items-center gap-1 lg:gap-2 cursor-pointer  bg-[#0B9E5E] rounded-[6px] lg:rounded-[10px] px-3 py-2"
              onClick={item.onClick}
              key={index}
            >
              <item.icon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              <p className="text-white font-semibold text-[clamp(10px,1.2vw,14px)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                {isSuspend === "SUSPENDED" ? "Activate" : "Suspend"}
              </Button>
            </DialogTrigger>
            <DialogContent className="p-10">
              <div className="flex flex-col gap-20">
                <h2 className="text-[#4E4E4E] text-[clamp(14px,1.8vw,20px)] font-semibold">
                  Are you sure you want to{" "}
                  {isSuspend === "SUSPENDED" ? "Activate" : "Suspend"}?
                </h2>
                <div className="flex items-center gap-6 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className=" border-[#C2C2C2]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-[#D3F0E3] hover:bg-[#D3F0E3]/80 border border-[#C2C2C2]"
                    onClick={handleSuspendToggle}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="border border-[#E4E4E4] rounded-4xl bg-white divide-y divide-[#E4E4E4] mx-4 md:mx-6 mt-3">
        <div className="px-6 md:px-10 lg:px-20 py-5 flex items-center gap-2">
          <img
            src={school.logo}
            alt="school logo"
            className="h-auto w-20 md:w-28 lg:w-36"
          />
          <div className="text-[#313131]">
            <h2 className="text-[clamp(16px,1.8vw,22px)] font-semibold">
              {school.name}
            </h2>
            <p className="text-[clamp(14px,1.4vw,16px)]">{school.motto}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-[1.2fr_1fr] gap-5 md:gap-x-10 lg:gap-x-20 w-full px-6 md:px-10 lg:px-20 py-5">
          {[
            {
              key: "1",
              icon: LocationIcon,
              label: "Address",
              value: school.address,
              onClick: null,
            },
            {
              key: "2",
              icon: CheckMark2Icon,
              label: "Plan",
              value: school.plan,
              onClick: null,
            },
            {
              key: "3",
              icon: LocationIcon,
              label: "",
              value: `${school.location.country} / ${school.location.state} / ${school.location.city}`,
              onClick: null,
            },
            {
              key: "4",
              icon: StatusIcon,
              label: "Status",
              value: CapitalizeFirstLetter(school.status),
              onClick: null,
            },
            {
              key: "5",
              icon: Mail2Icon,
              label: "Email",
              value: school.email,
              onClick: () => {},
            },
            {
              key: "6",
              icon: null,
              label: "Date Joined",
              value: school.dateJoined,
              onClick: null,
            },
            {
              key: "7",
              icon: PhoneIcon,
              label: "Phone",
              value: school.phone,
              onClick: null,
            },
            {
              key: "8",
              icon: null,
              label: "Last Activity",
              value: school.lastActivity,
              onClick: null,
            },
            {
              key: "9",
              icon: GlobeIcon,
              label: "Website",
              value: school.website,
              onClick: () => {},
            },
            {
              key: "10",
              icon: null,
              label: "Subscription Expiry",
              value: school.subscriptionExpiry,
              onClick: null,
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-start gap-4.5 text-[#4E4E4E] text-[clamp(13px,1.4vw,16px)] font-semibold"
            >
              {item.icon && (
                <item.icon
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  fill={item.icon === PhoneIcon ? "#057B48" : "#057B48"}
                />
              )}
              <div className="flex items-start gap-1">
                {item.label && <p className="text-nowrap">{item.label}: </p>}
                {item.onClick ? (
                  <Link to={""} className="text-[#2392E7]">
                    {" "}
                    {item.value}
                  </Link>
                ) : (
                  <p
                    className={
                      item.label === "Status"
                        ? getStatusColor(school.status)
                        : ""
                    }
                  >
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center lg:justify-between gap-2 lg:gap-4 px-6 md:px-10 lg:px-20 py-5">
          {[
            {
              text: "Edit School Details",
              onClick: () => {},
            },
            {
              text: "View Custom Website",
              onClick: () => {},
            },
            {
              text: "View Active Subjects",
              onClick: () => {},
            },
            {
              text: "Reset School Setting",
              onClick: () => {},
            },
            {
              text: "Send Email to Admin",
              onClick: () => {},
            },
            {
              text: "Change School Admin",
              onClick: () => {},
            },
          ].map((item, index) => (
            <div
              className="flex items-center gap-2 cursor-pointer  bg-[#0B9E5E] rounded-[6px] lg:rounded-[10px] px-2 md:px-3 py-2"
              onClick={item.onClick}
              key={index}
            >
              <p className="text-white font-semibold text-[clamp(10px,1.2vw,14px)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-4 md:mx-6 mt-5 ">
        <Tabs defaultValue="schoolAdmin" className="gap-0">
          <div className="w-full overflow-x-auto hide-scrollbar pb-2 px-1">
            <TabsList className="w-max gap-2 lg:gap-3 rounded-none bg-transparent ">
              {[
                {
                  key: "1",
                  value: "schoolAdmin",
                  label: "School Admins",
                  icon: AdminIcon,
                },
                {
                  key: "2",
                  value: "teachers",
                  label: "Teachers & Staff",
                  icon: TeacherIcon,
                },
                {
                  key: "3",
                  value: "students",
                  label: "Students",
                  icon: Student2Icon,
                },
                {
                  key: "4",
                  value: "parents",
                  label: "Parents",
                  icon: Parents2Icon,
                },
                {
                  key: "5",
                  value: "reportCards",
                  label: "Report Card",
                  icon: IdCardIcon,
                },
                {
                  key: "6",
                  value: "fees",
                  label: "Fees & Payment",
                  icon: CreditCardIcon,
                },
                {
                  key: "7",
                  value: "activityLogs",
                  label: "Activity Logs",
                  icon: DashedMenuIcon,
                },
                {
                  key: "8",
                  value: "adminTools",
                  label: "Admin Tools",
                  icon: GearIcon,
                },
              ].map((item) => (
                <TabsTrigger
                  key={item.key}
                  value={item.value}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-0 data-[state=active]:border-b-4 data-[state=active]:border-[#0B653E] data-[state=active]:rounded-none text-[#4E4E4E] data-[state=active]:text-[#4E4E4E] text-[clamp(8px,1.4vw,16px)] py-5 px-0 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5"
                >
                  <div className="flex items-center gap-2 bg-white px-2 py-2 rounded-[7px] ">
                    <item.icon className="w-4 h-4" fill="#000" stroke="#000" />
                    <p>{item.label}</p>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="py-8 bg-white rounded-t-[13px]">
            <TabsContent value="schoolAdmin">
              <SchoolAdminTab school={school} />
            </TabsContent>
            <TabsContent value="teachers">
              <TeacherStaffTab school={school} />
            </TabsContent>
            <TabsContent value="students">
              <StudentTab school={school} />
            </TabsContent>
            <TabsContent value="parents">
              <ParentTab school={school} />
            </TabsContent>
            <TabsContent value="reportCards">
              <ReportCardTab school={school} />
            </TabsContent>
            <TabsContent value="fees">
              <FeesPaymentTab school={school} />
            </TabsContent>
            <TabsContent value="activityLogs">
              <p> activity logs</p>
            </TabsContent>
            <TabsContent value="adminTools">
              <p> admin tools</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SchoolDetails;
