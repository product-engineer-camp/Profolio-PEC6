import type { Theme } from "./@x/theme.type";

export type Profile = {
  id: string;
  title: string;
  content: string;
  theme: Theme;
  profileUrl: string;
  shareCount: number;
  shares: number;
  createdAt: string;
  updatedAt: string;
};
