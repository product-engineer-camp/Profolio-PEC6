"use client";

import { Button } from "@/shared/ui/button";
import { QrCode } from "lucide-react";
import { useState } from "react";
import { QRCodeModal } from "../../../entities/profiles/ui/QRCodeModal";
import { putShareCount } from "../api/putShareCount";

type ShareQRCodeButtonProps = {
  profileUrl: string;
  onClick: () => void;
};

export function ShareQRCodeButton({
  profileUrl,
  onClick,
}: ShareQRCodeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = async () => {
    try {
      setIsModalOpen(true);
      onClick(); // QR 코드 모달 표시 후 공유 카운트 증가
    } catch (error) {
      console.error("Failed to show QR code:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-1.5 border border-gray-200 px-2 text-[10px] transition-colors hover:bg-gray-50 sm:gap-2 sm:px-4 sm:text-sm"
      >
        <QrCode className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
        <span className="truncate text-[12px]">QR 공유</span>
      </Button>

      <QRCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileURL={profileUrl}
      />
    </>
  );
}
