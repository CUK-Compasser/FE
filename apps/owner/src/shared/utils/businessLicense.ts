export const normalizeBusinessNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const isValidBusinessNumberFormat = (value: string) => {
  return /^\d{10}$/.test(value);
};

// 체크섬 검증
export const isValidBusinessNumber = (value: string) => {
  const num = normalizeBusinessNumber(value);

  if (!/^\d{10}$/.test(num)) return false;

  const digits = num.split("").map(Number);
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += digits[i] * weights[i];
  }

  sum += Math.floor((digits[8] * 5) / 10);

  const check = (10 - (sum % 10)) % 10;

  return check === digits[9];
};