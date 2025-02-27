import { ApiResponse } from "./types";
import { PROFILE_API_MESSAGES } from "./constants";

export async function deleteProfile(profileId: number): Promise<ApiResponse> {
  try {
    const response = await fetch(`/api/profiles/${profileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(PROFILE_API_MESSAGES.DELETE_FAILED);
    }

    return {
      success: true,
      message: PROFILE_API_MESSAGES.DELETE_SUCCESS,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(PROFILE_API_MESSAGES.DELETE_FAILED);
  }
}
