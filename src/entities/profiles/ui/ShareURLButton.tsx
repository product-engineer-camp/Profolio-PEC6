"use client";

import { Button } from "@/shared/ui/button";
import { Link } from "lucide-react";

type ShareURLButtonProps = {
  profileUrl: string;
};

export function ShareURLButton({ profileUrl }: ShareURLButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex w-full items-center justify-center gap-1.5 border border-gray-200 px-2 text-xs transition-colors hover:bg-gray-50 sm:gap-2 sm:px-4 sm:text-sm"
    >
      <Link className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      <span className="truncate text-xs sm:text-sm">URL 복사</span>
    </Button>
  );
}
