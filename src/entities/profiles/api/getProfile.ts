import { ApiResponse } from "@/shared/api/type";

export type Profile = {
  id: number;
  display_name: string;
  age: number;
  occupation: string;
  hobby: string;
  current_interest: string;
  core_value: string;
  strength: string;
  role_model: string;
  personality: string;
  relationship_status: string;
  created_at: string;
  updated_at: string;
  share_count: number;
  theme: {
    id: number;
    colors: string;
    pattern: string;
  };
  personalized_questions: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
};

export type GetProfilesResponse = ApiResponse<Profile[]>;

export const getProfile = async (): Promise<GetProfilesResponse> => {
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
