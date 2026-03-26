import type {
  BusinessHours,
  RandomBoxItem,
  DayKey,
  BusinessHourFormValue,
} from "../_types/register";

export const businessHoursData: BusinessHours = {
  fri: "09:00-21:00",
  mon: "09:00-21:00",
  sat: "10:00-18:00",
  sun: "closed",
  thu: "09:00-21:00",
  tue: "09:00-21:00",
  wed: "09:00-21:00",
};

export const dayLabelMap: Record<keyof BusinessHours, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

export const orderedDays: (keyof BusinessHours)[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export const initialRandomBoxes: RandomBoxItem[] = [
  { id: 1, name: "Level.1", quantity: 5, price: 6000, limit: 1 },
  { id: 2, name: "Level.2", quantity: 3, price: 10000, limit: 1 },
  { id: 3, name: "Level.3", quantity: 1, price: 15000, limit: 1 },
];

export const tagOptions = ["카페", "베이커리", "식당"];

export const dayOptions: { key: DayKey; label: string }[] = [
  { key: "mon", label: "월" },
  { key: "tue", label: "화" },
  { key: "wed", label: "수" },
  { key: "thu", label: "목" },
  { key: "fri", label: "금" },
  { key: "sat", label: "토" },
  { key: "sun", label: "일" },
];

export const initialBusinessHourFormValue: BusinessHourFormValue = {
  openTime: "",
  closeTime: "",
  hasBreakTime: null,
  breakStartTime: "",
  breakEndTime: "",
};