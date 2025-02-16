import type { Theme } from "./@x/theme.type";

export type Profile = {
  id: number;
  title: string;
  content: string;
  theme: Theme;
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
};
