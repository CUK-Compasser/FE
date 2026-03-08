import type { ButtonProps } from "./Button.types";
import { cn } from "../../libs";

const sizeClasses = {
  lg: "head3-m py-[1.2rem] rounded-[10px]",
  sm: "body1-r py-[0.4rem] rounded-[4px]",
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
    return "bg-gray-400 text-inverse";
  }

  switch (variant) {
    case "primary":
      return pressed
        ? "bg-primary-button text-inverse"
        : "bg-primary text-inverse hover:bg-primary-button active:bg-primary-button";

    case "gray":
      return "bg-gray-500 text-inverse";

    case "secondary":
      return "bg-secondary text-inverse";

    default:
      return "bg-primary text-inverse hover:bg-primary-button active:bg-primary-button";
  }
};

export const Button = ({
  type = "button",
  size = "lg",
  variant = "primary",
  fullWidth = true,
  pressed = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center text-center border-0 outline-none shrink-0",
        "transition-colors",
        "disabled:cursor-not-allowed",
        fullWidth && "w-full",
        sizeClasses[size],
        getVariantClass({ variant, pressed, disabled }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};