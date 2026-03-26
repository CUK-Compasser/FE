"use client";

import { useRef } from "react";
import { cn } from "@compasser/design-system";

interface TimeRangeFieldProps {
  startTime: string;
  endTime: string;
  onChangeStartTime: (value: string) => void;
  onChangeEndTime: (value: string) => void;
  className?: string;
}

const formatTime = (value: string) => {
  return value && value.trim() !== "" ? value : "00:00";
};

export default function TimeRangeField({
  startTime,
  endTime,
  onChangeStartTime,
  onChangeEndTime,
  className,
}: TimeRangeFieldProps) {
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);

  const openStartPicker = () => {
    if (!startInputRef.current) return;

    if ("showPicker" in HTMLInputElement.prototype) {
      startInputRef.current.showPicker();
      return;
    }

    startInputRef.current.focus();
    startInputRef.current.click();
  };

  const openEndPicker = () => {
    if (!endInputRef.current) return;

    if ("showPicker" in HTMLInputElement.prototype) {
      endInputRef.current.showPicker();
      return;
    }

    endInputRef.current.focus();
    endInputRef.current.click();
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-[8px] border border-gray-300 px-[1rem] py-[1rem]",
        className
      )}
    >
      <button
        type="button"
        onClick={openStartPicker}
        className="body1-r shrink-0 text-gray-600"
      >
        {formatTime(startTime)}
      </button>

      <span className="body1-r px-[0.8rem] text-gray-600">~</span>

      <button
        type="button"
        onClick={openEndPicker}
        className="body1-r shrink-0 text-gray-600"
      >
        {formatTime(endTime)}
      </button>

      <input
        ref={startInputRef}
        type="time"
        value={startTime}
        onChange={(event) => onChangeStartTime(event.target.value)}
        className="absolute h-0 w-0 opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />

      <input
        ref={endInputRef}
        type="time"
        value={endTime}
        onChange={(event) => onChangeEndTime(event.target.value)}
        className="absolute h-0 w-0 opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}