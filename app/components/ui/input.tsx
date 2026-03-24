"use client";
import * as React from "react";
import { useState } from "react";
import { HideEyeIcon, ShowEyeIcon } from "~/assets/icons";
import { cn } from "~/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  hasError?: boolean;
  subtext?: React.ReactNode;
  clickAbleRightIcon?: boolean;
  setShowState?: (value: boolean) => void;
  externalClickAction?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type = "text",
      leftIcon,
      rightIcon,
      hasError,
      subtext,
      clickAbleRightIcon,
      setShowState,
      externalClickAction,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const getRightIcon = () => {
      if (clickAbleRightIcon) {
        if (setShowState) {
          setShowState(show);
        }
        const handleRightIconClick = () => {
          setShow(!show);
          if (externalClickAction) {
            externalClickAction();
          }
        };
        return (
          <button onClick={handleRightIconClick} type="button">
            {rightIcon}
          </button>
        );
      }

      if (type === "password") {
        return (
          <button onClick={() => setShow(!show)} type="button">
            {show ? (
              <ShowEyeIcon className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <HideEyeIcon className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        );
      } else {
        return rightIcon;
      }
    };

    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center border-[1.8px] bg-white px-3 h-12 rounded-[10px] has-focus:ring-2 has-placeholder-shown:text-[#ACACAC]",
            hasError
              ? "border-[#E93F3F] has-focus:ring-red-500"
              : "border-[#CDCDCD] has-focus:ring-[#0EB26B]",
            props.disabled && "bg-[#f0f0f0]",
            className,
          )}
        >
          {leftIcon}
          <input
            type={type === "password" ? (show ? "text" : "password") : type}
            className={cn(
              "flex h-full w-full text-[#2B2B2B] placeholder-shown:text-[#ACACAC] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#ACACAC] placeholder:font-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-[clamp(14px,1.4vw,15px)] font-poppins",
              rightIcon ? "pr-3" : "",
              leftIcon ? "pl-3" : "",
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
          {getRightIcon()}
        </div>
        {(hasError || subtext) && (
          <small
            className={
              hasError ? "text-sm text-[#E93F3F]" : "text-sm text-[#ACACAC]"
            }
          >
            {subtext ?? (hasError ? "An error ocurred" : "")}
          </small>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
