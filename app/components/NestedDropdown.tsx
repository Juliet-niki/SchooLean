import { DownIcon } from "~/assets/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SubOption {
  label: string;
  value: string;
  classArm?: string[];
}

interface NestedDropdownProps {
  label: string;
  options: SubOption[];
  selectedValue?: string;
  selectedArm?: string;
  onChange: (value: string, arm?: string) => void;
  BtnClassName?: string;
  Iconfill?: string;
}

const NestedDropdown = ({
  label,
  options,
  selectedValue,
  selectedArm,
  onChange,
  BtnClassName,
  Iconfill = "#000",
}: NestedDropdownProps) => {
  const getLabel = () => {
    if (!selectedValue || selectedValue === "all") return label;
    if (selectedArm) return selectedArm;
    return selectedValue;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`border border-[#D5D5D5] rounded-[5px] px-2.5 py-1.5 text-[#4E4E4E] font-semibold flex items-center gap-1 text-[clamp(12px,1.2vw,14px)] outline-none ${BtnClassName ?? ""}`}
        >
          {getLabel()}
          <DownIcon className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill={Iconfill} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onChange("all", "")}>
          All {label}
        </DropdownMenuItem>
        {options
          .filter((o) => o.value !== "all")
          .map((option) =>
            option.classArm && option.classArm.length > 0 ? (
              <DropdownMenuSub key={option.value}>
                <DropdownMenuSubTrigger>{option.label}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => onChange(option.value, "")}
                    >
                      All {option.label}
                    </DropdownMenuItem>
                    {option.classArm.map((arm) => (
                      <DropdownMenuItem
                        key={arm}
                        onClick={() => onChange(option.value, arm)}
                      >
                        {arm}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onChange(option.value, "")}
              >
                {option.label}
              </DropdownMenuItem>
            ),
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NestedDropdown;
