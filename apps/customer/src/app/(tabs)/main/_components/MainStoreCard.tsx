"use client";

import { useRouter } from "next/navigation";
import { Card, Icon } from "@compasser/design-system";
import type { MainStoreItem } from "../_types/main-list";

interface MainStoreCardProps {
  item: MainStoreItem;
}

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

export default function MainStoreCard({ item }: MainStoreCardProps) {
  const router = useRouter();

  const handleMoveStoreDetail = () => {
    router.push(`/main/store/${item.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleMoveStoreDetail}
      className="w-full text-left"
    >
      <Card variant="default">
        <div className="flex">
          <div className="flex h-[11rem] w-[11rem] shrink-0 items-center justify-center rounded-[8px] bg-background">
            <Icon name="Gift" width={80} height={80} ariaHidden={false} />
          </div>

          <div className="ml-[0.6rem] flex min-w-0 flex-1 flex-col">
            <p className="body1-m text-default">{item.itemName}</p>

            <div className="mt-[0.2rem] flex flex-wrap gap-x-[0.6rem]">
              {item.categories.map((category) => (
                <span key={category} className="body2-r text-primary">
                  #{category}
                </span>
              ))}
            </div>

            <p className="mt-[0.2rem] body2-r text-gray-600">
              {item.storeName}
            </p>

            <p className="mt-[0.2rem] body2-r text-gray-600">
              {item.startTime} ~ {item.endTime}
            </p>

            <div className="mt-auto flex justify-end">
              <span className="body1-m text-secondary">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}