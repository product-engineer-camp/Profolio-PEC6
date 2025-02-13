import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import type { ThemeListResponseClient } from "./types";
import type { ThemeListResponseServer } from "../api/types";
import { getThemeList } from "../api/getThemeList";
import { transformThemeListResponse } from "./transformThemeListResponse";

const ITEMS_PER_PAGE = 12;

type ThemeListQueryKey = readonly ["themeList"];
type ThemeListQueryFnData = Awaited<ReturnType<typeof getThemeList>>;
type ThemeListInfiniteData = InfiniteData<ThemeListResponseClient>;

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
