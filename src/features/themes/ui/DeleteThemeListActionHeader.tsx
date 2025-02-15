import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";
import { useThemeListHeaderNavigation } from "../model/useThemeListHeaderNavigation";
import { deleteTheme } from "../api/deleteTheme";
import { useSearchParams } from "next/navigation";

export const DeleteThemeListActionHeader = () => {
  const { navigateBack, navigateToThemeList, refreshPage } =
    useThemeListHeaderNavigation();
  const searchParams = useSearchParams();
  const themeId = searchParams.get("id");

  const handleDelete = async () => {
    if (!themeId) return;

    try {
      await deleteTheme(Number(themeId));
      navigateToThemeList();
      refreshPage();
    } catch (error) {
      console.error("Failed to delete theme:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={navigateBack}
        className="text-xl font-bold text-black hover:text-black/80"
      >
        완료
      </Button>
      <Button variant="destructive" size="icon" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
        <span className="sr-only">테마 삭제</span>
      </Button>
    </>
  );
};
