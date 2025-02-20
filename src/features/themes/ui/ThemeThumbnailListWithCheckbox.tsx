import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useThemeList } from "@/entities/themes/model/useThemeList";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { ThemeThumbnailCardWithCheckbox } from "./ThemeThumbnailCardWithCheckbox";

type ThemeThumbnailListWithCheckboxProps = {
  onToggleCheck: (id: number) => void;
};

export const ThemeThumbnailListWithCheckbox = ({
  onToggleCheck,
}: ThemeThumbnailListWithCheckboxProps) => {
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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || data.pages[0].length === 0) {
    return <ErrorMessage message="No themes found" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.pages.map((page) =>
        page.map((theme) => (
          <ThemeThumbnailCardWithCheckbox
            key={theme.id}
            {...theme}
            onToggleCheck={onToggleCheck}
          />
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
