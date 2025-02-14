import type { ThemeKeyword, ThemeKeywordsResponse } from "../api/types";

type TransformedKeywords = {
  moodKeywords: ThemeKeyword[];
  patternKeywords: ThemeKeyword[];
};

export const transformKeywords = (
  response: ThemeKeywordsResponse,
): TransformedKeywords => {
  return response.keywords.reduce<TransformedKeywords>(
    (acc, keyword) => {
      if (keyword.category === "mood") {
        acc.moodKeywords.push(keyword);
      } else {
        acc.patternKeywords.push(keyword);
      }
      return acc;
    },
    { moodKeywords: [], patternKeywords: [] },
  );
};
