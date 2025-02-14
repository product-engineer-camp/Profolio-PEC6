import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { getThemeList } from "../api/getThemeList";
import { transformThemeListResponse } from "./transformThemeListResponse";
import { ThemeThumbnailCardProps } from "../ui/ThemeThumbnailCard";

const ITEMS_PER_PAGE = 12;

type ThemeListQueryKey = readonly ["themeList"];
type ThemeListQueryFnData = Awaited<ReturnType<typeof getThemeList>>;
type ThemeListInfiniteData = InfiniteData<ThemeThumbnailCardProps[]>;

export const useThemeList = () => {
  return useInfiniteQuery<
    ThemeListQueryFnData,
    Error,
    ThemeListInfiniteData,
    ThemeListQueryKey
  >({
    queryKey: ["themeList"] as const,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      await getThemeList({ page: pageParam as number, limit: ITEMS_PER_PAGE }),
    getNextPageParam: (lastPage) => {
      if (lastPage.themes.length < ITEMS_PER_PAGE) return undefined;
      return lastPage.currentPage + 1;
    },
    select: (data) => ({
      pages: data.pages.map(transformThemeListResponse),
      pageParams: data.pageParams,
    }),
  });
};
