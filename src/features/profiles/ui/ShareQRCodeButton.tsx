"use client";

import { Button } from "@/shared/ui/button";
import { QrCode } from "lucide-react";
import { useState } from "react";
import { QRCodeModal } from "../../../entities/profiles/ui/QRCodeModal";
import { putShareCount } from "../api/putShareCount";

type ShareQRCodeButtonProps = {
  profileUrl: string;
  profileId: string;
};

export function ShareQRCodeButton({
  profileUrl,
  profileId,
}: ShareQRCodeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = async () => {
    try {
      setIsModalOpen(true);
      await putShareCount(profileId);
    } catch (error) {
      console.error("Failed to update share count:", error);
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
