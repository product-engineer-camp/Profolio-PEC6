import { KEYWORD_CATEGORY } from "../constants/keyword";

export type ThemeFilterOptions = {
  page?: number;
  limit?: number;
};

// 타입 정의
export type KeywordCategory =
  (typeof KEYWORD_CATEGORY)[keyof typeof KEYWORD_CATEGORY];
