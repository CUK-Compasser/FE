export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type ServerDayKey = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface BreakTime {
  start: string;
  end: string;
}

export interface BusinessDayValue {
  open: string | null;
  close: string | null;
  "break-time": BreakTime | null;
  closed: boolean;
}

export type BusinessHoursValue = {
  weekly: Record<ServerDayKey, BusinessDayValue>;
} & Record<string, unknown>;

const createBusinessDay = (closed = false): BusinessDayValue => ({
  open: closed ? null : "",
  close: closed ? null : "",
  "break-time": null,
  closed,
});

export const EMPTY_BUSINESS_HOURS: BusinessHoursValue = {
  weekly: {
    MON: createBusinessDay(),
    TUE: createBusinessDay(),
    WED: createBusinessDay(),
    THU: createBusinessDay(),
    FRI: createBusinessDay(),
    SAT: createBusinessDay(),
    SUN: createBusinessDay(true),
  },
};

const normalizeBreakTime = (value: unknown): BreakTime | null => {
  if (!value || typeof value !== "object") return null;

  const breakTime = value as Partial<BreakTime>;

  if (typeof breakTime.start !== "string" || typeof breakTime.end !== "string") {
    return null;
  }

  return {
    start: breakTime.start,
    end: breakTime.end,
  };
};

const normalizeBusinessDay = (
  value: unknown,
  defaultClosed = false,
): BusinessDayValue => {
  if (!value || typeof value !== "object") {
    return createBusinessDay(defaultClosed);
  }

  const day = value as Partial<BusinessDayValue>;

  const closed =
    typeof day.closed === "boolean" ? day.closed : defaultClosed;

  return {
    open: closed ? null : typeof day.open === "string" ? day.open : "",
    close: closed ? null : typeof day.close === "string" ? day.close : "",
    "break-time": normalizeBreakTime(day["break-time"]),
    closed,
  };
};

export const parseBusinessHours = (value: unknown): BusinessHoursValue => {
  if (!value || typeof value !== "object") return EMPTY_BUSINESS_HOURS;

  const obj = value as Partial<BusinessHoursValue>;

  if (!obj.weekly || typeof obj.weekly !== "object") {
    return EMPTY_BUSINESS_HOURS;
  }

  return {
    weekly: {
      MON: normalizeBusinessDay(obj.weekly.MON),
      TUE: normalizeBusinessDay(obj.weekly.TUE),
      WED: normalizeBusinessDay(obj.weekly.WED),
      THU: normalizeBusinessDay(obj.weekly.THU),
      FRI: normalizeBusinessDay(obj.weekly.FRI),
      SAT: normalizeBusinessDay(obj.weekly.SAT),
      SUN: normalizeBusinessDay(obj.weekly.SUN, true),
    },
  };
};