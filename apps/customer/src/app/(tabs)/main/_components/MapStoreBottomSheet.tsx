"use client";

import { useRouter } from "next/navigation";
import { BottomSheet, Button, Icon } from "@compasser/design-system";

interface MapStoreBottomSheetProps {
  open: boolean;
  onClose: () => void;
  id: number;
  storeName: string;
  address: string;
  email: string;
  businessHours: string;
}

export default function MapStoreBottomSheet({
  open,
  onClose,
  id,
  storeName,
  address,
  email,
  businessHours,
}: MapStoreBottomSheetProps) {
  const router = useRouter();

  const handleMoveStoreDetail = () => {
    router.push(`/main/store/${id}`);
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      variant="map"
      overlay={false}
      closeOnOverlayClick={false}
    >
      <div>
        <div className="flex items-start pt-[1rem]">
          <Icon
            name="StoreIcon"
            width={32}
            height={32}
            ariaHidden={false}
          />

          <div className="ml-[0.4rem]">
            <h3 className="head2-m text-default">{storeName}</h3>
          </div>
        </div>

        <div className="mt-[1.3rem] flex flex-col gap-[0.8rem]">
          <div className="flex items-center gap-[0.8rem]">
            <Icon
              name="LocationIcon"
              width={20}
              height={20}
              ariaHidden={false}
            />
            <span className="body2-r text-gray-700">{address}</span>
          </div>

          <div className="flex items-center gap-[0.8rem]">
            <Icon
              name="Mail"
              width={20}
              height={20}
              ariaHidden={false}
            />
            <span className="body2-r text-gray-700">{email}</span>
          </div>

          <div className="flex items-center gap-[0.8rem]">
            <Icon
              name="Clock"
              width={20}
              height={20}
              ariaHidden={false}
            />
            <span className="body2-r text-gray-700">{businessHours}</span>
          </div>
        </div>

        <div className="mt-[1.6rem]">
          <Button fullWidth onClick={handleMoveStoreDetail}>
            상점 보러가기
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}