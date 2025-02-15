import { Button } from "@/shared/ui/button";
import { useThemeListHeaderNavigation } from "../model/useThemeListHeaderNavigation";
import { useCheckedThemes } from "../model/CheckedThemeContext";
import { useDeleteThemes } from "../model/useDeleteThemes";

export const DeleteThemeListActionHeader = () => {
  const { navigateBack, navigateToThemeList } = useThemeListHeaderNavigation();
  const { hasCheckedThemes, checkedThemeIds, clearCheckedThemes } =
    useCheckedThemes();
  const { deleteThemes } = useDeleteThemes({
    onSuccess: () => {
      clearCheckedThemes();
      navigateToThemeList();
    },
  });

  const handleDelete = async () => {
    if (!hasCheckedThemes) return;

    try {
      const ids = checkedThemeIds.map(Number);
      await deleteThemes(ids);
    } catch (error) {
      console.error("Failed to delete themes:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={navigateBack}
        className="p-0 text-xl font-bold text-black hover:text-black/80"
      >
        완료
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={handleDelete}
        disabled={!hasCheckedThemes}
      >
        삭제
      </Button>
    </>
  );
};
