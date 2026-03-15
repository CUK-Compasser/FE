import { useState } from "react";
import { cn } from "../../libs";
import type { InputProps } from "./Input.types";

export const Input = ({
  type = "text",
  error = false,
  errorMessage,
  className,
  inputClassName,
  disabled = false,
  showPasswordToggle = true,
  inputStyle = "default",
  ...props
}: InputProps) => {
  const isPasswordInput =
    inputStyle === "default" && type === "password";
  const isAddressInput = inputStyle === "address";

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const currentType =
    isPasswordInput && isPasswordVisible ? "text" : type;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex w-full items-center transition-colors",
          isAddressInput
            ? "rounded-[999px] bg-gray-200"
            : [
                "rounded-[8px]",
                "border",
                error
                  ? "border-accent"
                  : "border-gray-500 focus-within:border-primary",
              ],
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <input
          type={currentType}
          disabled={disabled}
          aria-invalid={error}
          className={cn(
            "body1-r w-full outline-none",
            "placeholder:body1-r placeholder:text-gray-500",
            isAddressInput
              ? "rounded-[999px] bg-gray-200 px-[1rem] py-[1rem]"
              : "rounded-[8px] bg-transparent px-[1rem] py-[1.2rem]",
            isPasswordInput && showPasswordToggle && "pr-[0.8rem]",
            inputClassName
          )}
          {...props}
        />

        {isPasswordInput && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
            aria-label={
              isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
            }
            className="flex shrink-0 items-center justify-center px-[1rem] text-gray-500 outline-none"
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && errorMessage && (
        <p className="caption1-r mt-[0.2rem] text-accent">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

const EyeIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12C3.8 8.5 7.4 6 12 6C16.6 6 20.2 8.5 22 12C20.2 15.5 16.6 18 12 18C7.4 18 3.8 15.5 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
};

const EyeOffIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6C10.2 11 10 11.5 10 12C10 13.1 10.9 14 12 14C12.5 14 13 13.8 13.4 13.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 6.7C5 7.8 3.6 9.4 2.5 12C4.3 15.5 7.8 18 12 18C13.9 18 15.6 17.5 17.1 16.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 5.3C10.6 5.1 11.3 5 12 5C16.2 5 19.7 7.5 21.5 11C20.9 12.1 20.2 13.1 19.4 13.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};