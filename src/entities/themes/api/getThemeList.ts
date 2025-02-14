import { ThemeFilterOptions } from "../model/types";
import type { ThemeListResponse } from "./types";

export const getThemeList = async ({
  page = 1,
  limit = 12,
}: ThemeFilterOptions = {}): Promise<ThemeListResponse> => {
  const searchParams = new URLSearchParams();
  
  searchParams.append("page", page.toString());
  searchParams.append("limit", limit.toString());

  const queryString = searchParams.toString();
  const url = `/api/themes${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch themes");
  }

  return response.json();
};
