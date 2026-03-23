"use client";

import type { ButtonProps } from "./Button.types";
import { cn } from "../../libs";

const sizeClasses = {
  lg: "head3-m py-[1.2rem] rounded-[10px]",
  sm: "body1-r py-[0.4rem] rounded-[4px]",
};

const kindClasses = {
  default: "",
  simple: "body1-r py-[0.6rem] px-[2rem] rounded-[999px]",
  register: "body1-r py-[0.2rem] px-[0.8rem] rounded-[8px]",
  move: "body1-r py-[0.4rem] px-[1rem] rounded-[10px]",
};

const getVariantClass = ({
  variant,
  pressed,
  disabled,
}: {
  variant: NonNullable<ButtonProps["variant"]>;
  pressed: boolean;
  disabled: boolean;
}) => {
  if (disabled) {
    return "bg-gray-400 text-inverse border-transparent";
  }

  switch (variant) {
  case "primary":
    return pressed
      ? "bg-primary-button text-inverse border-transparent"
      : "bg-primary text-inverse hover:bg-primary-button active:bg-primary-button border-transparent";

  case "gray":
    return "bg-gray-500 text-inverse border-transparent";

  case "secondary":
    return "bg-secondary text-inverse border-transparent";

  case "outline-primary":
    return pressed
      ? "bg-primary/10 text-primary border border-primary"
      : "bg-transparent text-primary border border-primary hover:bg-primary/10 active:bg-primary/10";

  case "outline-gray":
    return pressed
      ? "bg-gray-100 text-gray-600 border border-gray-600"
      : "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-100 active:bg-gray-100";

  default:
    return "bg-primary text-inverse hover:bg-primary-button active:bg-primary-button border-transparent";
  }
};

export const Button = ({
  type = "button",
  size = "lg",
  kind = "default",
  variant = "primary",
  fullWidth = true,
  pressed = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isDefaultKind = kind === "default";

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center text-center outline-none shrink-0",
        "transition-colors",
        "disabled:cursor-not-allowed",
        fullWidth && "w-full",
        isDefaultKind ? sizeClasses[size] : kindClasses[kind],
        getVariantClass({ variant, pressed, disabled }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};