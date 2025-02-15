import type { ThemeKeyword } from "../api/types";
import { KeywordCategory } from "./types";

export const filterKeywordsByCategory = (
  keywords: ThemeKeyword[] | undefined,
  category: KeywordCategory,
): ThemeKeyword[] => {
  if (!keywords) return [];
  return keywords.filter((keyword) => keyword.category === category);
};
