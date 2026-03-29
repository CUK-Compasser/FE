"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@compasser/design-system";

interface QRStampModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

interface CornerGuideProps {
  className?: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const SCAN_BOX_SIZE = 260;

export default function QRStampModal({
  open,
  onClose,
  onSubmit,
}: QRStampModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    if (!open) return;

    const startCamera = async () => {
      try {
        setCameraError("");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        setCameraError("카메라에 접근할 수 없습니다.");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black">
      <div className="mx-auto h-[100dvh] w-full overflow-hidden">
        <div className="relative h-full w-full">
          {!cameraError ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 px-[2rem] text-center body2-r text-gray-600">
              {cameraError}
            </div>
          )}

          <div className="absolute left-1/2 top-[24rem] z-10 -translate-x-1/2">
            <ScanFrame boxSize={SCAN_BOX_SIZE} />
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center">
            <div className="relative flex w-full items-center justify-center px-[1rem] pt-[2.6rem] pb-[1rem]">
              <h1 className="head2-sb text-primary-variant">적립</h1>

              <button
                type="button"
                onClick={onClose}
                className="absolute right-[1rem] top-[2.6rem] flex h-[2.8rem] w-[2.8rem] items-center justify-center"
                aria-label="닫기"
              >
                <Icon
                  name="CloseButton"
                  width={28}
                  height={28}
                  isInteractive
                  className="text-primary-variant"
                />
              </button>
            </div>

            <p className="mt-[5.6rem] body1-r text-primary-variant">
              고객 QR을 스캔해주세요.
            </p>

            <button
              type="button"
              onClick={onSubmit}
              className="absolute bottom-[11rem] left-1/2 -translate-x-1/2 rounded-[999px] bg-primary-variant px-[4.8rem] py-[1.2rem] head3-m text-inverse"
            >
              적립하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScanFrame({ boxSize }: { boxSize: number }) {
  return (
    <div
      className="relative overflow-visible"
      style={{
        width: `${boxSize}px`,
        height: `${boxSize}px`,
      }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          inset: `-${9999}px`,
          background: "rgb(0 0 0 / 0.4)",
          clipPath: `polygon(
            0% 0%,
            100% 0%,
            100% 100%,
            0% 100%,
            0% 0%,
            calc(50% - ${boxSize / 2}px) calc(50% - ${boxSize / 2}px),
            calc(50% - ${boxSize / 2}px) calc(50% + ${boxSize / 2}px),
            calc(50% + ${boxSize / 2}px) calc(50% + ${boxSize / 2}px),
            calc(50% + ${boxSize / 2}px) calc(50% - ${boxSize / 2}px),
            calc(50% - ${boxSize / 2}px) calc(50% - ${boxSize / 2}px)
          )`,
        }}
      />

      <CornerGuide className="left-0 top-0" position="top-left" />
      <CornerGuide className="right-0 top-0" position="top-right" />
      <CornerGuide className="bottom-0 left-0" position="bottom-left" />
      <CornerGuide className="bottom-0 right-0" position="bottom-right" />
    </div>
  );
}

function CornerGuide({ className = "", position }: CornerGuideProps) {
  const baseClassName = "absolute h-[8rem] w-[8rem] border-primary-variant";

  const positionClassMap = {
    "top-left": "rounded-tl-[1rem] border-l-[0.738rem] border-t-[0.738rem]",
    "top-right": "rounded-tr-[1rem] border-r-[0.738rem] border-t-[0.738rem]",
    "bottom-left": "rounded-bl-[1rem] border-b-[0.738rem] border-l-[0.738rem]",
    "bottom-right": "rounded-br-[1rem] border-b-[0.738rem] border-r-[0.738rem]",
  };

  return (
    <div className={`${baseClassName} ${positionClassMap[position]} ${className}`} />
  );
}