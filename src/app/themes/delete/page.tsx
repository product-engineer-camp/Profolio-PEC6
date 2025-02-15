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
import { ThemeThumbnailListWithCheckbox } from "@/features/themes/ui/ThemeThumbnailListWithCheckbox";
import { CheckedThemesProvider } from "@/features/themes/model/CheckedThemeContext";

export default function ThemeDeletePage() {
  return (
    <CheckedThemesProvider>
      <ThemeListHeader variant="delete" />
      <ThemeThumbnailListWithCheckbox />
    </CheckedThemesProvider>
  );
}
