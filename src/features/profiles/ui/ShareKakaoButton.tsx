"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";

type ShareKakaoButtonProps = {
  profileUrl: string;
  onClick: () => void;
};

export function ShareKakaoButton({
  profileUrl,
  onClick,
}: ShareKakaoButtonProps) {
  const handleShare = () => {
    if (window.Kakao === undefined) {
      return;
    }

    try {
      window.Kakao.Share.sendCustom({
        templateId: Number(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
        templateArgs: {
          USER_NAME: "홍길동",
        },
      });
      onClick();
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="flex w-full items-center justify-center gap-1.5 bg-[#FEE500] px-2 transition-colors hover:bg-[#FDD800] sm:gap-2 sm:px-4"
    >
      <Image
        src="/kakao.svg"
        alt="카카오 공유하기"
        width={20}
        height={20}
        className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
      />
      <span className="truncate text-[12px]">카카오 공유</span>
    </Button>
  );
}
