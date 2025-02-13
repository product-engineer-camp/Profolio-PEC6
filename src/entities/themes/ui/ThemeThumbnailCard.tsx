/**
 * 테마목록 , 테마수정하기 -> 테마 썸네일 카드
 */

import type { ThemeDetailClient } from '../model/types';
import { adjustColor } from '../lib/adjustColor';

type ThemeThumbnailCardProps = {
  theme: ThemeDetailClient;
};

export const ThemeThumbnailCard = ({ theme }: ThemeThumbnailCardProps) => {
  const { colors, pattern } = theme;
  
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <div className="w-full h-full">
        <div 
          className={`absolute inset-0 w-full h-full bg-repeat opacity-50 ${pattern}`}
          style={{ color: adjustColor(colors[0], -30) }}
        /> 
        
        <div className="w-full h-full grid grid-cols-4 grid-rows-1">
          {colors.map((color, index) => (
            <div
              key={`${color}-${index}`}
              className="w-full h-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};