"use client";

import type { GetStoreReqDTO } from "@compasser/api";
import KakaoMap from "./KakaoMap";
import type { AddressSearchItem } from "../_types/address-search";

interface MainMapViewProps {
  selectedAddress: AddressSearchItem | null;
  stores: GetStoreReqDTO[];
}

export default function MainMapView({
  selectedAddress,
  stores,
}: MainMapViewProps) {
  return (
    <section className="absolute inset-0">
      <KakaoMap selectedAddress={selectedAddress} stores={stores} />
    </section>
  );
}