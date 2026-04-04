export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type BusinessHoursValue = Record<DayKey, string>;

export const EMPTY_BUSINESS_HOURS: BusinessHoursValue = {
  mon: "",
  tue: "",
  wed: "",
  thu: "",
  fri: "",
  sat: "",
  sun: "",
};

export const parseBusinessHours = (value: unknown): BusinessHoursValue => {
  if (!value || typeof value !== "object") return EMPTY_BUSINESS_HOURS;

  const obj = value as Partial<Record<DayKey, unknown>>;

  return {
    mon: typeof obj.mon === "string" ? obj.mon : "",
    tue: typeof obj.tue === "string" ? obj.tue : "",
    wed: typeof obj.wed === "string" ? obj.wed : "",
    thu: typeof obj.thu === "string" ? obj.thu : "",
    fri: typeof obj.fri === "string" ? obj.fri : "",
    sat: typeof obj.sat === "string" ? obj.sat : "",
    sun: typeof obj.sun === "string" ? obj.sun : "",
  };
};