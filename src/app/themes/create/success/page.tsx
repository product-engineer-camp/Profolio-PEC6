"use client";
import Link from "next/link";
import { useThemeDetail } from "@/entities/themes/model/useThemeDetail";
import { ThemeThumbnailCard } from "@/entities/themes/ui/ThemeThumbnailCard";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

type Props = {
  searchParams: { themeId?: string };
};

export default function CreateThemeSuccessPage({ searchParams }: Props) {
  const themeId = Number(searchParams.themeId);
  const { data: theme, isLoading } = useThemeDetail(themeId);

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-black">
        테마가 성공적으로 생성되었습니다!
      </h1>
      <div className="mb-8 flex h-[300px] items-center justify-center">
        {isLoading ? (
          <LoadingSpinner className="h-8 w-8" />
        ) : theme ? (
          <ThemeThumbnailCard {...theme} />
        ) : null}
      </div>
      <div className="space-x-4">
        <Link
          href="/themes/create"
          className="inline-block rounded-lg bg-pink-500 px-6 py-3 text-white transition-colors hover:bg-pink-600"
        >
          다시 생성하기
        </Link>
        <Link
          href="/themes"
          className="inline-block rounded-lg bg-gray-100 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-200"
        >
          테마 목록으로
        </Link>
      </div>
    </>
  );
}
