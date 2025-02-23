import { ApiResponse } from "@/shared/api/type";
import { Profile } from "./type";

export type GetProfilesResponse = ApiResponse<Profile[]>;

export const getProfiles = async (): Promise<GetProfilesResponse> => {
  try {
    const response = await fetch("/api/profiles");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "프로필 목록을 불러오는데 실패했습니다.");
    }

    return data;
  } catch (error) {
    console.error("프로필 목록 조회 실패:", error);
    return {
      success: false,
      data: [],
      error:
        error instanceof Error
          ? error.message
          : "프로필 목록을 불러오는데 실패했습니다.",
    };
  }
};
