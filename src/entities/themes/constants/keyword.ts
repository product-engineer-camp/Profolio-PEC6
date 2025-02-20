export const KEYWORD_CATEGORY = {
  MOOD: "mood",
  PATTERN: "pattern",
} as const;

export const KEYWORD_CATEGORY_LABEL = {
  [KEYWORD_CATEGORY.MOOD]: "분위기",
  [KEYWORD_CATEGORY.PATTERN]: "패턴",
} as const;
