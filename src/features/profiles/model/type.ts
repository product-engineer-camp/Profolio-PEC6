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

export const SORT_OPTIONS: SortOptionDisplay[] = [
  { value: "shares", label: "공유 순" },
  { value: "latest", label: "최신 순" },
  { value: "updated", label: "업데이트 순" },
];
