import type { Profile } from "@/entities/profiles/model/type";

export type ProfileList = {
  items: Profile[];
  total: number;
  page: number;
  first: boolean;
  last: boolean;
};

export type SortOption = "shares" | "updated" | "latest";

export type SortOptionDisplay = {
  value: SortOption;
  label: string;
};

// DB 타입
export type ProfileDB = {
  created_at: string;
  updated_at: string;
  share_count: number;
  // ... 다른 필드들
};

// 클라이언트 타입
export type Profile = {
  createdAt: string;
  updatedAt: string;
  shares: number;
  // ... 다른 필드들
};
