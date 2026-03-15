import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Input } from "../Input";
import { Modal } from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
    closeOnOverlayClick: true,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ConfirmModalStory = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="confirm"
      title="로그아웃하시겠습니까?"
      footer={
        <div className="flex items-center justify-center gap-[3.2rem]">
          <Button
            size="sm"
            variant="gray"
            className="w-[10rem]"
            onClick={() => setOpen(false)}
          >
            그만두기
          </Button>
          <Button
            size="sm"
            className="w-[10rem]"
            onClick={() => setOpen(false)}
          >
            로그아웃
          </Button>
        </div>
      }
    />
  );
};

const DefaultModalStory = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="default"
      title="일반 모달"
    >
      <p className="body1-r text-default text-center">
        일반 모달 예시입니다.
      </p>
    </Modal>
  );
};

const PaymentModalStory = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="payment"
      title="결제 안내"
    >
      <p className="body1-r text-default text-center">
        결제 관련 안내 문구입니다.
      </p>
    </Modal>
  );
};

const RejectModalStory = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="reject"
      title="거절 사유 입력"
      closeOnOverlayClick={false}
    >
      <Input placeholder="거절 사유를 입력해주세요" />
    </Modal>
  );
};

const ActionModalStory = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="action"
      title="작업 선택"
    >
      <div className="flex flex-col gap-[1rem]">
        <Button>수정하기</Button>
        <Button variant="gray">삭제하기</Button>
      </div>
    </Modal>
  );
};

export const Confirm: Story = {
  render: () => <ConfirmModalStory />,
};

export const Default: Story = {
  render: () => <DefaultModalStory />,
};

export const Payment: Story = {
  render: () => <PaymentModalStory />,
};

export const Reject: Story = {
  render: () => <RejectModalStory />,
};

export const Action: Story = {
  render: () => <ActionModalStory />,
};