import { PROFILE_API_MESSAGES } from "./constants";

type PutShareCountResponse = {
  data: {
    share_count: number;
  };
};

function isPutShareCountResponse(data: unknown): data is PutShareCountResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof (data as any).data === "object" &&
    "share_count" in (data as any).data &&
    typeof (data as any).data.share_count === "number"
  );
}

export async function putShareCount(profileId: number): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles/share/${profileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        PROFILE_API_MESSAGES.UPDATE_SHARE_COUNT_FAILED +
          `(Status: ${response.status} ${response.statusText})`,
      );
    }

    const data = await response.json();

    if (!isPutShareCountResponse(data)) {
      throw new Error(PROFILE_API_MESSAGES.INVALID_RESPONSE);
    }

    return data.data.share_count;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(PROFILE_API_MESSAGES.UPDATE_SHARE_COUNT_FAILED);
  }
}
