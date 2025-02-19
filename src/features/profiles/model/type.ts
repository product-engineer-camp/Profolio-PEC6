import type { Profile } from "@/entities/profiles/model/type";

export type ProfileList = {
  items: Profile[];
  total: number;
  page: number;
  first: boolean;
  last: boolean;
};

export type SortOption = "shares" | "latest" | "updated";

export type SortOptionDisplay = {
  value: SortOption;
  label: string;
};
