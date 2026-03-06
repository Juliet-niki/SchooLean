import { Button } from "./ui/button";

interface PopUtilityProps {
  title: string;
  subTitle: string;
  handleBtnAtn: () => void;
  btnText: string;
}

const PopUtility = ({
  title,
  subTitle,
  handleBtnAtn,
  btnText,
}: PopUtilityProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <img src="/avatars/successfulPop.svg" alt="Logo" className="w-28 h-28" />

      <div className="text-[#292929] text-center text-[clamp(12px,1.3vw,14px)] flex flex-col gap-2">
        <h2 className="text-[clamp(16px,1.8vw,22px)] font-semibold">{title}</h2>
        <h2>{subTitle}</h2>
      </div>
      <div className="w-[90%] md:w-[80%]">
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="mt-2 w-full bg-linear-to-t from-[#0EB26B] via-[#12A86A] to-[#2f9e8f] hover:bg-linear-to-t hover:from-[#0EB26B]/90 hover:via-[#12A86A]/90 hover:to-[#2f9e8f]/90"
          onClick={handleBtnAtn}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default PopUtility;
