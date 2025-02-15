import { ThemeKeyword } from "../api/types";
import { KEYWORD_CATEGORIES } from "../constants/keyword";

export const getKeywordsByCategory = (
  themeKeywords: ThemeKeyword[] | undefined,
) =>
  KEYWORD_CATEGORIES.reduce(
    (acc, { category }) => ({
      ...acc,
      [category]: themeKeywords?.filter((k) => k.category === category) ?? [],
    }),
    {} as Record<"mood" | "pattern", ThemeKeyword[]>,
  );
export const getSelectedKeywordsByCategory = (
  selectedKeywords: ThemeKeyword[],
) =>
  KEYWORD_CATEGORIES.reduce(
    (acc, { category }) => ({
      ...acc,
      [category]: selectedKeywords.filter((k) => k.category === category),
    }),
    {} as Record<"mood" | "pattern", ThemeKeyword[]>,
  );
