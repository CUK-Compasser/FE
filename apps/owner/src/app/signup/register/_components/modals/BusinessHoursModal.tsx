"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Modal, cn } from "@compasser/design-system";
import TimeRangeField from "./TimeRangeField";
import {
  EMPTY_BUSINESS_HOURS,
  parseBusinessHours,
  type BusinessDayValue,
  type BusinessHoursValue,
  type DayKey,
  type ServerDayKey,
} from "../../_utils/business-hours";

type BreakTimeOption = "yes" | "no" | null;

interface BusinessHourFormValue {
  openTime: string;
  closeTime: string;
  closed: boolean;
  hasBreakTime: BreakTimeOption;
  breakStartTime: string;
  breakEndTime: string;
}

interface BusinessHoursModalProps {
  open: boolean;
  onClose: () => void;
  initialValue?: BusinessHoursValue;
  onSubmit?: (data: BusinessHoursValue) => void;
}

const dayOptions: {
  key: DayKey;
  serverKey: ServerDayKey;
  label: string;
}[] = [
  { key: "mon", serverKey: "MON", label: "월" },
  { key: "tue", serverKey: "TUE", label: "화" },
  { key: "wed", serverKey: "WED", label: "수" },
  { key: "thu", serverKey: "THU", label: "목" },
  { key: "fri", serverKey: "FRI", label: "금" },
  { key: "sat", serverKey: "SAT", label: "토" },
  { key: "sun", serverKey: "SUN", label: "일" },
];

const initialBusinessHourFormValue: BusinessHourFormValue = {
  openTime: "",
  closeTime: "",
  closed: false,
  hasBreakTime: null,
  breakStartTime: "",
  breakEndTime: "",
};

const getEmptyBusinessHoursForm = (): Record<DayKey, BusinessHourFormValue> => ({
  mon: { ...initialBusinessHourFormValue },
  tue: { ...initialBusinessHourFormValue },
  wed: { ...initialBusinessHourFormValue },
  thu: { ...initialBusinessHourFormValue },
  fri: { ...initialBusinessHourFormValue },
  sat: { ...initialBusinessHourFormValue },
  sun: {
    ...initialBusinessHourFormValue,
    closed: true,
  },
});

const getDayOption = (day: DayKey) => {
  return dayOptions.find((option) => option.key === day);
};

const toFormValue = (
  source?: BusinessHoursValue,
): Record<DayKey, BusinessHourFormValue> => {
  const normalized = parseBusinessHours(source);
  const base = getEmptyBusinessHoursForm();

  dayOptions.forEach(({ key, serverKey }) => {
    const value = normalized.weekly[serverKey];

    base[key] = {
      openTime: value.open ?? "",
      closeTime: value.close ?? "",
      closed: value.closed,
      hasBreakTime: value["break-time"] ? "yes" : "no",
      breakStartTime: value["break-time"]?.start ?? "",
      breakEndTime: value["break-time"]?.end ?? "",
    };
  });

  return base;
};

const toBusinessDayValue = (
  value: BusinessHourFormValue,
): BusinessDayValue => {
  if (value.closed) {
    return {
      open: null,
      close: null,
      "break-time": null,
      closed: true,
    };
  }

  return {
    open: value.openTime,
    close: value.closeTime,
    "break-time":
      value.hasBreakTime === "yes"
        ? {
            start: value.breakStartTime,
            end: value.breakEndTime,
          }
        : null,
    closed: false,
  };
};

export default function BusinessHoursModal({
  open,
  onClose,
  initialValue,
  onSubmit,
}: BusinessHoursModalProps) {
  const [selectedDay, setSelectedDay] = useState<DayKey>("mon");
  const [businessHoursForm, setBusinessHoursForm] = useState<
    Record<DayKey, BusinessHourFormValue>
  >(getEmptyBusinessHoursForm());

  useEffect(() => {
    if (!open) return;

    setBusinessHoursForm(toFormValue(initialValue));
    setSelectedDay("mon");
  }, [open, initialValue]);

  const selectedDayValue = businessHoursForm[selectedDay];

  const updateSelectedDayField = (
    key: keyof BusinessHourFormValue,
    value: string | boolean | BreakTimeOption,
  ) => {
    setBusinessHoursForm((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [key]: value,
      },
    }));
  };

  const handleChangeClosed = (closed: boolean) => {
    setBusinessHoursForm((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        closed,
        ...(closed
          ? {
              openTime: "",
              closeTime: "",
              hasBreakTime: "no" as BreakTimeOption,
              breakStartTime: "",
              breakEndTime: "",
            }
          : {}),
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
    if (value.closed) return true;

    const hasOpenClose =
      value.openTime.trim() !== "" && value.closeTime.trim() !== "";

    if (!hasOpenClose) return false;
    if (value.hasBreakTime === "no" || value.hasBreakTime === null) return true;

    return (
      value.breakStartTime.trim() !== "" &&
      value.breakEndTime.trim() !== ""
    );
  };

  const completedDays = useMemo(() => {
    return dayOptions.reduce<Record<DayKey, boolean>>((acc, day) => {
      acc[day.key] = isDayCompleted(businessHoursForm[day.key]);
      return acc;
    }, {} as Record<DayKey, boolean>);
  }, [businessHoursForm]);

  const isRegisterButtonEnabled = useMemo(() => {
    return dayOptions.every((day) => completedDays[day.key]);
  }, [completedDays]);

  const handleSubmit = () => {
    if (!isRegisterButtonEnabled) return;

    const formatted: BusinessHoursValue = {
      weekly: {
        ...EMPTY_BUSINESS_HOURS.weekly,
      },
    };

    (Object.keys(businessHoursForm) as DayKey[]).forEach((day) => {
      const dayOption = getDayOption(day);
      if (!dayOption) return;

      formatted.weekly[dayOption.serverKey] = toBusinessDayValue(
        businessHoursForm[day],
      );
    });

    onSubmit?.(formatted);
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
                    : isCompleted
                      ? "border-primary bg-white"
                      : "border-gray-300 bg-white",
                )}
              >
                <span
                  className={cn(
                    "body1-r",
                    isSelected ? "text-gray-100" : "text-gray-600",
                  )}
                >
                  {day.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-[2.8rem]">
          <div className="flex items-center">
            <p className="body1-r shrink-0 text-gray-700">휴무 여부</p>

            <div className="ml-[3.8rem] flex items-center gap-[0.4rem]">
              <button
                type="button"
                onClick={() => handleChangeClosed(false)}
                className={cn(
                  "flex items-center justify-center rounded-[10px] border px-[1.2rem] py-[1rem]",
                  !selectedDayValue.closed
                    ? "border-primary-variant bg-primary-variant"
                    : "border-gray-300 bg-white",
                )}
              >
                <span
                  className={cn(
                    "body1-r",
                    !selectedDayValue.closed ? "text-gray-100" : "text-gray-600",
                  )}
                >
                  영업
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleChangeClosed(true)}
                className={cn(
                  "flex items-center justify-center rounded-[10px] border px-[1.2rem] py-[1rem]",
                  selectedDayValue.closed
                    ? "border-primary-variant bg-primary-variant"
                    : "border-gray-300 bg-white",
                )}
              >
                <span
                  className={cn(
                    "body1-r",
                    selectedDayValue.closed ? "text-gray-100" : "text-gray-600",
                  )}
                >
                  휴무
                </span>
              </button>
            </div>
          </div>

          {!selectedDayValue.closed && (
            <>
              <div className="flex items-center pt-[1.6rem]">
                <p className="body1-r shrink-0 text-gray-700">영업시간</p>

                <TimeRangeField
                  startTime={selectedDayValue.openTime}
                  endTime={selectedDayValue.closeTime}
                  onChangeStartTime={(value) =>
                    updateSelectedDayField("openTime", value)
                  }
                  onChangeEndTime={(value) =>
                    updateSelectedDayField("closeTime", value)
                  }
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
                          : "border-gray-300 bg-white",
                      )}
                    >
                      <span
                        className={cn(
                          "body1-r",
                          selectedDayValue.hasBreakTime === "yes"
                            ? "text-gray-100"
                            : "text-gray-600",
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
                          : "border-gray-300 bg-white",
                      )}
                    >
                      <span
                        className={cn(
                          "body1-r",
                          selectedDayValue.hasBreakTime === "no"
                            ? "text-gray-100"
                            : "text-gray-600",
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
            </>
          )}

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