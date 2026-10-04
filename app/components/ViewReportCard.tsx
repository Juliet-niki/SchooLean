import { LeftIcon } from "~/assets/Icons";
import { Button } from "./ui/button";

const ViewReportCard = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-[#EDEDED] min-h-screen w-full flex flex-col gap-5 md:gap-10 items-center px-10 py-5 md:px-20 md:py-10">
      <Button
        variant="ghost"
        size="icon"
        className="h-fit w-fit hover:bg-transparent mr-auto"
        onClick={onBack}
      >
        <LeftIcon className="size-4 md:size-6" />
      </Button>
      <div className="flex-1 flex flex-col gap-10 items-center justify-center">
        <img
          src="/images/reportCard.png"
          alt="Report card"
          className="object-contain w-[600px] h-full"
        />

        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={() => {}}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default ViewReportCard;
