import type { ThemeListResponseServer } from '../api/types';
import type { ThemeListResponseClient } from './types';
import { transformThemeDetailResponse } from './transformThemeDetailResponse';

export const transformThemeListResponse = (
  response: ThemeListResponseServer
): ThemeListResponseClient => {
  return {
    themes: response.themes.map(transformThemeDetailResponse),
    totalCount: response.totalCount,
    currentPage: response.currentPage,
  };
}; 