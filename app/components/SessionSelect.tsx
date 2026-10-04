import { useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { DownIcon } from "~/assets/Icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface SessionOption {
  label: string;
  value: string;
}

interface SessionSelectProps {
  options: SessionOption[];
  value: string;
  onChange: (value: string) => void;
  currentValue?: string;
  currentLabel?: string;
  className?: string;
}

const SessionSelect = ({
  options,
  value,
  onChange,
  currentValue,
  currentLabel = "Current Session",
  className,
}: SessionSelectProps) => {
  const [open, setOpen] = useState(false);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selected = options.find((o) => o.value === value) ?? options[0];
  const triggerLabel =
    selected.value === currentValue ? currentLabel : selected.label;

  const handleSelect = (option: SessionOption) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      optionRefs.current[Math.min(index + 1, options.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      optionRefs.current[Math.max(index - 1, 0)]?.focus();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between gap-2 bg-white border border-[#CACACA] rounded-[5px] px-4 h-9 ml:h-11 min-w-40 md:min-w-60 text-[#4E4E4E] font-semibold text-[clamp(12px,1.4vw,15px)] outline-none cursor-pointer",
            className,
          )}
        >
          {triggerLabel}
          <DownIcon
            className={cn(
              "size-3 transition-transform duration-200",
              open && "rotate-180",
            )}
            fill="#4E4E4E"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[var(--radix-popover-trigger-width)] p-0 py-1 border-[#CACACA] rounded-[5px] overflow-hidden"
      >
        <div
          role="listbox"
          className="flex flex-col max-h-[40vh] overflow-y-auto hide-scrollbar"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "px-4 py-3 text-left font-semibold text-[clamp(13px,1.4vw,15px)] outline-none transition-colors",
                  isSelected
                    ? "bg-[#0EB26B17] text-[#0EB26B]"
                    : "text-[#4E4E4E] hover:bg-[#F7F7F7] focus:bg-[#F7F7F7]",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SessionSelect;
