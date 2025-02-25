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

import { ThemeThumbnailListWithCheckbox } from "@/features/themes/ui/ThemeThumbnailListWithCheckbox";
import { DeleteThemeListActionHeader } from "@/src/features/themes/ui/DeleteThemeListActionHeader";
import { useCheckedList } from "@/features/themes/lib/useCheckedList";

export default function ThemeDeletePage() {
  const { checkedIds, toggleSelection, hasCheckedItems } = useCheckedList();

  return (
    <>
      <DeleteThemeListActionHeader
        checkedThemeIds={checkedIds}
        hasCheckedThemes={hasCheckedItems}
      />
      <ThemeThumbnailListWithCheckbox onToggleCheck={toggleSelection} />
    </>
  );
}
