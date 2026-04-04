"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@compasser/design-system";
import type { GetStoreReqDTO, StoreTag } from "@compasser/api";
import MainListView from "./MainListView";
import MainMapView from "./MainMapView";
import MainViewToggle from "./MainViewToggle";
import AddressSearchBottomSheet from "./AddressSearchBottomSheet";
import type { AddressSearchItem } from "../_types/address-search";
import type { MainCategory, MainSort } from "../_types/main-list";
import { useStores } from "@/shared/queries/query/store/useStores";
import { useStoresByAddress } from "@/shared/queries/query/store/useStoresByAddress";

interface MainPageClientProps {
  view: "list" | "map";
}

export default function MainPageClient({ view }: MainPageClientProps) {
  const router = useRouter();

  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressSearchItem | null>(null);
  const [selectedSort, setSelectedSort] = useState<MainSort>("가게 등록순");
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);

  const [currentCoords, setCurrentCoords] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setCurrentCoords({
          latitude: null,
          longitude: null,
        });
      }
    );
  }, []);

  const selectedAddressLabel = selectedAddress?.label?.trim() ?? "";
  const hasSelectedAddress = Boolean(selectedAddressLabel);

  const {
    data: defaultStores = [],
    isLoading: isDefaultStoresLoading,
  } = useStores(currentCoords.latitude, currentCoords.longitude, 0);

  const {
    data: addressStores = [],
    isLoading: isAddressStoresLoading,
  } = useStoresByAddress(selectedAddressLabel, 0);

  const storesSource = hasSelectedAddress ? addressStores : defaultStores;
  const isLoading = hasSelectedAddress
    ? isAddressStoresLoading
    : isDefaultStoresLoading;

  const handleMoveNotice = () => {
    router.push("/notice");
  };

  const handleOpenAddressSheet = () => {
    setIsAddressSheetOpen(true);
  };

  const handleCloseAddressSheet = () => {
    setIsAddressSheetOpen(false);
  };

  const handleSelectAddress = (address: AddressSearchItem) => {
    setSelectedAddress(address);
    setIsAddressSheetOpen(false);
  };

  const handleCategoryClick = (category: MainCategory) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleSelectSort = (sort: MainSort) => {
    setSelectedSort(sort);
  };

  const filteredAndSortedStores = useMemo(() => {
    let items = [...(storesSource as GetStoreReqDTO[])];

    if (selectedCategory) {
      items = items.filter(
        (item) => mapServerTagToMainCategory(item.tag) === selectedCategory
      );
    }

    if (selectedSort === "추천순") {
      items.sort((a, b) => b.storeId - a.storeId);
    }

    return items;
  }, [storesSource, selectedCategory, selectedSort]);

  return (
    <main className="relative min-h-screen bg-white">
      <div className="sticky top-0 z-30 bg-inverse">
        <Header
          variant="location-search"
          value={selectedAddress?.label ?? ""}
          placeholder="내 주소를 설정해주세요"
          inputReadOnly
          onInputClick={handleOpenAddressSheet}
          onAlarmClick={handleMoveNotice}
        />
      </div>

      <div className="pt-[0.8rem]">
        {view === "list" ? (
          <MainListView
            stores={filteredAndSortedStores}
            isLoading={isLoading}
            selectedSort={selectedSort}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
            onSelectSort={handleSelectSort}
          />
        ) : (
          <MainMapView
            selectedAddress={selectedAddress}
            stores={filteredAndSortedStores}
          />
        )}
      </div>

      <MainViewToggle view={view} />

      <AddressSearchBottomSheet
        open={isAddressSheetOpen}
        onClose={handleCloseAddressSheet}
        onSelectAddress={handleSelectAddress}
      />
    </main>
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