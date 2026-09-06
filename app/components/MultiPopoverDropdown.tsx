import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "~/hooks/useIsMobile";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { CheckIcon, CloseIcon, DownIcon, SearchIcon } from "~/assets/Icons";
import SearchInput from "./SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface MultiPopoverDropdownOption {
  label: string;
  value: string;
}

interface IProps {
  options: MultiPopoverDropdownOption[];
  value: string[];
  onChange: (value: string[]) => void;
  selectedLabel?: string;
  modalTitle?: string;
  bgclassName?: string;
  label?: string;
  labelClassName?: string;
  leftIcon?: React.ReactNode;
}

const MultiPopoverDropdown = ({
  options,
  value,
  onChange,
  selectedLabel = "Selected School",
  modalTitle = "Filter by School",
  bgclassName,
  label,
  labelClassName,
  leftIcon,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<string[]>(value);
  const [searchText, setSearchText] = useState("");
  const isMobile = useIsMobile(640);

  useEffect(() => {
    if (isOpen) {
      setDraftValue(value);
      setSearchText("");
    }
  }, [isOpen, value]);

  const filteredOptions = useMemo(() => {
    const search = searchText.toLowerCase().trim();
    if (!search) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(search));
  }, [searchText, options]);

  const toggleDraft = (val: string) => {
    setDraftValue((prev) => {
      // "All" is selected
      if (val === "all") {
        return ["all"];
      }

      // Selecting another option removes "all"
      const withoutAll = prev.filter((v) => v !== "all");

      // Unselect the option if already selected
      if (withoutAll.includes(val)) {
        const next = withoutAll.filter((v) => v !== val);

        // If nothing remains, go back to "All"
        return next.length > 0 ? next : ["all"];
      }

      // Add the new option
      return [...withoutAll, val];
    });
  };

  const handleClear = () => setDraftValue([]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    onChange(draftValue);
    setIsOpen(false);
  };

  //   const triggerLabel = value.length > 0 ? selectedLabel : placeholder;

  const triggerLabel =
    value.length === 0 || value.includes("all")
      ? selectedLabel
      : value.length === 1
        ? options.find((option) => option.value === value[0])?.label
        : `${value.length} Selected`;

  const listContent = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[#4E4E4E] text-[clamp(12px,1.4vw,16px)] font-semibold">
          {modalTitle}
        </h2>
        <button type="button" onClick={() => setIsOpen(false)}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      <SearchInput
        setSearchText={setSearchText}
        className="h-10 border-[#D5D5D5] w-full"
        leftIcon={<SearchIcon className="h-4 w-4" />}
        placeholder="Search School..."
      />

      <div className="flex flex-col overflow-y-auto max-h-[35vh]">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt) => {
            const isChecked = draftValue.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggleDraft(opt.value)}
                className="flex items-center gap-3 py-2.5 cursor-pointer"
              >
                {isChecked ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <div className="w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 border-[#4E4E4E]" />
                )}
                <p className="text-[#4E4E4E] text-[clamp(12px,1.2vw,14px)] font-medium">
                  {opt.label}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-[#868686] text-sm py-4">
            No results found.
          </p>
        )}
      </div>
      <hr />
      <div className="flex items-center justify-between pt-2">
        <p className="text-[#868686] text-sm">{draftValue.length} Selected</p>
        <button
          type="button"
          onClick={handleClear}
          className="text-[#0EB26B] text-sm font-medium"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1 bg-[#0EB26B] hover:bg-[#0EB26B]/90 text-white"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <div className="text-[clamp(12px,1.4vw,15px)] font-medium">
      {label && (
        <h2
          className={cn(
            "text-[#4E4E4E] font-semibold mb-2 block text-[clamp(13px,1.5vw,16px)] text-nowrap",
            labelClassName,
          )}
        >
          {label}
        </h2>
      )}
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-full h-12 px-3 border rounded-[5px] bg-white flex items-center justify-between border-[#CACACA] font-medium text-nowrap",
                bgclassName,
              )}
            >
              <span
                className={
                  value.length > 0 ? "text-[#4E4E4E]" : "text-[#868686B2]"
                }
              >
                {triggerLabel}
              </span>
              <DownIcon className="w-[14px] h-[14px]" fill="#4E4E4E" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="px-5 py-4">{listContent}</div>
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-full h-12 px-5 border rounded-[5px] bg-white inline-flex items-center gap-3 justify-between border-[#CACACA] font-medium text-nowrap shrink-0",
                bgclassName,
              )}
            >
              {leftIcon && <span>{leftIcon}</span>}

              <span
                className={
                  value.length > 0 ? "text-[#4E4E4E]" : "text-[#868686B2]"
                }
              >
                {triggerLabel}
              </span>
              <DownIcon className="w-3 h-3" fill="#4E4E4E" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-w-[280px] p-6 bg-white hide-scrollbar"
            sideOffset={5}
            align="end"
          >
            {listContent}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default MultiPopoverDropdown;
