"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@compasser/design-system";
import type { StoreRespDTO } from "@compasser/api";
import { useStoreDetail } from "@/shared/queries/query/store/useStoreDetail";
import StoreMenuCard from "./StoreMenuCard";
import type { DayKey } from "../_types/store-detail";

interface StoreDetailContentProps {
  storeId: number;
}

const DAY_LABEL: Record<DayKey, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

const DAY_ORDER: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const getTodayDayKeyInKorea = (): DayKey => {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date());

  const map: Record<string, DayKey> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  };

  return map[weekday];
};

export default function StoreDetailContent({
  storeId,
}: StoreDetailContentProps) {
  const router = useRouter();
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  const { data: store, isLoading, isError } = useStoreDetail(storeId);

  const todayKey = useMemo(() => getTodayDayKeyInKorea(), []);
  const businessHours = useMemo(
    () => normalizeBusinessHours(store?.businessHours),
    [store?.businessHours]
  );

  const todayHoursText = businessHours[todayKey];
  const currentBusinessText = todayHoursText
    ? `영업중 ${todayHoursText}`
    : "영업시간 정보 없음";

  const thumbnailImageUrl = getThumbnailImageUrl(store);
  const roadAddress = store?.roadAddress ?? "";
  const lotAddress = readJibunAddress(store);
  const email = store?.storeEmail ?? "";
  const menus = store?.randomBoxes ?? [];

  const handleMenuClick = (menuId: number) => {
    router.push(`/main/store/${storeId}/purchase?menuId=${menuId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background">
        <main className="relative z-10 block min-h-screen w-full bg-inverse pt-[2rem] pb-[10rem]">
          <div className="px-[1.6rem]">
            <p className="body2-r text-gray-700">로딩중...</p>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !store) {
    return (
      <div className="min-h-screen w-full bg-background">
        <main className="relative z-10 block min-h-screen w-full bg-inverse pt-[2rem] pb-[10rem]">
          <div className="px-[1.6rem]">
            <p className="body2-r text-gray-700">
              가게 정보를 불러오지 못했습니다.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="h-[20rem] w-full overflow-hidden">
        {thumbnailImageUrl ? (
          <img
            src={thumbnailImageUrl}
            alt={store.storeName}
            className="block h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-background">
            <Icon name="Gift" width={80} height={80} ariaHidden={false} />
          </div>
        )}
      </div>

      <main className="relative z-10 mt-[-1.6rem] block min-h-[calc(100vh-18.4rem)] w-full rounded-t-[20px] bg-inverse pt-[2rem] pb-[10rem]">
        <div className="px-[1.6rem]">
          <h1 className="head2-m text-default">{store.storeName}</h1>

          <div className="mt-[1.2rem]">
            <div className="flex items-start">
              <div className="pt-[0.1rem]">
                <Icon
                  name="LocationIcon"
                  width={20}
                  height={20}
                  ariaHidden={false}
                />
              </div>

              <div className="ml-[0.2rem]">
                <p className="body2-r text-gray-700">{roadAddress}</p>
                <p className="body2-r text-gray-700">{lotAddress}</p>
              </div>
            </div>

            <div className="mt-[0.8rem] flex items-start">
              <div className="pt-[0.1rem]">
                <Icon
                  name="Mail"
                  width={20}
                  height={20}
                  ariaHidden={false}
                />
              </div>

              <div className="ml-[0.2rem]">
                <p className="body2-r text-gray-700">{email}</p>
              </div>
            </div>

            <div className="mt-[0.8rem]">
              <div className="flex items-start">
                <div className="pt-[0.1rem]">
                  <Icon
                    name="Clock"
                    width={20}
                    height={20}
                    ariaHidden={false}
                  />
                </div>

                <div className="ml-[0.2rem] flex flex-1 items-center">
                  <p className="body2-r text-gray-700">{currentBusinessText}</p>

                  <button
                    type="button"
                    onClick={() => setIsHoursOpen((prev) => !prev)}
                    className="ml-[0.4rem] flex h-[1.6rem] w-[1.6rem] items-center justify-center"
                    aria-label={isHoursOpen ? "영업시간 접기" : "영업시간 펼치기"}
                  >
                    <Icon
                      name={isHoursOpen ? "ToggleUp" : "ToggleDown"}
                      width={16}
                      height={16}
                      ariaHidden={false}
                    />
                  </button>
                </div>
              </div>

              {isHoursOpen && (
                <div className="ml-[2.2rem] mt-[0.4rem] flex flex-col gap-[0.4rem]">
                  {DAY_ORDER.map((day) => {
                    const hour = businessHours[day];
                    const isToday = day === todayKey;

                    return (
                      <div key={day} className="flex items-center gap-[0.6rem]">
                        <span
                          className={
                            isToday
                              ? "body2-m text-gray-700"
                              : "body2-r text-gray-700"
                          }
                        >
                          {DAY_LABEL[day]}
                        </span>
                        <span
                          className={
                            isToday
                              ? "body2-m text-gray-700"
                              : "body2-r text-gray-700"
                          }
                        >
                          {hour ?? "정보 없음"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mt-[1.8rem]">
            <div className="flex items-center gap-[0.4rem]">
              <Icon name="Menu" width={24} height={24} ariaHidden={false} />
              <h2 className="head3-m text-primary">메뉴</h2>
            </div>

            <div className="mt-[1.6rem] flex flex-col gap-[1.2rem]">
              {menus.map((menu) => (
                <StoreMenuCard
                  key={menu.boxId}
                  item={{
                    boxId: menu.boxId,
                    storeId: store.storeId,
                    boxName: menu.boxName,
                    stock: menu.stock,
                    price: menu.price,
                    buyLimit: menu.buyLimit,
                    content: menu.content,
                    saleStatus: menu.saleStatus,
                  }}
                  onClick={() => handleMenuClick(menu.boxId)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getThumbnailImageUrl(store?: StoreRespDTO) {
  if (!store?.images || store.images.length === 0) {
    return "";
  }

  return store.images[0]?.imageUrl ?? "";
}

function readJibunAddress(store?: StoreRespDTO) {
  if (!store) {
    return "";
  }

  return (store as StoreRespDTO & { jibunAddres?: string }).jibunAddress
    ?? (store as StoreRespDTO & { jibunAddres?: string }).jibunAddres
    ?? "";
}

function normalizeBusinessHours(raw?: unknown): Record<DayKey, string> {
  const emptyValue: Record<DayKey, string> = {
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  };

  if (!raw || typeof raw !== "object") {
    return emptyValue;
  }

  const source = raw as Record<string, string>;

  return {
    mon: source.mon ?? "",
    tue: source.tue ?? "",
    wed: source.wed ?? "",
    thu: source.thu ?? "",
    fri: source.fri ?? "",
    sat: source.sat ?? "",
    sun: source.sun ?? "",
  };
}