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

export default function ThemesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ThemeThumbnailList />
    </main>
  );
}
