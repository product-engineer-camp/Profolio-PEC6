import type { InfiniteData } from "@tanstack/react-query";

export type ThemeDetailClient = {
  id: number;
  colors: string[];
  pattern: string;
  createdAt: string;
};

export type ThemeFilterOptionsClient = {
  page?: number;
  limit?: number;
};

export type ThemeListResponseClient = {
  themes: ThemeDetailClient[];
  totalCount: number;
  currentPage: number;
};

export type ThemeInfiniteListResponseClient = InfiniteData<ThemeListResponseClient>; 