/**
 * 테마 삭제 페이지
 *
 * SelectThemeCardProvider 사용 후
 * 내부에서
 * - DeleteThemeButton 사용
 * - SelectThemeList 사용
 *
 *
 *
 *
 */

"use client";

import { ThemeListHeader } from "@/widgets/ThemeListHeader";

export default function ThemeDeletePage() {
  return (
    <>
      <ThemeListHeader variant="delete" />
      {/* ... 나머지 컴포넌트들 */}
    </>
  );
}
