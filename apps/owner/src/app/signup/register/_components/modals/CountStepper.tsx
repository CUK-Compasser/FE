"use client";

import { cn } from "@compasser/design-system";

interface CountStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  className?: string;
}

export default function CountStepper({
  value,
  onChange,
  min = 0,
  className,
}: CountStepperProps) {
  const isMinusDisabled = value <= min;

  const handleDecrease = () => {
    if (isMinusDisabled) return;
    onChange(value - 1);
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className={cn("inline-flex items-stretch", className)}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isMinusDisabled}
        className={cn(
          "flex items-center justify-center rounded-l-[4px] border border-r-0 border-gray-300 px-[1.15rem] py-[1.15rem]",
          isMinusDisabled ? "text-gray-300" : "text-gray-600"
        )}
      >
        <span className="body1-r">−</span>
      </button>

      <div className="flex items-center justify-center border border-gray-300 px-[1.6rem] py-[0.6rem]">
        <span className="body1-r text-gray-600">{value}</span>
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        className="flex items-center justify-center rounded-r-[4px] border border-l-0 border-gray-300 px-[1.15rem] py-[1.15rem] text-gray-600"
      >
        <span className="body1-r">+</span>
      </button>
    </div>
  );
}