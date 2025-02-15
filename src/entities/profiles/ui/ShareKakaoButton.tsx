"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";

type ShareKakaoButtonProps = {
  profileUrl: string;
};

export function ShareKakaoButton({ profileUrl }: ShareKakaoButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 bg-[#FEE500] px-4 transition-colors"
    >
      <Image
        src="/kakao.svg"
        alt="카카오 공유하기"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      <span className="text-sm">카카오로 공유하기</span>
    </Button>
  );
}
