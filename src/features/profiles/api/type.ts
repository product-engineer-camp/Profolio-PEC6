import type { Profile } from "@/entities/profiles/model/type";
import type { ProfileList } from "@/features/profiles/model/type";

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
  sortBy?: "shareCount" | "createdAt" | "updatedAt";
};

// API Error Types
export type ProfileApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};
