"use client";

import { useMemo, useState } from "react";
import { Button, Modal } from "@compasser/design-system";

import { cn } from "@compasser/design-system";
import {
  dayOptions,
  initialBusinessHourFormValue,
} from "../../_constants/register";
import type {
  BusinessHourFormValue,
  BreakTimeOption,
  DayKey,
} from "../../_types/register";
import TimeRangeField from "./TimeRangeField";

interface BusinessHoursModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<DayKey, BusinessHourFormValue>) => void;
}

const getEmptyBusinessHoursForm = (): Record<DayKey, BusinessHourFormValue> => ({
  mon: { ...initialBusinessHourFormValue },
  tue: { ...initialBusinessHourFormValue },
  wed: { ...initialBusinessHourFormValue },
  thu: { ...initialBusinessHourFormValue },
  fri: { ...initialBusinessHourFormValue },
  sat: { ...initialBusinessHourFormValue },
  sun: { ...initialBusinessHourFormValue },
});

export default function BusinessHoursModal({
  open,
  onClose,
  onSubmit,
}: BusinessHoursModalProps) {
  const [selectedDay, setSelectedDay] = useState<DayKey>("mon");
  const [businessHoursForm, setBusinessHoursForm] = useState<
    Record<DayKey, BusinessHourFormValue>
  >(getEmptyBusinessHoursForm());

  const selectedDayValue = businessHoursForm[selectedDay];

  const updateSelectedDayField = (
    key: keyof BusinessHourFormValue,
    value: string | BreakTimeOption | null
  ) => {
    setBusinessHoursForm((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [key]: value,
      },
    }));
  };

  const handleChangeBreakTimeOption = (value: BreakTimeOption) => {
    setBusinessHoursForm((prev) => {
      const current = prev[selectedDay];

      return {
        ...prev,
        [selectedDay]: {
          ...current,
          hasBreakTime: value,
          ...(value === "no"
            ? {
                breakStartTime: "",
                breakEndTime: "",
              }
            : {}),
        },
      };
    });
  };

  const isDayCompleted = (value: BusinessHourFormValue) => {
    const hasOpenClose = value.openTime.trim() !== "" && value.closeTime.trim() !== "";

    if (!hasOpenClose) {
      return false;
    }

    if (value.hasBreakTime === "no") {
      return true;
    }

    if (value.hasBreakTime === "yes") {
      return (
        value.breakStartTime.trim() !== "" && value.breakEndTime.trim() !== ""
      );
    }

    return false;
  };

  const completedDays = useMemo(() => {
    return dayOptions.reduce<Record<DayKey, boolean>>((acc, day) => {
      acc[day.key] = isDayCompleted(businessHoursForm[day.key]);
      return acc;
    }, {} as Record<DayKey, boolean>);
  }, [businessHoursForm]);

  const isRegisterButtonEnabled = useMemo(() => {
    return dayOptions.some((day) => completedDays[day.key]);
  }, [completedDays]);

  const handleSubmit = () => {
    if (!isRegisterButtonEnabled) {
      return;
    }

    onSubmit?.(businessHoursForm);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="default"
      closeOnOverlayClick
      className="w-[91%] border border-primary px-[1rem] pt-[2.4rem] pb-[1rem]"
      bodyClassName="mt-0"
    >
      <div>
        <div className="flex flex-wrap gap-x-[0.95rem] gap-y-[0.8rem]">
          {dayOptions.map((day) => {
            const isSelected = selectedDay === day.key;
            const isCompleted = completedDays[day.key];

            return (
              <button
                key={day.key}
                type="button"
                onClick={() => setSelectedDay(day.key)}
                className={cn(
                  "flex items-center justify-center rounded-[10px] border px-[1.2rem] py-[1rem]",
                  isSelected
                    ? "border-primary-variant bg-primary-variant"
                    : "border-gray-300 bg-white"
                )}
              >
                <span
                  className={cn(
                    "body1-r",
                    isSelected ? "text-gray-100" : "text-gray-600"
                  )}
                >
                  {day.label}
                </span>

                {isCompleted && !isSelected && (
                  <span className="sr-only">입력 완료</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-[2.8rem]">
          <div className="flex items-center">
            <p className="body1-r shrink-0 text-gray-700">영업시간</p>

            <TimeRangeField
              startTime={selectedDayValue.openTime}
              endTime={selectedDayValue.closeTime}
              onChangeStartTime={(value) => updateSelectedDayField("openTime", value)}
              onChangeEndTime={(value) => updateSelectedDayField("closeTime", value)}
              className="ml-[5.2rem]"
            />
          </div>

          <div className="pt-[1.6rem]">
            <div className="flex items-center">
              <p className="body1-r shrink-0 text-gray-700">브레이크타임</p>

              <div className="ml-[2.5rem] flex items-center gap-[0.4rem]">
                <button
                  type="button"
                  onClick={() => handleChangeBreakTimeOption("yes")}
                  className={cn(
                    "flex items-center justify-center rounded-[10px] border px-[1.2rem] py-[1rem]",
                    selectedDayValue.hasBreakTime === "yes"
                      ? "border-primary-variant bg-primary-variant"
                      : "border-gray-300 bg-white"
                  )}
                >
                  <span
                    className={cn(
                      "body1-r",
                      selectedDayValue.hasBreakTime === "yes"
                        ? "text-gray-100"
                        : "text-gray-600"
                    )}
                  >
                    유
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChangeBreakTimeOption("no")}
                  className={cn(
                    "flex items-center justify-center rounded-[10px] border px-[1.2rem] py-[1rem]",
                    selectedDayValue.hasBreakTime === "no"
                      ? "border-primary-variant bg-primary-variant"
                      : "border-gray-300 bg-white"
                  )}
                >
                  <span
                    className={cn(
                      "body1-r",
                      selectedDayValue.hasBreakTime === "no"
                        ? "text-gray-100"
                        : "text-gray-600"
                    )}
                  >
                    무
                  </span>
                </button>
              </div>
            </div>

            {selectedDayValue.hasBreakTime === "yes" && (
              <div className="pl-[10.6rem] pt-[0.8rem]">
                <TimeRangeField
                  startTime={selectedDayValue.breakStartTime}
                  endTime={selectedDayValue.breakEndTime}
                  onChangeStartTime={(value) =>
                    updateSelectedDayField("breakStartTime", value)
                  }
                  onChangeEndTime={(value) =>
                    updateSelectedDayField("breakEndTime", value)
                  }
                />
              </div>
            )}
          </div>

          <div className="pt-[1.6rem]">
            <Button
              type="button"
              variant="primary"
              size="lg"
              kind="default"
              disabled={!isRegisterButtonEnabled}
              onClick={handleSubmit}
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}