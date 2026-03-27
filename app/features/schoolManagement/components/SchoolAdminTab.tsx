import { AdminIcon, MoreIcon } from "~/assets/icons";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ISchool } from "~/types";

const SchoolAdminTab = ({ school }: { school: ISchool }) => {
  return (
    <div className="text-[#4E4E4E] grid grid-cols-1 ml:grid-cols-2 gap-6 ml:gap-8 ">
      <div className="rounded-[10px] border border-[#F3F3F3] shadow-md shadow-[#0000001A]">
        <div className="bg-[#0EB26B21] rounded-t-[10px] flex items-center gap-2 px-4.5 py-3.5">
          <AdminIcon className="w-5 h-5" />
          <h2 className="text-[clamp(14px,1.4vw,16px)]">Super Admins</h2>
        </div>
        <div className="divide-y divide-[#EBEBEB] flex flex-col">
          {school.admins
            .filter((admin) => admin.role === "Super Admin")
            .map((admin, index) => (
              <div key={index} className="flex items-center p-4">
                <div className="flex items-center gap-3">
                  {admin.profilePic ? (
                    <img
                      src={admin.profilePic}
                      alt={admin.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D9D9D9]" />
                  )}

                  <div>
                    <p className="font-bold text-[clamp(14px,1.4vw,16px)] mb-1">
                      {admin.name}
                    </p>
                    <p className="text-[clamp(11px,1.1vw,13px)]">
                      {admin.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 ml-auto">
                  <div className="flex ml:flex-col lg:flex-row items-center gap-2">
                    <Button
                      size="sm"
                      className="text-[clamp(11px,1.1vw,13px)] font-medium w-24"
                      onClick={() => {}}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className="text-[clamp(11px,1.1vw,13px)] font-medium w-24"
                      onClick={() => {}}
                    >
                      Change Role
                    </Button>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className="cursor-pointer">
                          <MoreIcon className="w-5 h-5 rotate-90" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-fit py-1 px-2 border-[1.5px] border-[#92929280] rounded-[5px] mr-8  text-[clamp(12px,1.2vw,14px)] font-medium"
                        sideOffset={2}
                      >
                        <div className="flex flex-col gap-2 mb-2">
                          {[
                            {
                              label: "Login History",
                              color: "text-[#404040",
                              onClick: () => {},
                            },
                            {
                              label: "Deactivate",
                              color: "text-[#DD3232]",
                              onClick: () => {},
                            },
                          ].map((option) => (
                            <p
                              key={option.label}
                              className={`cursor-pointer hover:bg-[#F7F7F7] py-1 px-4 rounded-xs ${option.color}`}
                              onClick={option.onClick}
                            >
                              {option.label}
                            </p>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded-[10px] border border-[#F3F3F3] shadow-md shadow-[#0000001A]">
        <div className="bg-[#0EB26B21] rounded-t-[10px] flex items-center gap-2 px-4.5 py-3.5">
          <AdminIcon className="w-5 h-5" />
          <h2 className="text-[clamp(14px,1.4vw,16px)]">Sub-Admins</h2>
        </div>
        <div className="divide-y divide-[#EBEBEB] flex flex-col">
          {school.admins
            .filter((admin) => admin.role === "Sub Admin")
            .map((admin, index) => (
              <div key={index} className="flex items-center gap-3 p-4">
                <div className="flex items-center gap-3">
                  {admin.profilePic ? (
                    <img
                      src={admin.profilePic}
                      alt={admin.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 lg:w-14 lg:h-14  rounded-full bg-[#D9D9D9]" />
                  )}

                  <div>
                    <p className="font-bold text-[clamp(14px,1.4vw,16px)] mb-1">
                      {admin.name}
                    </p>
                    <p className="text-[clamp(12px,1.2vw,14px)]">
                      {admin.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 ml-auto">
                  <div className="flex ml:flex-col lg:flex-row items-center gap-2">
                    <Button
                      size="sm"
                      className="text-[clamp(11px,1.1vw,13px)] font-medium w-24"
                      onClick={() => {}}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className="text-[clamp(11px,1.1vw,13px)] font-medium w-24"
                      onClick={() => {}}
                    >
                      Change Role
                    </Button>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className="cursor-pointer">
                          <MoreIcon className="w-5 h-5 rotate-90" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-fit py-1 px-2 border-[1.5px] border-[#92929280] shadow-md shadow-[#00000026]  rounded-[5px] mr-8  text-[13px] font-medium"
                        sideOffset={2}
                      >
                        <div className="flex flex-col gap-2 mb-2">
                          {[
                            {
                              label: "Login History",
                              color: "text-[#404040",
                              onClick: () => {},
                            },
                            {
                              label: "Deactivate",
                              color: "text-[#DD3232]",
                              onClick: () => {},
                            },
                          ].map((option) => (
                            <p
                              key={option.label}
                              className={`cursor-pointer hover:bg-[#F7F7F7] py-1 px-4 rounded-lg ${option.color}`}
                              onClick={option.onClick}
                            >
                              {option.label}
                            </p>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminTab;
