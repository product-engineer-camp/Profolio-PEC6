import type { Theme } from "./@x/theme.type";

export type Profile = {
  id: number;
  content: string;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
};
