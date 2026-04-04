"use client";

import type { AddressSearchItem } from "../_types/address-search";

export function searchAddressByKakao(
  keyword: string,
  size = 10
): Promise<AddressSearchItem[]> {
  return new Promise((resolve, reject) => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      resolve([]);
      return;
    }

    if (
      typeof window === "undefined" ||
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services
    ) {
      reject(new Error("Kakao services library is not loaded."));
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      trimmedKeyword,
      (result: KakaoAddressSearchResult[], status: string) => {
        const { kakao } = window;

        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          resolve([]);
          return;
        }

        if (status !== kakao.maps.services.Status.OK) {
          reject(new Error("주소 검색 중 오류가 발생했습니다."));
          return;
        }

        const mapped = result.slice(0, size).map(
          (item: KakaoAddressSearchResult, index: number) => {
            const lotNumberAddress =
              item.address?.address_name || item.address_name || "";

            const roadAddress =
              item.road_address?.address_name || item.address_name || "";

            return {
              id: `${item.x}-${item.y}-${index}`,
              label: roadAddress || lotNumberAddress,
              lotNumberAddress,
              roadAddress,
              longitude: Number(item.x),
              latitude: Number(item.y),
            };
          }
        );

        resolve(mapped);
      },
      {
        page: 1,
        size,
        analyze_type: window.kakao.maps.services.AnalyzeType.SIMILAR,
      }
    );
  });
}