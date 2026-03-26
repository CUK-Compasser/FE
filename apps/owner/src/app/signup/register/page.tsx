"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StoreNameField from "./_components/fields/StoreNameField";
import EmailField from "./_components/fields/EmailField";
import StoreAddressField from "./_components/fields/StoreAddressField";
import AccountField from "./_components/fields/AccountField";
import BusinessHoursSection from "./_components/sections/BusinessHoursSection";
import RandomBoxSection from "./_components/sections/RandomBoxSection";
import PhotoUploadSection from "./_components/sections/PhotoUploadSection";
import TagSection from "./_components/sections/TagSection";
import RegisterSubmitButton from "./_components/RegisterSubmitButton";
import BusinessHoursModal from "./_components/modals/BusinessHoursModal";
import RandomBoxModal from "./_components/modals/RandomBoxModal";

import {
  businessHoursData,
  dayLabelMap,
  orderedDays,
  initialRandomBoxes,
  tagOptions,
} from "./_constants/register";

import type {
  AccountType,
  RandomBoxItem,
  RandomBoxFormValue,
} from "./_types/register";

export default function StoreRegisterPage() {
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
    console.log("영업시간 등록", data);
  };

  const handleSearchAddress = () => {
    console.log("주소 검색");
  };

  const handleChangePhoto = (file: File) => {
    setPhotoFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(objectUrl);
  };

  const handleCompleteRegister = () => {
    console.log("업로드 파일", photoFile);
    router.push("/main");
  };

  return (
    <>
      <main className="flex w-full flex-col bg-white">
        <section className="min-h-0 flex-1 overflow-y-auto px-[1.6rem]">
          <div className="pb-[3.6rem]">
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

        <RegisterSubmitButton onClick={handleCompleteRegister} />
      </main>

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