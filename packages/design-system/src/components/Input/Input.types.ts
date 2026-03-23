import type { InputHTMLAttributes } from "react";

export type InputStyle = "default" | "address";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "className"> {
  error?: boolean;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  showPasswordToggle?: boolean;
  inputStyle?: InputStyle;
}