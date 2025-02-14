import type { ApiResponse } from "@/src/shared/api/type";
import type { Profile } from "@/entities/profiles/model/profile.type";

// 공유 많은 순, 최신 순
export type SortType = "SHARE_DESC" | "LATEST";

export type GetProfileRequest = {
  page?: number;
  perPage?: number;
  sort?: SortType;
};
export type GetProfiles = ApiResponse<{
  profiles: Array<Profile>;
  page: number;
  perPage: number;
  first: boolean;
  last: boolean;
}>;

export type CreateProfileRequest = Profile;
export type CreateProfileResponse = ApiResponse<null>;

export type DeleteProfileResponse = ApiResponse<null>;

export type UpdateProfileResponse = ApiResponse<null>;
