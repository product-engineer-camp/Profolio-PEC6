import { Profile } from "@/entities/profiles/model/type";
import { PROFILE_API_MESSAGES } from "./constants";

type GetProfileListResponse = {
  profiles: Profile[];
};

function isGetProfileListResponse(
  data: unknown,
): data is GetProfileListResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "profiles" in data &&
    Array.isArray(data.profiles)
  );
}

export async function getProfileList(): Promise<Profile[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
    );

    if (!response.ok) {
      throw new Error(
        PROFILE_API_MESSAGES.GET_LIST_FAILED +
          `(Status: ${response.status} ${response.statusText})`,
      );
    }

    const data = await response.json();

    if (!isGetProfileListResponse(data)) {
      throw new Error(PROFILE_API_MESSAGES.INVALID_RESPONSE);
    }

    return data.profiles;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(PROFILE_API_MESSAGES.GET_LIST_FAILED);
  }
}
