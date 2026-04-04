"use client";

import { useRouter } from "next/navigation";
import { Card, Icon } from "@compasser/design-system";
import type { GetStoreReqDTO, StoreTag } from "@compasser/api";

interface MainStoreCardProps {
  item: GetStoreReqDTO;
}

export default function MainStoreCard({ item }: MainStoreCardProps) {
  const router = useRouter();

  const handleMoveStoreDetail = () => {
    router.push(`/main/store/${item.storeId}`);
  };

  return (
    <button
      type="button"
      onClick={handleMoveStoreDetail}
      className="w-full text-left"
    >
      <Card variant="default">
        <div className="flex">
          <div className="flex h-[11rem] w-[11rem] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-background">
            {item.storeImage ? (
              <img
                src={item.storeImage}
                alt={item.storeName}
                className="block h-full w-full object-cover"
              />
            ) : (
              <Icon name="Gift" width={80} height={80} ariaHidden={false} />
            )}
          </div>

          <div className="ml-[0.6rem] flex min-w-0 flex-1 flex-col">
            <p className="body1-m text-default">{item.storeName}</p>

            <div className="mt-[0.2rem] flex flex-wrap gap-x-[0.6rem]">
              <span className="body2-r text-primary">
                #{mapServerTagToLabel(item.tag)}
              </span>
            </div>

            <p className="mt-[0.2rem] body2-r text-gray-600 line-clamp-2">
              {item.storeDetails}
            </p>

            <p className="mt-[0.2rem] body2-r text-gray-600">
              {formatBusinessHours(item.businessHours)}
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
}

function mapServerTagToLabel(tag: StoreTag) {
  switch (tag) {
    case "CAFE":
      return "카페";
    case "BAKERY":
      return "베이커리";
    case "RESTAURANT":
      return "식당";
  }
}

function formatBusinessHours(raw?: unknown) {
  if (!raw || typeof raw !== "object") {
    return "영업시간 정보 없음";
  }

  const businessHours = raw as Record<string, string>;

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  const dayMap: Record<string, string> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  };

  const todayKey = dayMap[weekday];
  const todayHour = businessHours[todayKey];

  if (!todayHour) {
    return "영업시간 정보 없음";
  }

  return `영업중 ${todayHour}`;
}