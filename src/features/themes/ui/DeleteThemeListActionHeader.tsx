import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";
import { deleteTheme } from "../api/deleteTheme";
import { useSearchParams, useRouter } from "next/navigation";

export const DeleteThemeListActionHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeId = searchParams.get("id");

  const handleDelete = async () => {
    if (!themeId) return;

    try {
      await deleteTheme(Number(themeId));
      router.push("/themes");
    } catch (error) {
      console.error("Failed to delete theme:", error);
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
      <Button variant="destructive" size="icon" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
        <span className="sr-only">테마 삭제</span>
      </Button>
    </>
  );
};
