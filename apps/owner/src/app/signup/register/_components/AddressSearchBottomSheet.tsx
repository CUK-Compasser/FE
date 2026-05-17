"use client";

import { useEffect, useRef, useState } from "react";
import { BottomSheet, Button } from "@compasser/design-system";
import type { AddressSearchItem } from "../_types/address-search";
import { openDaumPostcode } from "../_apis/openDaumPostcode";

interface AddressSearchBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onSelectAddress: (item: AddressSearchItem) => void;
}

export default function AddressSearchBottomSheet({
  open,
  onClose,
  onSelectAddress,
}: AddressSearchBottomSheetProps) {
  const [isOpening, setIsOpening] = useState(false);
  const hasOpenedRef = useRef(false);

  const handleOpenPostcode = async () => {
    try {
      setIsOpening(true);

      const selectedAddress = await openDaumPostcode();

      onSelectAddress(selectedAddress);
      onClose();
    } catch (error) {
      console.error("주소 검색 실패", error);
    } finally {
      setIsOpening(false);
    }
  };

  useEffect(() => {
    if (!open) {
      hasOpenedRef.current = false;
      setIsOpening(false);
      return;
    }

    if (hasOpenedRef.current) return;

    hasOpenedRef.current = true;
    void handleOpenPostcode();
  }, [open]);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      variant="default"
      overlay
      closeOnOverlayClick
      showHandle
      className="w-full"
      contentClassName="px-[1.6rem] pt-[0.8rem] pb-[2rem]"
    >
      <div className="pt-[0.8rem]">
        <p className="body2-m text-default">주소를 검색해주세요</p>

        <p className="caption1-r mt-[0.6rem] text-gray-500">
          주소 검색 창에서 주소를 선택하면 상점 주소에 자동으로 입력됩니다.
        </p>

        <Button
          type="button"
          size="lg"
          variant="primary"
          className="mt-[1.6rem]"
          onClick={handleOpenPostcode}
          disabled={isOpening}
        >
          {isOpening ? "주소 검색 여는 중..." : "주소 검색 다시 열기"}
        </Button>
      </div>
    </BottomSheet>
  );
}