import type { Theme } from "./@x/theme.type";

export type Profile = {
  id: number;
  title: string;
  content: string;
  theme: Theme;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
};
