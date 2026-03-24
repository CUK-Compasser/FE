export type MainCategory = "카페" | "베이커리" | "식당";
export type MainSort = "가게 등록순" | "가격순" | "추천순";

export interface MainStoreItem {
  id: number;
  itemName: string;
  categories: MainCategory[];
  primaryCategory: MainCategory;
  storeName: string;
  address: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  openTime: string;
  closeTime: string;
  price: number;
  email: string;
}