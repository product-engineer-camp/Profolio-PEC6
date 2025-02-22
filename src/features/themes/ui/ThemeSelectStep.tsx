import { useProfileCreateStep } from "@/src/widgets/profile/model/useProfileCreateStep";
import { useProfileData } from "@/src/widgets/profile/model/useProfileData";
import { Button } from "@/shared/ui/button";
import { ThemeThumbnailListWithCheckbox } from "./ThemeThumbnailListWithCheckbox";
import { useCheckedList } from "../lib/useCheckedList";

export const ThemeSelectStep = () => {
  const { updateStep } = useProfileCreateStep();
  const { updateThemeId } = useProfileData();
  const { checkedIds, toggleSelection, hasCheckedItems } = useCheckedList({
    mode: "single",
  });

  const handleNext = () => {
    if (hasCheckedItems) {
      updateThemeId(checkedIds[0]);
      updateStep(4);
    }
  };

  const handlePrevious = () => {
    updateStep(2);
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

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          이전
        </Button>
        <Button onClick={handleNext} disabled={!hasCheckedItems}>
          다음
        </Button>
      </div>
    </div>
  );
};
