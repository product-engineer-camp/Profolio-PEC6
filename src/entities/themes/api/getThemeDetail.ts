import type { ThemeDetailResponse } from "./types";

export const getThemeDetail = async (
  id: number,
): Promise<ThemeDetailResponse> => {
  const response = await fetch(`/api/themes/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch theme detail");
  }

  return response.json();
};
