import type { ThemeKeyword } from "@/entities/themes/api/types";

export type PostThemeRequest = {
  keywords: ThemeKeyword[];
};

export type PostThemeResponse = {
  id: number;
  message: string;
};
