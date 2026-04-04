"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type {
  GetStoreReqDTO,
  SimpleStoreInfoDTO,
  StoreTag,
} from "@compasser/api";
import type { MainCategory } from "../_types/main-list";
import type { AddressSearchItem } from "../_types/address-search";
import { useStoreSimple } from "@/shared/queries/query/store/useStoreSimple";
import MapStoreBottomSheet from "./MapStoreBottomSheet";

interface KakaoMapProps {
  selectedAddress: AddressSearchItem | null;
  stores: GetStoreReqDTO[];
}

const PIN_IMAGE_MAP: Record<MainCategory, string> = {
  카페: "/icons/pin-cafe.svg",
  베이커리: "/icons/pin-bakery.svg",
  식당: "/icons/pin-restaurant.svg",
};

export default function KakaoMap({ selectedAddress, stores }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<KakaoMapInstance | null>(null);
  const markerRefs = useRef<KakaoMarker[]>([]);
  const selectedMarkerRef = useRef<KakaoMarker | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const { data: simpleStore } = useStoreSimple(selectedStoreId);

  useEffect(() => {
    if (window.kakao?.maps) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const kakaoMaps = window.kakao.maps;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new kakaoMaps.Map(mapRef.current, {
          center: new kakaoMaps.LatLng(37.4866, 126.8045),
          level: 4,
        });

        kakaoMaps.event.addListener(mapInstanceRef.current, "click", () => {
          setSelectedStoreId(null);
        });
      } else {
        mapInstanceRef.current.relayout();
      }

      markerRefs.current.forEach((marker) => marker.setMap(null));
      markerRefs.current = [];

      stores.forEach((store) => {
        const markerImage = new kakaoMaps.MarkerImage(
          PIN_IMAGE_MAP[mapServerTagToMainCategory(store.tag)],
          new kakaoMaps.Size(32, 32),
          {
            offset: new kakaoMaps.Point(16, 16),
          }
        );

        const marker = new kakaoMaps.Marker({
          map: mapInstanceRef.current,
          position: new kakaoMaps.LatLng(store.latitude, store.longitude),
          title: store.storeName,
          image: markerImage,
        });

        kakaoMaps.event.addListener(marker, "click", () => {
          setTimeout(() => {
            setSelectedStoreId(store.storeId);
          }, 0);
        });

        markerRefs.current.push(marker);
      });

      if (selectedAddress) {
        const selectedPosition = new kakaoMaps.LatLng(
          selectedAddress.latitude,
          selectedAddress.longitude
        );

        mapInstanceRef.current.setCenter(selectedPosition);

        if (selectedMarkerRef.current) {
          selectedMarkerRef.current.setMap(null);
        }

        selectedMarkerRef.current = new kakaoMaps.Marker({
          map: mapInstanceRef.current,
          position: selectedPosition,
        });
      } else if (stores.length > 0) {
        const firstStore = stores[0];
        mapInstanceRef.current.setCenter(
          new kakaoMaps.LatLng(firstStore.latitude, firstStore.longitude)
        );
      }
    });
  }, [isLoaded, stores, selectedAddress]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onReady={() => setIsLoaded(true)}
      />

      <div ref={mapRef} className="h-full w-full" />

      {selectedStoreId && simpleStore && (
        <MapStoreBottomSheet
          open={!!selectedStoreId}
          onClose={() => setSelectedStoreId(null)}
          id={simpleStore.storeId}
          storeName={simpleStore.storeName}
          roadAddress={simpleStore.roadAddress}
          jibunAddress={simpleStore.jibunAddress}
          email={simpleStore.storeEmail}
          businessHours={readTodayBusinessHours(simpleStore)}
        />
      )}
    </>
  );
}

function mapServerTagToMainCategory(tag: StoreTag): MainCategory {
  switch (tag) {
    case "CAFE":
      return "카페";
    case "BAKERY":
      return "베이커리";
    case "RESTAURANT":
      return "식당";
  }
}

function readStoreAddress(store: SimpleStoreInfoDTO) {
  return store.roadAddress || store.jibunAddress || "";
}

function readTodayBusinessHours(store: SimpleStoreInfoDTO) {
  const raw = store.businessHours;

  if (!raw || typeof raw !== "object") {
    return "";
  }

  const businessHours = raw as Record<string, string>;

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  const dayMap: Record<string, string> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  };

  const todayKey = dayMap[weekday];
  return businessHours[todayKey] ?? "";
}