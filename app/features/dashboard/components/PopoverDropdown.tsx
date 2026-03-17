import { useState, useRef } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { DownIcon } from "~/assets/icon";

interface DropdownOption {
  label: string;
  value: string;
}

interface PopoverDropdownProps {
  options?: DropdownOption[];
  defaultSelected?: string;
  onChange?: (value: string) => void;
  BtnClassName?: string;
  icon?: React.ReactNode;
}

const PopoverDropdown = ({
  options = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ],
  defaultSelected,
  onChange,
  BtnClassName,
  icon,
}: PopoverDropdownProps) => {
  const initial =
    options.find((o) => o.value === defaultSelected) ?? options[0];

  const [selected, setSelected] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelect = (option: DropdownOption, index: number) => {
    setSelected(option);
    setFocusedIndex(index);
    setIsOpen(false);
    onChange?.(option.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const next = Math.min(focusedIndex + 1, options.length - 1);
        setFocusedIndex(next);
        optionRefs.current[next]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const prev = Math.max(focusedIndex - 1, 0);
        setFocusedIndex(prev);
        optionRefs.current[prev]?.focus();
        break;
      case "Enter":
        handleSelect(options[focusedIndex], focusedIndex);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 text-[clamp(12px,1.2vw,14px)] font-medium text-[#404040] outline-none",
            BtnClassName,
          )}
        >
          {selected.label}

          {icon ? (
            icon
          ) : (
            <DownIcon
              className={`w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit py-1 px-0 border-[1.5px] border-[#92929280] rounded-[5px]"
        sideOffset={6}
        onKeyDown={handleKeyDown}
      >
        {options.map((option, index) => {
          const isSelected = selected === option;
          return (
            <div
              key={option.value}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              tabIndex={0}
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(option, index)}
              onFocus={() => setFocusedIndex(index)}
              className={`flex items-center px-3 py-2 text-[#404040] text-[clamp(12px,1.2vw,14px)] font-semibold cursor-pointer transition-colors outline-none
                ${isSelected ? "border-l-4 border-black" : " border-0 focus:bg-[#F7F7F7]"}
              `}
            >
              {option.label}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverDropdown;
