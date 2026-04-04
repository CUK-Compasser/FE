"use client";

import { useEffect, useRef, useState } from "react";
import { BottomSheet, Input, Icon } from "@compasser/design-system";
import type { AddressSearchItem } from "../_types/address-search";
import { searchAddressByKakao } from "../_apis/searchAddressByKakao";

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
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<AddressSearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setKeyword("");
      setResults([]);
      setIsSearching(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      try {
        setIsSearching(true);
        const searched = await searchAddressByKakao(trimmedKeyword, 10);
        setResults(searched);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [keyword, open]);

  const handleQuickSelect = () => {
    onSelectAddress({
      id: "catholic-univ",
      label: "가톨릭대 주변 탐색",
      lotNumberAddress: "경기도 부천시 원미구 역곡동 일대",
      roadAddress: "가톨릭대학교 성심교정 주변",
      longitude: 126.8016,
      latitude: 37.4875,
    });
  };

  const handleSelectItem = (item: AddressSearchItem) => {
    onSelectAddress(item);
  };

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
      <Input
        inputStyle="address"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="위치 입력"
      />

      <button
        type="button"
        onClick={handleQuickSelect}
        className="ml-[0.6rem] mt-[1rem] inline-flex items-center rounded-[999px] border border-secondary-variant px-[0.8rem] py-[0.2rem]"
      >
        <Icon
          name="Pin"
          width={20}
          height={20}
          className="mr-[0.4rem]"
        />
        <span className="body2-r text-default">가톨릭대 주변 탐색</span>
      </button>

      {results.length > 0 && (
        <div className="mt-[1.2rem] max-h-[32rem] overflow-y-auto">
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectItem(item)}
              className="block w-full border-b border-gray-100 px-[0.6rem] pt-[0.6rem] pb-[0.8rem] text-left"
            >
              <p className="body2-r text-default">{item.lotNumberAddress}</p>
              <p className="caption1-r text-gray-500">{item.roadAddress}</p>
            </button>
          ))}
        </div>
      )}

      {keyword.trim() && isSearching && (
        <p className="mt-[1.2rem] px-[0.6rem] text-center caption1-r text-gray-500">
          검색 중...
        </p>
      )}

      {keyword.trim() && !isSearching && results.length === 0 && (
        <p className="mt-[1.2rem] px-[0.6rem] text-center caption1-r text-gray-500">
          검색 결과가 없습니다.
        </p>
      )}
    </BottomSheet>
  );
}