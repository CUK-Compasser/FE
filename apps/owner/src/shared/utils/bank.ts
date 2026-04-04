export const bankNameOptions = [
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "카카오뱅크",
  "토스뱅크",
  "케이뱅크",
  "새마을금고",
  "수협은행",
  "부산은행",
  "대구은행",
  "광주은행",
  "전북은행",
  "경남은행",
] as const;

export const filterBankNames = (keyword: string) => {
  const normalized = keyword.trim();
  if (!normalized) return bankNameOptions;
  return bankNameOptions.filter((bank) => bank.includes(normalized));
};

export const normalizeAccountNumber = (value: string) => {
  return value.replace(/[^\d-]/g, "");
};