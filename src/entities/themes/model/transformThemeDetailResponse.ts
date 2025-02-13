import type { ThemeDetailResponseServer } from '../api/types';
import type { ThemeDetailClient } from './types';
import { transformPatternToClassName } from './transformPatternToClassName';

export const transformThemeDetailResponse = (
  response: ThemeDetailResponseServer
): ThemeDetailClient => {
  return {
    id: response.id,
    colors: response.colors,
    pattern: transformPatternToClassName(response.pattern),
    createdAt: response.createdAt,
  };
}; 