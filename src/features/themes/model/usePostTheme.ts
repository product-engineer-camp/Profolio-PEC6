import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postTheme } from "../api/postTheme";
import type { PostThemeResponse } from "../api/types";

export const usePostTheme = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postTheme,
    onSuccess: (data: PostThemeResponse) => {
      router.push(`/themes/create/success?themeId=${data.id}`);
    },
  });
};
