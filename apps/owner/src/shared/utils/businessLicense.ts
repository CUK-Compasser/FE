export const normalizeBusinessNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const isValidBusinessNumberFormat = (value: string) => {
  return /^\d{10}$/.test(normalizeBusinessNumber(value));
};

export const isValidBusinessNumber = (value: string) => {
  return /^\d{10}$/.test(normalizeBusinessNumber(value));
};