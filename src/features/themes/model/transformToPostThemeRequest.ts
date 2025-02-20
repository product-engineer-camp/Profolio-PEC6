import type { ThemeKeyword } from "@/entities/themes/api/types";
import type { PostThemeRequest } from "../api/types";

export const transformToPostThemeRequest = (
  moodKeywords: ThemeKeyword[],
  patternKeywords: ThemeKeyword[],
): PostThemeRequest => {
  return {
    keywords: [...moodKeywords, ...patternKeywords],
  };
};
