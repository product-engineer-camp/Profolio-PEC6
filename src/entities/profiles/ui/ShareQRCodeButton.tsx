"use client";

import { Button } from "@/shared/ui/button";
import { QrCode } from "lucide-react";
import { useState } from "react";
import { QRCodeModal } from "./QRCodeModal";

type ShareQRCodeButtonProps = {
  profileUrl: string;
};

export function ShareQRCodeButton({ profileUrl }: ShareQRCodeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsModalOpen(true)}
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
