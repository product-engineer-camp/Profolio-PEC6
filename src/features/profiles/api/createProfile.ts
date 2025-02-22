import { ApiResponse } from "@/shared/api/type";
import { Profile } from "@/src/entities/profiles/model/profile.type";

export type CreateProfilePayload = {
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
  theme_id: number;
  personalized_questions: Array<{
    question: string;
    answer: string;
  }>;
};

export type CreateProfileResponse = ApiResponse<Profile | null>;

export const createProfile = async (
  payload: CreateProfilePayload,
): Promise<CreateProfileResponse> => {
  try {
    const response = await fetch("/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "프로필 생성에 실패했습니다.");
    }

    return data;
  } catch (error) {
    console.error("프로필 생성 실패:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "프로필 생성에 실패했습니다.",
    };
  }
};
