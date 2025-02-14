import { useQuery } from "@tanstack/react-query";
import { getThemeKeywords } from "../api/getThemeKeywords";
import type { ThemeKeywordsResponse } from "../api/types";

export const THEME_KEYWORDS_QUERY_KEY = ["themeKeywords"] as const;

export const useThemeKeywords = () => {
  return useQuery<ThemeKeywordsResponse>({
    queryKey: THEME_KEYWORDS_QUERY_KEY,
    queryFn: getThemeKeywords,
  });
};
