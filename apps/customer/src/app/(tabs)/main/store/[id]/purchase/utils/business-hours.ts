import type { JsonValue } from "@compasser/api";
import type { DayKey } from "../../../_types/store-detail";

export type BusinessHoursValue = Partial<Record<DayKey, string>>;

const DAY_KEYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export function parseBusinessHours(
  value?: JsonValue,
): BusinessHoursValue | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const result: BusinessHoursValue = {};

  for (const key of DAY_KEYS) {
    const item = record[key];
    if (typeof item === "string") {
      result[key] = item;
    }
  }

  return result;
}