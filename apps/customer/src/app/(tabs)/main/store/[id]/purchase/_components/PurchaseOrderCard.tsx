"use client";

import { Card, Icon } from "@compasser/design-system";
import type { StoreRespDTO, StoreRandomBoxRespDTO } from "@compasser/api";

interface PurchaseOrderCardProps {
  store: StoreRespDTO;
  menu: StoreRandomBoxRespDTO;
  pickupTimeText?: string;
  count: number;
  totalPrice: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

export default function PurchaseOrderCard({
  store,
  menu,
  pickupTimeText,
  count,
  totalPrice,
  onDecrease,
  onIncrease,
}: PurchaseOrderCardProps) {
  return (
    <Card
      variant="default-black-shadow"
      className="overflow-hidden rounded-[10px] border-none bg-inverse p-0"
    >
      <div className="border-b border-gray-500 border-dashed px-[1rem] py-[0.8rem]">
        <div className="flex items-center">
          <Icon
            name="StoreIcon"
            width={20}
            height={20}
            ariaHidden={false}
          />
          <p className="ml-[0.4rem] body2-r text-gray-700">{store.storeName}</p>
        </div>
      </div>

      <div className="px-[1rem] py-[1rem]">
        <div className="flex">
          <div className="flex h-[13rem] w-[13rem] shrink-0 items-center justify-center rounded-[8px] bg-background">
            <Icon name="Gift" width={100} height={100} ariaHidden={false} />
          </div>

          <div className="ml-[0.6rem] flex min-w-0 flex-1 flex-col">
            <p className="body1-m text-default">{menu.boxName}</p>

            {pickupTimeText ? (
              <p className="mt-[0.2rem] body2-r text-gray-600">
                픽업시간: {pickupTimeText}
              </p>
            ) : null}

            <div className="mt-auto flex items-end justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={onDecrease}
                  className="flex h-[2.8rem] w-[2.8rem] items-center justify-center"
                  aria-label="수량 감소"
                >
                  <Icon
                    name="Minus"
                    width={28}
                    height={28}
                    ariaHidden={false}
                  />
                </button>

                <span className="ml-[0.6rem] body1-m text-default">{count}</span>

                <button
                  type="button"
                  onClick={onIncrease}
                  className="ml-[0.6rem] flex h-[2.8rem] w-[2.8rem] items-center justify-center"
                  aria-label="수량 증가"
                  disabled={count >= menu.stock}
                >
                  <Icon
                    name="Plus"
                    width={28}
                    height={28}
                    ariaHidden={false}
                  />
                </button>
              </div>

              <span className="body1-m text-secondary">
                {formatPrice(menu.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500 border-dashed px-[1rem] py-[0.8rem]">
        <div className="flex items-center justify-between">
          <p className="body2-r text-gray-600">총 수량 {count}개</p>
          <p className="body1-m text-secondary">{formatPrice(totalPrice)}</p>
        </div>
      </div>
    </Card>
  );
}