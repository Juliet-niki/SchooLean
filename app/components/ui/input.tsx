"use client";

import * as React from "react";
import { useState, forwardRef } from "react";
import { HideEyeIcon, ShowEyeIcon } from "~/assets/Icons";
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
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const togglePassword = () => {
      setShowPassword((prev) => {
        const next = !prev;

        if (setShowState) {
          setShowState(next);
        }

        return next;
      });

      if (externalClickAction) {
        externalClickAction();
      }
    };

    const renderRightIcon = () => {
      if (clickAbleRightIcon) {
        return (
          <button type="button" onClick={togglePassword} className="shrink-0">
            {rightIcon}
          </button>
        );
      }

      if (isPassword) {
        return (
          <button
            type="button"
            onClick={togglePassword}
            className="shrink-0"
            aria-label="toggle password visibility"
          >
            {showPassword ? (
              <ShowEyeIcon className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <HideEyeIcon className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        );
      }

      return rightIcon;
    };

    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center border-[1.8px] bg-white px-3 h-12 rounded-[10px] transition focus-within:ring-2",
            hasError
              ? "border-[#E93F3F] focus-within:ring-red-500"
              : "border-[#CDCDCD] focus-within:ring-[#0EB26B]",
            disabled && "bg-[#f0f0f0] opacity-60",
            className,
          )}
        >
          {leftIcon}

          <input
            ref={ref}
            disabled={disabled}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "flex h-full w-full text-[#2B2B2B] placeholder:text-[#868686B2] bg-transparent focus-visible:outline-none disabled:cursor-not-allowed text-[clamp(14px,1.4vw,15px)] font-poppins",
              leftIcon && "pl-3",
              (rightIcon || isPassword) && "pr-3",
              inputClassName,
            )}
            {...props}
          />

          {renderRightIcon()}
        </div>

        {(hasError || subtext) && (
          <small
            className={cn(
              "text-sm mt-1 block",
              hasError ? "text-[#E93F3F]" : "text-[#868686B2]",
            )}
          >
            {subtext ?? (hasError ? "An error occurred" : null)}
          </small>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
