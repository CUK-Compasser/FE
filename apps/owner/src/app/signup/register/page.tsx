"use client";

import { useMemo, useState } from "react";
import {
  Input,
  Button,
  Tag,
  Card,
  Icon,
} from "@compasser/design-system";

type BusinessHours = {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
};

type RandomBoxItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  limit: number;
};

const businessHoursData: BusinessHours = {
  fri: "09:00-21:00",
  mon: "09:00-21:00",
  sat: "10:00-18:00",
  sun: "closed",
  thu: "09:00-21:00",
  tue: "09:00-21:00",
  wed: "09:00-21:00",
};

const dayLabelMap: Record<keyof BusinessHours, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

const orderedDays: (keyof BusinessHours)[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

const initialRandomBoxes: RandomBoxItem[] = [
  { id: 1, name: "Level.1", quantity: 5, price: 6000, limit: 1 },
  { id: 2, name: "Level.2", quantity: 3, price: 10000, limit: 1 },
  { id: 3, name: "Level.3", quantity: 1, price: 15000, limit: 1 },
];

const tagOptions = ["카페", "베이커리", "식당"];

export default function StoreRegisterPage() {
  const [selectedAccountType, setSelectedAccountType] = useState<
    "bank" | "holder" | null
  >(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [randomBoxes, setRandomBoxes] =
    useState<RandomBoxItem[]>(initialRandomBoxes);

  const [selectedRandomBoxIds, setSelectedRandomBoxIds] = useState<number[]>(
    []
  );

  const businessHoursRows = useMemo(() => {
    return orderedDays.map((day) => {
      const value = businessHoursData[day];
      const formatted =
        value === "closed"
          ? "휴무"
          : value.replace("-", " ~ ");

      return {
        dayLabel: dayLabelMap[day],
        time: formatted,
      };
    });
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    );
  };

  const toggleRandomBoxSelection = (id: number) => {
    setSelectedRandomBoxIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleDeleteRandomBoxes = () => {
    setRandomBoxes((prev) =>
      prev.filter((item) => !selectedRandomBoxIds.includes(item.id))
    );
    setSelectedRandomBoxIds([]);
  };

  const handleAddRandomBox = () => {
    const nextId =
      randomBoxes.length > 0
        ? Math.max(...randomBoxes.map((item) => item.id)) + 1
        : 1;

    setRandomBoxes((prev) => [
      ...prev,
      {
        id: nextId,
        name: `Level.${nextId}`,
        quantity: 1,
        price: 5000 * nextId,
        limit: 1,
      },
    ]);
  };

  const handleOpenBusinessHoursModal = () => {
    // 나중에 모달 연결
    console.log("영업시간 등록 모달 오픈");
  };

  const handleSearchAddress = () => {
    console.log("주소 검색");
  };

  const handleCompleteRegister = () => {
    console.log("등록 완료");
  };

  return (
    <main className="flex w-full flex-col bg-white">
      <section className="min-h-0 flex-1 overflow-y-auto px-[1.6rem]">
        <div className="pb-[3.6rem]">
          <div className="w-full">
            <p className="body2-m py-[0.2rem] text-default">상점 이름</p>
            <Input type="text" placeholder="상점 이름을 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">이메일</p>
            <Input type="email" placeholder="이메일을 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">상점 주소</p>

            <div className="flex items-end gap-[1rem]">
              <div className="min-w-0 flex-1">
                <Input type="text" placeholder="상점 주소를 입력해주세요" />
              </div>

              <Button
                type="button"
                kind="default"
                size="lg"
                variant="primary"
                fullWidth={false}
                onClick={handleSearchAddress}
                className="shrink-0 px-[2.1rem] py-[1.15rem] body1-m text-inverse"
              >
                검색
              </Button>
            </div>
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">계좌번호</p>

            <div className="flex gap-[0.8rem] pb-[0.4rem]">
              <Tag
                variant="rounded-rect"
                selected={selectedAccountType === "bank"}
                changeOnClick={false}
                onClick={() => setSelectedAccountType("bank")}
              >
                은행
              </Tag>

              <Tag
                variant="rounded-rect"
                selected={selectedAccountType === "holder"}
                changeOnClick={false}
                onClick={() => setSelectedAccountType("holder")}
              >
                예금주명
              </Tag>
            </div>

            <Input type="text" placeholder="계좌번호를 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] w-full">
            <div className="flex items-center justify-between">
              <p className="body2-m pb-[0.2rem] text-default">영업시간 등록</p>

              <Button
                type="button"
                kind="register"
                variant="outline-primary"
                fullWidth={false}
                onClick={handleOpenBusinessHoursModal}
                className="body1-m border border-primary-variant text-primary-variant"
              >
                등록하기
              </Button>
            </div>

            <div className="pt-[0.4rem] flex items-start">
              <div className="shrink-0 pt-[0.2rem]">
                <Icon name="Clock" width={20} height={20} />
              </div>

              <div className="ml-[0.4rem] flex flex-col gap-[0.4rem]">
                {businessHoursRows.map((row) => (
                  <div key={row.dayLabel} className="flex items-center gap-[0.4rem]">
                    <span className="body2-r text-default">{row.dayLabel}</span>
                    <span className="body2-r text-default">{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[3.6rem] w-full">
            <div className="flex items-center justify-between">
              <p className="body2-m pb-[0.2rem] text-default">랜덤박스 등록</p>

              <div className="flex items-center">
                <Button
                  type="button"
                  kind="register"
                  variant="outline-gray"
                  fullWidth={false}
                  onClick={handleDeleteRandomBoxes}
                  className="body1-m border border-gray-600 text-gray-600"
                >
                  삭제하기
                </Button>

                <div className="w-[1.2rem]" />

                <Button
                  type="button"
                  kind="register"
                  variant="outline-primary"
                  fullWidth={false}
                  onClick={handleAddRandomBox}
                  className="body1-m border border-primary-variant text-primary-variant"
                >
                  추가하기
                </Button>
              </div>
            </div>

            <div className="pt-[0.4rem]">
              <Card variant="gray-300-bordered" className="p-0 overflow-hidden">
                <div className="grid grid-cols-4 border-b border-gray-300 px-[1rem] py-[1rem]">
                  <div className="text-center body2-m text-gray-600">이름</div>
                  <div className="text-center body2-m text-gray-600">수량</div>
                  <div className="text-center body2-m text-gray-600">가격</div>
                  <div className="text-center body2-m text-gray-600">제한</div>
                </div>

                <div
                  className={`${
                    randomBoxes.length >= 3 ? "max-h-[13.2rem] overflow-y-auto" : ""
                  }`}
                >
                  {randomBoxes.map((item) => {
                    const isSelected = selectedRandomBoxIds.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleRandomBoxSelection(item.id)}
                        className={`grid w-full grid-cols-4 px-[1rem] py-[1rem] text-center ${
                          isSelected ? "bg-background" : "bg-white"
                        }`}
                      >
                        <div className="body2-r text-default">{item.name}</div>
                        <div className="body2-r text-default">{item.quantity}</div>
                        <div className="body2-r text-default">
                          {item.price.toLocaleString()}
                        </div>
                        <div className="body2-r text-default">{item.limit}</div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m text-default">사진 첨부</p>
            <p className="caption1-r pb-[0.2rem] text-gray-500">
              상점의 대표 이미지를 추가해주세요!
            </p>

            <button
              type="button"
              className="flex h-[18rem] w-full items-center justify-center rounded-[10px] bg-background"
            >
              <Icon name="Camera" width={24} height={24} />
            </button>
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m text-default">태그 등록</p>
            <p className="caption1-r text-gray-500">
              가게의 태그를 선택해주세요!
            </p>

            <div className="pt-[1.4rem] flex flex-wrap gap-[0.8rem]">
              {tagOptions.map((tag) => (
                <Tag
                  key={tag}
                  variant="pill-wide"
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="shrink-0 px-[1.6rem] py-[1.6rem]">
        <Button
          type="button"
          size="lg"
          kind="default"
          variant="primary"
          onClick={handleCompleteRegister}
        >
          등록 완료
        </Button>
      </div>
    </main>
  );
}