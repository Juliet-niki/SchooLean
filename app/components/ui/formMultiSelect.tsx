import { useEffect, useMemo, useState } from "react";
import { FormLabel } from "./form";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";
import { cn } from "~/lib/utils";
import { CheckIcon, CloseIcon, SearchIcon, DownIcon } from "~/assets/Icons";
import { useIsMobile } from "~/hooks/useIsMobile";
import SearchInput from "~/components/SearchInput";

interface FormMultiSelectOption {
  id: string;
  label: string;
  value: string;
}

interface FormMultiSelectProps {
  label?: string;
  hasError?: boolean;
  subtext?: React.ReactNode;
  options: FormMultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  selectedLabel?: string;
  modalTitle?: string;
  labelClassName?: string;
  bgclassName?: string;
}

export function FormMultiSelect({
  label,
  hasError,
  subtext,
  options,
  value,
  onChange,
  placeholder = "Select School",
  selectedLabel = "Selected Schools",
  modalTitle = "Select School",
  labelClassName,
  bgclassName,
}: FormMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<string[]>(value);
  const [searchText, setSearchText] = useState("");
  const isMobile = useIsMobile(640);

  // Reset the draft to the real committed value every time the popover opens,
  // so a previous Cancel doesn't leak into the next open.
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
    setDraftValue((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const handleClear = () => setDraftValue([]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    onChange(draftValue);
    setIsOpen(false);
  };

  const handleRemoveChip = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const triggerLabel = value.length > 0 ? selectedLabel : placeholder;

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
                key={opt.id}
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
    <div className="w-full">
      {label && (
        <FormLabel
          className={cn(
            "text-[#868686] text-[clamp(14px,1.6vw,17px)] font-medium mb-2 block",
            labelClassName,
          )}
        >
          {label}
        </FormLabel>
      )}

      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-full h-12 px-3 border rounded-sm bg-white flex items-center justify-between",
                hasError ? "border-[#E93F3F]" : "border-[#CDCDCD]",
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
              <DownIcon className="w-[14px] h-[14px]" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="px-5 py-4">{listContent}</div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-full h-12 px-3 border rounded-sm bg-white flex items-center justify-between",
                hasError ? "border-[#E93F3F]" : "border-[#CDCDCD]",
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
              <DownIcon className="w-3 h-3" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] max-w-[280px] p-6 bg-white"
            sideOffset={5}
            align="end"
          >
            {listContent}
          </PopoverContent>
        </Popover>
      )}

      {/* Selected chips — rendered BELOW the trigger, not inside it */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((val) => {
            const optLabel = options.find((o) => o.value === val)?.label ?? val;
            return (
              <span
                key={val}
                className="flex items-center gap-2 bg-[#0EB26B0D] border border-[#D9D9D9] text-[#4E4E4E] px-3 py-1.5 rounded-[6px] text-[14px] font-medium"
              >
                {optLabel}
                <button type="button" onClick={() => handleRemoveChip(val)}>
                  <CloseIcon className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {subtext && (
        <small
          className={
            hasError ? "text-xs text-[#E93F3F]" : "text-sm text-[#868686]"
          }
        >
          {subtext}
        </small>
      )}
    </div>
  );
}
