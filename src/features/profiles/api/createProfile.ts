import { CreateProfilePayload, CreateProfileResponse } from "../model/type";

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
