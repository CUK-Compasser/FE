export type BusinessHours = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
};

export type RandomBoxItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  limit: number;
};

export interface RandomBoxFormValue {
  name: string;
  quantity: number;
  limit: number;
  pickupStartTime: string;
  pickupEndTime: string;
  description: string;
}

export type AccountType = "bank" | "holder";

export type DayKey =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export type BreakTimeOption = "yes" | "no";

export interface BusinessHourFormValue {
  openTime: string;
  closeTime: string;
  hasBreakTime: BreakTimeOption | null;
  breakStartTime: string;
  breakEndTime: string;
}