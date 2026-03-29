export type DayKey =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export interface StoreBusinessHour {
  open: string;
  close: string;
}

export interface StoreMenuItem {
  id: number;
  name: string;
  remainingCount: number;
  pickupStartTime: string;
  pickupEndTime: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
}

export interface StoreDetailItem {
  id: number;
  storeName: string;
  roadAddress: string;
  lotAddress: string;
  email: string;
  thumbnailImageUrl: string;
  businessHours: Record<DayKey, StoreBusinessHour>;
  menus: StoreMenuItem[];
}