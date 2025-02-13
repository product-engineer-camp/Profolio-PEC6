import type { PatternTypeServer } from '../api/types';

export const transformPatternToClassName = (pattern: PatternTypeServer): string => {
  const baseClass = `bg-pattern-${pattern}`;
  
  // solid와 gradient는 size 클래스가 필요없음
  if (pattern === 'solid' || pattern === 'gradient') {
    return baseClass;
  }
  
  // 나머지 패턴들은 size 클래스도 필요
  return `${baseClass} bg-size-${pattern}`;
}; 