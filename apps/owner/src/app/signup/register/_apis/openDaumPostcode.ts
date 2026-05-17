import { loadDaumPostcode } from "./loadDaumPostcode";
import type {
  AddressSearchItem,
  DaumPostcodeData,
} from "../_types/address-search";

export async function openDaumPostcode(): Promise<AddressSearchItem> {
  await loadDaumPostcode();

  return new Promise((resolve, reject) => {
    if (!window.daum?.Postcode) {
      reject(new Error("Daum Postcode is not loaded."));
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        const roadAddress = data.roadAddress || data.address || "";
        const lotNumberAddress = data.jibunAddress || "";

        resolve({
          id: `${data.zonecode}-${roadAddress || lotNumberAddress}`,
          label: roadAddress || lotNumberAddress,
          roadAddress,
          lotNumberAddress,
          zonecode: data.zonecode,
        });
      },
    }).open();
  });
}