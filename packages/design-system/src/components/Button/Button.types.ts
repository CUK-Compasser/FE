import type { ButtonHTMLAttributes } from "react";

export type ButtonSize = "lg" | "sm";
export type ButtonVariant = "primary" | "gray" | "secondary";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "lg" | "sm";
  kind?: "default" | "simple" | "register" | "move";
  variant?:
    | "primary"
    | "gray"
    | "secondary"
    | "outline-primary"
    | "outline-gray";
  fullWidth?: boolean;
  pressed?: boolean;
}