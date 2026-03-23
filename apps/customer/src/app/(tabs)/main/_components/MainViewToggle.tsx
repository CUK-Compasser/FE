"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@compasser/design-system";

interface MainViewToggleProps {
  view: "list" | "map";
}

export default function MainViewToggle({
  view,
}: MainViewToggleProps) {
  const router = useRouter();

  const handleToggleView = () => {
    router.push(view === "list" ? "/main?view=map" : "/main?view=list");
  };

  return (
    <div className="fixed bottom-[7.4rem] left-0 z-40 w-full px-[1.6rem]">
      <div className="mx-auto flex w-full max-w-[42.5rem] justify-end">
        <button
          type="button"
          onClick={handleToggleView}
          aria-label={view === "list" ? "지도 보기" : "리스트 보기"}
          className="flex items-center justify-center rounded-full bg-primary p-[1.6rem]"
        >
          <Icon
            name={view === "list" ? "MapIcon" : "ListIcon"}
            width={24}
            height={24}
            ariaHidden={true}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
}