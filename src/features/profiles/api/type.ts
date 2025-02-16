import type { ProfileList, SortOption } from "@/features/profiles/model/type";

export type GetProfileListResponse = {
  profiles: ProfileList;
  total: number;
  page: number;
  limit: number;
  isFirst: boolean;
  isLast: boolean;
};

export type GetProfileListRequest = {
  page?: number;
  limit?: number;
  sortBy?: SortOption;
};

// API Error Types
export type ProfileApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};
