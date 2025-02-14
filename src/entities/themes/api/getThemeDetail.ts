import type { ThemeDetailResponse } from './types';
import { transformThemeDetailResponse } from '../model/transformThemeDetailResponse';
import { ThemeThumbnailCardProps } from '../ui/ThemeThumbnailCard';
export const getThemeDetail = async (
  themeId: number
): Promise<ThemeThumbnailCardProps> => {
  const response = await fetch(`/api/themes/${themeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch theme detail');
  }

  const data: ThemeDetailResponse = await response.json();
  return transformThemeDetailResponse(data);
};
