import { Profile } from "@/entities/profiles/model/type";
import { SortOption } from "@/features/profiles/model/type";
import { generateMockProfiles, delay } from "@/shared/lib/mockData";

export async function getProfileList(
  page: number,
  sort: SortOption,
): Promise<Profile[]> {
  // 실제 API 호출처럼 지연 시간 추가
  await delay(1000);

  // 최대 5페이지까지만 데이터 제공
  if (page > 5) return [];

  const profiles = generateMockProfiles(page);

  // 정렬 옵션에 따라 데이터 정렬
  switch (sort) {
    case "latest":
      return profiles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "shares":
      // 임의의 공유 수를 생성하여 정렬
      return profiles.sort(() => Math.random() - 0.5);
    case "updated":
      return profiles.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    default:
      return profiles;
  }
}
