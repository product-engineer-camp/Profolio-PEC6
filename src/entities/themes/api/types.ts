export const THEME_PATTERNS = [
  'solid',
  'gradient',
  'dots',
  'stripes',
  'waves',
  'zigzag',
  'square'
] as const;

export type PatternTypeServer = typeof THEME_PATTERNS[number];

export type ThemeDetailResponseServer = {
  id: number;
  colors: string[];
  pattern: PatternTypeServer;
  createdAt: string;
};

export type ThemeListResponseServer = {
  themes: ThemeDetailResponseServer[];
  totalCount: number;
  currentPage: number;
};

export type ThemeApiError = {
  message: string;
  code: string;
}; 