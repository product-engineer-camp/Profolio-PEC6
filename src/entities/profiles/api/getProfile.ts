import { Profile } from "../model/type";
import { PROFILE_API_MESSAGES } from "@/features/profiles/api/constants";

type GetProfileResponse = {
  profile: Profile;
};

function isGetProfileResponse(data: unknown): data is GetProfileResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "profile" in data &&
    typeof data.profile === "object"
  );
}

export async function getProfile(id: number): Promise<Profile | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${id}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(
        PROFILE_API_MESSAGES.GET_FAILED +
          `(Status: ${response.status} ${response.statusText})`,
      );
    }

    const data = await response.json();

    if (!isGetProfileResponse(data)) {
      throw new Error(PROFILE_API_MESSAGES.INVALID_RESPONSE);
    }

    return data.profile;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(PROFILE_API_MESSAGES.GET_FAILED);
  }
}
