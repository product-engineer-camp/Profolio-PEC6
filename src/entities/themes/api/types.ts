export const THEME_PATTERNS = [
  "solid",
  "gradient",
  "dots",
  "stripes",
  "waves",
  "zigzag",
  "square",
] as const;

export type ThemePattern = (typeof THEME_PATTERNS)[number];

export type ThemeDetailResponse = {
  id: number;
  colors: string[];
  pattern: ThemePattern;
  createdAt: string;
};

export type ThemeListResponse = {
  themes: ThemeDetailResponse[];
  totalCount: number;
  currentPage: number;
};

export type ThemeApiError = {
  message: string;
  code: string;
};

export type ThemeKeyword = {
  id: number;
  name: string;
  category: "mood" | "pattern"; // 분위기/패턴 카테고리 구분
};

export type ThemeKeywordsResponse = {
  keywords: ThemeKeyword[];
};
