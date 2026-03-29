"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@compasser/design-system";
import MainFilterTags from "./MainFilterTags";
import MainStoreCard from "./MainStoreCard";
import SortOptionModal from "./SortOptionModal";
import { MOCK_MAIN_STORE_LIST } from "../_constants/MockMainList";
import type { MainCategory, MainSort } from "../_types/main-list";

export default function MainListView() {
  const router = useRouter();

  const [selectedSort, setSelectedSort] = useState<MainSort>("가게 등록순");
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleMoveNotice = () => {
    router.push("/notice");
  };

  const handleCategoryClick = (category: MainCategory) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleOpenSortModal = () => {
    setIsSortModalOpen(true);
  };

  const handleCloseSortModal = () => {
    setIsSortModalOpen(false);
  };

  const handleSelectSort = (sort: MainSort) => {
    setSelectedSort(sort);
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = [...MOCK_MAIN_STORE_LIST];

    if (selectedCategory) {
      items = items.filter((item) => item.categories.includes(selectedCategory));
    }

    if (selectedSort === "가격순") {
      items.sort((a, b) => a.price - b.price);
    }

    if (selectedSort === "추천순") {
      items.sort((a, b) => b.id - a.id);
    }

    return items;
  }, [selectedCategory, selectedSort]);

  return (
    <>
      <main className="flex min-h-screen flex-col bg-inverse">
        <Header
          variant="location-search"
          value=""
          placeholder="내 주소를 설정해주세요"
          inputReadOnly
          onAlarmClick={handleMoveNotice}
        />

        <section className="px-[1.6rem] pt-[1.2rem]">
          <MainFilterTags
            selectedSort={selectedSort}
            selectedCategory={selectedCategory}
            onOpenSortModal={handleOpenSortModal}
            onCategoryClick={handleCategoryClick}
          />

          <div className="mt-[1.2rem] flex flex-col gap-[1.2rem] pb-[9.6rem]">
            {filteredAndSortedItems.map((item) => (
              <MainStoreCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <SortOptionModal
        open={isSortModalOpen}
        selectedSort={selectedSort}
        onClose={handleCloseSortModal}
        onSelectSort={handleSelectSort}
      />
    </>
  );
}