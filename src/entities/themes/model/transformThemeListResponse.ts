import type { ThemeListResponse } from '../api/types';
import { ThemeThumbnailCardProps } from '../ui/ThemeThumbnailCard';
import { transformThemeDetailResponse } from './transformThemeDetailResponse';

export const transformThemeListResponse = (
  response: ThemeListResponse
): ThemeThumbnailCardProps[] => {
  return response.themes.map(transformThemeDetailResponse);
}; 