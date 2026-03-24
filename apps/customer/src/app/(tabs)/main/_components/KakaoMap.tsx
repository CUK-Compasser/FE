"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { MOCK_MAIN_STORE_LIST } from "../_constants/MockMainList";
import type { MainCategory, MainStoreItem } from "../_types/main-list";
import MapStoreBottomSheet from "./MapStoreBottomSheet";

declare global {
  interface Window {
    kakao: any;
  }
}

const PIN_IMAGE_MAP: Record<MainCategory, string> = {
  카페: "/icons/pin-cafe.svg",
  베이커리: "/icons/pin-bakery.svg",
  식당: "/icons/pin-restaurant.svg",
};

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRefs = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStore, setSelectedStore] = useState<MainStoreItem | null>(null);

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
          setSelectedStore(null);
        });
      } else {
        mapInstanceRef.current.relayout();
      }

      markerRefs.current.forEach((marker) => marker.setMap(null));
      markerRefs.current = [];

      MOCK_MAIN_STORE_LIST.forEach((store) => {
        const markerImage = new kakaoMaps.MarkerImage(
          PIN_IMAGE_MAP[store.primaryCategory],
          new kakaoMaps.Size(32, 32),
          {
            offset: new kakaoMaps.Point(16, 16),
          },
        );

        const marker = new kakaoMaps.Marker({
          map: mapInstanceRef.current,
          position: new kakaoMaps.LatLng(store.latitude, store.longitude),
          title: store.storeName,
          image: markerImage,
        });

        kakaoMaps.event.addListener(marker, "click", () => {
          setTimeout(() => {
            setSelectedStore(store);
          }, 0);
        });

        markerRefs.current.push(marker);
      });
    });
  }, [isLoaded]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`}
        strategy="afterInteractive"
        onReady={() => setIsLoaded(true)}
      />

      <div ref={mapRef} className="h-full w-full" />

      {selectedStore && (
        <MapStoreBottomSheet
          open={!!selectedStore}
          onClose={() => setSelectedStore(null)}
          id={selectedStore.id}
          storeName={selectedStore.storeName}
          address={selectedStore.address}
          email={selectedStore.email}
          businessHours={`영업중 ${selectedStore.openTime} ~ ${selectedStore.closeTime}`}
        />
      )}
    </>
  );
}