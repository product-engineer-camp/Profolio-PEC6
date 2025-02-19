import { useQuery } from "@tanstack/react-query";
import { getThemeDetail } from "../api/getThemeDetail";
import { ThemeThumbnailCardProps } from "../ui/ThemeThumbnailCard";
import { transformThemeDetailResponse } from "./transformThemeDetailResponse";
import { ThemeDetailResponse } from "../api/types";

export const THEME_DETAIL_QUERY_KEY = ["themeDetail"] as const;

export const useThemeDetail = (id: number) => {
  return useQuery<ThemeDetailResponse, Error, ThemeThumbnailCardProps>({
    queryKey: [...THEME_DETAIL_QUERY_KEY, id],
    queryFn: () => getThemeDetail(id),
    select: (data) => transformThemeDetailResponse(data),
    enabled: !!id,
  });
};
