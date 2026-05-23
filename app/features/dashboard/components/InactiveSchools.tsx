import { LeftIcon, MailIcon, PhoneIcon } from "~/assets/Icons";
import { Button } from "~/components/ui/button";
import { INACTIVE_SCHOOLS_DATA } from "~/data/schoolData";

const InactiveSchools = ({ onBack }: { onBack?: () => void }) => {
  return (
    <div className="flex flex-col gap-10 px-10 py-8 w-full">
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit hover:bg-transparent"
        onClick={onBack}
      >
        <LeftIcon className="h-6 w-6" />
      </Button>
      <div className="w-full flex flex-col gap-6">
        {INACTIVE_SCHOOLS_DATA.map((item, index) => (
          <div
            key={index}
            className="flex items-start text-[#3C3C3C] font-medium bg-white shadow-sm shadow-[#0000001A] rounded-[15px] px-4 lg:px-7 py-4 gap-3 lg:gap-5 w-full"
          >
            <img
              src={item.logo}
              alt="school logo"
              className="h-auto w-16 lg:w-20"
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-[clamp(14px,1.6vw,18px)]">
                {item.name}
              </h2>
              <div className="h-1 w-full bg-linear-to-r from-white via-[#0EB26B] to-white " />
              <div className="text-[clamp(12px,1.4vw,16px)] flex items-center gap-5 lg:gap-10">
                <div className="flex items-center gap-2">
                  <span className="bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] rounded-[7px] p-1 flex items-center justify-center">
                    <PhoneIcon className="w-4 h-4" />
                  </span>
                  <p>
                    Contact Phone No:{" "}
                    <span className="text-nowrap">{item.phone}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] rounded-[7px] p-1 flex items-center justify-center">
                    <MailIcon className="w-4 h-4" />
                  </span>
                  <p>Email: {item.email}</p>
                </div>
              </div>
              <div className="bg-[#0EB26B24] rounded-[10px] px-5 py-2 text-[clamp(10px,1.2vw,14px)] flex items-center gap-3 w-fit mt-2">
                <p>Last Active:</p>
                <span className="w-3 h-3 rounded-[2px] bg-[#585858]"></span>
                <p className="text-[#B11F21]">{item.lastActive}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InactiveSchools;
