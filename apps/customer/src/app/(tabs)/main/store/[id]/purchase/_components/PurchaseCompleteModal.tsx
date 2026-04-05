"use client";

import { useRouter } from "next/navigation";
import { Button, Header, Icon } from "@compasser/design-system";
import type { StoreRespDTO, StoreRandomBoxRespDTO } from "@compasser/api";

interface PurchaseCompleteModalProps {
  isOpen: boolean;
  store: StoreRespDTO;
  menu: StoreRandomBoxRespDTO;
  pickupTimeText: string;
  onClose?: () => void;
}

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

export default function PurchaseCompleteModal({
  isOpen,
  store,
  menu,
  pickupTimeText,
}: PurchaseCompleteModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleConfirm = () => {
    router.push("/main");
  };

  return (
    <div className="fixed inset-0 z-[60] h-screen overflow-hidden bg-inverse">
      <div className="flex h-full w-full flex-col bg-inverse">
        <Header variant="center-title" title="주문 완료" />

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-inverse">
          <div className="flex flex-1 flex-col px-[1.6rem] pb-[1.6rem]">
            <div className="flex flex-col items-center py-[6rem]">
              <Icon
                name="GiftOpen"
                width={120}
                height={120}
                ariaHidden={false}
              />

              <p className="mt-[1.6rem] body1-m text-default">
                결제가 완료되었어요.
              </p>

              <p className="mt-[0.8rem] body1-m text-default">
                픽업 시간에 맞춰 상품을 수령해주세요!
              </p>
            </div>

            <div className="my-[0.9rem] h-[1.2rem] w-full shrink-0 bg-background" />

            <div className="shrink-0">
              <div className="border-b border-gray-500 border-dashed px-[1rem] py-[0.8rem]">
                <div className="flex items-center">
                  <Icon
                    name="StoreIcon"
                    width={20}
                    height={20}
                    ariaHidden={false}
                  />
                  <p className="ml-[0.4rem] body2-r text-gray-700">
                    {store.storeName}
                  </p>
                </div>
              </div>

              <div className="mt-[0.6rem] px-[1rem] py-[1rem]">
                <div className="flex">
                  <div className="flex h-[11rem] w-[11rem] shrink-0 items-center justify-center rounded-[8px] bg-background">
                    <Icon name="Gift" width={80} height={80} ariaHidden={false} />
                  </div>

                  <div className="ml-[0.6rem] flex min-w-0 flex-1 flex-col">
                    <p className="body1-m text-default">{menu.boxName}</p>

                    <p className="mt-[0.2rem] body2-r text-gray-600">
                      픽업시간: {pickupTimeText}
                    </p>

                    <p className="mt-[0.2rem] body2-m text-secondary">
                      {formatPrice(menu.price)}
                    </p>

                    <div className="mt-auto flex justify-end">
                      <span className="body1-m rounded-[999px] border border-primary px-[0.8rem] py-[0.2rem] text-primary">
                        결제 완료
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-[1.6rem]">
              <Button size="lg" variant="primary" onClick={handleConfirm}>
                확인
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}