import { useState, useRef, useEffect, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { DownIcon, SearchIcon } from "~/assets/Icons";
import SearchInput from "./SearchInput";

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
  Iconfill?: string;
  label?: string;
  searchInput?: boolean;
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
  Iconfill,
  label,
  searchInput = false,
}: PopoverDropdownProps) => {
  const initial =
    options.find((o) => o.value === defaultSelected) ?? options[0];

  const [selected, setSelected] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelect = (option: DropdownOption, index: number) => {
    setSelected(option);
    setFocusedIndex(index);
    setIsOpen(false);
    setSearchText("");
    onChange?.(option.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const next = Math.min(focusedIndex + 1, filteredOptions.length - 1);
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
        if (filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex], focusedIndex);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const filteredOptions = useMemo(() => {
    if (!searchText.trim()) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
  }, [searchText, options]);

  useEffect(() => {
    if (isOpen) setFocusedIndex(0);
  }, [isOpen]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSearchText("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 text-[clamp(12px,1.2vw,14px)] font-medium text-[#404040] outline-none text-nowrap",
            BtnClassName,
          )}
        >
          {label ?? selected.label}

          {icon ? (
            icon
          ) : (
            <DownIcon
              className={`w-2.5 h-2.5 lg:w-3 lg:h-3 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill={Iconfill}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit py-1 px-0 border-[1.5px] border-[#92929280] rounded-[5px] flex flex-col gap-2 max-h-[65vh]"
        sideOffset={6}
        onKeyDown={handleKeyDown}
      >
        {searchInput && (
          <SearchInput
            key={isOpen ? "open" : "closed"}
            setSearchText={setSearchText}
            className="h-10 border-[#D5D5D5] mx-5 mt-5 w-48"
            leftIcon={<SearchIcon className="h-5 w-5" />}
          />
        )}
        <div className="overflow-y-auto  hide-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = selected.value === option.value;
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
                  className={cn(
                    "flex items-center px-3 py-2 text-[#404040] text-[clamp(12px,1.2vw,14px)] font-semibold cursor-pointer transition-colors outline-none hover:bg-[#F7F7F7]",
                    isSelected && "border-l-4 border-black bg-[#F7F7F7]",
                  )}
                >
                  {option.label}
                </div>
              );
            })
          ) : (
            <p className="px-3 py-2 text-[#404040] text-center text-[clamp(12px,1.2vw,14px)]">
              No results found.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverDropdown;
