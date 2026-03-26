export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  inputStyle?: "default" | "address";
}