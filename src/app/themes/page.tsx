/**
 * 테마 목록 페이지
 *
 * - SettingDropdown 사용
 * - SelectThemeList 사용
 *
 *
 *
 *
 */

"use client";

import { ThemeThumbnailList } from "@/entities/themes/ui/ThemeThumbnailList";
import { DefaultThemeListActionHeader } from "@/features/themes/ui/DefaultThemeListActionHeader";

export default function ThemeListPage() {
  return (
    <>
      <DefaultThemeListActionHeader />
      <ThemeThumbnailList />
    </>
  );
}
