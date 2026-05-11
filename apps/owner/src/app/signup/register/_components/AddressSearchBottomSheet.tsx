"use client";

import { useEffect, useRef, useState } from "react";
import { BottomSheet, Input } from "@compasser/design-system";
import type { AddressSearchItem } from "../_types/address-search";
import { searchAddressByKakao } from "../_apis/searchAddressBykakao";

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
    if (!open) return;

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

  const handleSelectItem = (item: AddressSearchItem) => {
    onSelectAddress(item);
    onClose();
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
        placeholder="주소를 입력해주세요"
      />

      {results.length > 0 && (
        <div className="mt-[1.2rem] max-h-[32rem] overflow-y-auto">
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectItem(item)}
              className="block w-full border-b border-gray-100 px-[0.6rem] pt-[0.8rem] pb-[1rem] text-left"
            >
              <p className="body2-r text-default">
                {item.roadAddress || item.lotNumberAddress}
              </p>

              {item.roadAddress && item.lotNumberAddress && (
                <p className="caption1-r pt-[0.2rem] text-gray-500">
                  {item.lotNumberAddress}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {keyword.trim() && isSearching && (
        <p className="caption1-r mt-[1.2rem] px-[0.6rem] text-center text-gray-500">
          검색 중...
        </p>
      )}

      {keyword.trim() && !isSearching && results.length === 0 && (
        <p className="caption1-r mt-[1.2rem] px-[0.6rem] text-center text-gray-500">
          검색 결과가 없습니다.
        </p>
      )}
    </BottomSheet>
  );
}