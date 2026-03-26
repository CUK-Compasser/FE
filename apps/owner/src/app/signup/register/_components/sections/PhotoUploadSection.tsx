"use client";

import { Icon } from "@compasser/design-system";

export default function PhotoUploadSection() {
  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m text-default">사진 첨부</p>
      <p className="caption1-r pb-[0.2rem] text-gray-500">
        상점의 대표 이미지를 추가해주세요!
      </p>

      <button
        type="button"
        className="flex h-[18rem] w-full items-center justify-center rounded-[10px] bg-background"
      >
        <Icon name="Camera" width={24} height={24} />
      </button>
    </div>
  );
}