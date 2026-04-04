"use client";

import { useState } from "react";
import type { GetStoreReqDTO } from "@compasser/api";
import MainFilterTags from "./MainFilterTags";
import MainStoreCard from "./MainStoreCard";
import SortOptionModal from "./SortOptionModal";
import type { MainCategory, MainSort } from "../_types/main-list";

interface MainListViewProps {
  stores: GetStoreReqDTO[];
  isLoading: boolean;
  selectedSort: MainSort;
  selectedCategory: MainCategory | null;
  onCategoryClick: (category: MainCategory) => void;
  onSelectSort: (sort: MainSort) => void;
}

export default function MainListView({
  stores,
  isLoading,
  selectedSort,
  selectedCategory,
  onCategoryClick,
  onSelectSort,
}: MainListViewProps) {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleOpenSortModal = () => {
    setIsSortModalOpen(true);
  };

  const handleCloseSortModal = () => {
    setIsSortModalOpen(false);
  };

  return (
    <>
      <section className="px-[1.6rem] pt-[1.2rem]">
        <MainFilterTags
          selectedSort={selectedSort}
          selectedCategory={selectedCategory}
          onOpenSortModal={handleOpenSortModal}
          onCategoryClick={onCategoryClick}
        />

        <div className="mt-[1.2rem] flex flex-col gap-[1.2rem] pb-[9.6rem]">
          {isLoading ? (
            <div className="body2-r text-gray-600">로딩중...</div>
          ) : (
            stores.map((item) => (
              <MainStoreCard key={item.storeId} item={item} />
            ))
          )}
        </div>
      </section>

      <SortOptionModal
        open={isSortModalOpen}
        selectedSort={selectedSort}
        onClose={handleCloseSortModal}
        onSelectSort={onSelectSort}
      />
    </>
  );
}