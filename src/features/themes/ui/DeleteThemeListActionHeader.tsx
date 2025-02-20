import { memo } from "react";
import { Button } from "@/shared/ui/button";
import { useDeleteThemes } from "../model/useDeleteThemes";
import { useRouter } from "next/navigation";

type DeleteThemeListActionHeaderProps = {
  checkedThemeIds: string[];
  hasCheckedThemes: boolean;
};

export const DeleteThemeListActionHeader = ({
  checkedThemeIds,
  hasCheckedThemes,
}: DeleteThemeListActionHeaderProps) => {
  const router = useRouter();
  const { deleteThemes } = useDeleteThemes({
    onSuccess: () => {
      router.push("/themes");
    },
  });

  const handleDelete = async () => {
    if (!hasCheckedThemes) return;

    try {
      const ids = checkedThemeIds.map(Number);
      console.log("ids", ids);
      await deleteThemes(ids);
    } catch (error) {
      console.error("Failed to delete themes:", error);
    }
  };

  return (
    <header className="flex w-full items-center justify-between border-b p-4">
      <Button
        variant="ghost"
        onClick={() => router.push("/themes")}
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
    </header>
  );
};
