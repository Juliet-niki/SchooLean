// import type React from "react";
// import { FormLabel } from "./form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./select";
// import { cn } from "~/lib/utils";

// interface FormSelectProps {
//   label?: string;
//   hasError?: boolean;
//   subtext?: React.ReactNode;
//   placeholder?: string;
//   options: readonly { label: string; value: string }[];
//   value?: string;
//   onChange?: (value: string) => void;
//   labelClassName?: string;
//   bgclassName?: string;
// }

// export function FormSelect({
//   label,
//   hasError,
//   subtext,
//   placeholder = "Select an option",
//   options,
//   value,
//   onChange,
//   labelClassName,
//   bgclassName,
// }: FormSelectProps) {
//   return (
//     <div className="w-full ">
//       {label && (
//         <FormLabel
//           className={cn(
//             "text-[#868686] text-[clamp(14px,1.6vw,17px)] font-medium mb-2 block",
//             labelClassName,
//           )}
//         >
//           {label}
//         </FormLabel>
//       )}

//       <Select value={value} onValueChange={onChange}>
//         <SelectTrigger
//           className={cn(
//             "w-full h-12 border px-3 py-6 rounded-sm focus:ring-1 bg-white text-[#4E4E4E] text-[clamp(15px,1.6vw,18px)] font-medium",
//             hasError
//               ? "border-[#E93F3F] focus:ring-[#E93F3F]"
//               : "border-[#CDCDCD] focus-within:ring-[#0EB26B]",
//             bgclassName,
//           )}
//         >
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//         <SelectContent className="bg-[#ECECEC] border border-[#D9D9D9]  mt-12">
//           {options.map((opt) => (
//             <SelectItem key={opt.value} value={opt.value}>
//               {opt.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {(hasError || subtext) && (
//         <small
//           className={
//             hasError ? "text-xs text-[#E93F3F]" : "text-sm text-[#868686]"
//           }
//         >
//           {subtext ?? (hasError ? "An error occurred" : "")}
//         </small>
//       )}
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { DownIcon, SearchIcon } from "~/assets/Icons";
import SearchInput from "../SearchInput";

interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  label?: string;
  hasError?: boolean;
  subtext?: React.ReactNode;
  placeholder?: string;
  options: readonly FormSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  triggerclassName?: string;
  searchInput?: boolean;
  contentClassName?: string;
}

export function FormSelect({
  label,
  hasError,
  subtext,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  triggerclassName,
  searchInput = true,
  contentClassName,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchText.trim()) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
  }, [searchText, options]);

  const handleSelect = (option: FormSelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchText("");
  };

  return (
    <div className="w-full">
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSearchText("");
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full h-12 border px-3 rounded-sm bg-white text-[clamp(14px,1.4vw,15px)] font-medium flex items-center justify-between gap-4",
              selectedOption ? "text-[#4E4E4E]" : "text-[#868686B2]",
              hasError
                ? "border-[#E93F3F]"
                : isOpen
                  ? "border-[#0EB26B] border-2"
                  : "border-[#CDCDCD]",
              triggerclassName,
            )}
          >
            <span>{selectedOption?.label ?? placeholder}</span>
            <DownIcon
              className={cn(
                "w-[14px] h-[14px] transition-transform duration-200 shrink-0",
                isOpen && "rotate-180",
              )}
              fill="#4E4E4E"
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "w-fit p-2 bg-white border border-[#92929280] max-h-[65vh] flex flex-col gap-2",
            contentClassName,
          )}
          sideOffset={5}
          align="end"
        >
          {searchInput && (
            <SearchInput
              key={isOpen ? "open" : "closed"}
              setSearchText={setSearchText}
              className="h-9 border-[#D5D5D5] w-full"
              leftIcon={<SearchIcon className="h-5 w-5" />}
            />
          )}

          <div className="overflow-y-auto hide-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value === option.value;
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onClick={() => handleSelect(option)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleSelect(option);
                    }}
                    className={cn(
                      "flex items-center px-3 py-2 text-[#4E4E4E] text-[clamp(13px,1.4vw,15px)] font-medium cursor-pointer transition-colors outline-none hover:bg-[#F7F7F7]",
                      isSelected && "border-l-4 border-black bg-[#F7F7F7]",
                    )}
                  >
                    {option.label}
                  </div>
                );
              })
            ) : (
              <p className="px-3 py-2 text-[#868686] text-center text-[clamp(12px,1.3vw,14px)]">
                No results found.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {(hasError || subtext) && (
        <small
          className={
            hasError ? "text-xs text-[#E93F3F]" : "text-sm text-[#868686]"
          }
        >
          {subtext ?? (hasError ? "An error occurred" : "")}
        </small>
      )}
    </div>
  );
}
