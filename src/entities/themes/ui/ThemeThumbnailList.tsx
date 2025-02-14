/**
 * 테마 목록 리스트 컴포넌트
 */

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useThemeList } from "../model/useThemeList";
import { ThemeThumbnailCard } from "./ThemeThumbnailCard";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";

export const ThemeThumbnailList = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useThemeList();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data || data.pages[0].length === 0) {
    return <ErrorMessage message="No themes found" />;
  }
  return (
    <div className="flex flex-col gap-4">
      {data.pages.map((page) =>
        page.map((themeThumbnailCardProps) => (
          <ThemeThumbnailCard key={themeThumbnailCardProps.id} {...themeThumbnailCardProps} />
        ))
      )}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center p-4">
          {isFetchingNextPage ? (
            <LoadingSpinner className="h-20" />
          ) : (
            <div className="h-20" />
          )}
        </div>
      )}
    </div>
  );
};