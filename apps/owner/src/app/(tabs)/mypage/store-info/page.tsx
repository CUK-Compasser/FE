"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StoreNameField from "@/app/signup/register/_components/fields/StoreNameField";
import EmailField from "@/app/signup/register/_components/fields/EmailField";
import StoreAddressField from "@/app/signup/register/_components/fields/StoreAddressField";
import AccountField from "@/app/signup/register/_components/fields/AccountField";
import BusinessHoursSection from "@/app/signup/register/_components/sections/BusinessHoursSection";
import RandomBoxSection from "@/app/signup/register/_components/sections/RandomBoxSection";
import PhotoUploadSection from "@/app/signup/register/_components/sections/PhotoUploadSection";
import TagSection from "@/app/signup/register/_components/sections/TagSection";
import BusinessHoursModal from "@/app/signup/register/_components/modals/BusinessHoursModal";
import RandomBoxModal from "@/app/signup/register/_components/modals/RandomBoxModal";
import { Button, Header } from "@compasser/design-system";

import {
  businessHoursData,
  dayLabelMap,
  orderedDays,
  initialRandomBoxes,
  tagOptions,
} from "@/app/signup/register/_constants/register";

import type {
  AccountType,
  RandomBoxItem,
  RandomBoxFormValue,
} from "@/app/signup/register/_types/register";

export default function StoreInfoEditPage() {
  const router = useRouter();

  const [selectedAccountType, setSelectedAccountType] =
    useState<AccountType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [randomBoxes, setRandomBoxes] =
    useState<RandomBoxItem[]>(initialRandomBoxes);
  const [selectedRandomBoxIds, setSelectedRandomBoxIds] = useState<number[]>([]);
  const [isBusinessHoursModalOpen, setIsBusinessHoursModalOpen] =
    useState(false);
  const [isRandomBoxModalOpen, setIsRandomBoxModalOpen] = useState(false);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("");

  const businessHoursRows = useMemo(() => {
    return orderedDays.map((day) => {
      const value = businessHoursData[day];
      const formatted = value === "closed" ? "휴무" : value.replace("-", " ~ ");

      return {
        dayLabel: dayLabelMap[day],
        time: formatted,
      };
    });
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    );
  };

  const toggleRandomBoxSelection = (id: number) => {
    setSelectedRandomBoxIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleDeleteRandomBoxes = () => {
    setRandomBoxes((prev) =>
      prev.filter((item) => !selectedRandomBoxIds.includes(item.id))
    );
    setSelectedRandomBoxIds([]);
  };

  const handleOpenRandomBoxModal = () => {
    setIsRandomBoxModalOpen(true);
  };

  const handleCloseRandomBoxModal = () => {
    setIsRandomBoxModalOpen(false);
  };

  const handleSubmitRandomBox = (data: RandomBoxFormValue) => {
    const nextId =
      randomBoxes.length > 0
        ? Math.max(...randomBoxes.map((item) => item.id)) + 1
        : 1;

    setRandomBoxes((prev) => [
      ...prev,
      {
        id: nextId,
        name: data.name,
        quantity: data.quantity,
        price: 0,
        limit: data.limit,
        pickupStartTime: data.pickupStartTime,
        pickupEndTime: data.pickupEndTime,
        description: data.description,
      },
    ]);
  };

  const handleOpenBusinessHoursModal = () => {
    setIsBusinessHoursModalOpen(true);
  };

  const handleCloseBusinessHoursModal = () => {
    setIsBusinessHoursModalOpen(false);
  };

  const handleSubmitBusinessHours = (data: any) => {
    console.log("영업시간 수정", data);
  };

  const handleSearchAddress = () => {
    console.log("주소 검색");
  };

  const handleChangePhoto = (file: File) => {
    setPhotoFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(objectUrl);
  };

  const handleCompleteEdit = () => {
    console.log("수정 파일", photoFile);
    router.push("/mypage");
  };

  return (
    <>
      <div className="flex min-h-dvh flex-col bg-white">
        <Header
          variant="back-title"
          title="스토어 정보 수정"
          onBackClick={() => router.back()}
        />

        <main className="flex min-h-0 flex-1 flex-col bg-white">
          <section className="min-h-0 flex-1 overflow-y-auto px-[1.6rem]">
            <div className="pb-[3.6rem] pt-[1.6rem]">
              <StoreNameField />
              <EmailField />
              <StoreAddressField onSearchAddress={handleSearchAddress} />
              <AccountField
                selectedAccountType={selectedAccountType}
                onSelectAccountType={setSelectedAccountType}
              />

              <BusinessHoursSection
                businessHoursRows={businessHoursRows}
                onOpenBusinessHoursModal={handleOpenBusinessHoursModal}
              />

              <RandomBoxSection
                randomBoxes={randomBoxes}
                selectedRandomBoxIds={selectedRandomBoxIds}
                onToggleRandomBoxSelection={toggleRandomBoxSelection}
                onDeleteRandomBoxes={handleDeleteRandomBoxes}
                onAddRandomBox={handleOpenRandomBoxModal}
              />

              <PhotoUploadSection
                previewUrl={photoPreviewUrl}
                onChangePhoto={handleChangePhoto}
              />

              <TagSection
                tagOptions={tagOptions}
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
              />
            </div>
          </section>

          <div className="shrink-0 px-[1.6rem] pt-[1.6rem] pb-[8rem]">
            <Button
              type="button"
              size="lg"
              kind="default"
              variant="primary"
              onClick={handleCompleteEdit}
            >
              수정 완료하기
            </Button>
          </div>
        </main>
      </div>

      <BusinessHoursModal
        open={isBusinessHoursModalOpen}
        onClose={handleCloseBusinessHoursModal}
        onSubmit={handleSubmitBusinessHours}
      />

      <RandomBoxModal
        open={isRandomBoxModalOpen}
        onClose={handleCloseRandomBoxModal}
        onSubmit={handleSubmitRandomBox}
      />
    </>
  );
}