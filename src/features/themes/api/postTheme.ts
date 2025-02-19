/**
 * 테마 생성하기 post 요청
 */

import type { PostThemeRequest, PostThemeResponse } from "./types";

export const postTheme = async (
  data: PostThemeRequest,
): Promise<PostThemeResponse> => {
  const response = await fetch("/api/themes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create theme");
  }

  return response.json();
};
