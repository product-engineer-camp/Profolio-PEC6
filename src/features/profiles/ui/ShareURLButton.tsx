"use client";

import { Button } from "@/shared/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";
import { putShareCount } from "../api/putShareCount";

type ShareURLButtonProps = {
  profileUrl: string;
  profileId: string;
};

export function ShareURLButton({ profileUrl, profileId }: ShareURLButtonProps) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      await putShareCount(profileId);
      toast("URL이 복사되었습니다.");
    } catch (error) {
      console.error("Failed to copy URL or update share count:", error);
      toast.error("URL 복사에 실패했습니다.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex w-full items-center justify-center gap-1.5 border border-gray-200 px-2 text-[10px] transition-colors hover:bg-gray-50 sm:gap-2 sm:px-4 sm:text-sm"
      onClick={handleShare}
    >
      <Link className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      <span className="truncate text-[12px]">URL 복사</span>
    </Button>
  );
}
