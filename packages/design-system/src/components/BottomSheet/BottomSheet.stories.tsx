import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BottomSheet } from "./BottomSheet";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

const DefaultTemplate = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative h-screen bg-gray-100">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute left-1/2 top-10 -translate-x-1/2 rounded-[1rem] bg-primary px-[1.6rem] py-[0.8rem] body2-m text-inverse"
        >
          바텀시트 다시 열기
        </button>
      )}

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        variant="default"
        overlay
      >
        <div className="body1-m text-default">
          일반 바텀시트입니다.
        </div>
      </BottomSheet>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultTemplate />,
};

const MapTemplate = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative h-screen bg-gray-100">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute left-1/2 top-10 -translate-x-1/2 rounded-[1rem] bg-primary px-[1.6rem] py-[0.8rem] body2-m text-inverse"
        >
          바텀시트 다시 열기
        </button>
      )}

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        variant="map"
        overlay={false}
      >
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex items-center gap-[0.8rem]">
            <span className="body1-m text-default">📍 별동네 베이커리카페 별내본점</span>
          </div>

          <div className="h-[20rem] rounded-[1rem] bg-gray-100" />
        </div>
      </BottomSheet>
    </div>
  );
};

export const MapDetail: Story = {
  render: () => <MapTemplate />,
};