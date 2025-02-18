import { Profile } from "../model/type";

// 목데이터
const mockProfiles: Profile[] = [
  {
    id: 1,
    title: "테스트 프로필",
    content: "<p>안녕하세요! 테스트 프로필입니다.</p>",
    theme: "light",
    profileUrl: "https://example.com/profile/1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "두 번째 프로필",
    content: "<p>두 번째 테스트 프로필입니다.</p>",
    theme: "dark",
    profileUrl: "https://example.com/profile/2",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
];

export async function getProfile(id: string): Promise<Profile | null> {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const profile = mockProfiles.find((p) => p.id === Number(id));
  return profile || null;
}
