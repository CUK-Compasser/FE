"use client";

import { Icon, Tag } from "@compasser/design-system";
import type { MainCategory, MainSort } from "../_types/main-list";

interface MainFilterTagsProps {
  selectedSort: MainSort;
  selectedCategory: MainCategory | null;
  onOpenSortModal: () => void;
  onCategoryClick: (category: MainCategory) => void;
}

export default function MainFilterTags({
  selectedSort,
  selectedCategory,
  onOpenSortModal,
  onCategoryClick,
}: MainFilterTagsProps) {
  return (
    <div className="flex items-center gap-[0.8rem] overflow-x-auto">
      <Tag
        variant="pill-static"
        className="gap-[0.2rem]"
        onClick={onOpenSortModal}
      >
        <span>{selectedSort}</span>
        <Icon
          name="ChevronDown"
          width={16}
          height={16}
          ariaHidden={false}
        />
      </Tag>

      <Tag
        variant="pill-static"
        onClick={() => onCategoryClick("카페")}
        className={selectedCategory === "카페" ? "!bg-primary !text-inverse" : ""}
      >
        카페
      </Tag>

      <Tag
        variant="pill-static"
        onClick={() => onCategoryClick("베이커리")}
        className={selectedCategory === "베이커리" ? "!bg-primary !text-inverse" : ""}
      >
        베이커리
      </Tag>

      <Tag
        variant="pill-static"
        onClick={() => onCategoryClick("식당")}
        className={selectedCategory === "식당" ? "!bg-primary !text-inverse" : ""}
      >
        식당
      </Tag>
    </div>
  );
}