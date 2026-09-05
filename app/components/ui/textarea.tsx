import React from "react";
import { cn } from "~/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  subtext?: React.ReactNode;
  textareaClassName?: string;
  hasCharacterCount?: boolean;
  maxLength?: number;
}

const DEFAULT_MAX_CHARACTER_LENGTH = 1000;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      hasError,
      subtext,
      textareaClassName,
      hasCharacterCount,
      maxLength = DEFAULT_MAX_CHARACTER_LENGTH,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const setRef = (el: HTMLTextAreaElement) => {
      internalRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          el;
    };

    const handleInput = () => {
      const el = internalRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 70) + "px";
    };

    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        <div
          className={cn(
            "relative flex items-start border bg-background px-3 py-2 rounded-[10px] transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-[#0EB26B] focus-within:border-[#CDCDCD]",
            hasError ? "border-red-500" : "border-[#CDCDCD]",
            props.disabled && "bg-[#f0f0f0]",
            className,
          )}
        >
          <textarea
            ref={setRef}
            onInput={handleInput}
            value={value}
            maxLength={maxLength}
            onChange={(e) => onChange?.(e)}
            className={cn(
              "flex w-full h-auto text-[clamp(14px,1.4vw,15px)] text-[#4E4E4E] resize-none rounded-[10px] placeholder-shown:text-[#868686B2] placeholder:text-[clamp(13px,1.4vw,15px)] placeholder:text-[#868686B2] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto hide-scrollbar font-poppins",
              textareaClassName,
            )}
            {...props}
          />
          {hasCharacterCount && (
            <span className="absolute bottom-3 right-4 text-[clamp(12px,1.2vw,14px)] text-[#868686]">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
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
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
