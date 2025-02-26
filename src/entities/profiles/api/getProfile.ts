import { Profile } from "../model/type";

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
        "프로필 정보를 불러오는데 실패했습니다." +
          `(Status: ${response.status} ${response.statusText})`,
      );
    }

    const data = await response.json();

    if (!isGetProfileResponse(data)) {
      throw new Error("잘못된 응답 형식입니다.");
    }

    return data.profile;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("프로필 정보를 불러오는데 실패했습니다.");
  }
}
