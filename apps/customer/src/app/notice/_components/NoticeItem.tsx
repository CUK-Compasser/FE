"use client";

import { Icon } from "@compasser/design-system";
import type { NoticeItemData } from "../_types/notice";

interface NoticeItemProps {
  notice: NoticeItemData;
  onRead: (id: number) => void;
}

export default function NoticeItem({
  notice,
  onRead,
}: NoticeItemProps) {
  const handleRead = () => {
    onRead(notice.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRead(notice.id);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleRead}
      onKeyDown={handleKeyDown}
      className={[
        "cursor-pointer border-b border-gray-200 px-[1rem] py-[1rem]",
        notice.isRead ? "bg-white" : "bg-background",
      ].join(" ")}
    >
      <div className="flex items-start">
        <div className="shrink-0">
          <Icon name="Notice" width={20} height={20} ariaHidden={false} />
        </div>

        <div className="ml-[0.4rem] flex-1">
          <p className="body2-r text-gray-600">{notice.storeName}</p>

          <div className="mt-[0.8rem]">
            <p className="body1-r text-default">{notice.title}</p>
            <p className="caption1-r text-gray-500">{notice.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}