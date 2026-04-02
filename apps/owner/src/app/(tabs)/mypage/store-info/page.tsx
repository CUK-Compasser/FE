"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Header } from "@compasser/design-system";
import type {
  StoreUpdateReqDTO,
  StoreLocationUpdateReqDTO,
} from "@compasser/api";

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

import { useMyStoreQuery } from "@/shared/queries/query/useMyStoreQuery";
import { usePatchMyStoreMutation } from "@/shared/queries/mutation/auth/usePatchMyStoreMutation";
import { usePatchMyStoreLocationMutation } from "@/shared/queries/mutation/auth/usePatchMyStoreLocationMutation";
import { useRandomBoxListQuery } from "@/shared/queries/query/useRandomBoxListQuery";
import { useCreateRandomBoxMutation } from "@/shared/queries/mutation/auth/useCreateRandomBoxMutation";
import { useUpdateRandomBoxMutation } from "@/shared/queries/mutation/auth/useUpdateRandomBoxMutation";
import { useDeleteRandomBoxMutation } from "@/shared/queries/mutation/auth/useDeleteRandomBoxMutation";
import { useStoreImageQuery } from "@/shared/queries/query/useStoreImageQuery";
import { useUploadStoreImageMutation } from "@/shared/queries/mutation/auth/useUploadStoreImageMutation";
import { useRemoveStoreImageMutation } from "@/shared/queries/mutation/auth/useRemoveStoreImageMutation";

import {
  parseBusinessHours,
  EMPTY_BUSINESS_HOURS,
} from "@/app/signup/register/_utils/business-hours";

type FixedTag = "카페" | "베이커리" | "식당";

export default function StoreInfoEditPage() {
  const router = useRouter();

  const { data: myStore, isLoading: isMyStoreLoading } = useMyStoreQuery();
  const storeId = myStore?.storeId;

  const { data: randomBoxes = [] } = useRandomBoxListQuery(storeId);
  const { data: storeImage } = useStoreImageQuery();

  const patchMyStoreMutation = usePatchMyStoreMutation();
  const patchMyStoreLocationMutation = usePatchMyStoreLocationMutation();
  const createRandomBoxMutation = useCreateRandomBoxMutation();
  const updateRandomBoxMutation = useUpdateRandomBoxMutation();
  const deleteRandomBoxMutation = useDeleteRandomBoxMutation();
  const uploadStoreImageMutation = useUploadStoreImageMutation();
  const removeStoreImageMutation = useRemoveStoreImageMutation();

  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [depositor, setDepositor] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [businessHours, setBusinessHours] = useState(EMPTY_BUSINESS_HOURS);

  const tagOptions: FixedTag[] = ["카페", "베이커리", "식당"];
  const [selectedTag, setSelectedTag] = useState<FixedTag | "">("");

  const [selectedRandomBoxIds, setSelectedRandomBoxIds] = useState<number[]>(
    [],
  );
  const [isBusinessHoursModalOpen, setIsBusinessHoursModalOpen] =
    useState(false);
  const [isRandomBoxModalOpen, setIsRandomBoxModalOpen] = useState(false);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);

  const mapStoreTagToLabel = (tag: string | undefined): FixedTag | "" => {
    switch (tag) {
      case "CAFE":
        return "카페";
      case "BAKERY":
        return "베이커리";
      case "RESTAURANT":
        return "식당";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!myStore) return;

    setStoreName(myStore.storeName ?? "");
    setStoreEmail("");
    setInputAddress(myStore.inputAddress ?? "");
    setBusinessHours(parseBusinessHours(myStore.businessHours));
    setSelectedTag(mapStoreTagToLabel(myStore.tag));
  }, [myStore]);

  useEffect(() => {
    if (!storeImage || imageRemoved) return;
    setPhotoPreviewUrl(storeImage.imageUrl);
  }, [storeImage, imageRemoved]);

  const businessHoursRows = useMemo(() => {
    const dayLabelMap = {
      mon: "월",
      tue: "화",
      wed: "수",
      thu: "목",
      fri: "금",
      sat: "토",
      sun: "일",
    } as const;

    const orderedDays = [
      "mon",
      "tue",
      "wed",
      "thu",
      "fri",
      "sat",
      "sun",
    ] as const;

    return orderedDays.map((day) => {
      const value = businessHours[day];
      const formatted = value === "closed" ? "휴무" : value || "-";

      return {
        dayLabel: dayLabelMap[day],
        time: formatted,
      };
    });
  }, [businessHours]);

  const toggleRandomBoxSelection = (id: number) => {
    setSelectedRandomBoxIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDeleteRandomBoxes = async () => {
    if (!storeId || selectedRandomBoxIds.length === 0) return;

    await Promise.all(
      selectedRandomBoxIds.map((boxId) =>
        deleteRandomBoxMutation.mutateAsync({ storeId, boxId }),
      ),
    );

    setSelectedRandomBoxIds([]);
  };

  const handleSubmitRandomBox = async (form: {
    boxName: string;
    stock: number;
    price: number;
    buyLimit: number;
    content: string;
    boxId?: number;
  }) => {
    if (!storeId) return;

    if (form.boxId) {
      await updateRandomBoxMutation.mutateAsync({
        storeId,
        boxId: form.boxId,
        body: {
          boxName: form.boxName,
          stock: form.stock,
          price: form.price,
          buyLimit: form.buyLimit,
          content: form.content,
        },
      });
      return;
    }

    await createRandomBoxMutation.mutateAsync({
      storeId,
      body: {
        boxName: form.boxName,
        stock: form.stock,
        price: form.price,
        buyLimit: form.buyLimit,
        content: form.content,
      },
    });
  };

  const handleSubmitBusinessHours = (value: typeof businessHours) => {
    setBusinessHours(value);
    setIsBusinessHoursModalOpen(false);
  };

  const handleChangePhoto = (file: File) => {
    setPhotoFile(file);
    setImageRemoved(false);
    setPhotoPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemovePhoto = async () => {
    setPhotoFile(null);
    setPhotoPreviewUrl("");
    setImageRemoved(true);

    if (storeImage) {
      await removeStoreImageMutation.mutateAsync(undefined);
    }
  };

  const handleCompleteEdit = async () => {
    if (!myStore) return;

    const storePayload: StoreUpdateReqDTO = {
      storeName,
      storeEmail,
      bankName,
      depositor,
      bankAccount,
      businessHours,
    };

    const locationPayload: StoreLocationUpdateReqDTO = {
      inputAddress,
    };

    await patchMyStoreMutation.mutateAsync(storePayload);
    await patchMyStoreLocationMutation.mutateAsync(locationPayload);

    if (photoFile) {
      await uploadStoreImageMutation.mutateAsync(photoFile);
    }

    router.push("/mypage");
  };

  if (isMyStoreLoading) {
    return <div>불러오는 중...</div>;
  }

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
              <StoreNameField value={storeName} onChange={setStoreName} />
              <EmailField value={storeEmail} onChange={setStoreEmail} />
              <StoreAddressField
                value={inputAddress}
                onChange={setInputAddress}
                onSearchAddress={() => {}}
              />

              <AccountField
                bankName={bankName}
                depositor={depositor}
                bankAccount={bankAccount}
                onChangeBankName={setBankName}
                onChangeDepositor={setDepositor}
                onChangeBankAccount={setBankAccount}
              />

              <BusinessHoursSection
                businessHoursRows={businessHoursRows}
                onOpenBusinessHoursModal={() =>
                  setIsBusinessHoursModalOpen(true)
                }
              />

              <RandomBoxSection
                randomBoxes={randomBoxes}
                selectedRandomBoxIds={selectedRandomBoxIds}
                onToggleRandomBoxSelection={toggleRandomBoxSelection}
                onDeleteRandomBoxes={handleDeleteRandomBoxes}
                onAddRandomBox={() => setIsRandomBoxModalOpen(true)}
              />

              <PhotoUploadSection
                previewUrl={photoPreviewUrl}
                onChangePhoto={handleChangePhoto}
                onRemovePhoto={handleRemovePhoto}
              />

              <TagSection
                tagOptions={tagOptions}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
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
        onClose={() => setIsBusinessHoursModalOpen(false)}
        initialValue={businessHours}
        onSubmit={handleSubmitBusinessHours}
      />

      <RandomBoxModal
        open={isRandomBoxModalOpen}
        onClose={() => setIsRandomBoxModalOpen(false)}
        onSubmit={handleSubmitRandomBox}
      />
    </>
  );
}