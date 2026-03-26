"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { Icon } from "@compasser/design-system";

interface PhotoUploadSectionProps {
  previewUrl?: string;
  onChangePhoto: (file: File) => void;
}

export default function PhotoUploadSection({
  previewUrl,
  onChangePhoto,
}: PhotoUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onChangePhoto(file);

    event.target.value = "";
  };

  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m text-default">사진 첨부</p>
      <p className="caption1-r pb-[0.2rem] text-gray-500">
        상점의 대표 이미지를 추가해주세요!
      </p>

      <button
        type="button"
        onClick={handleOpenFilePicker}
        className="relative flex h-[18rem] w-full items-center justify-center overflow-hidden rounded-[10px] bg-background"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="업로드한 대표 이미지 미리보기"
            fill
            className="object-cover"
          />
        ) : (
          <Icon name="Camera" width={24} height={24} />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
        className="hidden"
      />
    </div>
  );
}