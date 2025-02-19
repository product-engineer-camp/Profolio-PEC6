import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteThemes as deleteThemesApi } from "../api/deleteThemes";

type UseDeleteThemesProps = {
  onSuccess?: () => void;
};

export const useDeleteThemes = ({ onSuccess }: UseDeleteThemesProps = {}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteThemes } = useMutation({
    mutationKey: ["deleteThemes"],
    mutationFn: (themeIds: number[]) => deleteThemesApi(themeIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Failed to delete themes:", error);
    },
  });

  return {
    deleteThemes,
  };
};
