"use client";

import { Tag } from "@compasser/design-system";

type FixedTag = "카페" | "베이커리" | "식당";

interface TagSectionProps {
  tagOptions: FixedTag[];
  selectedTag: FixedTag | "";
  onSelectTag: (tag: FixedTag) => void;
}

export default function TagSection({
  tagOptions,
  selectedTag,
  onSelectTag,
}: TagSectionProps) {
  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m text-default">태그 등록</p>
      <p className="caption1-r text-gray-500">가게의 태그를 선택해주세요!</p>

      <div className="flex flex-wrap gap-[0.8rem] pt-[1.4rem]">
        {tagOptions.map((tag) => (
          <Tag
            key={tag}
            variant="pill-wide"
            selected={selectedTag === tag}
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}