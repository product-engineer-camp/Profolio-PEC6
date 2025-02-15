import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useThemeList } from "@/entities/themes/model/useThemeList";
import { ThemeThumbnailCard } from "@/entities/themes/ui/ThemeThumbnailCard";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Checkbox } from "@/shared/ui/checkbox";
import { useCheckedThemes } from "../model/useCheckedThemes";

export const ThemeThumbnailListWithCheckbox = () => {
  const { checkedThemeIds, toggleThemeSelection } = useCheckedThemes();
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
        page.map((theme) => (
          <div key={theme.id} className="flex items-center gap-4">
            <Checkbox
              id={`theme-${theme.id}`}
              checked={checkedThemeIds.includes(String(theme.id))}
              onCheckedChange={() => toggleThemeSelection(theme.id)}
            />
            <div className="flex-1">
              <ThemeThumbnailCard {...theme} />
            </div>
          </div>
        )),
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
