import { Button } from "@/shared/ui/button";
import { ThemeThumbnailListWithCheckbox } from "./ThemeThumbnailListWithCheckbox";
import { useCheckedList } from "../lib/useCheckedList";

type ThemeSelectStepProps = {
  onSelect: (themeId: string) => void;
  selectedThemeId?: string | null;
};

export const ThemeSelectStep = ({
  onSelect,
  selectedThemeId,
}: ThemeSelectStepProps) => {
  const { checkedIds, toggleSelection, hasCheckedItems } = useCheckedList({
    mode: "single",
    initialChecked: selectedThemeId ? [Number(selectedThemeId)] : [],
  });

  const handleSelect = () => {
    if (hasCheckedItems && checkedIds.length > 0) {
      onSelect(checkedIds[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">프로필 테마 선택</h2>
        <p className="text-muted-foreground">
          프로필에 적용할 테마를 선택해주세요. 테마는 1개만 선택할 수 있습니다.
        </p>
      </div>

      <div className="max-h-[calc(100vh-280px)] flex-1 overflow-y-auto">
        <ThemeThumbnailListWithCheckbox
          onToggleCheck={toggleSelection}
          checkedIds={checkedIds}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSelect} disabled={!hasCheckedItems}>
          선택 완료
        </Button>
      </div>
    </div>
  );
};
