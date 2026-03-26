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

export type AccountType = "bank" | "holder";