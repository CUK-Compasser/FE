export const bankOptions = [
  { label: "국민은행", value: "KB" },
  { label: "신한은행", value: "SHINHAN" },
  { label: "우리은행", value: "WOORI" },
  { label: "하나은행", value: "HANA" },
  { label: "농협은행", value: "NH" },
  { label: "기업은행", value: "IBK" },
  { label: "카카오뱅크", value: "KAKAO" },
  { label: "토스뱅크", value: "TOSS" },
  { label: "케이뱅크", value: "K" },
  { label: "새마을금고", value: "SAEMAUL" },
  { label: "수협은행", value: "SUHYUP" },
  { label: "부산은행", value: "BUSAN" },
  { label: "대구은행", value: "DAEGU" },
  { label: "광주은행", value: "GWANGJU" },
  { label: "전북은행", value: "JEONBUK" },
  { label: "경남은행", value: "KYONGNAM" },
] as const;

export type BankLabel = (typeof bankOptions)[number]["label"];
export type BankValue = (typeof bankOptions)[number]["value"];

export const filterBanks = (keyword: string) => {
  const normalized = keyword.trim();
  if (!normalized) return bankOptions;

  return bankOptions.filter((bank) => bank.label.includes(normalized));
};

export const getBankLabel = (value: string) => {
  return bankOptions.find((bank) => bank.value === value)?.label ?? "";
};

export const normalizeAccountNumber = (value: string) => {
  return value.replace(/[^\d-]/g, "");
};