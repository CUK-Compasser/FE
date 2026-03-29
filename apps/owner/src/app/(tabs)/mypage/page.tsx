"use client";

import { useRouter } from "next/navigation";
import { Header, Icon } from "@compasser/design-system";

interface SettingMenuItemProps {
  label: string;
  onClick: () => void;
}

function SettingMenuItem({ label, onClick }: SettingMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between border-b border-gray-200 px-[1.6rem] py-[1.6rem] text-left"
    >
      <span className="body1-r text-default">{label}</span>
      <Icon
        name="NextButton"
        width={20}
        height={20}
        ariaHidden={false}
      />
    </button>
  );
}

export default function MyPageSettingsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header variant="center-title-shadow" title="설정" />

      <div className="flex flex-col">
        <SettingMenuItem
          label="스토어 정보 수정"
          onClick={() => router.push("/mypage/store-info")}
        />

        <SettingMenuItem
          label="내 스토어 계정"
          onClick={() => router.push("/mypage/store-account")}
        />
      </div>
    </div>
  );
}