import { Profile } from "@/entities/profiles/model/type";
import type { SortOption } from "@/features/profiles/model/type";

export async function getProfileList(
  sort: SortOption = "latest",
): Promise<Profile[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }

    const data = await response.json();

    // 응답이 배열인지 확인
    if (!Array.isArray(data)) {
      // data.profiles와 같은 형태로 오는 경우를 처리
      return Array.isArray(data.profiles) ? data.profiles : [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
}
