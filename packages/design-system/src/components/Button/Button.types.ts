import type { ButtonHTMLAttributes } from "react";

export type ButtonSize = "lg" | "sm";
export type ButtonVariant = "primary" | "gray" | "secondary";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  pressed?: boolean;
}