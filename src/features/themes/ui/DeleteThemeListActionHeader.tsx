import { Button } from "@/shared/ui/button";
import { useCheckedThemes } from "../lib/CheckedThemeContext";
import { useDeleteThemes } from "../model/useDeleteThemes";

import { useRouter } from "next/navigation";

export const DeleteThemeListActionHeader = () => {
  const router = useRouter();
  const { hasCheckedThemes, checkedThemeIds, clearCheckedThemes } =
    useCheckedThemes();
  const { deleteThemes } = useDeleteThemes({
    onSuccess: () => {
      clearCheckedThemes();
      router.push("/themes");
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
        onClick={() => router.push("/themes")}
        className="text-xl font-bold text-black hover:text-black/80"
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
