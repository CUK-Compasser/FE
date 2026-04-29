"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@compasser/design-system";
import type { QRCheckResponseDTO } from "@compasser/api";
import { useCheckQrMutation } from "@/shared/queries/mutation/store-manager/useQrMutation";

interface QRStampModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: QRCheckResponseDTO) => void;
}

interface CornerGuideProps {
  className?: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

type DetectedCode = {
  rawValue?: string;
};

type BarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<DetectedCode[]>;
};

type BarcodeDetectorConstructor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorInstance;

const SCAN_BOX_SIZE = 260;

export default function QRStampModal({
  open,
  onClose,
  onSuccess,
}: QRStampModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const isProcessingRef = useRef(false);

  const [cameraError, setCameraError] = useState("");

  const checkQrMutation = useCheckQrMutation();

  const stopCamera = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const parseQrValue = (rawValue: string) => {
    try {
      const url = new URL(rawValue);
      const token = url.searchParams.get("token");
      const memberId = url.searchParams.get("memberId");

      if (!token || !memberId) return null;

      return {
        token,
        memberId: Number(memberId),
      };
    } catch {
      return null;
    }
  };

  const handleDetectedQr = async (rawValue: string) => {
    if (isProcessingRef.current) return;

    const parsedQr = parseQrValue(rawValue);

    if (!parsedQr) {
      setCameraError("올바르지 않은 QR입니다.");
      return;
    }

    try {
      isProcessingRef.current = true;

      const response = await checkQrMutation.mutateAsync({
        token: parsedQr.token,
        memberId: parsedQr.memberId,
      });

      stopCamera();
      onSuccess(response.data);
    } catch {
      setCameraError("QR 확인에 실패했습니다.");
      isProcessingRef.current = false;
    }
  };

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const startCamera = async () => {
      try {
        setCameraError("");
        isProcessingRef.current = false;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        if (cancelled) return;

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const BarcodeDetectorClass = (
          window as Window & {
            BarcodeDetector?: BarcodeDetectorConstructor;
          }
        ).BarcodeDetector;

        if (!BarcodeDetectorClass) {
          setCameraError("이 브라우저에서는 QR 스캔이 지원되지 않습니다.");
          return;
        }

        const detector = new BarcodeDetectorClass({
          formats: ["qr_code"],
        });

        const scan = async () => {
          if (
            cancelled ||
            !videoRef.current ||
            videoRef.current.readyState < 2 ||
            isProcessingRef.current
          ) {
            frameRef.current = requestAnimationFrame(scan);
            return;
          }

          try {
            const results = await detector.detect(videoRef.current);
            const qrValue = results[0]?.rawValue?.trim();

            if (qrValue) {
              await handleDetectedQr(qrValue);
              return;
            }
          } catch {
            // 프레임 단위 스캔 실패는 무시
          }

          frameRef.current = requestAnimationFrame(scan);
        };

        frameRef.current = requestAnimationFrame(scan);
      } catch {
        setCameraError("카메라에 접근할 수 없습니다.");
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      stopCamera();
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
                onClick={() => {
                  stopCamera();
                  onClose();
                }}
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

            {checkQrMutation.isPending && (
              <p className="mt-[1rem] body2-r text-primary-variant">
                QR 확인 중...
              </p>
            )}
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