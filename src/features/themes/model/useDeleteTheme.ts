import { useRouter } from "next/navigation";
import { deleteTheme } from "../api/deleteTheme";

export const useDeleteTheme = () => {
  const router = useRouter();

  const handleDeleteTheme = async (themeId: string) => {
    try {
      await deleteTheme(themeId);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete theme:", error);
    }
  };

  return {
    deleteTheme: handleDeleteTheme,
  };
};
