import type { ThemeKeywordsResponse } from "./types";

export const getThemeKeywords = async (): Promise<ThemeKeywordsResponse> => {
  const response = await fetch("/api/themes/keywords");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch theme keywords");
  }

  return response.json();
};
