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
import { ThemeListHeader } from "@/widgets/ThemeListHeader";

export default function ThemeListPage() {
  return (
    <>
      <ThemeListHeader variant="default" />
      <ThemeThumbnailList />
    </>
  );
}
