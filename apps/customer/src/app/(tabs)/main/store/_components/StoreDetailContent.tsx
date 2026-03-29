"use client";

import { useMemo, useState } from "react";
import { Icon } from "@compasser/design-system";
import StoreMenuCard from "./StoreMenuCard";
import type { DayKey, StoreDetailItem } from "../_types/store-detail";

interface StoreDetailContentProps {
  store: StoreDetailItem;
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
  store,
}: StoreDetailContentProps) {
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  const todayKey = useMemo(() => getTodayDayKeyInKorea(), []);
  const todayHours = store.businessHours[todayKey];

  const currentBusinessText = `영업중 ${todayHours.open} ~ ${todayHours.close}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="h-[20rem] w-full overflow-hidden">
        <img
          src={store.thumbnailImageUrl}
          alt={store.storeName}
          className="h-full w-full object-cover"
        />
      </div>

      <section className="relative z-10 mt-[-1.6rem] min-h-[calc(100vh-18.4rem)] rounded-t-[20px] bg-inverse px-[1.6rem] pt-[2rem] pb-[10rem]">
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
              <p className="body2-r text-gray-700">{store.roadAddress}</p>
              <p className="body2-r text-gray-700">{store.lotAddress}</p>
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
              <p className="body2-r text-gray-700">{store.email}</p>
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
                  const hour = store.businessHours[day];
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
                        {hour.open} ~ {hour.close}
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
            {store.menus.map((menu) => (
              <StoreMenuCard key={menu.id} item={menu} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}