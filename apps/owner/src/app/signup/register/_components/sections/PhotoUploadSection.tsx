"use client";

interface PhotoUploadSectionProps {
  previewUrl: string;
  onChangePhoto: (file: File) => void;
  onRemovePhoto: () => void | Promise<void>;
}

export default function PhotoUploadSection({
  previewUrl,
  onChangePhoto,
  onRemovePhoto,
}: PhotoUploadSectionProps) {
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChangePhoto(file);
  };

  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m text-default">사진 첨부</p>
      <p className="caption1-r text-gray-500">상점의 대표이미지를 추가해주세요!</p>

      <div className="pt-[1.4rem]">
        {previewUrl ? (
          <div className="relative h-[18rem] w-full overflow-hidden rounded-[1.2rem] bg-gray-100">
            <img
              src={previewUrl}
              alt="매장 대표 이미지"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={onRemovePhoto}
              className="absolute right-[0.8rem] top-[0.8rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-white/90 shadow"
              aria-label="사진 삭제"
            >
              <span className="text-[1.8rem] leading-none">×</span>
            </button>
          </div>
        ) : (
          <label className="flex h-[18rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-gray-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChangeFile}
            />
            <span className="caption1-r text-gray-500">이미지 업로드</span>
          </label>
        )}
      </div>
    </div>
  );
}