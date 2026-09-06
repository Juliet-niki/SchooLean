import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LeftIcon, Mail2Icon, PhoneIcon } from "~/assets/Icons";
import StatusView from "~/components/StatusView";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  SCHOOLEAN_USER_DATA,
  type ISchooleanUser,
} from "~/data/schooleanUsersData";
import SchooleanUserOverview from "../components/tabContents/SchooleanUserOverview";

const SchooleanUserDetails = () => {
  const [user, setUser] = useState<ISchooleanUser | null>(null);

  const navigate = useNavigate();
  const { userID, schoolID } = useParams();

  useEffect(() => {
    if (userID) {
      const found = SCHOOLEAN_USER_DATA.find((item) => item.userID === userID);
      setUser(found || null);
    }
  }, [userID]);

  const goBack = () => navigate(`/schoolean-users`);

  const selectedSchool = user?.schoolSummary.find(
    (school) => school.schoolID === schoolID,
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <p className="text-[#4E4E4E] text-[clamp(14px,1.4vw,16px)]">
          User not found
        </p>
        <Button onClick={goBack} size="lg">
          Back to Schoolen Users
        </Button>
      </div>
    );
  }

  return (
    <div className="my-8 mx-6 md:my-10 md:mx-10 font-medium">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent mb-4 md:mb-6"
        onClick={goBack}
      >
        <LeftIcon className="w-6 h-6 md:w-7 md:h-7" />
      </Button>

      <div className="bg-white flex items-center gap-6 md:gap-8 p-5 md:p-8 rounded-[10px] text-[#4E4E4E] border border-[#D9D9D9]">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#D9D9D9] shrink-0" />
        )}

        <div className="flex flex-col gap-4">
          <div className="flex items-center flex-wrap gap-4 md:gap-8">
            <h3 className="font-semibold text-[clamp(16px,2vw,24px)]">
              {user.firstName} {user.lastName}
            </h3>
            <div className="flex items-center gap-5">
              {selectedSchool && (
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
              )}

              {selectedSchool && (
                <StatusView
                  variant="soft"
                  styleOption={true}
                  status={
                    selectedSchool.role === "TEACHER"
                      ? "Teacher"
                      : selectedSchool.role === "SCHOOL_ADMIN"
                        ? "School Admin"
                        : selectedSchool.role === "PARENT"
                          ? "Parent"
                          : selectedSchool.role === "STUDENT"
                            ? "Student"
                            : "Non Academic Staff"
                  }
                  green="Teacher"
                  purple="Parent"
                  blue="School Admin"
                  yellow="Non Academic Staff"
                  pink="Student"
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail2Icon className="w-4 h-4 md:w-5 md:h-5" stroke="#868686" />
            <p>{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <PhoneIcon className="w-4 h-4 md:w-5 md:h-5" fill="#868686" />
            <p>{user.phoneNumber}</p>
          </div>
        </div>
      </div>

      <div className="mt-7 md:mt-9 ">
        <Tabs defaultValue="overview" className="gap-0">
          <div className="w-full pb-2 pt-1 px-1">
            <TabsList className="w-full gap-2 lg:gap-3 rounded-none bg-transparent border-b-2 border-[#D9D9D9]  justify-start">
              <div className="flex items-center gap-10 md:gap-16">
                {[
                  {
                    key: "1",
                    label: "Overview",
                    value: "overview",
                  },
                  {
                    key: "2",
                    label: "Schools",
                    value: "schools",
                  },
                  {
                    key: "3",
                    label: "Roles",
                    value: "roles",
                  },
                  {
                    key: "4",
                    label: "Account Activity",
                    value: "account-activity",
                  },
                ].map((item) => (
                  <TabsTrigger
                    key={item.key}
                    value={item.value}
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-0 data-[state=active]:border-b-3 data-[state=active]:border-[#0EB26B] data-[state=active]:rounded-none text-[#4E4E4E] data-[state=active]:text-[#0EB26B] text-[clamp(14px,1.8vw,20px)] py-1 px-0 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ml:[&_svg:not([class*='size-'])]:size-5"
                  >
                    <p>{item.label}</p>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </div>
          <div className="py-6">
            <TabsContent value="overview">
              {selectedSchool && (
                <SchooleanUserOverview
                  user={user}
                  onAddRoleSchool={() => {}}
                  selectedSchool={selectedSchool}
                />
              )}
            </TabsContent>
            <TabsContent value="schools"> Schools</TabsContent>
            <TabsContent value="roles">Roles</TabsContent>
            <TabsContent value="account-activity">Account Activity</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SchooleanUserDetails;
