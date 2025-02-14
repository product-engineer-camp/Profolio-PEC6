import type { ThemeDetailResponse } from '../api/types';
import { ThemeThumbnailCardProps } from '../ui/ThemeThumbnailCard';
import { transformPatternToClassName } from './transformPatternToClassName';

export const transformThemeDetailResponse = (
  response: ThemeDetailResponse
): ThemeThumbnailCardProps => {
  return {
    id: response.id,
    colors: response.colors,
    pattern: transformPatternToClassName(response.pattern),
  };
}; 