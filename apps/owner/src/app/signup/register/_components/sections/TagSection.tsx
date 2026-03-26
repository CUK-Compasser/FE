"use client";

import { Tag } from "@compasser/design-system";

interface TagSectionProps {
  tagOptions: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export default function TagSection({
  tagOptions,
  selectedTags,
  onToggleTag,
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
            selected={selectedTags.includes(tag)}
            onClick={() => onToggleTag(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}